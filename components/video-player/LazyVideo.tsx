'use client';

import { useEffect, useRef, useState } from 'react';

interface LazyVideoProps {
  src: string;
  className?: string;
  /** Poster shown before load. Defaults to the sibling `<name>.poster.jpg`. */
  poster?: string;
  /** Show native controls (click-to-play) instead of decorative autoplay-loop. */
  controls?: boolean;
  loop?: boolean;
}

/**
 * LazyVideo — defers the video download until it's near the viewport, so a page
 * full of clips doesn't pull tens of MB on first paint. Decorative clips (the
 * default) autoplay muted once loaded; `controls` clips wait for the user.
 * A poster paints instantly and reserves layout (no CLS).
 */
export function LazyVideo({ src, className = '', poster, controls = false, loop = true }: LazyVideoProps) {
  const ref = useRef<HTMLVideoElement | null>(null);
  const [load, setLoad] = useState(false);
  const posterSrc = poster ?? src.replace(/\.mp4$/, '.poster.jpg');

  useEffect(() => {
    if (load) return;
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setLoad(true);
          io.disconnect();
        }
      },
      { rootMargin: '300px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [load]);

  return (
    <video
      ref={ref}
      src={load ? src : undefined}
      poster={posterSrc}
      className={className}
      muted
      playsInline
      loop={loop}
      controls={controls}
      preload="none"
      autoPlay={!controls && load}
      onLoadedData={(e) => {
        if (!controls) void e.currentTarget.play().catch(() => {});
      }}
    />
  );
}
