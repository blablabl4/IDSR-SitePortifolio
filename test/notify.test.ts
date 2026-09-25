import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

const lead = {
    nome: 'João Pereira',
    email: 'joao@padaria.com',
    telefone: '(11) 91234-5678',
    segmento: 'varejo',
    gargalo: 'Perco cliente porque demoro pra responder no WhatsApp.',
    protocolo: 'TKT-ABC123',
};

describe('notifyLead', () => {
    const originalEnv = { ...process.env };
    let fetchMock: ReturnType<typeof vi.fn>;

    beforeEach(() => {
        vi.resetModules();
        fetchMock = vi.fn();
        vi.stubGlobal('fetch', fetchMock);
        process.env = { ...originalEnv };
        delete process.env.RESEND_API_KEY;
        delete process.env.LEAD_NOTIFY_EMAIL;
        delete process.env.LEAD_NOTIFY_WEBHOOK;
    });

    afterEach(() => {
        process.env = { ...originalEnv };
        vi.unstubAllGlobals();
    });

    it('retorna sent:false quando nenhuma env está configurada', async () => {
        const { notifyLead } = await import('@/lib/notify');
        const result = await notifyLead(lead);

        expect(result).toEqual({ sent: false, reason: 'not_configured' });
        expect(fetchMock).not.toHaveBeenCalled();
    });

    it('envia por e-mail e webhook com sucesso', async () => {
        process.env.RESEND_API_KEY = 're_test_key';
        process.env.LEAD_NOTIFY_EMAIL = 'rocha@idsr.com.br';
        process.env.LEAD_NOTIFY_WEBHOOK = 'https://hooks.example.com/lead';
        fetchMock.mockResolvedValue({ ok: true });

        const { notifyLead } = await import('@/lib/notify');
        const result = await notifyLead(lead);

        expect(result).toEqual({ sent: true });
        expect(fetchMock).toHaveBeenCalledTimes(2);
        expect(fetchMock).toHaveBeenCalledWith('https://api.resend.com/emails', expect.any(Object));
        expect(fetchMock).toHaveBeenCalledWith('https://hooks.example.com/lead', expect.any(Object));
    });

    it('retorna sent:true quando um canal falha e o outro funciona', async () => {
        process.env.RESEND_API_KEY = 're_test_key';
        process.env.LEAD_NOTIFY_EMAIL = 'rocha@idsr.com.br';
        process.env.LEAD_NOTIFY_WEBHOOK = 'https://hooks.example.com/lead';
        fetchMock
            .mockResolvedValueOnce({ ok: false })
            .mockResolvedValueOnce({ ok: true });

        const { notifyLead } = await import('@/lib/notify');
        const result = await notifyLead(lead);

        expect(result).toEqual({ sent: true });
    });

    it('lança erro quando todos os canais configurados falham', async () => {
        process.env.RESEND_API_KEY = 're_test_key';
        process.env.LEAD_NOTIFY_EMAIL = 'rocha@idsr.com.br';
        process.env.LEAD_NOTIFY_WEBHOOK = 'https://hooks.example.com/lead';
        fetchMock.mockResolvedValue({ ok: false });

        const { notifyLead } = await import('@/lib/notify');
        await expect(notifyLead(lead)).rejects.toThrow();
    });
});
