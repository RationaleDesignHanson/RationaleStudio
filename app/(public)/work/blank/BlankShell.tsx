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
import { Check } from 'lucide-react';
import { nextAction, readiness } from '@/lib/blank/readiness';

export interface Section {
  /** Matches a BEATS `n`, so old share links keep resolving. */
  id: string;
  label: string;
  body: React.ReactNode;
}

export function BlankShell({ sections }: { sections: Section[] }) {
  const { config, set, isSet, skus } = useLine();
  const statuses = readiness(config, skus, isSet);
  const next = nextAction(statuses);
  const openId = BEATS[clampStep(config.step)]?.n ?? sections[0]?.id;
  const open = sections.find((x) => x.id === openId) ?? sections[0];

  return (
    <div className="pb-10">
      {/* NAVIGATION IS HORIZONTAL.
          It was a vertical list in a left column, which is a table of contents
          rather than a nav: it took a column of width on a wide screen and a
          screenful of height on a narrow one, on every single screen, to show
          seven items that never change. A strip costs one line, scrolls when it
          has to, and leaves the whole page to the work. */}
      <nav
        className="sticky top-0 z-30 border-b backdrop-blur"
        style={{
          borderColor: 'var(--era-hairline)',
          backgroundColor: 'color-mix(in srgb, var(--era-bg) 92%, transparent)',
        }}
      >
        <ol
          className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 flex gap-5 overflow-x-auto py-2.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          style={{ overscrollBehaviorX: 'contain' }}
        >
          {sections.map((x) => {
            const on = x.id === openId;
            const st = statuses.find((y) => y.id === x.id);
            const blocked = st?.state === 'blocked';
            return (
              <li key={x.id} className="shrink-0">
                <button
                  onClick={() => set('step', x.id)}
                  aria-current={on ? 'step' : undefined}
                  title={st?.note}
                  className="tap flex items-center gap-1.5 text-[12px] font-mono uppercase tracking-wider border-b-2 pb-0.5 transition-colors"
                  style={{
                    display: 'flex',
                    minHeight: 0,
                    borderColor: on ? 'var(--accent)' : 'transparent',
                    color: on ? 'var(--accent)' : blocked ? 'var(--era-ink-muted)' : 'var(--era-ink)',
                    opacity: blocked ? 0.5 : 1,
                  }}
                >
                  {/* Status as a dot, not a sentence. A strip has room for one
                      glyph and the note is on hover and beside the heading. */}
                  {st?.state === 'done' ? (
                    <Check className="w-3 h-3 shrink-0" />
                  ) : (
                    <span
                      className="shrink-0 rounded-full"
                      style={{
                        width: 5,
                        height: 5,
                        backgroundColor: blocked ? 'var(--era-hairline)' : 'var(--accent)',
                      }}
                    />
                  )}
                  <span style={{ opacity: 0.6 }}>{x.id}</span>
                  {x.label}
                </button>
              </li>
            );
          })}
        </ol>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 pt-6">
        <div className="flex flex-wrap items-baseline justify-between gap-3 mb-4">
          <h2 className="font-display" style={{ fontSize: '1.5rem', color: 'var(--era-ink)' }}>
            {open?.label}
            <span className="ml-3 text-[12px] font-mono" style={{ color: 'var(--era-ink-muted)' }}>
              {statuses.find((y) => y.id === openId)?.note}
            </span>
          </h2>
          {next && next.id !== openId && (
            <button
              onClick={() => set('step', next.id)}
              className="tap text-[12px] font-mono"
              style={{ color: 'var(--accent)', minHeight: 0 }}
            >
              Next: {next.note} →
            </button>
          )}
        </div>
        {open?.body}
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
