/**
 * The cost sheet — what you are making, specced style by style.
 *
 * WHAT WAS WRONG. The costing beat had one global budget slider, and "Your line"
 * was a tray you added things to: set a garment and a tier above, press Add, and
 * the SKU inherited whatever the slider was on. Two problems in one.
 *
 * A line is not costed by setting one tier for everything. You spec each style —
 * a tee can carry a cheap print while the hoodie takes the embroidered mark, and
 * that is a completely normal line, not an edge case. A global tier makes that
 * unrepresentable.
 *
 * And the tray was confusing because it was INDIRECT. The controls that decided a
 * SKU were somewhere else, the Add button committed a hidden state, and what you
 * got was a list of things you had already decided rather than the decision
 * itself. Nothing on screen said "this is what you are making".
 *
 * So it is a sheet. Three rows because there are three garments; each row is
 * included or not, and carries its own decoration, run and price. The totals are
 * underneath. That is what a line plan looks like on paper, and it makes the one
 * genuinely counter-intuitive fact in the model visible: buying as a collection
 * is cheaper than the sum of its styles, because setup is paid once.
 *
 * THE LEADING STYLE SETS THE GATE. The identity beats need a budget to gate marks
 * and treatments against, and the global slider was where that came from. It now
 * comes from the first included row, so the thing gating your marks is a style you
 * actually specced rather than an abstract ambition set on another screen.
 */

'use client';

import Image from 'next/image';
import { useEffect, useMemo } from 'react';
import { useLine } from '@/lib/blank/lineState';
import {
  costSku,
  lineTotals,
  GARMENTS,
  STATES,
  tierIndex,
  type Sku,
} from '@/lib/blank/line';
import { RUN_SIZES, MARGIN_FLOOR, type RunSize } from '@/lib/blank/economics';
import { METHOD_LABEL, METHOD_MEANING, TIER_METHOD } from '@/lib/blank/producible';

const dollars = (n: number) => `$${n.toFixed(2)}`;
const money = (n: number) => `$${Math.round(n).toLocaleString('en-US')}`;
const pct = (n: number) => `${(n * 100).toFixed(1)}%`;

