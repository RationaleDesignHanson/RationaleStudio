/**
 * Work index — chronological table of contents.
 *
 * All eras render in one continuous Studio Monograph (paper + serif)
 * scroll via <WorkIndex>, with a sticky jump-nav and only a faint
 * per-era accent. No per-era art direction or parallax-merge.
 *
 *   NOW      (2024 —)
 *   LEADER   (2017 — 2025)
 *   DIRECTOR (2000 — 2017)
 */

import Link from 'next/link';
import { ArrowRight, Lock } from 'lucide-react';
import { WorkIndex, type WorkEra } from '@/components/work/WorkIndex';

// =============================================================
// ERA DATA — fed into <WorkIndex />.
// =============================================================

const ERAS: WorkEra[] = [
  {
    id: 'now',
    label: 'NOW',
    years: '2024 —',
    note: 'Solo designer-engineer. Consumer apps shipped solo.',
    projects: [
      { href: '/work/heirloom', index: '01', title: 'Heirloom', blurb: 'iOS recipe preservation, social cookbooks. Live on the App Store. 24 SPM packages, AI-assisted import across five formats.', meta: 'iOS · live', accentVar: 'var(--project-heirloom)' },
      { href: '/work/silly-questions', index: '02', title: 'Silly Questions', blurb: 'A 2-player AI art party game. Live now on iOS and the web. Eight art styles, no app download required.', meta: 'Web + iOS · live', accentVar: 'var(--project-silly)' },
      { href: '/work/zero', index: '03', title: 'Zero', blurb: 'Shortform email. Swipe-first triage with AI-extracted action items. Shipped cross-platform, then deprioritized — read why.', meta: 'Cross-platform · deprioritized' },
      { href: '/work/vault', index: '✱', title: 'Vault', blurb: 'Confidential client work and concept ventures. Locked — request access.', meta: 'Confidential · client + concept', gated: true, accentVar: 'var(--project-vault)' },
    ],
  },
  {
    id: 'leader',
    label: 'LEADER',
    years: '2017 — 2025',
    note: 'AR platform leadership across Spark, Orion, and FAIR.',
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
      { href: '/work/framestore', index: '07', title: 'Framestore VR Studio', blurb: 'Creative Director · 2017. VR/AR pitch portfolio — the bridge into Meta.', meta: 'CONFIDENTIAL · 2017', gated: true },
      { href: '/work/viacom', index: '08', title: 'Viacom', blurb: 'Director, Screen Content. Past Present and Future, Outrage Machine billboards, MTV Open Your Eyes Tilt Brush at the White House.', meta: 'DIRECTOR · 2015–2017' },
      { href: '/work/studio-era', index: '09', title: 'Studio Era', blurb: 'Psyop, Imaginary Forces, Buck, own studio, Hush. Animation, creative direction, mixed-reality installations.', meta: 'MULTI-STUDIO · 2000–2015' },
    ],
  },
];

// =============================================================
// PAGE
// =============================================================

export default function WorkIndexPage() {
  return (
    <main className="min-h-screen bg-paper text-ink-body">
      {/* HERO */}
      <section className="px-4 sm:px-6 md:px-8 pt-16 md:pt-24 pb-10 md:pb-16 border-b border-hairline">
        <div className="max-w-6xl mx-auto">
          <p className="text-[11px] md:text-xs font-mono text-ink-muted tracking-[0.3em] uppercase mb-4">
            WORK · CHRONOLOGICAL
          </p>
          <h1 className="font-display text-display text-ink mb-6 max-w-3xl">
            Work, organized chronologically.
          </h1>
          <p className="text-base md:text-lg text-ink-body leading-relaxed max-w-2xl">
            Creative direction and visual effects. Spatial experiences and interactive systems. AR at billion-user scale. Now &mdash; consumer apps shipped solo. The work compounds.
          </p>
        </div>
      </section>

      {/* WORK INDEX — all eras, one paper style, sticky jump-nav. */}
      <WorkIndex eras={ERAS} />

      {/* GATED FOOTER NOTE */}
      <section className="px-4 sm:px-6 md:px-8 py-10 md:py-14 border-t border-hairline bg-paper">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-baseline md:justify-between gap-3">
          <p className="text-xs md:text-sm text-ink-muted leading-relaxed flex items-center gap-2">
            <Lock className="w-3 h-3 text-ink-muted" />
            Gated items are password-protected. Email{' '}
            <a
              href="mailto:hanson@rationale.work"
              className="text-[var(--accent-ink)] hover:text-ink underline"
              data-cta-location="work-vault-footer"
              data-cta-type="email"
            >
              hanson@rationale.work
            </a>{' '}
            for access.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 text-[var(--accent-ink)] hover:text-ink font-display italic transition-colors"
          >
            Get in touch <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </section>
    </main>
  );
}
