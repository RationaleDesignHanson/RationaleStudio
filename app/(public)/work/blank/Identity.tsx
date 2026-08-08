/**
 * Beat 01 — the identity, on one screen: the name, the symbol, and how they are
 * used together.
 *
 * These were two beats and should never have been. A wordmark and a symbol that
 * share nothing are two brands, and splitting them across screens hid that: you
 * chose a face, walked forward, and were then offered six unrelated shapes.
 *
 * They are coupled here because they are coupled in fact. The monogram is derived
 * from the name and set in the SAME treatment, so changing the face changes the
 * glyph with it — related by construction rather than by assertion. The abstract
 * marks are still available, but as a deliberate choice: a symbol that owes the
 * wordmark nothing is a real strategy, not a default.
 *
 * "Add a symbol", not "or a symbol". It is additive to the name, and the lockup is
 * the thing that says how the two get used.
 *
 * The usage rule underneath is derived from the width model, not written: a
 * wordmark has a minimum legible width on cloth, so anything smaller has to be
 * carried by the symbol — and if there is no symbol, those placements go blank,
 * which the rule says out loud rather than hiding.
 */

'use client';

import Image from 'next/image';
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
  monogram,
  usageRule,
  type SymbolKind,
} from '@/lib/blank/identity';
import { gateLabel } from '@/lib/blank/producible';

const money = (n: number) => `$${(n / 1000).toFixed(0)}k`;
const BUDGETS = STATES.map((s) => s.budget);

const MARKS = [
  { id: 'M-glyph', title: 'Glyph' },
  { id: 'M-chevron', title: 'Chevron' },
  { id: 'M-seal', title: 'Seal' },
  { id: 'M-lot-stamp', title: 'Lot stamp' },
  { id: 'M-brush', title: 'Brush' },
  { id: 'M-module', title: 'Module' },
];

