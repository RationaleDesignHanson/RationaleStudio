/**
 * Deck manifest — gated portfolio decks served behind UnlockGate.
 *
 * Each deck is a series of compressed JPGs at /public/decks/<slug>/page-NN.jpg.
 * Pages explicitly omitted from publishing (internal dashboards, geo-rollout
 * mechanics) are simply not in the pages array — they don't ship at all.
 */

export interface Deck {
  slug: string;
  title: string;
  subtitle: string;
  meta: string;
  era: 'now' | 'meta' | 'maker';
  totalSourcePages: number;
  publishedPages: string[];
  /** When false, the deck renders without UnlockGate. */
  gated?: boolean;
  /**
   * UnlockGate scope. Vault decks use "vault" so the single vault password
   * opens them alongside the rest of the vault. Defaults to `deck-<slug>`.
   */
  scope?: string;
}

export const DECKS: Record<string, Deck> = {
  'spark-ar-design-guidelines': {
    slug: 'spark-ar-design-guidelines',
    title: 'Spark AR Design Guidelines',
    subtitle:
      'Public-facing design guidelines we shipped at Meta — full 56-page edition. Covers getting started, designing virtual experiences for the real world, UI and user controls, and AR terminology. (The original sparkar.facebook.com blog went dark when Meta sunset Spark in January 2025; rehosted here.)',
    meta: 'Meta · public',
    era: 'meta',
    totalSourcePages: 56,
    publishedPages: Array.from({ length: 56 }, (_, i) =>
      `page-${String(i + 1).padStart(2, '0')}.jpg`,
    ),
    gated: false,
  },
  'world-ar-avatars': {
    slug: 'world-ar-avatars',
    title: 'World AR Avatars',
    subtitle:
      'The strategic source for the world-locked interactive avatars patent (US11295503B1). FRL Design + UXR · Q2 2021.',
    meta: '2021 · Internal',
    era: 'meta',
    totalSourcePages: 28,
    // Skipping pp 20 (rollout phasing) and 25 (Unidash dashboard) per
    // the do-not-publish rule.
    publishedPages: [
      '01','02','03','04','05','06','07','08','09','10',
      '11','12','13','14','15','16','17','18','19',
      '21','22','23','24','26','27','28',
    ].map((n) => `page-${n}.jpg`),
    scope: 'vault',
  },
  'framestore-apex-assembly': {
    slug: 'framestore-apex-assembly',
    title: 'Apex Assembly · Framestore Pitch',
    subtitle:
      'A VR haptic puzzle game pitch from Framestore Labs — assemble doodads on a moving conveyor belt with motion-captured hands and foam blocks. 2017 pitch deck, Adobe InDesign.',
    meta: 'Framestore · 2017',
    era: 'maker',
    totalSourcePages: 16,
    publishedPages: Array.from({ length: 16 }, (_, i) =>
      `page-${String(i + 1).padStart(2, '0')}.jpg`,
    ),
  },
  'motivo-case-study': {
    slug: 'motivo-case-study',
    title: 'Meta Motivo · Case Study',
    subtitle:
      'Behavioral foundation model for humanoid control. Building the prototyper discipline at FAIR, the Playground tooling, and the launch of metamotivo.metademolab.com — December 2024.',
    meta: 'FAIR · 2024',
    era: 'meta',
    totalSourcePages: 16,
    publishedPages: Array.from({ length: 15 }, (_, i) =>
      `page-${String(i + 1).padStart(2, '0')}.jpg`,
    ),
  },
  'portfolio-flash-2024': {
    slug: 'portfolio-flash-2024',
    title: 'Portfolio Flash · October 2024',
    subtitle:
      'The recent comprehensive deck — FAIR Embodied AI, Spark AR, AR Commerce, AR Ads. 104 pages.',
    meta: '2024 · Recent',
    era: 'meta',
    totalSourcePages: 104,
    publishedPages: Array.from({ length: 104 }, (_, i) =>
      `page-${String(i + 1).padStart(3, '0')}.jpg`,
    ),
    scope: 'vault',
  },
  'disney-work-samples-2022': {
    slug: 'disney-work-samples-2022',
    title: 'Disney Work Samples · September 2022',
    subtitle:
      'Internal review deck for Disney location-based AR collaboration. World AR on Mobile patterns applied to Disney character placement, theme-park context, and licensed-IP try-ons. 19 pages.',
    meta: '2022 · Internal review',
    era: 'meta',
    totalSourcePages: 19,
    publishedPages: Array.from({ length: 19 }, (_, i) =>
      `page-${String(i + 1).padStart(2, '0')}.jpg`,
    ),
    scope: 'vault',
  },
  'portfolio-2022': {
    slug: 'portfolio-2022',
    title: 'Portfolio · Spring 2022',
    subtitle:
      'Spark on Wearables, AR Commerce strategy, Camera AR Platform case study, Hanson Scope diagram. 29 pages.',
    meta: '2022',
    era: 'meta',
    totalSourcePages: 29,
    publishedPages: Array.from({ length: 29 }, (_, i) =>
      `page-${String(i + 1).padStart(2, '0')}.jpg`,
    ),
    scope: 'vault',
  },
};

export function getDeck(slug: string): Deck | null {
  return DECKS[slug] ?? null;
}

export function listDeckSlugs(): string[] {
  return Object.keys(DECKS);
}
