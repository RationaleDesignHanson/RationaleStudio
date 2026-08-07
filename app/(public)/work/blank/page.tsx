import dynamic from 'next/dynamic';
import { UnlockGate } from '@/components/unlock/UnlockGate';

const BlankContent = dynamic(() => import('./BlankContent').then((m) => m.BlankContent));

export default function BlankPage() {
  return (
    <UnlockGate
      scope="blank"
      project="blank"
      era="now"
      title="Blank"
      subtitle="A streetwear line planned end-to-end by an image pipeline and an agent fleet — including the review that argued against it."
      meta="Concepts · in flight"
    >
      <BlankContent />
    </UnlockGate>
  );
}
