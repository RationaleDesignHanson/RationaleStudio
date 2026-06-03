/**
 * Athletes First Pitch Deck — public vault route.
 *
 * Interactive, linear pitch deck for the Athletes First pilot program.
 * Moved out of /clients/* (Firebase RBAC + ClientAuthGuard) into the public
 * vault tree so it opens without a login, alongside the other ungated vault
 * projects. Linked from the Vault index. noindex via layout.tsx.
 */

'use client';

import dynamic from 'next/dynamic';

// Lazy load pitch deck (806 lines, client-side only).
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

export default function AthletesFirstPitchDeckPage() {
  return <AthletesFirstPitchDeck />;
}
