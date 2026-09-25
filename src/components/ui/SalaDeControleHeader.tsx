'use client';

import React, { useState } from 'react';
import { IrisSymbol } from './IrisSymbol';
import { FechaduraPortal } from '@/components/portal/FechaduraPortal';

export function SalaDeControleHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 border-b border-white/10 bg-[#0a0a0b]/85 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 h-16 flex items-center justify-between gap-4">
        {/* Left: Official IDSR Brand Signature */}
        <a href="#" data-cursor="idsr" className="flex items-center gap-3 group">
          <IrisSymbol size={26} state="open" />
          <span
            className="font-mono text-base font-bold text-white tracking-[0.35em] uppercase group-hover:text-[#38e0e0] transition-colors"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            IDSR
          </span>
          <span className="text-white/20 hidden sm:inline">/</span>
          <span
            className="hidden sm:inline-block font-mono text-[10px] text-white/60 tracking-wider uppercase px-2 py-0.5 rounded border border-white/10 bg-white/5"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            brand-system-v3
          </span>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-mono text-white/70">
          <a href="#servicos" data-cursor="serviços" className="hover:text-white transition-colors">
            01. SERVIÇOS
          </a>
          <a href="#como-funciona" data-cursor="processo" className="hover:text-white transition-colors">
            02. PROCESSO
          </a>
          <a href="#cases" data-cursor="cases" className="hover:text-white transition-colors">
            03. CASES
          </a>
          <a href="#sobre" data-cursor="manifesto" className="hover:text-white transition-colors">
            04. MANIFESTO
          </a>
          <a
            href="#contato"
            data-cursor="proposta"
            className="px-3.5 py-1 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 text-white font-medium hover:border-white/40 transition-colors"
          >
            CONTATO
          </a>
        </nav>

        {/* Right Area: Portal Fechadura Trigger + Mobile Toggle */}
        <div className="flex items-center gap-3">
          <FechaduraPortal variant="floating" />

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded border border-white/15 text-white/70 hover:text-white"
            aria-label="Abrir menu"
          >
            <span className="font-mono text-xs">{mobileMenuOpen ? '✕' : '☰'}</span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-white/10 bg-[#0a0a0b]/95 backdrop-blur-2xl px-6 py-4 space-y-3 font-mono text-xs text-white/80">
          <a
            href="#servicos"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1 hover:text-white"
          >
            01. SERVIÇOS EM AÇÃO
          </a>
          <a
            href="#como-funciona"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1 hover:text-white"
          >
            02. PROCESSO & ENGENHARIA
          </a>
          <a
            href="#cases"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1 hover:text-white"
          >
            03. CASES REAIS GIT
          </a>
          <a
            href="#sobre"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1 hover:text-white"
          >
            04. MANIFESTO ROCHA
          </a>
          <a
            href="#contato"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1 text-[#38e0e0] font-bold"
          >
            05. INICIAR DIAGNÓSTICO
          </a>
        </div>
      )}
    </header>
  );
}
