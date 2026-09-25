export interface Lead {
    nome: string;
    email?: string;
    telefone: string;
    segmento: string;
    gargalo: string;
    protocolo: string;
}

export interface NotifyResult {
    sent: boolean;
    reason?: string;
}

const TIMEOUT_MS = 8_000;

function buildEmailBody(lead: Lead): string {
    return [
        `Nome: ${lead.nome}`,
        `E-mail: ${lead.email || 'não informado'}`,
        `Telefone: ${lead.telefone}`,
        `Segmento: ${lead.segmento}`,
        `Gargalo: ${lead.gargalo}`,
        `Protocolo: ${lead.protocolo}`,
    ].join('\n');
}

async function fetchWithTimeout(url: string, init: RequestInit): Promise<Response> {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);
    try {
        return await fetch(url, { ...init, signal: controller.signal });
    } finally {
        clearTimeout(timeout);
    }
}

async function sendEmail(lead: Lead): Promise<boolean> {
    const apiKey = process.env.RESEND_API_KEY;
    const notifyEmail = process.env.LEAD_NOTIFY_EMAIL;

    if (!apiKey || !notifyEmail) return false;

    try {
        const res = await fetchWithTimeout('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                from: 'IDSR <leads@idsr.com.br>',
                to: notifyEmail,
                subject: `Novo lead: ${lead.nome} (${lead.segmento}) #${lead.protocolo}`,
                text: buildEmailBody(lead),
            }),
        });

        return res.ok;
    } catch (error) {
        console.error('[notify] Falha ao enviar e-mail via Resend:', error);
        return false;
    }
}

async function sendWebhook(lead: Lead): Promise<boolean> {
    const webhookUrl = process.env.LEAD_NOTIFY_WEBHOOK;

    if (!webhookUrl) return false;

    try {
        const res = await fetchWithTimeout(webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(lead),
        });

        return res.ok;
    } catch (error) {
        console.error('[notify] Falha ao enviar webhook de lead:', error);
        return false;
    }
}

export async function notifyLead(lead: Lead): Promise<NotifyResult> {
    const emailConfigured = Boolean(process.env.RESEND_API_KEY && process.env.LEAD_NOTIFY_EMAIL);
    const webhookConfigured = Boolean(process.env.LEAD_NOTIFY_WEBHOOK);

    if (!emailConfigured && !webhookConfigured) {
        console.warn('[notify] Nenhum canal de notificação de lead configurado (RESEND_API_KEY/LEAD_NOTIFY_EMAIL ou LEAD_NOTIFY_WEBHOOK).');
        return { sent: false, reason: 'not_configured' };
    }

    const results = await Promise.all([
        emailConfigured ? sendEmail(lead) : Promise.resolve(false),
        webhookConfigured ? sendWebhook(lead) : Promise.resolve(false),
    ]);

    const anySent = results.some(Boolean);

    if (!anySent) {
        throw new Error('Falha ao notificar lead: todos os canais configurados falharam.');
    }

    return { sent: true };
}
