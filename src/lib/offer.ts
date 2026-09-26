/**
 * Fonte de verdade mínima da oferta IDSR — consolida o que já está escrito em
 * /produtos, /precos e QuemPodeUsarModal (NICHOS_DATA) num único lugar, sem
 * decidir nada novo de negócio. Preço Starter fixado em R$ 997/mês (decisão do
 * dono, docs/AUDITORIA-2026-09-akita.md seção 4).
 *
 * Migração pendente (fora do escopo desta tarefa): /produtos, /precos, o
 * JSON-LD do layout e o prompt do chat continuam com os dados duplicados,
 * ainda não migrados para ler daqui.
 */

import { CONTACT_CONFIG, getWhatsAppUrl } from './contact-config';

export interface OfferModule {
  slug: string;
  name: string;
  tagline: string;
  subtitle: string;
  /** Frase curta da dor que o módulo resolve, para copy da home. */
  painPoint: string;
  accentColor: string;
  pricing: string;
  metrics: string;
  /**
   * Nomes internos usados no prompt do chat e em schemas.ts (LeadCaptureSchema)
   * para conceitos parecidos. NÃO é um mapeamento 1:1 — são duas taxonomias
   * sobrepostas e nunca reconciliadas (ver auditoria seção 4, "Oferta
   * contraditória"). Preenchido só onde a correspondência já é óbvia pelo
   * copy existente; deixado vazio nos demais em vez de forçar uma decisão.
   */
  codinomes?: string[];
}

export const OFFER_MODULES: OfferModule[] = [
  {
    slug: 'automacoes',
    name: 'Automações Comerciais',
    tagline: 'WhatsApp, Direct & Telegram 24/7',
    subtitle: 'Atendimento e qualificação instantânea sem perder vendas por demora',
    painPoint: '78% dos clientes compram da primeira empresa que responde. Quem demora perde o lead para o concorrente.',
    accentColor: '#38e0e0',
    pricing: 'A partir de R$ 997/mês',
    metrics: 'RESPOSTA < 3s · ATÉ 3X MAIS CONVERSÃO',
    codinomes: ['pulse', 'leadflow', 'scheduleflow'],
  },
  {
    slug: 'sites-dashboards',
    name: 'Sites, Landing Pages & Dashboards',
    tagline: 'Alta Conversão & BI em Tempo Real',
    subtitle: 'Páginas ultravelozes e painéis analíticos para gestão visual sem planilhas',
    painPoint: 'Design amador custa caro: páginas lentas perdem 20% das vendas a cada segundo de atraso.',
    accentColor: '#8b5cf6',
    pricing: 'Projetos a partir de R$ 2.497',
    metrics: 'PAGESPEED 95+ · CARREGAMENTO < 0.8s',
  },
  {
    slug: 'dados-robos',
    name: 'Dados, Scrapers & Robôs (RPA)',
    tagline: 'Automação de Processos & Zero Erro',
    subtitle: 'Robôs que executam o trabalho repetitivo da sua empresa com precisão cirúrgica',
    painPoint: 'Acabe com o erro humano de digitação em notas e pedidos. Economize centenas de horas de trabalho braçal todo mês.',
    accentColor: '#10b981',
    pricing: 'A partir de R$ 1.497/mês',
    metrics: '0% ERRO HUMANO · -90% TEMPO OPERACIONAL',
    codinomes: ['opsflow'],
  },
  {
    slug: 'agentes-ia',
    name: 'Agentes de IA Corporativa',
    tagline: 'RAG & Guardrails Estritos',
    subtitle: 'Inteligência artificial calibrada para sua empresa sem alucinações',
    painPoint: 'A IA fala apenas a verdade da sua empresa com segurança jurídica e transbordo humano no ápice da negociação.',
    accentColor: '#ec4899',
    pricing: 'A partir de R$ 1.897/mês',
    metrics: '0% ALUCINAÇÃO · 85% RESOLUÇÃO IMEDIATA',
  },
  {
    slug: 'personalizados',
    name: 'Sistemas Sob Medida',
    tagline: 'Engenharia Dedicada & Arquitetura',
    subtitle: 'Desenvolvimento proprietário quando ferramentas prontas não atendem',
    painPoint: 'Não pague mensalidades astronômicas por usuário em ferramentas genéricas. Tenha um sistema proprietário que valoriza sua empresa.',
    accentColor: '#f59e0b',
    pricing: 'Projetos a partir de R$ 4.900',
    metrics: '100% PROPRIETÁRIO · ALTA CONCORRÊNCIA',
  },
];

