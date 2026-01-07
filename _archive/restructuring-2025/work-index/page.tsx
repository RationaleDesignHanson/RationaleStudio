/**
 * Work Portfolio Index
 *
 * Reorganized: Our products first, then partnerships
 * Clear separation between ventures we own vs. client work
 * Simple card aesthetic matching home page style
 */

'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ASCIIUnifiedGrid } from '@/components/visual';
import { watercolorThemes } from '@/lib/theme/watercolor-palette';
import { getAllProjects, getProjectBySlug } from '@/lib/content/work-projects';
import { Lock, ArrowRight } from 'lucide-react';
import { useAuth } from '@/lib/auth/AuthContext';

// Map clientId to project slugs for client-specific access
// Each client can access multiple case studies
const CLIENT_PROJECT_MAPPING: Record<string, string[]> = {
  'creait': ['case-study-010', 'case-study-030'],
  'athletes-first': ['case-study-020', 'case-study-030'],
  // Add more mappings as clients are added
};

function ProductAppIcon({ product }: { product: 'zero' | 'heirloom' }) {
  // These assets are already used on the product case study pages (e.g. `/work/zero`, `/work/heirloom`).
  // Even though `public/` is filtered from this environment, the paths resolve at runtime.
  // If you want to swap this, place the file into:
  // `/Users/matthanson/.cursor/worktrees/rationale-public/omr/public/heirloom/`
  // then update this URL path to match the exact filename/casing.
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
    // Full-height column (matches the text stack height), but the *icon itself* stays square.
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

export default function WorkPage() {
  const { profile } = useAuth();
  const router = useRouter();
  const projects = getAllProjects();
  const zero = getProjectBySlug('zero');
  const heirloom = getProjectBySlug('heirloom');
  // Local/Cursor preview helper: show confidential cards in their "unlocked" state during development.
  // This does NOT affect production builds.
  const previewUnlocked = process.env.NODE_ENV !== 'production';

  // Separate our products from partnerships
  const ourProducts = projects.filter(p => p.category === 'consumer' && !p.isProtected);
  const partnerships = projects.filter(p => p.category !== 'consumer' || p.isProtected);

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
    <main className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white">
      {/* Header */}
      <section className="relative py-6 md:py-10 px-4 sm:px-6 lg:px-4 sm:px-6 md:px-8 border-b border-gray-800">
        <div className="absolute inset-0 pointer-events-none">
          <ASCIIUnifiedGrid
            opacity={0.08}
            animated={true}
            colorTheme={watercolorThemes.terminalGold}
            charSet="default"
          />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <p className="text-xs font-mono text-terminal-gold tracking-widest">
            PRODUCTS WE BUILD · SYSTEMS WE SHIP · STRATEGY TO EXECUTION
          </p>
        </div>
      </section>

      {/* Featured Projects Hero - Zero & Heirloom */}
      <section className="relative py-6 md:py-10 px-4 sm:px-6 lg:px-4 sm:px-6 md:px-8 border-b border-gray-800">
        <div className="absolute inset-0 pointer-events-none">
          <ASCIIUnifiedGrid
            opacity={0.04}
            animated={true}
            colorTheme={watercolorThemes.terminalSubtle}
            charSet="default"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="flex items-start gap-3 mb-4 md:mb-6">
            <div className="w-2 h-2 rounded-full bg-terminal-gold flex-shrink-0 mt-1.5" />
            <p className="text-xs md:text-sm text-gray-300 leading-relaxed max-w-5xl">
              <span className="font-semibold text-white">Conviction comes from usage.</span>{' '}
              Prototypes put ideas in people’s hands, and real consumer behaviors force decisions. Operating in production keeps our
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

      {/* Additional Ventures - If we add more consumer products */}
      {ourProducts.length > 2 && (
        <section className="relative py-6 md:py-10 px-4 sm:px-6 lg:px-4 sm:px-6 md:px-8 border-b border-gray-800">
          <div className="absolute inset-0 pointer-events-none">
            <ASCIIUnifiedGrid
              opacity={0.04}
              animated={true}
              colorTheme={watercolorThemes.terminalSubtle}
              charSet="default"
            />
          </div>

          <div className="relative z-10 max-w-6xl mx-auto">
            <div className="flex items-center gap-3 mb-4 md:mb-6">
              <div className="w-2 h-2 rounded-full bg-terminal-gold" />
              <h2 className="text-xl md:text-2xl font-bold text-white">More Ventures</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {ourProducts.slice(2).map((project) => (
                <Link key={project.id} href={`/work/${project.slug}`} className="group block">
                  <div className="h-full p-4 md:p-5 bg-gray-900/50 border border-gray-700 rounded-lg hover:border-terminal-gold/50 transition-all duration-300">
                    <div className="space-y-3">
                      <div>
                        <h3 className="text-lg md:text-xl font-bold text-white mb-2 group-hover:text-terminal-gold transition-colors">
                          {project.title}
                        </h3>
                      </div>

                      <div className="flex items-center justify-between">
                        <ProjectStatusBadge status={project.status as any} size="md" className="font-bold" />
                      </div>

                      <p className="text-gray-300 text-sm">{project.description}</p>

                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <span key={tag} className="px-2 py-1 rounded text-xs bg-gray-700 text-gray-300">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Partnership Work Section */}
      <section className="relative py-6 md:py-10 px-4 sm:px-6 lg:px-4 sm:px-6 md:px-8">
        <div className="absolute inset-0 pointer-events-none">
          <ASCIIUnifiedGrid
            opacity={0.04}
            animated={true}
            colorTheme={watercolorThemes.terminalSubtle}
            charSet="default"
          />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="flex items-start gap-3 mb-4 md:mb-6">
            <div className="w-2 h-2 rounded-full bg-terminal-gold flex-shrink-0 mt-1.5" />
            <p className="text-xs md:text-sm text-gray-300 leading-relaxed max-w-5xl">
              <span className="font-semibold text-white">Partnership work is selective and often confidential.</span>{' '}
              We engage when there’s strong alignment and a real problem worth proving in software. When discretion is required,
              materials are gated for partners and clients.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {partnerships.map((project) => {
              // Special treatment for protected/confidential work
              const isConfidential = project.isProtected;
              const isAuthenticated = !!profile;

              // Determine access level
              const isInvestorOrPartner = profile && (profile.role === 'investor' || profile.role === 'partner' || profile.role === 'team' || profile.role === 'owner');
              const isClient = profile && profile.role === 'client';
              const clientProjectSlugs = isClient && profile.clientId ? CLIENT_PROJECT_MAPPING[profile.clientId] : null;
              const isClientProject = isClient && clientProjectSlugs && clientProjectSlugs.includes(project.slug);

              // Apply blur logic:
              // - Investor/partner: see all unblurred
              // - Client: only their project unblurred, others blurred
              // - Unauthenticated: all blurred
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

              // Handle click for locked cards
              const handleCardClick = (e: React.MouseEvent) => {
                if (needsBlur) {
                  e.preventDefault();
                  router.push(`/clients/login?redirect=${encodeURIComponent(`/work/${project.slug}`)}`);
                }
              };

              // Determine the correct href based on auth status and quick overview availability
              const cardHref = isAuthenticated && hasQuickOverview && overviewHref
                ? overviewHref
                : `/work/${project.slug}`;

              return (
                <Link
                  key={project.id}
                  href={cardHref}
                  className={`group flex flex-col h-full w-full rounded-lg border ${
                    isConfidential ? 'border-amber-400/25 hover:border-amber-400/35' : 'border-gray-700 hover:border-terminal-gold/40'
                  } bg-gray-900/35 hover:bg-gray-900/50 transition-colors p-4 md:p-5 items-start !text-left ${needsBlur ? 'cursor-pointer' : ''}`}
                  onClick={handleCardClick}
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
                          {!isAuthenticated ? (
                            <button
                              type="button"
                              className="inline-flex items-center gap-2 p-0 bg-transparent border-0"
                              title="Sign in to view"
                              aria-label="Sign in to view"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                const redirectTo = overviewHref ?? `/work/${project.slug}`;
                                router.push(`/clients/login?redirect=${encodeURIComponent(redirectTo)}`);
                              }}
                            >
                              <Lock className="w-3 h-3 text-amber-400" />
                              <span className="text-[10px] font-mono text-amber-400 font-bold tracking-wide">CLASSIFIED</span>
                            </button>
                          ) : (
                            <div className="inline-flex items-center gap-2">
                              <Lock className="w-3 h-3 text-amber-400" />
                              <span className="text-[10px] font-mono text-amber-400 font-bold tracking-wide">CLASSIFIED</span>
                            </div>
                          )}
                        </div>

                        {/* Project title (visible even when locked) */}
                        <div className="text-sm font-semibold text-white">
                          {project.title}
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
                    <div className="mt-2 text-[11px] md:text-xs font-semibold text-terminal-gold">
                      View case study <ArrowRight className="w-4 h-4 inline ml-1" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-4 sm:px-6 md:px-8 border-t border-gray-800">
        <div className="absolute inset-0 pointer-events-none">
          <ASCIIUnifiedGrid
            opacity={0.04}
            animated={true}
            colorTheme={watercolorThemes.terminalSubtle}
            charSet="default"
          />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-white">Interested in partnering?</h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            We take on select partnerships where we see strong alignment and opportunity to apply our product expertise.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="px-6 py-3 sm:px-8 sm:py-4 text-base md:text-lg bg-terminal-gold hover:bg-terminal-gold-hover text-black font-semibold transition-all shadow-lg shadow-terminal-gold/20 hover:shadow-xl hover:shadow-terminal-gold/30 rounded-lg text-center"
            >
              Schedule Intro Call
            </Link>
            <Link
              href="/partnerships"
              className="px-6 py-3 sm:px-8 sm:py-4 text-base md:text-lg border border-gray-700 hover:border-terminal-gold text-white font-semibold transition-colors rounded-lg text-center"
            >
              View Partnership Models
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
