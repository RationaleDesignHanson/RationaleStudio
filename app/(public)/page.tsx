/**
 * Homepage — Studio Monograph (paper + serif), single style throughout.
 *
 * The three eras (NOW / LEADER / DIRECTOR) render as viewport-fit columns
 * behind a slim masthead via <WorkColumns> — see everything without
 * scrolling. Writing + Contact follow below. Each era keeps only a faint
 * accent; no per-era art direction.
 */

import { MultipleStructuredData } from '@/components/seo/StructuredData';
import { generateBreadcrumbStructuredData } from '@/lib/seo/metadata';
import { WorkColumns } from '@/components/work/WorkColumns';
import { ERAS } from '@/lib/content/eras';

// =============================================================
// PAGE
// =============================================================

export default function HomePage() {
  // Person + WebSite + Organization render at the root layout for every
  // page, so we only need the page-specific Breadcrumb here.
  const structuredData = [
    generateBreadcrumbStructuredData([{ name: 'Home', url: '/' }]),
  ];

  return (
    <>
      <MultipleStructuredData dataBlocks={structuredData} />

      <main className="min-h-screen bg-paper text-ink-body">
        {/*
          Visually-hidden h1 — the visual design lets era headers (NOW /
          LEADER / DIRECTOR) carry visual weight as h2, but search engines
          want a single semantic h1 that summarizes the page. This is the
          full positioning sentence so both human screen-reader users and
          crawlers get the same disambiguation context.
        */}
        <h1 className="sr-only">
          Matt Hanson — designer-engineer working across AR, AI, and experiential
          systems for 25 years. Animation and creative direction at Psyop,
          Imaginary Forces, Buck, and Hush; VR/AR pitchwork at Framestore;
          screen content direction at Viacom and MTV; eight years at Meta
          leading product design across Spark AR, Orion, and FAIR Embodied AI;
          now applying that experience solo, shipping consumer products with
          AI as a coding partner.
        </h1>

        {/* WORK — eras as viewport-fit columns. Masthead off: the header
            wordmark already rotates in "Vision bears the burden of proof." */}
        <WorkColumns eras={ERAS} showMasthead={false} fitViewport={false} />

      </main>
    </>
  );
}