export interface OfferPlan {
  id: string;
  name: string;
  badge: string;
  price: string;
  period: string;
  description: string;
  highlight: boolean;
}

/** Preço de entrada da IDSR — único valor citado fora de offer.ts deve apontar pra cá. */
export const STARTER_PRICE = 'R$ 997';
export const STARTER_PERIOD = '/mês';

export const OFFER_PLANS: OfferPlan[] = [
  {
    id: 'starter',
    name: 'Starter',
    badge: 'Essencial para Começar',
    price: STARTER_PRICE,
    period: STARTER_PERIOD,
    description: 'Para empresas que perdem vendas fora do horário e precisam de atendimento imediato 24/7.',
    highlight: false,
  },
  {
    id: 'growth',
    name: 'Growth',
    badge: 'Mais Escolhido para Escala',
    price: 'R$ 1.997',
    period: '/mês',
    description: 'A máquina completa para quem investe em tráfego pago, precisa de follow-up implacável e zero no-show.',
    highlight: true,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    badge: 'Arquitetura Dedicada',
    price: 'Sob Blueprint',
    period: 'Escopo customizado',
    description: 'Para operações complexas que demandam integração com ERPs legados, alta concorrência e governança.',
    highlight: false,
  },
];

export interface OfferSegment {
  id: string;
  name: string;
  badge: string;
  /** Uma dor concreta do segmento, para CTA/copy por nicho. */
  painPoint: string;
  /** Frase de gatilho comercial já validada em QuemPodeUsarModal. */
  salesTrigger: string;
}

export const OFFER_SEGMENTS: OfferSegment[] = [
  {
    id: 'saude',
    name: 'Clínicas & Consultórios de Saúde',
    badge: 'MÉDICO & ODONTOLÓGICO',
    painPoint: 'Pacientes chamam fora do horário comercial, esperam horas por resposta e faltam em até 40% das consultas agendadas, gerando ociosidade cara.',
    salesTrigger: 'Enquanto sua recepção dorme, pacientes agendam consultas no domingo à noite com quem responde primeiro.',
  },
  {
    id: 'ecommerce',
    name: 'E-commerce & Lojas Virtuais',
    badge: 'VAREJO & DIGITAL',
    painPoint: 'Carrinhos abandonados sem recuperação ativa, demora para sincronizar estoque entre múltiplos canais e alto custo de comissão em marketplaces.',
    salesTrigger: 'Cada minuto sem responder um carrinho abandonado é uma venda que vai para o concorrente.',
  },
  {
    id: 'imobiliario',
    name: 'Imobiliárias & Construtoras',
    badge: 'ALTO TICKET',
    painPoint: 'Leads de anúncios esperam horas por um corretor; quando contatados, já fecharam com outra imobiliária ou corretores perdem dias com curiosos sem renda compatível.',
    salesTrigger: 'Lead de alto ticket que espera resposta vira visita agendada com o corretor mais rápido — que nem sempre é o seu.',
  },
  {
    id: 'juridico',
    name: 'Escritórios Jurídicos & Contabilidade',
    badge: 'CORPORATIVO & BPO',
    painPoint: 'Sócios e analistas perdem centenas de horas abrindo diários oficiais, baixando NFe manualmente e respondendo clientes repetitivamente sobre andamento de processos.',
    salesTrigger: 'Hora de sócio sênior gasta em tarefa repetitiva é hora que não vira honorário.',
  },
  {
    id: 'b2b',
    name: 'Indústria, Distribuidoras & B2B',
    badge: 'OPERAÇÕES COMPLEXAS',
    painPoint: 'Pedidos tirados no papel ou WhatsApp, equipe interna digitando pedidos no ERP manualmente, divergências de estoque e ciclo comercial lento de vários dias.',
    salesTrigger: 'Ciclo comercial de dias vira ciclo de horas quando o pedido cai direto no ERP certo.',
  },
  {
    id: 'gastronomia',
    name: 'Restaurantes, Delivery & Franquias',
    badge: 'ALTO VOLUME & GIRO',
    painPoint: 'Taxas abusivas de até 27% em apps de delivery, WhatsApp congestionado na sexta-feira à noite com pedidos anotados errado e atraso no atendimento.',
    salesTrigger: 'Pare de trabalhar para pagar comissão a aplicativos. Construa sua própria máquina de pedidos no WhatsApp.',
  },
];

/** Telefone/WhatsApp reais — sempre vêm de contact-config.ts, nunca hardcoded aqui. */
export const OFFER_CONTACT = CONTACT_CONFIG;
export { getWhatsAppUrl };
