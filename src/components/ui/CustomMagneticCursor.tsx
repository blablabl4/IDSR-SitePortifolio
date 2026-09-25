'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { MOTION } from '@/motion-system-idsr';

export function CustomMagneticCursor() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const [cursorText, setCursorText] = useState<string>('');
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const isVisibleRef = useRef<boolean>(false);

  useEffect(() => {
    // Esconde em dispositivos de toque
    if (typeof window === 'undefined' || window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    // Respeita preferência de movimento reduzido
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const container = containerRef.current;
    const dot = cursorDotRef.current;
    const ring = cursorRingRef.current;
    if (!container || !dot || !ring) return;

    const ctx = gsap.context(() => {
      let mouseX = window.innerWidth / 2;
      let mouseY = window.innerHeight / 2;
      let ringX = mouseX;
      let ringY = mouseY;

      const handleMouseMove = (e: MouseEvent) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        if (!isVisibleRef.current) {
          isVisibleRef.current = true;
          gsap.to(container, { opacity: 1, duration: MOTION.duration.micro });
        }

        // Micro-dot acompanha imediatamente com suavidade
        gsap.to(dot, {
          x: mouseX,
          y: mouseY,
          duration: MOTION.duration.micro,
          ease: MOTION.ease.out,
          overwrite: 'auto',
        });

        // Detecção contextual do elemento sob o cursor (estilo Rogier de Boevé)
        const target = (e.target as HTMLElement)?.closest(
          '[data-cursor], button, a, [role="button"]'
        );
        if (target) {
          setIsHovering(true);
          const cursorType = target.getAttribute('data-cursor');
          if (cursorType) {
            setCursorText(cursorType.toUpperCase());
          } else if (target.tagName.toLowerCase() === 'a') {
            setCursorText('VER');
          } else if (target.tagName.toLowerCase() === 'button') {
            setCursorText('ACESSAR');
          } else {
            setCursorText('');
          }
        } else {
          setIsHovering(false);
          setCursorText('');
        }
      };

      const handleMouseLeave = () => {
        isVisibleRef.current = false;
        gsap.to(container, { opacity: 0, duration: MOTION.duration.fast });
      };

      // Ticker com lerp suave para o anel magnético exterior
      const updateRing = () => {
        ringX += (mouseX - ringX) * 0.15;
        ringY += (mouseY - ringY) * 0.15;

        gsap.set(ring, {
          x: ringX,
          y: ringY,
        });
      };

      window.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseleave', handleMouseLeave);
      gsap.ticker.add(updateRing);

      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseleave', handleMouseLeave);
        gsap.ticker.remove(updateRing);
      };
    }, container);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden opacity-0"
      aria-hidden="true"
    >
      {/* Micro-ponto central */}
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-white transition-opacity"
        style={{
          boxShadow: '0 0 10px rgba(255, 255, 255, 0.9)',
          opacity: isHovering ? 0 : 1,
          transitionDuration: `${MOTION.duration.micro}s`,
        }}
      />

      {/* Anel magnético contextual Rogier de Boevé */}
      <div
        ref={cursorRingRef}
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/40 flex items-center justify-center transition-all will-change-transform"
        style={{
          width: isHovering ? 64 : 28,
          height: isHovering ? 64 : 28,
          borderColor: isHovering ? 'rgba(56, 224, 224, 0.75)' : 'rgba(255, 255, 255, 0.35)',
          background: isHovering ? 'rgba(10, 10, 11, 0.75)' : 'transparent',
          backdropFilter: isHovering ? 'blur(10px)' : 'none',
          boxShadow: isHovering ? '0 0 25px rgba(56, 224, 224, 0.3)' : 'none',
          transitionDuration: `${MOTION.duration.fast}s`,
          transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {cursorText && (
          <span
            className="font-mono text-[9px] text-[#38e0e0] font-bold tracking-widest text-center px-1 uppercase select-none pointer-events-none"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            {cursorText}
          </span>
        )}
      </div>
    </div>
  );
}
