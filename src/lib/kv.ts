import { createClient } from 'redis';
import { v4 as uuidv4 } from 'uuid';

export interface Conversation {
    id: string;
    sessionId: string;
    userId?: string;
    startedAt: string;
    lastMessageAt: string;
    messageCount: number;
    hasConsent: boolean;
    metadata?: {
        userAgent?: string;
        referrer?: string;
        firstPage?: string;
    };
}

export interface Message {
    id: string;
    role: 'user' | 'bot';
    content: string;
    timestamp: string;
    metadata?: {
        aiModel?: string;
        tokensUsed?: number;
        responseTime?: number;
    };
}

// Singleton Redis client
let redisClient: ReturnType<typeof createClient> | null = null;

async function getRedisClient() {
    if (!redisClient) {
        const redisUrl = process.env.REDIS_URL;

        if (!redisUrl) {
            throw new Error('REDIS_URL environment variable is not set');
        }

        redisClient = createClient({ url: redisUrl });

        redisClient.on('error', (err) => console.error('Redis Client Error', err));

        await redisClient.connect();
    }

    return redisClient;
}

export const redis = {
    get: async (key: string) => {
        const client = await getRedisClient();
        return client.get(key);
    },
    set: async (key: string, value: string) => {
        const client = await getRedisClient();
        return client.set(key, value);
    },
    expire: async (key: string, seconds: number) => {
        const client = await getRedisClient();
        return client.expire(key, seconds);
    },
    lpush: async (key: string, value: string) => {
        const client = await getRedisClient();
        return client.lPush(key, value);
    },
    lrange: async (key: string, start: number, stop: number) => {
        const client = await getRedisClient();
        return client.lRange(key, start, stop);
    },
    llen: async (key: string) => {
        const client = await getRedisClient();
        return client.lLen(key);
    },
    sadd: async (key: string, value: string) => {
        const client = await getRedisClient();
        return client.sAdd(key, value);
    },
    smembers: async (key: string) => {
        const client = await getRedisClient();
        return client.sMembers(key);
    },
    zincrby: async (key: string, increment: number, member: string) => {
        const client = await getRedisClient();
        return client.zIncrBy(key, increment, member);
    },
    zrange: async (key: string, start: number, stop: number, options?: any) => {
        const client = await getRedisClient();
        return client.zRangeWithScores(key, start, stop, { REV: options?.rev });
    },
    hset: async (key: string, field: string | Record<string, string>, value?: string) => {
        const client = await getRedisClient();
        if (typeof field === 'string' && value) {
            return client.hSet(key, field, value);
        } else if (typeof field === 'object') {
            return client.hSet(key, field);
        }
    },
    hgetall: async (key: string) => {
        const client = await getRedisClient();
        return client.hGetAll(key);
    },
    del: async (key: string) => {
        const client = await getRedisClient();
        return client.del(key);
    }
};

// Generate unique IDs
export function generateId(): string {
    return uuidv4();
}

// Conversation operations
export async function createConversation(sessionId: string, hasConsent: boolean): Promise<Conversation> {
    const conversation: Conversation = {
        id: generateId(),
        sessionId,
        startedAt: new Date().toISOString(),
        lastMessageAt: new Date().toISOString(),
        messageCount: 0,
        hasConsent,
        metadata: {}
    };

    await saveConversation(conversation);
    await addConversationToSession(sessionId, conversation.id);

    return conversation;
}

export async function saveConversation(conversation: Conversation): Promise<void> {
    await redis.set(`conversation:${conversation.id}`, JSON.stringify(conversation));
    await redis.expire(`conversation:${conversation.id}`, 60 * 60 * 24 * 90);
}

export async function getConversation(conversationId: string): Promise<Conversation | null> {
    const data = await redis.get(`conversation:${conversationId}`);
    if (!data) return null;
    return JSON.parse(data);
}

export async function updateConversation(conversationId: string, updates: Partial<Conversation>): Promise<void> {
    const conversation = await getConversation(conversationId);
    if (!conversation) return;

    const updated = { ...conversation, ...updates };
    await saveConversation(updated);
}

// Message operations
export async function saveMessage(conversationId: string, message: Message): Promise<void> {
    await redis.lpush(`messages:${conversationId}`, JSON.stringify(message));
    await redis.expire(`messages:${conversationId}`, 60 * 60 * 24 * 90);

    const count = await getMessageCount(conversationId);
    await updateConversation(conversationId, {
        lastMessageAt: message.timestamp,
        messageCount: count
    });
}

export async function getMessages(conversationId: string, limit: number = 100): Promise<Message[]> {
    const messages = await redis.lrange(`messages:${conversationId}`, 0, limit - 1);
    return messages.map(m => JSON.parse(m)).reverse();
}

export async function getMessageCount(conversationId: string): Promise<number> {
    return await redis.llen(`messages:${conversationId}`) || 0;
}

// Session operations
export async function addConversationToSession(sessionId: string, conversationId: string): Promise<void> {
    await redis.sadd(`session:${sessionId}`, conversationId);
    await redis.expire(`session:${sessionId}`, 60 * 60 * 24 * 90);
}

export async function getSessionConversations(sessionId: string): Promise<string[]> {
    return await redis.smembers(`session:${sessionId}`);
}

// FAQ tracking
export async function trackFAQ(question: string): Promise<void> {
    await redis.zincrby('faq:questions', 1, question);
    await redis.hset('faq:timestamps', question, new Date().toISOString());
}

export async function getTopFAQs(limit: number = 50): Promise<Array<{ question: string; frequency: number; lastAsked?: string }>> {
    const faqs = await redis.zrange('faq:questions', 0, limit - 1, { rev: true });
    const timestamps = await redis.hgetall('faq:timestamps') || {};

    const result: Array<{ question: string; frequency: number; lastAsked?: string }> = [];

    for (const item of faqs) {
        if ('value' in item && 'score' in item) {
            result.push({
                question: item.value,
                frequency: item.score,
                lastAsked: timestamps[item.value]
            });
        }
    }

    return result;
}

// Delete user data (LGPD compliance)
export async function deleteUserData(sessionId: string): Promise<void> {
    const conversationIds = await getSessionConversations(sessionId);

    for (const convId of conversationIds) {
        await redis.del(`conversation:${convId}`);
        await redis.del(`messages:${convId}`);
    }

    await redis.del(`session:${sessionId}`);
}
