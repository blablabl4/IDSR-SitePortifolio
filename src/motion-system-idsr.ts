// ==========================================================================
// IDSR — Sistema Unificado de Motion (Fonte Única da Verdade)
// Todo componente que anima (GSAP, ScrollTrigger, CSS) importa deste arquivo,
// nunca escreve duration/ease/stagger/distance solto direto no componente.
// ==========================================================================

export const MOTION = {
  ease: {
    out: "power2.out",          // entradas normais, hover, a maioria das coisas
    inOut: "power3.inOut",      // transições de seção, scroll-linked
    portal: "power4.inOut",     // exclusivo da transição do portal
    overshoot: "back.out(1.4)", // usar com moderação, só em momentos de destaque
  },
  duration: {
    micro: 0.2,   // hover, feedback instantâneo (200ms)
    fast: 0.4,    // entrada de elemento pequeno (tag, botão, 400ms)
    base: 0.6,    // entrada de bloco de conteúdo (600ms)
    slow: 0.9,    // transição de seção/projeto (900ms)
    portal: 1.15, // a transição do portal, e só ela (1150ms)
  },
  stagger: {
    tight: 0.03,
    normal: 0.06,
    loose: 0.1,
  },
  distance: {
    small: 16,  // px, deslocamento de entrada de texto/label
    medium: 32, // px, deslocamento de entrada de bloco
    large: 64,  // px, deslocamento de entrada de seção inteira
  },
} as const;

export type MotionEase = typeof MOTION.ease[keyof typeof MOTION.ease];
export type MotionDuration = typeof MOTION.duration[keyof typeof MOTION.duration];
export type MotionStagger = typeof MOTION.stagger[keyof typeof MOTION.stagger];
export type MotionDistance = typeof MOTION.distance[keyof typeof MOTION.distance];
