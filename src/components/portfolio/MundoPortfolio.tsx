'use client';

import React from 'react';
import { usePortalStore } from '@/lib/portal-store';
import { GIT_PORTFOLIO_PROJECTS } from '@/lib/git-portfolio-data';
import { ChromeNavegacao } from './ChromeNavegacao';
import { EspacoInicial } from './EspacoInicial';
import { ProjetoView } from './ProjetoView';

export function MundoPortfolio() {
  const { activeProjectId } = usePortalStore();

  const selectedProject = GIT_PORTFOLIO_PROJECTS.find(
    (p) => p.id === activeProjectId
  );

  return (
    <div className="relative min-h-screen bg-[#0d0f14] text-[#f8fafc]">
      {/* 1. Chrome de Navegação Fixo (não muda entre telas) */}
      <ChromeNavegacao />

      {/* 2. Conteúdo: Espaço Inicial (Nós Cósmicos) OU Projeto Específico */}
      <main>
        {selectedProject ? (
          <ProjetoView project={selectedProject} />
        ) : (
          <EspacoInicial />
        )}
      </main>
    </div>
  );
}
