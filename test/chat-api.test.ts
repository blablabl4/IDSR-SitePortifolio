import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { NextRequest } from 'next/server';

const createMock = vi.fn();

vi.mock('openai', () => {
    return {
        default: class OpenAI {
            chat = { completions: { create: createMock } };
            constructor(_opts: unknown) {}
        },
    };
});

vi.mock('@/lib/kv', () => ({
    redis: {
        incr: vi.fn().mockRejectedValue(new Error('redis indisponível em teste')),
        expire: vi.fn(),
        ttl: vi.fn(),
    },
}));

function makeRequest(body: unknown, ip = '203.0.113.10') {
    return new NextRequest('http://localhost:3000/api/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-forwarded-for': ip,
        },
        body: JSON.stringify(body),
    });
}

describe('/api/chat Route', () => {
    const originalApiKey = process.env.OPENAI_API_KEY;

    beforeEach(() => {
        process.env.OPENAI_API_KEY = 'sk-test-key';
        createMock.mockReset();
    });

    afterEach(() => {
        process.env.OPENAI_API_KEY = originalApiKey;
        vi.useRealTimers();
    });

    it('retorna 400 para payload inválido', async () => {
        const { POST } = await import('@/app/api/chat/route');

        const req = makeRequest({
            message: '',
            conversationHistory: [],
            userConsent: true,
        });

        const res = await POST(req);
        expect(res.status).toBe(400);

        const body = await res.json();
        expect(body.error).toBeTruthy();
    });

    it('bloqueia a 21ª requisição do mesmo IP com 429 e Retry-After', async () => {
        const { POST } = await import('@/app/api/chat/route');

        createMock.mockResolvedValue({
            choices: [{ message: { content: 'Olá!' } }],
        });

        const ip = '198.51.100.42';
        let lastRes;
        for (let i = 0; i < 21; i++) {
            lastRes = await POST(
                makeRequest({ message: 'oi', conversationHistory: [], userConsent: true }, ip)
            );
        }

        expect(lastRes!.status).toBe(429);
        expect(lastRes!.headers.get('Retry-After')).toBeTruthy();
    });

    it('retorna 504 quando a chamada à OpenAI estoura o timeout', async () => {
        vi.useFakeTimers();
        const { POST } = await import('@/app/api/chat/route');

        createMock.mockImplementation((_body: unknown, opts: { signal: AbortSignal }) => {
            return new Promise((_resolve, reject) => {
                opts.signal.addEventListener('abort', () => {
                    const err = new Error('aborted');
                    err.name = 'AbortError';
                    reject(err);
                });
            });
        });

        const resPromise = POST(
            makeRequest(
                { message: 'oi', conversationHistory: [], userConsent: true },
                '203.0.113.99'
            )
        );

        await vi.advanceTimersByTimeAsync(20_000);
        const res = await resPromise;

        expect(res.status).toBe(504);
        const body = await res.json();
        expect(body.error).toBeTruthy();
    });

    it('fluxo feliz retorna 200 com a resposta do assistente', async () => {
        const { POST } = await import('@/app/api/chat/route');

        createMock.mockResolvedValue({
            choices: [{ message: { content: 'Posso te ajudar com automação.' } }],
        });

        const res = await POST(
            makeRequest(
                { message: 'Quero automatizar meu atendimento', conversationHistory: [], userConsent: true },
                '203.0.113.55'
            )
        );

        expect(res.status).toBe(200);
        const body = await res.json();
        expect(body.response).toBe('Posso te ajudar com automação.');
    });
});
