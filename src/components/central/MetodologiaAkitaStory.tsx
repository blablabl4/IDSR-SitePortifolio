'use client';

import React from 'react';
import { useTransition } from '@/context/TransitionContext';
import { DustText } from '@/components/ui/DustText';

export function MetodologiaAkitaStory() {
  const { progress, status } = useTransition();

  const isIdle = status === 'IDLE_NA_SECAO';
  const opacity = Math.max(0, 1 - progress * 1.5);
  const scale = 1 - progress * 0.05;

  return (
    <div
      className="relative w-full h-full flex items-center justify-center px-4 sm:px-8 lg:px-12 py-3 sm:py-5 overflow-hidden select-none will-change-transform"
      style={{
        opacity,
        transform: `scale(${scale})`,
      }}
    >
      <div className="w-full max-w-7xl mx-auto flex flex-col justify-center z-10">
        {/* Topo: Badge + Título da Seção + Descrição */}
        <div className="max-w-4xl lg:max-w-5xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/35 bg-emerald-500/10 text-emerald-300 text-[10px] sm:text-xs font-mono font-bold tracking-wider uppercase w-fit backdrop-blur-md mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>FILOSOFIA AKITA · ZERO ATALHOS</span>
          </div>

          <h2
            className="text-xl sm:text-2xl md:text-3xl lg:text-[2.2rem] font-black text-white tracking-[-0.03em] leading-[1.12] uppercase drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)]"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            <DustText
              text="Método de Engenharia & Causa Raiz"
              accentColor="#10b981"
              glowColor="#34d399"
              delay={80}
              stagger={12}
              active={isIdle}
            />
          </h2>

          <p className="mt-1.5 text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed max-w-3xl">
            <DustText
              text="Não vendemos promessas mágicas nem atalhos frágeis. Software que sustenta empresas nasce de fundamentos de computação, concorrência e leitura rigorosa de causa raiz. Diagnosticamos onde sua operação sangra clientes e construímos a infraestrutura definitiva."
              mode="words"
              accentColor="#10b981"
              delay={260}
              stagger={14}
              active={isIdle}
            />
          </p>
        </div>

        {/* Centro: 3 Pilares Metodológicos em Cards de Vidro Escuro Sólido */}
        <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Pilar 1 */}
          <div className="relative rounded-2xl border border-white/[0.12] bg-[#08090e]/95 backdrop-blur-2xl p-5 sm:p-6 shadow-[0_24px_64px_rgba(0,0,0,0.9)] flex flex-col justify-between before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent hover:border-white/25 transition-all">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-[#38e0e0]/30 bg-[#38e0e0]/10 text-[#38e0e0] font-mono text-[10px] sm:text-xs font-bold tracking-wider mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#38e0e0]" />
                <span>01 // CAUSA RAIZ & DIAGNÓSTICO</span>
              </div>
              <h3
                className="text-base sm:text-lg font-bold text-white mb-2 leading-snug"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Medir antes de opinar
              </h3>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans">
                Mapeamento de funil, latência de atendimento e gargalos operacionais.
                Identificamos exatamente onde sua equipe perde tempo ou onde leads são
                esquecidos antes de propor qualquer solução.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-white/[0.08] flex items-center justify-between text-[10px] font-mono text-zinc-400 uppercase">
              <span>TELEMETRIA</span>
              <span className="text-[#38e0e0] font-bold">ZERO ACHISMO</span>
            </div>
          </div>

          {/* Pilar 2 */}
          <div className="relative rounded-2xl border border-white/[0.12] bg-[#08090e]/95 backdrop-blur-2xl p-5 sm:p-6 shadow-[0_24px_64px_rgba(0,0,0,0.9)] flex flex-col justify-between before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent hover:border-white/25 transition-all">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-[#7c6cf6]/30 bg-[#7c6cf6]/10 text-[#a78bfa] font-mono text-[10px] sm:text-xs font-bold tracking-wider mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#a78bfa]" />
                <span>02 // ENGENHARIA SEM GAMBIARRA</span>
              </div>
              <h3
                className="text-base sm:text-lg font-bold text-white mb-2 leading-snug"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Arquitetura feita para durar
              </h3>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans">
                <strong className="text-white">TypeScript & Next.js</strong> para interfaces ultra-rápidas,{' '}
                <strong className="text-white">Python & LLMs</strong> para agentes inteligentes,{' '}
                <strong className="text-white">Redis & PostgreSQL</strong> para consistência transacional e filas seguras.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-white/[0.08] flex items-center justify-between text-[10px] font-mono text-zinc-400 uppercase">
              <span>RESILIÊNCIA</span>
              <span className="text-[#a78bfa] font-bold">STACK MODERNA</span>
            </div>
          </div>

          {/* Pilar 3 */}
          <div className="relative rounded-2xl border border-white/[0.12] bg-[#08090e]/95 backdrop-blur-2xl p-5 sm:p-6 shadow-[0_24px_64px_rgba(0,0,0,0.9)] flex flex-col justify-between before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent hover:border-white/25 transition-all">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-[#ec4899]/30 bg-[#ec4899]/10 text-[#f472b6] font-mono text-[10px] sm:text-xs font-bold tracking-wider mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#f472b6]" />
                <span>03 // BLINDAGEM & RETORNO REAL</span>
              </div>
              <h3
                className="text-base sm:text-lg font-bold text-white mb-2 leading-snug"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Rastreabilidade e estabilidade
              </h3>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans">
                Sistemas autônomos com esteira de testes contínuos, protocolos únicos por
                atendimento e recuperação automática de falhas. Sua operação roda sem sustos.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-white/[0.08] flex items-center justify-between text-[10px] font-mono text-zinc-400 uppercase">
              <span>CONFIABILIDADE</span>
              <span className="text-[#f472b6] font-bold">99.98% SLA</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
