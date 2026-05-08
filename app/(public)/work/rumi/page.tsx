import dynamic from 'next/dynamic';
import { UnlockGate } from '@/components/unlock/UnlockGate';

const RumiContent = dynamic(() =>
  import('./RumiContent').then((m) => m.RumiContent),
);

export default function RumiPage() {
  return (
    <UnlockGate
      scope="rumi"
      project="rumi"
      era="now"
      title="Rumi"
      subtitle="Design engine for an AI media companion startup. 2024 · Head of Design."
      meta="2024"
    >
      <RumiContent />
    </UnlockGate>
  );
}