export function Identity() {
  const { config, set } = useLine();
  const tier = tierIndex(config.budget);
  const word = normalise(config.wordmark);

  const found = ALL_TREATMENTS.findIndex((t) => t.id === config.wordmarkStyle);
  const tIdx = found < 0 ? 0 : found;
  const t = ALL_TREATMENTS[tIdx];
  const av = availability(word, t, tier);
  const lines = lineCount(word, t);
  const mono = monogram(word);

  // `graphic` holds the symbol: null = none, 'monogram' = derived, 'M-*' = artwork.
  const symbolKind: SymbolKind =
    config.graphic === 'monogram' ? 'monogram' : config.graphic ? 'mark' : 'none';
  const lockup = LOCKUPS.find((l) => l.id === config.placement) ?? LOCKUPS[0];
  const rule = usageRule(word, t, symbolKind);
  const lockupW = lockupWidthInches(word, t, lockup);
  const overPlaten = lockupW > PLATEN_INCHES;

  const moveTreatment = useCallback(
    (n: number) => {
      const next = (n + ALL_TREATMENTS.length) % ALL_TREATMENTS.length;
      set('wordmarkStyle', ALL_TREATMENTS[next].id);
    },
    [set],
  );

  const specimen = (
    <div
      className="max-w-full overflow-hidden"
      style={{
        color: 'var(--era-ink)',
        fontSize: 'clamp(1.6rem, 5.5vw, 4rem)',
        lineHeight: 1.05,
        whiteSpace: 'nowrap',
        ...t.css,
      }}
    >
      {word || 'BLANK'}
    </div>
  );

  const symbolEl =
    symbolKind === 'monogram' ? (
      <div
        className="shrink-0"
        style={{
          color: 'var(--era-ink)',
          fontSize: 'clamp(1.6rem, 5.5vw, 4rem)',
          lineHeight: 1.05,
          whiteSpace: 'nowrap',
          ...t.css,
        }}
      >
        {mono}
      </div>
    ) : symbolKind === 'mark' ? (
      <div className="relative shrink-0" style={{ width: 'clamp(48px, 7vw, 96px)', aspectRatio: '1' }}>
        <Image
          src={`/blank/${config.graphic}.webp`}
          alt=""
          fill
          sizes="96px"
          className="object-contain"
        />
      </div>
    ) : null;

  return (
    <div className="my-2">
      {/* The name field lives HERE, in the beat about naming.
          It was only in the masthead — an h1 with a hairline under it, which does
          not read as an input. "Edit the name in the title above" is not an
          affordance, it is an apology for the missing one. The masthead stays
          editable too; both drive the same state. */}
      <div className="flex flex-wrap items-end gap-x-5 gap-y-3 mb-5">
        <label className="block">
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
            style={{ borderColor: 'var(--era-hairline)', color: 'var(--era-ink)', width: '14rem' }}
          />
        </label>
        <p className="text-[12px] font-mono pb-2.5" style={{ color: 'var(--era-ink-muted)' }}>
          <span style={{ color: 'var(--era-ink)' }}>
            {producibleCount(word, tier)} of {ALL_TREATMENTS.length}
          </span>{' '}
          treatments makeable at {money(STATES[tier].budget)}
        </p>
      </div>

      {/* The lockup, as it would be used. */}
      <div
        className="relative flex items-center justify-center px-8 py-10 overflow-hidden"
        style={{
          backgroundColor: 'var(--era-bg-deep)',
          minHeight: 'min(30vh, 260px)',
          outline: av.ok && !overPlaten ? 'none' : '1px solid #A8456E',
          outlineOffset: '-1px',
        }}
      >
        <div
          className={`flex ${lockup.id === 'stacked' ? 'flex-col items-center gap-3' : 'items-center gap-5'}`}
          style={{ opacity: av.ok ? 1 : 0.35 }}
        >
          {lockup.usesSymbol && symbolEl}
          {lockup.usesWord && specimen}
          {!lockup.usesWord && !lockup.usesSymbol && (
            <span className="text-[12px] font-mono" style={{ color: 'var(--era-ink-muted)' }}>
              nothing selected
            </span>
          )}
        </div>
      </div>

      {/* Three controls, one row: the face, the symbol, the lockup. */}
      <div className="mt-4 grid gap-4 sm:grid-cols-[repeat(3,minmax(0,1fr))]">
        <div className="min-w-0">
          <p className="text-[10px] font-mono uppercase tracking-[0.2em] mb-1.5" style={{ color: 'var(--era-ink-muted)' }}>
            The face
          </p>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => moveTreatment(tIdx - 1)}
              aria-label="Previous treatment"
              className="shrink-0 border p-1.5"
              style={{ borderColor: 'var(--era-hairline)', color: 'var(--era-ink)' }}
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => moveTreatment(tIdx + 1)}
              aria-label="Next treatment"
              className="shrink-0 border p-1.5"
              style={{ borderColor: 'var(--era-hairline)', color: 'var(--era-ink)' }}
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
            <select
              value={t.id}
              onChange={(e) => set('wordmarkStyle', e.target.value)}
              aria-label="Wordmark treatment"
              className="min-w-0 flex-1 bg-transparent border px-2 py-1.5 text-[11px] font-mono uppercase tracking-wider outline-none focus:border-[var(--accent)]"
              style={{ borderColor: 'var(--era-hairline)', color: 'var(--era-ink)' }}
            >
              <optgroup label="Straight">
                {ALL_TREATMENTS.filter((x) => x.group === 'straight').map((x) => (
                  <option key={x.id} value={x.id}>
                    {x.title}
                    {availability(word, x, tier).ok ? '' : ' (not at this budget)'}
                  </option>
                ))}
              </optgroup>
              <optgroup label="Funky">
                {ALL_TREATMENTS.filter((x) => x.group === 'funky').map((x) => (
                  <option key={x.id} value={x.id}>
                    {x.title}
                    {availability(word, x, tier).ok ? '' : ' (not at this budget)'}
                  </option>
                ))}
              </optgroup>
            </select>
          </div>
        </div>

        <div className="min-w-0">
          <p className="text-[10px] font-mono uppercase tracking-[0.2em] mb-1.5" style={{ color: 'var(--era-ink-muted)' }}>
            Add a symbol
          </p>
          <select
            value={config.graphic ?? 'none'}
            onChange={(e) => set('graphic', e.target.value === 'none' ? null : e.target.value)}
            aria-label="Symbol"
            className="w-full min-w-0 bg-transparent border px-2 py-1.5 text-[11px] font-mono uppercase tracking-wider outline-none focus:border-[var(--accent)]"
            style={{ borderColor: 'var(--era-hairline)', color: 'var(--era-ink)' }}
          >
            <option value="none">None — wordmark only</option>
            <option value="monogram">Monogram “{mono}” — from the name</option>
            <optgroup label="Unrelated artwork">
              {MARKS.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.title}
                </option>
              ))}
            </optgroup>
          </select>
        </div>

        <div className="min-w-0">
          <p className="text-[10px] font-mono uppercase tracking-[0.2em] mb-1.5" style={{ color: 'var(--era-ink-muted)' }}>
            Lockup
          </p>
          <select
            value={lockup.id}
            onChange={(e) => set('placement', e.target.value)}
            aria-label="Lockup"
            className="w-full min-w-0 bg-transparent border px-2 py-1.5 text-[11px] font-mono uppercase tracking-wider outline-none focus:border-[var(--accent)]"
            style={{ borderColor: 'var(--era-hairline)', color: 'var(--era-ink)' }}
          >
            {LOCKUPS.map((l) => (
              <option key={l.id} value={l.id} disabled={l.usesSymbol && symbolKind === 'none'}>
                {l.title}
                {l.usesSymbol && symbolKind === 'none' ? ' (needs a symbol)' : ''}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* The verdict for what is on screen. */}
      <div className="mt-5 max-w-2xl">
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
            lockup ~{lockupW}in{lines > 1 ? ` · ${lines} lines` : ''}
          </span>
          {overPlaten && (
            <span className="text-[10px] font-mono uppercase tracking-wider" style={{ color: '#A8456E' }}>
              over platen
            </span>
          )}
          {!av.ok && !overPlaten && (
            <span className="text-[10px] font-mono uppercase tracking-wider" style={{ color: 'var(--era-ink-muted)' }}>
              {gateLabel(av.availableAt, tier, money, BUDGETS)}
            </span>
          )}
        </div>
        <p className="text-[13px] mt-1.5" style={{ color: av.ok && !overPlaten ? 'var(--era-ink-body)' : '#A8456E' }}>
          {overPlaten
            ? `At ~${lockupW}in this lockup is past the ${PLATEN_INCHES}in platen. Use a narrower lockup, stack it, or shorten the name.`
            : av.ok
              ? `${t.lane} ${lockup.use}`
              : av.reason}
        </p>
      </div>

      {/* The usage rule — derived from the width model, not written. */}
      <div className="mt-6 pt-5 border-t max-w-2xl" style={{ borderColor: 'var(--era-hairline)' }}>
        <p className="text-[10px] font-mono uppercase tracking-[0.2em] mb-1.5" style={{ color: 'var(--era-ink-muted)' }}>
          How you use them
        </p>
        <p
          className="text-[13px]"
          style={{ color: rule.small === 'nothing' ? '#A8456E' : 'var(--era-ink-body)' }}
        >
          {rule.sentence}
        </p>
        <p className="text-[12px] mt-2" style={{ color: 'var(--era-ink-muted)' }}>
          {MIN_WORDMARK_INCHES}in is where a set wordmark stops holding on cloth — below it letters
          and counters close up. That is why the small placements need a symbol rather than a shrunk
          logo.
        </p>
      </div>
    </div>
  );
}
