'use client';

import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { MOTION } from '@/motion-system-idsr';
import { GitProject } from '@/lib/git-portfolio-data';
import { usePortalStore } from '@/lib/portal-store';

interface ProjetoViewProps {
  project: GitProject;
}

export function ProjetoView({ project }: ProjetoViewProps) {
  const { selectProject } = usePortalStore();
  const [terminalRunning, setTerminalRunning] = useState(false);
  const [terminalStep, setTerminalStep] = useState(0);
  const viewContainerRef = useRef<HTMLElement>(null);
  const heroCardRef = useRef<HTMLDivElement>(null);

  // Efeito de entrada de câmera de projeto (MOTION.ease.out, MOTION.duration.base)
  useEffect(() => {
    const scope = viewContainerRef.current;
    if (!scope) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.fromTo(
          scope,
          { opacity: 0, scale: 0.98, filter: 'blur(8px)' },
          {
            opacity: 1,
            scale: 1,
            filter: 'blur(0px)',
            duration: MOTION.duration.base,
            ease: MOTION.ease.out,
          }
        );
      });

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.fromTo(
          scope,
          { opacity: 0 },
          { opacity: 1, duration: MOTION.duration.base, ease: 'none' }
        );
      });
    }, scope);

    return () => ctx.revert();
  }, [project.id]);

  // Simulação de telemetria do terminal
  const runSimulation = () => {
    setTerminalRunning(true);
    setTerminalStep(0);

    project.terminalSimulation.steps.forEach((step, idx) => {
      setTimeout(() => {
        setTerminalStep(idx + 1);
        if (idx === project.terminalSimulation.steps.length - 1) {
          setTerminalRunning(false);
        }
      }, step.delay * 2);
    });
  };

  // Cores de acento oficiais Aurora por categoria
  const getCategoryTheme = () => {
    switch (project.category) {
      case 'automation':
        return {
          color: '#38e0e0', // Ciano
          cameraMode: 'CÂMERA: TRAVELLING LATERAL DE FLUXO',
          badge: 'bg-[#38e0e0]/15 text-[#38e0e0] border-[#38e0e0]/30',
        };
      case 'ai':
        return {
          color: '#7c6cf6', // Violeta
          cameraMode: 'CÂMERA: ÓRBITA LENTA ORGÂNICA',
          badge: 'bg-[#7c6cf6]/15 text-[#7c6cf6] border-[#7c6cf6]/30',
        };
      case 'backend':
        return {
          color: '#fbbf24', // Âmbar
          cameraMode: 'CÂMERA: DOLLY-IN PROGRESSIVO DE DADOS',
          badge: 'bg-[#fbbf24]/15 text-[#fbbf24] border-[#fbbf24]/30',
        };
      default:
        return {
          color: '#38e0e0',
          cameraMode: 'CÂMERA: FOV 60° EM FOCO',
          badge: 'bg-[#38e0e0]/15 text-[#38e0e0] border-[#38e0e0]/30',
        };
    }
  };

  const theme = getCategoryTheme();

  return (
    <article
      ref={viewContainerRef}
      className="min-h-screen bg-[#0a0a0b] text-white pb-28 will-change-transform"
    >
      {/* Top Banner / Hero do Projeto */}
      <div
        ref={heroCardRef}
        className="relative border-b border-white/10 bg-white/[0.04] backdrop-blur-xl px-6 sm:px-12 py-10 overflow-hidden"
      >
        {/* Ambient Aurora Glow filtrada por trás do vidro */}
        <div
          className="absolute top-0 right-0 w-96 h-96 rounded-full blur-[120px] pointer-events-none opacity-25 -translate-y-1/2 translate-x-1/3"
          style={{
            background: `radial-gradient(circle, ${theme.color} 0%, #7c6cf6 60%, transparent 80%)`,
          }}
        />

        <div className="max-w-5xl mx-auto">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <button
              type="button"
              onClick={() => selectProject(null)}
              className="inline-flex items-center gap-2 text-xs font-mono text-white/60 hover:text-white transition-colors cursor-pointer"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              <span>←</span>
              <span>VOLTAR AO MAPA DE PROJETOS [ESC]</span>
            </button>

            <div className="flex items-center gap-2">
              <span
                className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold border ${theme.badge}`}
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                {theme.cameraMode}
              </span>
              <span
                className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-white/70"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                {project.badge}
              </span>
              {project.repoUrl && (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-0.5 rounded-full border border-white/20 hover:border-white/50 text-[10px] font-mono text-white transition-colors inline-flex items-center gap-1 bg-white/5"
                  style={{ fontFamily: 'var(--font-mono)' }}
                >
                  <span>GITHUB ↗</span>
                </a>
              )}
            </div>
          </div>

          <h1
            className="text-3xl sm:text-5xl font-bold text-white tracking-tight"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {project.name}
          </h1>
          <p
            className="mt-2 text-base sm:text-lg text-white/70 max-w-3xl leading-relaxed"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            {project.tagline}
          </p>

          {/* Ribbon de Métricas em Painéis Liquid Glass */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-8 pt-6 border-t border-white/10">
            {project.metrics.map((m, i) => (
              <div
                key={i}
                className="p-4 rounded-xl bg-white/[0.05] border border-white/15 backdrop-blur-md"
              >
                <span
                  className="font-mono text-[11px] text-white/50 uppercase tracking-wider block"
                  style={{ fontFamily: 'var(--font-mono)' }}
                >
                  {m.label}
                </span>
                <span
                  className="text-2xl font-mono font-bold mt-1 block"
                  style={{ fontFamily: 'var(--font-mono)', color: theme.color }}
                >
                  {m.value}
                </span>
                <span
                  className="text-[11px] text-white/60 block mt-0.5 font-mono"
                  style={{ fontFamily: 'var(--font-mono)' }}
                >
                  {m.trend}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Conteúdo Principal: A Estrutura Estrita dos 3 Blocos */}
      <div className="max-w-5xl mx-auto px-6 sm:px-12 pt-12 space-y-10">
        {/* ================================================================= */}
        {/* BLOCO 1: O QUE É (Problema Resolvido) */}
        {/* ================================================================= */}
        <section
          className="p-6 sm:p-8 rounded-2xl border border-white/15 bg-white/[0.05] backdrop-blur-xl"
          style={{ borderTopColor: 'rgba(255, 255, 255, 0.35)' }}
        >
          <div className="flex items-center gap-2.5 mb-4">
            <span className="w-2 h-2 rounded-full bg-[#38e0e0] shadow-[0_0_6px_#38e0e0]" />
            <span
              className="font-mono text-xs text-[#38e0e0] tracking-widest uppercase font-semibold"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              01 // O QUE É
            </span>
          </div>
          <h2
            className="text-xl sm:text-2xl font-bold text-white mb-4"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            O Problema Real & Diagnóstico
          </h2>
          <p
            className="text-white/80 text-base leading-relaxed mb-6"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            {project.fullDescription}
          </p>

          <div className="p-4 rounded-xl border border-white/10 bg-black/40 flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <span
                className="font-mono text-[11px] text-red-400 uppercase tracking-wider block mb-1"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                [Cenário Anterior / Gargalo]
              </span>
              <p className="text-xs text-white/60 leading-relaxed font-sans">
                {project.businessImpact.before}
              </p>
            </div>
            <div className="hidden sm:block w-px bg-white/10" />
            <div className="flex-1">
              <span
                className="font-mono text-[11px] text-[#38e0e0] uppercase tracking-wider block mb-1"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                [Solução IDSR / Pós-Operação]
              </span>
              <p className="text-xs text-white/80 leading-relaxed font-sans">
                {project.businessImpact.after}
              </p>
            </div>
          </div>
        </section>

        {/* ================================================================= */}
        {/* BLOCO 2: COMO FOI FEITO (Stack, Arquitetura & Decisões) */}
        {/* ================================================================= */}
        <section
          className="p-6 sm:p-8 rounded-2xl border border-white/15 bg-white/[0.05] backdrop-blur-xl"
          style={{ borderTopColor: 'rgba(255, 255, 255, 0.35)' }}
        >
          <div className="flex items-center gap-2.5 mb-4">
            <span className="w-2 h-2 rounded-full bg-[#7c6cf6] shadow-[0_0_6px_#7c6cf6]" />
            <span
              className="font-mono text-xs text-[#7c6cf6] tracking-widest uppercase font-semibold"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              02 // COMO FOI FEITO
            </span>
          </div>
          <h2
            className="text-xl sm:text-2xl font-bold text-white mb-4"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Arquitetura, Stack & Decisões Técnicas
          </h2>

          {/* Tags de Tecnologias & Stack */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.languages.map((lang, i) => (
              <span
                key={i}
                className="px-3 py-1 rounded-lg bg-white/5 border border-white/15 text-xs font-mono text-white"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                {lang}
              </span>
            ))}
          </div>

          {/* Topologia de Componentes */}
          <div className="mb-6">
            <h3
              className="text-xs font-mono text-white/50 uppercase tracking-wider mb-3"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              Topologia de Componentes:
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {project.architecture.nodes.map((node, i) => (
                <div
                  key={i}
                  className="p-3.5 rounded-xl border border-white/10 bg-black/40"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span
                      className="font-mono text-xs font-bold text-white"
                      style={{ fontFamily: 'var(--font-mono)' }}
                    >
                      {node.name}
                    </span>
                    <span
                      className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/10 text-white/60 uppercase"
                      style={{ fontFamily: 'var(--font-mono)' }}
                    >
                      {node.type}
                    </span>
                  </div>
                  <p className="text-xs text-white/60 leading-relaxed font-sans">
                    {node.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Pipeline de Deploy */}
          <div
            className="p-3.5 rounded-xl bg-black/40 border border-white/10 font-mono text-xs text-white/70"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            <span className="text-white/40 block mb-1">// PIPELINE DE DEPLOY:</span>
            <span className="text-[#38e0e0] font-semibold">{project.architecture.pipelineSummary}</span>
          </div>

          {/* Simulador Interativo de Terminal */}
          <div className="mt-8">
            <div className="flex items-center justify-between mb-2.5">
              <span
                className="font-mono text-xs text-white/70 flex items-center gap-2"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                <span>SIMULAÇÃO DE EXECUÇÃO EM TEMPO REAL:</span>
              </span>
              <button
                type="button"
                onClick={runSimulation}
                disabled={terminalRunning}
                className="px-3.5 py-1.5 rounded-lg border border-white/20 bg-white/10 hover:bg-white/20 text-xs font-mono text-white transition-all disabled:opacity-50 cursor-pointer"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                {terminalRunning ? 'EXECUTANDO...' : 'EXECUTAR COMANDO ↵'}
              </button>
            </div>

            <div className="p-4 rounded-xl bg-black/70 border border-white/15 font-mono text-xs overflow-x-auto shadow-inner">
              <div className="text-white/40 mb-2">$ {project.terminalSimulation.command}</div>

              {project.terminalSimulation.steps.map((step, idx) => {
                if (terminalStep <= idx && !terminalRunning && terminalStep === 0) return null;
                if (terminalStep <= idx && terminalRunning) return null;

                const stepColor =
                  step.type === 'success'
                    ? 'text-[#38e0e0]'
                    : step.type === 'metric'
                    ? 'text-[#7c6cf6]'
                    : step.type === 'cmd'
                    ? 'text-[#fbbf24]'
                    : 'text-white/80';

                return (
                  <div key={idx} className={`${stepColor} py-0.5 leading-relaxed`}>
                    {step.text}
                  </div>
                );
              })}

              {terminalStep === 0 && !terminalRunning && (
                <div className="text-white/40 italic">
                  Clique em &quot;EXECUTAR COMANDO&quot; para rodar a telemetria do projeto...
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ================================================================= */}
        {/* BLOCO 3: PARA QUE SERVE (Resultado, Impacto & Quem Usa) */}
        {/* ================================================================= */}
        <section
          className="p-6 sm:p-8 rounded-2xl border border-white/15 bg-white/[0.05] backdrop-blur-xl"
          style={{ borderTopColor: 'rgba(255, 255, 255, 0.35)' }}
        >
          <div className="flex items-center gap-2.5 mb-4">
            <span className="w-2 h-2 rounded-full bg-[#f472b6] shadow-[0_0_6px_#f472b6]" />
            <span
              className="font-mono text-xs text-[#f472b6] tracking-widest uppercase font-semibold"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              03 // PARA QUE SERVE
            </span>
          </div>
          <h2
            className="text-xl sm:text-2xl font-bold text-white mb-4"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Impacto no Negócio, ROI & Aplicação Prática
          </h2>

          <div className="p-4 rounded-xl bg-black/40 border border-white/10 mb-6">
            <span
              className="font-mono text-[10px] text-[#38e0e0] uppercase tracking-wider block mb-2"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              Destaque Operacional:
            </span>
            <p
              className="text-sm sm:text-base font-medium text-white leading-relaxed"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              &quot;{project.businessImpact.highlight}&quot;
            </p>
          </div>

          {/* Selo de Auditoria e Sanitização */}
          <div
            className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-between text-xs font-mono text-white/60"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            <div className="flex items-center gap-2">
              <span className="text-[#38e0e0]">✓</span>
              <span>{project.securityAudit.compliance}</span>
            </div>
            <span className="text-white/40">ZERO CREDENCIAIS EXPOSTAS</span>
          </div>
        </section>

        {/* Ações Finais / Retorno */}
        <div className="flex items-center justify-between pt-6 border-t border-white/10">
          <button
            type="button"
            onClick={() => selectProject(null)}
            className="px-4 py-2 rounded-lg border border-white/15 hover:border-white/40 text-xs font-mono text-white/70 hover:text-white transition-colors cursor-pointer"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            ← VOLTAR À VISÃO GERAL DE PROJETOS
          </button>

          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-lg bg-white text-black font-mono font-bold text-xs hover:bg-white/90 transition-colors inline-flex items-center gap-2"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              <span>VER CÓDIGO NO GITHUB</span>
              <span>↗</span>
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
