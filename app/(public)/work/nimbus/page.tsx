import dynamic from 'next/dynamic';
import { UnlockGate } from '@/components/unlock/UnlockGate';

const NimbusContent = dynamic(() =>
  import('./NimbusContent').then((m) => m.NimbusContent),
);

export default function NimbusPage() {
  return (
    <UnlockGate
      scope="nimbus"
      project="nimbus"
      era="now"
      title="Nimbus"
      subtitle="Sanitary-waste system venture. Hardware + software, household source-separation. In concept-prototype."
      meta="Concepts · in flight"
    >
      <NimbusContent />
    </UnlockGate>
  );
}
