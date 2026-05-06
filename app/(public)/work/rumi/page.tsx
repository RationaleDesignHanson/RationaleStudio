import { UnlockGate } from '@/components/unlock/UnlockGate';
import { RumiContent } from './RumiContent';

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
