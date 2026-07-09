/**
 * VideoPlayer — Option 3 + category cycling.
 *
 * Floating monolith: zero chrome, just a video and a thin progress bar.
 * Tap/click anywhere on the video → cycle to the NEXT category, starting
 * at its first clip. When the current clip ends, we advance to the NEXT
 * clip in the SAME category, in order, wrapping at the end.
 *
 * The category indicator is the only visible UI — top-right of the
 * frame, mono caps, era-accent. Subtle. Tells you which crate you're
 * pulling from without looking like a control panel.
 */

'use client';

import { useEffect, useRef, useState } from 'react';
import { videoUrl } from '@/lib/media';

export interface Playlist {
  /** Display name shown in the corner. e.g. "ALL", "BRAND IDS". */
  name: string;
  /** Video filenames (relative to basePath, e.g. "viacom_logo.mp4"). */
  videos: string[];
}

interface Props {
  /** Path prefix, e.g. "/videos/viacom-screens". No trailing slash. */
  basePath: string;
  /** Ordered list of playlists. The first one plays on mount. */
  playlists: Playlist[];
  /** Aspect ratio CSS — defaults to 16/9. */
  aspectRatio?: string;
  className?: string;
}

export function VideoPlayer({ basePath, playlists, aspectRatio = '16/9', className = '' }: Props) {
  const [playlistIdx, setPlaylistIdx] = useState(0);
  // Sequential position within the current category. Starts at 0 so the first
  // render is deterministic — SSR and client hydration agree, which keeps the
  // subtree hydrated so autoplay + click handlers fire.
  const [videoIdx, setVideoIdx] = useState(0);
  const [progress, setProgress] = useState(0);
  const [flash, setFlash] = useState(false);
  const ref = useRef<HTMLVideoElement | null>(null);
  const mounted = useRef(false);

  const list = playlists[playlistIdx];
  const video = list?.videos[videoIdx] ?? '';

  // Signal-lock flash on category change — but not on the initial mount.
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    setFlash(true);
    const t = window.setTimeout(() => setFlash(false), 80);
    return () => window.clearTimeout(t);
  }, [playlistIdx]);

  const advanceCategory = () => {
    setPlaylistIdx((i) => (i + 1) % playlists.length);
    setVideoIdx(0);
    setProgress(0);
  };

  // When the current clip ends, play the next clip in the category, in order.
  const handleEnded = () => {
    if (!list || list.videos.length === 0) return;
    setVideoIdx((i) => (i + 1) % list.videos.length);
    setProgress(0);
  };

  const handleTimeUpdate = () => {
    const v = ref.current;
    if (!v || !v.duration || !Number.isFinite(v.duration)) return;
    setProgress(v.currentTime / v.duration);
  };

  if (!list || !video) return null;

  return (
    <div
      className={`relative w-full select-none cursor-pointer group ${className}`}
      style={{ aspectRatio }}
      onClick={advanceCategory}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          advanceCategory();
        }
      }}
      aria-label={`Video player. Currently playing from ${list.name}. Click to cycle to next category.`}
    >
      <video
        ref={ref}
        key={`${list.name}/${videoIdx}`}
        src={videoUrl(`${basePath}/${video}`)}
        autoPlay
        muted
        playsInline
        onEnded={handleEnded}
        onTimeUpdate={handleTimeUpdate}
        onLoadedData={(e) => {
          // Belt-and-suspenders: the `autoPlay` attribute alone doesn't always
          // fire when React swaps `src` on a remount. Kick playback explicitly;
          // it's muted so browser autoplay policy allows it.
          const v = e.currentTarget;
          v.muted = true;
          void v.play().catch(() => {});
        }}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Brief signal-lock flash on category change */}
      {flash && (
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{ backgroundColor: 'rgba(255,255,255,0.18)' }}
        />
      )}

      {/* Category indicator — tiny mono caps, era-accent, top-right.
          Visible always; gets a touch brighter on hover so it reads
          as the affordance to click. */}
      <div className="absolute top-3 right-3 md:top-4 md:right-4 flex items-baseline gap-2 pointer-events-none">
        <span
          className="font-mono text-[9px] md:text-[10px] tracking-[0.3em] uppercase opacity-70 group-hover:opacity-100 transition-opacity"
          style={{ color: 'var(--era-accent, currentColor)' }}
        >
          {list.name}
        </span>
        <span
          className="font-mono text-[9px] md:text-[10px] tracking-[0.3em] uppercase opacity-30 group-hover:opacity-60 transition-opacity"
          style={{ color: 'var(--era-ink-muted, currentColor)' }}
        >
          {String(playlistIdx + 1).padStart(2, '0')}/{String(playlists.length).padStart(2, '0')}
        </span>
      </div>

      {/* Tiny "next category" hint — bottom-left, only on hover */}
      <div className="absolute bottom-3 left-3 md:bottom-4 md:left-4 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        <span
          className="font-mono text-[9px] md:text-[10px] tracking-[0.3em] uppercase"
          style={{ color: 'var(--era-ink-muted, currentColor)' }}
        >
          ▸ click to cycle
        </span>
      </div>

      {/* Progress bar — full-width strip pinned to bottom edge of the
          frame, era-accent fill tracking clip position. 1.5px tall. */}
      <div
        aria-hidden
        className="absolute left-0 right-0 bottom-0 pointer-events-none"
        style={{ height: '1.5px', backgroundColor: 'rgba(255,255,255,0.12)' }}
      >
        <div
          className="h-full origin-left"
          style={{
            width: `${Math.min(100, progress * 100)}%`,
            backgroundColor: 'var(--era-accent, currentColor)',
            transition: 'width 100ms linear',
          }}
        />
      </div>
    </div>
  );
}
