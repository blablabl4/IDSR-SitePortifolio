'use client';

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MOTION } from '@/motion-system-idsr';
import { GIT_PORTFOLIO_PROJECTS } from '@/lib/git-portfolio-data';
import { SectionHeader, TagPill } from '@/components/ui/SectionHeader';
import { FechaduraPortal } from '@/components/portal/FechaduraPortal';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function CasesDestaque() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const cases = GIT_PORTFOLIO_PROJECTS.filter((p) =>
    ['nfparser', 'saas-idsr-zapao', 'casa-rael-api'].includes(p.id)
  );

  useEffect(() => {
    const scope = sectionRef.current;
    if (!scope) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        // Timeline única de entrada do cabeçalho
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

        // Timeline de entrada com stagger dos 3 cards de cases
        if (cardsRef.current) {
          gsap.from(cardsRef.current.children, {
            opacity: 0,
            y: MOTION.distance.medium,
            scale: 0.98,
            duration: MOTION.duration.base,
            stagger: MOTION.stagger.loose,
            ease: MOTION.ease.out,
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          });
        }
      });

      mm.add('(prefers-reduced-motion: reduce)', () => {
        if (cardsRef.current) {
          gsap.from(cardsRef.current.children, {
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
      id="cases"
      className="py-24 px-6 sm:px-12 bg-[#0a0a0b] relative"
    >
      <div className="max-w-6xl mx-auto">
        <div ref={headerRef} data-reveal="header">
          <SectionHeader index="03" label="CASES DE ENGENHARIA REAL" />

          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="max-w-2xl">
              <h2
                className="text-3xl sm:text-5xl font-bold text-white tracking-[-0.03em] leading-tight"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Cases em produção com <span className="text-aurora">código auditado.</span>
              </h2>
              <p className="mt-3 text-base text-white/70 font-sans leading-relaxed">
                Sistemas reais construídos para eliminar trabalho manual e proteger a receita de empresas parceiras.
              </p>
            </div>

            <div data-cursor="portal">
              <FechaduraPortal
                variant="inline"
                label="EXPLORAR OS 6 NÓS GIT"
                className="self-start md:self-auto"
              />
            </div>
          </div>
        </div>

        {/* 3 Standout Cases Liquid Glass Cards */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cases.map((cs) => (
            <div
              key={cs.id}
              data-reveal="card"
              data-cursor="case"
              className="p-7 rounded-2xl relative overflow-hidden transition-all duration-300 flex flex-col justify-between group hover:border-white/30 hover:bg-white/[0.08]"
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

              <div>
                <div className="flex items-center justify-between text-xs font-mono mb-4">
                  <TagPill accent>{cs.badge}</TagPill>
                  <span className="text-white/50">{cs.primaryLanguage}</span>
                </div>

                <h3 className="text-xl font-bold text-white font-sans mb-2 group-hover:text-[#38e0e0] transition-colors">
                  {cs.name}
                </h3>
                <p className="text-xs text-white/70 leading-relaxed font-sans mb-6">
                  {cs.description}
                </p>

                {/* Primary Metric in Frosted Box */}
                <div className="p-4 rounded-xl bg-black/40 border border-white/10 mb-6">
                  <span className="text-[10px] font-mono text-white/50 uppercase tracking-wider block">
                    {cs.metrics[0].label}
                  </span>
                  <span
                    className="text-2xl font-mono font-bold text-white mt-1 block"
                    style={{ fontFamily: 'var(--font-mono)' }}
                  >
                    {cs.metrics[0].value}
                  </span>
                  <span className="text-[11px] text-[#38e0e0] block mt-0.5 font-mono">
                    {cs.metrics[0].trend}
                  </span>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10" data-cursor="portal">
                <FechaduraPortal
                  variant="inline"
                  targetProjectId={cs.id}
                  label="VER PROCESSO NO PORTAL"
                  className="w-full justify-center py-2 text-xs"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
