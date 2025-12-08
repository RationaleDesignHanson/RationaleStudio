/**
 * Venture Detail Page - Window Shrine Design
 *
 * Individual venture pages with comprehensive information.
 * Public-facing marketing pages for each IP lab project.
 * Transformed with OS8Window components and Terminal Republic aesthetic.
 */

import { notFound } from 'next/navigation';
import Link from 'next/link';
import { OS8Window } from '@/components/visual-test';
import { ASCIIUnifiedGrid } from '@/components/visual';
import { watercolorThemes } from '@/lib/theme/watercolor-palette';
import { ventures, getVentureBySlug } from '@/lib/content/ventures';
import { ButtonPrimary, ButtonSecondary } from '@/components/ui';
import type { Metadata } from 'next';

interface VenturePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return ventures.map((venture) => ({
    slug: venture.slug,
  }));
}

export async function generateMetadata({ params }: VenturePageProps): Promise<Metadata> {
  const { slug } = await params;
  const venture = getVentureBySlug(slug);

  if (!venture) {
    return {
      title: 'Venture Not Found — Rationale',
    };
  }

  return {
    title: `${venture.title} — Rationale Ventures`,
    description: venture.tagline,
  };
}

export default async function VenturePage({ params }: VenturePageProps) {
  const { slug } = await params;
  const venture = getVentureBySlug(slug);

  if (!venture) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white">
      {/* Hero */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-800 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <ASCIIUnifiedGrid
            opacity={0.08}
            animated={true}
            colorTheme={watercolorThemes.terminalGold}
            charSet="default"
          />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto">
          <div className="mb-6">
            <Link href="/ventures" className="text-[#FFD700] hover:underline text-sm">
              ← Back to Ventures
            </Link>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            {venture.title}
          </h1>
          <p className="text-xl sm:text-2xl text-[#FFD700] font-medium mb-4">
            {venture.tagline}
          </p>
          <p className="text-lg text-gray-300 max-w-3xl">
            {venture.heroDescription}
          </p>
        </div>
      </section>

      {/* Meta Information */}
      <section className="relative py-12 px-4 sm:px-6 lg:px-8 border-b border-gray-800 overflow-hidden">
        <div className="relative z-10 max-w-5xl mx-auto">
          <div className="grid sm:grid-cols-3 gap-6">
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wide text-[#FFD700] mb-2">
                Status
              </h4>
              <p className="text-sm text-white">{venture.status}</p>
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wide text-[#FFD700] mb-2">
                Timeline
              </h4>
              <p className="text-sm text-white">{venture.meta.timeline}</p>
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wide text-[#FFD700] mb-2">
                Project Type
              </h4>
              <p className="text-sm text-white">{venture.meta.type}</p>
            </div>
          </div>

          {venture.meta.tags.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {venture.meta.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-3 py-1 rounded-full bg-[#FFD700]/10 text-[#FFD700] font-medium border border-[#FFD700]/20"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Problem */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-800 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <ASCIIUnifiedGrid
            opacity={0.06}
            animated={true}
            colorTheme={watercolorThemes.terminalSubtle}
            charSet="default"
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            {venture.problem.title}
          </h2>
          <p className="text-base sm:text-lg text-gray-300 mb-8 leading-relaxed">
            {venture.problem.description}
          </p>

          {venture.problem.painPoints.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wide text-[#FFD700] mb-4">
                Key Pain Points
              </h4>
              <div className="grid md:grid-cols-2 gap-4">
                {venture.problem.painPoints.map((point, index) => (
                  <div
                    key={index}
                    className="flex gap-3 p-4 rounded-lg border border-gray-700 bg-black/40"
                  >
                    <span className="text-[#FFD700]">•</span>
                    <p className="text-sm text-gray-300">{point}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Solution */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-800 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <ASCIIUnifiedGrid
            opacity={0.06}
            animated={true}
            colorTheme={watercolorThemes.darkGalaxy}
            charSet="default"
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            {venture.solution.title}
          </h2>
          <div className="p-6 rounded-lg border-2 border-[#FFD700]/30 bg-[#FFD700]/10 mb-8">
            <p className="text-base sm:text-lg text-white leading-relaxed">
              {venture.solution.description}
            </p>
          </div>

          {venture.solution.approach.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wide text-[#FFD700] mb-4">
                How We're Solving It
              </h4>
              <div className="space-y-3">
                {venture.solution.approach.map((step, index) => (
                  <div
                    key={index}
                    className="flex gap-3 p-4 rounded-lg border border-gray-700 bg-black/40"
                  >
                    <div className="flex-shrink-0 w-8 h-8 rounded bg-[#FFD700] text-black flex items-center justify-center font-bold text-sm">
                      {index + 1}
                    </div>
                    <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* What We're Building */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-800 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <ASCIIUnifiedGrid
            opacity={0.06}
            animated={true}
            colorTheme={watercolorThemes.terminalSubtle}
            charSet="default"
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold mb-8">
            {venture.building.title}
          </h2>

          <div className="space-y-6">
            {venture.building.features.map((feature, index) => (
              <OS8Window
                key={index}
                title={feature.title}
                variant="body"
                animateIn={false}
              >
                <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </OS8Window>
            ))}
          </div>
        </div>
      </section>

      {/* Technology */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-800 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <ASCIIUnifiedGrid
            opacity={0.06}
            animated={true}
            colorTheme={watercolorThemes.darkGalaxy}
            charSet="default"
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold mb-8">
            {venture.tech.title}
          </h2>

          <div className="space-y-6">
            {venture.tech.stack.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold uppercase tracking-wide text-[#FFD700] mb-4">
                  Tech Stack
                </h4>
                <div className="flex flex-wrap gap-2">
                  {venture.tech.stack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-2 text-sm rounded-lg border border-gray-700 bg-black/40 text-white font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {venture.tech.highlights.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold uppercase tracking-wide text-[#FFD700] mb-4">
                  Technical Highlights
                </h4>
                <div className="space-y-3">
                  {venture.tech.highlights.map((highlight, index) => (
                    <div
                      key={index}
                      className="flex gap-3 p-4 rounded-lg border border-gray-700 bg-black/40"
                    >
                      <span className="text-[#FFD700]">▸</span>
                      <p className="text-sm sm:text-base text-gray-300">{highlight}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Metrics - Only for ventures with metrics */}
      {'metrics' in venture && venture.metrics && (
        <section className="relative py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-800 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <ASCIIUnifiedGrid
              opacity={0.06}
              animated={true}
              colorTheme={watercolorThemes.terminalSubtle}
              charSet="default"
            />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold mb-8">
              By the Numbers
            </h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {Object.values(venture.metrics).map((metric: any, index: number) => (
                <div
                  key={index}
                  className="rounded-lg border-2 border-[#FFD700]/30 bg-[#FFD700]/5 p-6 text-center hover:border-[#FFD700] transition-colors"
                >
                  <div className="text-3xl sm:text-4xl font-bold text-[#FFD700] mb-2">
                    {metric.value}
                  </div>
                  <h4 className="text-sm font-semibold text-white mb-2">
                    {metric.label}
                  </h4>
                  <p className="text-xs text-gray-400">
                    {metric.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Vision */}
      <section className="relative py-32 px-4 sm:px-6 lg:px-8 border-b border-gray-800 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <ASCIIUnifiedGrid
            opacity={0.12}
            animated={true}
            colorTheme={watercolorThemes.terminalGold}
            charSet="default"
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            {venture.vision.title}
          </h2>
          <p className="text-base sm:text-lg text-gray-300 leading-relaxed mb-8">
            {venture.vision.description}
          </p>

          {venture.vision.futureState.length > 0 && (
            <div className="space-y-3">
              {venture.vision.futureState.map((future, index) => (
                <div
                  key={index}
                  className="flex gap-3 p-4 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20"
                >
                  <span className="text-white">→</span>
                  <p className="text-sm sm:text-base text-white/90">{future}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <ASCIIUnifiedGrid
            opacity={0.12}
            animated={true}
            colorTheme={watercolorThemes.terminalGold}
            charSet="default"
          />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto flex justify-center">
          <OS8Window
            title={venture.cta.title}
            variant="cta"
            animateIn={false}
            className="max-w-3xl"
          >
            <div className="space-y-6">
              <p className="text-base text-[#FFD700] leading-relaxed text-center">
                {venture.cta.description}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <ButtonPrimary href="/contact" size="lg">
                  {venture.cta.action}
                </ButtonPrimary>
                <ButtonSecondary href="/ventures" size="lg">
                  View all ventures
                </ButtonSecondary>
              </div>
            </div>
          </OS8Window>
        </div>
      </section>
    </main>
  );
}
