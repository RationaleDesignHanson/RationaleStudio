/**
 * The identity, split across the first three beats the way the work actually runs:
 * name it, see how it looks, then see it as a mark.
 *
 * It was one merged screen for a while. That was wrong in the other direction —
 * these are three decisions with a dependency chain, not one decision with three
 * controls. The face inherits from the name, the marks inherit from the face, and
 * putting all three on one screen hides the chain that makes them an identity
 * rather than three unrelated picks.
 *
 * What stays true is the coupling: the marks are built FROM the name in the face
 * you chose, so nothing downstream of here is arbitrary.
 */

'use client';

import { useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLine } from '@/lib/blank/lineState';
import { STATES, tierIndex } from '@/lib/blank/line';
import {
  ALL_TREATMENTS,
  availability,
  lineCount,
  normalise,
  producibleCount,
  PLATEN_INCHES,
} from '@/lib/blank/wordmark';
import {
  LOCKUPS,
  MIN_WORDMARK_INCHES,
  lockupWidthInches,
  usageRule,
  type SymbolKind,
} from '@/lib/blank/identity';
import { gateLabel } from '@/lib/blank/producible';

const money = (n: number) => `$${(n / 1000).toFixed(0)}k`;
const BUDGETS = STATES.map((s) => s.budget);

function useFace() {
  const { config } = useLine();
  const idx = Math.max(
    0,
    ALL_TREATMENTS.findIndex((t) => t.id === config.wordmarkStyle),
  );
  return { idx, t: ALL_TREATMENTS[idx] };
}

/** Beat 01 — the word, and nothing else to decide. */
export function NameStep() {
  const { config, set } = useLine();
  const word = normalise(config.wordmark);
  const { t } = useFace();

  return (
    <div className="my-2">
      <label className="block mb-6">
        <span
          className="block text-[10px] font-mono uppercase tracking-[0.2em] mb-1.5"
          style={{ color: 'var(--era-ink-muted)' }}
        >
          The name
        </span>
        <input
          value={config.wordmark}
          onChange={(e) => set('wordmark', e.target.value.slice(0, 18))}
          placeholder="BLANK"
          aria-label="The name of the line"
          spellCheck={false}
          autoComplete="off"
          className="px-3 py-2 text-[15px] font-mono uppercase tracking-widest bg-transparent border outline-none focus:border-[var(--accent)]"
          style={{ borderColor: 'var(--era-hairline)', color: 'var(--era-ink)', width: '15rem' }}
        />
      </label>

      <div
        className="flex items-center justify-center px-8 py-12 overflow-hidden"
        style={{ backgroundColor: 'var(--era-bg-deep)', minHeight: 'min(30vh, 260px)' }}
      >
        <div
          className="max-w-full overflow-hidden"
          style={{
            color: 'var(--era-ink)',
            fontSize: 'clamp(2rem, 7vw, 5rem)',
            lineHeight: 1.05,
            whiteSpace: 'nowrap',
            ...t.css,
          }}
        >
          {word || 'BLANK'}
        </div>
      </div>

      <p className="mt-5 text-[13px] max-w-2xl" style={{ color: 'var(--era-ink-body)' }}>
        Anything up to 18 characters. It is set in real type rather than generated, so it is always
        spelled correctly and costs nothing to change your mind about — and the length matters later,
        because a long name is constrained by the {PLATEN_INCHES}in print platen before it is
        constrained by taste.
      </p>
    </div>
  );
}

