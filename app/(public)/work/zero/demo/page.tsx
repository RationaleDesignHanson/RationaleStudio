/**
 * Zero Sequence Demo Page
 * Live demo of AI-powered email intent classification
 */

import { ZeroSequenceDemo } from '@/components/zero-sequence';

export const metadata = {
  title: 'Zero Sequence Live Demo | Rationale',
  description: 'AI-powered email intent classification with modal flow analysis',
};

export default function ZeroSequenceDemoPage() {
  return (
    <main className="min-h-screen">
      <ZeroSequenceDemo />
    </main>
  );
}
