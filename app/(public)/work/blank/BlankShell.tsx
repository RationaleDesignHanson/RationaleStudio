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
import { LineCanvas } from './LineCanvas';
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

  return (
    <div className="px-4 sm:px-6 md:px-8 pb-10">
      <div
        className="max-w-7xl mx-auto grid gap-6 lg:gap-10"
        style={{ gridTemplateColumns: 'minmax(0, 1fr)' }}
      >
        <div className="grid gap-6 lg:gap-10 lg:grid-cols-[minmax(0,26rem)_minmax(0,1fr)]">
          {/* CONTROLS. Accordion rather than tabs: on a phone this is the whole
              page, and a tab strip of seven would scroll off either edge. */}
          <div className="min-w-0">
            {sections.map((s) => {
              const open = s.id === openId;
              return (
                <section
                  key={s.id}
                  className="border-b"
                  style={{ borderColor: 'var(--era-hairline)' }}
                >
                  <h2>
                    <button
                      onClick={() => set('step', open ? '' : s.id)}
                      aria-expanded={open}
                      className="tap w-full text-left py-3 flex items-baseline gap-3"
                      style={{ display: 'flex', minHeight: 0 }}
                    >
                      <span
                        className="text-[11px] font-mono tracking-[0.2em] shrink-0"
                        style={{ color: open ? 'var(--accent)' : 'var(--era-ink-muted)' }}
                      >
                        {s.id}
                      </span>
                      {/* Label only. The hints were a sentence of subtext under
                          every closed section — "the line, specced style by
                          style, setup is charged once…" — which is an essay in a
                          nav. If a label needs a sentence to explain it, the
                          label is wrong. */}
                      <span
                        className="min-w-0 flex-1 font-display"
                        style={{ fontSize: '1.05rem', color: open ? 'var(--accent)' : 'var(--era-ink)' }}
                      >
                        {s.label}
                      </span>
                      <ChevronDown
                        className="w-4 h-4 shrink-0 transition-transform"
                        style={{
                          color: 'var(--era-ink-muted)',
                          transform: open ? 'rotate(180deg)' : 'none',
                        }}
                      />
                    </button>
                  </h2>
                  {/* Absent rather than hidden, so a closed section costs no
                      images and no screen-reader detour — the same reasoning the
                      stepper used for inactive beats. */}
                  {open && <div className="pb-6">{s.body}</div>}
                </section>
              );
            })}
          </div>

          {/* THE LINE. Sticky on a real screen so it stays put while the sidebar
              scrolls; above the controls on a phone, where there is no room to
                keep both and the artefact should still be the first thing. */}
          <div className="min-w-0 order-first lg:order-none">
            <div className="lg:sticky lg:top-[7rem]">
              <p
                className="text-[11px] sm:text-[10px] font-mono uppercase tracking-[0.2em] mb-3"
                style={{ color: 'var(--era-ink-muted)' }}
              >
                The line
              </p>
              <LineCanvas />
            </div>
          </div>
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
