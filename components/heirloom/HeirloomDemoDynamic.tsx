'use client';

import dynamic from 'next/dynamic';

const HeirloomDemo = dynamic(() => import('./HeirloomDemo'), {
  ssr: false,
  loading: () => (
    <div className="min-h-[520px] md:min-h-[600px] flex items-center justify-center p-12 text-center text-sm font-mono text-[var(--era-ink-muted)]">
      loading demo&hellip;
    </div>
  ),
});

export function HeirloomDemoDynamic() {
  return <HeirloomDemo />;
}
