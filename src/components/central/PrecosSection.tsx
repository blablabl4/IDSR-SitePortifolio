'use client';

import React from 'react';
import { useTransition } from '@/context/TransitionContext';
import { DustText } from '@/components/ui/DustText';
import { getWhatsAppUrl } from '@/lib/contact-config';
import { OFFER_PLANS, OFFER_PRICING_INTRO } from '@/lib/offer';
import { SCENE_SECTIONS, sectionIndexOf } from '@/lib/scene-sections';
import { MOTION } from '@/motion-system-idsr';
import { SceneSection } from './SceneSection';
import { MessageSquare, CheckCircle2, ShieldCheck, ArrowUpRight } from 'lucide-react';

const SECTION_INDEX = sectionIndexOf('precos');
const ACCENT = SCENE_SECTIONS[SECTION_INDEX].accent;
/** Cor de cada plano — mesma paleta dos pilares de MetodologiaAkitaStory. */
const PLAN_ACCENTS: Record<string, string> = {
  starter: '#38e0e0',
  growth: ACCENT,
  enterprise: '#8b5cf6',
};

/**
 * Seção de preços: uma tela, os 3 planos juntos (no celular, carrossel horizontal
 * na mesma tela). Entra com a explosão dos cubos como as demais seções de uma tela;
 * o texto monta com DustText e os cards sobem em sequência quando a seção assenta.
 */
export function PrecosSection() {
  const { currentSection, status } = useTransition();
  const revealed = currentSection === SECTION_INDEX && status === 'IDLE_NA_SECAO';

  return (
    <SceneSection>
      <div className="max-w-4xl lg:max-w-5xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-[10px] sm:text-xs font-mono font-bold tracking-wider uppercase w-fit backdrop-blur-md mb-2"
          style={{ borderColor: `${ACCENT}59`, backgroundColor: `${ACCENT}1a`, color: ACCENT }}
        >
          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: ACCENT }} />
          <span>INVESTIMENTO & PLANOS</span>
        </div>

        <h2
          className="text-xl sm:text-2xl md:text-3xl lg:text-[2.2rem] font-black text-white tracking-[-0.03em] leading-[1.12] uppercase drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)]"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          <DustText
            text={OFFER_PRICING_INTRO.title}
            accentColor={ACCENT}
            glowColor={ACCENT}
            delay={80}
            stagger={12}
            active={revealed}
          />
        </h2>

        <p className="mt-1.5 text-[11px] leading-snug sm:text-sm sm:leading-relaxed text-zinc-300 font-sans max-w-3xl">
          <DustText
            text={OFFER_PRICING_INTRO.description}
            mode="words"
            accentColor={ACCENT}
            delay={260}
            stagger={14}
            active={revealed}
          />
        </p>
      </div>

      <div className="mt-3 sm:mt-5 -mx-4 px-4 sm:mx-0 sm:px-0 pt-1.5 flex md:grid md:grid-cols-3 gap-3 md:gap-4 overflow-x-auto md:overflow-visible snap-x snap-mandatory pb-2 md:pb-0 [scrollbar-width:none]">
        {OFFER_PLANS.map((plan, idx) => (
          <PlanCard key={plan.id} plan={plan} index={idx} revealed={revealed} />
        ))}
      </div>
    </SceneSection>
  );
}

