import { describe, it, expect } from 'vitest';
import { ContactFormSchema, LeadCaptureSchema } from '@/lib/schemas';

describe('ContactFormSchema Validation (TDD)', () => {
  it('should validate a correct contact submission', () => {
    const validData = {
      nome: 'Carlos Silva',
      email: 'carlos@empresa.com.br',
      telefone: '(11) 99999-8888',
      empresa: 'Silva Alimentos',
      segmento: 'restaurante' as const,
      mensagem: 'Gostaria de agendar uma demonstração do Pulse e ScheduleFlow.',
    };

    const result = ContactFormSchema.safeParse(validData);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.nome).toBe('Carlos Silva');
      expect(result.data.segmento).toBe('restaurante');
    }
  });

  it('should reject invalid email addresses', () => {
    const invalidData = {
      nome: 'Carlos Silva',
      email: 'carlos-invalido',
      telefone: '11999998888',
      mensagem: 'Olá equipe IDSR!',
    };

    const result = ContactFormSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].path).toContain('email');
    }
  });

  it('should reject messages that are too short', () => {
    const shortMessageData = {
      nome: 'Carlos Silva',
      email: 'carlos@empresa.com',
      telefone: '11999998888',
      mensagem: 'Oi',
    };

    const result = ContactFormSchema.safeParse(shortMessageData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].path).toContain('mensagem');
    }
  });

  it('should accept empty empresa as optional', () => {
    const dataWithoutEmpresa = {
      nome: 'Ana Lima',
      email: 'ana@gmail.com',
      telefone: '11988887777',
      empresa: '',
      mensagem: 'Gostaria de entender melhor a automação para minha clínica.',
    };

    const result = ContactFormSchema.safeParse(dataWithoutEmpresa);
    expect(result.success).toBe(true);
  });
});

describe('LeadCaptureSchema Validation', () => {
  it('should parse and assign default values', () => {
    const lead = {
      nome: 'Roberto Dias',
      telefone: '11977776666',
    };

    const result = LeadCaptureSchema.safeParse(lead);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.solucaoInteresse).toBe('geral');
      expect(result.data.origem).toBe('web_portfolio');
    }
  });
});
