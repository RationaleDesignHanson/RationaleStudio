/**
 * Graphics & print library — every decoration language worth considering, on
 * one garment, one framing, one colourway.
 *
 * The budget lever answers "how much decoration the budget carries". This answers
 * "what kind" — and the two are coupled, because each budget stop buys exactly
 * one decoration method and a method can only execute some of these marks.
 *
 * The gating is live off the slider rather than a static "not Stage 0" label,
 * and it is deliberately NOT monotonic: drag to $12k and the oversize numeral,
 * the back-panel graphic and the distressed overlay all become unmakeable, while
 * tonal and appliqué become available. The fine-line technical diagram is only
 * ever executable at $3k. That inversion is the page's argument — quiet costs
 * money, and the cheap tier can do things the expensive one cannot.
 */

'use client';

import Image from 'next/image';
import { useLine } from '@/lib/blank/lineState';
import { STATES, tierIndex } from '@/lib/blank/line';
import { availability, METHOD_LABEL, producibleCount } from '@/lib/blank/producible';

interface PrintOption {
  id: string;
  title: string;
  /** How the mark is described when it IS executable. */
  method: string;
  note?: string;
}

const money = (n: number) => `$${(n / 1000).toFixed(0)}k`;

/**
 * Why a mark is unavailable, in three words or fewer.
 *
 * "needs $8k" is only right when the mark is above the current budget. A mark
 * lost by spending MORE — the numeral, the back panel — must not say "needs $3k",
 * because it does not need $3k; it needs at most $8k. Getting this backwards
 * inverts the whole argument the grid is making.
 */
function gateLabel(availableAt: number[], tier: number): string {
  if (availableAt.length === 0) return 'not here';
  const below = availableAt.filter((i) => i < tier);
  const above = availableAt.filter((i) => i > tier);
  if (above.length && !below.length) return `needs ${money(STATES[Math.min(...above)].budget)}`;
  if (below.length && !above.length) return `up to ${money(STATES[Math.max(...below)].budget)}`;
  // Available on both sides but not here — a genuine gap, e.g. a two-colour
  // crest at the single-screen stop.
  return `not at ${money(STATES[tier].budget)}`;
}

const OPTIONS: PrintOption[] = [
  { id: 'G-abstract-mark', title: 'Abstract mark', method: 'Any method' },
  { id: 'G-emblem', title: 'Emblem / crest', method: 'Two colours, or thread' },
  { id: 'G-numeral', title: 'Athletic numeral', method: 'Print only — too big to stitch' },
  { id: 'G-pocket-hit', title: 'Pocket-scale hit', method: 'Any method', note: 'Cheapest option in the set — smallest platen, least ink.' },
  { id: 'G-back-panel', title: 'Back-panel graphic', method: 'Print only — too big to stitch', note: 'Within the 14×16in standard platen. Larger needs jumbo frames.' },
  { id: 'G-sleeve-hit', title: 'Sleeve hit', method: 'Any method', note: 'Small platen; 1–4in is the practical limit.' },
  { id: 'G-tonal-emboss', title: 'Tonal / no-contrast', method: 'Needs a second pass', note: 'The quiet option, and the one the budget gates hardest.' },
  { id: 'G-distressed', title: 'Distressed overlay', method: 'Screen w/ halftone' },
  { id: 'G-grid-diagram', title: 'Technical diagram', method: 'DTF only — sub-1pt lines', note: 'The one mark that only the cheapest tier can make.' },
  { id: 'G-embroidered-patch', title: 'Applied patch', method: 'Appliqué — needs the embroidery line' },
  { id: 'G-stripe-panel', title: 'Colour-block panel', method: 'Cut-and-sew' },
  { id: 'G-allover', title: 'All-over pattern', method: 'Sublimation' },
];

export function GraphicsLibrary() {
  // Shared config, not local state — the graphic is part of what gets sent.
  const { config, set } = useLine();
  const sel = config.graphic;
  const setSel = (v: string | null) => set('graphic', v);
  const active = OPTIONS.find((o) => o.id === sel);

  // The budget stop is the gate. Everything below reacts to it.
  const tier = tierIndex(config.budget);
  const stop = STATES[tier];
  const method = METHOD_LABEL[availability(OPTIONS[0].id, tier).method];
  const makeable = producibleCount(
    OPTIONS.map((o) => o.id),
    tier,
  );

  const activeAvail = active ? availability(active.id, tier) : null;

  return (
    <div className="my-4">
      <p className="mb-4 text-[12px] font-mono" style={{ color: 'var(--era-ink-muted)' }}>
        At <span style={{ color: 'var(--accent)' }}>{money(stop.budget)}</span> the budget buys{' '}
        <span style={{ color: 'var(--era-ink)' }}>{method}</span> —{' '}
        <span style={{ color: 'var(--era-ink)' }}>
          {makeable} of these {OPTIONS.length}
        </span>{' '}
        can be made.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-x-3 gap-y-5">
        {OPTIONS.map((o) => {
          const on = sel === o.id;
          const av = availability(o.id, tier);
          // Unmakeable cells stay selectable — the point is to show what the
          // budget costs you, not to hide it. But they read as unavailable.
          const dimmed = !av.ok ? 0.22 : on || !sel ? 1 : 0.4;
          return (
            <button
              key={o.id}
              onClick={() => setSel(on ? null : o.id)}
              aria-pressed={on}
              className="text-left w-full min-w-0 flex flex-col items-stretch group"
            >
              <div
                className="relative w-full aspect-[4/5] overflow-hidden transition-opacity duration-300"
                style={{
                  backgroundColor: 'var(--era-bg-deep)',
                  opacity: dimmed,
                  filter: av.ok ? 'none' : 'grayscale(1)',
                }}
              >
                <Image
                  src={`/blank/${o.id}.webp`}
                  alt={o.title}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover"
                />
              </div>
              <div className="mt-1.5 flex flex-wrap items-baseline gap-x-2">
                <span
                  className="text-[12px]"
                  style={{
                    color: on ? 'var(--accent)' : av.ok ? 'var(--era-ink)' : 'var(--era-ink-muted)',
                  }}
                >
                  {o.title}
                </span>
                {!av.ok && (
                  <span
                    className="text-[10px] font-mono uppercase tracking-wider"
                    style={{ color: av.never ? '#A8456E' : 'var(--era-ink-muted)' }}
                  >
                    {av.never ? 'never' : gateLabel(av.availableAt, tier)}
                  </span>
                )}
              </div>
              <span className="text-[11px] font-mono" style={{ color: 'var(--era-ink-muted)' }}>
                {o.method}
              </span>
            </button>
          );
        })}
      </div>

      <p className="mt-5 text-[13px] max-w-3xl" style={{ color: 'var(--era-ink-body)' }}>
        {activeAvail && !activeAvail.ok ? (
          <>
            <span style={{ color: '#A8456E' }}>{active!.title} cannot be made at {money(stop.budget)}.</span>{' '}
            {activeAvail.reason}
            {activeAvail.availableAt.length > 0 && (
              <>
                {' '}
                Available at{' '}
                {activeAvail.availableAt.map((i) => money(STATES[i].budget)).join(', ')}.
              </>
            )}
          </>
        ) : (
          (active?.note ??
            (active
              ? `${active.title} — makeable in ${method} at this budget.`
              : 'Twelve print languages on one garment. Which of them you can have is decided by the slider above — and it is not simply more as you spend more. Drag to $12k and the numeral, the back panel and the distressed overlay all become unmakeable; drag to $3k and the technical diagram is the only tier that can hold it.'))
        )}
      </p>
    </div>
  );
}