function PlanCard({
  plan,
  index,
  revealed,
}: {
  plan: (typeof OFFER_PLANS)[number];
  index: number;
  revealed: boolean;
}) {
  const accent = PLAN_ACCENTS[plan.id] ?? ACCENT;
  // Os cards sobem um depois do outro, depois do título (que começa em ~80ms).
  const cardDelay = 420 + index * MOTION.stagger.loose * 1000 * 1.5;

  return (
    <div
      className="group relative shrink-0 w-[86%] sm:w-[60%] md:w-auto snap-center rounded-2xl border bg-[#08090e]/95 backdrop-blur-2xl p-3.5 sm:p-5 flex flex-col before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent hover:-translate-y-1 hover:border-[color:var(--plan-accent)] hover:shadow-[0_28px_70px_rgba(0,0,0,0.95),0_0_40px_-12px_var(--plan-accent)]"
      style={
        {
          '--plan-accent': `${accent}8c`,
          '--plan-solid': accent,
          borderColor: plan.highlight ? `${accent}66` : 'rgba(255,255,255,0.12)',
          boxShadow: plan.highlight
            ? `0 24px 64px rgba(0,0,0,0.9), 0 0 32px -14px ${accent}`
            : '0 24px 64px rgba(0,0,0,0.9)',
          opacity: revealed ? 1 : 0,
          transform: revealed ? undefined : 'translateY(18px)',
          transitionProperty: 'opacity, transform, border-color, box-shadow',
          transitionDuration: revealed ? '550ms, 550ms, 300ms, 300ms' : '150ms',
          transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
          transitionDelay: revealed ? `${cardDelay}ms, ${cardDelay}ms, 0ms, 0ms` : '0ms',
        } as React.CSSProperties
      }
    >
      <div className="flex items-center justify-between gap-2">
        <div
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border font-mono text-[10px] sm:text-xs font-bold tracking-wider w-fit"
          style={{ borderColor: `${accent}4d`, backgroundColor: `${accent}1a`, color: accent }}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${plan.highlight ? 'animate-pulse' : ''}`} style={{ backgroundColor: accent }} />
          <span>{`${String(index + 1).padStart(2, '0')} // ${plan.name.toUpperCase()}`}</span>
        </div>
        <ArrowUpRight className="w-4 h-4 text-zinc-500 transition-all duration-200 group-hover:text-[color:var(--plan-solid)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </div>
      <span className="mt-1.5 sm:mt-2 text-[9px] sm:text-[10px] font-mono text-zinc-400 uppercase tracking-wider">
        {plan.badge}
      </span>

      <div className="mt-1 sm:mt-1.5 flex items-baseline gap-1.5">
        <span className="text-xl sm:text-2xl font-mono font-black tracking-tight text-white transition-colors duration-200 group-hover:text-[color:var(--plan-solid)]">
          {plan.price}
        </span>
        <span className="text-[10px] sm:text-xs font-mono text-zinc-400">{plan.period}</span>
      </div>

      <p className="mt-1 sm:mt-1.5 text-[11px] leading-snug sm:text-xs sm:leading-relaxed text-zinc-300 font-sans">{plan.description}</p>

      <ul className="mt-2 pt-2 sm:mt-2.5 sm:pt-2.5 border-t border-white/[0.08] flex flex-col gap-1 sm:gap-1.5">
        {plan.features.map((feature, i) => (
          <li
            key={feature}
            className="flex items-start gap-2"
            style={{
              opacity: revealed ? 1 : 0,
              transform: revealed ? 'translateX(0)' : 'translateX(-8px)',
              transition: `opacity 400ms cubic-bezier(0.16, 1, 0.3, 1) ${revealed ? cardDelay + 180 + i * 45 : 0}ms, transform 400ms cubic-bezier(0.16, 1, 0.3, 1) ${revealed ? cardDelay + 180 + i * 45 : 0}ms`,
            }}
          >
            <CheckCircle2 className="w-3.5 h-3.5 shrink-0 mt-px" style={{ color: accent }} />
            <span className="text-[10px] leading-[1.3] sm:text-[11px] sm:leading-snug font-mono text-zinc-200">{feature}</span>
          </li>
        ))}
      </ul>

      <div className="flex-1 min-h-2.5 sm:min-h-3" />
      <a
        href={getWhatsAppUrl({ origem: 'precos', plano: plan.id })}
        target="_blank"
        rel="noopener noreferrer"
        data-cursor="whatsapp"
        className="inline-flex items-center justify-center gap-2 px-4 py-1.5 sm:py-2 rounded-xl font-extrabold text-[11px] font-mono tracking-wide transition-all duration-200 cursor-pointer hover:brightness-110 hover:gap-2.5 active:scale-95"
        style={
          plan.highlight
            ? { backgroundColor: accent, color: '#000', boxShadow: `0 0 20px ${accent}4d` }
            : { border: `1px solid ${accent}66`, color: accent, backgroundColor: `${accent}12` }
        }
      >
        {plan.highlight ? <ShieldCheck className="w-3.5 h-3.5" /> : <MessageSquare className="w-3.5 h-3.5" />}
        <span>{plan.cta}</span>
      </a>
    </div>
  );
}
