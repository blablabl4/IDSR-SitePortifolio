/**
 * IDSR - Configuração Central de Contatos, Canais e Rastreamento de Conversão
 * Este arquivo unifica todos os canais de contato, dados cadastrais e
 * links de WhatsApp contextualizados para campanhas e tráfego pago.
 */

export const CONTACT_CONFIG = {
  // Número de WhatsApp oficial
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '5511983426767',
  whatsappDisplay: '+55 (11) 98342-6767',
  
  // Responsável técnico e fundador
  founderName: 'Rocha',
  founderFullName: 'Isaque Rocha',
  
  // E-mails oficiais
  emailContato: 'contato@idsr.com.br',
  emailSuporte: 'suporte@idsr.com.br',
  emailPrivacidade: 'privacidade@idsr.com.br',
  
  // Dados empresariais e legais
  razaoSocial: '63.686.939 ISAQUE DA SILVA ROCHA',
  nomeFantasia: 'IDSR - Infraestrutura de Dados, Sistemas e Rastreabilidade',
  cnpj: '63.686.939/0001-71',
  enderecoCompleto: 'Rua Padre Luiz da Grã, 64 – Saúde – São Paulo/SP – CEP 04294-050',
  cidadeEstado: 'São Paulo, SP — Atendimento Brasil',
  
  // SLAs e compromissos operacionais
  slaTriagemHoras: 2,
  slaSuporteHoras: 4,
};

export type WhatsAppContext = {
  origem?: 'home' | 'produtos' | 'precos' | 'sobre' | 'contato' | 'manifesto' | 'suporte' | 'header' | 'footer';
  produto?: 'pulse' | 'leadflow' | 'scheduleflow' | 'opsflow' | 'custom' | string;
  plano?: 'starter' | 'growth' | 'enterprise' | string;
  ticketId?: string;
  customMessage?: string;
};

/**
 * Gera um link de WhatsApp com mensagem contextualizada para rastreio de origem e maior conversão.
 */
export function getWhatsAppUrl(context: WhatsAppContext | string = {}): string {
  const number = CONTACT_CONFIG.whatsappNumber.replace(/\D/g, '');
  
  if (typeof context === 'string') {
    return `https://wa.me/${number}?text=${encodeURIComponent(context)}`;
  }
  
  if (context.customMessage) {
    return `https://wa.me/${number}?text=${encodeURIComponent(context.customMessage)}`;
  }

  let text = `Olá ${CONTACT_CONFIG.founderName}!`;

  if (context.ticketId) {
    text += ` Enviei uma solicitação pelo site (Protocolo: ${context.ticketId}). Gostaria de agilizar o atendimento.`;
  } else if (context.produto) {
    const produtoNome: Record<string, string> = {
      pulse: 'Central Pulse (Atendimento Inteligente 24/7)',
      leadflow: 'LeadFlow (CRM & Pipeline de Vendas)',
      scheduleflow: 'ScheduleFlow (Gestão de Agenda & Anti No-Show)',
      opsflow: 'OpsFlow (Checklists & Rastreabilidade Operacional)',
      custom: 'Solução Sob Medida / Integração de ERPs',
    };

    const nome = produtoNome[context.produto.toLowerCase()] || context.produto;
    text += ` Gostaria de agendar uma demonstração prática do ${nome} para minha empresa.`;
  } else if (context.plano) {
    const planoNome: Record<string, string> = {
      starter: 'Starter (Essencial)',
      growth: 'Growth (Escala & Automação)',
      enterprise: 'Enterprise (Sob Medida)',
    };

    const nome = planoNome[context.plano.toLowerCase()] || context.plano;
    text += ` Gostaria de entender mais detalhes e valores sobre o plano ${nome} para minha operação.`;
  } else if (context.origem === 'produtos') {
    text += ` Estava navegando na página de produtos e gostaria de entender qual solução atende melhor minha empresa.`;
  } else if (context.origem === 'precos') {
    text += ` Gostaria de receber uma proposta personalizada para a operação da minha empresa.`;
  } else if (context.origem === 'manifesto') {
    text += ` Li o Manifesto da IDSR sobre engenharia e automação. Gostaria de conversar com você sobre um projeto.`;
  } else if (context.origem === 'suporte') {
    text += ` Olá time IDSR! Preciso de suporte técnico referente à minha operação.`;
  } else {
    text += ` Gostaria de conversar sobre como automatizar e estruturar os processos da minha empresa com a IDSR.`;
  }

  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}
