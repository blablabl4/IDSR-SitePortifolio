import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';
import {
    createConversation,
    getConversation,
    saveMessage,
    getMessages,
    getSessionConversations,
    trackFAQ,
    generateId,
    type Message
} from '@/lib/kv';

// Initialize Google AI
const apiKey = process.env.GOOGLE_AI_API_KEY;

if (!apiKey) {
    throw new Error('GOOGLE_AI_API_KEY is not set in environment variables');
}

const genAI = new GoogleGenerativeAI(apiKey);

// System context about IDSR
const SYSTEM_CONTEXT = `Você é o assistente virtual da IDSR (Infraestrutura de Dados, Sistemas e Rastreabilidade).

SOBRE A IDSR:
Somos uma empresa especializada em automação de atendimento, agendamento e gestão para varejo, restaurantes e serviços.

PRODUTOS PRINCIPAIS:
1. Automação WhatsApp - Atendimento 24/7 automatizado
2. Sistema de Rastreabilidade - Controle completo de processos e produtos
3. Dashboard de Gestão - Análise de dados em tempo real
4. Agendamento Inteligente - Gestão de horários e reservas

SEGMENTOS ATENDIDOS:
- Varejo (lojas, e-commerce)
- Restaurantes (delivery, reservas)
- Serviços (salões, clínicas, consultorias)

SUA MISSÃO:
1. Entender profundamente a necessidade do cliente
2. Fazer perguntas estratégicas sobre:
   - Segmento da empresa
   - Tamanho (pequeno/médio/grande)
   - Principal dor/desafio
3. Recomendar o produto IDSR mais adequado
4. Direcionar para a página específica do site
5. Capturar informações para qualificar o lead

PÁGINAS DO SITE:
- / (home)
- /produtos (todos os produtos)
- /precos (planos e valores)
- /sobre (sobre a IDSR)
- /manifesto (nossa missão)
- /contato (fale conosco)

IMPORTANTE:
- Seja profissional mas amigável
- Use português BR natural
- Faça UMA pergunta por vez
- Busque entender o contexto completo antes de recomendar
- Quando recomendar um produto, explique o benefício específico
- Sugira visitar páginas relevantes

Responda sempre de forma concisa (máximo 3-4 linhas) e conversacional.`;

export async function POST(req: NextRequest) {
    try {
        const { message, conversationHistory, userConsent } = await req.json();

        // Validate consent
        if (!userConsent) {
            return NextResponse.json(
                { error: 'Consent required. Please accept the terms to continue.' },
                { status: 403 }
            );
        }

        // Validate message
        if (!message || typeof message !== 'string' || message.trim().length === 0) {
            return NextResponse.json(
                { error: 'Message is required' },
                { status: 400 }
            );
        }

        // Use Gemini 1.5 Flash (free tier)
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

        // Build conversation history for context
        const history = conversationHistory?.map((msg: any) => ({
            role: msg.role === 'user' ? 'user' : 'model',
            parts: [{ text: msg.content }],
        })) || [];

        // Start chat with history
        const chat = model.startChat({
            history: [
                {
                    role: 'user',
                    parts: [{ text: 'Olá, você é o assistente da IDSR, certo?' }],
                },
                {
                    role: 'model',
                    parts: [{ text: SYSTEM_CONTEXT }],
                },
                ...history,
            ],
            generationConfig: {
                maxOutputTokens: 500,
                temperature: 0.7,
            },
        });

        // Send user message
        const result = await chat.sendMessage(message);
        const response = result.response;
        const text = response.text();

        return NextResponse.json({
            response: text,
            timestamp: new Date().toISOString(),
        });

    } catch (error: any) {
        console.error('Chat API Error:', error);

        // Handle specific errors
        if (error.message?.includes('API key')) {
            return NextResponse.json(
                { error: 'AI service configuration error. Please contact support.' },
                { status: 500 }
            );
        }

        if (error.message?.includes('quota') || error.message?.includes('rate limit')) {
            return NextResponse.json(
                { error: 'Service temporarily unavailable. Please try again later.' },
                { status: 429 }
            );
        }

        return NextResponse.json(
            { error: 'Failed to process your message. Please try again.' },
            { status: 500 }
        );
    }
}
