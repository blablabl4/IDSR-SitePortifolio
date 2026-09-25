'use client';

import React from 'react';
import { useTransition } from '@/context/TransitionContext';
import { DustText } from '@/components/ui/DustText';
import { getWhatsAppUrl } from '@/lib/contact-config';
import { MessageSquare, Zap, CheckCircle2 } from 'lucide-react';

interface ServiceItem {
  id: string;
  title: string;
  badge: string;
  description: string;
  deliverables: string[];
  metrics: { label: string; value: string }[];
  accentColor: string;
  salesTrigger: string;
  whatsappMsg: string;
}

const IDSR_SERVICES: ServiceItem[] = [
  {
    id: 'automacoes',
    title: 'Automações Comerciais & Canais 24/7',
    badge: 'WHATSAPP · DIRECT · TELEGRAM',
    description:
      'Elimine a perda de vendas por demora no atendimento. Robôs e fluxos autônomos que atendem, qualificam contatos em menos de 3 segundos, enviam orçamentos, agendam compromissos e realizam follow-up ativo sem cansar e sem intervenção humana.',
    deliverables: [
      'Atendimento imediato 24/7 no WhatsApp Oficial, Direct e Telegram',
      'Qualificação instantânea e transbordo para o vendedor de plantão',
      'Régua ativa de follow-up para recuperar orçamentos parados',
      'Alertas de oportunidades quentes e notificações em tempo real',
    ],
    metrics: [
      { label: 'TEMPO RESPOSTA', value: '< 3 SEGUNDOS' },
      { label: 'DISPONIBILIDADE', value: '24/7 AUTÔNOMA' },
      { label: 'CONVERSÃO', value: 'ATÉ 3X MAIOR' },
    ],
    accentColor: '#38e0e0',
    salesTrigger: '78% dos clientes compram da primeira empresa que responde. Responda em segundos e não perca mais clientes para a concorrência.',
    whatsappMsg: 'Olá Rocha! Vim pelo site da IDSR e quero estruturar Automações Comerciais 24/7 (WhatsApp/Direct) na minha empresa.',
  },
  {
    id: 'sites-dashboards',
    title: 'Sites de Alta Conversão & Dashboards',
    badge: 'PAGESPEED 95+ · BI EM TEMPO REAL',
    description:
      'Páginas de alta performance desenhadas para transformar tráfego em vendas reais e painéis de leitura executiva para enxergar seus números em tempo real. Carregamento instantâneo, autoridade visual magnética e telemetria clara de faturamento, tráfego e conversão.',
    deliverables: [
      'Landing pages de alta conversão estruturadas com copywriting persuasivo',
      'Dashboards interativos e painéis de leitura financeira e operacional ao vivo',
      'Sites institucionais velozes com estética premium e autoridade máxima',
      'Rastreamento completo com Pixel, Google Tag Manager e webhooks de tráfego',
    ],
    metrics: [
      { label: 'GOOGLE PAGESPEED', value: 'NOTA 95+' },
      { label: 'CARREGAMENTO', value: '< 0.8 SEGUNDOS' },
      { label: 'LEITURA DE DADOS', value: '100% TEMPO REAL' },
    ],
    accentColor: '#8b5cf6',
    salesTrigger: 'Páginas lentas perdem 20% das conversões a cada segundo de atraso. Tenha páginas ultrarrápidas e acompanhe métricas reais.',
    whatsappMsg: 'Olá Rocha! Gostaria de desenvolver um Site / Landing Page de Alta Conversão ou Dashboard de Dados para minha empresa.',
  },
  {
    id: 'dados-robos',
    title: 'Engenharia de Dados & Robôs RPA',
    badge: 'WEB SCRAPERS · PROCESSOS AUTÔNOMOS',
    description:
      'Robôs autônomos que realizam o trabalho repetitivo da sua empresa sem errar e sem parar. Extração de dados da web, monitoramento de concorrentes, conciliação bancária/fiscal e alimentação automática entre sistemas legados e planilhas.',
    deliverables: [
      'Robôs de RPA para conciliação bancária, emissão de notas e cadastros',
      'Web scrapers inteligentes para mineração contínua de preços e mercado',
      'Sincronização automatizada entre bancos de dados, ERPs e planilhas',
      'Alertas automáticos no Telegram/WhatsApp para anomalias ou divergências',
    ],
    metrics: [
      { label: 'ERRO HUMANO', value: '0% RESIDUAL' },
      { label: 'ECONOMIA', value: 'ATÉ 90% MENOS HORAS' },
      { label: 'PRECISÃO', value: '100% AUDITÁVEL' },
    ],
    accentColor: '#10b981',
    salesTrigger: 'Elimine erros manuais em notas e pedidos. Economize centenas de horas de trabalho braçal todo mês com rotinas autônomas.',
    whatsappMsg: 'Olá Rocha! Preciso de Robôs de Automação (RPA) e Processamento de Dados para eliminar gargalos manuais na minha operação.',
  },
  {
    id: 'agentes-ia',
    title: 'Agentes de IA Corporativa & RAG',
    badge: 'GUARDRAILS RÍGIDOS · TRANSBORDO HUMANO',
    description:
      'Modelos de IA calibrados exclusivamente para a realidade da sua empresa. Agentes que consultam seu catálogo, manuais e políticas com travas rígidas anti-alucinação para tirar dúvidas, negociar e agendar sem inventar respostas.',
    deliverables: [
      'Agentes treinados no catálogo, manuais e políticas da sua empresa (RAG)',
      'Guardrails rígidos de contenção (zero alucinações e conformidade total)',
      'Transbordo suave para atendente humano quando o cliente está pronto para fechar',
      'Rastreabilidade total das decisões e diálogos da IA com logs em tempo real',
    ],
    metrics: [
      { label: 'ALUCINAÇÃO', value: '0% (GUARDRAILS)' },
      { label: 'RESOLUÇÃO', value: '85% IMEDIATA' },
      { label: 'COMPREENSÃO', value: 'TEXTO & ÁUDIO' },
    ],
    accentColor: '#ec4899',
    salesTrigger: 'A IA responde com precisão cirúrgica sem inventar respostas, passando o cliente quente no ápice da negociação para sua equipe.',
    whatsappMsg: 'Olá Rocha! Tenho interesse em implantar Agentes de Inteligência Artificial Corporativa com Guardrails na minha empresa.',
  },
  {
    id: 'personalizados',
    title: 'Sistemas Sob Medida & Arquitetura',
    badge: 'PORTAIS · ERPS · ESCALABILIDADE TOTAL',
    description:
      'Quando ferramentas de prateleira travam o crescimento da sua empresa, construímos o software exato para sua regra de negócio. Portais de clientes, ERPs internos, integrações proprietárias e infraestruturas escaláveis prontas para suportar crescimento contínuo.',
    deliverables: [
      'Desenvolvimento Full-Stack moderno com React/Next.js e bancos velozes',
      'Portais de clientes, painéis internos e sistemas de gestão personalizados',
      'Conexão e modernização de sistemas legados via APIs seguras',
      'Infraestrutura em nuvem resiliente com monitoramento e deploy automatizado',
    ],
    metrics: [
      { label: 'DEPENDÊNCIA', value: '0% DE TERCEIROS' },
      { label: 'ESCALABILIDADE', value: 'ALTA CONCORRÊNCIA' },
      { label: 'SEGURANÇA', value: 'NÍVEL ENTERPRISE' },
    ],
    accentColor: '#f59e0b',
    salesTrigger: 'Não pague mensalidades astronômicas por ferramentas genéricas que não atendem sua regra. Tenha um sistema proprietário e escalável.',
    whatsappMsg: 'Olá Rocha! Gostaria de conversar sobre o desenvolvimento de um Sistema Personalizado / Sob Medida para o meu negócio.',
  },
];

