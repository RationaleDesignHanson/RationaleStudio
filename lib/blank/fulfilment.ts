/**
 * Buy the stock, or make it when someone orders.
 *
 * THE TOOL ONLY KNEW ONE OF THESE, and it was the wrong one for the business it
 * was extended to describe. "A shirt per rest stop, micro-targeted" defaulted to
 * 24 places × 25 units × three garments — 1,800 pieces bought speculatively, on
 * designs no customer has seen, for roughly forty thousand dollars of cash
 * converted into cartons.
 *
 * That is small-batch logic wearing a bigger number, and small-batch logic is
 * exactly wrong here: the whole premise of a wide catalogue is that you do not
 * know which places will sell, so committing depth to all of them defeats the
 * strategy. The real version of this business is make-to-order — it is what
 * every tourist shop and every Merch-by-Amazon seller runs on — and the method
 * this tool already identifies as the only one that survives a wide catalogue,
 * heat-press film, IS the print-on-demand technology.
 *
 * So it is a switch, because it is the decision, not an assumption.
 *
 * WHAT CHANGES:
 *   Buying ahead    cheaper per piece, all the cash up front, and you carry
 *                   whatever does not sell.
 *   Made to order   dearer per piece, no cash up front, nothing unsold, and no
 *                   setup at all — there are no screens to cut for a job of one.
 *
 * CONFIDENCE: soft. These are print-on-demand list prices of the Printful class
 * including the blank, the print and handling, before any volume discount. Get
 * your own before you decide anything on them.
 */

import type { Garment } from './line';

/** All-in cost of one made-to-order piece, printed, before shipping. */
export const POD_UNIT: Record<Garment, number> = {
  tee: 13.0,
  hoodie: 28.0,
  cap: 18.0,
};

export type Fulfilment = 'buy' | 'pod';

export interface Comparison {
  /** Cash you must find before you sell anything. */
  upfront: number;
  /** Cost of the pieces you actually sell. */
  costOfSales: number;
  /** Money in pieces nobody buys. Zero when nothing is made in advance. */
  stranded: number;
  /** Revenue less every cost, once the season is over. */
  profit: number;
  perUnit: number;
}

/**
 * The two routes, on the same line and the same demand.
 *
 * `unitsSold` and `revenue` come from the sell-through model, so both routes are
 * judged against the same season — which is the only way the comparison means
 * anything. Buying ahead makes `unitsMade`; made-to-order makes `unitsSold`, and
 * that difference is the entire argument.
 */
export function compareFulfilment(
  unitsMade: number,
  unitsSold: number,
  revenue: number,
  buyCostPerUnit: number,
  buySetup: number,
  podCostPerUnit: number,
): Record<Fulfilment, Comparison> {
  const buyTotal = unitsMade * buyCostPerUnit + buySetup;
  return {
    buy: {
      upfront: buyTotal,
      costOfSales: unitsSold * buyCostPerUnit,
      stranded: (unitsMade - unitsSold) * buyCostPerUnit,
      profit: revenue - buyTotal,
      perUnit: buyCostPerUnit,
    },
    pod: {
      // Nothing is bought until something is sold, so there is no cheque to
      // write and nothing to be left holding.
      upfront: 0,
      costOfSales: unitsSold * podCostPerUnit,
      stranded: 0,
      profit: revenue - unitsSold * podCostPerUnit,
      perUnit: podCostPerUnit,
    },
  };
}

/** Blended made-to-order cost across a line, weighted by what each style makes. */
export function podCostPerUnit(rows: { garment: Garment; units: number }[]): number {
  const total = rows.reduce((n, r) => n + r.units, 0);
  if (total === 0) return POD_UNIT.tee;
  return rows.reduce((n, r) => n + POD_UNIT[r.garment] * r.units, 0) / total;
}
