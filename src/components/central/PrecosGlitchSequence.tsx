'use client';

import React from 'react';
import { useTransition } from '@/context/TransitionContext';
import { DustText } from '@/components/ui/DustText';
import { getWhatsAppUrl } from '@/lib/contact-config';
import {
  OFFER_PLANS,
  OFFER_PRICING_INTRO,
  OFFER_PRICING_FAQ,
  OFFER_GUARANTEES,
} from '@/lib/offer';
import { SCENE_SECTIONS, sectionIndexOf } from '@/lib/scene-sections';
import { SceneSection } from './SceneSection';
import { MessageSquare, CheckCircle2, ShieldCheck } from 'lucide-react';

const SECTION_INDEX = sectionIndexOf('precos');
const ACCENT = SCENE_SECTIONS[SECTION_INDEX].accent;
const STEP_IDS = SCENE_SECTIONS[SECTION_INDEX].stepIds ?? [];
/** Cor de cada plano — mesma paleta dos pilares de MetodologiaAkitaStory. */
const PLAN_ACCENTS: Record<string, string> = {
  starter: '#38e0e0',
  growth: ACCENT,
  enterprise: '#8b5cf6',
};

/**
 * Seção de preços: passo 0 mostra os 3 planos juntos numa tela; passos 1..6 são uma
 * pergunta frequente cada, em tela cheia, com a mesma troca por glitch dos serviços.
 * Todos os passos saem no HTML do servidor (os inativos com `hidden`); só o ativo
 * monta o texto com DustText.
 */
