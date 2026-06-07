'use client';

import { useEffect, useRef, useState } from 'react';
import { Play, Pause } from 'lucide-react';

interface ReplayVideoProps {
  src: string;
  poster: string;
  className?: string;
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
 * Honours prefers-reduced-motion: when reduced, it does NOT autoplay —
 * it shows the poster and waits for the user to press play.
 */
export function ReplayVideo({
  src,
  poster,
  className = '',
  toggleLabelPlay,
  toggleLabelPause,
}: ReplayVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [reduced, setReduced] = useState(false);
  // Whether the clip is currently playing. Initialised on mount based on
  // reduced-motion: autoplay on (true) unless the user prefers reduced motion.
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const wantsReduced = prefersReducedMotion();
    setReduced(wantsReduced);
    const video = videoRef.current;
    if (!video) return;

    if (wantsReduced) {
      video.pause();
      setPlaying(false);
    } else {
      // Attempt autoplay (muted autoplay is permitted by browsers).
      const p = video.play();
      if (p && typeof p.then === 'function') {
        p.then(() => setPlaying(true)).catch(() => setPlaying(false));
      } else {
        setPlaying(true);
      }
    }
  }, []);

  const toggle = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      const p = video.play();
      if (p && typeof p.then === 'function') {
        p.then(() => setPlaying(true)).catch(() => setPlaying(false));
      } else {
        setPlaying(true);
      }
    } else {
      video.pause();
      setPlaying(false);
    }
  };

  return (
    <>
      <video
        ref={videoRef}
        className={className}
        // Autoplay is driven imperatively in the effect so we can respect
        // reduced motion; we still hint the browser via muted + playsInline.
        autoPlay={!reduced}
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
        className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/55 text-white backdrop-blur-md transition-all duration-300 hover:border-brand-blue/50 hover:bg-black/70 focus-visible:border-brand-blue-bright"
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
