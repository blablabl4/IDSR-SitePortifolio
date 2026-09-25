'use client';

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MOTION } from '@/motion-system-idsr';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface SectionTransitionWrapperProps {
  id?: string;
  className?: string;
  children: React.ReactNode;
  staggerCards?: boolean;
}

export function SectionTransitionWrapper({
  id,
  className = '',
  children,
  staggerCards = true,
}: SectionTransitionWrapperProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    // Elementos marcados para revelação
    const headers = el.querySelectorAll('[data-reveal="header"]');
    const cards = el.querySelectorAll('[data-reveal="card"]');
    const items = el.querySelectorAll('[data-reveal="item"]');

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        // 1. Revelação dos cabeçalhos editoriais (lifting suave com máscara)
        if (headers.length > 0) {
          gsap.fromTo(
            headers,
            { opacity: 0, y: MOTION.distance.medium },
            {
              opacity: 1,
              y: 0,
              duration: MOTION.duration.base,
              ease: MOTION.ease.out,
              scrollTrigger: {
                trigger: el,
                start: 'top 82%',
                toggleActions: 'play none none none',
              },
            }
          );
        }

        // 2. Revelação dos cards de vidro líquido com stagger
        if (cards.length > 0) {
          gsap.fromTo(
            cards,
            { opacity: 0, y: MOTION.distance.medium, scale: 0.98 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: MOTION.duration.base,
              stagger: staggerCards ? MOTION.stagger.loose : 0,
              ease: MOTION.ease.out,
              scrollTrigger: {
                trigger: el,
                start: 'top 75%',
                toggleActions: 'play none none none',
              },
            }
          );
        }

        // 3. Outros itens secundários
        if (items.length > 0) {
          gsap.fromTo(
            items,
            { opacity: 0, y: MOTION.distance.small },
            {
              opacity: 1,
              y: 0,
              duration: MOTION.duration.fast,
              stagger: MOTION.stagger.normal,
              ease: MOTION.ease.out,
              scrollTrigger: {
                trigger: el,
                start: 'top 78%',
                toggleActions: 'play none none none',
              },
            }
          );
        }
      });

      mm.add('(prefers-reduced-motion: reduce)', () => {
        if (headers.length > 0) {
          gsap.fromTo(
            headers,
            { opacity: 0 },
            { opacity: 1, duration: MOTION.duration.base, ease: 'none' }
          );
        }
        if (cards.length > 0) {
          gsap.fromTo(
            cards,
            { opacity: 0 },
            { opacity: 1, duration: MOTION.duration.base, stagger: MOTION.stagger.tight, ease: 'none' }
          );
        }
        if (items.length > 0) {
          gsap.fromTo(
            items,
            { opacity: 0 },
            { opacity: 1, duration: MOTION.duration.fast, ease: 'none' }
          );
        }
      });
    }, el);

    return () => {
      ctx.revert();
    };
  }, [staggerCards]);

  return (
    <section ref={sectionRef} id={id} className={`relative ${className}`}>
      {children}
    </section>
  );
}
