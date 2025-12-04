/**
 * Athletes First Pitch Deck Page
 *
 * Interactive, linear pitch deck for Athletes First pilot program.
 * Protected by authentication - requires A1/halloffame credentials
 *
 * Route: /clients/athletes-first/pitch-deck
 */

import AthletesFirstPitchDeck from '@/components/athletes-first/AthletesFirstPitchDeck';
import { ClientAuthGuard } from '@/components/auth/ClientAuthGuard';

export default function AthletesFirstPitchDeckPage() {
  return (
    <ClientAuthGuard requiredClient="A1">
      <AthletesFirstPitchDeck />
    </ClientAuthGuard>
  );
}
