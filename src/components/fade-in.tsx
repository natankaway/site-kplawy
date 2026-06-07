'use client';

import {
  Children,
  isValidElement,
  cloneElement,
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type ReactElement,
} from 'react';

function prefersReducedMotion() {
  if (typeof window === 'undefined' || !window.matchMedia) return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * useReveal — flips `shown` to true once the element scrolls into view.
 * Reveals once (never re-hides). Respects reduced motion and missing
 * IntersectionObserver by showing immediately.
 *
 * SSR-safe: `shown` starts false but the rendered markup defaults to fully
 * visible (see the `reveal-*` CSS), and we only opt into the hidden state on
 * the client after mount. If JS never runs, content stays visible.
 */
function useReveal<T extends HTMLElement>(rootMargin = '-50px') {
  const ref = useRef<T>(null);
  const [shown, setShown] = useState(false);
  // Tracks whether the client effect has run; until then we render in the
  // "visible" fallback state so no-JS / pre-hydration content isn't hidden.
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const node = ref.current;
    if (!node) return;

    if (prefersReducedMotion() || typeof IntersectionObserver === 'undefined') {
      setShown(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShown(true);
            observer.disconnect();
            break;
          }
        }
      },
      { rootMargin },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [rootMargin]);

  // Before mount: visible (fallback). After mount: hidden until revealed.
  const dataShown = !mounted || shown;
  return { ref, dataShown };
}

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  className?: string;
  once?: boolean;
}

export function FadeIn({ children, delay = 0, className = '' }: FadeInProps) {
  const { ref, dataShown } = useReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      data-reveal
      data-shown={dataShown ? 'true' : 'false'}
      style={{ transitionDelay: `${delay}s` }}
      className={className}
    >
      {children}
    </div>
  );
}

interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
}

export function StaggerContainer({
  children,
  className = '',
  staggerDelay = 0.1,
}: StaggerContainerProps) {
  const { ref, dataShown } = useReveal<HTMLDivElement>();

  // Cascade the reveal: give each StaggerItem an incremental transitionDelay,
  // mirroring framer-motion's staggerChildren.
  let order = 0;
  const enhanced = Children.map(children, (child) => {
    if (isValidElement(child) && child.type === StaggerItem) {
      const el = child as ReactElement<StaggerItemProps>;
      const delay = order * staggerDelay;
      order += 1;
      return cloneElement(el, { _delay: delay });
    }
    return child;
  });

  return (
    <div
      ref={ref}
      data-reveal-group
      data-shown={dataShown ? 'true' : 'false'}
      className={className}
    >
      {enhanced}
    </div>
  );
}

interface StaggerItemProps {
  children: ReactNode;
  className?: string;
  /** Internal: injected by StaggerContainer to cascade the reveal. */
  _delay?: number;
}

export function StaggerItem({ children, className = '', _delay = 0 }: StaggerItemProps) {
  return (
    <div
      data-reveal-item
      style={{ transitionDelay: `${_delay}s` }}
      className={className}
    >
      {children}
    </div>
  );
}
