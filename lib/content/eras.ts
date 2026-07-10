/**
 * ERAS — the three work "chapters" (NOW / LEADER / DIRECTOR) shown on the
 * home page. Extracted here as a single source of truth so both the live
 * home page (`app/(public)/page.tsx`) and layout experiments (e.g.
 * `app/(public)/home-lab/`) render the same content.
 */

export interface WorkProject {
  href: string;
  /** Display numeral, e.g. "01" or "✱". */
  index: string;
  title: string;
  blurb: string;
  meta?: string;
  gated?: boolean;
  /** Optional per-project accent (overrides the era accent on the numeral). */
  accentVar?: string;
}

export interface WorkEra {
  /** Anchor id + key, e.g. "now". */
  id: string;
  /** Short label shown as the era heading, e.g. "NOW". */
  label: string;
  years: string;
  /** Sub-line under the era heading. */
  note?: string;
  /** Faint accent color (CSS) for this era's label tick + numerals. */
  accent?: string;
  projects: WorkProject[];
}

// Faint per-era accents: LEADER purple, DIRECTOR magenta. NOW inherits the
// default paper accent (its projects carry their own).
export const ERAS: WorkEra[] = [
  {
    id: 'now',
    label: 'NOW',
    years: '2025 —',
    note: 'Independent consumer products, built and shipped solo with AI.',
    projects: [
      { href: '/work/heirloom', index: '01', title: 'Heirloom', blurb: 'Recipe preservation and social cookbooks, AI-assisted import. Native iOS and Android, live.', meta: 'iOS + Android · live', accentVar: 'var(--project-heirloom)' },
      { href: '/work/silly-questions', index: '02', title: 'Silly Questions', blurb: 'A 2-player AI art party game — eight styles, no download. Live on the web.', meta: 'Web · live', accentVar: 'var(--project-silly)' },
      { href: '/work/zero', index: '03', title: 'Zero', blurb: 'Swipe-first shortform email with AI-extracted actions. Shipped, then deprioritized.', meta: 'Cross-platform · deprioritized' },
    ],
  },
  {
    id: 'leader',
    label: 'LEADER',
    years: '2017 — 2025',
    note: 'AR platform leadership. Spark, Orion, FAIR Embodied AI.',
    accent: '#5C3FA8',
    projects: [
      { href: '/work/fair-embodied-ai', index: '04', title: 'FAIR Embodied AI', blurb: 'SIRo + Motivo · embodied agent UX. Built and led 4+ teams, sim to real-world.', meta: 'Product Design Manager · 2023–2025' },
      { href: '/work/orion', index: '05', title: 'Orion', blurb: 'UX for Meta’s first true AR glasses — Day-1 use cases, real glasses form factor.', meta: 'Product Design Manager · 2023–2025' },
      { href: '/work/spark-ar', index: '06', title: 'Spark AR', blurb: 'Grew a camera-effects team into Meta’s AR creator platform across FB, IG, and Messenger.', meta: 'Product Design Manager · 2017–2023' },
    ],
  },
  {
    id: 'director',
    label: 'DIRECTOR',
    years: '2000 — 2017',
    note: 'Animation, creative direction, mixed-reality installations.',
    accent: '#B5179E',
    projects: [
      { href: '/work/framestore', index: '07', title: 'Framestore VR', blurb: 'VR/AR pitch portfolio and location-based experiences. Creative Director, 2017.', meta: 'CONFIDENTIAL · 2017', gated: true },
      { href: '/work/viacom', index: '08', title: 'Viacom', blurb: 'Director, Screen Content — real-time playback and mixed reality across Viacom’s HQ.', meta: 'DIRECTOR · 2015–2017' },
      { href: '/work/studio-era', index: '09', title: 'Studio Era', blurb: 'Psyop, Imaginary Forces, Buck, Hush — animation, creative direction, installations.', meta: 'MULTI-STUDIO · 2000–2015' },
    ],
  },
];
