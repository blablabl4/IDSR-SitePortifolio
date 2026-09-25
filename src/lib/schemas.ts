import { z } from 'zod';

export const ContactFormSchema = z.object({
  nome: z.string().trim().min(2, 'Nome deve ter pelo menos 2 caracteres').max(100, 'Nome muito longo'),
  email: z.string().trim().email('Email inválido').optional().or(z.literal('')),
  telefone: z
    .string()
    .trim()
    .min(8, 'Telefone deve ter pelo menos 8 dígitos')
    .max(25, 'Telefone inválido')
    .regex(/^[\d\s()+-]+$/, 'Formato de telefone inválido'),
  empresa: z.string().trim().max(100, 'Nome da empresa muito longo').optional().or(z.literal('')),
  segmento: z.enum(['varejo', 'restaurante', 'servicos', 'outro']).optional().default('outro'),
  mensagem: z.string().trim().min(5, 'Mensagem deve ter pelo menos 5 caracteres').max(2000, 'Mensagem muito longa'),
});

export type ContactFormData = z.infer<typeof ContactFormSchema>;

export const LeadCaptureSchema = z.object({
  nome: z.string().trim().min(2, 'Nome muito curto'),
  telefone: z.string().trim().min(8, 'Telefone inválido'),
  email: z.string().trim().email('Email inválido').optional().or(z.literal('')),
  solucaoInteresse: z.enum(['pulse', 'leadflow', 'scheduleflow', 'opsflow', 'sob_medida', 'geral']).default('geral'),
  origem: z.string().default('web_portfolio'),
});

export type LeadCaptureData = z.infer<typeof LeadCaptureSchema>;
