/**
 * Wordmark — stage one: type any word, see it set, priced.
 *
 * Rendered live rather than generated, which is not a shortcut. Image models
 * cannot spell: ask for a seven-letter name and it comes back misspelled,
 * differently wrong on every roll, and a wordmark you cannot spell is not
 * shippable. Set type takes any word, is always correct, costs nothing, and
 * becomes the reference image stage two draws from — so the model's job is
 * drawing, never spelling.
 *
 * What this is NOT: a finished wordmark. A wordmark has drawn letterforms —
 * modified terminals, tightened counters, a custom ligature. That is stage two.
 * This picks the lane and guarantees the spelling.
 *
 * SIX VISIBLE, SIX COLLAPSED. Twelve specimens at once is a survey, not a
 * judgement — nobody evaluates twelve faces simultaneously, you look at one,
 * react, move on. The six straight faces ARE the lane decision; the funky six are
 * there when you want to push, behind a disclosure so they are not competing for
 * attention while you choose.
 *
 * The gating is per WORD, not just per treatment, which is the interesting part:
 * length x tracking decides whether it clears the 14in platen, so a short name
 * and a long one do not have the same options at the same budget.
 */

'use client';

import { useLine } from '@/lib/blank/lineState';
import { STATES, tierIndex } from '@/lib/blank/line';
import {
  ALL_TREATMENTS,
  FUNKY,
  TREATMENTS,
  availability,
  lineCount,
  normalise,
  producibleCount,
  PLATEN_INCHES,
  type Treatment,
} from '@/lib/blank/wordmark';
import { gateLabel } from '@/lib/blank/producible';
import { Disclosure } from './Disclosure';

const money = (n: number) => `$${(n / 1000).toFixed(0)}k`;
const BUDGETS = STATES.map((s) => s.budget);

export function Wordmark() {
  const { config, set } = useLine();
  const tier = tierIndex(config.budget);
  const stop = STATES[tier];
  const word = normalise(config.wordmark);
  const makeable = producibleCount(word, tier);
  const funkyMakeable = FUNKY.filter((t) => availability(word, t, tier).ok).length;

  const Card = ({ t }: { t: Treatment }) => {
    const av = availability(word, t, tier);
    const on = config.wordmarkStyle === t.id;
    const lines = lineCount(word, t);
    return (
      <button
        onClick={() => set('wordmarkStyle', on ? null : t.id)}
        aria-pressed={on}
        className="w-full min-w-0 border p-4 transition-colors flex flex-col [&_*]:text-left"
        style={{
          borderColor: on ? 'var(--accent)' : 'var(--era-hairline)',
          backgroundColor: on ? 'color-mix(in srgb, var(--accent) 5%, transparent)' : 'transparent',
          // Inline, not `items-stretch`: globals.css sets
          // `button { display: inline-flex; align-items: center; justify-content: center }`
          // for 44px touch targets and it outranks the utility class. Left at
          // center, every child shrinks to its content and centres — the specimen
          // measured 99px inside a 568px card, which reads as centred text.
          alignItems: 'stretch',
          justifyContent: 'flex-start',
        }}
      >
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
            ~{av.widthInches}in{lines > 1 ? ` · ${lines} lines` : ''}
          </span>
          {!av.ok && (
            <span
              className="text-[10px] font-mono uppercase tracking-wider"
              style={{ color: av.overPlaten ? '#A8456E' : 'var(--era-ink-muted)' }}
            >
              {av.overPlaten ? 'over platen' : gateLabel(av.availableAt, tier, money, BUDGETS)}
            </span>
          )}
        </div>
        <p className="text-[11px] mt-1" style={{ color: 'var(--era-ink-muted)' }}>
          {av.ok ? t.lane : av.reason}
        </p>
      </button>
    );
  };

  return (
    <div className="my-2">
      <p className="mb-5 text-[12px] font-mono" style={{ color: 'var(--era-ink-muted)' }}>
        <span style={{ color: 'var(--accent)' }}>{word || 'BLANK'}</span> at {word.length || 0}{' '}
        characters —{' '}
        <span style={{ color: 'var(--era-ink)' }}>
          {makeable} of {ALL_TREATMENTS.length}
        </span>{' '}
        treatments can be made at {money(stop.budget)}. Edit the name in the title above.
      </p>

      <div className="grid sm:grid-cols-2 gap-x-4 gap-y-4">
        {TREATMENTS.map((t) => (
          <Card key={t.id} t={t} />
        ))}
      </div>

      <Disclosure summary="Funky" hint={`${funkyMakeable} of 6 makeable — doing something to the type`}>
        <div className="grid sm:grid-cols-2 gap-x-4 gap-y-4">
          {FUNKY.map((t) => (
            <Card key={t.id} t={t} />
          ))}
        </div>
      </Disclosure>

      <p className="mt-6 text-[13px] max-w-2xl" style={{ color: 'var(--era-ink-body)' }}>
        Set type, not a finished wordmark. Every funky option earns its place with a production
        consequence rather than a look: stacking halves the width, which is how a long name clears
        the {PLATEN_INCHES}in platen at all; an outline is the cheapest ink coverage here and the
        only one no screen can hold; a knockout block is the most expensive shape in thread.
      </p>
    </div>
  );
}
