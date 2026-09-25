'use client';

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionHeader, TagPill } from '@/components/ui/SectionHeader';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function ComoFuncionoTimeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);

  const etapas = [
    {
      numero: '01',
      nome: 'Diagnóstico & Telemetria',
      duracao: '1 a 3 dias',
      tag: 'FASE INICIAL',
      descricao:
        'Mapeamos os processos manuais, planilhas concorrentes e gargalos operacionais para projetar a automação exata.',
      entregaveis: ['Mapeamento de Fluxos', 'Matriz de Risco', 'Especificação Técnica'],
      accent: '#7c6cf6',
    },
    {
      numero: '02',
      nome: 'Arquitetura & TDD',
      duracao: '1 a 2 semanas',
      tag: 'ENGENHARIA',
      descricao:
        'Construção orientada a testes automatizados (TDD), schemas estritos com Zod e conformidade LGPD. Zero código descartável.',
      entregaveis: ['Suíte de Testes Automatizados', 'Schemas Estritos', 'Barramentos Seguros'],
      accent: '#38e0e0',
    },
    {
      numero: '03',
      nome: 'Homologação & Deploy',
      duracao: '3 a 5 dias',
      tag: 'ENTREGA',
      descricao:
        'Deploy em infraestrutura moderna com monitoramento de latência e treinamento da sua equipe em operação real.',
      entregaveis: ['Ambiente 24/7 Ativo', 'Logs Rastreáveis', 'Manual de Operação'],
      accent: '#f472b6',
    },
    {
      numero: '04',
      nome: 'Sustentação & Evolução',
      duracao: 'Contínuo',
      tag: 'SLA ATIVO',
      descricao:
        'Monitoramento proativo de disponibilidade, auditoria de dados e otimização periódica com relatórios de impacto.',
      entregaveis: ['Alerta Proativo de Falhas', 'Backup & Rastreabilidade', 'Suporte Especializado'],
      accent: '#fbbf24',
    },
  ];

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    const progressLine = progressLineRef.current;
    if (!section || !track) return;

    const ctx = gsap.context(() => {
      // Apenas aplica pin em telas desktop (min-width: 1024px) para preservar acessibilidade mobile
      const mm = gsap.matchMedia();

      mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
        const scrollDistance = track.scrollWidth - track.clientWidth + 80;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            pin: true,
            scrub: 1, // Easing linear estritamente ligado ao progresso do scroll, sem inércia extra
            start: 'top top',
            end: () => `+=${scrollDistance}`,
            invalidateOnRefresh: true,
          },
        });

        // Travelling lateral horizontal contínuo
        tl.to(track, {
          x: () => -scrollDistance,
          ease: 'none',
        });

        // Barra de progresso da esteira
        if (progressLine) {
          tl.to(
            progressLine,
            {
              scaleX: 1,
              ease: 'none',
            },
            0
          );
        }
      });

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set(track, { x: 0 });
        if (progressLine) gsap.set(progressLine, { scaleX: 1 });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="como-funciona"
      className="py-24 px-6 sm:px-12 bg-[#0a0a0b] relative overflow-hidden min-h-screen flex flex-col justify-center"
    >
      <div className="max-w-7xl mx-auto w-full">
        <div data-reveal="header">
          <SectionHeader index="02" label="PROCESSO & METODOLOGIA" />

          <div className="mb-10 max-w-2xl">
            <h2
              className="text-3xl sm:text-5xl font-bold text-white tracking-[-0.03em] leading-tight"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Como funciona a <span className="text-aurora">execução técnica.</span>
            </h2>
            <p className="mt-3 text-base text-white/70 font-sans leading-relaxed">
              Travelling lateral pela esteira contínua de entrega de software e automação.
            </p>
          </div>

          {/* Linha de progresso visual do travelling */}
          <div className="relative w-full h-1 bg-white/10 rounded-full mb-8 overflow-hidden hidden lg:block">
            <div
              ref={progressLineRef}
              className="h-full w-full origin-left bg-gradient-to-r from-[#7c6cf6] via-[#38e0e0] to-[#f472b6] scale-x-0 will-change-transform"
            />
          </div>
        </div>

        {/* Trilho Horizontal com Pinned Travelling */}
        <div
          ref={trackRef}
          className="flex lg:flex-nowrap flex-wrap gap-6 will-change-transform pb-4"
        >
          {etapas.map((etapa) => (
            <div
              key={etapa.numero}
              data-reveal="card"
              data-cursor="etapa"
              className="p-7 rounded-2xl relative overflow-hidden transition-all duration-300 flex flex-col justify-between group hover:border-white/30 hover:bg-white/[0.08] lg:w-[380px] w-full shrink-0"
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                borderTopColor: 'rgba(255, 255, 255, 0.35)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
              }}
            >
              {/* Top Specular Shine com sutil tingimento Aurora */}
              <div
                className="absolute top-0 left-4 right-4 h-px opacity-70 pointer-events-none"
                style={{
                  background: `linear-gradient(90deg, transparent, ${etapa.accent}, transparent)`,
                }}
              />

              <div>
                <div className="flex items-center justify-between mb-4">
                  <span
                    className="font-mono text-2xl font-bold text-white"
                    style={{ fontFamily: 'var(--font-mono)' }}
                  >
                    {etapa.numero}
                  </span>
                  <TagPill accent>{etapa.tag}</TagPill>
                </div>

                <h3 className="text-xl font-bold text-white mb-2 font-sans group-hover:text-[#38e0e0] transition-colors">
                  {etapa.nome}
                </h3>
                <p className="text-xs text-white/60 leading-relaxed font-sans mb-6">
                  {etapa.descricao}
                </p>
              </div>

              <div className="pt-4 border-t border-white/10">
                <span className="text-[10px] font-mono text-white/40 block mb-2 uppercase tracking-wider">
                  ENTREGÁVEIS:
                </span>
                <ul className="space-y-1.5 text-[11px] font-mono text-white/70">
                  {etapa.entregaveis.map((item, i) => (
                    <li key={i} className="flex items-center gap-1.5">
                      <span style={{ color: etapa.accent }}>›</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
