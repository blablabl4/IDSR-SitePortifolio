'use client';

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { MOTION } from '@/motion-system-idsr';
import { usePortalStore } from '@/lib/portal-store';
import { MundoPortfolio } from '@/components/portfolio/MundoPortfolio';

export function PortalTransitionOverlay() {
  const { portalState, transitionOrigin, closePortal } = usePortalStore();
  const overlayRef = useRef<HTMLDivElement>(null);
  const flashAuraRef = useRef<HTMLDivElement>(null);

  // Keyboard shortcut: ESC to close portal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && (portalState === 'open' || portalState === 'opening')) {
        closePortal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [portalState, closePortal]);

  // GSAP 3-Tempo Camera Traversal & Clip-Path Transition
  useEffect(() => {
    if (!overlayRef.current) return;

    const { x, y } = transitionOrigin;

    const ctx = gsap.context(() => {
      if (portalState === 'opening') {
        // Trava o scroll da página institucional
        document.body.style.overflow = 'hidden';

        const tl = gsap.timeline();

        // Flash de luz da Aurora concentrada na origem da íris
        if (flashAuraRef.current) {
          tl.fromTo(
            flashAuraRef.current,
            { opacity: 0, scale: 0.1 },
            { opacity: 1, scale: 3.0, duration: MOTION.duration.fast, ease: 'power2.in' },
            0
          ).to(
            flashAuraRef.current,
            { opacity: 0, duration: MOTION.duration.base, ease: MOTION.ease.out },
            MOTION.duration.fast
          );
        }

        // Tempo 3: Atravessamento da lente (MOTION.ease.portal, MOTION.duration.portal 1.15s rigoroso)
        tl.fromTo(
          overlayRef.current,
          {
            clipPath: `circle(0px at ${x}px ${y}px)`,
            scale: 1.06,
            filter: 'blur(8px)',
            opacity: 1,
          },
          {
            clipPath: `circle(150vmax at ${x}px ${y}px)`,
            scale: 1,
            filter: 'blur(0px)',
            duration: MOTION.duration.portal,
            ease: MOTION.ease.portal,
          },
          0
        );
      } else if (portalState === 'closing') {
        // Saída do portfólio: coreografia invertida, câmera recua e a íris se fecha
        gsap.to(overlayRef.current, {
          clipPath: `circle(0px at ${x}px ${y}px)`,
          scale: 0.96,
          filter: 'blur(6px)',
          duration: MOTION.duration.base,
          ease: MOTION.ease.inOut,
          onComplete: () => {
            document.body.style.overflow = '';
          },
        });
      } else if (portalState === 'closed') {
        document.body.style.overflow = '';
      }
    }, overlayRef);

    return () => ctx.revert();
  }, [portalState, transitionOrigin]);

  if (portalState === 'closed') {
    return null;
  }

  return (
    <div
      ref={overlayRef}
      id="portal-world-overlay"
      className="fixed inset-0 z-50 bg-[#0a0a0b] overflow-y-auto will-change-transform"
      style={{
        clipPath:
          portalState === 'open'
            ? 'circle(150vmax at 50% 50%)'
            : `circle(0px at ${transitionOrigin.x}px ${transitionOrigin.y}px)`,
      }}
    >
      {/* Aurora Light Burst na abertura da íris */}
      <div
        ref={flashAuraRef}
        className="fixed pointer-events-none w-40 h-40 rounded-full blur-3xl z-50 opacity-0 -translate-x-1/2 -translate-y-1/2"
        style={{
          left: transitionOrigin.x,
          top: transitionOrigin.y,
          background: 'radial-gradient(circle, #7c6cf6 0%, #38e0e0 50%, transparent 80%)',
        }}
      />

      {/* Mundo do Portfólio com FOV 60 e DoF Radial */}
      <MundoPortfolio />
    </div>
  );
}
