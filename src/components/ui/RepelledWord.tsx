'use client';

import React, { useRef, useState, useEffect } from 'react';

interface RepelledWordProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * RepelledWord — Efeito tátil de repulsão magnética ao passar o cursor do mouse
 * Empurra suavemente a palavra na direção oposta ao cursor com retorno elástico orgânico.
 */
export function RepelledWord({ children, className = '', style = {} }: RepelledWordProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      const radius = 100; // Raio de influência do cursor
      if (dist < radius) {
        const factor = 1 - dist / radius;
        const force = factor * 15; // Deslocamento físico sutil
        const angle = Math.atan2(dy, dx);
        setOffset({
          x: -Math.cos(angle) * force,
          y: -Math.sin(angle) * force,
        });
      } else {
        setOffset((prev) => (prev.x === 0 && prev.y === 0 ? prev : { x: 0, y: 0 }));
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <span
      ref={ref}
      className={`inline-block transition-transform duration-200 ease-out will-change-transform ${className}`}
      style={{
        transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
        ...style,
      }}
    >
      {children}
    </span>
  );
}