export function CostSheet() {
  const { config, set, skus, addSku, removeSku, setSkuUnits, setSkuTier, setSkuRetail } = useLine();

  const rowFor = (garment: string) => skus.findIndex((s) => s.garment === garment);
  // The catalogue multiplier. A row is priced PER DESIGN; the totals carry the
  // count, so a 40-place line does not print 120 rows to say one thing.
  const designs = config.strategy === 'scale' ? config.designs : 1;
  const totals = useMemo(() => lineTotals(skus, designs), [skus, designs]);
  const clears = totals.blendedMargin >= MARGIN_FLOOR;

  // The first included style is what the identity beats gate against.
  const lead = skus[0]?.tier;
  useEffect(() => {
    if (lead && lead !== config.budget) set('budget', lead);
  }, [lead, config.budget, set]);

  // Built once and rendered twice — as a table on a real screen, as cards on a
  // phone. Seven columns of live controls forced the table to 931px inside a
  // 390px viewport, so a style's price and its margin could not be on screen at
  // the same time. Same data, same handlers, two shapes.
  const rows = GARMENTS.map((gm) => {
    const idx = rowFor(gm.key);
    const inLine = idx >= 0;
    // An excluded row still previews at the leading tier, so you can see what
    // adding it would cost before you add it.
    const preview: Sku = inLine
      ? skus[idx]
      : {
          garment: gm.key,
          tier: config.budget,
          graphic: config.mark,
          // A catalogue runs shallow on each place; a considered line runs deep
          // on a few styles. Same control, different sane starting point.
          units: config.strategy === 'scale' ? 25 : STATES[tierIndex(config.budget)].run,
        };
    return { gm, idx, inLine, preview, c: costSku(preview) };
  });
  type Row = (typeof rows)[number];

  // Plain render functions, NOT components. Declared inside CostSheet they would
  // be a new component type on every render, so React would unmount and remount
  // the price field between keystrokes and the caret would jump out of it after
  // every digit. Calling them returns the same JSX with no component identity to
  // churn — the alternative is hoisting them and threading eight handlers.
  const include = ({ gm, idx, inLine, preview }: Row) => (
    <label className="tap flex items-center gap-2 cursor-pointer">
      <input
        type="checkbox"
        checked={inLine}
        onChange={() => (inLine ? removeSku(idx) : addSku(preview))}
        aria-label={`Include ${gm.label} in the line`}
        className="tap w-[15px] h-[15px] shrink-0 accent-[var(--accent)]"
      />
      <span
        className="relative shrink-0 overflow-hidden"
        style={{ width: 30, height: 30, backgroundColor: 'var(--era-bg-deep)' }}
      >
        <Image src={`/blank/P-${gm.key}-plain.webp`} alt="" fill sizes="30px" className="object-cover" />
      </span>
      <span style={{ color: 'var(--era-ink)' }}>{gm.label}</span>
    </label>
  );

  const decoration = ({ gm, idx, inLine, preview }: Row) => (
    <select
      value={preview.tier}
      onChange={(e) => (inLine ? setSkuTier(idx, e.target.value) : set('budget', e.target.value))}
      aria-label={`${gm.label} decoration`}
      title={METHOD_MEANING[TIER_METHOD[tierIndex(preview.tier)]]}
      className="w-full min-w-0 bg-transparent border px-1.5 py-1 text-[12px] sm:text-[11px] outline-none focus:border-[var(--accent)]"
      style={{ borderColor: 'var(--era-hairline)', color: 'var(--era-ink)' }}
    >
      {STATES.map((st, n) => (
        <option key={st.slug} value={st.slug}>
          {METHOD_LABEL[TIER_METHOD[n]]} · {st.treatment[gm.key]}
        </option>
      ))}
    </select>
  );

  const units = ({ gm, idx, inLine, preview }: Row) => (
    <select
      value={preview.units}
      onChange={(e) => inLine && setSkuUnits(idx, Number(e.target.value) as RunSize)}
      disabled={!inLine}
      aria-label={`${gm.label} run size`}
      className="bg-transparent border px-1.5 py-1 text-[12px] sm:text-[11px] outline-none focus:border-[var(--accent)] disabled:opacity-60"
      style={{ borderColor: 'var(--era-hairline)', color: 'var(--era-ink)' }}
    >
      {RUN_SIZES.map((u) => (
        <option key={u} value={u}>
          {u}
        </option>
      ))}
    </select>
  );

  const price = ({ gm, idx, inLine, c }: Row) => (
    <span className="whitespace-nowrap">
      <span style={{ color: 'var(--era-ink-muted)' }}>$</span>
      <input
        type="number"
        min={1}
        value={c.retail}
        onChange={(e) => inLine && setSkuRetail(idx, Number(e.target.value) || undefined)}
        disabled={!inLine}
        aria-label={`${gm.label} price`}
        size={1}
        className="tap w-14 py-1 bg-transparent border-b outline-none tabular-nums focus:border-[var(--accent)] disabled:opacity-60 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        style={{ borderColor: 'var(--era-hairline)', color: 'var(--era-ink)' }}
      />
    </span>
  );

  const marginColour = (m: number) => (m >= MARGIN_FLOOR ? 'var(--era-ink)' : '#A8456E');

  return (
    <div className="my-2">
      {/* PHONE — one card per style, so cost, price and margin are all on screen. */}
      <div className="sm:hidden font-mono text-[13px] tabular-nums space-y-3">
        {rows.map((r) => (
          <div
            key={r.gm.key}
            className="border p-3"
            style={{ borderColor: 'var(--era-hairline)', opacity: r.inLine ? 1 : 0.55 }}
          >
            {include(r)}
            <div className="mt-3 grid grid-cols-[auto_minmax(0,1fr)] gap-x-3 gap-y-2 items-center">
              <Field label="Decoration" />
              {decoration(r)}
              <Field label="Blank" />
              <span className="truncate" style={{ color: 'var(--era-ink-muted)' }}>
                {r.c.blank.name}
              </span>
              <Field label="Units" />
              <span>
                {units(r)}
              </span>
              <Field label="Cost/unit" />
              <span style={{ color: 'var(--era-ink)' }}>{dollars(r.c.variablePerUnit)}</span>
              <Field label="Price" />
              {price(r)}
              <Field label="Margin" />
              <span style={{ color: marginColour(r.c.margin) }}>{pct(r.c.margin)}</span>
            </div>
          </div>
        ))}
      </div>

      {/* DESKTOP — the sheet as a sheet. */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full min-w-[720px] border-collapse font-mono text-[12px] tabular-nums">
          <thead>
            <tr style={{ color: 'var(--era-ink-muted)' }}>
              {['Style', 'Decoration', 'Blank', 'Units', 'Cost/unit', 'Price', 'Margin'].map((h) => (
                <th
                  key={h}
                  className="text-left font-normal text-[10px] uppercase tracking-[0.15em] pb-2 border-b"
                  style={{ borderColor: 'var(--era-hairline)' }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr
                key={r.gm.key}
                className="border-b"
                style={{ borderColor: 'var(--era-hairline)', opacity: r.inLine ? 1 : 0.45 }}
              >
                <td className="py-2 pr-3">
                  {include(r)}
                </td>
                <td className="py-2 pr-3">
                  {decoration(r)}
                </td>
                <td className="py-2 pr-3" style={{ color: 'var(--era-ink-muted)' }}>
                  {r.c.blank.name}
                </td>
                <td className="py-2 pr-3">
                  {units(r)}
                </td>
                <td className="py-2 pr-3" style={{ color: 'var(--era-ink)' }}>
                  {dollars(r.c.variablePerUnit)}
                </td>
                <td className="py-2 pr-3">
                  {price(r)}
                </td>
                <td className="py-2" style={{ color: marginColour(r.c.margin) }}>
                  {pct(r.c.margin)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-2 text-[11px]" style={{ color: 'var(--era-ink-muted)' }}>
        Cost per unit excludes setup — digitizing, screens and the woven-label minimum land in the
        buy below rather than on every unit.{' '}
        {designs > 1
          ? 'They are charged per design, not once.'
          : 'They are charged once across the collection.'}{' '}
        Rows you have not ticked are previewed at the leading style&rsquo;s decoration.
        {designs > 1 && (
          <> Every figure in a row is <strong>per place</strong>; the totals below carry all {designs}.</>
        )}
      </p>

      {skus.length === 0 ? (
        <p className="mt-5 text-[13px]" style={{ color: 'var(--accent)' }}>
          Nothing in the line yet — tick a style above.
        </p>
      ) : (
        <div
          className="mt-6 border-t pt-4 grid sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-x-8 gap-y-2"
          style={{ borderColor: 'var(--era-hairline)' }}
        >
          <dl className="font-mono text-[12px] tabular-nums space-y-1.5">
            <Line
              label={designs > 1 ? `Units · ${designs} places` : 'Units'}
              value={String(totals.totalUnits)}
            />
            <Line label="Variable" value={money(totals.variableTotal)} />
            {/* Not simply "paid N×": the neck screen is the house brand and is
                charged once however many designs hang off it, so the label would
                overstate what happened to that $25. */}
            <Line
              label={
                designs > 1
                  ? totals.sharedFixed.neckSetup > 0
                    ? `Setup · ${designs}× + neck once`
                    : `Setup, paid ${designs}×`
                  : 'Setup, paid once'
              }
              value={money(totals.sharedFixed.total)}
            />
            <Line label="Total buy" value={money(totals.totalCost)} strong />
            <Line label="COGS / unit" value={dollars(totals.cogsPerUnit)} />
            <Line label="Revenue at list" value={money(totals.totalRevenue)} />
            <Line
              label="Blended margin"
              value={pct(totals.blendedMargin)}
              strong
              alert={!clears}
            />
          </dl>

          <div className="text-[12px]" style={{ color: 'var(--era-ink-body)' }}>
            {designs > 1 ? (
              <p>
                <strong style={{ color: 'var(--era-ink)' }}>
                  Setup is paid {designs} times, not once.
                </strong>{' '}
                A collection discount is a property of ONE artwork across several styles. This is{' '}
                {designs} artworks, and a screen is cut per colour per design — so the fixed cost
                grows with the catalogue instead of amortising against it. Setup here is{' '}
                <strong style={{ color: totals.sharedFixed.total > 0 ? '#A8456E' : 'var(--accent)' }}>
                  {money(totals.sharedFixed.total)}
                </strong>
                {totals.sharedFixed.total === 0
                  ? ' — which is the entire reason a line this wide is possible at all. Heat-press has no screen to make, so the ' +
                    designs +
                    'th design costs what the first one did.'
                  : ' before a single garment is bought. Move every row to heat-press and it goes to zero.'}
              </p>
            ) : (
              totals.fixedSaving > 0 && (
                <p>
                  Buying these together saves{' '}
                  <strong style={{ color: 'var(--accent)' }}>{money(totals.fixedSaving)}</strong> in
                  setup against costing each style on its own. Digitizing is per artwork, the
                  back-neck screen is per order, and the 200-piece woven-label minimum is a line
                  minimum — not one each.
                </p>
              )
            )}
            {!clears && (
              <p className="mt-2" style={{ color: '#A8456E' }}>
                Below the {pct(MARGIN_FLOOR)} floor. Needs {money(totals.minRevenueForFloor)} of
                revenue at this cost — raise a price, cut a style, or run deeper.
              </p>
            )}
            <p className="mt-2 text-[11px]" style={{ color: 'var(--era-ink-muted)' }}>
              Stage 0 blanks only. No hero, no duty — blanks land already imported. Figures carry the
              confidence marks used throughout.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

/** A card row's label. Uppercase mono, matching the table head it replaces. */
function Field({ label }: { label: string }) {
  return (
    <span
      className="text-[11px] uppercase tracking-[0.15em]"
      style={{ color: 'var(--era-ink-muted)' }}
    >
      {label}
    </span>
  );
}

function Line({
  label,
  value,
  strong,
  alert,
}: {
  label: string;
  value: string;
  strong?: boolean;
  alert?: boolean;
}) {
  return (
    <div className="flex justify-between gap-4 border-b pb-1" style={{ borderColor: 'var(--era-hairline)' }}>
      <dt style={{ color: 'var(--era-ink-muted)' }}>{label}</dt>
      <dd
        style={{
          color: alert ? '#A8456E' : 'var(--era-ink)',
          fontWeight: strong ? 600 : 400,
        }}
      >
        {value}
      </dd>
    </div>
  );
}
