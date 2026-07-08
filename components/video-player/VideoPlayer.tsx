/**
 * VideoPlayer — Option 3 + category cycling.
 *
 * Floating monolith: zero chrome, just a video and a thin progress bar.
 * Tap/click anywhere on the video → cycle to the NEXT category, play
 * a random clip from it. When the current clip ends, we pick another
 * random clip from the SAME category and roll on.
 *
 * The category indicator is the only visible UI — top-right of the
 * frame, mono caps, era-accent. Subtle. Tells you which crate you're
 * pulling from without looking like a control panel.
 */

'use client';

import { useEffect, useRef, useState } from 'react';

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

function pickRandom<T>(arr: T[], avoid?: T): T {
  if (arr.length === 0) throw new Error('VideoPlayer: empty playlist');
  if (arr.length === 1) return arr[0];
  let pick: T;
  // Try a couple times to avoid replaying the same clip back-to-back.
  for (let i = 0; i < 6; i++) {
    pick = arr[Math.floor(Math.random() * arr.length)];
    if (pick !== avoid) return pick;
  }
  return arr[Math.floor(Math.random() * arr.length)];
}

export function VideoPlayer({ basePath, playlists, aspectRatio = '16/9', className = '' }: Props) {
  const [playlistIdx, setPlaylistIdx] = useState(0);
  // Deterministic first render so SSR and client hydration agree — picking a
  // random clip here would mismatch (Math.random differs per environment) and
  // React would leave the subtree un-hydrated, so autoplay + click never fire.
  // The random pick happens on mount in the effect below.
  const [video, setVideo] = useState<string>(() => playlists[0]?.videos[0] ?? '');
  const [progress, setProgress] = useState(0);
  const [flash, setFlash] = useState(false);
  const ref = useRef<HTMLVideoElement | null>(null);
  const mounted = useRef(false);

  const list = playlists[playlistIdx];

  // Pick a fresh random clip: once on mount (client-only), then whenever the
  // category changes. Flash only on real category changes, not on mount.
  useEffect(() => {
    if (!list || list.videos.length === 0) return;
    setVideo((prev) => pickRandom(list.videos, prev));
    setProgress(0);
    if (mounted.current) {
      setFlash(true);
      const t = window.setTimeout(() => setFlash(false), 80);
      return () => window.clearTimeout(t);
    }
    mounted.current = true;
  }, [playlistIdx, list]);

  const advanceCategory = () => {
    setPlaylistIdx((i) => (i + 1) % playlists.length);
  };

  const handleEnded = () => {
    if (!list) return;
    setVideo((prev) => pickRandom(list.videos, prev));
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
        key={`${list.name}/${video}`}
        src={`${basePath}/${video}`}
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
