import { UnlockGateSkeleton } from '@/components/unlock/UnlockGateSkeleton';

export default function VaultLoading() {
  return (
    <UnlockGateSkeleton
      project="vault"
      era="now"
      title="Vault"
      subtitle="Dead pitches and live ideas. Concepts that didn't ship, ventures in flight, side bets worth keeping warm."
      meta="Concepts"
    />
  );
}
