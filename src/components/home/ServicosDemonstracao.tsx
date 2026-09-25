'use client';

import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MOTION } from '@/motion-system-idsr';
import { SectionHeader, TagPill } from '@/components/ui/SectionHeader';
import { FechaduraPortal } from '@/components/portal/FechaduraPortal';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// --- 1. Mini Visualizador: Automação (Esteira Horizontal) ---
function AutomacaoEsteira() {
  const [items, setItems] = useState([
    { id: 1, status: 'processado', text: 'FATURA_#1042' },
    { id: 2, status: 'processando', text: 'PEDIDO_#8891' },
    { id: 3, status: 'fila', text: 'AGENDA_#3310' },
    { id: 4, status: 'fila', text: 'DOC_#7740' },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setItems((prev) => {
        const next = [...prev];
        const first = next.shift()!;
        first.id = Date.now();
        first.status = 'fila';
        next.push(first);
        next[0].status = 'processado';
        next[1].status = 'processando';
        return next;
      });
    }, 2400);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="h-32 rounded-xl p-3 flex flex-col justify-between overflow-hidden relative font-mono text-xs"
      style={{
        background: 'rgba(0, 0, 0, 0.4)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
      }}
    >
      <div className="flex items-center justify-between text-[10px] text-white/50">
        <span>ESTEIRA DE PROCESSAMENTO CONTÍNUO</span>
        <span className="text-[#38e0e0] flex items-center gap-1 font-semibold">
          <span className="w-1.5 h-1.5 rounded-full bg-[#38e0e0] animate-ping" /> ATIVA
        </span>
      </div>

      {/* Belt Track */}
      <div className="relative flex items-center gap-2 overflow-x-hidden py-2">
        {items.map((it, idx) => (
          <div
            key={it.id}
            className={`px-3 py-1.5 rounded-md border transition-all duration-700 shrink-0 text-[11px] ${
              it.status === 'processado'
                ? 'bg-white/10 border-white/40 text-white font-medium shadow-[0_0_10px_rgba(255,255,255,0.15)]'
                : it.status === 'processando'
                ? 'bg-[#7c6cf6]/20 border-[#7c6cf6] text-[#7c6cf6] animate-pulse'
                : 'bg-white/5 border-white/10 text-white/50'
            }`}
          >
            <div className="flex items-center gap-1.5">
              <span>{it.status === 'processado' ? '✓' : idx === 1 ? '⚙' : '•'}</span>
              <span>{it.text}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center text-[10px] text-white/40 border-t border-white/10 pt-1">
        <span>SCANNER FISCAL</span>
        <span className="text-white/80">0.38s LATÊNCIA</span>
      </div>
    </div>
  );
}

// --- 2. Mini Visualizador: Integrações (Barramento de Sistemas) ---
function IntegracoesRede() {
  const [pulseActive, setPulseActive] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setPulseActive((p) => !p);
    }, 1800);
    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className="h-32 rounded-xl p-3 flex flex-col justify-between relative font-mono text-xs overflow-hidden"
      style={{
        background: 'rgba(0, 0, 0, 0.4)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
      }}
    >
      <div className="flex items-center justify-between text-[10px] text-white/50">
        <span>BARRAMENTO DE SISTEMAS & WEBHOOKS</span>
        <span className="text-[#7c6cf6]">SINCRONIZADO</span>
      </div>

      <div className="flex items-center justify-between px-2 my-auto">
        <div className="px-3 py-1.5 rounded-md bg-white/5 border border-white/15 text-center">
          <span className="block text-[10px] text-white/80 font-bold">GATEWAY</span>
          <span className="text-[#38e0e0] text-[9px]">ONLINE</span>
        </div>

        <div className="flex-1 mx-3 h-0.5 bg-white/10 relative">
          <div
            className={`absolute top-1/2 -translate-y-1/2 h-2.5 w-2.5 rounded-full bg-[#7c6cf6] shadow-[0_0_10px_#7c6cf6] transition-all duration-1000 ${
              pulseActive ? 'left-[90%]' : 'left-[10%]'
            }`}
          />
        </div>

        <div className="px-3 py-1.5 rounded-md bg-white/5 border border-white/15 text-center">
          <span className="block text-[10px] text-white/80 font-bold">API ERP/CRM</span>
          <span className="text-[#f472b6] text-[9px]">SYNC 24/7</span>
        </div>
      </div>

      <div className="flex justify-between items-center text-[10px] text-white/40 border-t border-white/10 pt-1">
        <span>TLS 1.3 / WEBHOOKS</span>
        <span className="text-white/80">99.9% ENTREGA</span>
      </div>
    </div>
  );
}

