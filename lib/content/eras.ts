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
    years: '2024 —',
    note: 'Independent consumer products, built and shipped solo with AI.',
    projects: [
      { href: '/work/heirloom', index: '01', title: 'Heirloom', blurb: 'Recipe preservation, social cookbooks, AI-assisted import. Native iOS, live on the App Store. Built solo.', meta: 'iOS · live', accentVar: 'var(--project-heirloom)' },
      { href: '/work/silly-questions', index: '02', title: 'Silly Questions', blurb: 'A 2-player AI art party game. Live on the web. Eight art styles, no app download required.', meta: 'Web · live', accentVar: 'var(--project-silly)' },
      { href: '/work/zero', index: '03', title: 'Zero', blurb: 'Shortform email. Swipe-first triage with AI-extracted action items. Shipped cross-platform, then deprioritized — read why.', meta: 'Cross-platform · deprioritized' },
    ],
  },
  {
    id: 'leader',
    label: 'LEADER',
    years: '2017 — 2025',
    note: 'AR platform leadership. Spark, Orion, FAIR Embodied AI.',
    accent: '#5C3FA8',
    projects: [
      { href: '/work/fair-embodied-ai', index: '04', title: 'FAIR Embodied AI', blurb: 'SIRo + Motivo · embodied agent UX. Built and led 4+ teams across simulation and real-world environments.', meta: 'Senior Product Design Manager · 2023–2025' },
      { href: '/work/orion', index: '05', title: 'Orion', blurb: 'UX for Meta’s first true AR glasses, in a regular glasses form factor. Senior Product Design Manager across Day-1 use cases.', meta: 'Senior Product Design Manager · 2023–2025' },
      { href: '/work/spark-ar', index: '06', title: 'Spark AR', blurb: 'Built and led the Experiences team that turned Spark from a few flagship effects into a creator platform across Facebook, Instagram, and Messenger. Scope spanned design, prototyping, education, and the F8 stage.', meta: 'Senior Product Design Manager · 2017–2023' },
    ],
  },
  {
    id: 'director',
    label: 'DIRECTOR',
    years: '2000 — 2017',
    note: 'Animation, creative direction, mixed-reality installations.',
    accent: '#B5179E',
    projects: [
      { href: '/work/framestore', index: '07', title: 'Framestore VR', blurb: 'Creative Director · 2017. VR/AR pitch portfolio.', meta: 'CONFIDENTIAL · 2017', gated: true },
      { href: '/work/viacom', index: '08', title: 'Viacom', blurb: 'Director, Screen Content. The Past Present and Future room, Outrage Machine billboards, MTV Open Your Eyes Tilt Brush at the White House.', meta: 'DIRECTOR · 2015–2017' },
      { href: '/work/studio-era', index: '09', title: 'Studio Era', blurb: 'Psyop, Imaginary Forces, Buck, own studio, Hush. Animation, creative direction, mixed-reality installations.', meta: 'MULTI-STUDIO · 2000–2015' },
    ],
  },
];
