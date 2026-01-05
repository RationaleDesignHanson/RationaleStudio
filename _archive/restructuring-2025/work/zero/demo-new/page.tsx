/**
 * Zero Sequence Demo - Test Page
 * Testing the new React implementation
 */

import { ZeroSequenceDemo } from '@/components/zero-sequence';

export const metadata = {
  title: 'Zero Sequence Demo (New) | Rationale',
  description: 'AI-powered email intent classification with modal flow analysis - React implementation',
};

export default function ZeroSequenceDemoPage() {
  return (
    <main className="min-h-screen">
      <ZeroSequenceDemo />
    </main>
  );
}
