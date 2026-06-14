'use client';

import { useEffect, useRef, useState } from 'react';
import { Play, Pause } from 'lucide-react';

interface ReplayVideoProps {
  src: string;
  poster: string;
  className?: string;
  /** Accessible name for the video element itself. */
  label: string;
  /** Accessible label for the play/pause toggle. */
  toggleLabelPlay: string;
  toggleLabelPause: string;
}

function prefersReducedMotion() {
  if (typeof window === 'undefined' || !window.matchMedia) return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Autoplaying, looping demo clip with an accessible play/pause control.
 * - Honours prefers-reduced-motion: when reduced, it never autoplays.
 * - Only plays while on-screen (IntersectionObserver) so an off-screen clip
 *   doesn't burn battery/decode time — better for Core Web Vitals.
 */
export function ReplayVideo({
  src,
  poster,
  className = '',
  label,
  toggleLabelPlay,
  toggleLabelPause,
}: ReplayVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  // Lazy init so reduced-motion users never get a first-frame autoplay flash.
  const [reduced] = useState(prefersReducedMotion);
  const [playing, setPlaying] = useState(false);
  // True once the user manually pauses — suppresses observer-driven autoplay.
  const userPaused = useRef(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (reduced) {
      video.pause();
      return;
    }

    if (typeof IntersectionObserver === 'undefined') {
      video.play().then(() => setPlaying(true)).catch(() => {});
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !userPaused.current) {
            video.play().then(() => setPlaying(true)).catch(() => {});
          } else if (!entry.isIntersecting) {
            video.pause();
          }
        }
      },
      { threshold: 0.35 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [reduced]);

  const toggle = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      userPaused.current = false;
      video.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    } else {
      userPaused.current = true;
      video.pause();
      setPlaying(false);
    }
  };

  return (
    <>
      <video
        ref={videoRef}
        className={className}
        aria-label={label}
        autoPlay={false}
        muted
        loop
        playsInline
        preload="metadata"
        poster={poster}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      >
        <source src={src} type="video/mp4" />
      </video>

      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? toggleLabelPause : toggleLabelPlay}
        className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/55 text-white backdrop-blur-md transition-colors duration-300 hover:border-brand-blue/50 hover:bg-black/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue-bright focus-visible:ring-offset-2 focus-visible:ring-offset-black motion-reduce:transition-none"
      >
        {playing ? (
          <Pause size={18} aria-hidden="true" />
        ) : (
          <Play size={18} aria-hidden="true" className="translate-x-px" />
        )}
      </button>
    </>
  );
}
