/**
 * Rationale Homepage (Combined with Work)
 *
 * Single destination showing:
 * - Hero positioning
 * - VelocityProof (how we build conviction)
 * - Our products (Zero, Heirloom)
 * - Partnership work (confidential projects)
 * - CTA
 */

'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ASCIIUnifiedGrid } from '@/components/visual';
import { watercolorThemes } from '@/lib/theme/watercolor-palette';
import { ArrowRight, Lock } from 'lucide-react';
import { MultipleStructuredData } from '@/components/seo/StructuredData';
import { generateOrganizationStructuredData, generateBreadcrumbStructuredData } from '@/lib/seo/metadata';
import { VelocityProof } from '@/components/home/VelocityProof';
import { getAllProjects, getProjectBySlug } from '@/lib/content/work-projects';
import { useAuth } from '@/lib/auth/AuthContext';

// Map clientId to project slugs for client-specific access
const CLIENT_PROJECT_MAPPING: Record<string, string[]> = {
  'creait': ['case-study-010', 'case-study-030'],
  'athletes-first': ['case-study-020', 'case-study-030'],
};

function ProductAppIcon({ product }: { product: 'zero' | 'heirloom' }) {
  const heirloomIconSrc = '/heirloom/AppIcon-1024mask.png';
  const zeroIconSrc = '/zero/app-mockup-hero.png';
  const src = product === 'zero' ? zeroIconSrc : heirloomIconSrc;
  const alt = product === 'zero' ? 'Zero app icon' : 'Heirloom app icon';

  const frameClass =
    product === 'zero'
      ? 'rounded-xl overflow-hidden border border-[#6366F1]/25 bg-black/30 shadow-[0_0_0_1px_rgba(99,102,241,0.08)]'
      : 'rounded-xl overflow-hidden border border-[#E85D4D]/60 ring-1 ring-[#E85D4D]/35 bg-[#FBF8F3] shadow-[0_0_0_1px_rgba(232,93,77,0.10)]';

  const imgClass =
    product === 'heirloom'
      ? 'object-contain p-1 md:p-1.5 scale-[1.30]'
      : 'object-contain p-2 md:p-2.5 scale-[1.16]';

  return (
    <div className="h-full w-24 md:w-28 flex flex-col">
      <div className={`relative w-full aspect-square ${frameClass}`}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 96px, 112px"
          className={imgClass}
          priority={false}
        />
      </div>
      <div className="flex-1" />
    </div>
  );
}

