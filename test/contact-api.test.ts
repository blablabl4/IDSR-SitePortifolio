import { describe, it, expect } from 'vitest';
import { POST } from '@/app/api/contact/route';
import { NextRequest } from 'next/server';

describe('/api/contact Route (TDD)', () => {
  it('should process valid contact submission and return ticketId', async () => {
    const payload = {
      nome: 'Mariana Costa',
      email: 'mariana@restaurante.com',
      telefone: '(11) 98888-7777',
      empresa: 'Bistrô Paris',
      segmento: 'restaurante',
      mensagem: 'Gostaria de agendar uma demonstração do Pulse para automatizar reservas.',
    };

    const req = new NextRequest('http://localhost:3000/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const res = await POST(req);
    expect(res.status).toBe(200);

    const body = await res.json();
    expect(body.success).toBe(true);
    expect(body.ticketId).toMatch(/^TKT-/);
    expect(body.whatsappUrl).toContain('wa.me');
    expect(body.whatsappUrl).toContain('Mariana%20Costa');
  });

  it('should return 400 when required fields are missing or invalid', async () => {
    const invalidPayload = {
      nome: 'M',
      email: 'email-invalido',
      telefone: '123',
      mensagem: 'oi',
    };

    const req = new NextRequest('http://localhost:3000/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(invalidPayload),
    });

    const res = await POST(req);
    expect(res.status).toBe(400);

    const body = await res.json();
    expect(body.error).toBe('Dados do formulário inválidos');
    expect(body.details).toHaveProperty('email');
    expect(body.details).toHaveProperty('nome');
  });
});
