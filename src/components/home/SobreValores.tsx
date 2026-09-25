'use client';

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MOTION } from '@/motion-system-idsr';
import { SectionHeader, TagPill } from '@/components/ui/SectionHeader';
import { IrisSymbol } from '@/components/ui/IrisSymbol';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function SobreValores() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const founderCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scope = sectionRef.current;
    if (!scope) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        // Timeline unificada da coluna do Manifesto
        if (leftColRef.current) {
          gsap.from(leftColRef.current.children, {
            opacity: 0,
            y: MOTION.distance.small,
            duration: MOTION.duration.base,
            stagger: MOTION.stagger.normal,
            ease: MOTION.ease.out,
            scrollTrigger: {
              trigger: leftColRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          });
        }

        // Entrada com leve overshoot no Cartão Credencial de Rocha
        if (founderCardRef.current) {
          gsap.from(founderCardRef.current, {
            opacity: 0,
            y: MOTION.distance.medium,
            scale: 0.96,
            duration: MOTION.duration.slow,
            ease: MOTION.ease.overshoot,
            scrollTrigger: {
              trigger: founderCardRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          });
        }
      });

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.from([leftColRef.current, founderCardRef.current], {
          opacity: 0,
          duration: MOTION.duration.base,
          stagger: MOTION.stagger.normal,
          ease: 'none',
        });
      });
    }, scope);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="sobre"
      className="py-24 px-6 sm:px-12 bg-[#0a0a0b] relative"
    >
      <div className="max-w-6xl mx-auto">
        {/* Editorial Section Header */}
        <SectionHeader index="04" label="MANIFESTO & FUNDAÇÃO" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Manifesto Text */}
          <div ref={leftColRef} className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#38e0e0] shadow-[0_0_8px_#38e0e0]" />
              <TagPill accent>engenharia sem atalhos</TagPill>
            </div>

            <h2
              className="text-3xl sm:text-5xl font-bold text-white tracking-[-0.03em] leading-tight"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Elegância técnica,
              <br />
              <span className="text-aurora">transparência total.</span>
            </h2>

            <div className="space-y-4 text-base text-white/70 font-sans leading-relaxed pt-2">
              <p>
                A <strong className="text-white">IDSR</strong> nasceu de uma constatação simples do mercado: a maioria das soluções de automação é frágil, dependente de scripts descartáveis e quebra assim que o volume de dados aumenta.
              </p>

              <p>
                Operamos com rigor de estúdio e disciplina de engenharia. Cada integração, bot conversacional, esteira de processamento fiscal ou pipeline de IA é construído sob disciplina de software: testes automatizados (TDD), schemas estritos, logs auditáveis e segurança em primeiro lugar.
              </p>
            </div>

            {/* Principles Cards (Liquid Glass) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6">
              <div
                className="p-5 rounded-xl transition-all duration-300 hover:border-white/40"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  borderTopColor: 'rgba(255, 255, 255, 0.3)',
                  backdropFilter: 'blur(12px)',
                }}
              >
                <span
                  className="font-mono text-[10px] text-[#7c6cf6] uppercase tracking-widest block mb-2"
                  style={{ fontFamily: 'var(--font-mono)' }}
                >
                  // PILAR 01
                </span>
                <h3 className="font-sans font-bold text-white text-base mb-1.5">
                  Zero Código Descartável
                </h3>
                <p className="text-xs text-white/60 leading-relaxed font-sans">
                  Arquiteturas modulares e tipadas que continuam rodando com estabilidade e escalam sem refatorações dolorosas.
                </p>
              </div>

              <div
                className="p-5 rounded-xl transition-all duration-300 hover:border-white/40"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  borderTopColor: 'rgba(255, 255, 255, 0.3)',
                  backdropFilter: 'blur(12px)',
                }}
              >
                <span
                  className="font-mono text-[10px] text-[#38e0e0] uppercase tracking-widest block mb-2"
                  style={{ fontFamily: 'var(--font-mono)' }}
                >
                  // PILAR 02
                </span>
                <h3 className="font-sans font-bold text-white text-base mb-1.5">
                  Auditoria & Telemetria Real
                </h3>
                <p className="text-xs text-white/60 leading-relaxed font-sans">
                  Nossos clientes enxergam as métricas reais de desempenho e têm total controle sobre seus fluxos e bancos de dados.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Founder Credential Card */}
          <div
            ref={founderCardRef}
            data-cursor="fundador"
            className="lg:col-span-5 flex justify-center will-change-transform"
          >
            <div
              className="w-full max-w-sm p-7 rounded-2xl relative overflow-hidden transition-all duration-300 hover:border-white/35"
              style={{
                background: '#0a0a0b',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                boxShadow: '0 20px 40px -10px rgba(0,0,0,0.6)',
              }}
            >
              {/* Soft Aurora Spot on top-right */}
              <div
                className="absolute top-0 right-0 w-36 h-36 rounded-full blur-3xl opacity-20 pointer-events-none"
                style={{ background: '#f472b6' }}
              ></div>

              {/* Top Bar with Iris & Name */}
              <div className="flex gap-4 items-start relative z-10 mb-6">
                <div
                  className="flex-shrink-0 flex items-center justify-center rounded-lg backdrop-blur-md"
                  style={{
                    width: 46,
                    height: 46,
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    background: 'rgba(255, 255, 255, 0.06)',
                  }}
                >
                  <IrisSymbol size={28} state="open" />
                </div>

                <div>
                  <h3
                    className="text-white text-base font-semibold"
                    style={{ fontFamily: 'var(--font-sans)' }}
                  >
                    Rocha
                  </h3>
                  <p
                    className="text-[10px] text-white/70 font-mono tracking-widest uppercase mt-0.5"
                    style={{ fontFamily: 'var(--font-mono)' }}
                  >
                    FOUNDER · TECH LEAD
                  </p>
                </div>
              </div>

              {/* Divider Line */}
              <div className="h-px bg-white/15 my-4" />

              {/* Contact Information Ribbon */}
              <div
                className="font-mono text-[11px] text-white/70 space-y-1.5 tracking-wider mb-6"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                <div>
                  EMAIL: <strong className="text-white">contato@idsr.com.br</strong>
                </div>
                <div>
                  LOCAL: <strong className="text-white">São Paulo, BR</strong>
                </div>
                <div>
                  STATUS: <strong className="text-[#38e0e0]">DISPONÍVEL PARA PROJETOS</strong>
                </div>
              </div>

              {/* Verified Badge */}
              <div
                className="flex items-center gap-2 p-2.5 rounded bg-white/5 border border-white/10 text-[10px] font-mono text-white/50"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                <span className="text-[#38e0e0]">✓</span>
                <span>CHAVE PGP & ASSINATURA VERIFICADA</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
