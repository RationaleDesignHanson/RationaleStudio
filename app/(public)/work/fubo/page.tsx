import dynamic from 'next/dynamic';
import { UnlockGate } from '@/components/unlock/UnlockGate';

const FuboContent = dynamic(() =>
  import('./FuboContent').then((m) => m.FuboContent),
);

export default function FuboPage() {
  return (
    <UnlockGate
      scope="fubo"
      project="fubo"
      era="now"
      title="Fubo"
      subtitle="VP of Design at a streaming entertainment platform · 2025–26."
      meta="2025–26"
    >
      <FuboContent />
    </UnlockGate>
  );
}
