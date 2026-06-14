'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';

/**
 * Lenis smooth-scroll — a refined, premium scroll feel.
 * Fully disabled when the user prefers reduced motion (native scroll only),
 * so it never fights accessibility settings.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReduced) return;

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
    });

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  return null;
}
