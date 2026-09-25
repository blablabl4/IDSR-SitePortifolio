'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from '@/hooks/useInView';
import { cn } from '@/lib/utils';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  /** Animação de entrada: 'fade-up' | 'fade-left' | 'fade-right' | 'scale' | 'blur' */
  variant?: 'fade-up' | 'fade-left' | 'fade-right' | 'scale' | 'blur';
  /** Delay em ms antes de começar a animação */
  delay?: number;
  /** Duração da animação em s */
  duration?: number;
  /** Se usa tag <section> ou <div> */
  as?: 'section' | 'div';
  id?: string;
}

const VARIANTS = {
  'fade-up': {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  },
  'fade-left': {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  },
  'fade-right': {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.92 },
    visible: { opacity: 1, scale: 1 },
  },
  blur: {
    hidden: { opacity: 0, filter: 'blur(12px)' },
    visible: { opacity: 1, filter: 'blur(0px)' },
  },
};

/**
 * Wrapper de animação scroll-triggered. Cada child entra com animação real
 * quando atinge a viewport. Nada de CSS-only fake — usa IntersectionObserver
 * real + Framer Motion pra transição suave.
 */
export function AnimatedSection({
  children,
  className,
  variant = 'fade-up',
  delay = 0,
  duration = 0.7,
  as = 'div',
  id,
}: AnimatedSectionProps) {
  const [ref, isInView] = useInView<HTMLDivElement>({ threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  const Tag = as === 'section' ? motion.section : motion.div;

  return (
    <Tag
      ref={ref}
      id={id}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={VARIANTS[variant]}
      transition={{
        duration,
        delay: delay / 1000,
        ease: [0.22, 1, 0.36, 1], // custom cubic-bezier (ease-out-quint)
      }}
      className={cn(className)}
    >
      {children}
    </Tag>
  );
}

/**
 * Anima cada filho com stagger (intervalo escalonado).
 * Ideal pra grids de cards, listas de itens, timelines.
 */
export function StaggerContainer({
  children,
  className,
  staggerDelay = 0.1,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
  id?: string;
}) {
  const [ref, isInView] = useInView<HTMLDivElement>({ threshold: 0.08 });

  return (
    <motion.div
      ref={ref}
      id={id}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}

/**
 * Filho animado pra usar dentro do StaggerContainer.
 */
export function StaggerItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 30, scale: 0.97 },
        visible: { opacity: 1, y: 0, scale: 1 },
      }}
      transition={{
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
