/**
 * HomeLab — layout experiment for the home-page chapters.
 *
 * Wraps the shared <WorkColumns> layout with a floating toggle so treatments
 * can be compared: A cards (blurbs, no masthead), B index (no blurbs), C
 * masthead (blurbs + masthead — the production default on the home page).
 */

'use client';

import { useState } from 'react';
import type { WorkEra } from '@/lib/content/eras';
import { WorkColumns } from '@/components/work/WorkColumns';

type VariantId = 'cards' | 'index' | 'masthead';

const VARIANTS: { id: VariantId; label: string }[] = [
  { id: 'cards', label: 'A · Cards' },
  { id: 'index', label: 'B · Index' },
  { id: 'masthead', label: 'C · Masthead' },
];

export function HomeLab({ eras }: { eras: WorkEra[] }) {
  const [variant, setVariant] = useState<VariantId>('masthead');

  return (
    <>
      <VariantToggle active={variant} onChange={setVariant} />
      <WorkColumns
        eras={eras}
        showMasthead={variant === 'masthead'}
        showBlurb={variant !== 'index'}
      />
    </>
  );
}

function VariantToggle({
  active,
  onChange,
}: {
  active: VariantId;
  onChange: (v: VariantId) => void;
}) {
  return (
    <div className="fixed bottom-5 left-1/2 z-50 flex -translate-x-1/2 items-center gap-1 rounded-full border border-hairline bg-paper/90 p-1 shadow-md backdrop-blur">
      <span className="px-2 font-mono text-[9px] uppercase tracking-[0.25em] text-ink-muted">
        Lab
      </span>
      {VARIANTS.map((v) => {
        const isActive = v.id === active;
        return (
          <button
            key={v.id}
            type="button"
            onClick={() => onChange(v.id)}
            aria-pressed={isActive}
            className={`rounded-full px-3 py-1 font-mono text-caption uppercase tracking-wider transition-colors ${
              isActive ? 'bg-ink text-paper' : 'text-ink-muted hover:text-ink'
            }`}
          >
            {v.label}
          </button>
        );
      })}
    </div>
  );
}
