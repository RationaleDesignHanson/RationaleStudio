/**
 * The fork, before anything else.
 *
 * WHY THIS IS FIRST. The tool used to assume one business: a few styles, one
 * identity, deep runs, high margin. Every default in it — three garments, one
 * mark, a shared setup cost that amortises — encoded that assumption without
 * ever stating it. Then the brief arrived for the other business: a shirt for
 * every rest stop, every exit, every town, micro-targeted by geography and
 * interest. Nothing in the model could represent it, and worse, the cost sheet
 * would have LIED about it — it prints "buying these together saves $X in
 * setup", which is true of one artwork across three garments and false of forty
 * artworks across three garments.
 *
 * So it is a choice, and it is the first one, because it decides the answer to
 * every question after it: which decoration methods are affordable, how deep the
 * runs are, how many artworks get made, and whether a collection discount
 * exists at all.
 *
 * THE NON-OBVIOUS PART, which is the same shape as the rest of this page's
 * argument: the catalogue business can only be done on the CHEAPEST decoration.
 * A screen is cut per colour per design, so forty designs is forty setups and
 * the fixed cost grows with the catalogue forever. Heat-press has no setup, so
 * the fortieth design costs what the first one did. Quiet is expensive and loud
 * is cheap, applied to variety instead of finish.
 */

'use client';

import { useLine } from '@/lib/blank/lineState';
import type { Strategy } from '@/lib/blank/lineState';

const OPTIONS: {
  id: Strategy;
  title: string;
  line: string;
  defaults: { budget: string; designs: number };
}[] = [
  {
    id: 'considered',
    title: 'Small batch',
    line: 'A few styles, one design, made well. Setup is paid once.',
    defaults: { budget: 'stitched', designs: 1 },
  },
  {
    id: 'scale',
    title: 'High scale',
    line: 'A design per place, sold thin and wide. Setup is paid every time.',
    defaults: { budget: 'graphic', designs: 24 },
  },
];

export function StrategyStep() {
  const { config, set, setImplied, clearSkus } = useLine();

  const choose = (o: (typeof OPTIONS)[number]) => {
    // Only rewrite the downstream defaults when the business actually CHANGES.
    // Clicking the already-selected card looks like a no-op and was quietly
    // jumping the budget from the $3k tier to the $12k one, re-costing every
    // row and re-gating every mark.
    if (config.strategy === o.id) return;
    set('strategy', o.id);
    // A consequence of the business, not a separate decision.
    setImplied('budget', o.defaults.budget);
    set('designs', o.defaults.designs);
    // The cost sheet takes its gate from the first included row, so a line
    // specced under the other business would immediately overwrite the budget
    // this choice just set — the card says "heat-press only" and the tool would
    // put embroidery straight back without saying so.
    clearSkus();
  };

  return (
    <div className="mb-8">
      <p
        className="text-[11px] font-mono uppercase tracking-[0.2em] mb-3"
        style={{ color: 'var(--era-ink-muted)' }}
      >
        Which business
      </p>

      <div className="grid gap-3 sm:grid-cols-2">
        {OPTIONS.map((o) => {
          const on = config.strategy === o.id;
          return (
            <button
              key={o.id}
              onClick={() => choose(o)}
              aria-pressed={on}
              className="text-left border p-4 transition-colors"
              style={{
                borderColor: on ? 'var(--accent)' : 'var(--era-hairline)',
                backgroundColor: on ? 'color-mix(in srgb, var(--accent) 5%, transparent)' : 'transparent',
                // The global button rule is `inline-flex; align-items: center`,
                // which lays a card's title, line and facts out in a ROW and
                // vertically centres them. Every stacked control on this page has
                // to opt out of it explicitly.
                display: 'block',
                minHeight: 0,
              }}
            >
              <span
                className="font-display block"
                style={{ fontSize: '1.15rem', color: on ? 'var(--accent)' : 'var(--era-ink)' }}
              >
                {o.title}
              </span>
              <span className="block text-[13px] mt-0.5" style={{ color: 'var(--era-ink-body)' }}>
                {o.line}
              </span>
            </button>
          );
        })}
      </div>

      {config.strategy === 'scale' && (
        <div className="mt-4 flex flex-wrap items-baseline gap-x-3 gap-y-2">
          <label
            className="text-[11px] font-mono uppercase tracking-[0.2em]"
            htmlFor="designs"
            style={{ color: 'var(--era-ink-muted)' }}
          >
            How many places
          </label>
          <input
            id="designs"
            type="number"
            min={1}
            max={500}
            value={config.designs}
            onChange={(e) =>
              set('designs', Math.min(500, Math.max(1, Math.floor(Number(e.target.value) || 1))))
            }
            size={1}
            className="tap w-20 py-1 px-1.5 bg-transparent border outline-none font-mono text-[13px] tabular-nums focus:border-[var(--accent)] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            style={{ borderColor: 'var(--era-hairline)', color: 'var(--era-ink)' }}
          />
          <span className="text-[12px]" style={{ color: 'var(--era-ink-muted)' }}>
            Two per state is {2 * 50}.
          </span>
        </div>
      )}
    </div>
  );
}