export default function HomePage() {
  const { profile } = useAuth();
  const projects = getAllProjects();
  const zero = getProjectBySlug('zero');
  const heirloom = getProjectBySlug('heirloom');

  // Local/Cursor preview helper: show confidential cards in their "unlocked" state during development.
  const previewUnlocked = process.env.NODE_ENV !== 'production';

  // Separate our products from partnerships
  const partnerships = projects.filter(p => p.category !== 'consumer' || p.isProtected);

  const structuredData = [
    generateOrganizationStructuredData(),
    generateBreadcrumbStructuredData([{ name: 'Home', url: '/' }]),
  ];

  const getConfidentialOverviewHref = (projectSlug: string): string | null => {
    switch (projectSlug) {
      case 'case-study-010':
        return '/clients/creait/strategic-roadmap';
      case 'case-study-020':
        return '/clients/athletes-first/pitch-deck';
      case 'case-study-030':
        return '/clients/work/fubo';
      case 'sanitary-waste-system':
        return '/clients/work/sanitary-waste-system/quick-overview';
      default:
        return null;
    }
  };

  return (
    <>
      <MultipleStructuredData dataBlocks={structuredData} />

      <main className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white">
        {/* 1. HERO SECTION */}
        <section className="relative py-6 md:py-10 px-4 sm:px-6 md:px-8 border-b border-gray-800 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <ASCIIUnifiedGrid
              opacity={0.08}
              animated={true}
              colorTheme={watercolorThemes.terminalGold}
              charSet="default"
            />
          </div>

          <div className="relative z-10 max-w-5xl mx-auto">
            {/* Kicker */}
            <p className="text-xs font-mono text-terminal-gold tracking-widest mb-3">
              PROTOTYPE FAST. VALIDATE EARLY. SCALE WHAT WORKS.
            </p>

            {/* Headline */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-white leading-tight mb-4 md:mb-6">
              <Link
                href="/thinking"
                aria-label="Read: Vision bears the burden of proof"
                className="inline-block"
              >
                Vision bears the burden of proof.
              </Link>
            </h1>

            {/* Supporting copy */}
            <p className="text-base md:text-lg text-gray-300 max-w-3xl">
              We design and ship production software with intention and speed. When the alignment is there, we partner with founders and teams like co-founders so we're aligned on outcomes, not hours.
            </p>
          </div>
        </section>

        {/* 2. HOW WE BUILD CONVICTION (VelocityProof) */}
        <section className="relative py-6 md:py-10 px-4 sm:px-6 md:px-8 border-b border-gray-800">
          <div className="absolute inset-0 pointer-events-none">
            <ASCIIUnifiedGrid
              opacity={0.04}
              animated={true}
              colorTheme={watercolorThemes.terminalSubtle}
              charSet="default"
            />
          </div>

          <div className="relative z-10 max-w-5xl mx-auto">
            <div className="flex items-start gap-3 mb-8 md:mb-12">
              <div className="w-2 h-2 rounded-full bg-terminal-gold flex-shrink-0 mt-1.5" />
              <p className="text-xs md:text-sm text-gray-300 leading-relaxed max-w-5xl">
                <span className="font-semibold text-white">We turn vision into proof—then ship what's validated.</span>
              </p>
            </div>

            {/* Velocity Proof (embedded) */}
            <div className="mb-6">
              <div className="block md:hidden">
                <VelocityProof simplified={true} />
              </div>
              <div className="hidden md:block">
                <VelocityProof simplified={false} />
              </div>
            </div>
          </div>
        </section>

        {/* 3. OUR PRODUCTS (Zero & Heirloom) */}
        <section className="relative py-6 md:py-10 px-4 sm:px-6 md:px-8 border-b border-gray-800">
          <div className="absolute inset-0 pointer-events-none">
            <ASCIIUnifiedGrid
              opacity={0.04}
              animated={true}
              colorTheme={watercolorThemes.terminalSubtle}
              charSet="default"
            />
          </div>

          <div className="relative z-10 max-w-5xl mx-auto">
            <div className="flex items-start gap-3 mb-4 md:mb-6">
              <div className="w-2 h-2 rounded-full bg-terminal-gold flex-shrink-0 mt-1.5" />
              <p className="text-xs md:text-sm text-gray-300 leading-relaxed max-w-5xl">
                <span className="font-semibold text-white">Conviction comes from usage.</span>{' '}
                Prototypes put ideas in people's hands, and real consumer behaviors force decisions. Operating in production keeps our
                thinking calibrated to build better products—so when we partner, we de-risk the expensive parts and prove before you
                commit.
              </p>
            </div>

            <div className="grid gap-4 md:gap-6">
              {zero && (
                <Link
                  href={`/work/${zero.slug}`}
                  className="group rounded-lg border border-[#6366F1]/25 bg-gray-900/40 hover:bg-gray-900/55 hover:border-[#6366F1]/40 transition-colors p-5 md:p-6"
                >
                  <div className="flex items-stretch gap-4 md:gap-5">
                    <div className="self-stretch flex-shrink-0">
                      <ProductAppIcon product="zero" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-[#6366F1] transition-colors">
                          Zero Inbox <span className="text-gray-500 font-normal">· Rapid Email Triage</span>
                        </h3>
                      </div>
                      <p className="text-[11px] md:text-xs text-gray-300 leading-relaxed max-w-3xl">
                        {zero.description}
                        <span className="ml-2 inline-flex items-center gap-1 font-semibold text-[#6366F1] group-hover:underline underline-offset-4 whitespace-nowrap">
                          View case study <ArrowRight className="w-4 h-4" />
                        </span>
                      </p>
                    </div>
                  </div>
                </Link>
              )}

              {heirloom && (
                <Link
                  href={`/work/${heirloom.slug}`}
                  className="group rounded-lg border border-[#E85D4D]/25 bg-gray-900/40 hover:bg-gray-900/55 hover:border-[#E85D4D]/40 transition-colors p-5 md:p-6"
                >
                  <div className="flex items-stretch gap-4 md:gap-5">
                    <div className="self-stretch flex-shrink-0">
                      <ProductAppIcon product="heirloom" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-[#E85D4D] transition-colors">
                          Heirloom <span className="text-gray-500 font-normal">· Social Recipe Storage and Meal Planning</span>
                        </h3>
                      </div>
                      <p className="text-[11px] md:text-xs text-gray-300 leading-relaxed max-w-3xl">
                        {heirloom.description}
                        <span className="ml-2 inline-flex items-center gap-1 font-semibold text-[#E85D4D] group-hover:underline underline-offset-4 whitespace-nowrap">
                          View case study <ArrowRight className="w-4 h-4" />
                        </span>
                      </p>
                    </div>
                  </div>
                </Link>
              )}
            </div>
          </div>
        </section>

        {/* 4. PARTNERSHIP WORK */}
        <section className="relative py-6 md:py-10 px-4 sm:px-6 md:px-8 border-b border-gray-800">
          <div className="absolute inset-0 pointer-events-none">
            <ASCIIUnifiedGrid
              opacity={0.04}
              animated={true}
              colorTheme={watercolorThemes.terminalSubtle}
              charSet="default"
            />
          </div>

          <div className="relative z-10 max-w-5xl mx-auto">
            <div className="flex items-start gap-3 mb-4 md:mb-6">
              <div className="w-2 h-2 rounded-full bg-terminal-gold flex-shrink-0 mt-1.5" />
              <p className="text-xs md:text-sm text-gray-300 leading-relaxed max-w-5xl">
                <span className="font-semibold text-white">Partnership work is selective and often confidential.</span>{' '}
                We engage when there's strong alignment and a real problem worth proving in software. When discretion is required,
                materials are gated for partners and clients.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              {partnerships.map((project) => {
                const isConfidential = project.isProtected;
                const isAuthenticated = !!profile;

                const isInvestorOrPartner = profile && (profile.role === 'investor' || profile.role === 'partner' || profile.role === 'team' || profile.role === 'owner');
                const isClient = profile && profile.role === 'client';
                const clientProjectSlugs = isClient && profile.clientId ? CLIENT_PROJECT_MAPPING[profile.clientId] : null;
                const isClientProject = isClient && clientProjectSlugs && clientProjectSlugs.includes(project.slug);

                const needsBlur = isConfidential && !previewUnlocked && !isInvestorOrPartner && !isClientProject;

                const overviewHref = getConfidentialOverviewHref(project.slug);
                const hasQuickOverview = !!overviewHref;
                const pitchDeckPath = project.slug === 'case-study-010'
                  ? '/clients/creait/strategic-roadmap'
                  : project.slug === 'case-study-020'
                  ? '/clients/athletes-first/pitch-deck'
                  : project.slug === 'sanitary-waste-system'
                  ? '/clients/work/sanitary-waste-system/full-overview'
                  : `/work/${project.slug}`;

                const cardHref = isAuthenticated && hasQuickOverview && overviewHref
                  ? overviewHref
                  : `/work/${project.slug}`;

                return (
                  <Link
                    key={project.id}
                    href={needsBlur ? '/clients/login' : cardHref}
                    className={`group flex flex-col h-full min-h-[120px] w-full rounded-lg border ${
                      isConfidential ? 'border-amber-400/25 hover:border-amber-400/35' : 'border-gray-700 hover:border-terminal-gold/40'
                    } bg-gray-900/35 hover:bg-gray-900/50 transition-colors pt-2 md:pt-2.5 pb-4 md:pb-5 px-4 md:px-5 items-start !text-left`}
                  >
                    {/* Header (stacked) */}
                    <div className="space-y-1 text-left w-full">
                      {isConfidential && !previewUnlocked && needsBlur ? (
                        <>
                          {/* Locked: ### + CLASSIFIED (same line, left-justified) */}
                          <div className="flex items-center justify-start gap-3 w-full">
                            <div className="font-mono text-[10px] text-gray-500 tracking-widest">
                              {project.id.replace('case-study-', '').padStart(3, '0')}
                            </div>
                            <div className="inline-flex items-center gap-2">
                              <Lock className="w-3 h-3 text-amber-400" />
                              <span className="text-[10px] font-mono text-amber-400 font-bold tracking-wide">CLASSIFIED</span>
                            </div>
                          </div>
                        </>
                      ) : (
                        /* Unlocked: ### + Project Name (same line) */
                        <div className="flex items-baseline justify-start gap-2 w-full min-w-0 font-mono text-[10px] text-gray-200 tracking-widest">
                          <span className="flex-shrink-0">
                            {project.id.replace('case-study-', '').padStart(3, '0')}
                          </span>
                          <span className="truncate">
                            · {project.title}
                          </span>
                        </div>
                      )}

                      {/* Actions (quiet, directly under CLASSIFIED) */}
                      {isConfidential && !previewUnlocked && isAuthenticated && overviewHref && (
                        <div className="text-xs text-gray-400">
                          <div className="space-y-1">
                            <Link
                              href={overviewHref}
                              onClick={(e) => e.stopPropagation()}
                              className="block text-terminal-gold hover:text-terminal-gold-hover transition-colors"
                            >
                              Overview
                            </Link>
                            <Link
                              href={pitchDeckPath}
                              onClick={(e) => e.stopPropagation()}
                              className="block text-terminal-gold hover:text-terminal-gold-hover transition-colors"
                            >
                              Materials
                            </Link>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Body */}
                    <div className="mt-3 flex-1">
                      <p
                        className={`text-[11px] md:text-xs text-gray-300 leading-relaxed ${
                          needsBlur ? 'filter blur-md select-none' : ''
                        } line-clamp-2 md:line-clamp-3 lg:line-clamp-4`}
                      >
                        {project.description}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* 5. CTA (minimal) */}
        <section className="relative py-6 md:py-10 px-4 sm:px-6 md:px-8">
          <div className="relative z-10 max-w-5xl mx-auto">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-terminal-gold flex-shrink-0 mt-1.5" />
              <p className="text-xs md:text-sm text-gray-300 leading-relaxed">
                Interested in working together?{' '}
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1 text-terminal-gold hover:text-terminal-gold-hover font-semibold transition-colors"
                >
                  Schedule a call <ArrowRight className="w-3 h-3" />
                </Link>
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