export function ServicosGlitchSequence() {
  const { serviceStep, progress, status } = useTransition();

  const service = IDSR_SERVICES[serviceStep] || IDSR_SERVICES[0];
  const isIdle = status === 'IDLE_NA_SECAO';

  // Efeito de Erro de Tela / Glitch: rajada breve, cirúrgica e concentrada
  const glitchActive = progress > 0.05 && progress < 0.48;
  const glitchNorm = glitchActive ? Math.sin(((progress - 0.05) / 0.43) * Math.PI) : 0;
  const glitchOffset = glitchActive ? (Math.sin(progress * 35) * 6 * glitchNorm).toFixed(1) : '0';
  const glitchOpacity = glitchActive ? (1 - glitchNorm * 0.30).toFixed(2) : '1';

  const handleOpenWhatsApp = () => {
    const url = getWhatsAppUrl(service.whatsappMsg);
    window.open(url, '_blank');
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center px-5 sm:px-8 lg:px-14 py-3 sm:py-6 overflow-hidden select-none">
      {/* Camada de Scanlines e Efeito Analógico de Interferência */}
      <div
        className={`absolute inset-0 pointer-events-none transition-opacity duration-150 ${
          glitchActive ? 'opacity-35' : 'opacity-10'
        }`}
        style={{
          backgroundImage:
            'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.4) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))',
          backgroundSize: '100% 4px, 6px 100%',
        }}
      />

      {/* Grid Central Rediagramado em 2 Colunas Equilibradas */}
      <div
        className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center z-10 will-change-transform"
        style={{
          transform: `translateX(${glitchOffset}px)`,
          opacity: Number(glitchOpacity),
        }}
      >
        {/* Coluna Esquerda: Badge + Título + Descrição + Gatilho + CTA */}
        <div className="lg:col-span-6 flex flex-col justify-center space-y-3 sm:space-y-3.5">
          {/* Badge Temático com Ponto Pulsante */}
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-[10px] sm:text-xs font-mono font-bold tracking-wider uppercase w-fit backdrop-blur-md"
            style={{
              borderColor: `${service.accentColor}40`,
              backgroundColor: `${service.accentColor}12`,
              color: service.accentColor,
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ backgroundColor: service.accentColor }}
            />
            <span>{service.badge}</span>
          </div>

          {/* Título do Serviço */}
          <h2
            className="text-xl sm:text-2xl md:text-3xl lg:text-[2.2rem] font-black text-white tracking-[-0.03em] leading-[1.12] uppercase drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)]"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            <DustText
              key={`${service.id}-title`}
              text={service.title}
              accentColor={service.accentColor}
              glowColor={service.accentColor}
              delay={80}
              stagger={12}
              active={isIdle}
            />
          </h2>

          {/* Descrição Comercial */}
          <p className="text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed">
            <DustText
              key={`${service.id}-desc`}
              text={service.description}
              mode="words"
              delay={280}
              stagger={14}
              accentColor={service.accentColor}
              active={isIdle}
            />
          </p>

          {/* Tese de Impacto e Eficiência */}
          <div
            className="px-3.5 py-2.5 rounded-xl border border-white/[0.08] bg-[#08090e]/92 backdrop-blur-xl shadow-lg flex items-start gap-2.5"
            style={{
              borderLeftColor: service.accentColor,
              borderLeftWidth: '3px',
            }}
          >
            <Zap className="w-4 h-4 shrink-0 mt-0.5" style={{ color: service.accentColor }} />
            <span className="text-[11px] sm:text-xs text-zinc-200 leading-snug">
              <strong className="font-mono tracking-wider uppercase text-[10px]" style={{ color: service.accentColor }}>
                IMPACTO NO RESULTADO:{' '}
              </strong>
              {service.salesTrigger}
            </span>
          </div>

          {/* Botão Comercial Direto para WhatsApp */}
          <div className="pt-1">
            <button
              type="button"
              onClick={handleOpenWhatsApp}
              data-cursor="whatsapp"
              className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-xl text-black font-extrabold text-xs font-mono tracking-wide transition-all duration-200 cursor-pointer shadow-[0_0_20px_rgba(56,224,224,0.3)] hover:brightness-110 active:scale-95"
              style={{ backgroundColor: service.accentColor }}
            >
              <MessageSquare className="w-4 h-4" />
              <span>Conversar sobre essa solução no WhatsApp</span>
            </button>
          </div>
        </div>

        {/* Coluna Direita: Modal de Entregáveis & Auditoria Técnica */}
        <div className="lg:col-span-6 flex flex-col justify-center">
          <div className="relative rounded-2xl border border-white/[0.12] bg-[#08090e]/95 backdrop-blur-2xl p-5 sm:p-6 shadow-[0_24px_64px_rgba(0,0,0,0.9)] before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent">
            {/* Topo do Modal */}
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-3 mb-3.5">
              <span className="text-[10px] sm:text-[11px] font-mono font-bold tracking-widest text-zinc-400 uppercase">
                ENTREGÁVEIS & ESCOPO TÉCNICO
              </span>
              <div className="flex items-center gap-1.5 text-[9px] sm:text-[10px] font-mono text-emerald-400 font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>SLA // PROTOCOLO GARANTIDO</span>
              </div>
            </div>

            {/* Grid dos 4 Entregáveis */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5 mb-4">
              {service.deliverables.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 p-2.5 rounded-xl border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.05] transition-colors"
                >
                  <CheckCircle2
                    className="w-4 h-4 shrink-0 mt-0.5"
                    style={{ color: service.accentColor }}
                  />
                  <span className="text-[11px] sm:text-xs font-mono text-zinc-200 leading-snug">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            {/* Faixa de Auditoria e Métricas Técnicas */}
            <div className="pt-3 border-t border-white/[0.08]">
              <div className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest mb-2">
                AUDITORIA & DESEMPENHO MÉTRICO
              </div>
              <div className="grid grid-cols-3 gap-2">
                {service.metrics.map((m, idx) => (
                  <div
                    key={idx}
                    className="p-2 sm:p-2.5 rounded-xl border border-white/[0.08] bg-black/50 text-center flex flex-col justify-center"
                  >
                    <span
                      className="text-xs sm:text-sm font-mono font-black tracking-tight"
                      style={{ color: service.accentColor }}
                    >
                      {m.value}
                    </span>
                    <span className="text-[8px] sm:text-[9px] font-mono text-zinc-400 uppercase tracking-wider mt-0.5">
                      {m.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
