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
  const totals = useMemo(() => lineTotals(skus), [skus]);
  const clears = totals.blendedMargin >= MARGIN_FLOOR;

  // The first included style is what the identity beats gate against.
  const lead = skus[0]?.tier;
  useEffect(() => {
    if (lead && lead !== config.budget) set('budget', lead);
  }, [lead, config.budget, set]);

  return (
    <div className="my-2">
      <div className="overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0">
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
            {GARMENTS.map((gm) => {
              const idx = rowFor(gm.key);
              const inLine = idx >= 0;
              // An excluded row still previews at the leading tier, so you can see
              // what adding it would cost before you add it.
              const preview: Sku = inLine
                ? skus[idx]
                : { garment: gm.key, tier: config.budget, graphic: config.mark, units: STATES[tierIndex(config.budget)].run };
              const c = costSku(preview);
              const method = TIER_METHOD[tierIndex(preview.tier)];

              return (
                <tr
                  key={gm.key}
                  className="border-b"
                  style={{ borderColor: 'var(--era-hairline)', opacity: inLine ? 1 : 0.45 }}
                >
                  <td className="py-2 pr-3">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={inLine}
                        onChange={() => (inLine ? removeSku(idx) : addSku(preview))}
                        aria-label={`Include ${gm.label} in the line`}
                        className="accent-[var(--accent)]"
                      />
                      <span
                        className="relative shrink-0 overflow-hidden hidden sm:block"
                        style={{ width: 30, height: 30, backgroundColor: 'var(--era-bg-deep)' }}
                      >
                        <Image
                          src={`/blank/P-${gm.key}-plain.webp`}
                          alt=""
                          fill
                          sizes="30px"
                          className="object-cover"
                        />
                      </span>
                      <span style={{ color: 'var(--era-ink)' }}>{gm.label}</span>
                    </label>
                  </td>

                  <td className="py-2 pr-3">
                    <select
                      value={preview.tier}
                      onChange={(e) => (inLine ? setSkuTier(idx, e.target.value) : set('budget', e.target.value))}
                      aria-label={`${gm.label} decoration`}
                      title={METHOD_MEANING[method]}
                      className="bg-transparent border px-1.5 py-1 text-[11px] outline-none focus:border-[var(--accent)]"
                      style={{ borderColor: 'var(--era-hairline)', color: 'var(--era-ink)' }}
                    >
                      {STATES.map((st, n) => (
                        <option key={st.slug} value={st.slug}>
                          {st.treatment[gm.key]} · {METHOD_LABEL[TIER_METHOD[n]]}
                        </option>
                      ))}
                    </select>
                  </td>

                  <td className="py-2 pr-3" style={{ color: 'var(--era-ink-muted)' }}>
                    {c.blank.name}
                  </td>

                  <td className="py-2 pr-3">
                    <select
                      value={preview.units}
                      onChange={(e) => inLine && setSkuUnits(idx, Number(e.target.value) as RunSize)}
                      disabled={!inLine}
                      aria-label={`${gm.label} run size`}
                      className="bg-transparent border px-1.5 py-1 text-[11px] outline-none focus:border-[var(--accent)] disabled:opacity-60"
                      style={{ borderColor: 'var(--era-hairline)', color: 'var(--era-ink)' }}
                    >
                      {RUN_SIZES.map((u) => (
                        <option key={u} value={u}>
                          {u}
                        </option>
                      ))}
                    </select>
                  </td>

                  <td className="py-2 pr-3" style={{ color: 'var(--era-ink)' }}>
                    {dollars(c.variablePerUnit)}
                  </td>

                  <td className="py-2 pr-3">
                    <span style={{ color: 'var(--era-ink-muted)' }}>$</span>
                    <input
                      type="number"
                      min={1}
                      value={c.retail}
                      onChange={(e) => inLine && setSkuRetail(idx, Number(e.target.value) || undefined)}
                      disabled={!inLine}
                      aria-label={`${gm.label} price`}
                      size={1}
                      className="w-14 bg-transparent border-b outline-none tabular-nums focus:border-[var(--accent)] disabled:opacity-60 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      style={{ borderColor: 'var(--era-hairline)', color: 'var(--era-ink)' }}
                    />
                  </td>

                  <td className="py-2" style={{ color: c.margin >= MARGIN_FLOOR ? 'var(--era-ink)' : '#A8456E' }}>
                    {pct(c.margin)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <p className="mt-2 text-[11px]" style={{ color: 'var(--era-ink-muted)' }}>
        Cost per unit excludes setup — digitizing, screens and the woven-label minimum are charged
        once across the collection, so they land in the buy below rather than on every unit. Rows you
        have not ticked are previewed at the leading style&rsquo;s decoration.
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
            <Line label="Units" value={String(totals.totalUnits)} />
            <Line label="Variable" value={money(totals.variableTotal)} />
            <Line label="Setup, paid once" value={money(totals.sharedFixed.total)} />
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
            {totals.fixedSaving > 0 && (
              <p>
                Buying these together saves{' '}
                <strong style={{ color: 'var(--accent)' }}>{money(totals.fixedSaving)}</strong> in
                setup against costing each style on its own. Digitizing is per artwork, the back-neck
                screen is per order, and the 200-piece woven-label minimum is a line minimum — not
                one each.
              </p>
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
