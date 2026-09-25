'use client';

import React, { useState } from 'react';
import { useTransition } from '@/context/TransitionContext';
import { DustText } from '@/components/ui/DustText';
import { getWhatsAppUrl } from '@/lib/contact-config';
import { 
  Stethoscope, 
  ShoppingBag, 
  Building2, 
  Briefcase, 
  UtensilsCrossed, 
  Zap, 
  Check, 
  MessageSquare,
  ArrowRight,
  TrendingUp,
  Cpu
} from 'lucide-react';

interface NichoStageItem {
  id: string;
  name: string;
  shortName: string;
  badge: string;
  icon: React.ElementType;
  accentColor: string;
  dorCronica: string;
  solucoesCombinadas: {
    name: string;
    tag: string;
    color: string;
  }[];
  comoFunciona: { title: string; desc: string }[];
  impactoEsperado: {
    metrica: string;
    descricao: string;
  }[];
  gatilhoComercial: string;
}

const NICHOS_STAGE: NichoStageItem[] = [
  {
    id: 'saude',
    name: 'Saúde & Clínicas',
    shortName: 'Saúde & Clínicas',
    badge: 'SAÚDE & ODONTO',
    icon: Stethoscope,
    accentColor: '#38e0e0',
    dorCronica: 'Pacientes contatam fora do horário comercial, aguardam horas por resposta e faltam em até 40% das consultas agendadas, gerando ociosidade cara e perda direta de faturamento.',
    solucoesCombinadas: [
      { name: 'Automações WhatsApp', tag: 'Atendimento 24/7', color: '#38e0e0' },
      { name: 'Agente de IA', tag: 'Triagem RAG', color: '#ec4899' },
      { name: 'Dashboards BI', tag: 'No-Show & Ocupação', color: '#8b5cf6' },
    ],
    comoFunciona: [
      { title: 'Triagem & Atendimento 24/7', desc: 'Resposta imediata no WhatsApp tirando dúvidas de procedimentos, convênios e valores.' },
      { title: 'Agendamento Sincronizado', desc: 'Integração em tempo real com o prontuário e agenda médica dos profissionais.' },
      { title: 'Régua Ativa Anti No-Show', desc: 'Confirmações automáticas interativas 24h e 2h antes com opção de remarcar.' },
      { title: 'Telemetria Executiva', desc: 'Painel com taxa de ocupação de salas, no-show diário e faturamento projetado.' },
    ],
    impactoEsperado: [
      { metrica: '-80% NO-SHOW', descricao: 'Confirmações ativas interativas' },
      { metrica: '< 3s RESPOSTA', descricao: 'Atendimento 24/7 ininterrupto' },
      { metrica: '+30% RECEITA', descricao: 'Aproveitamento total da agenda' },
    ],
    gatilhoComercial: 'Enquanto sua recepção dorme, pacientes agendam no domingo à noite com quem responde primeiro.',
  },
  {
    id: 'ecommerce',
    name: 'E-Commerce & Varejo',
    shortName: 'E-Commerce & D2C',
    badge: 'LOJAS & D2C',
    icon: ShoppingBag,
    accentColor: '#ec4899',
    dorCronica: 'Altas taxas de abandono de checkout, dúvidas recorrentes de frete e prazos que travam a compra e estoque descompassado gerando rupturas operacionais.',
    solucoesCombinadas: [
      { name: 'Robôs RPA & Scrapers', tag: 'Estoque & Preço', color: '#10b981' },
      { name: 'Automação Conversacional', tag: 'Resgate de Carrinho', color: '#38e0e0' },
      { name: 'Dashboards em Tempo Real', tag: 'LTV & CAC', color: '#8b5cf6' },
    ],
    comoFunciona: [
      { title: 'Resgate Imediato de Carrinho', desc: 'Disparos estratégicos no WhatsApp ao abandonar checkout com cupom dinâmico e link direto.' },
      { title: 'Agente de SAC & Rastreio', desc: 'Resolução autônoma de dúvidas de entrega, medidas e políticas de troca no direct/WhatsApp.' },
      { title: 'Conciliação Automática', desc: 'Robôs que sincronizam diariamente gateways de pagamento e baixa de estoque no ERP.' },
      { title: 'BI de Rentabilidade', desc: 'Painel unificado com margem líquida por canal de tráfego e produtos de maior conversão.' },
    ],
    impactoEsperado: [
      { metrica: '+25% RESGATE', descricao: 'Checkouts e boletos recuperados' },
      { metrica: '0% RUÍDO', descricao: 'Rastreamento autônomo de pedidos' },
      { metrica: '100% REALTIME', descricao: 'Visão de faturamento líquido ao vivo' },
    ],
    gatilhoComercial: 'Mais da metade dos carrinhos abandonados são recuperados nos primeiros 15 minutos com abordagem personalizada.',
  },
  {
    id: 'imoveis',
    name: 'Mercado Imobiliário',
    shortName: 'Setor Imobiliário',
    badge: 'IMOBILIÁRIO',
    icon: Building2,
    accentColor: '#8b5cf6',
    dorCronica: 'Leads de alto custo dos portais esfriam pela demora no primeiro contato do corretor, carteiras de imóveis desatualizadas e follow-ups esquecidos.',
    solucoesCombinadas: [
      { name: 'Automações WhatsApp', tag: 'Qualificação Instantânea', color: '#38e0e0' },
      { name: 'Agente de IA', tag: 'Perfil & Match', color: '#ec4899' },
      { name: 'Sistemas Sob Medida', tag: 'Portal Integrado', color: '#f59e0b' },
    ],
    comoFunciona: [
      { title: 'Resposta em 3 Segundos', desc: 'Envio imediato de fotos, vídeo e memorial descritivo assim que o lead converte no anúncio.' },
      { title: 'Qualificação Financeira', desc: 'IA filtra capacidade de compra, bairro de interesse e modalidade de financiamento.' },
      { title: 'Transbordo Estruturado', desc: 'Lead entregue ao corretor responsável com dossiê completo já sincronizado no CRM.' },
      { title: 'Confirmação de Visitas', desc: 'Régua interativa 24h e 2h antes com rota e localização precisa do imóvel.' },
    ],
    impactoEsperado: [
      { metrica: '3s PRIMEIRO CONTATO', descricao: 'Lead atendido no ápice do interesse' },
      { metrica: '3X MAIS VISITAS', descricao: 'Confirmações ativas e follow-up' },
      { metrica: '+45% FECHAMENTO', descricao: 'Corretor recebe lead pré-qualificado' },
    ],
    gatilhoComercial: 'Quem pesquisa imóvel busca em múltiplas imobiliárias. A operação que entrega o memorial em segundos ganha a visita.',
  },
  {
    id: 'consultorias',
    name: 'Advocacia & Consultoria',
    shortName: 'Advocacia & Fiscal',
    badge: 'JURÍDICO & CONTÁBIL',
    icon: Briefcase,
    accentColor: '#10b981',
    dorCronica: 'Equipes técnicas de alto valor perdem centenas de horas respondendo status de processo ou cobrando certidões, extratos e guias fiscais de clientes.',
    solucoesCombinadas: [
      { name: 'Robôs RPA', tag: 'Varredura de Tribunais', color: '#10b981' },
      { name: 'Agente IA RAG', tag: 'Triagem Segura', color: '#ec4899' },
      { name: 'Portal Sob Medida', tag: 'Área do Cliente', color: '#f59e0b' },
    ],
    comoFunciona: [
      { title: 'Varredura Autônoma', desc: 'Robôs monitoram diários oficiais e prefeituras, baixando andamentos e certidões sem intervenção.' },
      { title: 'Consulta Segura de Status', desc: 'Clientes acompanham o andamento do caso diretamente pelo WhatsApp com guardrails rígidos.' },
      { title: 'Coleta de Documentos', desc: 'Régua automática de solicitação de documentos fiscais eliminando e-mails manuais.' },
      { title: 'Controle de Prazos Fatais', desc: 'Painel com prazos processuais críticos, honorários vigentes e alertas de risco.' },
    ],
    impactoEsperado: [
      { metrica: '-90% TRABALHO BRAÇAL', descricao: 'Emissão e checagem de certidões' },
      { metrica: 'ZERO ATRASOS', descricao: 'Alertas preditivos de prazos' },
      { metrica: '100% AUDITÁVEL', descricao: 'LGPD e conformidade estrita' },
    ],
    gatilhoComercial: 'Sua equipe deve focar em teses e estratégias de alto valor, não em preencher guias e mandar mensagens cobrando extrato.',
  },
  {
    id: 'restaurantes',
    name: 'Food Service & Franquias',
    shortName: 'Food & Franquias',
    badge: 'GASTRONOMIA & DELIVERY',
    icon: UtensilsCrossed,
    accentColor: '#f59e0b',
    dorCronica: 'Comissões de até 27% drenando a margem nos apps de entrega, sobrecarga de mensagens no WhatsApp nos horários de pico e falta de dados da própria base.',
    solucoesCombinadas: [
      { name: 'Automações WhatsApp', tag: 'Cardápio & Pedidos Próprios', color: '#38e0e0' },
      { name: 'Dashboards BI', tag: 'Ticket Médio & Vendas', color: '#8b5cf6' },
      { name: 'Robôs RPA', tag: 'Integração PDV & Cozinha', color: '#10b981' },
    ],
    comoFunciona: [
      { title: 'Cardápio Próprio Integrado', desc: 'Cardápio digital ultrarrápido com pagamento Pix nativo e envio direto para o PDV da cozinha.' },
      { title: 'Zero Taxas de Intermediação', desc: 'Canal proprietário retém 100% da margem de faturamento sem repasses abusivos.' },
      { title: 'Recompra Automatizada', desc: 'Disparos estratégicos no horário de refeição para a base de clientes recorrentes.' },
      { title: 'Telemetria de Cozinha', desc: 'Painel em tempo real com tempo de preparo, faturamento e pratos mais rentáveis.' },
    ],
    impactoEsperado: [
      { metrica: 'R$ 0 TAXAS APPS', descricao: 'Canal direto sem intermediários' },
      { metrica: '+35% RECOMPRA', descricao: 'Acionamento automático da base' },
      { metrica: '< 1min PEDIDO', descricao: 'Fluxo autônomo sem fila' },
    ],
    gatilhoComercial: 'Cada pedido via aplicativo tradicional custa até 27% da sua margem. Com canal próprio estruturado, o lucro líquido dobra.',
  },
  {
    id: 'startups',
    name: 'Startups & Empresas B2B',
    shortName: 'Startups & SaaS',
    badge: 'SAAS & B2B TECH',
    icon: Cpu,
    accentColor: '#38bdf8',
    dorCronica: 'Gargalos no onboarding de novos clientes, sobrecarga no suporte técnico N1 e ausência de integração entre meios de pagamento, CRM e banco de dados.',
    solucoesCombinadas: [
      { name: 'Agentes IA Corporativos', tag: 'Onboarding & N1', color: '#ec4899' },
      { name: 'Engenharia de Dados & APIs', tag: 'Barramento Seguro', color: '#10b981' },
      { name: 'Sistemas Sob Medida', tag: 'Escalabilidade', color: '#f59e0b' },
    ],
    comoFunciona: [
      { title: 'Onboarding Autônomo', desc: 'Ativação interativa de novos usuários com suporte contextual por IA treinada na sua base.' },
      { title: 'Barramento de Integrações', desc: 'Sincronização bidirecional entre gateways Stripe/MercadoPago, CRM e bancos de dados.' },
      { title: 'Suporte N1 sem Fila', desc: 'Resolução instantânea de mais de 80% das dúvidas técnicas com transbordo humano preciso.' },
      { title: 'Infraestrutura Resiliente', desc: 'Arquitetura moderna preparada para picos de concorrência com 99.98% de disponibilidade.' },
    ],
    impactoEsperado: [
      { metrica: '80% SUPORTE N1', descricao: 'Resolvido de forma autônoma' },
      { metrica: 'ESCALA 10X', descricao: 'Sem inflar custo de equipe' },
      { metrica: '99.98% SLA', descricao: 'Infraestrutura blindada contra quedas' },
    ],
    gatilhoComercial: 'Escale seu faturamento multiplicando o volume de clientes sem precisar dobrar o custo fixo com headcount de suporte.',
  },
];

