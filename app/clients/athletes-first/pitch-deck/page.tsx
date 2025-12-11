/**
 * Athletes First Pitch Deck Page
 *
 * Interactive, linear pitch deck for Athletes First pilot program.
 * Protected by authentication - requires A1/halloffame credentials
 *
 * Route: /clients/athletes-first/pitch-deck
 *
 * Performance: Lazy loaded (806 lines) - reduces initial bundle by ~8KB
 */

'use client';

import dynamic from 'next/dynamic';
import { ClientAuthGuard } from '@/components/auth/ClientAuthGuard';

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
          <p className="text-terminal-gold font-mono text-sm">Loading pitch deck...</p>
        </div>
      </div>
    ),
    ssr: false  // Client-side only (interactive demos)
  }
);

export default function AthletesFirstPitchDeckPage() {
  return (
    <ClientAuthGuard requiredClient="A1">
      <AthletesFirstPitchDeck />
    </ClientAuthGuard>
  );
}
