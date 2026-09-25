'use client';

import React, { useEffect, useRef } from 'react';

interface DustMotesOverlayProps {
  active?: boolean;
  accentColor?: string;
  count?: number;
}

/**
 * DustMotesOverlay — Micro-partículas atmosféricas de poeira luminosa que convergem
 * em direção ao centro e se dissolvem quando o texto se consolida.
 */
export function DustMotesOverlay({
  active = true,
  accentColor = '#38e0e0',
  count = 75,
}: DustMotesOverlayProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    interface Mote {
      x: number;
      y: number;
      targetX: number;
      targetY: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
      life: number;
      maxLife: number;
    }

    const motes: Mote[] = [];
    const centerX = width / 2;
    const centerY = height / 2;

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const dist = 160 + Math.random() * (Math.min(width, height) * 0.45);
      const x = centerX + Math.cos(angle) * dist;
      const y = centerY + Math.sin(angle) * dist;
      motes.push({
        x,
        y,
        targetX: centerX + (Math.random() - 0.5) * (width * 0.5),
        targetY: centerY + (Math.random() - 0.5) * (height * 0.3),
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5,
        size: 1.0 + Math.random() * 2.2,
        alpha: 0,
        life: 0,
        maxLife: 70 + Math.random() * 60,
      });
    }

    let animId: number;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      if (!active) {
        animId = requestAnimationFrame(render);
        return;
      }

      for (let i = 0; i < motes.length; i++) {
        const m = motes[i];
        m.life++;

        // Atração gravitacional suave para a área do texto
        const dx = m.targetX - m.x;
        const dy = m.targetY - m.y;
        m.vx += dx * 0.0008;
        m.vy += dy * 0.0008;
        m.vx *= 0.94;
        m.vy *= 0.94;

        m.x += m.vx;
        m.y += m.vy;

        // Fade in inicial e fade out ao final da vida
        const progress = m.life / m.maxLife;
        if (progress < 0.25) {
          m.alpha = progress / 0.25;
        } else if (progress > 0.65) {
          m.alpha = Math.max(0, 1 - (progress - 0.65) / 0.35);
        } else {
          m.alpha = 0.85;
        }

        if (m.alpha > 0.01) {
          ctx.beginPath();
          ctx.arc(m.x, m.y, m.size, 0, Math.PI * 2);
          ctx.fillStyle = accentColor;
          ctx.globalAlpha = m.alpha * 0.7;
          ctx.shadowBlur = 10;
          ctx.shadowColor = accentColor;
          ctx.fill();
        }
      }

      ctx.globalAlpha = 1.0;
      animId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, [active, accentColor, count]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-10 w-full h-full"
      aria-hidden="true"
    />
  );
}
