import dynamic from 'next/dynamic';
import { UnlockGate } from '@/components/unlock/UnlockGate';

// Slide deck is heavy (diagrams, ASCII grid, dynamic imports of its own)
// — keep it off the locked-state bundle.
const SanitaryWasteDeck = dynamic(() =>
  import('@/components/sanitary-waste-system/SanitaryWasteDeck'),
);

export default function NimbusDeckPage() {
  return (
    <UnlockGate
      scope="vault"
      project="nimbus"
      era="now"
      title="Nimbus · Deck"
      subtitle="Material spec, dispenser format, IP strategy, manufacturing plan, retail beta. The investor / partner walkthrough."
      meta="Concepts · in flight"
    >
      <SanitaryWasteDeck />
    </UnlockGate>
  );
}
