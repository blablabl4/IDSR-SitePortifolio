import { NextRequest, NextResponse } from 'next/server';
import { ContactFormSchema } from '@/lib/schemas';
import { redis } from '@/lib/kv';
import { v4 as uuidv4 } from 'uuid';
import { CONTACT_CONFIG } from '@/lib/contact-config';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Validação estrita via Zod
    const validationResult = ContactFormSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: 'Dados do formulário inválidos',
          details: validationResult.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const data = validationResult.data;
    const ticketId = `TKT-${Date.now().toString(36).toUpperCase()}-${uuidv4().slice(0, 4).toUpperCase()}`;
    const timestamp = new Date().toISOString();

    const leadRecord = {
      id: ticketId,
      ...data,
      createdAt: timestamp,
      status: 'novo',
      origem: 'formulario_contato',
      userAgent: req.headers.get('user-agent') || 'unknown',
    };

    // Tentativa de persistência no Redis / KV com fallback gracioso
    let persisted = false;
    try {
      if (process.env.REDIS_URL || process.env.KV_REST_API_URL) {
        await redis.hset(`lead:${ticketId}`, leadRecord as any);
        await redis.lpush('leads:recent', ticketId);
        persisted = true;
      }
    } catch (storageError) {
      console.warn('[Contact API] Armazenamento KV indisponível ou não configurado. Prosseguindo com fallback resiliente:', storageError);
    }

    // Log estruturado para auditoria e rastreabilidade (princípio IDSR)
    console.info('[IDSR Lead Captured]', JSON.stringify(leadRecord));

    // Mensagem de WhatsApp estruturada para atendimento imediato via CONTACT_CONFIG
    const waNumber = CONTACT_CONFIG.whatsappNumber.replace(/\D/g, '');
    const waText = encodeURIComponent(
      `Olá ${CONTACT_CONFIG.founderName}! Meu nome é ${data.nome}${data.empresa ? ` da ${data.empresa}` : ''}.\n\n` +
      `Gostaria de falar sobre automação para o segmento de ${data.segmento.toUpperCase()}.\n` +
      `Protocolo: ${ticketId}\n\nMensagem: "${data.mensagem}"`
    );
    const whatsappUrl = `https://wa.me/${waNumber}?text=${waText}`;

    return NextResponse.json(
      {
        success: true,
        message: 'Solicitação recebida com sucesso. Entraremos em contato em breve.',
        ticketId,
        whatsappUrl,
        persisted,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('[Contact API Error]', error);
    return NextResponse.json(
      { error: 'Erro interno ao processar sua solicitação. Tente novamente mais tarde.' },
      { status: 500 }
    );
  }
}
