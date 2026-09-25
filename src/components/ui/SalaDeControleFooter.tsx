'use client';

import React from 'react';
import { IrisSymbol } from './IrisSymbol';
import { FechaduraPortal } from '@/components/portal/FechaduraPortal';

export function SalaDeControleFooter() {
  return (
    <footer className="border-t border-white/10 bg-[#0a0a0b] py-12 px-6 sm:px-12 font-mono text-xs text-white/50">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand signature */}
        <div className="flex items-center gap-3">
          <IrisSymbol size={20} state="closed" />
          <span
            className="text-white/60 text-xs tracking-wider"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            IDSR · BRAND IDENTITY SYSTEM · v3.0
          </span>
        </div>

        {/* Navigation links */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-white/60">
          <a href="#servicos" className="hover:text-white transition-colors">
            SERVIÇOS
          </a>
          <a href="#como-funciona" className="hover:text-white transition-colors">
            MÉTODO
          </a>
          <a href="#cases" className="hover:text-white transition-colors">
            CASES
          </a>
          <a href="#sobre" className="hover:text-white transition-colors">
            MANIFESTO
          </a>
          <a
            href="https://github.com/blablabl4"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-[#38e0e0] transition-colors"
          >
            GITHUB ↗
          </a>
        </div>

        {/* Portal Button & Copyright */}
        <div className="flex items-center gap-4">
          <FechaduraPortal
            variant="inline"
            label="ABRIR PORTAL"
            className="py-1 px-3 text-[10px]"
          />
          <span className="text-[10px] text-white/40">
            © {new Date().getFullYear()} IDSR
          </span>
        </div>
      </div>
    </footer>
  );
}
