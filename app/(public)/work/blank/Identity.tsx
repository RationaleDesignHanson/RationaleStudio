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
import { constructionsFor, randomConstructions } from '@/lib/blank/markFamily';
import { Mark } from './MarkFamily';

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

/**
 * Beat 01 — the word and the face it is set in.
 *
 * These were two beats and both showed a large specimen of the same word in the
 * same treatment, so the first was a strict subset of the second. Naming still
 * opens the experience; choosing the face is the same act continued, not a
 * separate screen showing you the same thing again.
 */
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

      <p className="text-[13px] max-w-2xl" style={{ color: 'var(--era-ink-body)' }}>
        Anything up to 18 characters. It is set in real type rather than generated, so it is always
        spelled correctly and costs nothing to change your mind about — and the length matters later,
        because a long name is constrained by the {PLATEN_INCHES}in print platen before it is
        constrained by taste.
      </p>

      <FaceStep />
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

  // Resolve against the SAME pool the family grid is showing. A shuffled set uses
  // generated ids (r-<seed>-<n>) which are not in the canonical list, so looking
  // only there reported "no mark chosen" while a mark was visibly selected.
  const seed = Number(config.markSeed);
  const pool =
    config.markSeed !== '' && Number.isFinite(seed)
      ? randomConstructions(word, seed)
      : constructionsFor(word);
  const construction = pool.find((c) => c.id === config.mark) ?? null;
  const symbolKind: SymbolKind = construction ? 'mark' : 'none';
  const lockup = LOCKUPS.find((l) => l.id === config.lockup) ?? LOCKUPS[0];
  const rule = usageRule(word, t, symbolKind);
  const lockupW = lockupWidthInches(word, t, lockup);
  const overPlaten = lockupW > PLATEN_INCHES;

  return (
    <div className="mt-10 pt-8 border-t" style={{ borderColor: 'var(--era-hairline)' }}>
      <h3 className="font-display text-lg mb-1" style={{ color: 'var(--era-ink)' }}>
        What goes on the garment
      </h3>
      <p className="text-[13px] mb-4" style={{ color: 'var(--era-ink-muted)' }}>
        The wordmark, the mark, or both — and if both, how they sit together.
      </p>

      {/* The preview. A lockup is a spatial rule, and a sentence describing where
          two things sit relative to each other is not a substitute for showing it. */}
      <div
        className="flex items-center justify-center px-8 py-10 mb-4 overflow-hidden"
        style={{
          backgroundColor: 'var(--era-bg-deep)',
          minHeight: 'min(26vh, 220px)',
          outline: overPlaten ? '1px solid #A8456E' : 'none',
          outlineOffset: '-1px',
        }}
      >
        <div
          className={`flex ${
            lockup.id === 'stacked' ? 'flex-col items-center gap-3' : 'items-center gap-5'
          }`}
        >
          {lockup.usesSymbol && construction && (
            <Mark c={construction} word={word} css={t.css} size={lockup.id === 'symbol' ? 132 : 76} />
          )}
          {lockup.usesWord && (
            <div
              className="max-w-full overflow-hidden"
              style={{
                color: 'var(--era-ink)',
                fontSize: 'clamp(1.5rem, 5vw, 3.4rem)',
                lineHeight: 1.05,
                whiteSpace: 'nowrap',
                ...t.css,
              }}
            >
              {word || 'BLANK'}
            </div>
          )}
          {lockup.usesSymbol && !construction && (
            <span className="text-[12px] font-mono" style={{ color: 'var(--era-ink-muted)' }}>
              pick a mark above
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {/* All four stay SELECTABLE. Three were disabled until a mark existed,
            and the fourth was already selected — so on arrival every button was
            either greyed out or a no-op, which reads as a broken control rather
            than as a prerequisite. Choosing one that needs a mark is allowed; the
            preview then says what is missing, which teaches the dependency
            instead of just refusing. */}
        {LOCKUPS.map((l) => {
          const on = l.id === lockup.id;
          const wants = l.usesSymbol && symbolKind === 'none';
          return (
            <button
              key={l.id}
              onClick={() => set('lockup', l.id)}
              aria-pressed={on}
              title={l.use}
              className="px-3 py-1.5 text-[12px] font-mono uppercase tracking-wider border transition-colors"
              style={{
                borderColor: on ? 'var(--accent)' : 'var(--era-hairline)',
                color: on ? 'var(--accent)' : wants ? 'var(--era-ink-muted)' : 'var(--era-ink)',
                backgroundColor: on ? 'color-mix(in srgb, var(--accent) 6%, transparent)' : 'transparent',
                minHeight: 0,
              }}
            >
              {l.title}
            </button>
          );
        })}
        <span
          className="text-[11px] font-mono ml-1"
          style={{ color: overPlaten ? '#A8456E' : 'var(--era-ink-muted)' }}
        >
          ~{lockupW}in{overPlaten ? ` · past the ${PLATEN_INCHES}in platen` : ''}
        </span>
      </div>

      {lockup.usesSymbol && symbolKind === 'none' && (
        <p className="text-[13px] mt-3 max-w-2xl" style={{ color: 'var(--accent)' }}>
          This lockup uses a mark, and none is chosen yet — pick one from the family above and it
          will appear here.
        </p>
      )}
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
