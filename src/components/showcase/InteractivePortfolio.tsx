'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Activity,
  Calendar,
  Users2,
  ClipboardList,
  Sparkles,
  CheckCircle2,
  Clock,
  ArrowRight,
  TrendingUp,
  Building2,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { AnimatedSection } from '@/components/ui/AnimatedSection';

type ModuleTab = 'pulse' | 'leadflow' | 'scheduleflow' | 'opsflow' | 'cases';

export function InteractivePortfolio() {
  const [activeTab, setActiveTab] = useState<ModuleTab>('pulse');

  // Estado do simulador Pulse (Central)
  const [pulseScenario, setPulseScenario] = useState<number>(0);

  // Estado do simulador LeadFlow (Vendas)
  const [leadPipelineStage, setLeadPipelineStage] = useState<string>('qualificado');

  // Estado do simulador ScheduleFlow (Agenda)
  const [scheduleConfirmed, setScheduleConfirmed] = useState<boolean | null>(null);

  // Estado do simulador OpsFlow (Operação)
  const [checklistItems, setChecklistItems] = useState([
    { id: 1, label: 'Abertura de caixa e conferência inicial', done: true, time: '08:02 - Maria S.', status: 'auditado' },
    { id: 2, label: 'Verificação de estoque de insumos críticos', done: true, time: '08:15 - João P.', status: 'auditado' },
    { id: 3, label: 'Alinhamento do briefing operacional do dia', done: false, time: 'Pendente - Turno Manhã', status: 'em_andamento' },
    { id: 4, label: 'Higienização e checklist de conformidade', done: false, time: 'Aguardando', status: 'pendente' },
  ]);

  const toggleChecklist = (id: number) => {
    setChecklistItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              done: !item.done,
              time: !item.done ? `${new Date().toLocaleTimeString().slice(0, 5)} - Gestor (Ao vivo)` : 'Pendente',
              status: !item.done ? 'auditado' : 'pendente',
            }
          : item
      )
    );
  };

  const PULSE_SCENARIOS = [
    {
      title: 'Fora do Horário (23h40)',
      customerMsg: 'Olá, ainda tem horário disponível para esta sexta no jantar?',
      botReply:
        'Olá! Nosso atendimento humano retorna amanhã às 9h, mas posso reservar sua mesa agora mesmo. Para quantas pessoas seria a reserva na sexta-feira?',
      speed: '8 segundos',
      outcome: 'Lead qualificado e registrado sem perder o cliente para a concorrência.',
    },
    {
      title: 'Cliente de Alto Valor',
      customerMsg: 'Preciso de orçamento para automação de 3 unidades da minha franquia.',
      botReply:
        'Excelente! Identifiquei seu cenário multi-unidade. Roteando agora para o Diretor de Implantação com prioridade. Qual o melhor horário para ligarmos amanhã?',
      speed: '11 segundos',
      outcome: 'Roteamento instantâneo com tag VIP e notificação imediata no WhatsApp da diretoria.',
    },
    {
      title: 'Dúvida Frequente',
      customerMsg: 'Vocês têm integração com o sistema TOTVS ou ContaAzul?',
      botReply:
        'Sim! Através da nossa camada Sob Medida e APIs dedicadas integramos diretamente com seu ERP para sincronizar clientes e pedidos sem digitação manual.',
      speed: '6 segundos',
      outcome: 'Objeção técnica quebrada imediatamente com explicação clara.',
    },
  ];

  return (
    <section id="portfolio-interativo" className="relative w-full py-28 bg-[#0a0a0a] border-t border-[#2a2a2a]/40">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header da Seção */}
        <AnimatedSection variant="fade-up" className="text-center mb-16">
          <div className="inline-block px-3.5 py-1 bg-[#0f0f0f] border border-[#2a2a2a] rounded-full mb-3">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#B8956A] font-medium flex items-center gap-1.5 justify-center">
              <Sparkles className="w-3 h-3 text-[#B8956A]" />
              Portfólio Interativo & Demonstração Ao Vivo
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extralight text-[#E7ECEF] mb-4">
            Experimente os módulos em funcionamento
          </h2>
          <p className="text-sm text-[#E7ECEF]/50 max-w-2xl mx-auto leading-relaxed">
            Veja como nossa arquitetura de automação, rastreabilidade e dados resolve os gargalos reais do dia a dia da sua empresa.
          </p>
        </AnimatedSection>

        {/* Barra de Navegação entre Módulos */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {[
            { id: 'pulse', label: 'Pulse (Central 24/7)', icon: Activity },
            { id: 'leadflow', label: 'LeadFlow (Vendas)', icon: Users2 },
            { id: 'scheduleflow', label: 'ScheduleFlow (Agenda)', icon: Calendar },
            { id: 'opsflow', label: 'OpsFlow (Operações)', icon: ClipboardList },
            { id: 'cases', label: 'Cases Reais (Zapão / Casa Rael)', icon: Building2 },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as ModuleTab)}
                className={cn(
                  'px-4 py-2.5 rounded-xl text-xs font-medium transition-all flex items-center gap-2 cursor-pointer border',
                  isActive
                    ? 'bg-[#0D7C66] text-white border-[#0D7C66] shadow-lg shadow-[#0D7C66]/20'
                    : 'bg-[#111111] text-[#E7ECEF]/60 border-[#2a2a2a] hover:text-[#E7ECEF] hover:border-[#2a2a2a]/80'
                )}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Área do Painel Interativo */}
        <div className="bg-[#111111] border border-[#2a2a2a] rounded-3xl p-6 md:p-10 shadow-2xl shadow-black/80 relative overflow-hidden">
          <AnimatePresence mode="wait">
            {/* 1. PULSE DEMO */}
            {activeTab === 'pulse' && (
              <motion.div
                key="pulse"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-[#2a2a2a] pb-6">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                      <h3 className="text-xl font-light text-[#E7ECEF]">Central Pulse — Simulador de Triagem</h3>
                    </div>
                    <p className="text-xs text-[#E7ECEF]/50">
                      Respostas contextuais instantâneas que qualificam clientes e evitam perda de negócios.
                    </p>
                  </div>
                  <div className="flex gap-2">
                    {PULSE_SCENARIOS.map((sc, idx) => (
                      <button
                        key={idx}
                        onClick={() => setPulseScenario(idx)}
                        className={cn(
                          'px-3 py-1.5 rounded-lg text-xs font-mono transition-colors cursor-pointer border',
                          pulseScenario === idx
                            ? 'bg-[#0B3B2E] border-[#0D7C66] text-[#E7ECEF]'
                            : 'bg-[#0a0a0a] border-[#2a2a2a] text-[#E7ECEF]/40 hover:text-[#E7ECEF]'
                        )}
                      >
                        Cenário {idx + 1}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Simulador Visual do Chat Pulse */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2 bg-[#0a0a0a] border border-[#2a2a2a] rounded-2xl p-6 space-y-4">
                    <div className="text-[10px] font-mono uppercase tracking-wider text-[#B8956A] pb-2 border-b border-[#2a2a2a]/60 flex items-center justify-between">
                      <span>Cenário: {PULSE_SCENARIOS[pulseScenario].title}</span>
                      <span className="text-emerald-400">Latência: {PULSE_SCENARIOS[pulseScenario].speed}</span>
                    </div>

                    {/* Mensagem do Cliente */}
                    <div className="flex justify-start">
                      <div className="max-w-[85%] bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-3.5 text-sm text-[#E7ECEF]/90">
                        <div className="text-[10px] text-[#E7ECEF]/40 mb-1">Cliente via WhatsApp</div>
                        {PULSE_SCENARIOS[pulseScenario].customerMsg}
                      </div>
                    </div>

                    {/* Resposta do Pulse */}
                    <div className="flex justify-end">
                      <div className="max-w-[85%] bg-[#0D7C66]/20 border border-[#0D7C66]/40 rounded-xl p-3.5 text-sm text-[#E7ECEF]">
                        <div className="text-[10px] text-[#0D7C66] font-medium mb-1 flex items-center gap-1">
                          <Activity className="w-3 h-3" />
                          IDSR Pulse (Automação Inteligente)
                        </div>
                        {PULSE_SCENARIOS[pulseScenario].botReply}
                      </div>
                    </div>
                  </div>

                  {/* Resultados do Módulo */}
                  <div className="bg-[#0f0f0f] border border-[#2a2a2a] rounded-2xl p-6 flex flex-col justify-between space-y-4">
                    <div>
                      <h4 className="text-xs uppercase tracking-wider text-[#B8956A] font-medium mb-3">
                        Impacto Operacional
                      </h4>
                      <p className="text-sm text-[#E7ECEF]/70 leading-relaxed mb-4">
                        {PULSE_SCENARIOS[pulseScenario].outcome}
                      </p>
                      <div className="space-y-2 text-xs text-[#E7ECEF]/50">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#0D7C66]" />
                          <span>100% das conversas arquivadas e auditáveis</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#0D7C66]" />
                          <span>Sem dependência de atendente acordado 24h</span>
                        </div>
                      </div>
                    </div>

                    <Link
                      href="/produtos#central"
                      className="inline-flex items-center justify-center gap-2 w-full py-2.5 bg-[#0B3B2E] text-white rounded-xl text-xs font-medium hover:bg-[#0D7C66] transition-colors"
                    >
                      Ver especificações da Central Pulse
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            )}

            {/* 2. LEADFLOW DEMO */}
            {activeTab === 'leadflow' && (
              <motion.div
                key="leadflow"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                <div className="border-b border-[#2a2a2a] pb-6">
                  <h3 className="text-xl font-light text-[#E7ECEF] mb-1">
                    LeadFlow — Pipeline Visual com Follow-up Automático
                  </h3>
                  <p className="text-xs text-[#E7ECEF]/50">
                    Clique nas etapas do funil para ver o disparo de réguas automáticas que não deixam negócios esfriarem.
                  </p>
                </div>

                {/* Funil Visual Interativo */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {[
                    { id: 'novo', title: '1. Novo Lead', count: 18, desc: 'Entrada via WhatsApp/Site', alert: 'Triagem em 15s' },
                    { id: 'qualificado', title: '2. Qualificado', count: 9, desc: 'Perfil e orçamento validados', alert: 'Aguardando demo' },
                    { id: 'proposta', title: '3. Proposta Enviada', count: 5, desc: 'Blueprint em análise', alert: 'Follow-up D+2 ativo' },
                    { id: 'fechado', title: '4. Fechado / Ativo', count: 12, desc: 'Setup iniciado', alert: 'Onboarding 7 dias' },
                  ].map((col) => {
                    const isSelected = leadPipelineStage === col.id;
                    return (
                      <div
                        key={col.id}
                        onClick={() => setLeadPipelineStage(col.id)}
                        className={cn(
                          'p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between min-h-48',
                          isSelected
                            ? 'bg-[#0D7C66]/15 border-[#0D7C66] shadow-xl shadow-[#0D7C66]/10'
                            : 'bg-[#0a0a0a] border-[#2a2a2a] hover:border-[#2a2a2a]/90'
                        )}
                      >
                        <div>
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-xs font-light text-[#E7ECEF]">{col.title}</span>
                            <span className="text-xs font-mono font-bold bg-[#111111] px-2 py-0.5 rounded text-[#B8956A]">
                              {col.count}
                            </span>
                          </div>
                          <p className="text-xs text-[#E7ECEF]/50 mb-3">{col.desc}</p>
                        </div>
                        <div className="pt-3 border-t border-[#2a2a2a]/60">
                          <span className="text-[10px] uppercase tracking-wider font-mono text-[#0D7C66] flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" />
                            {col.alert}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Detalhe da Etapa Selecionada */}
                <div className="p-5 bg-[#0a0a0a] border border-[#2a2a2a] rounded-2xl flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-[#B8956A]" />
                    <div>
                      <div className="text-xs font-medium text-[#E7ECEF]">
                        Régua de Automação Ativa nesta etapa:
                      </div>
                      <p className="text-xs text-[#E7ECEF]/50">
                        {leadPipelineStage === 'novo' && 'Disparo de mensagem de boas-vindas com 3 perguntas de triagem.'}
                        {leadPipelineStage === 'qualificado' && 'Notificação ao vendedor responsável com link do WhatsApp do cliente.'}
                        {leadPipelineStage === 'proposta' && 'Lembrete amigável automático a cada 48h sem resposta do cliente.'}
                        {leadPipelineStage === 'fechado' && 'Criação imediata do card de implantação no OpsFlow.'}
                      </p>
                    </div>
                  </div>
                  <Link
                    href="/produtos#vendas"
                    className="text-xs text-[#0D7C66] hover:text-[#E7ECEF] transition-colors whitespace-nowrap"
                  >
                    Ver detalhes do LeadFlow →
                  </Link>
                </div>
              </motion.div>
            )}

            {/* 3. SCHEDULEFLOW DEMO */}
            {activeTab === 'scheduleflow' && (
              <motion.div
                key="scheduleflow"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                <div className="border-b border-[#2a2a2a] pb-6">
                  <h3 className="text-xl font-light text-[#E7ECEF] mb-1">
                    ScheduleFlow — Régua Ativa Anti-No-Show
                  </h3>
                  <p className="text-xs text-[#E7ECEF]/50">
                    Simule a experiência do seu cliente ao receber o lembrete de agendamento 24h antes.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  {/* Mockup de Celular / WhatsApp */}
                  <div className="bg-[#0a0a0a] border border-[#2a2a2a] rounded-3xl p-6 max-w-sm mx-auto w-full shadow-2xl">
                    <div className="text-[10px] text-center text-[#E7ECEF]/40 pb-3 border-b border-[#2a2a2a] mb-4">
                      Lembrete automático enviado 24h antes
                    </div>
                    <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl p-4 text-xs space-y-3">
                      <p className="text-[#E7ECEF]/90 leading-relaxed">
                        Olá <strong>Mariana</strong>! Lembrando do seu agendamento amanhã às <strong>14:30</strong> na Clínica Modelo.
                      </p>
                      <p className="text-[#E7ECEF]/60">
                        Por favor, confirme sua presença clicando abaixo:
                      </p>
                      <div className="space-y-2 pt-2">
                        <button
                          onClick={() => setScheduleConfirmed(true)}
                          className={cn(
                            'w-full py-2.5 rounded-xl text-xs font-medium transition-all cursor-pointer border',
                            scheduleConfirmed === true
                              ? 'bg-[#0D7C66] text-white border-[#0D7C66]'
                              : 'bg-[#111111] text-[#E7ECEF]/80 border-[#2a2a2a] hover:bg-[#0D7C66]/20'
                          )}
                        >
                          {scheduleConfirmed === true ? '✓ Presença Confirmada!' : '👍 Confirmar Presença'}
                        </button>
                        <button
                          onClick={() => setScheduleConfirmed(false)}
                          className={cn(
                            'w-full py-2 rounded-xl text-xs font-medium transition-all cursor-pointer border',
                            scheduleConfirmed === false
                              ? 'bg-amber-950/60 text-amber-200 border-amber-800'
                              : 'bg-transparent text-[#E7ECEF]/40 border-transparent hover:text-[#E7ECEF]'
                          )}
                        >
                          {scheduleConfirmed === false ? 'Horários alternativos enviados!' : 'Remarcar para outro dia'}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Impacto da Confirmação */}
                  <div className="space-y-6">
                    <div className="p-6 bg-[#0f0f0f] border border-[#2a2a2a] rounded-2xl space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-[#0B3B2E]/20 border border-[#0B3B2E]/30 flex items-center justify-center text-[#0D7C66]">
                          <TrendingUp className="w-6 h-6" />
                        </div>
                        <div>
                          <div className="text-2xl font-light text-[#E7ECEF]">Até 65% de queda</div>
                          <div className="text-xs text-[#B8956A]">Em faltas e no-shows não avisados</div>
                        </div>
                      </div>
                      <p className="text-xs text-[#E7ECEF]/60 leading-relaxed">
                        Quando o cliente remarca pelo link inteligente, o horário antigo é liberado na mesma hora para encaixe na lista de espera.
                      </p>
                    </div>

                    <Link
                      href="/produtos#agenda"
                      className="inline-flex items-center justify-center gap-2 w-full py-3 bg-[#0D7C66] text-white rounded-xl text-xs font-medium hover:bg-[#0F5A47] transition-all shadow-lg shadow-[#0D7C66]/20"
                    >
                      Conhecer o ScheduleFlow
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            )}

            {/* 4. OPSFLOW DEMO */}
            {activeTab === 'opsflow' && (
              <motion.div
                key="opsflow"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                <div className="border-b border-[#2a2a2a] pb-6">
                  <h3 className="text-xl font-light text-[#E7ECEF] mb-1">
                    OpsFlow — Checklists com Rastreabilidade de Execução
                  </h3>
                  <p className="text-xs text-[#E7ECEF]/50">
                    Clique nas tarefas para simular o carimbo de auditoria em tempo real da rotina da equipe.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2 space-y-3">
                    {checklistItems.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => toggleChecklist(item.id)}
                        className={cn(
                          'p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between',
                          item.done
                            ? 'bg-[#0a0a0a] border-[#0D7C66]/40'
                            : 'bg-[#0f0f0f] border-[#2a2a2a] hover:border-[#2a2a2a]/90'
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={item.done}
                            onChange={() => {}}
                            className="w-4 h-4 rounded border-[#2a2a2a] text-[#0D7C66] focus:ring-0 cursor-pointer"
                          />
                          <div>
                            <div className={cn('text-sm font-light', item.done ? 'line-through text-[#E7ECEF]/40' : 'text-[#E7ECEF]')}>
                              {item.label}
                            </div>
                            <div className="text-[10px] text-[#E7ECEF]/40 font-mono mt-0.5">
                              {item.time}
                            </div>
                          </div>
                        </div>
                        <span
                          className={cn(
                            'text-[10px] uppercase font-mono px-2.5 py-1 rounded-full',
                            item.done
                              ? 'bg-[#0D7C66]/20 text-[#0D7C66]'
                              : 'bg-[#B8956A]/10 text-[#B8956A]'
                          )}
                        >
                          {item.status}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Resumo da Governança */}
                  <div className="bg-[#0a0a0a] border border-[#2a2a2a] rounded-2xl p-6 flex flex-col justify-between">
                    <div>
                      <h4 className="text-xs uppercase tracking-wider text-[#B8956A] font-medium mb-3">
                        Auditoria de Conformidade
                      </h4>
                      <p className="text-xs text-[#E7ECEF]/60 leading-relaxed mb-4">
                        Cada ação gera log imutável. Você sabe com precisão cirúrgica quem abriu, quem fechou e quais gargalos atrasaram a entrega.
                      </p>
                      <div className="p-3 bg-[#111111] rounded-xl border border-[#2a2a2a] text-[11px] font-mono text-[#E7ECEF]/70">
                        status: 100% compliant<br />
                        audit_hash: #IDSR-8842<br />
                        responsavel: Maria S.
                      </div>
                    </div>

                    <Link
                      href="/produtos#operacao"
                      className="mt-6 inline-flex items-center justify-center gap-2 w-full py-2.5 bg-[#0B3B2E] text-white rounded-xl text-xs font-medium hover:bg-[#0D7C66] transition-colors"
                    >
                      Conhecer o OpsFlow
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            )}

            {/* 5. CASES REAIS (ZAPÃO & CASA RAEL) */}
            {activeTab === 'cases' && (
              <motion.div
                key="cases"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                <div className="border-b border-[#2a2a2a] pb-6">
                  <h3 className="text-xl font-light text-[#E7ECEF] mb-1">
                    Casos de Estudo Reais & Resultados Comprovados
                  </h3>
                  <p className="text-xs text-[#E7ECEF]/50">
                    Como empresas reais transformaram atendimento caótico e perdas em operações de alta precisão.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Case 1: Zapão */}
                  <div className="bg-[#0a0a0a] border border-[#2a2a2a] hover:border-[#0D7C66]/50 rounded-2xl p-6 space-y-4 transition-all">
                    <div className="flex items-center justify-between">
                      <h4 className="text-lg font-light text-[#E7ECEF]">Zapão Delivery & Operação</h4>
                      <span className="text-[10px] uppercase tracking-wider bg-[#0D7C66]/20 text-[#0D7C66] px-2.5 py-0.5 rounded font-medium">
                        Gastronomia & Varejo
                      </span>
                    </div>

                    <div className="space-y-2 text-xs text-[#E7ECEF]/60 leading-relaxed">
                      <p>
                        <strong>Desafio:</strong> Demora de até 25 minutos para responder pedidos de cardápio nos horários de pico, gerando desistência e reclamações no WhatsApp.
                      </p>
                      <p>
                        <strong>Solução IDSR:</strong> Implantação da <em>Central Pulse</em> com catálogo integrado e triagem de endereço de entrega instantânea.
                      </p>
                    </div>

                    <div className="pt-4 border-t border-[#2a2a2a] grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-xl font-light text-[#B8956A]">12 segundos</div>
                        <div className="text-[10px] text-[#E7ECEF]/40">Tempo médio de resposta</div>
                      </div>
                      <div>
                        <div className="text-xl font-light text-emerald-400">+34%</div>
                        <div className="text-[10px] text-[#E7ECEF]/40">Conversão de pedidos</div>
                      </div>
                    </div>
                  </div>

                  {/* Case 2: Casa Rael */}
                  <div className="bg-[#0a0a0a] border border-[#2a2a2a] hover:border-[#0D7C66]/50 rounded-2xl p-6 space-y-4 transition-all">
                    <div className="flex items-center justify-between">
                      <h4 className="text-lg font-light text-[#E7ECEF]">Casa Rael Eventos & Gastronomia</h4>
                      <span className="text-[10px] uppercase tracking-wider bg-[#B8956A]/20 text-[#B8956A] px-2.5 py-0.5 rounded font-medium">
                        Serviços & Eventos
                      </span>
                    </div>

                    <div className="space-y-2 text-xs text-[#E7ECEF]/60 leading-relaxed">
                      <p>
                        <strong>Desafio:</strong> No-shows em reservas corporativas e dificuldade no controle de checklists entre cozinha e salão.
                      </p>
                      <p>
                        <strong>Solução IDSR:</strong> Combinação de <em>ScheduleFlow</em> para confirmação ativa com <em>OpsFlow</em> para rotinas internas.
                      </p>
                    </div>

                    <div className="pt-4 border-t border-[#2a2a2a] grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-xl font-light text-[#B8956A]">-70%</div>
                        <div className="text-[10px] text-[#E7ECEF]/40">Queda em faltas de agenda</div>
                      </div>
                      <div>
                        <div className="text-xl font-light text-emerald-400">Zero</div>
                        <div className="text-[10px] text-[#E7ECEF]/40">Tarefas esquecidas em eventos</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-center pt-4">
                  <Link
                    href="/contato"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#0D7C66] text-white rounded-xl text-xs font-medium hover:bg-[#0F5A47] transition-all shadow-lg shadow-[#0D7C66]/20"
                  >
                    Quero resultados semelhantes na minha empresa
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
