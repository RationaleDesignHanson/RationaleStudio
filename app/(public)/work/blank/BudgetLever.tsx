/**
 * The budget lever — the argument the whole case study exists to make.
 *
 * The five budget stops are a sequence with a direction: travelling right costs
 * more and the mark gets quieter. So this is the one place on the page where the
 * x-axis earns its keep, and it's a horizontal scroll-snap track rather than a
 * cross-fade in place.
 *
 * DESIGN CONSTRAINTS (from analysis/10-horizontal-sequence.md):
 *
 *  - Native CSS scroll-snap, never a JS transform track.
 *  - NO wheel hijacking. Chrome and Safari already map a vertical wheel to
 *    horizontal on an x-only-overflow container, and a deltaY->scrollLeft
 *    listener traps trackpad users whose pointer is over the stage. Vertical
 *    wheel keeps scrolling the page.
 *  - Every frame carries its OWN plate and figures rather than reading a state
 *    index, so the no-JS case still shows correct numbers.
 *  - Frame geometry is identical across all five, so each snap lands the plate
 *    at the same coordinates — that preserves the in-place comparison the
 *    cross-fade used to give while adding the travel.
 *  - Garment tabs live ABOVE the track and the slider BELOW: they're a filter
 *    across all frames, not a step. Putting them in the track makes it 2D.
 */

'use client';

import { useMemo, useRef, useEffect, useCallback } from 'react';
import { useLine, type Garment } from '@/lib/blank/lineState';
import {
  GARMENTS,
  STATES,
  BLANK_BY_TIER,
  type BudgetState,
} from '@/lib/blank/line';
import Image from 'next/image';
import {
  BLANKS,
  HEROES,
  stage0Cogs,
  grossMargin,
  breakEvenPreorders,
  heroCogs,
  minRetailForFloor,
  MARGIN_FLOOR,
  type Confidence,
  type Blank,
} from '@/lib/blank/economics';

// Garment, the budget stops and the blank ladder live in lib/blank/line.ts so
// the lever and the line tray cannot drift apart on what a tier costs.
export type { Garment };

const money = (n: number) => `$${n.toLocaleString('en-US', { maximumFractionDigits: 0 })}`;
const dollars = (n: number) => `$${n.toFixed(2)}`;
const pct = (n: number) => `${(n * 100).toFixed(1)}%`;

function priceFrame(s: BudgetState, i: number, garment: Garment, retail: number) {
  const blank: Blank = BLANKS[BLANK_BY_TIER[garment][i]];
  const cogs = stage0Cogs({ blank, decoration: s.decoration, run: s.run, relabel: s.relabel });
  const gm = grossMargin(retail, cogs.landedCOGS);
  return {
    blank,
    cogs,
    gm,
    clears: gm >= MARGIN_FLOOR,
    needed: minRetailForFloor(cogs.landedCOGS),
    heroBreakEven: s.hero ? breakEvenPreorders(HEROES.choreCoat, 'portugal') : null,
    heroShared: s.hero
      ? (() => {
          for (let n = 50; n <= 400; n++) {
            const c = heroCogs(HEROES.choreCoat, n, 'portugal', {
              sharedClothWith: { hero: HEROES.trousers, units: n, pricePerMetre: 7 },
            });
            if (grossMargin(225, c.landedCOGS) >= MARGIN_FLOOR) return n;
          }
          return null;
        })()
      : null,
  };
}

function ConfidenceDot({ level }: { level: Confidence }) {
  const map: Record<Confidence, { color: string; title: string }> = {
    hard: { color: '#4F7A3F', title: 'Verified live against a published source' },
    derived: { color: '#B07025', title: 'Derived from sourced inputs — not directly verified' },
    soft: { color: '#A8456E', title: 'Single soft source — treat as an anchor' },
    'soft-conflicted': { color: '#A8456E', title: 'Sources disagree — treat as a range' },
  };
  const m = map[level];
  return (
    <span
      title={m.title}
      aria-label={m.title}
      className="inline-block w-1.5 h-1.5 rounded-full align-middle ml-1.5"
      style={{ backgroundColor: m.color }}
    />
  );
}

function Row({
  label,
  value,
  confidence,
  alert,
}: {
  label: string;
  value: string;
  confidence?: Confidence;
  alert?: boolean;
}) {
  return (
    <div className="flex justify-between gap-4 border-b pb-1" style={{ borderColor: 'var(--era-hairline)' }}>
      <dt style={{ color: 'var(--era-ink-muted)' }}>{label}</dt>
      <dd className="text-right" style={{ color: alert ? '#A8456E' : 'var(--era-ink)' }}>
        {value}
        {confidence && <ConfidenceDot level={confidence} />}
      </dd>
    </div>
  );
}

