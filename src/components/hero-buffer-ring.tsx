'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';

// The WebGL scene is a separate client chunk, loaded only after mount — it never
// touches SSR and never blocks the hero's LCP (the headline text).
const BufferRingScene = dynamic(() => import('./buffer-ring-scene'), {
  ssr: false,
});

/**
 * Progressive-enhancement wrapper for the hero buffer ring.
 * Renders the WebGL scene only when:
 *  - the user does NOT prefer reduced motion,
 *  - Save-Data is off,
 *  - and the hero is actually in the viewport (pauses when scrolled away).
 * Otherwise renders nothing — the hero looks complete without it.
 */
export function HeroBufferRing() {
  const ref = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const conn = (
      navigator as Navigator & { connection?: { saveData?: boolean } }
    ).connection;
    if (conn?.saveData) return;

    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setEnabled(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) setEnabled(entry.isIntersecting);
      },
      { threshold: 0 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-[5] flex items-center justify-center"
    >
      {enabled ? (
        <div className="aspect-square w-[155%] opacity-75">
          <BufferRingScene />
        </div>
      ) : null}
    </div>
  );
}
