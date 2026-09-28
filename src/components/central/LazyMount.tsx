'use client';

import React, { useEffect, useRef, useState } from 'react';

/**
 * Monta `children` só quando o placeholder chega perto da viewport (uma tela de
 * antecedência) e mantém montado depois. Pra conteúdo pesado de seção (demos
 * interativas) — texto nunca deve ficar atrás disto, senão sai do HTML do servidor.
 */
export function LazyMount({
  children,
  rootMargin = '100% 0px',
  className,
}: {
  children: React.ReactNode;
  rootMargin?: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || mounted) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setMounted(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [mounted, rootMargin]);

  return (
    <div ref={ref} className={className}>
      {mounted ? children : null}
    </div>
  );
}
