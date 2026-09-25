'use client';

import React, { useState } from 'react';
import { GIT_PORTFOLIO_PROJECTS, GitProject } from '@/lib/git-portfolio-data';
import { usePortalStore } from '@/lib/portal-store';

export function EspacoInicial() {
  const { selectProject } = usePortalStore();
  const [hoveredProject, setHoveredProject] = useState<GitProject | null>(null);

  // Layout espacial dos 6 nós estelares de projetos do Git (FOV 60)
  const nodePositions = [
    { x: 22, y: 32, accent: '#7c6cf6' }, // idsr-web (automação / portal)
    { x: 50, y: 22, accent: '#38e0e0' }, // nfparser (dados / ETL)
    { x: 78, y: 35, accent: '#f472b6' }, // streamassist (IA generativa)
    { x: 28, y: 68, accent: '#fbbf24' }, // casa-rael-api (integração)
    { x: 56, y: 75, accent: '#38e0e0' }, // saas-idsr-zapao (automação)
    { x: 80, y: 65, accent: '#7c6cf6' }, // moderador-guardrails (IA / guardrails)
  ];

  return (
    <div className="relative min-h-[calc(100vh-57px)] flex flex-col justify-between p-6 sm:px-12 py-8 overflow-hidden bg-[#0a0a0b] text-white select-none">
      {/* Aurora Background interna (campo de luz viva do portfólio) */}
      <div
        className={`absolute inset-0 pointer-events-none transition-all duration-700 ${
          hoveredProject ? 'blur-[80px] opacity-40' : 'blur-[100px] opacity-30'
        }`}
        style={{
          background:
            'radial-gradient(ellipse at 30% 40%, #7c6cf6 0%, transparent 60%), radial-gradient(ellipse at 70% 60%, #38e0e0 0%, transparent 60%)',
        }}
      />

      {/* Grid de profundidade do Cosmos (FOV 60) */}
      <div
        className="absolute inset-0 opacity-15 pointer-events-none transition-all duration-700"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.12) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.12) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
          filter: hoveredProject ? 'blur(1.5px)' : 'none',
        }}
      />

      {/* Linhas de constelação ótica conectando os projetos */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none transition-opacity duration-500">
        <defs>
          <linearGradient id="line-glow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#7c6cf6" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#38e0e0" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#f472b6" stopOpacity="0.3" />
          </linearGradient>
        </defs>
        {nodePositions.map((pos, i) => {
          if (i === nodePositions.length - 1) return null;
          const next = nodePositions[(i + 1) % nodePositions.length];
          return (
            <line
              key={`line-${i}`}
              x1={`${pos.x}%`}
              y1={`${pos.y}%`}
              x2={`${next.x}%`}
              y2={`${next.y}%`}
              stroke="url(#line-glow)"
              strokeWidth="1.2"
              strokeDasharray="4 6"
              className={`transition-opacity duration-500 ${
                hoveredProject ? 'opacity-15' : 'opacity-40'
              }`}
            />
          );
        })}
      </svg>

      {/* Header Telemetria do Espaço Cósmico */}
      <div className="relative z-10 max-w-2xl">
        <div
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/15 text-[10px] font-mono text-[#38e0e0] mb-3 backdrop-blur-md"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#38e0e0] animate-pulse" />
          <span>ESPAÇO NAVEGÁVEL // ENGENHARIA ROCHA</span>
        </div>
        <h1
          className="text-2xl sm:text-4xl font-bold text-white tracking-tight"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Constelação de Projetos <span className="text-aurora">em Produção</span>
        </h1>
        <p className="mt-2 text-xs sm:text-sm text-white/70 max-w-xl font-sans leading-relaxed">
          Cada ponto de luz representa um sistema real auditado no GitHub com arquitetura de dados e métricas em tempo real. Aproxime o cursor para puxar foco (Depth of Field).
        </p>
      </div>

      {/* Espaço de Constelação Interativo com Profundidade de Campo Radial */}
      <div className="relative w-full h-[420px] sm:h-[500px] my-2">
        {GIT_PORTFOLIO_PROJECTS.map((project, idx) => {
          const pos = nodePositions[idx] || { x: 50, y: 50, accent: '#7c6cf6' };
          const isThisHovered = hoveredProject?.id === project.id;
          const isAnotherHovered = hoveredProject !== null && !isThisHovered;

          return (
            <div
              key={project.id}
              className="absolute -translate-x-1/2 -translate-y-1/2 will-change-transform"
              style={{
                left: `${pos.x}%`,
                top: `${pos.y}%`,
                // Profundidade de Campo Radial: desfoca os outros nós quando um está em foco
                filter: isAnotherHovered ? 'blur(4px)' : 'blur(0px)',
                opacity: isAnotherHovered ? 0.35 : 1,
                transform: `translate(-50%, -50%) scale(${isThisHovered ? 1.25 : isAnotherHovered ? 0.95 : 1})`,
                transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
              onMouseEnter={() => setHoveredProject(project)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              {/* Botão do Nó Estelar */}
              <button
                type="button"
                data-cursor="explorar"
                onClick={() => selectProject(project.id)}
                className="relative group flex items-center justify-center p-3 rounded-full cursor-pointer focus:outline-none"
                aria-label={`Explorar projeto ${project.name}`}
              >
                {/* Aura pulse ring com a cor da aurora mais próxima */}
                <div
                  className="absolute inset-0 rounded-full transition-all duration-500"
                  style={{
                    transform: isThisHovered ? 'scale(2.2)' : 'scale(1.25)',
                    background: `${pos.accent}${isThisHovered ? '35' : '15'}`,
                    border: `1px solid ${pos.accent}${isThisHovered ? '80' : '30'}`,
                    boxShadow: isThisHovered ? `0 0 35px ${pos.accent}90` : 'none',
                  }}
                />

                {/* Core Star em Vidro com Núcleo Aurora */}
                <div
                  className="w-5 h-5 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-md"
                  style={{
                    background: isThisHovered ? pos.accent : 'rgba(255, 255, 255, 0.1)',
                    border: `1.5px solid ${pos.accent}`,
                    boxShadow: `0 0 15px ${pos.accent}70`,
                  }}
                >
                  <div
                    className="w-1.5 h-1.5 rounded-full"
                    style={{
                      background: isThisHovered ? '#0a0a0b' : '#ffffff',
                    }}
                  />
                </div>

                {/* Tag Pill do Projeto */}
                <span
                  className="absolute top-full mt-2.5 whitespace-nowrap font-mono text-[11px] px-2.5 py-0.5 rounded-md border transition-all"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    background: isThisHovered ? pos.accent : 'rgba(10, 10, 11, 0.85)',
                    color: isThisHovered ? '#0a0a0b' : '#ffffff',
                    fontWeight: isThisHovered ? 700 : 500,
                    borderColor: isThisHovered ? pos.accent : 'rgba(255, 255, 255, 0.15)',
                    boxShadow: isThisHovered ? `0 0 20px ${pos.accent}60` : 'none',
                  }}
                >
                  {project.name}
                </span>
              </button>
            </div>
          );
        })}

        {/* HUD Telemetria em Vidro Líquido no Hover */}
        {hoveredProject && (
          <div
            className="absolute bottom-2 left-1/2 -translate-x-1/2 z-30 w-full max-w-lg p-5 rounded-2xl border border-white/20 bg-white/[0.08] backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(124,108,246,0.2)] animate-in fade-in zoom-in-95 duration-200 pointer-events-none"
            style={{
              borderTopColor: 'rgba(255, 255, 255, 0.45)',
            }}
          >
            {/* Top Specular Line */}
            <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent pointer-events-none" />

            <div className="flex items-center justify-between border-b border-white/10 pb-2.5 mb-3">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#38e0e0] animate-pulse" />
                <span
                  className="font-mono text-xs font-bold text-white uppercase tracking-wider"
                  style={{ fontFamily: 'var(--font-mono)' }}
                >
                  {hoveredProject.name}
                </span>
              </div>
              <span
                className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-white/10 border border-white/15 text-[#38e0e0]"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                {hoveredProject.badge}
              </span>
            </div>

            <p className="text-xs text-white/80 leading-relaxed mb-3 font-sans">
              {hoveredProject.description}
            </p>

            <div
              className="flex items-center justify-between font-mono text-[11px] pt-2.5 border-t border-white/10"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              <span className="text-white/60">
                STACK: <strong className="text-white">{hoveredProject.languages.slice(0, 3).join(' · ')}</strong>
              </span>
              <span className="text-[#38e0e0] font-bold flex items-center gap-1">
                ABRIR NÓ EM FOCO ↵
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Footer de Instruções e Telemetria de Câmera */}
      <div
        className="relative z-10 flex flex-col sm:flex-row items-center justify-between border-t border-white/10 pt-4 font-mono text-xs text-white/50 gap-2"
        style={{ fontFamily: 'var(--font-mono)' }}
      >
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#7c6cf6] animate-pulse" />
          <span>CÂMERA FOV 60° // PROFUNDIDADE DE CAMPO ATIVA</span>
        </div>
        <div className="flex items-center gap-4 text-[11px]">
          <span>SELECIONE UM NÓ PARA ENCAIXAR CÂMERA</span>
          <span>SAÍDA: [ESC]</span>
        </div>
      </div>
    </div>
  );
}
