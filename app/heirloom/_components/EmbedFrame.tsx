/**
 * EmbedFrame Component
 *
 * Wrapper for embedding external content (Notion, Looker Studio, etc.)
 * with loading states and error handling.
 */

'use client';

import { useState } from 'react';
import { Loader2 } from 'lucide-react';

interface EmbedFrameProps {
  src: string;
  title: string;
  height?: string;
  className?: string;
}

export function EmbedFrame({
  src,
  title,
  height = '800px',
  className = '',
}: EmbedFrameProps) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className={`relative w-full ${className}`} style={{ height }}>
      {/* Loading state */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-2" />
            <p className="text-sm text-gray-600">Loading {title}...</p>
          </div>
        </div>
      )}

      {/* Iframe */}
      <iframe
        src={src}
        title={title}
        className="w-full h-full border border-gray-200 rounded-lg"
        onLoad={() => setIsLoading(false)}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
      />
    </div>
  );
}