// --- 3. Mini Visualizador: IA (Classificador de Intenções) ---
function IAClassificador() {
  return (
    <div
      className="h-32 rounded-xl p-3 flex flex-col justify-between relative font-mono text-xs overflow-hidden"
      style={{
        background: 'rgba(0, 0, 0, 0.4)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
      }}
    >
      <div className="flex items-center justify-between text-[10px] text-white/50">
        <span>CLASSIFICAÇÃO DE INTENÇÃO & TRIAGEM</span>
        <span className="text-[#f472b6]">MODELO CALIBRADO</span>
      </div>

      <div className="flex items-center justify-between px-2 gap-2 my-auto">
        <div className="text-[10px] text-white/60 flex flex-col">
          <span>ENTRADA BRUTA</span>
          <span className="text-white text-[11px] font-bold">&quot;Quero agendar horário&quot;</span>
        </div>

        <div className="px-2.5 py-1 rounded-full bg-white/10 border border-white/30 text-[10px] text-white font-bold animate-pulse">
          FILTRO IA
        </div>

        <div className="text-[10px] text-right flex flex-col">
          <span className="text-[#38e0e0] font-bold">INTENÇÃO_CONFIRMADA</span>
          <span className="text-white/40 text-[9px]">ROTA: ScheduleFlow</span>
        </div>
      </div>

      <div className="flex justify-between items-center text-[10px] text-white/40 border-t border-white/10 pt-1">
        <span>GUARDRAIL PII</span>
        <span className="text-white/80">0% ALUCINAÇÃO</span>
      </div>
    </div>
  );
}

