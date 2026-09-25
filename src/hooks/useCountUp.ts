'use client';

import { useEffect, useRef, useState } from 'react';

interface UseCountUpOptions {
  end: number;
  duration?: number;
  delay?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  startOnMount?: boolean;
}

/**
 * Animated counter que interpola de 0 até o valor alvo usando requestAnimationFrame.
 * Easing: easeOutExpo pra ficar suave e premium.
 */
export function useCountUp(options: UseCountUpOptions) {
  const {
    end,
    duration = 2000,
    delay = 0,
    prefix = '',
    suffix = '',
    decimals = 0,
    startOnMount = false,
  } = options;

  const [displayValue, setDisplayValue] = useState(startOnMount ? 0 : end);
  const [hasStarted, setHasStarted] = useState(false);
  const rafRef = useRef<number | null>(null);

  const start = () => {
    if (hasStarted) return;
    setHasStarted(true);

    const startTime = performance.now() + delay;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;

      if (elapsed < 0) {
        rafRef.current = requestAnimationFrame(animate);
        return;
      }

      const progress = Math.min(elapsed / duration, 1);
      // easeOutExpo: rápido no início, desacelera elegantemente
      const easedProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const currentValue = easedProgress * end;

      setDisplayValue(currentValue);

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };

    rafRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  const formattedValue = `${prefix}${displayValue.toFixed(decimals)}${suffix}`;

  return { formattedValue, start, displayValue, hasStarted };
}
