/**
 * The line, as something you could send someone.
 *
 * This slot used to hold a standings board — settled, open, unverified — which
 * is a good way to end an ESSAY and no way at all to end a tool. You worked
 * through seven decisions and arrived at a list of caveats. Nothing was
 * exportable, nothing said "this is the line", and the closest thing to a
 * deliverable was a cost sheet, which is a buy rather than a spec.
 *
 * So it is three things now: the spec, what it costs to sell rather than only to
 * make, and where you would actually order it. The caveats survive at the bottom,
 * where a reader can find them, instead of being the conclusion.
 *
 * ON SOURCING. The blanks are named because the cost model already names them —
 * every price traces to a real product and a source with a confidence mark. The
 * decorators are described by CAPABILITY rather than by company, because this
 * codebase has no verified quote from any print shop and inventing three
 * plausible vendor names would be the least honest thing on the page.
 */

'use client';

import { useMemo } from 'react';
import { useLine } from '@/lib/blank/lineState';
import { GARMENTS, blankFor, costSku, lineTotals, tierIndex, STATES } from '@/lib/blank/line';
import { METHOD_LABEL, TIER_METHOD, METHOD_MEANING } from '@/lib/blank/producible';
import { paletteById } from '@/lib/blank/palettes';
import { sizeBreakdown } from '@/lib/blank/sizes';
import { normalise } from '@/lib/blank/wordmark';
import { CHANNELS, SELL_DEFAULTS, campaign, channelById, sellUnit } from '@/lib/blank/channel';

const money = (n: number) => `$${Math.round(n).toLocaleString('en-US')}`;
const dollars = (n: number) => `$${n.toFixed(2)}`;
const pct = (n: number) => `${(n * 100).toFixed(1)}%`;

