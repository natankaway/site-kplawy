'use client';

import { useEffect, useRef, type ReactNode } from 'react';

/**
 * Subtle pointer-driven 3D tilt for the hero device mockup. Adds depth without a
 * full 3D scene. No-ops on touch/coarse pointers and when reduced motion is
 * requested. Uses rAF + CSS transition so it stays smooth and cheap.
 */
export function PhoneParallax({
  children,
  className = '',
  max = 6,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    let frame = 0;
    let tx = 0;
    let ty = 0;
    let cx = 0;
    let cy = 0;

    const apply = () => {
      cx += (tx - cx) * 0.12;
      cy += (ty - cy) * 0.12;
      el.style.transform = `perspective(1100px) rotateY(${cx.toFixed(2)}deg) rotateX(${cy.toFixed(2)}deg)`;
      if (Math.abs(tx - cx) > 0.01 || Math.abs(ty - cy) > 0.01) {
        frame = requestAnimationFrame(apply);
      } else {
        frame = 0;
      }
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(apply);
    };

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const nx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
      const ny = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
      tx = Math.max(-1, Math.min(1, nx)) * max;
      ty = Math.max(-1, Math.min(1, ny)) * -max;
      schedule();
    };
    const onLeave = () => {
      tx = 0;
      ty = 0;
      schedule();
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    el.addEventListener('pointerleave', onLeave);
    return () => {
      window.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [max]);

  return (
    <div ref={ref} className={className} style={{ willChange: 'transform' }}>
      {children}
    </div>
  );
}
