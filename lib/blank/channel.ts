/**
 * What it costs to actually SELL the thing.
 *
 * The cost model stopped at the factory door. It knew the blank, the ink, the
 * screens, the freight in and the margin at list — and nothing whatsoever about
 * reaching a person. That is a fine model of manufacturing and a useless model
 * of a business, and it is most useless for exactly the business this tool was
 * extended to describe.
 *
 * "A shirt for every rest stop, micro-targeted by geography and interest" is a
 * plan whose entire viability is acquisition cost. A hundred designs sold to
 * nobody is a hundred designs. At a $35 tee with roughly $8 of COGS there is $27
 * of room, and a paid-social acquisition cost plus platform fees plus getting
 * the parcel to the door can eat all of it — so the number that decides whether
 * the catalogue is a business is not in the factory at all.
 *
 * THE NUMBER THIS EXISTS TO PRODUCE is `breakEvenCac`: the most you can pay to
 * acquire one order and still not lose money. Everything else here is in service
 * of that, because it is the figure you can actually take to an ad platform and
 * check against.
 *
 * CONFIDENCE. Platform fees are published and hard. Shipping, returns and
 * acquisition cost are ranges, vary enormously by category and season, and are
 * SOFT — they are here so the shape of the trade is visible and the sliders have
 * something to move, not because these are your numbers. Every one is
 * adjustable in the interface.
 */

export type ChannelId = 'direct' | 'social' | 'marketplace' | 'wholesale';

export interface Channel {
  id: ChannelId;
  label: string;
  /** Percentage of the sale taken by the platform, before payment processing. */
  platformFee: number;
  /** Card processing. Stripe/Shopify standard at time of writing. */
  processingFee: number;
  processingFixed: number;
  /** Does the seller pay to get the parcel to the customer? */
  shipsToCustomer: boolean;
  /** Whether acquisition is bought or free. Wholesale buys none. */
  paidAcquisition: boolean;
  note: string;
}

export const CHANNELS: Channel[] = [
  {
    id: 'direct',
    label: 'Own site',
    platformFee: 0,
    processingFee: 0.029,
    processingFixed: 0.3,
    shipsToCustomer: true,
    paidAcquisition: true,
    note: 'Cheapest per order and the hardest to fill — nobody arrives on their own.',
  },
  {
    id: 'social',
    label: 'Instagram / paid social',
    platformFee: 0,
    processingFee: 0.029,
    processingFixed: 0.3,
    shipsToCustomer: true,
    paidAcquisition: true,
    note: 'Where micro-targeting actually happens, and where the acquisition cost lands.',
  },
  {
    id: 'marketplace',
    label: 'Marketplace',
    // Etsy at time of writing: 6.5% transaction + ~3% payment + listing.
    platformFee: 0.065,
    processingFee: 0.03,
    processingFixed: 0.45,
    shipsToCustomer: true,
    paidAcquisition: false,
    note: 'Brings its own traffic and charges for it. No ad spend, thinner per unit.',
  },
  {
    id: 'wholesale',
    label: 'Wholesale',
    // Not a fee — the retailer buys at roughly half of list.
    platformFee: 0.5,
    processingFee: 0,
    processingFixed: 0,
    shipsToCustomer: false,
    paidAcquisition: false,
    note: 'Half of list, no ads, no parcels, no returns. Volume in exchange for margin.',
  },
];

export const channelById = (id: string): Channel =>
  CHANNELS.find((c) => c.id === id) ?? CHANNELS[0];

/** Typical costs, all soft and all overridable. */
export const SELL_DEFAULTS = {
  /** Parcel to the customer, US ground, one garment. */
  shippingPerOrder: 6.0,
  /** Share of orders returned. Apparel bought unseen runs high. */
  returnRate: 0.08,
  /** What a returned order costs: the parcel out, and the handling back. */
  returnCost: 9.0,
  /** Orders per customer. One is the honest default for a novelty graphic. */
  unitsPerOrder: 1,
  /** Paid acquisition per ORDER, not per click. */
  cacPerOrder: 12,
};

export interface SellResult {
  /** What the platform and the processor take. */
  fees: number;
  /** Shipping plus the blended cost of returns. */
  fulfilment: number;
  /** Retail minus COGS, fees and fulfilment — before any acquisition spend. */
  contributionBeforeCac: number;
  /** The most you can pay for an order and still break even. */
  breakEvenCac: number;
  /** Contribution after the acquisition cost actually being paid. */
  contribution: number;
  /** Contribution as a share of retail. Negative means each sale loses money. */
  contributionMargin: number;
  /** True when the channel cannot support the acquisition cost set. */
  underwater: boolean;
}

/**
 * One unit, sold through one channel.
 *
 * `cogs` is the landed per-unit cost from the line model — blank, ink, freight
 * in, size upcharge and the amortised share of setup. Everything added here is
 * downstream of the factory.
 */
export function sellUnit(
  retail: number,
  cogs: number,
  channel: Channel,
  opts: Partial<typeof SELL_DEFAULTS> = {},
): SellResult {
  const o = { ...SELL_DEFAULTS, ...opts };
  const fees = retail * channel.platformFee + retail * channel.processingFee + channel.processingFixed;
  const shipping = channel.shipsToCustomer ? o.shippingPerOrder / Math.max(1, o.unitsPerOrder) : 0;
  // A return costs the outbound parcel AND the handling, spread across all the
  // orders that did not come back — which is why a modest return rate hurts
  // more than it looks.
  const returns = channel.shipsToCustomer ? o.returnRate * o.returnCost : 0;
  const fulfilment = shipping + returns;

  const contributionBeforeCac = retail - cogs - fees - fulfilment;
  const cac = channel.paidAcquisition ? o.cacPerOrder / Math.max(1, o.unitsPerOrder) : 0;
  const contribution = contributionBeforeCac - cac;

  return {
    fees,
    fulfilment,
    contributionBeforeCac,
    // Only meaningful where you are buying traffic; elsewhere it is the headroom
    // you would have if you started.
    breakEvenCac: contributionBeforeCac * Math.max(1, o.unitsPerOrder),
    contribution,
    contributionMargin: retail > 0 ? contribution / retail : 0,
    underwater: contribution < 0,
  };
}

/**
 * Ad spend needed to shift a given number of units, and what it returns.
 *
 * The catalogue argument lives or dies here: micro-targeting a hundred places
 * means a hundred small audiences, and small audiences are expensive per order.
 */
export function campaign(units: number, cacPerOrder: number, contributionBeforeCac: number) {
  const spend = units * cacPerOrder;
  const gross = units * contributionBeforeCac;
  return {
    spend,
    /** Contribution after the whole campaign is paid for. */
    net: gross - spend,
    /** Revenue-ish multiple on ad spend. Below 1 means the campaign lost money. */
    returnOnSpend: spend > 0 ? gross / spend : Infinity,
  };
}
