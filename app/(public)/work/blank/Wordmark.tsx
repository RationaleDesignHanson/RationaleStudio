/**
 * Wordmark — stage one: type any word, see it in six treatments, priced.
 *
 * Rendered live rather than generated, which is not a shortcut. Image models
 * cannot spell: ask for a seven-letter name and it comes back misspelled,
 * differently wrong on every roll, and a wordmark you cannot spell is not
 * shippable. Set type takes
 * any word, is always correct, costs nothing, and becomes the reference image
 * that stage two draws from — so the model's job is drawing, never spelling.
 *
 * What this is NOT: a finished wordmark. A wordmark has drawn letterforms —
 * modified terminals, tightened counters, a custom ligature. That is stage two.
 * This picks the lane and guarantees the spelling.
 *
 * The gating is per WORD, not just per treatment, which is the interesting part:
 * length x tracking decides whether it clears the 14in platen, so a short name
 * and a long one do not have the same options at the same budget.
 */

'use client';

import { useLine } from '@/lib/blank/lineState';
import { STATES, tierIndex } from '@/lib/blank/line';
import {
  TREATMENTS,
  availability,
  normalise,
  producibleCount,
  PLATEN_INCHES,
} from '@/lib/blank/wordmark';
import { gateLabel } from '@/lib/blank/producible';

const money = (n: number) => `$${(n / 1000).toFixed(0)}k`;

export function Wordmark() {
  const { config, set } = useLine();
  const tier = tierIndex(config.budget);
  const stop = STATES[tier];
  const word = normalise(config.wordmark);
  const makeable = producibleCount(word, tier);

  return (
    <div className="my-4">
      <div className="flex flex-wrap items-end gap-x-6 gap-y-3 mb-5">
        <label className="block">
          <span
            className="block text-[11px] font-mono uppercase tracking-[0.2em] mb-1.5"
            style={{ color: 'var(--era-ink-muted)' }}
          >
            The word
          </span>
          <input
            value={config.wordmark}
            onChange={(e) => set('wordmark', e.target.value.slice(0, 18))}
            placeholder="BLANK"
            aria-label="Wordmark text"
            spellCheck={false}
            className="px-3 py-1.5 text-[15px] font-mono uppercase tracking-widest bg-transparent border outline-none focus:border-[var(--accent)]"
            style={{ borderColor: 'var(--era-hairline)', color: 'var(--era-ink)', width: '13rem' }}
          />
        </label>
        <p className="text-[12px] font-mono pb-1.5" style={{ color: 'var(--era-ink-muted)' }}>
          At <span style={{ color: 'var(--accent)' }}>{money(stop.budget)}</span> —{' '}
          <span style={{ color: 'var(--era-ink)' }}>
            {makeable} of these {TREATMENTS.length}
          </span>{' '}
          can be executed at {word.length || 0} characters.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-x-4 gap-y-4">
        {TREATMENTS.map((t) => {
          const av = availability(word, t, tier);
          const on = config.wordmarkStyle === t.id;
          return (
            <button
              key={t.id}
              onClick={() => set('wordmarkStyle', on ? null : t.id)}
              aria-pressed={on}
              // flex-col is REQUIRED, not stylistic: a global rule sets
              // `button { display: flex }`, so without it the specimen, the
              // labels and the note lay out in a ROW and overlap each other.
              // Same trap the print library guards against.
              className="w-full min-w-0 border p-4 transition-colors flex flex-col items-stretch [&_*]:text-left"
              style={{
                borderColor: on ? 'var(--accent)' : 'var(--era-hairline)',
                backgroundColor: on ? 'color-mix(in srgb, var(--accent) 5%, transparent)' : 'transparent',
              }}
            >
              {/* The specimen. min-w-0 + truncation guard: a long word at wide
                  tracking would otherwise blow the grid track out, which is the
                  same intrinsic-sizing bug that broke the mobile lever. */}
              <div
                className="overflow-hidden whitespace-nowrap mb-3 text-left"
                style={{
                  opacity: av.ok ? 1 : 0.3,
                  color: 'var(--era-ink)',
                  fontSize: 'clamp(1.1rem, 2.4vw, 1.9rem)',
                  lineHeight: 1.15,
                  ...t.css,
                }}
              >
                {word || 'BLANK'}
              </div>

              <div className="flex flex-wrap items-baseline gap-x-2 text-left">
                <span
                  className="text-[12px]"
                  style={{ color: on ? 'var(--accent)' : av.ok ? 'var(--era-ink)' : 'var(--era-ink-muted)' }}
                >
                  {t.title}
                </span>
                <span className="text-[11px] font-mono" style={{ color: 'var(--era-ink-muted)' }}>
                  ~{av.widthInches}in
                </span>
                {!av.ok && (
                  <span
                    className="text-[10px] font-mono uppercase tracking-wider"
                    style={{ color: av.overPlaten ? '#A8456E' : 'var(--era-ink-muted)' }}
                  >
                    {av.overPlaten
                      ? 'over platen'
                      : gateLabel(av.availableAt, tier, money, STATES.map((s) => s.budget))}
                  </span>
                )}
              </div>
              <p className="text-[11px] mt-1" style={{ color: 'var(--era-ink-muted)' }}>
                {av.ok ? t.lane : av.reason}
              </p>
            </button>
          );
        })}
      </div>

      <p className="mt-5 text-[13px] max-w-3xl" style={{ color: 'var(--era-ink-body)' }}>
        Set type, not a finished wordmark — six typographic lanes from the site&rsquo;s three
        families, so the word is always spelled correctly and costs nothing to try. A wordmark
        proper has drawn letterforms, and that comes next: whichever lane you pick becomes the
        reference the letterform variants are drawn from, which is what keeps the spelling right.
        Widths are approximate at a 1.6in cap height and the {PLATEN_INCHES}in limit is the standard
        platen — larger needs jumbo frames, which Stage 0 does not budget for.
      </p>
    </div>
  );
}
