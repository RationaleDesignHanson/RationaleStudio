/**
 * The line tray — what a partner is actually being asked to buy.
 *
 * The lever answers "what does one garment at this budget look like". This
 * answers "what does the collection cost", which is the question that decides
 * whether anyone writes a cheque.
 *
 * Costs come from `lineTotals`, which charges fixed setups ONCE at line level
 * rather than once per SKU. That difference is surfaced rather than hidden — it
 * is the single most persuasive number here, and burying it would make the tray
 * look like it was just adding up the lever.
 */

'use client';

import { useMemo } from 'react';
import Image from 'next/image';
import { Plus, X } from 'lucide-react';
import { useLine } from '@/lib/blank/lineState';
import { lineTotals, STATES, GARMENTS, tierIndex, type Sku } from '@/lib/blank/line';
import { RUN_SIZES, MARGIN_FLOOR, type RunSize } from '@/lib/blank/economics';

const money = (n: number) =>
  `$${n.toLocaleString('en-US', { maximumFractionDigits: 0 })}`;
const dollars = (n: number) => `$${n.toFixed(2)}`;
const pct = (n: number) => `${(n * 100).toFixed(1)}%`;

const skuLabel = (s: Sku) => {
  const g = GARMENTS.find((x) => x.key === s.garment)?.label ?? s.garment;
  const t = STATES[tierIndex(s.tier)];
  return `${g} · ${t.label}`;
};

/** The plate the lever is showing for this tier + garment. */
const plateFor = (s: Sku) =>
  `/blank/${STATES[tierIndex(s.tier)].tierSlug.replace('{g}', s.garment)}.webp`;