export function Standing() {
  const { config, set, skus } = useLine();
  const designs = config.strategy === 'scale' ? config.designs : 1;
  const totals = useMemo(() => lineTotals(skus, designs), [skus, designs]);
  const name = normalise(config.wordmark) || 'BLANK';

  const channel = channelById(config.channel);
  const cac = config.cac;
  const lead = skus[0];
  const leadCost = lead ? costSku(lead, designs) : null;
  const sell = leadCost
    ? sellUnit(leadCost.retail, totals.cogsPerUnit, channel, { cacPerOrder: cac })
    : null;
  const camp = sell ? campaign(totals.totalUnits, cac, sell.contributionBeforeCac) : null;

  if (skus.length === 0) {
    return (
      <p className="text-[13px] py-6" style={{ color: 'var(--accent)' }}>
        Tick a style in the costs section and the spec appears here.
      </p>
    );
  }

  return (
    <div className="my-2 space-y-8">
      {/* THE SPEC — what a factory would be sent. */}
      <section>
        <Head>The spec · {name}</Head>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] border-collapse font-mono text-[12px] tabular-nums">
            <tbody>
              {skus.map((s, i) => {
                const gm = GARMENTS.find((g) => g.key === s.garment);
                const blank = blankFor(s.garment, tierIndex(s.tier));
                const method = TIER_METHOD[tierIndex(s.tier)];
                const run = sizeBreakdown(s.units, s.garment);
                return (
                  <tr key={i} className="border-b align-top" style={{ borderColor: 'var(--era-hairline)' }}>
                    <td className="py-2.5 pr-4" style={{ color: 'var(--era-ink)', width: '7rem' }}>
                      {gm?.label}
                    </td>
                    <td className="py-2.5" style={{ color: 'var(--era-ink-muted)' }}>
                      <span className="block" style={{ color: 'var(--era-ink)' }}>
                        {blank.name}
                      </span>
                      <span className="block" title={METHOD_MEANING[method]}>
                        {METHOD_LABEL[method]} · {STATES[tierIndex(s.tier)].treatment[s.garment]}
                      </span>
                      <span className="block">
                        {s.colours
                          .map((c) => paletteById(c)?.name ?? c)
                          .join(', ')}{' '}
                        — {s.units} each
                      </span>
                      <span className="block">{run.map((r) => `${r.size} ${r.qty}`).join('  ')}</span>
                    </td>
                    <td className="py-2.5 pl-4 text-right" style={{ color: 'var(--era-ink)' }}>
                      {s.units * s.colours.length * designs}
                      <span className="block" style={{ color: 'var(--era-ink-muted)' }}>
                        pieces
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="mt-2 text-[12px]" style={{ color: 'var(--era-ink-muted)' }}>
          {money(totals.totalCost)} to make · {totals.totalUnits} pieces · {dollars(totals.cogsPerUnit)}{' '}
          each
          {designs > 1 && ` · ${designs} designs`}
        </p>
      </section>

      {/* WHAT IT COSTS TO SELL — the half the model never had. */}
      <section>
        <Head>Selling it</Head>
        <div className="flex flex-wrap gap-1.5 mb-3">
          {CHANNELS.map((c) => {
            const on = c.id === channel.id;
            return (
              <button
                key={c.id}
                onClick={() => set('channel', c.id)}
                aria-pressed={on}
                className="tap px-2.5 py-1 text-[12px] sm:text-[11px] font-mono uppercase tracking-wider border-b-2"
                style={{
                  borderColor: on ? 'var(--accent)' : 'transparent',
                  color: on ? 'var(--accent)' : 'var(--era-ink-muted)',
                  minHeight: 0,
                }}
              >
                {c.label}
              </button>
            );
          })}
        </div>
        <p className="text-[12px] mb-4" style={{ color: 'var(--era-ink-muted)' }}>
          {channel.note}
        </p>

        {channel.paidAcquisition && (
          <label className="flex items-center gap-3 mb-4 max-w-md">
            <span
              className="text-[11px] sm:text-[10px] font-mono uppercase tracking-[0.2em] shrink-0"
              style={{ color: 'var(--era-ink-muted)', width: '7rem' }}
            >
              Cost per order
            </span>
            <input
              type="range"
              min={0}
              max={40}
              value={cac}
              onChange={(e) => set('cac', Number(e.target.value))}
              className="tap flex-1 min-w-0 accent-[var(--accent)]"
              style={{ minHeight: 0 }}
            />
            <span
              className="text-[12px] font-mono tabular-nums shrink-0 text-right"
              style={{ color: 'var(--era-ink)', width: '3rem' }}
            >
              ${cac}
            </span>
          </label>
        )}

        {sell && leadCost && (
          <dl className="font-mono text-[12px] tabular-nums space-y-1.5 max-w-md">
            <Row label="Price" value={dollars(leadCost.retail)} />
            <Row label="Cost to make" value={`−${dollars(totals.cogsPerUnit)}`} />
            <Row label="Fees" value={`−${dollars(sell.fees)}`} />
            {sell.fulfilment > 0 && <Row label="Post and returns" value={`−${dollars(sell.fulfilment)}`} />}
            <Row label="Left per sale" value={dollars(sell.contributionBeforeCac)} strong />
            {channel.paidAcquisition && (
              <>
                <Row label="Ads" value={`−${dollars(cac)}`} />
                <Row
                  label="Keeps"
                  value={`${dollars(sell.contribution)} · ${pct(sell.contributionMargin)}`}
                  strong
                  alert={sell.underwater}
                />
              </>
            )}
          </dl>
        )}

        {sell && channel.paidAcquisition && (
          <p
            className="mt-3 text-[13px] max-w-xl"
            style={{ color: sell.underwater ? '#A8456E' : 'var(--era-ink-body)' }}
          >
            {sell.underwater ? (
              <>
                Every sale loses {dollars(-sell.contribution)}. You cannot pay more than{' '}
                <strong>{dollars(sell.breakEvenCac)}</strong> for an order at this price.
              </>
            ) : (
              <>
                Break even at <strong>{dollars(sell.breakEvenCac)}</strong> an order.
                {camp && camp.spend > 0 && (
                  <>
                    {' '}
                    Selling all {totals.totalUnits} costs {money(camp.spend)} in ads and keeps{' '}
                    {money(camp.net)}.
                  </>
                )}
              </>
            )}
          </p>
        )}
      </section>

      {/* WHERE TO ORDER — named where the model names them, described where it cannot. */}
      <section>
        <Head>Where to order</Head>
        <ul className="space-y-2 text-[13px]" style={{ color: 'var(--era-ink-body)' }}>
          {[...new Set(skus.map((s) => blankFor(s.garment, tierIndex(s.tier)).id))].map((id) => {
            const b = Object.values(
              skus.map((s) => blankFor(s.garment, tierIndex(s.tier))),
            ).find((x) => x.id === id)!;
            return (
              <li key={id}>
                <strong style={{ color: 'var(--era-ink)' }}>{b.name}</strong>{' '}
                <span style={{ color: 'var(--era-ink-muted)' }}>
                  — {b.confidence === 'hard' ? 'priced from a live trade listing' : 'price derived, get a quote'}
                  {b.note ? `. ${b.note}` : ''}
                </span>
              </li>
            );
          })}
          <li style={{ color: 'var(--era-ink-muted)' }}>
            A decorator who can do{' '}
            <strong style={{ color: 'var(--era-ink)' }}>
              {[...new Set(skus.map((s) => METHOD_LABEL[TIER_METHOD[tierIndex(s.tier)]]))].join(' and ')}
            </strong>{' '}
            at these run sizes. No shop is named — nothing here is a quote. Get three.
          </li>
        </ul>
      </section>

      <section>
        <Head>Before you believe any of it</Head>
        <ul className="space-y-1.5 text-[13px]" style={{ color: 'var(--era-ink-body)' }}>
          <li>Every image here is generated. None is a photograph of product that exists.</li>
          <li>Blank prices are trade listings or derived; decoration and shipping are estimates.</li>
          <li>The size curve is an assumption about demand, not a fact about your customers.</li>
          <li>Nothing is ordered, no tech pack exists, no supplier has been contacted.</li>
        </ul>
      </section>
    </div>
  );
}

function Head({ children }: { children: React.ReactNode }) {
  return (
    <h3
      className="text-[11px] sm:text-[10px] font-mono uppercase tracking-[0.2em] pb-2 mb-3 border-b"
      style={{ color: 'var(--era-ink)', borderColor: 'var(--era-hairline)' }}
    >
      {children}
    </h3>
  );
}

function Row({
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
      <dd style={{ color: alert ? '#A8456E' : 'var(--era-ink)', fontWeight: strong ? 600 : 400 }}>
        {value}
      </dd>
    </div>
  );
}
