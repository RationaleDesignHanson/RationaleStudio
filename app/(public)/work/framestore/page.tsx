import { UnlockGate } from '@/components/unlock/UnlockGate';
import { FramestoreContent } from './FramestoreContent';

export default function FramestorePage() {
  return (
    <UnlockGate
      scope="framestore"
      project="maker"
      era="maker"
      title="Framestore VR Studio"
      subtitle="Creative Director · 2017. VR/AR pitch portfolio."
      meta="2017"
    >
      <FramestoreContent />
    </UnlockGate>
  );
}
