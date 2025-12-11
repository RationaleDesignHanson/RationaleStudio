/**
 * CREaiT Pitch Page
 *
 * Interactive pitch deck for CREaiT platform based on product roadmap.
 * Accessible after password authentication at /client/creait.
 * Uses presentation deck format similar to Athletes First.
 *
 * Performance: Lazy loaded (470 lines) - reduces initial bundle by ~5KB
 */

'use client';

import dynamic from 'next/dynamic';

// Lazy load pitch deck (470 lines, client-side only)
const CREaiTPitchDeck = dynamic(
  () => import('@/components/creait/CREaiTPitchDeck'),
  {
    loading: () => (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-pulse mb-4">
            <div className="w-16 h-16 border-4 border-terminal-gold/30 border-t-terminal-gold rounded-full animate-spin mx-auto" />
          </div>
          <p className="text-terminal-gold font-mono text-sm">Loading pitch...</p>
        </div>
      </div>
    ),
    ssr: false  // Client-side only (interactive diagrams)
  }
);

export default function CREaiTPitchPage() {
  return <CREaiTPitchDeck />;
}
