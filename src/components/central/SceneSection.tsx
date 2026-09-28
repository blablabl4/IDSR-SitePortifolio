'use client';

import React from 'react';
import { useTransition } from '@/context/TransitionContext';
import { LazyMount } from './LazyMount';

/**
 * Moldura das seções novas da cena: a mesma camada de scanlines e o mesmo glitch
 * (deslocamento horizontal + queda de opacidade na rajada 0.05–0.48 do progress) que
 * ServicosGlitchSequence aplica, pra que seção nova e antiga sejam indistinguíveis.
 * O texto de cada seção entra como children e sai no HTML do servidor; `demo` é o
 * lugar de conteúdo interativo pesado, montado só perto da viewport (LazyMount).
 */
export function SceneSection({
  children,
  demo,
}: {
  children: React.ReactNode;
  /** Conteúdo interativo pesado (ex.: ChatInterface), montado sob demanda. */
  demo?: React.ReactNode;
}) {
  const { progress } = useTransition();

  // Efeito de Erro de Tela / Glitch: rajada breve, cirúrgica e concentrada
  const glitchActive = progress > 0.05 && progress < 0.48;
  const glitchNorm = glitchActive ? Math.sin(((progress - 0.05) / 0.43) * Math.PI) : 0;
  const glitchOffset = glitchActive ? (Math.sin(progress * 35) * 6 * glitchNorm).toFixed(1) : '0';
  const glitchOpacity = glitchActive ? (1 - glitchNorm * 0.30).toFixed(2) : '1';

  return (
    <div className="relative w-full h-full flex items-center justify-center px-5 sm:px-8 lg:px-14 py-3 sm:py-6 overflow-hidden select-none">
      {/* Camada de Scanlines e Efeito Analógico de Interferência */}
      <div
        className={`absolute inset-0 pointer-events-none transition-opacity duration-150 ${
          glitchActive ? 'opacity-35' : 'opacity-10'
        }`}
        style={{
          backgroundImage:
            'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.4) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))',
          backgroundSize: '100% 4px, 6px 100%',
        }}
      />

      <div
        className="w-full max-w-7xl mx-auto z-10 will-change-transform"
        style={{
          transform: `translateX(${glitchOffset}px)`,
          opacity: Number(glitchOpacity),
        }}
      >
        {children}
        {demo ? <LazyMount>{demo}</LazyMount> : null}
      </div>
    </div>
  );
}
