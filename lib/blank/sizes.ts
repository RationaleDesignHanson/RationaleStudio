/**
 * The size run — how a run of N actually breaks down into pieces to order.
 *
 * Never modelled until now, and it is the last thing standing between the cost
 * sheet and something a factory could take: "50 tees" is not an order, "5 S,
 * 13 M, 15 L, 12 XL, 5 XXL" is.
 *
 * The curve is the standard streetwear one — weighted to M and L, thin at both
 * ends. It is a demand assumption, not a fact about cloth, and it is the single
 * easiest thing in the model to be wrong about: order to the wrong curve and you
 * sell out of L in a fortnight and carry XXL for a year. Stated on screen as an
 * assumption rather than presented as a plan.
 *
 * CAPS DO NOT HAVE A SIZE RUN. A snapback is one size — that is what the snap is
 * for — so a cap SKU is one line, not five. Modelling it with a curve would
 * invent four SKUs that do not exist and quietly overstate the piece count.
 */

/**
 * Declared locally rather than imported from line.ts. economics.ts needs the
 * XXL share to price the upcharge, and economics -> sizes -> line -> economics
 * would be an import cycle. Structurally identical to line.ts's Garment.
 */
type Garment = 'tee' | 'hoodie' | 'cap';

export interface SizeSplit {
  size: string;
  /** Share of the run, 0–1. Sums to 1 across the curve. */
  share: number;
}

/** Standard streetwear curve. Weighted to the middle, thin at the ends. */
export const SIZE_CURVE: SizeSplit[] = [
  { size: 'S', share: 0.1 },
  { size: 'M', share: 0.25 },
  { size: 'L', share: 0.3 },
  { size: 'XL', share: 0.25 },
  { size: 'XXL', share: 0.1 },
];

/** One size, and the snap is the adjustment. */
export const ONE_SIZE: SizeSplit[] = [{ size: 'OS', share: 1 }];

export const curveFor = (garment: Garment): SizeSplit[] =>
  garment === 'cap' ? ONE_SIZE : SIZE_CURVE;

/**
 * A run broken into whole pieces.
 *
 * Rounds down and gives the remainder to the largest share, so the pieces always
 * sum to exactly the run. Handing the remainder to the biggest bucket is also
 * what you would do in practice — an extra L sells.
 */
export function sizeBreakdown(units: number, garment: Garment): { size: string; qty: number }[] {
  const curve = curveFor(garment);
  const out = curve.map((c) => ({ size: c.size, qty: Math.floor(units * c.share) }));
  const short = units - out.reduce((n, o) => n + o.qty, 0);
  if (short > 0) {
    const biggest = curve.reduce((a, b) => (b.share > a.share ? b : a));
    const row = out.find((o) => o.size === biggest.size);
    if (row) row.qty += short;
  }
  return out;
}

/** Share of a run that is 2XL — economics.ts prices the upcharge off this. */
export const xxlShare = (garment: Garment): number =>
  curveFor(garment).find((c) => c.size === 'XXL')?.share ?? 0;