/**
 * Margin, with the price you can actually change.
 *
 * The number lives in the label rather than the value column because it is an
 * INPUT to the margin beside it, not another output — putting it in the value
 * column would read as a second result.
 */
function RetailRow({
  retail,
  isOverride,
  onChange,
  margin,
  alert,
}: {
  retail: number;
  isOverride: boolean;
  onChange: (v: string) => void;
  margin: number;
  alert?: boolean;
}) {
  // nowrap, plus shrink-0 on the value: the input and the reset control make this
  // dt far wider than a plain label, and without them the row wrapped and put the
  // margin on the line ABOVE its own label.
  return (
    <div
      className="flex flex-nowrap justify-between items-baseline gap-3 border-b pb-1"
      style={{ borderColor: 'var(--era-hairline)' }}
    >
      <dt className="flex items-baseline gap-1 min-w-0 whitespace-nowrap" style={{ color: 'var(--era-ink-muted)' }}>
        Margin @ $
        <input
          type="number"
          min={1}
          max={9999}
          value={retail}
          onChange={(e) => onChange(e.target.value)}
          aria-label="Retail price"
          size={1}
          className="w-11 shrink-0 bg-transparent border-b outline-none tabular-nums focus:border-[var(--accent)] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          style={{
            borderColor: isOverride ? 'var(--accent)' : 'var(--era-hairline)',
            color: isOverride ? 'var(--accent)' : 'var(--era-ink)',
          }}
        />
        {isOverride && (
          <button
            onClick={() => onChange('')}
            className="text-[10px] uppercase tracking-wider shrink-0 leading-none"
            style={{
              color: 'var(--era-ink-muted)',
              // globals.css gives every <button> a 44px touch target, which made
              // this dt 49px tall and pushed the margin onto its own line. This is
              // a reset affordance inside a text row, not a tap target.
              minHeight: 0,
              minWidth: 0,
            }}
            title="Back to this tier's default price"
          >
            ↺
          </button>
        )}
      </dt>
      <dd className="text-right shrink-0 whitespace-nowrap" style={{ color: alert ? '#A8456E' : 'var(--era-ink)' }}>
        {pct(margin)}
      </dd>
    </div>
  );
}

