'use client';

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MOTION } from '@/motion-system-idsr';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface LiquidSectionDividerProps {
  sectionNumber?: string;
  sectionTitle?: string;
  inverted?: boolean;
  className?: string;
}

export function LiquidSectionDivider({
  sectionNumber = '01',
  sectionTitle = 'SECTOR',
  inverted = false,
  className = '',
}: LiquidSectionDividerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const path = pathRef.current;
    const label = labelRef.current;
    if (!container || !path) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        // Timeline de morphing e ondulação líquida guiada por scroll
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: container,
            start: 'top 85%',
            end: 'bottom 40%',
            scrub: 0.6,
          },
        });

        // Variação orgânica do caminho SVG
        tl.fromTo(
          path,
          {
            attr: {
              d: inverted
                ? 'M0,0 C360,60 1080,0 1440,50 L1440,80 L0,80 Z'
                : 'M0,50 C360,0 1080,60 1440,10 L1440,80 L0,80 Z',
            },
          },
          {
            attr: {
              d: inverted
                ? 'M0,30 C480,0 960,70 1440,20 L1440,80 L0,80 Z'
                : 'M0,10 C480,70 960,0 1440,40 L1440,80 L0,80 Z',
            },
            ease: 'none',
          }
        );

        if (label) {
          gsap.fromTo(
            label,
            { opacity: 0, y: MOTION.distance.small },
            {
              opacity: 1,
              y: 0,
              duration: MOTION.duration.fast,
              ease: MOTION.ease.out,
              scrollTrigger: {
                trigger: container,
                start: 'top 75%',
              },
            }
          );
        }
      });

      mm.add('(prefers-reduced-motion: reduce)', () => {
        if (label) {
          gsap.fromTo(
            label,
            { opacity: 0 },
            { opacity: 1, duration: MOTION.duration.fast, ease: 'none' }
          );
        }
      });
    }, container);

    return () => {
      ctx.revert();
    };
  }, [inverted]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden pointer-events-none select-none z-20 -my-3 ${className}`}
      style={{ height: '70px' }}
      aria-hidden="true"
    >
      {/* SVG da onda líquida */}
      <svg
        className="w-full h-full block"
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        fill="none"
      >
        {/* Glow sutil da aurora vazando pela fenda do vidro */}
        <defs>
          <linearGradient id={`seam-glow-${sectionNumber}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#7c6cf6" stopOpacity="0.0" />
            <stop offset="35%" stopColor="#7c6cf6" stopOpacity="0.45" />
            <stop offset="65%" stopColor="#38e0e0" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#38e0e0" stopOpacity="0.0" />
          </linearGradient>
          <linearGradient id={`glass-seam-fill-${sectionNumber}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#0a0a0b" stopOpacity="1" />
          </linearGradient>
        </defs>

        {/* Camada de preenchimento líquido */}
        <path
          ref={pathRef}
          d={
            inverted
              ? 'M0,0 C360,60 1080,0 1440,50 L1440,80 L0,80 Z'
              : 'M0,50 C360,0 1080,60 1440,10 L1440,80 L0,80 Z'
          }
          fill={`url(#glass-seam-fill-${sectionNumber})`}
        />

        {/* Linha de energia / costura de vidro com specular highlight */}
        <path
          d={
            inverted
              ? 'M0,0 C360,60 1080,0 1440,50'
              : 'M0,50 C360,0 1080,60 1440,10'
          }
          stroke={`url(#seam-glow-${sectionNumber})`}
          strokeWidth="2"
          fill="none"
        />
        <path
          d={
            inverted
              ? 'M0,0 C360,60 1080,0 1440,50'
              : 'M0,50 C360,0 1080,60 1440,10'
          }
          stroke="rgba(255, 255, 255, 0.25)"
          strokeWidth="1"
          fill="none"
        />
      </svg>

      {/* Rótulo de telemetria técnica de transição */}
      <div
        ref={labelRef}
        className="absolute right-6 sm:right-12 top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-auto"
      >
        <span
          className="text-[9px] font-mono tracking-[0.25em] text-white/40 uppercase bg-[#0a0a0b]/80 px-2.5 py-0.5 rounded-full border border-white/10 backdrop-blur-md"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          {sectionNumber} // {sectionTitle}
        </span>
      </div>
    </div>
  );
}