export function PrecosGlitchSequence() {
  const { currentSection, sectionStep, status, navigateTo } = useTransition();
  const isHere = currentSection === SECTION_INDEX;
  const step = isHere ? sectionStep : 0;
  const isIdle = status === 'IDLE_NA_SECAO';

  return (
    <SceneSection>
      <PlansStep hidden={step !== 0} active={isHere && isIdle && step === 0} />

      {OFFER_PRICING_FAQ.map((faq, i) => {
        const faqStep = i + 1;
        const isCurrent = step === faqStep;
        return (
          <div
            key={STEP_IDS[faqStep]}
            hidden={!isCurrent}
            className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center"
          >
            {/* Coluna Esquerda: Badge + Pergunta + Resposta + CTA */}
            <div className="lg:col-span-6 flex flex-col justify-center space-y-3 sm:space-y-3.5">
              <Badge>
                PERGUNTAS FREQUENTES · {String(faqStep).padStart(2, '0')} / {String(OFFER_PRICING_FAQ.length).padStart(2, '0')}
              </Badge>

              <h3
                className="text-xl sm:text-2xl md:text-3xl lg:text-[2.2rem] font-black text-white tracking-[-0.03em] leading-[1.12] uppercase drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)]"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                <DustText
                  text={faq.question}
                  accentColor={ACCENT}
                  glowColor={ACCENT}
                  delay={80}
                  stagger={12}
                  active={isHere && isIdle && isCurrent}
                />
              </h3>

              <p className="text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed">
                <DustText
                  text={faq.answer}
                  mode="words"
                  delay={280}
                  stagger={14}
                  accentColor={ACCENT}
                  active={isHere && isIdle && isCurrent}
                />
              </p>

              <div className="pt-1">
                <a
                  href={getWhatsAppUrl({ origem: 'precos' })}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="whatsapp"
                  className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-xl text-black font-extrabold text-xs font-mono tracking-wide transition-all duration-200 cursor-pointer shadow-[0_0_20px_rgba(234,179,8,0.3)] hover:brightness-110 active:scale-95"
                  style={{ backgroundColor: ACCENT }}
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Tirar outra dúvida no WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Coluna Direita: índice das perguntas + garantias (terminal) */}
            <div className="lg:col-span-6 flex flex-col justify-center">
              <div className="relative rounded-2xl border border-white/[0.12] bg-[#08090e]/95 backdrop-blur-2xl p-5 sm:p-6 shadow-[0_24px_64px_rgba(0,0,0,0.9)] before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent">
                <div className="flex items-center justify-between border-b border-white/[0.08] pb-3 mb-3.5">
                  <span className="text-[10px] sm:text-[11px] font-mono font-bold tracking-widest text-zinc-400 uppercase">
                    ÍNDICE // DÚVIDAS FREQUENTES
                  </span>
                  <span className="text-[9px] sm:text-[10px] font-mono font-semibold" style={{ color: ACCENT }}>
                    {faqStep}/{OFFER_PRICING_FAQ.length}
                  </span>
                </div>

                {/* Lista das perguntas: só no desktop (no celular a pergunta ativa já ocupa a tela) */}
                <nav aria-label="Perguntas frequentes" className="hidden lg:flex flex-col gap-1 mb-4">
                  {OFFER_PRICING_FAQ.map((item, j) => {
                    const isActive = j === i;
                    return (
                      <a
                        key={STEP_IDS[j + 1]}
                        href={`#${STEP_IDS[j + 1]}`}
                        onClick={(e) => {
                          e.preventDefault();
                          navigateTo(SECTION_INDEX, j + 1);
                        }}
                        aria-current={isActive ? 'step' : undefined}
                        className="flex items-start gap-2.5 px-2.5 py-1.5 rounded-lg font-mono text-[11px] leading-snug transition-colors hover:bg-white/[0.05]"
                        style={{ color: isActive ? ACCENT : 'rgb(161 161 170)' }}
                      >
                        <span className="shrink-0">{isActive ? '>' : ' '} {String(j + 1).padStart(2, '0')}</span>
                        <span className={isActive ? 'text-white' : ''}>{item.question}</span>
                      </a>
                    );
                  })}
                </nav>

                <div className="lg:pt-3 lg:border-t border-white/[0.08]">
                  <div className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest mb-2">
                    GARANTIDO EM TODOS OS PLANOS
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {OFFER_GUARANTEES.map((g) => (
                      <div
                        key={g.title}
                        className="p-2 sm:p-2.5 rounded-xl border border-white/[0.08] bg-black/50 text-center flex flex-col justify-center"
                      >
                        <span className="text-[10px] sm:text-xs font-mono font-black tracking-tight uppercase" style={{ color: ACCENT }}>
                          {g.title}
                        </span>
                        <span className="hidden sm:block text-[8px] sm:text-[9px] font-mono text-zinc-400 uppercase tracking-wider mt-0.5">
                          {g.detail}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </SceneSection>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-[10px] sm:text-xs font-mono font-bold tracking-wider uppercase w-fit backdrop-blur-md"
      style={{ borderColor: `${ACCENT}40`, backgroundColor: `${ACCENT}12`, color: ACCENT }}
    >
      <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: ACCENT }} />
      <span>{children}</span>
    </div>
  );
}

/** Passo 0: chamada + os 3 planos lado a lado (no celular, carrossel horizontal numa tela só). */
function PlansStep({ hidden, active }: { hidden: boolean; active: boolean }) {
  return (
    <div hidden={hidden} className="flex flex-col justify-center">
      <div className="max-w-4xl lg:max-w-5xl">
        <div className="mb-2">
          <Badge>INVESTIMENTO & PLANOS</Badge>
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
            active={active}
          />
        </h2>

        <p className="mt-1.5 text-[11px] leading-snug sm:text-sm sm:leading-relaxed text-zinc-300 font-sans max-w-3xl">
          <DustText
            text={OFFER_PRICING_INTRO.description}
            mode="words"
            accentColor={ACCENT}
            delay={260}
            stagger={14}
            active={active}
          />
        </p>
      </div>

      <div className="mt-3 sm:mt-5 -mx-5 px-5 sm:mx-0 sm:px-0 flex md:grid md:grid-cols-3 gap-3 md:gap-4 overflow-x-auto md:overflow-visible snap-x snap-mandatory pb-2 md:pb-0 [scrollbar-width:none]">
        {OFFER_PLANS.map((plan, idx) => {
          const accent = PLAN_ACCENTS[plan.id] ?? ACCENT;
          return (
            <div
              key={plan.id}
              className="relative shrink-0 w-[86%] sm:w-[60%] md:w-auto snap-center rounded-2xl border bg-[#08090e]/95 backdrop-blur-2xl p-3.5 sm:p-5 shadow-[0_24px_64px_rgba(0,0,0,0.9)] flex flex-col before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent transition-all"
              style={{ borderColor: plan.highlight ? `${accent}66` : 'rgba(255,255,255,0.12)' }}
            >
              <div
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border font-mono text-[10px] sm:text-xs font-bold tracking-wider w-fit"
                style={{ borderColor: `${accent}4d`, backgroundColor: `${accent}1a`, color: accent }}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accent }} />
                <span>
                  {`${String(idx + 1).padStart(2, '0')} // ${plan.name.toUpperCase()}`}
                </span>
              </div>
              <span className="mt-1.5 sm:mt-2 text-[9px] sm:text-[10px] font-mono text-zinc-400 uppercase tracking-wider">
                {plan.badge}
              </span>

              <div className="mt-1 sm:mt-1.5 flex items-baseline gap-1.5">
                <span className="text-xl sm:text-2xl font-mono font-black tracking-tight text-white">{plan.price}</span>
                <span className="text-[10px] sm:text-xs font-mono text-zinc-400">{plan.period}</span>
              </div>

              <p className="mt-1 sm:mt-1.5 text-[11px] leading-snug sm:text-xs sm:leading-relaxed text-zinc-300 font-sans">{plan.description}</p>

              <ul className="mt-2 pt-2 sm:mt-2.5 sm:pt-2.5 border-t border-white/[0.08] flex flex-col gap-1 sm:gap-1.5">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0 mt-px" style={{ color: accent }} />
                    <span className="text-[10px] leading-[1.3] sm:text-[11px] sm:leading-snug font-mono text-zinc-200">{feature}</span>
                  </li>
                ))}
              </ul>

              <a
                href={getWhatsAppUrl({ origem: 'precos', plano: plan.id })}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="whatsapp"
                className="mt-2.5 sm:mt-3 inline-flex items-center justify-center gap-2 px-4 py-1.5 sm:py-2 rounded-xl font-extrabold text-[11px] font-mono tracking-wide transition-all duration-200 cursor-pointer hover:brightness-110 active:scale-95"
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
        })}
      </div>
    </div>
  );
}
