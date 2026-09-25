'use client';

import React, { useEffect, useRef } from 'react';

export function AuroraBackground() {
  const blob1Ref = useRef<HTMLDivElement>(null);
  const blob2Ref = useRef<HTMLDivElement>(null);
  const blob3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 60;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 60;
    };

    window.addEventListener('mousemove', handleMouseMove);

    let frameId: number;
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      currentX += (mouseX - currentX) * 0.05;
      currentY += (mouseY - currentY) * 0.05;

      if (blob1Ref.current) {
        blob1Ref.current.style.transform = `translate(${currentX * 1.2}px, ${currentY * 1.2}px)`;
      }
      if (blob2Ref.current) {
        blob2Ref.current.style.transform = `translate(${-currentX * 0.8}px, ${-currentY * 0.8}px)`;
      }
      if (blob3Ref.current) {
        blob3Ref.current.style.transform = `translate(${currentX * 0.5}px, ${-currentY * 0.5}px)`;
      }
    };
    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {/* 1. Subtle Precision Grid Overlay (from reference: 24px x 24px, opacity 0.035) */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 1) 1px, transparent 1px)
          `,
          backgroundSize: '24px 24px',
        }}
      />

      {/* 2. Organic Aurora Glowing Blobs (Violet, Magenta, Cyan) */}
      {/* Aurora Violet Blob - Top Right */}
      <div
        ref={blob1Ref}
        className="absolute -top-24 -right-24 w-[550px] h-[550px] rounded-full blur-[120px] opacity-25"
        style={{
          background: 'radial-gradient(circle, #7c6cf6 0%, rgba(124, 108, 246, 0) 70%)',
          willChange: 'transform',
        }}
      />

      {/* Aurora Cyan Blob - Center Left */}
      <div
        ref={blob2Ref}
        className="absolute top-1/3 -left-32 w-[600px] h-[600px] rounded-full blur-[140px] opacity-20"
        style={{
          background: 'radial-gradient(circle, #38e0e0 0%, rgba(56, 224, 224, 0) 70%)',
          willChange: 'transform',
        }}
      />

      {/* Aurora Magenta Blob - Bottom Right */}
      <div
        ref={blob3Ref}
        className="absolute -bottom-32 right-1/4 w-[500px] h-[500px] rounded-full blur-[130px] opacity-20"
        style={{
          background: 'radial-gradient(circle, #f472b6 0%, rgba(244, 114, 182, 0) 70%)',
          willChange: 'transform',
        }}
      />
    </div>
  );
}
