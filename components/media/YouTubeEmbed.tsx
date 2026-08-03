'use client';

import { useState } from 'react';
import { Play } from 'lucide-react';

interface YouTubeEmbedProps {
  videoId: string;
  title: string;
  className?: string;
}

/**
 * YouTube facade — loads the heavy YouTube player only when the user clicks.
 * The initial render is a lightweight thumbnail + play button, avoiding
 * ~900 KB of third-party script/css on first paint.
 */
export function YouTubeEmbed({ videoId, title, className = '' }: YouTubeEmbedProps) {
  const [load, setLoad] = useState(false);
  const posterUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  if (load) {
    return (
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?rel=0&autoplay=1`}
        title={title}
        className={`w-full h-full ${className}`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setLoad(true)}
      aria-label={`Play video: ${title}`}
      className={`group relative block w-full h-full overflow-hidden bg-black ${className}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={posterUrl}
        alt={title}
        width={640}
        height={360}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        onError={(e) => {
          // Fallback to standard quality if maxres is missing.
          (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${videoId}/sddefault.jpg`;
        }}
      />
      <span className="absolute inset-0 flex items-center justify-center bg-black/20 transition-colors group-hover:bg-black/30">
        <span className="flex items-center justify-center w-16 h-10 md:w-20 md:h-12 rounded-lg bg-red-600 text-white shadow-lg transition-transform group-hover:scale-105">
          <Play className="w-5 h-5 md:w-6 md:h-6 fill-current" aria-hidden />
        </span>
      </span>
    </button>
  );
}
