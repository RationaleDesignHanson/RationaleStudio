/**
 * What you SELL, as opposed to what you make.
 *
 * Every revenue figure in this tool was `retail × everything made`. No markdown,
 * no carryover, nothing unsold — so a plan to make 300, sell 170 at list, 60 at
 * half and sit on 70 reported a 79% margin business.
 *
 * That is not a rounding error. It is the difference between a plan and a
 * fantasy, and it is the most common way a first line dies: the margin looked
 * fine because the model quietly assumed a perfect season.
 *
 * A first indie line selling 55–65% at full price is doing well. The rest goes
 * at 30–50% off and some never moves at all.
 *
 * THE FIGURE THIS EXISTS TO PRODUCE is cash sitting in unsold stock. Margin
 * percentages are comfortable and abstract; "there is $9,400 of this in boxes"
 * is the number that changes a decision.
 *
 * CONFIDENCE: soft, and unavoidably so — sell-through is a property of your
 * customers, not of the garment. These are planning defaults from small-brand
 * convention, they are adjustable, and they should be replaced by your own
 * numbers the moment you have a season of them.
 */

export interface SellPlan {
  /** Share sold at list price. */
  fullRate: number;
  /** Share of the remainder sold at a discount. */
  markdownRate: number;
  /** How deep that discount is. 0.4 means sold at 60% of list. */
  markdownDepth: number;
}

export const SELL_PLAN: SellPlan = {
  fullRate: 0.6,
  markdownRate: 0.25,
  markdownDepth: 0.4,
};

/** A perfect season. Only honest as an explicit comparison. */
export const SELL_EVERYTHING: SellPlan = { fullRate: 1, markdownRate: 0, markdownDepth: 0 };

export interface SellResult {
  unitsFull: number;
  unitsMarked: number;
  /** Made, never sold. The boxes in the spare room. */
  unitsUnsold: number;
  revenue: number;
  /** What the same units would have earned in a perfect season. */
  revenueAtList: number;
  /** Cost of the units that never sold, at COGS. Money you already spent. */
  cashInUnsold: number;
}

/**
 * Split a run into sold, discounted and stuck.
 *
 * Rounds so the three always sum to exactly the units made — a plan that loses
 * or invents a shirt in the arithmetic is not a plan anyone can order against.
 */
export function sellThrough(
  units: number,
  retail: number,
  cogsPerUnit: number,
  plan: SellPlan = SELL_PLAN,
): SellResult {
  const full = Math.round(units * Math.max(0, Math.min(1, plan.fullRate)));
  const remaining = units - full;
  const marked = Math.min(remaining, Math.round(units * Math.max(0, plan.markdownRate)));
  const unsold = remaining - marked;

  return {
    unitsFull: full,
    unitsMarked: marked,
    unitsUnsold: unsold,
    revenue: full * retail + marked * retail * (1 - plan.markdownDepth),
    revenueAtList: units * retail,
    cashInUnsold: unsold * cogsPerUnit,
  };
}