/** Beat 02 — how it looks. One specimen at a time, twelve to choose from. */
export function FaceStep() {
  const { config, set } = useLine();
  const tier = tierIndex(config.budget);
  const word = normalise(config.wordmark);
  const { idx, t } = useFace();
  const av = availability(word, t, tier);
  const lines = lineCount(word, t);

  const move = useCallback(
    (n: number) => {
      const next = (n + ALL_TREATMENTS.length) % ALL_TREATMENTS.length;
      set('wordmarkStyle', ALL_TREATMENTS[next].id);
    },
    [set],
  );

  return (
    <div className="my-2">
      <p className="mb-4 text-[12px] font-mono" style={{ color: 'var(--era-ink-muted)' }}>
        <span style={{ color: 'var(--accent)' }}>{word || 'BLANK'}</span> ·{' '}
        <span style={{ color: 'var(--era-ink)' }}>
          {producibleCount(word, tier)} of {ALL_TREATMENTS.length}
        </span>{' '}
        makeable at {money(STATES[tier].budget)} — the rest come back when the budget changes.
      </p>

      <div
        className="flex items-center justify-center px-8 py-12 overflow-hidden"
        style={{
          backgroundColor: 'var(--era-bg-deep)',
          minHeight: 'min(34vh, 300px)',
          outline: av.ok ? 'none' : '1px solid #A8456E',
          outlineOffset: '-1px',
        }}
      >
        <div
          className="max-w-full overflow-hidden"
          style={{
            opacity: av.ok ? 1 : 0.35,
            color: 'var(--era-ink)',
            fontSize: 'clamp(2rem, 7vw, 5rem)',
            lineHeight: 1.05,
            whiteSpace: 'nowrap',
            ...t.css,
          }}
        >
          {word || 'BLANK'}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button
          onClick={() => move(idx - 1)}
          aria-label="Previous treatment"
          className="shrink-0 border p-1.5"
          style={{ borderColor: 'var(--era-hairline)', color: 'var(--era-ink)' }}
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button
          onClick={() => move(idx + 1)}
          aria-label="Next treatment"
          className="shrink-0 border p-1.5"
          style={{ borderColor: 'var(--era-hairline)', color: 'var(--era-ink)' }}
        >
          <ChevronRight className="w-4 h-4" />
        </button>
        <select
          value={t.id}
          onChange={(e) => set('wordmarkStyle', e.target.value)}
          aria-label="Wordmark treatment"
          className="min-w-0 bg-transparent border px-2.5 py-1.5 text-[12px] font-mono uppercase tracking-wider outline-none focus:border-[var(--accent)]"
          style={{ borderColor: 'var(--era-hairline)', color: 'var(--era-ink)' }}
        >
          <optgroup label="Straight — choosing a face">
            {ALL_TREATMENTS.filter((x) => x.group === 'straight').map((x) => (
              <option key={x.id} value={x.id}>
                {x.title}
                {availability(word, x, tier).ok ? '' : ' (not at this budget)'}
              </option>
            ))}
          </optgroup>
          <optgroup label="Funky — doing something to the type">
            {ALL_TREATMENTS.filter((x) => x.group === 'funky').map((x) => (
              <option key={x.id} value={x.id}>
                {x.title}
                {availability(word, x, tier).ok ? '' : ' (not at this budget)'}
              </option>
            ))}
          </optgroup>
        </select>
        <span className="text-[11px] font-mono" style={{ color: 'var(--era-ink-muted)' }}>
          {idx + 1} / {ALL_TREATMENTS.length}
        </span>
      </div>

      <div className="mt-4 max-w-2xl">
        <div className="flex flex-wrap items-baseline gap-x-2.5">
          <h4 className="font-display text-lg" style={{ color: 'var(--era-ink)' }}>
            {t.title}
          </h4>
          <span
            className="text-[10px] font-mono uppercase tracking-wider"
            style={{ color: t.group === 'funky' ? 'var(--accent)' : 'var(--era-ink-muted)' }}
          >
            {t.group}
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
        <p className="text-[13px] mt-1.5" style={{ color: av.ok ? 'var(--era-ink-body)' : '#A8456E' }}>
          {av.ok ? t.lane : av.reason}
        </p>
      </div>
    </div>
  );
}

/** Beat 03, under the family — how the word and the mark get used together. */
export function LockupStep() {
  const { config, set } = useLine();
  const word = normalise(config.wordmark);
  const { t } = useFace();

  const symbolKind: SymbolKind = config.graphic ? 'mark' : 'none';
  const lockup = LOCKUPS.find((l) => l.id === config.placement) ?? LOCKUPS[0];
  const rule = usageRule(word, t, symbolKind);
  const lockupW = lockupWidthInches(word, t, lockup);
  const overPlaten = lockupW > PLATEN_INCHES;

  return (
    <div className="mt-10 pt-8 border-t" style={{ borderColor: 'var(--era-hairline)' }}>
      <h3 className="font-display text-lg mb-1" style={{ color: 'var(--era-ink)' }}>
        And how you use them together
      </h3>
      <p className="text-[13px] mb-4" style={{ color: 'var(--era-ink-muted)' }}>
        The lockup is the rule for putting the word and the mark in the same place.
      </p>

      <div className="flex flex-wrap items-end gap-4">
        <label className="min-w-0">
          <span
            className="block text-[10px] font-mono uppercase tracking-[0.2em] mb-1.5"
            style={{ color: 'var(--era-ink-muted)' }}
          >
            Lockup
          </span>
          <select
            value={lockup.id}
            onChange={(e) => set('placement', e.target.value)}
            aria-label="Lockup"
            className="min-w-0 bg-transparent border px-2.5 py-1.5 text-[12px] font-mono uppercase tracking-wider outline-none focus:border-[var(--accent)]"
            style={{ borderColor: 'var(--era-hairline)', color: 'var(--era-ink)' }}
          >
            {LOCKUPS.map((l) => (
              <option key={l.id} value={l.id} disabled={l.usesSymbol && symbolKind === 'none'}>
                {l.title}
                {l.usesSymbol && symbolKind === 'none' ? ' (needs a mark)' : ''}
              </option>
            ))}
          </select>
        </label>
        <p
          className="text-[11px] font-mono pb-2"
          style={{ color: overPlaten ? '#A8456E' : 'var(--era-ink-muted)' }}
        >
          ~{lockupW}in{overPlaten ? ` · past the ${PLATEN_INCHES}in platen` : ''}
        </p>
      </div>

      <p className="text-[13px] mt-4 max-w-2xl" style={{ color: 'var(--era-ink-muted)' }}>
        {lockup.use}
      </p>
      <p
        className="text-[13px] mt-3 max-w-2xl"
        style={{ color: rule.small === 'nothing' ? '#A8456E' : 'var(--era-ink-body)' }}
      >
        {rule.sentence}
      </p>
      <p className="text-[12px] mt-2 max-w-2xl" style={{ color: 'var(--era-ink-muted)' }}>
        {MIN_WORDMARK_INCHES}in is where a set wordmark stops holding on cloth — below it letters and
        counters close up, which is why the small placements need a mark rather than a shrunk logo.
      </p>
    </div>
  );
}
