'use client';

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MOTION } from '@/motion-system-idsr';
import { TagPill } from '@/components/ui/SectionHeader';
import { IrisSymbol } from '@/components/ui/IrisSymbol';
import { FechaduraPortal } from '@/components/portal/FechaduraPortal';
import { LiquidGlassMesh } from '@/components/ui/LiquidGlassMesh';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function HeroSalaDeControle() {
  const heroRef = useRef<HTMLElement>(null);
  const heroStageRef = useRef<HTMLDivElement>(null);
  const tagPillRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctasRef = useRef<HTMLDivElement>(null);
  const metricsRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scope = heroRef.current;
    if (!scope) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Versão Normal com física e movimento completo
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        // 1. Timeline única unificada de entrada de todos os elementos do Hero
        const introTl = gsap.timeline({ defaults: { ease: MOTION.ease.out } });

        if (tagPillRef.current) {
          introTl.from(tagPillRef.current, {
            opacity: 0,
            y: -MOTION.distance.small,
            duration: MOTION.duration.fast,
          });
        }

        if (titleRef.current) {
          introTl.from(
            titleRef.current,
            {
              opacity: 0,
              y: MOTION.distance.medium,
              duration: MOTION.duration.base,
            },
            `-=${MOTION.duration.fast * 0.5}`
          );
        }

        if (descRef.current) {
          introTl.from(
            descRef.current,
            {
              opacity: 0,
              y: MOTION.distance.small,
              duration: MOTION.duration.base,
            },
            `-=${MOTION.duration.fast * 0.7}`
          );
        }

        if (ctasRef.current) {
          introTl.from(
            ctasRef.current.children,
            {
              opacity: 0,
              y: MOTION.distance.small,
              duration: MOTION.duration.fast,
              stagger: MOTION.stagger.tight,
            },
            `-=${MOTION.duration.fast * 0.7}`
          );
        }

        if (metricsRef.current) {
          introTl.from(
            metricsRef.current.children,
            {
              opacity: 0,
              y: MOTION.distance.small,
              duration: MOTION.duration.fast,
              stagger: MOTION.stagger.normal,
            },
            `-=${MOTION.duration.fast * 0.5}`
          );
        }

        if (rightColRef.current) {
          introTl.from(
            rightColRef.current,
            {
              opacity: 0,
              scale: 0.96,
              y: MOTION.distance.medium,
              duration: MOTION.duration.slow,
            },
            0.2
          );
        }

        // 2. Drift de repouso contínuo (seno suave, ciclo 9s)
        if (heroStageRef.current) {
          gsap.to(heroStageRef.current, {
            y: 4,
            rotationX: 1.8,
            rotationY: -1.5,
            duration: 9,
            yoyo: true,
            repeat: -1,
            ease: 'sine.inOut',
          });
        }

        // 3. Rack Focus + Dolly-in ligado ao scroll
        const scrollTl = gsap.timeline({
          scrollTrigger: {
            trigger: scope,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
          },
        });

        if (heroStageRef.current) {
          scrollTl.to(
            heroStageRef.current,
            {
              scale: 1.04,
              ease: MOTION.ease.inOut,
            },
            0
          );
        }

        if (titleRef.current && descRef.current) {
          scrollTl.to(
            [titleRef.current, descRef.current],
            {
              filter: 'blur(3px)',
              opacity: 0.7,
              y: -MOTION.distance.small,
              ease: MOTION.ease.inOut,
            },
            0
          );
        }

        if (rightColRef.current) {
          scrollTl.to(
            rightColRef.current,
            {
              scale: 1.03,
              filter: 'blur(0px)',
              ease: MOTION.ease.inOut,
            },
            0
          );
        }
      });

      // Versão com prefers-reduced-motion (apenas fade de opacidade, zero deslocamento)
      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.from(
          [tagPillRef.current, titleRef.current, descRef.current, ctasRef.current, metricsRef.current, rightColRef.current],
          {
            opacity: 0,
            duration: MOTION.duration.base,
            stagger: MOTION.stagger.normal,
            ease: 'none',
          }
        );
      });
    }, scope);

    return () => ctx.revert(); // Limpeza obrigatória do GSAP
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-[92vh] flex items-center justify-center px-6 sm:px-12 pt-28 pb-20 overflow-hidden bg-[#0a0a0b]"
      style={{ perspective: '1200px' }}
    >
      {/* Background Aurora Blob (Fonte única de luz que vive por trás do vidro) */}
      <div
        className="absolute top-1/4 right-0 w-[600px] h-[500px] rounded-full blur-[140px] opacity-25 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at right, #7c6cf6, #f472b6, transparent 60%)',
        }}
      />

      <div
        ref={heroStageRef}
        className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10 will-change-transform"
      >
        {/* Left Column: Editorial Positioning */}
        <div className="lg:col-span-7 space-y-6">
          <div ref={tagPillRef} className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#7c6cf6] shadow-[0_0_8px_#7c6cf6] animate-pulse" />
            <TagPill accent>consultoria técnica independente</TagPill>
          </div>

          <h1
            ref={titleRef}
            className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white tracking-[-0.03em] leading-[1.12]"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Automação precisa.
            <br />
            <span
              style={{
                background: 'linear-gradient(90deg, #7c6cf6, #38e0e0)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Sistemas integrados.
            </span>
            <br />
            IA que funciona.
          </h1>

          <p
            ref={descRef}
            className="text-base sm:text-lg text-white/70 max-w-xl leading-relaxed"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            A <strong className="text-white">IDSR</strong> transforma operações complexas em fluxos automatizados, conecta sistemas legados com APIs modernas e implementa soluções de IA que entregam resultado real.
          </p>

          {/* Action CTAs com data-cursor para interação magnética estilo Rogier de Boevé */}
          <div ref={ctasRef} className="flex flex-wrap items-center gap-4 pt-4">
            <a
              href="#cases"
              data-cursor="cases"
              className="px-6 py-3 text-sm font-semibold rounded-lg text-white bg-white/10 hover:bg-white hover:text-black border border-white/20 transition-all duration-300 backdrop-blur-md cursor-pointer"
            >
              Ver Cases
            </a>

            <div data-cursor="portal">
              <FechaduraPortal
                variant="inline"
                label="ABRIR PORTAL ROCHA"
              />
            </div>

            <a
              href="#contato"
              data-cursor="proposta"
              className="inline-flex items-center gap-2 text-xs font-mono text-white/70 hover:text-white transition-colors"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              <span>→</span>
              <span>idsr.io/proposta</span>
            </a>
          </div>

          {/* Telemetry Stats Ribbon (32+ projetos, 98% satisfação, < 4s resposta) */}
          <div
            ref={metricsRef}
            className="grid grid-cols-3 gap-6 pt-8 mt-6 border-t border-white/10"
          >
            <div>
              <div
                className="font-mono text-xl sm:text-2xl font-bold text-white"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                32+
              </div>
              <div className="font-sans text-xs text-white/50 tracking-wider mt-1">
                projetos entregues
              </div>
            </div>

            <div>
              <div
                className="font-mono text-xl sm:text-2xl font-bold text-white"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                98%
              </div>
              <div className="font-sans text-xs text-white/50 tracking-wider mt-1">
                satisfação
              </div>
            </div>

            <div>
              <div
                className="font-mono text-xl sm:text-2xl font-bold text-[#38e0e0]"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                &lt; 4s
              </div>
              <div className="font-sans text-xs text-white/50 tracking-wider mt-1">
                tempo de resposta
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Three.js Liquid Glass Shader Showcase Card */}
        <div
          ref={rightColRef}
          data-cursor="shader"
          className="lg:col-span-5 flex justify-center lg:justify-end will-change-transform"
        >
          <LiquidGlassMesh
            className="w-full max-w-md p-8 group shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] hover:shadow-[0_0_40px_rgba(124,108,246,0.25)]"
            refractionStrength={0.08}
            dispersionStrength={0.025}
          >
            {/* Top Specular Shine Line */}
            <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-70 pointer-events-none" />

            {/* Card Header */}
            <div className="flex items-center justify-between mb-8 relative z-10">
              <div className="flex items-center gap-3">
                <IrisSymbol size={34} state="open" />
                <div>
                  <span
                    className="font-mono text-sm font-bold text-white tracking-[0.25em] block"
                    style={{ fontFamily: 'var(--font-mono)' }}
                  >
                    IDSR_CORE
                  </span>
                  <span
                    className="font-mono text-[9px] text-white/50 tracking-wider uppercase"
                    style={{ fontFamily: 'var(--font-mono)' }}
                  >
                    GLSL_LIQUID_GLASS
                  </span>
                </div>
              </div>

              <TagPill accent>SISTEMA ATIVO</TagPill>
            </div>

            {/* Simulated Live Architectural Telemetry */}
            <div className="space-y-3 relative z-10 my-6">
              <div className="p-3.5 rounded-lg bg-black/50 border border-white/10 flex items-center justify-between font-mono text-xs backdrop-blur-sm">
                <span className="text-white/70">GATEWAY_API:</span>
                <span className="text-[#38e0e0] font-bold">200 OK [18ms]</span>
              </div>

              <div className="p-3.5 rounded-lg bg-black/50 border border-white/10 flex items-center justify-between font-mono text-xs backdrop-blur-sm">
                <span className="text-white/70">ESTEIRA_AUTOMACAO:</span>
                <span className="text-[#7c6cf6] font-bold">FLOW_SYNC 24/7</span>
              </div>

              <div className="p-3.5 rounded-lg bg-black/50 border border-white/10 flex items-center justify-between font-mono text-xs backdrop-blur-sm">
                <span className="text-white/70">GUARDRAIL_IA:</span>
                <span className="text-[#f472b6] font-bold">ZERO_ALUCINACAO</span>
              </div>
            </div>

            {/* Card Footer */}
            <div
              className="pt-4 border-t border-white/15 flex items-center justify-between text-[11px] font-mono text-white/60 relative z-10"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#38e0e0] animate-pulse" />
                THREE.JS SHADER
              </span>
              <span>REFRACTION 24/7</span>
            </div>
          </LiquidGlassMesh>
        </div>
      </div>
    </section>
  );
}
