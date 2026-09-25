'use client';

import React, { useState } from 'react';
import { usePortalStore } from '@/lib/portal-store';
import { IrisSymbol, IrisState } from '@/components/ui/IrisSymbol';

interface FechaduraPortalProps {
  className?: string;
  variant?: 'floating' | 'inline';
  targetProjectId?: string;
  label?: string;
}

export function FechaduraPortal({
  className = '',
  variant = 'floating',
  targetProjectId,
  label = 'PORTAL ROCHA',
}: FechaduraPortalProps) {
  const { portalState, openPortal } = usePortalStore();
  const [isHovered, setIsHovered] = useState(false);

  const isTransitioning = portalState === 'opening' || portalState === 'closing';

  // Determine Iris state
  const irisState: IrisState =
    portalState === 'open' ? 'open' : isHovered ? 'opening' : 'closed';

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isTransitioning || portalState === 'open') return;

    const rect = e.currentTarget.getBoundingClientRect();
    const origin = {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    };

    openPortal(targetProjectId, origin);
  };

  if (variant === 'inline') {
    return (
      <button
        type="button"
        data-cursor="portal"
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`group relative inline-flex items-center gap-3 px-5 py-2.5 rounded-lg border border-white/20 hover:border-white/50 bg-white/5 hover:bg-white/10 backdrop-blur-md transition-all duration-500 cursor-pointer overflow-hidden ${
          isHovered ? 'scale-105 shadow-[0_0_35px_rgba(124,108,246,0.28)]' : 'scale-100'
        } ${className}`}
        aria-label="Abrir portal do portfólio"
      >
        {/* Subtle Specular Top Reflection */}
        <div className="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />

        {/* Ambient Aurora glow on hover */}
        <div
          className={`absolute inset-0 bg-gradient-to-r from-[#7c6cf6]/20 via-[#f472b6]/15 to-[#38e0e0]/20 blur-md pointer-events-none transition-opacity duration-500 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Official Iris Symbol */}
        <IrisSymbol size={26} state={irisState} />

        <span
          className="font-mono text-xs uppercase tracking-[0.2em] text-white font-semibold group-hover:text-white transition-colors"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          {label}
        </span>
        <span className="font-mono text-[10px] text-white/50 group-hover:translate-x-0.5 transition-transform">
          [PORTAL ↵]
        </span>
      </button>
    );
  }

  // Variant: Floating HUD Glass Capsule
  return (
    <div className={`relative ${className}`}>
      <button
        type="button"
        data-cursor="portal"
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`group relative flex items-center gap-3 pl-3 pr-4 py-2 rounded-full border border-white/15 hover:border-white/40 bg-black/40 hover:bg-white/10 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.6)] transition-all duration-500 cursor-pointer ${
          isHovered ? 'scale-105 shadow-[0_0_35px_rgba(56,224,224,0.3)]' : 'scale-100'
        }`}
        aria-label="Abrir portal do portfólio"
        title="Abrir mundo imersivo do portfólio"
      >
        {/* Specular top light */}
        <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent pointer-events-none" />

        {/* Ambient Aurora glow escaping from iris */}
        <div
          className={`absolute -inset-1 rounded-full bg-gradient-to-r from-[#7c6cf6]/30 via-[#f472b6]/20 to-[#38e0e0]/30 blur-lg pointer-events-none transition-opacity duration-500 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Official Mechanical Iris */}
        <IrisSymbol size={30} state={irisState} />

        <div className="flex flex-col text-left">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#38e0e0] shadow-[0_0_8px_#38e0e0]" />
            <span
              className="font-mono text-[11px] font-bold tracking-[0.2em] text-white group-hover:text-[#38e0e0] transition-colors"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              PORTAL ROCHA
            </span>
          </div>
          <span className="font-mono text-[9px] text-white/50 tracking-wider uppercase">
            MUNDO NAVEGÁVEL
          </span>
        </div>
      </button>
    </div>
  );
}
