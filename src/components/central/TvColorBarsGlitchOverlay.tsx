'use client';

import React, { useMemo } from 'react';
import { useTransition } from '@/context/TransitionContext';

/**
 * TV Color Bars Glitch Overlay (SMPTE Test Pattern)
 * Acionado exclusivamente nas transições entre sub-serviços da Seção 01.
 * Gera faixas verticais SMPTE, fatiamento analógico, linhas de tracking VHS
 * e transição dinâmica de preto-e-branco para cores saturadas.
 */
export function TvColorBarsGlitchOverlay() {
  const { currentSection, progress, serviceStep } = useTransition();

  // Ativo somente na seção 1 (Serviços) durante o scroll de transição
  const isActive = currentSection === 1 && progress > 0.02 && progress < 0.98;

  // Curva senoidal que atinge o pico (1.0) em progress = 0.5
  const intensity = useMemo(() => {
    if (!isActive) return 0;
    return Math.sin(progress * Math.PI);
  }, [isActive, progress]);

  // Slices horizontais gerados pseudo-aleatoriamente baseados no progresso
  const slices = useMemo(() => {
    if (!isActive) return [];
    const count = 12;
    const items = [];
    for (let i = 0; i < count; i++) {
      const top = (i / count) * 100;
      const height = 100 / count;
      // Deslocamento horizontal caótico
      const shiftSeed = Math.sin(progress * 80 + i * 1.7) * Math.cos(progress * 40 - i * 2.3);
      const shiftX = shiftSeed * intensity * 55; // até ±55px
      const opacity = 0.4 + Math.abs(Math.sin(progress * 60 + i)) * 0.6;
      items.push({ top, height, shiftX, opacity });
    }
    return items;
  }, [isActive, progress, intensity]);

  if (!isActive || intensity <= 0.01) return null;

  // SMPTE Color Bars: Branco, Amarelo, Ciano, Verde, Magenta, Vermelho, Azul
  const colors = [
    '#ffffff', // Branco
    '#eab308', // Amarelo
    '#06b6d4', // Ciano
    '#22c55e', // Verde
    '#ec4899', // Magenta
    '#ef4444', // Vermelho
    '#3b82f6', // Azul
  ];

  return (
    <div
      className="fixed inset-0 z-35 pointer-events-none overflow-hidden select-none"
      style={{
        opacity: Math.min(intensity * 1.3, 1),
        mixBlendMode: 'screen',
      }}
      aria-hidden="true"
    >
      {/* 1. Grade de Barras de Cor SMPTE cortada em fatias com jitter horizontal */}
      {slices.map((slice, idx) => (
        <div
          key={idx}
          className="absolute left-0 right-0 overflow-hidden"
          style={{
            top: `${slice.top}%`,
            height: `${slice.height}%`,
            transform: `translateX(${slice.shiftX}px)`,
            opacity: slice.opacity,
            filter:
              progress < 0.25
                ? 'grayscale(100%) contrast(150%)'
                : progress < 0.5
                ? `grayscale(${100 - (progress - 0.25) * 400}%) contrast(180%) saturate(150%)`
                : 'contrast(160%) saturate(200%)',
          }}
        >
          {/* As 7 barras verticais */}
          <div className="w-full h-full flex">
            {colors.map((color, cIdx) => (
              <div
                key={cIdx}
                className="flex-1 h-full"
                style={{
                  backgroundColor: color,
                  opacity: 0.65,
                }}
              />
            ))}
          </div>

          {/* Faixa inferior de castellation (padrão de TV broadcast) */}
          <div
            className="absolute bottom-0 left-0 right-0 h-1/4 flex opacity-80"
            style={{ mixBlendMode: 'difference' }}
          >
            <div className="flex-1 bg-blue-600" />
            <div className="flex-1 bg-black" />
            <div className="flex-1 bg-fuchsia-600" />
            <div className="flex-1 bg-black" />
            <div className="flex-1 bg-cyan-500" />
            <div className="flex-1 bg-black" />
            <div className="flex-1 bg-white" />
          </div>
        </div>
      ))}

      {/* 2. Barra de Ruído / Tracking VHS que sobe na tela */}
      <div
        className="absolute left-0 right-0 h-16 bg-white/20 backdrop-invert"
        style={{
          top: `${((progress * 400) % 100)}%`,
          filter: 'blur(2px)',
          opacity: 0.5 * intensity,
        }}
      />

      {/* 3. Aberração Cromática & Scanlines de TV */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'repeating-linear-gradient(0deg, rgba(0,0,0,0.45) 0px, rgba(0,0,0,0.45) 2px, transparent 2px, transparent 4px)',
          opacity: 0.7,
        }}
      />

      {/* 4. Telemetria de Glitch / Test Pattern HUD */}
      <div className="absolute top-8 right-8 flex flex-col items-end font-mono text-[10px] tracking-[0.25em] text-white/90 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
        <span className="text-[#38e0e0] font-bold animate-pulse">
          SIGNAL INTERRUPT // SMPTE_COLOR_BARS
        </span>
        <span className="text-white/60">
          TRANSIT: 0{serviceStep + 1} ➔ 0{Math.min(serviceStep + 2, 5)} [{(progress * 100).toFixed(0)}%]
        </span>
        <span className="text-white/40">NTSC 59.94Hz · FRAME_SYNC_LOST</span>
      </div>
    </div>
  );
}
