'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';

// The WebGL scene is a separate client chunk, loaded only after mount — it never
// touches SSR and never blocks the hero's LCP (the headline text).
const BufferRingScene = dynamic(() => import('./buffer-ring-scene'), {
  ssr: false,
});

/** Static, dependency-free ring of segments — the reduced-motion / pre-mount
 *  fallback so the buffer-ring signature is present even without WebGL/motion. */
function StaticRing() {
  const segments = 60;
  const cx = 100;
  const cy = 100;
  const r = 82;
  return (
    <svg
      viewBox="0 0 200 200"
      className="h-full w-full"
      aria-hidden="true"
      style={{ filter: 'drop-shadow(0 0 10px rgba(46,123,255,0.35))' }}
    >
      {Array.from({ length: segments }).map((_, i) => {
        const a = (i / segments) * Math.PI * 2;
        const x1 = cx + Math.cos(a) * r;
        const y1 = cy + Math.sin(a) * r;
        const x2 = cx + Math.cos(a) * (r + 7);
        const y2 = cy + Math.sin(a) * (r + 7);
        // a few segments brighter to hint the "head"
        const lead = i > segments - 8;
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke={lead ? '#9FC4FF' : '#2E7BFF'}
            strokeWidth={2}
            strokeLinecap="round"
            opacity={lead ? 0.95 : 0.45}
          />
        );
      })}
    </svg>
  );
}

/**
 * Hero buffer ring. Always renders the static ring; upgrades to the animated
 * WebGL ring when motion is allowed, Save-Data is off, and the hero is on
 * screen (pauses when scrolled away). LCP is never the canvas.
 */
export function HeroBufferRing() {
  const ref = useRef<HTMLDivElement>(null);
  const [live, setLive] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const conn = (
      navigator as Navigator & { connection?: { saveData?: boolean } }
    ).connection;
    if (conn?.saveData) return;

    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setLive(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) setLive(entry.isIntersecting);
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
      <div className="relative aspect-square w-[155%]">
        {/* Static base ring (also the reduced-motion experience) */}
        <div
          className={`absolute inset-0 transition-opacity duration-700 ${
            live ? 'opacity-0' : 'opacity-60'
          }`}
        >
          <StaticRing />
        </div>
        {/* Animated WebGL ring */}
        {live ? (
          <div className="absolute inset-0 opacity-90">
            <BufferRingScene />
          </div>
        ) : null}
      </div>
    </div>
  );
}
