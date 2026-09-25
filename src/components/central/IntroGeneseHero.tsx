'use client';

import React from 'react';
import { useTransition } from '@/context/TransitionContext';
import { MOTION } from '@/motion-system-idsr';
import { DustText } from '@/components/ui/DustText';
import { RepelledWord } from '@/components/ui/RepelledWord';

/**
 * IntroGeneseHero — Composição Central do Manifesto IDSR
 * - Sem partículas azuis soltas
 * - 'IDSR' centralizado no topo
 * - Tipografia 100% sólida e nítida sem transparência ou quebras erradas ('DUAS.' intacto)
 * - Repulsão magnética suave por palavra ao aproximar o cursor
 */
export function IntroGeneseHero() {
  const { progress, status } = useTransition();

  const isIdle = status === 'IDLE_NA_SECAO';
  const opacity = Math.max(0, 1 - progress * 1.5);
  const scale = 1 - progress * 0.08;
  const translateY = -progress * 60;

  // Renderiza uma frase quebrando em palavras repelidas pelo cursor
  const renderInteractivePhrase = (
    phrase: string,
    textColor: string = 'text-white',
    accentColor: string = '#ffffff',
    delayBase: number = 200
  ) => {
    const words = phrase.split(' ');
    return (
      <span className="inline-flex flex-wrap justify-center gap-x-2 sm:gap-x-3 gap-y-1">
        {words.map((word, wIdx) => (
          <RepelledWord key={`${wIdx}-${word}`}>
            <DustText
              text={word}
              className={`${textColor} font-black drop-shadow-[0_2px_14px_rgba(0,0,0,0.95)]`}
              accentColor={accentColor}
              glowColor={accentColor}
              delay={delayBase + wIdx * 45}
              stagger={16}
              active={isIdle}
            />
          </RepelledWord>
        ))}
      </span>
    );
  };

  return (
    <div
      className="relative w-full h-full flex flex-col items-center justify-center text-center px-4 sm:px-8 md:px-12 select-none will-change-transform"
      style={{
        opacity,
        transform: `translateY(${translateY}px) scale(${scale})`,
        transition: `opacity ${MOTION.duration.micro}s ease-out`,
      }}
    >
      <div className="relative z-20 max-w-6xl mx-auto flex flex-col items-center">
        {/* 1. Tag Superior: Apenas 'IDSR' centralizado */}
        <div className="mb-4 sm:mb-6">
          <RepelledWord>
            <DustText
              text="IDSR"
              as="span"
              className="font-mono text-sm sm:text-base font-black tracking-[0.38em] text-[#38e0e0] uppercase drop-shadow-[0_0_14px_rgba(56,224,224,0.75)] px-4 py-1 rounded-full border border-[#38e0e0]/30 bg-[#38e0e0]/10"
              accentColor="#38e0e0"
              glowColor="#38e0e0"
              delay={80}
              stagger={20}
              active={isIdle}
            />
          </RepelledWord>
        </div>

        {/* 2. Frase Principal em CAIXA ALTA (Tipografia Sólida, Sem Quebra no 'S.', Com Repulsão por Palavra) */}
        <h1
          className="text-lg xs:text-xl sm:text-3xl md:text-4xl lg:text-[2.65rem] font-black tracking-[-0.025em] leading-[1.2] sm:leading-[1.18] uppercase text-white flex flex-col items-center gap-2 sm:gap-3"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {/* Linha 1 */}
          <div>
            {renderInteractivePhrase('FUGIR DO ÓBVIO EXIGE MAIS DO QUE', 'text-white', '#ffffff', 200)}
          </div>

          {/* Linha 2 */}
          <div>
            {renderInteractivePhrase('UMA IDEIA OU UMA FERRAMENTA,', 'text-white', '#ffffff', 440)}
          </div>

          {/* Linha 3 — 'DUAS.' 100% visível, sólida e sem quebra */}
          <div className="whitespace-nowrap sm:whitespace-normal">
            {renderInteractivePhrase('É O CAMINHO QUE CONECTA AS DUAS.', 'text-[#38e0e0]', '#38e0e0', 680)}
          </div>
        </h1>

        {/* 3. Assinatura Inferior Monospace com Repulsão */}
        <div className="mt-6 sm:mt-9">
          <RepelledWord>
            <DustText
              text="ARQUITETURA DE SOFTWARE   ·   ALTA PERFORMANCE"
              as="span"
              className="font-mono text-[10px] sm:text-xs font-bold tracking-[0.22em] text-white/80 uppercase drop-shadow-[0_1px_8px_rgba(0,0,0,0.9)]"
              accentColor="#cbd5e1"
              delay={950}
              stagger={12}
              active={isIdle}
            />
          </RepelledWord>
        </div>
      </div>

      {/* 4. Guia de Scroll */}
      <div className="absolute bottom-8 sm:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 pointer-events-none opacity-45">
        <span
          className="font-mono text-[9px] sm:text-[10px] tracking-[0.28em] text-white uppercase"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          ROLE PARA MUDAR DE SEÇÃO
        </span>
        <span className="text-xs font-mono text-[#38e0e0] animate-bounce">↓</span>
      </div>
    </div>
  );
}
