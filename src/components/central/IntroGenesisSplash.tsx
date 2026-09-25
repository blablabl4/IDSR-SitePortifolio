'use client';

import React from 'react';
import { RepelledWord } from '@/components/ui/RepelledWord';

interface IntroGenesisSplashProps {
  onEnter: () => void;
  isStarting: boolean;
}

/**
 * IntroGenesisSplash — Tela Pré-Hero de Abertura / Gênese
 * - Título 'GENESIS' na lateral superior esquerda
 * - Frase conceitual com palavras que se movem de forma independente ao passar o cursor
 * - Destaque em gradiente contínuo único ao longo de 'RECRIE E REIMAGINE'
 * - Animação de mouse/scroll para iniciar
 */
export function IntroGenesisSplash({ onEnter, isStarting }: IntroGenesisSplashProps) {
  // Renderiza uma sequência de palavras repelidas pelo cursor do mouse
  const renderInteractivePhrase = (
    phrase: string,
    className: string = 'text-white'
  ) => {
    const words = phrase.split(' ');
    return (
      <span className="inline-flex flex-wrap justify-center gap-x-2 sm:gap-x-3 gap-y-1">
        {words.map((word, wIdx) => (
          <RepelledWord key={`${wIdx}-${word}`}>
            <span className={`inline-block ${className}`}>{word}</span>
          </RepelledWord>
        ))}
      </span>
    );
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center text-center px-6 sm:px-12 bg-[#0a0a0b] transition-opacity duration-1000 select-none ${
        isStarting ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* 1. Título na Lateral Superior Esquerda */}
      <div className="absolute top-6 left-6 sm:top-8 sm:left-10 z-20">
        <RepelledWord>
          <span
            className="font-mono text-xs sm:text-sm font-bold tracking-[0.45em] text-[#38e0e0] uppercase drop-shadow-[0_0_16px_rgba(56,224,224,0.6)]"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            GENESIS
          </span>
        </RepelledWord>
      </div>

      <div className="max-w-4xl mx-auto flex flex-col items-center gap-6 sm:gap-8">
        {/* 2. Frase Conceitual de Abertura com Destaque em Gradiente */}
        <h1
          className="text-2xl sm:text-4xl md:text-5xl lg:text-[3.35rem] font-black tracking-[-0.03em] leading-[1.22] sm:leading-[1.18] uppercase text-white max-w-4xl flex flex-col items-center gap-2 sm:gap-3"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {/* Linha 1 */}
          <div className="drop-shadow-[0_2px_14px_rgba(0,0,0,0.9)]">
            {renderInteractivePhrase('EXPLORE SUAS IDEIAS,', 'text-white')}
          </div>

          {/* Linha 2 com destaque em gradiente contínuo */}
          <div className="flex flex-wrap justify-center items-center gap-x-2 sm:gap-x-3 drop-shadow-[0_2px_18px_rgba(0,0,0,0.9)]">
            <RepelledWord>
              <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#38e0e0] via-[#c084fc] to-[#fbbf24] drop-shadow-[0_0_30px_rgba(56,224,224,0.35)]">
                RECRIE E REIMAGINE
              </span>
            </RepelledWord>
            {renderInteractivePhrase('SEM LIMITES.', 'text-white')}
          </div>
        </h1>

        {/* 3. Subtítulo Explicativo Original */}
        <p className="text-xs sm:text-sm md:text-base text-white/60 font-sans max-w-xl leading-relaxed">
          {renderInteractivePhrase(
            'Infraestrutura, automação de alta fidelidade e software de missão crítica projetados para transformar complexidade em vantagem competitiva.',
            'text-white/70'
          )}
        </p>

        {/* 4. Animação de Scroll Interativa para Iniciar */}
        <div
          onClick={onEnter}
          data-cursor="pointer"
          className="flex flex-col items-center gap-3 mt-4 sm:mt-6 cursor-pointer group select-none"
        >
          {/* Mouse Wireframe com Scroll Wheel Animada */}
          <div className="relative w-6 h-10 rounded-full border-2 border-white/35 group-hover:border-[#38e0e0] flex items-start justify-center p-1.5 transition-all duration-300 shadow-[0_0_18px_rgba(0,0,0,0.6)] group-hover:shadow-[0_0_20px_rgba(56,224,224,0.3)]">
            <div className="w-1 h-2.5 rounded-full bg-[#38e0e0] animate-bounce shadow-[0_0_8px_#38e0e0]" />
          </div>

          {/* Rótulo de Instrução */}
          <div className="flex flex-col items-center gap-1 font-mono">
            <span
              className="text-[10px] sm:text-[11px] font-bold tracking-[0.32em] text-white/50 group-hover:text-white uppercase transition-colors duration-200"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              CLIQUE OU ROLE PARA INICIAR
            </span>
            <span className="text-[9px] tracking-[0.2em] text-[#38e0e0]/70 uppercase">
              [ 5.0S DE MONTAGEM ]
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
