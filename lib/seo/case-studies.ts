/**
 * Per-case-study SEO metadata. Single source of truth for the Article +
 * Breadcrumb JSON-LD attached to /work/<slug> pages.
 *
 * Add a new case study by appending to the CASE_STUDIES map — the route
 * itself still has to exist under app/(public)/work/<slug>/.
 */

import {
  generateArticleJsonLd,
  generateBreadcrumbJsonLd,
} from './jsonld';

export type CaseStudySlug =
  | 'heirloom'
  | 'silly-questions'
  | 'zero'
  | 'nimbus'
  | 'rumi'
  | 'fubo'
  | 'vault'
  | 'spark-ar'
  | 'orion'
  | 'fair-embodied-ai'
  | 'framestore'
  | 'viacom'
  | 'studio-era';

interface CaseStudyMeta {
  title: string;
  description: string;
  /** Schema.org type — CreativeWork for case studies, Article works too. */
  type?: 'Article' | 'CreativeWork';
  /** Approximate first-publish date for the case study. */
  publishedAt?: string;
  /** Optional last-edited date. */
  updatedAt?: string;
  /** Crumb between Home → Work → this. Defaults to "Work". */
  workCrumb?: string;
}

export const CASE_STUDIES: Record<CaseStudySlug, CaseStudyMeta> = {
  'heirloom': {
    title: 'Heirloom Recipe Box',
    description:
      'iOS recipe-preservation app — handwritten family recipes captured by camera plus AI, organized into shareable cookbooks. Live on the App Store. 24 SPM packages, AI-assisted import across five formats. Solo build with AI as coding partner.',
    type: 'CreativeWork',
    publishedAt: '2026-04-01',
  },
  'silly-questions': {
    title: 'Silly Questions',
    description:
      'A 2-player AI art party game. Live on iOS and the web. Eight art styles, no app download required. Built solo, designed for quick joyful sessions.',
    type: 'CreativeWork',
    publishedAt: '2026-04-01',
  },
  'zero': {
    title: 'Zero — shortform email',
    description:
      'Swipe-first email triage with AI-extracted action items. Shipped cross-platform iOS + macOS in internal beta, then deprioritized. Post-mortem on why a working product still got pulled.',
    type: 'CreativeWork',
    publishedAt: '2026-04-01',
  },
  'nimbus': {
    title: 'Nimbus — sanitary-waste system',
    description:
      'A reimagined household waste system that separates organic, sanitary, and recyclable streams at the bin instead of at the curb. Hardware + software, in concept-prototype.',
    type: 'CreativeWork',
    publishedAt: '2026-05-08',
  },
  'rumi': {
    title: 'Rumi — AI media companion',
    description:
      'Head of Design at an AI media companion startup. Stealth-stage product, brand, and creative-engineering scaffolding. Vault-gated.',
    type: 'CreativeWork',
    publishedAt: '2024-06-01',
  },
  'fubo': {
    title: 'Fubo — VP of Design',
    description:
      'Streaming entertainment platform. Leading design across product, brand, and the in-flight transformation of the live-TV experience. Vault-gated.',
    type: 'CreativeWork',
    publishedAt: '2025-01-01',
  },
  'vault': {
    title: 'Vault — confidential client + concept work',
    description:
      'Password-gated repository of confidential client engagements and venture concepts in flight. Email Matt for access.',
    type: 'CreativeWork',
    publishedAt: '2026-05-08',
  },
  'spark-ar': {
    title: 'Spark AR — Meta creator platform',
    description:
      'Built and led the Experiences team that turned Spark from a few flagship effects into a creator platform across Facebook, Instagram, and Messenger. Scope spanned design, prototyping, education, and the F8 stage. Senior Product Design Manager at Meta, 2017–2023.',
    type: 'CreativeWork',
    publishedAt: '2023-12-01',
  },
  'orion': {
    title: 'Orion — Meta AR glasses',
    description:
      'UX for Meta\'s first true AR glasses in a regular glasses form factor. Senior Product Design Manager across Day-1 use cases. 2023–2025.',
    type: 'CreativeWork',
    publishedAt: '2024-09-25',
  },
  'fair-embodied-ai': {
    title: 'FAIR Embodied AI',
    description:
      'SIRo + Motivo. Embodied agent UX. Built and led 4+ teams across simulation and real-world environments. Senior Product Design Manager, Meta FAIR, 2023–2025.',
    type: 'CreativeWork',
    publishedAt: '2024-12-01',
  },
  'framestore': {
    title: 'Framestore VR Studio',
    description:
      'Creative Director, 2017. VR/AR pitch portfolio. Vault-gated.',
    type: 'CreativeWork',
    publishedAt: '2017-12-01',
  },
  'viacom': {
    title: 'Viacom — Director, Screen Content',
    description:
      'Past Present and Future, Outrage Machine billboards, MTV Open Your Eyes Tilt Brush at the White House. Director-level screen content for Viacom and MTV, 2015–2017.',
    type: 'CreativeWork',
    publishedAt: '2017-06-01',
  },
  'studio-era': {
    title: 'Studio Era — Psyop, Imaginary Forces, Buck, Hush',
    description:
      'Animation, creative direction, mixed-reality installations across Psyop, Imaginary Forces, Buck, own studio, and Hush. 2000–2015.',
    type: 'CreativeWork',
    publishedAt: '2015-12-01',
  },
};

/**
 * Build the Article + Breadcrumb JSON-LD payload for a case study.
 * Returns an array suitable for <MultipleStructuredData dataBlocks=...>.
 */
export function caseStudySchemas(slug: CaseStudySlug) {
  const meta = CASE_STUDIES[slug];
  const path = `/work/${slug}`;
  return [
    generateArticleJsonLd({
      title: meta.title,
      description: meta.description,
      path,
      publishedAt: meta.publishedAt,
      updatedAt: meta.updatedAt,
      type: meta.type ?? 'CreativeWork',
    }),
    generateBreadcrumbJsonLd([
      { name: 'Home', url: '/' },
      { name: meta.workCrumb ?? 'Work', url: '/work' },
      { name: meta.title, url: path },
    ]),
  ];
}
