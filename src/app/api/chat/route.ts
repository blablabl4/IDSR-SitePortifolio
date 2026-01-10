import OpenAI from 'openai';
import { NextRequest, NextResponse } from 'next/server';

// System context about IDSR - COMPLETE BUSINESS CONTEXT v2
const SYSTEM_CONTEXT = `Você é o assistente virtual EXCLUSIVO da IDSR (Infraestrutura de Dados, Sistemas e Rastreabilidade).

⚠️ REGRA CRÍTICA: Você SÓ fala sobre assuntos da IDSR. Para outros temas, responda:
"Sou especializado em soluções IDSR. Posso te ajudar com automação, gestão ou rastreabilidade para seu negócio?"

SOBRE A IDSR:
Boutique de software e automação orientada a processo, rastreabilidade e tomada de decisão.
Posicionamento: "Automação com rastreabilidade"
Tom: Direto, técnico, sem exibicionismo. "Luxo silencioso".

PRODUTOS (todos a partir de R$ 297/mês):
1. CENTRAL (Pulse) - Atendimento automatizado 24/7, qualifica leads, roteia para equipe
2. VENDAS (LeadFlow) - CRM visual, follow-ups automáticos, funil organizado
3. AGENDA (ScheduleFlow) - Agendamento inteligente, confirmação automática, reduz no-shows em até 80%
4. OPERAÇÃO (OpsFlow) - Checklists rastreáveis, você sabe quem fez o quê e quando
5. SOB MEDIDA (Custom) - Projetos especiais, integrações complexas, sob consulta

SEGMENTOS: Varejo, Restaurantes, Serviços com agendamento

SCORE DE COMPLEXIDADE (0-10):
- 0-2 SIMPLES: Setup R$ 497, Mensal R$ 297 (pode contratar direto)
- 3-5 PADRÃO: Setup R$ 997-1.997, Mensal R$ 397-497 (call recomendada)
- 6-8 COMPLEXO: Setup R$ 2.497-3.997, Mensal R$ 597-797 (call obrigatória)
- 9-10 PROJETO: Setup R$ 4.997+, Mensal R$ 997+ (proposta customizada)

DIAGNÓSTICO - Pergunte em ordem:
1. Segmento: "Em qual segmento sua empresa atua?"
2. Dor: "Qual é o principal desafio que você quer resolver?"
3. Infraestrutura: "Quais sistemas você já usa?" (para calcular score)
4. Escala: "Quantas unidades/lojas? Tamanho da equipe?"
5. Dados: "Tem dados para migrar ou vamos criar do zero?"
6. Customização: "Processo é padrão ou tem regras específicas?"

RECOMENDAÇÕES POR DOR:
- Perda de leads → Central + Vendas
- No-shows → Agenda
- Equipe desorganizada → Operação
- Atendimento lento → Central
- Vendas estagnadas → Vendas

APÓS DIAGNÓSTICO:
- Recomende o produto ideal
- Informe faixa de preço baseada no score estimado
- Sugira próximo passo (contratar/agendar call)

PÁGINAS: /(home), /produtos, /precos, /sobre, /manifesto, /contato

COMPORTAMENTO:
- Máximo 3-4 linhas por resposta
- Faça UMA pergunta por vez
- Seja profissional mas amigável
- Foco em resultado prático
- NUNCA prometa "milagre" ou "resultado garantido"
- NUNCA dê preço exato sem entender o contexto`;

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

        // Initialize OpenAI
        const apiKey = process.env.OPENAI_API_KEY;
        if (!apiKey) {
            console.error('OPENAI_API_KEY is not configured');
            return NextResponse.json(
                { error: 'AI service is not configured. Please contact support.' },
                { status: 503 }
            );
        }

        const openai = new OpenAI({ apiKey });

        // Build messages array for OpenAI
        const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [
            { role: 'system', content: SYSTEM_CONTEXT },
        ];

        // Add conversation history
        if (conversationHistory && Array.isArray(conversationHistory)) {
            for (const msg of conversationHistory) {
                messages.push({
                    role: msg.role === 'user' ? 'user' : 'assistant',
                    content: msg.content || msg.text || '',
                });
            }
        }

        // Add current user message
        messages.push({ role: 'user', content: message });

        // Call OpenAI API using GPT-4o-mini (fast and cheap)
        const completion = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages,
            max_tokens: 500,
            temperature: 0.7,
        });

        const text = completion.choices[0]?.message?.content || 'Desculpe, não consegui gerar uma resposta.';

        return NextResponse.json({
            response: text,
            timestamp: new Date().toISOString(),
        });

    } catch (error: any) {
        console.error('Chat API Error:', error);
        console.error('Error name:', error?.name);
        console.error('Error message:', error?.message);

        // Handle specific OpenAI errors
        if (error.code === 'invalid_api_key' || error.message?.includes('API key')) {
            return NextResponse.json(
                { error: 'AI service configuration error. Please contact support.' },
                { status: 500 }
            );
        }

        if (error.code === 'rate_limit_exceeded' || error.message?.includes('rate limit')) {
            return NextResponse.json(
                { error: 'Muitas requisições. Aguarde um momento e tente novamente.' },
                { status: 429 }
            );
        }

        if (error.code === 'insufficient_quota') {
            return NextResponse.json(
                { error: 'Serviço temporariamente indisponível. Tente novamente mais tarde.' },
                { status: 503 }
            );
        }

        return NextResponse.json(
            { error: 'Desculpe, tive um problema ao processar sua mensagem. Por favor, tente novamente.' },
            { status: 500 }
        );
    }
}
