'use client';

import dynamic from 'next/dynamic';

// Lazy load pitch deck (806 lines, client-side only). ssr:false requires a
// client boundary, so this wrapper sits inside the server-rendered UnlockGate.
const AthletesFirstPitchDeck = dynamic(
  () => import('@/components/athletes-first/AthletesFirstPitchDeck'),
  {
    loading: () => (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-pulse mb-4">
            <div className="w-16 h-16 border-4 border-terminal-gold/30 border-t-terminal-gold rounded-full animate-spin mx-auto" />
          </div>
          <p className="text-terminal-gold font-mono text-sm">Loading pitch deck...</p>
        </div>
      </div>
    ),
    ssr: false  // Client-side only (interactive demos)
  }
);

export function AthletesFirstDeckClient() {
  return <AthletesFirstPitchDeck />;
}