export function BudgetLever() {
  // Budget stop and garment are shareable config, so they live in the URL via
  // LineProvider rather than in this component. `i` is derived, not stored.
  const { config, set, hydrated } = useLine();
  const i = Math.max(0, STATES.findIndex((s) => s.slug === config.budget));
  const garment = config.garment;
  const setI = useCallback(
    (idx: number) => set('budget', STATES[Math.min(STATES.length - 1, Math.max(0, idx))].slug),
    [set],
  );
  const setGarment = useCallback((k: Garment) => set('garment', k), [set]);
  const trackRef = useRef<HTMLDivElement>(null);
  const programmatic = useRef(false);
  const g = GARMENTS.find((x) => x.key === garment)!;

  /** Frame pitch = frame width + gap. Not clientWidth — frames peek. */
  const framePitch = (el: HTMLDivElement) => {
    const first = el.firstElementChild as HTMLElement | null;
    if (!first) return el.clientWidth;
    const gap = parseFloat(getComputedStyle(el).columnGap || '0') || 0;
    return first.offsetWidth + gap;
  };

  const scrollToFrame = useCallback((idx: number, behavior: ScrollBehavior = 'smooth') => {
    const el = trackRef.current;
    if (!el) return;
    programmatic.current = true;
    el.scrollTo({ left: idx * framePitch(el), behavior });
  }, []);

  // A shared link arrives with the lever already set; scroll the track to match
  // it once, on hydration. Never scrolls the document — a deep link pre-sets the
  // lever, nothing more.
  useEffect(() => {
    if (hydrated && i > 0) scrollToFrame(i, 'instant');
    // Intentionally only on hydration: later changes are driven by the control.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hydrated]);

  // Track -> state. `scrollend` is Chrome 114+/Firefox 109+/Safari 26+; the
  // debounce is the fallback for everything older.
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    let t: ReturnType<typeof setTimeout>;
    const settle = () => {
      if (programmatic.current) {
        programmatic.current = false;
        return;
      }
      const idx = Math.round(el.scrollLeft / Math.max(1, framePitch(el)));
      setI(Math.min(STATES.length - 1, Math.max(0, idx)));
    };
    const onScroll = () => {
      clearTimeout(t);
      t = setTimeout(settle, 120);
    };
    const hasScrollEnd = 'onscrollend' in window;
    el.addEventListener('scroll', onScroll, { passive: true });
    if (hasScrollEnd) el.addEventListener('scrollend', settle);
    // Frame width changes with the viewport; re-register the current frame.
    const ro = new ResizeObserver(() => scrollToFrame(i, 'instant'));
    ro.observe(el);
    return () => {
      clearTimeout(t);
      el.removeEventListener('scroll', onScroll);
      if (hasScrollEnd) el.removeEventListener('scrollend', settle);
      ro.disconnect();
    };
  }, [i, scrollToFrame]);

  // Retail is an override, not a stored price: empty means "use this tier's
  // default", so moving the lever still changes the price unless you have said
  // otherwise. It is the largest single margin lever in the model (35.9 points),
  // and until now the only number on this beat you could not touch.
  const retailFor = useCallback(
    (s: BudgetState) => {
      const n = Number(config.retail);
      return config.retail !== '' && Number.isFinite(n) && n > 0 ? n : s.retail;
    },
    [config.retail],
  );

  const frames = useMemo(
    () => STATES.map((s, idx) => ({ s, idx, calc: priceFrame(s, idx, garment, retailFor(s)) })),
    [garment, retailFor],
  );

  return (
    <div className="my-2">
      {/* Garment filter — above the track, because it applies across all frames */}
      <div className="flex gap-1.5 mb-3">
        {GARMENTS.map((gm) => (
          <button
            key={gm.key}
            onClick={() => setGarment(gm.key)}
            aria-pressed={garment === gm.key}
            className="px-2.5 py-1 text-[11px] font-mono uppercase tracking-wider transition-colors border-b-2"
            style={{
              borderColor: garment === gm.key ? 'var(--accent)' : 'transparent',
              color: garment === gm.key ? 'var(--accent)' : 'var(--era-ink-muted)',
            }}
          >
            {gm.label}
          </button>
        ))}
      </div>

      {/* THE TRACK */}
      <div
        ref={trackRef}
        role="group"
        aria-label="Budget states — scroll horizontally or use the slider below"
        tabIndex={0}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory cursor-grab active:cursor-grabbing [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        style={{ overscrollBehaviorX: 'contain' }}
      >
        {frames.map(({ s, idx, calc }) => (
          <div
            key={s.slug}
            className="shrink-0 grow-0 basis-[86%] sm:basis-[90%] lg:basis-[93%] min-w-0 snap-start"
            aria-hidden={idx !== i}
          >
            <div className="grid lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] gap-4 lg:gap-8 items-center">
              {/* Left margin — the number */}
              <div className="order-2 lg:order-1 lg:text-right min-w-0">
                <p className="text-[11px] font-mono uppercase tracking-[0.2em]" style={{ color: 'var(--era-ink-muted)' }}>
                  Launch budget
                </p>
                <p
                  className="font-display leading-none mt-1"
                  style={{ fontSize: 'clamp(2.5rem, 4.5vw, 3.5rem)', color: 'var(--accent)' }}
                >
                  {money(s.budget)}
                  {s.budget === 20000 ? '+' : ''}
                </p>
              </div>

              {/* The garment — identical geometry in every frame */}
              <div className="order-1 lg:order-2 mx-auto w-full lg:w-auto min-w-0">
                {/* Stage height is the viewport REMAINDER, not a flat vh fraction.
                    It was originally sized so the tier scale and caption cleared a
                    13" laptop fold when the lever was the opening frame. The lever
                    is now chapter 02 and no longer opens the page, so that fold
                    guarantee no longer applies — but the remainder sizing is kept,
                    because it stops the stage growing taller than a viewport and
                    leaving the slider off-screen once you have scrolled to it. The
                    458 came from measurement (322px of chrome above at worst case,
                    128px of controls below) and should be re-measured, not guessed,
                    if anything above it changes again. */}
                <div
                  className="relative overflow-hidden mx-auto w-full lg:w-auto lg:h-[min(100vh_-_458px,700px)] max-h-[min(37vh,380px)] lg:max-h-none"
                  style={{ aspectRatio: g.ratio, backgroundColor: 'var(--era-bg-deep)' }}
                >
                  <Image
                    src={`/blank/${s.tierSlug.replace('{g}', garment)}.webp`}
                    alt={`${money(s.budget)} — ${s.treatment[garment]}`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 55vw"
                    priority={idx === 0}
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Right margin — what that buys. Hidden on mobile; rendered
                  once beneath the slider there so the control stays in fold. */}
              <div className="order-3 min-w-0 hidden lg:block">
                <p
                  className="font-display italic leading-tight"
                  style={{ fontSize: 'clamp(1.1rem, 1.7vw, 1.45rem)', color: 'var(--era-ink)' }}
                >
                  {s.brandCarrier}
                </p>
                <dl className="mt-3 space-y-1.5 font-mono text-[12px] tabular-nums">
                  <Row label="Treatment" value={s.treatment[garment]} />
                  <Row label="Blank" value={calc.blank.name} confidence={calc.blank.confidence} />
                  <Row label="COGS" value={dollars(calc.cogs.landedCOGS)} />
                  <RetailRow
                    retail={retailFor(s)}
                    isOverride={config.retail !== ''}
                    onChange={(v) => set('retail', v)}
                    margin={calc.gm}
                    alert={!calc.clears}
                  />
                </dl>
                {!calc.clears && (
                  <p className="mt-2 text-[11px]" style={{ color: '#A8456E' }}>
                    Under the 60% floor — needs {dollars(calc.needed)} retail, or a cheaper blank.
                  </p>
                )}
                {s.hero && calc.heroBreakEven && (
                  <p className="mt-2 text-[11px]" style={{ color: 'var(--era-ink-muted)' }}>
                    A cut-and-sew hero becomes reachable — break-even{' '}
                    <strong style={{ color: 'var(--era-ink)' }}>{calc.heroBreakEven}</strong> pre-orders
                    {calc.heroShared ? `, or ${calc.heroShared} sharing cloth` : ''}.
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
        {/* Trailing spacer so the LAST frame can still start-align; without it
            the plate shifts right on frame 5 and registration breaks. */}
        <div
          aria-hidden
          className="shrink-0 grow-0 basis-[14%] sm:basis-[10%] lg:basis-[7%]"
        />
      </div>

      {/* The slider IS the keyboard interface — arrows, Home/End, PageUp/Down,
          with correct announcements, for free. */}
      <div className="mt-5 max-w-3xl mx-auto">
        <input
          id="budget"
          type="range"
          min={0}
          max={STATES.length - 1}
          step={1}
          value={i}
          onChange={(e) => {
            const idx = Number(e.target.value);
            setI(idx);
            scrollToFrame(idx);
          }}
          aria-label="Launch budget"
          aria-valuetext={`${money(STATES[i].budget)} — ${STATES[i].label}`}
          className="w-full accent-[var(--accent)] cursor-pointer"
        />
        <div className="relative mt-2">
          <div
            className="absolute left-0 right-0 top-[3px] h-px"
            style={{ backgroundColor: 'var(--era-hairline)' }}
            aria-hidden
          />
          <div className="relative flex justify-between">
            {STATES.map((st, idx) => (
              <button
                key={st.budget}
                onClick={() => {
                  setI(idx);
                  scrollToFrame(idx);
                }}
                className="flex flex-col items-center gap-1.5 group"
                aria-label={`${money(st.budget)} — ${st.label}`}
                aria-current={idx === i ? 'true' : undefined}
              >
                <span
                  className="block w-[7px] h-[7px] rounded-full transition-colors"
                  style={{
                    backgroundColor: idx === i ? 'var(--accent)' : 'var(--era-bg)',
                    boxShadow: `0 0 0 1px ${idx === i ? 'var(--accent)' : 'var(--era-hairline)'}`,
                  }}
                  aria-hidden
                />
                <span
                  className="text-[11px] font-mono uppercase tracking-wider transition-colors"
                  style={{ color: idx === i ? 'var(--accent)' : 'var(--era-ink-muted)' }}
                >
                  {st.label}
                </span>
              </button>
            ))}
          </div>
        </div>
        {/* Mobile-only mirror of the active frame's figures */}
        <div className="lg:hidden mt-5">
          <p
            className="font-display italic leading-tight mb-3"
            style={{ fontSize: '1.1rem', color: 'var(--era-ink)' }}
          >
            {STATES[i].brandCarrier}
          </p>
          <dl className="space-y-1.5 font-mono text-[12px] tabular-nums">
            <Row label="Treatment" value={STATES[i].treatment[garment]} />
            <Row label="Blank" value={frames[i].calc.blank.name} confidence={frames[i].calc.blank.confidence} />
            <Row label="COGS" value={dollars(frames[i].calc.cogs.landedCOGS)} />
            <RetailRow
              retail={retailFor(STATES[i])}
              isOverride={config.retail !== ''}
              onChange={(v) => set('retail', v)}
              margin={frames[i].calc.gm}
              alert={!frames[i].calc.clears}
            />
          </dl>
        </div>

        <p className="mt-3 text-center text-[13px]" style={{ color: 'var(--era-ink-body)' }}>
          {i >= 2
            ? 'Past $8,000 the mark is small enough that you have to look for it.'
            : 'Same garment, same framing. The only variable is what the budget puts on the cloth.'}
        </p>
      </div>
    </div>
  );
}
