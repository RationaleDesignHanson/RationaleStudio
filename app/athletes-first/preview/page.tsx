/**
 * Athletes First Preview Page
 *
 * Comprehensive interactive presentation for Athletes First.
 * This is the WIP/staging version where we build the final experience.
 *
 * Includes:
 * - 12 interactive demos
 * - Vision Pro integration
 * - 16 professional diagrams
 * - Full strategic narrative
 *
 * Route: /athletes-first/preview
 *
 * Performance: Lazy loaded (806 lines) - reduces initial bundle by ~8KB
 */

'use client';

import dynamic from 'next/dynamic';

// Lazy load pitch deck (806 lines, client-side only)
const AthletesFirstPitchDeck = dynamic(
  () => import('@/components/athletes-first/AthletesFirstPitchDeck'),
  {
    loading: () => (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-pulse mb-4">
            <div className="w-16 h-16 border-4 border-terminal-gold/30 border-t-terminal-gold rounded-full animate-spin mx-auto" />
          </div>
          <p className="text-terminal-gold font-mono text-sm">Loading preview...</p>
        </div>
      </div>
    ),
    ssr: false  // Client-side only (interactive demos)
  }
);

export default function AthletesFirstPreviewPage() {
  return <AthletesFirstPitchDeck />;
}
