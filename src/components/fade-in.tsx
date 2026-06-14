'use client';

import {
  Children,
  isValidElement,
  cloneElement,
  createElement,
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type ReactElement,
  type ElementType,
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
  const [mounted, setMounted] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setMounted(true);
    setReduced(prefersReducedMotion());
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
  return { ref, dataShown, reduced };
}

/** Cap the cascade so late items never feel laggy. */
const MAX_STAGGER = 0.4;

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  /** Element tag to render (default div). */
  as?: ElementType;
}

export function FadeIn({ children, delay = 0, className = '', as = 'div' }: FadeInProps) {
  const { ref, dataShown, reduced } = useReveal<HTMLElement>();

  return createElement(
    as,
    {
      ref,
      'data-reveal': '',
      'data-shown': dataShown ? 'true' : 'false',
      style: { transitionDelay: reduced ? '0s' : `${delay}s` },
      className,
    },
    children,
  );
}

interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  as?: ElementType;
}

export function StaggerContainer({
  children,
  className = '',
  staggerDelay = 0.1,
  as = 'div',
}: StaggerContainerProps) {
  const { ref, dataShown, reduced } = useReveal<HTMLElement>();

  let order = 0;
  const enhanced = Children.map(children, (child) => {
    if (isValidElement(child) && child.type === StaggerItem) {
      const el = child as ReactElement<StaggerItemProps>;
      const delay = reduced ? 0 : Math.min(order * staggerDelay, MAX_STAGGER);
      order += 1;
      return cloneElement(el, { _delay: delay });
    }
    return child;
  });

  return createElement(
    as,
    {
      ref,
      'data-reveal-group': '',
      'data-shown': dataShown ? 'true' : 'false',
      className,
    },
    enhanced,
  );
}

interface StaggerItemProps {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  /** Internal: injected by StaggerContainer to cascade the reveal. */
  _delay?: number;
}

export function StaggerItem({
  children,
  className = '',
  as = 'div',
  _delay = 0,
}: StaggerItemProps) {
  return createElement(
    as,
    {
      'data-reveal-item': '',
      style: { transitionDelay: `${_delay}s` },
      className,
    },
    children,
  );
}
