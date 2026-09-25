'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Layers, 
  Stethoscope, 
  ShoppingBag, 
  Building2, 
  Scale, 
  Briefcase, 
  UtensilsCrossed, 
  MessageSquare,
  ShieldCheck,
  Zap,
  ArrowRight
} from 'lucide-react';
import { getWhatsAppUrl } from '@/lib/contact-config';

export interface NichoItem {
  id: string;
  name: string;
  badge: string;
  icon: React.ElementType;
  accentColor: string;
  dorCronica: string;
  solucoesCombinadas: {
    name: string;
    tag: string;
    color: string;
  }[];
  comoFunciona: string[];
  impactoEsperado: {
    metrica: string;
    descricao: string;
  }[];
  gatilhoComercial: string;
}

export const NICHOS_DATA: NichoItem[] = [
  {
    id: 'saude',
    name: 'Clínicas & Consultórios de Saúde',
    badge: 'MÉDICO & ODONTOLÓGICO',
    icon: Stethoscope,
    accentColor: '#38e0e0',
    dorCronica: 'Pacientes chamam fora do horário comercial, esperam horas por resposta e faltam em até 40% das consultas agendadas, gerando ociosidade cara.',
    solucoesCombinadas: [
      { name: 'Automações WhatsApp', tag: 'Atendimento 24/7', color: '#38e0e0' },
      { name: 'Agente de IA', tag: 'Triagem & Dúvidas', color: '#ec4899' },
      { name: 'Dashboards Analíticos', tag: 'Ocupação & No-Show', color: '#8b5cf6' },
    ],
    comoFunciona: [
      'Atendimento e triagem imediata no WhatsApp 24/7 tirando dúvidas de procedimentos e valores de consulta.',
      'Agendamento automático integrado à agenda dos profissionais com sincronização em tempo real.',
      'Régua ativa de confirmação interativa 24h e 2h antes (com 1 clique para Sim/Remarcar), preenchendo horários vagos.',
      'Painel de leitura executiva com taxa de ocupação de salas, no-show diário e faturamento projetado.',
    ],
    impactoEsperado: [
      { metrica: '-80% NO-SHOW', descricao: 'Confirmações ativas via WhatsApp' },
      { metrica: 'RESPOSTA < 3s', descricao: 'Atendimento imediato mesmo de madrugada' },
      { metrica: '+30% RECEITA', descricao: 'Aproveitamento total da agenda clínica' },
    ],
    gatilhoComercial: 'Enquanto sua recepção dorme, pacientes agendam consultas no domingo à noite com quem responde primeiro.',
  },
  {
    id: 'ecommerce',
    name: 'E-commerce & Lojas Virtuais',
    badge: 'VAREJO & DIGITAL',
    icon: ShoppingBag,
    accentColor: '#8b5cf6',
    dorCronica: 'Carrinhos abandonados sem recuperação ativa, demora para sincronizar estoque entre múltiplos canais e alto custo de comissão em marketplaces.',
    solucoesCombinadas: [
      { name: 'Landing Pages Velozes', tag: 'Alta Conversão', color: '#8b5cf6' },
      { name: 'Robôs de Dados (RPA)', tag: 'Sincronização de Estoque', color: '#10b981' },
      { name: 'Automações WhatsApp', tag: 'Recuperação de Carrinho', color: '#38e0e0' },
    ],
    comoFunciona: [
      'Páginas de produtos de altíssima velocidade (<0.8s) com checkout transparente e foco total em conversão.',
      'Robôs de RPA que monitoram e sincronizam estoque e preços na Shopee, Mercado Livre e loja própria a cada 10 min.',
      'Disparo de WhatsApp para carrinhos abandonados com cupom dinâmico e rastreamento transacional de encomendas.',
      'Painel em tempo real de CAC, ROAS por produto e curva ABC de vendas.',
    ],
    impactoEsperado: [
      { metrica: '+35% CONVERSÃO', descricao: 'Páginas rápidas e checkout fluido' },
      { metrica: 'ZERO ERRO', descricao: 'Estoque unificado entre canais' },
      { metrica: '25% RECUPERADOS', descricao: 'Carrinhos recuperados no WhatsApp' },
    ],
    gatilhoComercial: 'Cada segundo de lentidão ou lead sem follow-up custa dinheiro direto no bolso do concorrente.',
  },
  {
    id: 'imobiliario',
    name: 'Imobiliárias & Construtoras',
    badge: 'ALTO TICKET',
    icon: Building2,
    accentColor: '#f59e0b',
    dorCronica: 'Leads de anúncios esperam horas por um corretor; quando contatados, já fecharam com outra imobiliária ou corretores perdem dias com curiosos sem renda compatível.',
    solucoesCombinadas: [
      { name: 'Automações WhatsApp/Direct', tag: 'Qualificação Instantânea', color: '#38e0e0' },
      { name: 'Agente de IA', tag: 'Apresentação de Imóveis', color: '#ec4899' },
      { name: 'Dashboards Analíticos', tag: 'Funil de Corretores', color: '#8b5cf6' },
    ],
    comoFunciona: [
      'Lead clica no anúncio e recebe mensagem no WhatsApp em 2 segundos com as opções correspondentes.',
      'Agente de IA qualifica capacidade de compra, objetivo (moradia/investimento) e envia plantas e fotos na hora.',
      'Distribuição imediata do lead qualificado diretamente para o WhatsApp do corretor de plantão com briefing pronto.',
      'Dashboard que expõe tempo de atendimento de cada corretor e taxa de conversão por empreendimento.',
    ],
    impactoEsperado: [
      { metrica: 'CONTATO EM 2s', descricao: 'Lead atendido no ápice do interesse' },
      { metrica: '100% QUALIFICADO', descricao: 'Corretor só fala com quem tem perfil' },
      { metrica: 'VISIBILIDADE', descricao: 'Auditoria do funil de cada corretor' },
    ],
    gatilhoComercial: 'O primeiro corretor que responde com o material certo fecha a venda. O lead não espera.',
  },
  {
    id: 'juridico',
    name: 'Escritórios Jurídicos & Contabilidade',
    badge: 'CORPORATIVO & BPO',
    icon: Scale,
    accentColor: '#10b981',
    dorCronica: 'Sócios e analistas perdem centenas de horas abrindo diários oficiais, baixando NFe manualmente e respondendo clientes repetitivamente sobre andamento de processos.',
    solucoesCombinadas: [
      { name: 'Robôs de Dados (RPA)', tag: 'Extração & Monitoramento', color: '#10b981' },
      { name: 'Agente de IA (RAG)', tag: 'Triagem com Guardrails', color: '#ec4899' },
      { name: 'Sistemas Sob Medida', tag: 'Portal do Cliente Seguro', color: '#f59e0b' },
    ],
    comoFunciona: [
      'Robôs de RPA varrem diários oficiais e sistemas de tribunais, cadastrando andamentos e notas fiscais automaticamente.',
      'Agente de IA treinado na base de documentos do escritório tria novos casos e esclarece dúvidas frequentes sem alucinar.',
      'Portal web seguro onde clientes consultam certidões, andamentos e guias fiscais sem acionar a equipe.',
      'Auditoria completa de prazos com alertas automáticos em canais internos.',
    ],
    impactoEsperado: [
      { metrica: '-90% BRAÇAL', descricao: 'Fim da busca manual em diários oficiais' },
      { metrica: 'ZERO ATRASOS', descricao: 'Alertas automáticos de prazos' },
      { metrica: '100% CONFIÁVEL', descricao: 'IA com guardrails estritos anti-erro' },
    ],
    gatilhoComercial: 'Libere seus advogados e contadores para focar em estratégia e captação, não em digitação mecânica.',
  },
  {
    id: 'b2b',
    name: 'Indústria, Distribuidoras & B2B',
    badge: 'OPERAÇÕES COMPLEXAS',
    icon: Briefcase,
    accentColor: '#ec4899',
    dorCronica: 'Pedidos tirados no papel ou WhatsApp, equipe interna digitando pedidos no ERP manualmente, divergências de estoque e ciclo comercial lento de vários dias.',
    solucoesCombinadas: [
      { name: 'Sistemas Sob Medida', tag: 'Portal de Pedidos B2B', color: '#f59e0b' },
      { name: 'Robôs de Conciliação', tag: 'Integração de ERP', color: '#10b981' },
      { name: 'Dashboards Executivos', tag: 'Painel de Faturamento', color: '#8b5cf6' },
    ],
    comoFunciona: [
      'Portal exclusivo para representantes e clientes B2B emitirem pedidos com tabela de preço e crédito validados na hora.',
      'Robôs de integração que injetam pedidos no ERP legado (Bling, Omie, Tiny, TOTVS) sem nenhum clique manual.',
      'Disparo automático de NFe, boletos e código de rastreamento de carga para o cliente.',
      'Dashboard com faturamento por região, margem real por produto e alertas de clientes em risco de churn.',
    ],
    impactoEsperado: [
      { metrica: '48h ➔ 5 MIN', descricao: 'Ciclo do pedido reduzido drasticamente' },
      { metrica: 'ZERO ERROS', descricao: 'Fim dos erros de digitação de notas' },
      { metrica: 'ESCALA TOTAL', descricao: 'Dobre as vendas sem inflar o escritório' },
    ],
    gatilhoComercial: 'Seu concorrente demora 2 dias para confirmar um pedido. Com a IDSR, seu cliente compra em 2 minutos.',
  },
  {
    id: 'gastronomia',
    name: 'Restaurantes, Delivery & Franquias',
    badge: 'ALTO VOLUME & GIRO',
    icon: UtensilsCrossed,
    accentColor: '#38e0e0',
    dorCronica: 'Taxas abusivas de até 27% em apps de delivery, WhatsApp congestionado na sexta-feira à noite com pedidos anotados errado e atraso no atendimento.',
    solucoesCombinadas: [
      { name: 'Automações WhatsApp', tag: 'Cardápio & Pedidos', color: '#38e0e0' },
      { name: 'Agente de IA', tag: 'Suporte & Dúvidas', color: '#ec4899' },
      { name: 'Dashboards de Vendas', tag: 'Painel de Cozinha', color: '#8b5cf6' },
    ],
    comoFunciona: [
      'Atendimento e cardápio digital interativo no WhatsApp com cálculo de frete por CEP/distância e Pix instantâneo.',
      'Agente de IA que responde sobre tempo de entrega, alergênicos e promoções do dia em menos de 3 segundos.',
      'Pedidos caem impressos ou em tela na cozinha sem intervenção humana, organizados por ordem cronológica.',
      'Base própria de clientes com disparos programados de fidelidade para reengajar clientes no almoço e jantar.',
    ],
    impactoEsperado: [
      { metrica: '27% ECONOMIZADOS', descricao: 'Vendas sem taxas de marketplaces' },
      { metrica: '100% AUTOMÁTICO', descricao: 'Capacidade de atender 50 pedidos/minuto' },
      { metrica: '+45% RECOMPRA', descricao: 'Campanhas de fidelidade na base própria' },
    ],
    gatilhoComercial: 'Pare de trabalhar para pagar comissão a aplicativos. Construa sua própria máquina de pedidos no WhatsApp.',
  },
];

