import { UnlockGate } from '@/components/unlock/UnlockGate';
import { VaultContent } from './VaultContent';

export default function VaultPage() {
  return (
    <UnlockGate
      scope="vault"
      project="vault"
      era="now"
      title="Vault"
      subtitle="Dead pitches and live ideas. Concepts that didn't ship, ventures in flight, side bets worth keeping warm."
      meta="Concepts"
    >
      <VaultContent />
    </UnlockGate>
  );
}
