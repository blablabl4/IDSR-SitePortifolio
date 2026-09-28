'use client';

import React, { useState } from 'react';
import { useTransition } from '@/context/TransitionContext';
import { SCENE_SECTIONS, SERVICES_SECTION_INDEX, TOTAL_SECTIONS, stepCountOf } from '@/lib/scene-sections';

const SERVICE_ACCENTS = ['#38e0e0', '#8b5cf6', '#10b981', '#ec4899', '#f59e0b'];

interface NavigationHudProps {
  /**
   * Prefixo dos links das âncoras. Vazio na home (`#slug`, navegação dentro da cena);
   * '/' fora dela (`/#slug`, ex.: termos e privacidade), onde não há seção pra rolar.
   */
  hrefBase?: '' | '/';
  /** Rótulo fixo quando o HUD está fora da cena (ex.: 'TERMOS'); nenhum marcador fica ativo. */
  pageLabel?: string;
}

export function NavigationHud({ hrefBase = '', pageLabel }: NavigationHudProps = {}) {
  const { currentSection, sectionStep, navigateTo } = useTransition();
  const [hoveredSection, setHoveredSection] = useState<number | null>(null);
  const inScene = pageLabel === undefined;

  // Contador [n / total]: numa seção com passos ganha o sub-passo (ex.: [2.3 / 8]).
  let pageNumberText = inScene ? String(currentSection + 1) : '—';
  if (inScene && stepCountOf(currentSection) > 1) {
    pageNumberText = `${currentSection + 1}.${sectionStep + 1}`;
  }

  const sectionAccent = (idx: number) => SCENE_SECTIONS[idx]?.accent ?? '#38e0e0';
  const sectionLabel = (idx: number) => SCENE_SECTIONS[idx]?.label ?? 'IDSR';

  // Cor temática da seção / serviço
  const accentColor = !inScene
    ? '#38e0e0'
    : currentSection === SERVICES_SECTION_INDEX
    ? SERVICE_ACCENTS[sectionStep] || sectionAccent(currentSection)
    : sectionAccent(currentSection);

  const currentName = inScene ? sectionLabel(currentSection) : pageLabel;
  const previewName = hoveredSection !== null ? sectionLabel(hoveredSection) : currentName;
  const previewColor = hoveredSection !== null ? sectionAccent(hoveredSection) : accentColor;

  return (
    <aside
      className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 md:right-8 z-50 select-none pointer-events-auto"
      aria-label="Navegação e Marcador IDSR"
    >
      <nav
        aria-label="Seções do site"
        className="px-3.5 py-2 rounded-2xl border border-white/10 bg-black/60 backdrop-blur-md shadow-[0_8px_32px_0_rgba(0,0,0,0.6),inset_0_1px_1px_0_rgba(255,255,255,0.15)] flex flex-col gap-0.5 shrink-0 transition-all duration-300"
        title={`Página ${pageNumberText} de ${TOTAL_SECTIONS} - ${currentName}`}
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

        {/* Linha do Bloco [ X / N ] com um marcador por seção — cada um é link real pra âncora */}
        <div className="flex items-center gap-3">
          <span
            className="font-mono text-[11px] sm:text-xs font-bold tracking-widest text-white/90 whitespace-nowrap"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            [{pageNumberText} / {TOTAL_SECTIONS}]
          </span>

          <div className="flex gap-1.5 items-center">
            {SCENE_SECTIONS.map((section, idx) => {
              const isCurrent = inScene && idx === currentSection;
              const isHovered = hoveredSection === idx;
              return (
                <a
                  key={section.slug}
                  href={`${hrefBase}#${section.slug}`}
                  data-cursor="navegar"
                  aria-current={isCurrent ? 'true' : undefined}
                  onClick={(e) => {
                    // Fora da cena o link segue normal (vai pra /#slug).
                    if (!inScene) return;
                    e.preventDefault();
                    navigateTo(idx, 0);
                  }}
                  onMouseEnter={() => setHoveredSection(idx)}
                  onMouseLeave={() => setHoveredSection(null)}
                  className="h-1.5 rounded-full transition-all duration-300 p-0 border-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 cursor-pointer hover:brightness-125 block"
                  style={{
                    width: isCurrent ? '22px' : isHovered ? '12px' : '6px',
                    background: isCurrent
                      ? accentColor
                      : isHovered
                      ? section.accent
                      : 'rgba(255, 255, 255, 0.25)',
                    boxShadow: isCurrent
                      ? `0 0 10px ${accentColor}`
                      : isHovered
                      ? `0 0 8px ${section.accent}`
                      : 'none',
                  }}
                  title={`Ir para ${section.label}`}
                >
                  <span className="sr-only">{section.label}</span>
                </a>
              );
            })}
          </div>
        </div>
      </nav>
    </aside>
  );
}