export function QuemPodeUsarSectionStage() {
  const { status } = useTransition();
  const isIdle = status === 'IDLE_NA_SECAO';
  const [activeNichoId, setActiveNichoId] = useState<string>('saude');

  const nicho = NICHOS_STAGE.find((n) => n.id === activeNichoId) || NICHOS_STAGE[0];

  const handleWhatsApp = () => {
    const solucoesStr = nicho.solucoesCombinadas.map((s) => s.name).join(' + ');
    const msg = `Olá Rocha! Vi a seção de Quem Pode Usar na IDSR para ${nicho.name} e quero entender como estruturar (${solucoesStr}) na minha empresa.`;
    const url = getWhatsAppUrl(msg);
    window.open(url, '_blank');
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center px-4 sm:px-8 lg:px-12 py-3 sm:py-5 overflow-hidden select-none">
      <div className="w-full max-w-7xl mx-auto flex flex-col justify-center z-10">
        {/* Topo: Badge + Título da Seção + Descrição */}
        <div className="max-w-4xl lg:max-w-5xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/35 bg-purple-500/10 text-purple-300 text-[10px] sm:text-xs font-mono font-bold tracking-wider uppercase w-fit backdrop-blur-md mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
            <span>APLICAÇÃO PRÁTICA · NICHOS & MERCADOS</span>
          </div>

          <h2
            className="text-xl sm:text-2xl md:text-3xl lg:text-[2.2rem] font-black text-white tracking-[-0.03em] leading-[1.12] uppercase drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)]"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            <DustText
              text="Quem Pode Usar & Soluções Integradas"
              accentColor="#a855f7"
              glowColor="#c084fc"
              delay={80}
              stagger={12}
              active={isIdle}
            />
          </h2>

          <p className="mt-1.5 text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed max-w-3xl">
            <DustText
              text="Nenhuma empresa escala com ferramentas isoladas. Conectamos automações, agentes de IA, robôs de dados e dashboards para criar uma máquina de escala personalizada para o seu setor."
              mode="words"
              delay={260}
              stagger={14}
              accentColor="#a855f7"
              active={isIdle}
            />
          </p>
        </div>

        {/* Barra de Seleção de Nichos em 1 Linha Única sem Quebras */}
        <div className="mt-3.5 w-full flex items-center gap-1.5 p-1 rounded-2xl border border-white/[0.08] bg-[#08090e]/90 backdrop-blur-xl overflow-x-auto no-scrollbar">
          {NICHOS_STAGE.map((item) => {
            const Icon = item.icon;
            const isSelected = item.id === activeNichoId;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveNichoId(item.id)}
                className={`flex-1 min-w-fit flex items-center justify-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all duration-200 cursor-pointer whitespace-nowrap ${
                  isSelected
                    ? 'bg-white/[0.12] text-white border border-white/20 shadow-md'
                    : 'text-zinc-400 hover:text-white hover:bg-white/[0.04] border border-transparent'
                }`}
                style={{
                  color: isSelected ? '#ffffff' : undefined,
                  borderColor: isSelected ? `${item.accentColor}60` : undefined,
                }}
              >
                <Icon
                  className="w-3.5 h-3.5 shrink-0"
                  style={{ color: isSelected ? item.accentColor : 'inherit' }}
                />
                <span>{item.shortName}</span>
              </button>
            );
          })}
        </div>

        {/* Modal de Vidro Escuro Sólido e Despoluído */}
        <div className="mt-3.5 relative rounded-2xl border border-white/[0.12] bg-[#08090e]/95 backdrop-blur-2xl p-5 sm:p-6 shadow-[0_24px_64px_rgba(0,0,0,0.9)] before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
            {/* Coluna Esquerda: Diagnóstico Operacional + Esteira em 4 Etapas (58%) */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
              {/* Diagnóstico do Gargalo (Sem caixa cinza pesada, friso vertical sutil) */}
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: nicho.accentColor }}
                  />
                  <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">
                    DIAGNÓSTICO OPERACIONAL // CENÁRIO DO SETOR
                  </span>
                </div>
                <p
                  className="text-xs sm:text-sm text-zinc-200 font-sans leading-relaxed pl-3.5 border-l-2"
                  style={{ borderColor: `${nicho.accentColor}70` }}
                >
                  {nicho.dorCronica}
                </p>
              </div>

              {/* Esteira de Implementação IDSR */}
              <div>
                <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest block mb-2">
                  ARQUITETURA DE IMPLEMENTAÇÃO // 4 ETAPAS
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {nicho.comoFunciona.map((step, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.04] transition-colors"
                    >
                      <div className="flex items-center gap-1.5 mb-1">
                        <span
                          className="font-mono text-xs font-bold"
                          style={{ color: nicho.accentColor }}
                        >
                          0{idx + 1}.
                        </span>
                        <span className="font-mono text-[11px] font-bold text-white tracking-wide">
                          {step.title}
                        </span>
                      </div>
                      <p className="text-[11px] text-zinc-400 font-sans leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Coluna Direita: Painel Executivo Unificado (42%) */}
            <div className="lg:col-span-5 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 flex flex-col justify-between">
              {/* Tese de Retorno & Eficiência */}
              <div>
                <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest block mb-2">
                  TESE DE RETORNO & EFICIÊNCIA
                </span>
                <blockquote
                  className="text-xs sm:text-sm text-zinc-100 font-sans leading-relaxed italic pl-3 border-l-2"
                  style={{ borderColor: nicho.accentColor }}
                >
                  &ldquo;{nicho.gatilhoComercial}&rdquo;
                </blockquote>
              </div>

              {/* Métricas de Impacto em Faixa Horizontal */}
              <div className="my-auto py-3.5 border-y border-white/[0.08]">
                <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest block mb-2">
                  IMPACTO PROJETADO
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {nicho.impactoEsperado.map((imp, idx) => (
                    <div
                      key={idx}
                      className="p-2 rounded-xl bg-black/40 border border-white/[0.06] text-center flex flex-col justify-center"
                    >
                      <span
                        className="text-xs sm:text-sm font-mono font-black tracking-tight"
                        style={{ color: nicho.accentColor }}
                      >
                        {imp.metrica}
                      </span>
                      <span className="text-[9px] font-sans text-zinc-400 leading-tight mt-0.5">
                        {imp.descricao}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Botão de Ação Executiva no WhatsApp */}
              <button
                type="button"
                onClick={handleWhatsApp}
                data-cursor="whatsapp"
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-black font-extrabold text-xs font-mono tracking-wider uppercase transition-all duration-200 cursor-pointer shadow-[0_0_20px_rgba(56,224,224,0.3)] hover:brightness-110 active:scale-98"
                style={{ backgroundColor: nicho.accentColor }}
              >
                <MessageSquare className="w-4 h-4" />
                <span>Estruturar Solução para {nicho.shortName}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
