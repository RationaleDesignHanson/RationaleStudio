/**
 * Athletes First Pitch Deck — gated vault route.
 *
 * Lives in the vault and follows the same rule as every other vault project:
 * behind the shared vault UnlockGate (scope "vault"), so the vault password
 * is the one and only key. No login, no per-project password.
 */

import { UnlockGate } from '@/components/unlock/UnlockGate';
import { AthletesFirstDeckClient } from './AthletesFirstDeckClient';

export default function AthletesFirstPitchDeckPage() {
  return (
    <UnlockGate
      scope="vault"
      project="vault"
      era="now"
      title="Athletes First"
      subtitle="NIL platform strategy pitch · 2024."
      meta="Confidential · 2024"
    >
      <AthletesFirstDeckClient />
    </UnlockGate>
  );
}
