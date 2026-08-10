/**
 * Sidebar and canvas, replacing the seven-beat stepper.
 *
 * WHY THE STEPPER GOES. It was the right answer to a real measurement — 9.2
 * viewports, 56 buttons, one interaction pattern used eight times — and that
 * measurement was of a DOCUMENT. One decision per screen is how you make a long
 * argument readable.
 *
 * It is the wrong answer now, for a reason that only became true recently: the
 * artefact is live. Marks are drawn from type, colour is computed on real cloth,
 * artwork composites onto garments — all instant and all free. Once the thing
 * you are making can be on screen continuously, paging stops protecting you from
 * density and starts hiding the only thing worth looking at. You could not see
 * the line while changing its costs, which is precisely when you want to.
 *
 * So: controls on the left, the line on the right, everything live. The beats
 * survive as sections — almost no logic is thrown away, because the components
 * were already self-contained. What changes is that they are no longer alone.
 *
 * `config.step` still drives which section is open, so every share link written
 * under the stepper still opens where it meant to.
 */

'use client';

import { useLine } from '@/lib/blank/lineState';
import { BEATS, beatFor, clampStep } from './Stepper';
import { ChevronDown } from 'lucide-react';

export interface Section {
  /** Matches a BEATS `n`, so old share links keep resolving. */
  id: string;
  label: string;
  body: React.ReactNode;
}

export function BlankShell({ sections }: { sections: Section[] }) {
  const { config, set } = useLine();
  const openId = BEATS[clampStep(config.step)]?.n ?? sections[0]?.id;
  const open = sections.find((x) => x.id === openId) ?? sections[0];

  return (
    <div className="px-4 sm:px-6 md:px-8 pb-10">
      <div className="max-w-7xl mx-auto grid gap-6 lg:gap-10 lg:grid-cols-[minmax(0,14rem)_minmax(0,1fr)]">
        {/* NAV AND THE LINE. The sidebar was holding the controls as well, which
            squeezed a six-up grid of marks into 26rem and made every preview too
            small to judge — the exact thing a canvas is for. It is a nav and a
            thumbnail now; the work happens in the wide column. */}
        <div className="min-w-0">
          <nav className="lg:sticky lg:top-[6rem]">
            <ol className="mb-6">
              {sections.map((x) => {
                const on = x.id === openId;
                return (
                  <li key={x.id}>
                    <button
                      onClick={() => set('step', x.id)}
                      aria-current={on ? 'step' : undefined}
                      className="tap w-full text-left py-1.5 flex items-baseline gap-2.5"
                      style={{ display: 'flex', minHeight: 0 }}
                    >
                      <span
                        className="text-[11px] font-mono tracking-[0.2em] shrink-0"
                        style={{ color: on ? 'var(--accent)' : 'var(--era-ink-muted)' }}
                      >
                        {x.id}
                      </span>
                      <span
                        className="min-w-0 text-[13px]"
                        style={{ color: on ? 'var(--accent)' : 'var(--era-ink)' }}
                      >
                        {x.label}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>

          </nav>
        </div>

        {/* THE WORK, at full width. */}
        <div className="min-w-0">
          <h2 className="font-display mb-4" style={{ fontSize: '1.5rem', color: 'var(--era-ink)' }}>
            {open?.label}
          </h2>
          {open?.body}
        </div>
      </div>
    </div>
  );
}

/** The label a section shows, taken from the beat it replaces. */
export function sectionMeta(n: string, strategy: string): { label: string } {
  const raw = BEATS.find((b) => b.n === n);
  if (!raw) return { label: n };
  return { label: beatFor(raw, strategy).title };
}
