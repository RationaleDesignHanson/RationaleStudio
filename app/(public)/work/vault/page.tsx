import dynamic from 'next/dynamic';
import { UnlockGate } from '@/components/unlock/UnlockGate';

const VaultContent = dynamic(() =>
  import('./VaultContent').then((m) => m.VaultContent),
);

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
