'use client';

import React, { useMemo, useEffect, useState } from 'react';

interface DustTextProps {
  text: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div';
  className?: string;
  style?: React.CSSProperties;
  accentColor?: string;
  glowColor?: string;
  delay?: number; // ms
  stagger?: number; // ms por unidade
  mode?: 'chars' | 'words';
  active?: boolean;
}

/**
 * DustText — Efeito de Poeira e Partículas que se Aglutinam no Texto
 * Cada caractere/palavra inicia disperso no espaço tridimensional com blur de movimento
 * e brilho difuso, convergindo em gravidade cinematográfica até condensar no texto nítido.
 */
export function DustText({
  text,
  as: Component = 'span',
  className = '',
  style = {},
  delay = 0,
  stagger = 20,
  mode = 'chars',
  active = true,
}: DustTextProps) {
  const [assembled, setAssembled] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (active) {
      timer = setTimeout(() => {
        setAssembled(true);
      }, delay);
    } else {
      setAssembled(false);
    }
    return () => clearTimeout(timer);
  }, [active, delay]);

  // Pré-calcula sementes determinísticas para dispersão de poeira individual agrupando por palavras
  const tokens = useMemo(() => {
    if (mode === 'words') {
      const words = text.split(/(\s+)/);
      let wordIndex = 0;
      return words.map((token, tIdx) => {
        const isSpace = /^\s+$/.test(token);
        if (isSpace) {
          return {
            type: 'space' as const,
            key: `space-${tIdx}`,
            items: [],
          };
        }
        const wIdx = wordIndex++;
        const seed = (wIdx * 37) % 100;
        const dx = ((seed % 10) - 5) * 16;
        const dy = (Math.floor(seed / 10) - 5) * 14;
        const dz = ((seed % 7) - 3) * 35;
        const rot = ((seed % 8) - 4) * 6;
        return {
          type: 'word' as const,
          key: `word-${tIdx}-${token}`,
          items: [{ content: token, key: `${wIdx}-${token}`, dx, dy, dz, rot, index: wIdx }],
        };
      });
    }

    // Modo chars (padrão): preserva a contagem sequencial de caracteres mas agrupa palavras em whitespace-nowrap
    let charIndex = 0;
    const tokensList = text.split(/(\s+)/);
    return tokensList.map((token, tIdx) => {
      const isSpace = /^\s+$/.test(token);
      if (isSpace) {
        return {
          type: 'space' as const,
          key: `space-${tIdx}`,
          items: [],
        };
      }
      const chars = token.split('').map((char) => {
        const cIdx = charIndex++;
        const seed = (cIdx * 41 + 17) % 100;
        const dx = ((seed % 10) - 5) * 20;
        const dy = (Math.floor(seed / 10) - 5) * 16;
        const dz = ((seed % 7) - 3) * 50;
        const rot = ((seed % 8) - 4) * 10;
        return { content: char, key: `${cIdx}-${char}`, dx, dy, dz, rot, index: cIdx };
      });
      return {
        type: 'word' as const,
        key: `word-${tIdx}-${token}`,
        items: chars,
      };
    });
  }, [text, mode]);

  return (
    <Component
      className={`inline-block ${className}`}
      style={{
        perspective: '800px',
        ...style,
      }}
    >
      {tokens.map((token) => {
        if (token.type === 'space') {
          return (
            <span key={token.key} className="inline-block whitespace-pre">
              {' '}
            </span>
          );
        }

        return (
          <span key={token.key} className="inline-block whitespace-nowrap">
            {token.items.map((item) => {
              const itemDelay = assembled ? item.index * stagger : 0;

              return (
                <span
                  key={item.key}
                  className="inline-block transition-all will-change-transform"
                  style={{
                    opacity: assembled ? 1 : 0,
                    transform: assembled
                      ? 'translate3d(0, 0, 0) rotate(0deg) scale(1)'
                      : `translate3d(${item.dx * 0.4}px, ${item.dy * 0.4}px, ${item.dz * 0.4}px) rotate(${item.rot * 0.5}deg) scale(1.08)`,
                    filter: assembled ? 'none' : 'blur(4px)',
                    textShadow: '0 2px 16px rgba(0,0,0,0.95)',
                    transitionDuration: assembled ? '550ms' : '150ms',
                    transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                    transitionDelay: `${itemDelay}ms`,
                  }}
                >
                  {item.content}
                </span>
              );
            })}
          </span>
        );
      })}
    </Component>
  );
}