export function LineTray() {
  const { config, skus, addSku, removeSku, setSkuUnits, clearSkus } = useLine();

  const totals = useMemo(() => lineTotals(skus), [skus]);

  const current: Sku = {
    garment: config.garment,
    tier: config.budget,
    graphic: config.graphic,
    units: STATES[tierIndex(config.budget)].run,
  };

  const alreadyIn = skus.some(
    (s) => s.garment === current.garment && s.tier === current.tier && s.graphic === current.graphic,
  );

  const clears = totals.blendedMargin >= MARGIN_FLOOR;

  return (
    <div className="my-4">
      <div className="flex flex-wrap items-center gap-3 mb-5">
        <button
          onClick={() => addSku(current)}
          disabled={alreadyIn}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-mono uppercase tracking-wider border transition-colors disabled:opacity-40"
          style={{
            borderColor: alreadyIn ? 'var(--era-hairline)' : 'var(--accent)',
            color: alreadyIn ? 'var(--era-ink-muted)' : 'var(--accent)',
          }}
        >
          <Plus className="w-3 h-3" />
          {alreadyIn ? 'Already in the line' : `Add ${skuLabel(current)}`}
        </button>
        {skus.length > 0 && (
          <button
            onClick={clearSkus}
            className="text-[11px] font-mono uppercase tracking-wider transition-colors hover:text-[var(--accent)]"
            style={{ color: 'var(--era-ink-muted)' }}
          >
            Clear
          </button>
        )}
      </div>

      {skus.length === 0 ? (
        <p className="text-[13px] max-w-2xl" style={{ color: 'var(--era-ink-muted)' }}>
          Nothing in the line yet. Set a garment and a budget stop above, add it here, and the
          collection gets costed as one buy — which is cheaper than the sum of its SKUs, because the
          setup fees are paid once.
        </p>
      ) : (
        <div className="grid lg:grid-cols-[1fr_320px] gap-8 items-start">
          {/* The SKUs */}
          <ul className="space-y-2">
            {totals.items.map((it, idx) => (
              <li
                key={`${it.sku.garment}-${it.sku.tier}-${it.sku.graphic}-${idx}`}
                className="flex items-center gap-3 py-2 border-b"
                style={{ borderColor: 'var(--era-hairline)' }}
              >
                <div
                  className="relative w-12 h-14 shrink-0 overflow-hidden"
                  style={{ backgroundColor: 'var(--era-bg-deep)' }}
                >
                  <Image
                    src={plateFor(it.sku)}
                    alt=""
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="text-[13px] truncate" style={{ color: 'var(--era-ink)' }}>
                    {skuLabel(it.sku)}
                  </div>
                  <div
                    className="text-[11px] font-mono truncate"
                    style={{ color: 'var(--era-ink-muted)' }}
                  >
                    {it.blank.name} · {it.state.treatment[it.sku.garment]}
                  </div>
                </div>

                <label className="shrink-0">
                  <span className="sr-only">Units for {skuLabel(it.sku)}</span>
                  <select
                    value={it.sku.units}
                    onChange={(e) => setSkuUnits(idx, Number(e.target.value) as RunSize)}
                    className="bg-transparent text-[11px] font-mono border px-1.5 py-1"
                    style={{ borderColor: 'var(--era-hairline)', color: 'var(--era-ink)' }}
                  >
                    {RUN_SIZES.map((n) => (
                      <option key={n} value={n}>
                        {n} u
                      </option>
                    ))}
                  </select>
                </label>

                <div className="shrink-0 w-20 text-right">
                  <div className="text-[12px] font-mono" style={{ color: 'var(--era-ink)' }}>
                    {dollars(it.variablePerUnit)}
                  </div>
                  <div className="text-[10px] font-mono" style={{ color: 'var(--era-ink-muted)' }}>
                    per unit
                  </div>
                </div>

                <button
                  onClick={() => removeSku(idx)}
                  aria-label={`Remove ${skuLabel(it.sku)}`}
                  className="shrink-0 p-1 transition-colors hover:text-[var(--accent)]"
                  style={{ color: 'var(--era-ink-muted)' }}
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </li>
            ))}
          </ul>

          {/* The buy */}
          <div
            className="p-4 border"
            style={{ borderColor: 'var(--era-hairline)', backgroundColor: 'var(--era-bg-deep)' }}
          >
            <div className="text-[11px] font-mono uppercase tracking-[0.2em] mb-3" style={{ color: 'var(--era-ink-muted)' }}>
              The buy
            </div>

            <dl className="space-y-1.5 text-[12px] font-mono">
              <Row label="Units" value={String(totals.totalUnits)} />
              <Row label="Variable" value={money(totals.variableTotal)} />
              <Row label="Setup, paid once" value={money(totals.sharedFixed.total)} />
              <Row label="Total buy" value={money(totals.totalCost)} strong />
              <Row label="COGS / unit" value={dollars(totals.cogsPerUnit)} />
              <Row label="Revenue at list" value={money(totals.totalRevenue)} />
              <Row
                label="Blended margin"
                value={pct(totals.blendedMargin)}
                strong
                tone={clears ? 'var(--accent)' : '#A8456E'}
              />
            </dl>

            {totals.fixedSaving > 0 && (
              <p className="mt-3 pt-3 border-t text-[11px]" style={{ borderColor: 'var(--era-hairline)', color: 'var(--era-ink-body)' }}>
                Buying these together saves{' '}
                <strong style={{ color: 'var(--accent)' }}>{money(totals.fixedSaving)}</strong> in
                setup. Digitizing is per artwork, the back-neck screen is per order, and the
                200-piece woven-label minimum is a line minimum — not one each.
              </p>
            )}

            {!clears && totals.totalUnits > 0 && (
              <p className="mt-3 text-[11px]" style={{ color: '#A8456E' }}>
                Below the {pct(MARGIN_FLOOR)} floor. Needs {money(totals.minRevenueForFloor)} of
                revenue at this cost — raise list, cut a SKU, or run deeper.
              </p>
            )}

            <p className="mt-3 text-[10px]" style={{ color: 'var(--era-ink-muted)' }}>
              Stage 0 blanks only. No hero, no duty — blanks land already imported. Figures carry
              the confidence marks used throughout.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

function Row({
  label,
  value,
  strong,
  tone,
}: {
  label: string;
  value: string;
  strong?: boolean;
  tone?: string;
}) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <dt style={{ color: 'var(--era-ink-muted)' }}>{label}</dt>
      <dd
        style={{
          color: tone ?? (strong ? 'var(--era-ink)' : 'var(--era-ink-body)'),
          fontWeight: strong ? 600 : 400,
        }}
      >
        {value}
      </dd>
    </div>
  );
}
