'use client';

import React, { useState } from 'react';
import { useTransition } from '@/context/TransitionContext';

const SECTION_NAMES: Record<number, string> = {
  0: 'HERO',
  1: 'SERVIÇOS',
  2: 'QUEM PODE USAR',
  3: 'MÉTODO',
  4: 'CONTATO',
};

const SECTION_ACCENTS: Record<number, string> = {
  0: '#38e0e0', // Hero
  1: '#06b6d4', // Serviços (base)
  2: '#8b5cf6', // Quem Pode Usar
  3: '#10b981', // Método
  4: '#38bdf8', // Contato
};

const SERVICE_ACCENTS = ['#38e0e0', '#8b5cf6', '#10b981', '#ec4899', '#f59e0b'];

export function NavigationHud() {
  const { currentSection, serviceStep, navigateTo, status, hudRevealed } = useTransition();
  const [hoveredSection, setHoveredSection] = useState<number | null>(null);

  const isNavigating = status === 'TRANSICIONANDO';
  const canNavigate = hudRevealed || currentSection >= 4;

  // Formato do bloco solicitado com 5 seções e 5 serviços:
  // Hero: [ 1 / 5 ]
  // Serviços: [ 2.1 / 5 ], [ 2.2 / 5 ], [ 2.3 / 5 ], [ 2.4 / 5 ], [ 2.5 / 5 ]
  // Quem Pode Usar: [ 3 / 5 ]
  // Método: [ 4 / 5 ]
  // Contato: [ 5 / 5 ]
  let pageNumberText = String(currentSection + 1);
  if (currentSection === 1) {
    pageNumberText = `2.${serviceStep + 1}`;
  }

  // Cor temática da seção / serviço
  const accentColor =
    currentSection === 1
      ? SERVICE_ACCENTS[serviceStep] || '#06b6d4'
      : SECTION_ACCENTS[currentSection] || '#38e0e0';

  const previewName =
    hoveredSection !== null
      ? SECTION_NAMES[hoveredSection]
      : SECTION_NAMES[currentSection] || 'IDSR';

  const previewColor =
    hoveredSection !== null
      ? SECTION_ACCENTS[hoveredSection] || '#38e0e0'
      : accentColor;

  return (
    <aside
      className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 md:right-8 z-50 select-none pointer-events-auto"
      aria-label="Navegação e Marcador IDSR"
    >
      <div
        className="px-3.5 py-2 rounded-2xl border border-white/10 bg-black/60 backdrop-blur-md shadow-[0_8px_32px_0_rgba(0,0,0,0.6),inset_0_1px_1px_0_rgba(255,255,255,0.15)] flex flex-col gap-0.5 shrink-0 transition-all duration-300"
        title={`Página ${pageNumberText} de 5 - ${SECTION_NAMES[currentSection]}`}
      >
        {/* Prévia do nome no mesmo modal em cima do bloco */}
        <div className="flex items-center justify-between min-w-[130px]">
          <span
            className="font-mono text-[9px] sm:text-[10px] font-bold tracking-widest uppercase transition-colors duration-200"
            style={{ color: previewColor, fontFamily: 'var(--font-mono)' }}
          >
            {previewName}
          </span>
        </div>

        {/* Linha do Bloco [ X / 5 ] com as 5 bolinhas */}
        <div className="flex items-center gap-3">
          <span
            className="font-mono text-[11px] sm:text-xs font-bold tracking-widest text-white/90 whitespace-nowrap"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            [{pageNumberText} / 5]
          </span>

          <div className="flex gap-1.5 items-center">
            {[0, 1, 2, 3, 4].map((idx) => {
              const isCurrent = idx === currentSection;
              const isHovered = hoveredSection === idx;
              return (
                <button
                  key={idx}
                  type="button"
                  data-cursor={canNavigate ? 'navegar' : undefined}
                  disabled={isNavigating || !canNavigate}
                  onClick={() => canNavigate && navigateTo(idx, 0)}
                  onMouseEnter={() => canNavigate && setHoveredSection(idx)}
                  onMouseLeave={() => setHoveredSection(null)}
                  className={`h-1.5 rounded-full transition-all duration-300 p-0 border-0 focus:outline-none ${
                    canNavigate
                      ? 'cursor-pointer hover:brightness-125'
                      : 'cursor-default opacity-80'
                  }`}
                  style={{
                    width: isCurrent ? '22px' : isHovered ? '12px' : '6px',
                    background: isCurrent
                      ? accentColor
                      : isHovered
                      ? SECTION_ACCENTS[idx]
                      : 'rgba(255, 255, 255, 0.25)',
                    boxShadow: isCurrent
                      ? `0 0 10px ${accentColor}`
                      : isHovered
                      ? `0 0 8px ${SECTION_ACCENTS[idx]}`
                      : 'none',
                  }}
                  title={
                    canNavigate
                      ? `Ir para ${SECTION_NAMES[idx]}`
                      : `Seção ${idx + 1}: ${SECTION_NAMES[idx]}`
                  }
                />
              );
            })}
          </div>
        </div>
      </div>
    </aside>
  );
}