// --- 4. Mini Visualizador: Dados / ETL (Pipeline Vertical) ---
function DadosETLPipeline() {
  const stages = [
    { label: 'EXTRAÇÃO', desc: 'PDF / Danfes / APIs' },
    { label: 'TRANSFORMAÇÃO', desc: 'Sanitização & Hash' },
    { label: 'CARGA', desc: 'Postgres ACID' },
  ];

  return (
    <div
      className="h-32 rounded-xl p-3 flex flex-col justify-between relative font-mono text-xs overflow-hidden"
      style={{
        background: 'rgba(0, 0, 0, 0.4)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
      }}
    >
      <div className="flex items-center justify-between text-[10px] text-white/50">
        <span>PIPELINE ETL RASTREADO</span>
        <span className="text-[#38e0e0]">AUDITÁVEL</span>
      </div>

      <div className="grid grid-cols-3 gap-2 text-center my-auto">
        {stages.map((st, i) => (
          <div key={i} className="p-1.5 rounded-md bg-white/5 border border-white/10">
            <span className="block text-[9px] text-white/40">{st.label}</span>
            <span className="block text-[10px] font-bold text-white mt-0.5">{st.desc}</span>
            <span className="block text-[9px] text-[#38e0e0] mt-1">✓ OK</span>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center text-[10px] text-white/40 border-t border-white/10 pt-1">
        <span>CONFORMIDADE LGPD</span>
        <span className="text-white/80">0 DIVERGÊNCIAS</span>
      </div>
    </div>
  );
}

export function ServicosDemonstracao() {
  const servicos = [
    {
      id: 'automacao',
      title: 'Automação de Processos',
      tag: 'OPERAÇÃO 24/7',
      description:
        'Eliminação de tarefas manuais repetitivas. Esteiras de processamento para pedidos, faturamento e relatórios automáticos.',
      Visualizer: AutomacaoEsteira,
      targetProject: 'streamassist',
    },
    {
      id: 'integracoes',
      title: 'Integrações de Sistemas',
      tag: 'BARRAMENTOS & APIS',
      description:
        'Conexão segura entre ERPs, WhatsApp, gateways de pagamento e bancos de dados com rastreabilidade ponta a ponta.',
      Visualizer: IntegracoesRede,
      targetProject: 'casa-rael-api',
    },
    {
      id: 'ia',
      title: 'Inteligência Artificial Aplicada',
      tag: 'TRIAGEM & CLASSIFICAÇÃO',
      description:
        'Modelos calibrados para triagem de atendimento, classificação de leads e guardrails rigorosos de segurança.',
      Visualizer: IAClassificador,
      targetProject: 'moderador-guardrails',
    },
    {
      id: 'etl',
      title: 'Dados & Pipelines ETL',
      tag: 'AUDITORIA FISCAL',
      description:
        'Ingestão estruturada de notas fiscais e documentos Danfe em PDF, validação matemática e relatórios instantâneos.',
      Visualizer: DadosETLPipeline,
      targetProject: 'nfparser',
    },
  ];

  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsGridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scope = sectionRef.current;
    if (!scope) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        // Timeline única do cabeçalho
        if (headerRef.current) {
          gsap.from(headerRef.current.children, {
            opacity: 0,
            y: MOTION.distance.small,
            duration: MOTION.duration.base,
            stagger: MOTION.stagger.normal,
            ease: MOTION.ease.out,
            scrollTrigger: {
              trigger: headerRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          });
        }

        // Timeline de entrada com stagger dos 4 cards de serviço
        if (cardsGridRef.current) {
          gsap.from(cardsGridRef.current.children, {
            opacity: 0,
            y: MOTION.distance.medium,
            scale: 0.98,
            duration: MOTION.duration.base,
            stagger: MOTION.stagger.loose,
            ease: MOTION.ease.out,
            scrollTrigger: {
              trigger: cardsGridRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          });
        }
      });

      mm.add('(prefers-reduced-motion: reduce)', () => {
        if (cardsGridRef.current) {
          gsap.from(cardsGridRef.current.children, {
            opacity: 0,
            duration: MOTION.duration.base,
            stagger: MOTION.stagger.normal,
            ease: 'none',
          });
        }
      });
    }, scope);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="servicos"
      className="py-24 px-6 sm:px-12 bg-[#0a0a0b] relative"
    >
      <div className="max-w-6xl mx-auto">
        <div ref={headerRef} data-reveal="header">
          <SectionHeader index="01" label="SERVIÇOS EM AÇÃO" />

          <div className="mb-12 max-w-2xl">
            <h2
              className="text-3xl sm:text-5xl font-bold text-white tracking-[-0.03em] leading-tight"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Serviços demonstrados <span className="text-aurora">em movimento.</span>
            </h2>
            <p className="mt-3 text-base text-white/70 font-sans leading-relaxed">
              Cada módulo abaixo executa telemetria real de engenharia projetada para operar sem fricção e sem retrabalho.
            </p>
          </div>
        </div>

        {/* 4 Liquid Glass Cards Grid */}
        <div ref={cardsGridRef} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {servicos.map((serv) => {
            const Comp = serv.Visualizer;
            return (
              <div
                key={serv.id}
                data-reveal="card"
                data-cursor="serviço"
                className="p-7 rounded-2xl relative overflow-hidden transition-all duration-300 ease-out group hover:border-white/30 hover:bg-white/[0.08]"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  borderTopColor: 'rgba(255, 255, 255, 0.35)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                }}
              >
                {/* Top Specular Shine */}
                <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent pointer-events-none" />

                <div className="flex items-center justify-between mb-4">
                  <TagPill accent>{serv.tag}</TagPill>
                  <FechaduraPortal
                    variant="inline"
                    label="PROJETO GIT"
                    targetProjectId={serv.targetProject}
                    className="py-1 px-3 text-[10px]"
                  />
                </div>

                <h3 className="text-xl font-bold text-white font-sans mb-2 group-hover:text-[#38e0e0] transition-colors">
                  {serv.title}
                </h3>
                <p className="text-sm text-white/70 leading-relaxed mb-6 font-sans">
                  {serv.description}
                </p>

                {/* Live Micro-Visualizer Container */}
                <Comp />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
