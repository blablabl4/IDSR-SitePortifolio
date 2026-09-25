'use client';

import React from 'react';

interface SectionHeaderProps {
  index: string;
  label: string;
  className?: string;
}

export function SectionHeader({ index, label, className = '' }: SectionHeaderProps) {
  return (
    <div className={`flex items-center gap-4 mb-8 ${className}`}>
      <span
        className="text-white text-xs font-mono font-bold tracking-widest shrink-0"
        style={{ fontFamily: 'var(--font-mono)' }}
      >
        {index}
      </span>
      <div className="flex-1 h-px bg-white/15" />
      <span
        className="text-white/60 text-xs font-mono uppercase tracking-[0.15em] shrink-0"
        style={{ fontFamily: 'var(--font-mono)' }}
      >
        {label}
      </span>
    </div>
  );
}

interface TagPillProps {
  children: React.ReactNode;
  accent?: boolean;
  className?: string;
}

export function TagPill({ children, accent = false, className = '' }: TagPillProps) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 text-[10px] font-mono font-medium uppercase tracking-widest border rounded-sm transition-colors ${
        accent
          ? 'text-white border-white/40 bg-white/12 backdrop-blur-md shadow-[0_0_12px_rgba(255,255,255,0.1)]'
          : 'text-white/70 border-white/20 bg-white/5 backdrop-blur-sm'
      } ${className}`}
      style={{ fontFamily: 'var(--font-mono)' }}
    >
      {children}
    </span>
  );
}
