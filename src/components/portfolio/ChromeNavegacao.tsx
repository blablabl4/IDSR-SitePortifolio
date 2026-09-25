'use client';

import React from 'react';
import { usePortalStore } from '@/lib/portal-store';
import { GIT_PORTFOLIO_PROJECTS } from '@/lib/git-portfolio-data';

export function ChromeNavegacao() {
  const { activeProjectId, selectProject, closePortal, audioEnabled, toggleAudio } = usePortalStore();

  const activeProject = GIT_PORTFOLIO_PROJECTS.find((p) => p.id === activeProjectId);
  const activeIndex = activeProject ? GIT_PORTFOLIO_PROJECTS.indexOf(activeProject) + 1 : 0;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-[#0a0a0b]/90 backdrop-blur-xl px-4 sm:px-8 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Left: Return to Institutional button */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            data-cursor="voltar"
            onClick={closePortal}
            className="group flex items-center gap-2 px-3.5 py-1.5 rounded-lg border border-white/15 bg-white/5 hover:bg-white/10 hover:border-white/40 text-xs font-mono tracking-wider text-white/80 hover:text-white transition-all cursor-pointer"
            title="Fechar o portal e voltar ao site institucional (ESC)"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            <span className="text-sm leading-none transition-transform group-hover:-translate-x-1">←</span>
            <span>VOLTAR AO INSTITUCIONAL</span>
            <span className="hidden sm:inline-block px-1.5 py-0.5 rounded bg-white/10 text-[9px] text-white/50">
              ESC
            </span>
          </button>

          {/* If inside a project, show button to return to galaxy/nodes view */}
          {activeProjectId && (
            <button
              type="button"
              data-cursor="nós"
              onClick={() => selectProject(null)}
              className="px-3 py-1.5 rounded-lg border border-transparent hover:border-white/20 text-xs font-mono text-white/70 hover:text-white transition-colors cursor-pointer"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              [VISÃO GERAL // 6 NÓS]
            </button>
          )}
        </div>

        {/* Center: Fixed Chrome Breadcrumb */}
        <div
          className="hidden md:flex items-center gap-3 font-mono text-xs text-white/60"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          <span className="w-2 h-2 rounded-full bg-[#38e0e0] shadow-[0_0_8px_#38e0e0] animate-pulse" />
          <span className="text-white/40">PORTAL ROCHA //</span>
          {activeProject ? (
            <span className="text-white font-semibold flex items-center gap-2">
              <span className="text-[#38e0e0]">[{activeIndex}/6]</span> {activeProject.name}
            </span>
          ) : (
            <span className="text-[#7c6cf6]">ESPAÇO DE PROJETOS GIT [6 NÓS ATIVOS]</span>
          )}
        </div>

        {/* Right: Sound toggle + telemetry badge */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            data-cursor="áudio"
            onClick={toggleAudio}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-white/10 text-[11px] font-mono text-white/60 hover:text-white hover:border-white/30 transition-colors cursor-pointer"
            title="Áudio ambiente do portfólio"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            <span className="text-xs">{audioEnabled ? '🔊' : '🔇'}</span>
            <span className="hidden sm:inline">{audioEnabled ? 'AUDIO ON' : 'AUDIO OFF'}</span>
          </button>

          <span
            className="px-2 py-0.5 rounded-md bg-white/5 border border-white/15 text-[10px] font-mono text-[#38e0e0] uppercase tracking-wider"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            FOV 60° · REAL
          </span>
        </div>
      </div>
    </header>
  );
}