interface QuemPodeUsarModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultNichoId?: string;
}

export function QuemPodeUsarModal({ isOpen, onClose, defaultNichoId = 'saude' }: QuemPodeUsarModalProps) {
  const [selectedNichoId, setSelectedNichoId] = useState<string>(defaultNichoId);

  useEffect(() => {
    if (defaultNichoId) setSelectedNichoId(defaultNichoId);
  }, [defaultNichoId]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  const activeNicho = NICHOS_DATA.find((n) => n.id === selectedNichoId) || NICHOS_DATA[0];

  const handleWhatsAppContact = () => {
    const solucoesStr = activeNicho.solucoesCombinadas.map((s) => s.name).join(', ');
    const msg = `Olá Rocha! Vi no site da IDSR as soluções para o nicho de ${activeNicho.name} e quero entender como combinar (${solucoesStr}) na minha empresa.`;
    const url = getWhatsAppUrl(msg);
    window.open(url, '_blank');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 md:p-10 select-none">
          {/* Backdrop Escuro com Blur Profundo */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/85 backdrop-blur-xl"
          />

          {/* Container do Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', damping: 26, stiffness: 280 }}
            className="relative w-full max-w-5xl max-h-[92vh] flex flex-col rounded-2xl border border-white/15 bg-[#0d0e12]/95 shadow-[0_24px_64px_rgba(0,0,0,0.9),0_0_40px_rgba(56,224,224,0.1)] overflow-hidden"
          >
            {/* Header do Modal */}
            <div className="flex items-center justify-between px-5 sm:px-8 py-4 border-b border-white/10 bg-black/40">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#38e0e0]">
                  <Layers className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] tracking-widest uppercase text-[#38e0e0] font-bold">
                      QUEM PODE USAR
                    </span>
                    <span className="text-[10px] font-mono text-white/40">{'// ARQUITETURA POR NICHO'}</span>
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-white tracking-tight">
                    Como Mesclar Soluções IDSR para o Seu Mercado
                  </h3>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="w-8 h-8 rounded-lg border border-white/10 bg-white/5 hover:bg-white/15 flex items-center justify-center text-white/70 hover:text-white transition-colors cursor-pointer"
                aria-label="Fechar"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Conteúdo com Barra de Nichos + Área de Detalhes */}
            <div className="flex-1 overflow-y-auto flex flex-col md:flex-row">
              {/* Barra Lateral / Tabs de Nichos */}
              <div className="w-full md:w-72 shrink-0 border-b md:border-b-0 md:border-r border-white/10 p-3 sm:p-4 space-y-1.5 bg-black/25">
                <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-white/40 px-3 py-1">
                  Selecione o seu nicho:
                </p>
                {NICHOS_DATA.map((nicho) => {
                  const Icon = nicho.icon;
                  const isSelected = nicho.id === selectedNichoId;
                  return (
                    <button
                      key={nicho.id}
                      type="button"
                      onClick={() => setSelectedNichoId(nicho.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl border text-left transition-all duration-200 cursor-pointer ${
                        isSelected
                          ? 'border-white/20 bg-white/10 text-white shadow-sm'
                          : 'border-transparent text-white/60 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <div
                        className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 border transition-colors"
                        style={{
                          backgroundColor: isSelected ? `${nicho.accentColor}20` : 'rgba(255,255,255,0.04)',
                          borderColor: isSelected ? nicho.accentColor : 'rgba(255,255,255,0.1)',
                          color: isSelected ? nicho.accentColor : 'rgba(255,255,255,0.6)',
                        }}
                      >
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="block text-xs font-semibold truncate leading-tight">
                          {nicho.name}
                        </span>
                        <span className="block text-[9px] font-mono text-white/40 uppercase tracking-wider">
                          {nicho.badge}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Área Principal de Detalhes do Nicho Selecionado */}
              <div className="flex-1 p-5 sm:p-7 space-y-5 overflow-y-auto">
                {/* Cabeçalho do Nicho */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
                  <div>
                    <span
                      className="inline-block px-2.5 py-0.5 rounded-full font-mono text-[10px] font-bold tracking-wider uppercase mb-1.5"
                      style={{
                        backgroundColor: `${activeNicho.accentColor}15`,
                        color: activeNicho.accentColor,
                        border: `1px solid ${activeNicho.accentColor}40`,
                      }}
                    >
                      {activeNicho.badge}
                    </span>
                    <h4 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                      {activeNicho.name}
                    </h4>
                  </div>
                </div>

                {/* Dor Crônica / O que Sangra a Operação */}
                <div className="p-3.5 sm:p-4 rounded-xl border border-red-500/20 bg-red-950/15">
                  <span className="font-mono text-[10px] uppercase font-bold tracking-widest text-red-400 block mb-1">
                    [ ! ] O PROBLEMA CRÔNICO DO SETOR
                  </span>
                  <p className="text-xs sm:text-sm text-white/85 leading-relaxed">
                    {activeNicho.dorCronica}
                  </p>
                </div>

                {/* Soluções Combinadas (O Stack Perfeito) */}
                <div>
                  <span className="font-mono text-[10px] uppercase font-bold tracking-widest text-white/50 block mb-2.5">
                    {'// COMBINAÇÃO SINÉRGICA IDSR'}
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {activeNicho.solucoesCombinadas.map((solucao, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-xl border border-white/10 bg-black/40 flex flex-col justify-between"
                      >
                        <span
                          className="font-mono text-[9px] uppercase tracking-wider font-bold block mb-1"
                          style={{ color: solucao.color }}
                        >
                          SOLUÇÃO 0{idx + 1}
                        </span>
                        <h5 className="text-xs font-bold text-white">{solucao.name}</h5>
                        <span className="text-[10px] font-mono text-white/60 mt-1">
                          {solucao.tag}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Como Funciona na Prática */}
                <div>
                  <span className="font-mono text-[10px] uppercase font-bold tracking-widest text-white/50 block mb-2.5">
                    {'// FLUXO OPERACIONAL NA PRÁTICA'}
                  </span>
                  <div className="space-y-2">
                    {activeNicho.comoFunciona.map((passo, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 p-2.5 rounded-lg border border-white/5 bg-white/[0.02]"
                      >
                        <span
                          className="w-5 h-5 rounded-md flex items-center justify-center shrink-0 font-mono text-[10px] font-bold mt-0.5"
                          style={{
                            backgroundColor: `${activeNicho.accentColor}20`,
                            color: activeNicho.accentColor,
                          }}
                        >
                          {idx + 1}
                        </span>
                        <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                          {passo}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Métricas de Impacto Esperado */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {activeNicho.impactoEsperado.map((imp, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl border border-white/10 bg-white/[0.02] text-center"
                    >
                      <span
                        className="font-mono text-sm sm:text-base font-black block tracking-tight"
                        style={{ color: activeNicho.accentColor }}
                      >
                        {imp.metrica}
                      </span>
                      <span className="text-[10px] text-white/60 font-mono leading-tight block mt-0.5">
                        {imp.descricao}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Gatilho Comercial Chamativo */}
                <div
                  className="p-3.5 sm:p-4 rounded-xl border flex items-center gap-3"
                  style={{
                    backgroundColor: `${activeNicho.accentColor}08`,
                    borderColor: `${activeNicho.accentColor}30`,
                  }}
                >
                  <Zap className="w-5 h-5 shrink-0" style={{ color: activeNicho.accentColor }} />
                  <p className="text-xs sm:text-sm font-semibold text-white/90 italic leading-snug">
                    &ldquo;{activeNicho.gatilhoComercial}&rdquo;
                  </p>
                </div>
              </div>
            </div>

            {/* Footer do Modal com CTA Direto para o WhatsApp */}
            <div className="p-4 sm:p-5 border-t border-white/10 bg-black/60 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-white/60 text-xs">
                <ShieldCheck className="w-4 h-4 text-[#10b981]" />
                <span>Arquitetura direta com engenheiro sênior · Sem intermediários</span>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 text-white/80 hover:text-white font-mono text-xs font-semibold transition-colors cursor-pointer"
                >
                  Voltar ao Site
                </button>
                <button
                  type="button"
                  onClick={handleWhatsAppContact}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#10b981] to-[#38e0e0] text-black font-bold text-xs sm:text-sm tracking-wide shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:brightness-110 active:scale-95 transition-all cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Configurar Minha Solução no WhatsApp</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
