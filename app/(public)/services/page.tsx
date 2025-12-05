/**
 * Services Index Page
 *
 * Overview of three engagement models
 * Clarity Kit, Prototype Kit, Build Ship Run
 */

'use client';

import Link from 'next/link';
import { ASCIIUnifiedGrid } from '@/components/visual';
import { GlassCard } from '@/components/visual';
import { watercolorThemes } from '@/lib/theme/watercolor-palette';
import { ArrowRight } from 'lucide-react';

interface ServiceKit {
  id: string;
  name: string;
  tagline: string;
  timeline: string;
  priceRange: string;
  slug: string;
  scope: string[];
  bestFor: string;
}

const serviceKits: ServiceKit[] = [
  {
    id: 'clarity',
    name: 'Clarity Kit',
    tagline: 'Validate before you build',
    timeline: '2 weeks',
    priceRange: '$15-25K',
    slug: 'clarity-kit',
    scope: [
      'Current state assessment',
      'Opportunity identification',
      'Prototype roadmap',
      'Go/no-go recommendation'
    ],
    bestFor: 'Early-stage founders who need validation before committing capital'
  },
  {
    id: 'prototype',
    name: 'Prototype Kit',
    tagline: 'De-risk your development',
    timeline: '4 weeks',
    priceRange: '$40-60K',
    slug: 'prototype-kit',
    scope: [
      'Interactive prototypes (3-7)',
      'Technical architecture',
      'User testing insights',
      'Implementation roadmap'
    ],
    bestFor: 'Teams ready to validate core assumptions before production'
  },
  {
    id: 'build',
    name: 'Build Ship Run',
    tagline: 'Production-ready MVP',
    timeline: '8-12 weeks',
    priceRange: '$80-150K+',
    slug: 'build-ship-run',
    scope: [
      'Production-ready MVP',
      'Deployment & infrastructure',
      'Beta rollout strategy',
      'Ongoing support options'
    ],
    bestFor: 'Validated concepts ready for production build and launch'
  }
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white">
      {/* Background Grid */}
      <div className="fixed inset-0 pointer-events-none">
        <ASCIIUnifiedGrid
          opacity={0.04}
          animated={true}
          colorTheme={watercolorThemes.terminalSubtle}
          charSet="default"
        />
      </div>

      {/* Header */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-800">
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            How We Work
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
            Three engagement models, all using the same systematic approach. Start with validation, move to prototypes, scale to production—or stop at any checkpoint.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {serviceKits.map((kit, index) => (
              <Link
                key={kit.id}
                href={`/services/${kit.slug}`}
                className="block group"
              >
                <GlassCard className="h-full p-8 hover:border-accent/50 transition-all duration-300" borderRadius="0.75rem">
                  {/* Kit Number */}
                  <div className="inline-block px-3 py-1 bg-gray-900/50 border border-gray-700 rounded text-xs font-mono text-gray-400 mb-4">
                    KIT {index + 1}
                  </div>

                  {/* Name & Tagline */}
                  <h2 className="text-2xl font-bold text-white mb-2 group-hover:text-accent transition-colors">
                    {kit.name}
                  </h2>
                  <p className="text-sm text-gray-400 mb-6">{kit.tagline}</p>

                  {/* Timeline & Price */}
                  <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-800">
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Timeline</div>
                      <div className="text-lg font-bold text-white">{kit.timeline}</div>
                    </div>
                    <div className="w-px h-10 bg-gray-800"></div>
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Investment</div>
                      <div className="text-lg font-bold text-white">{kit.priceRange}</div>
                    </div>
                  </div>

                  {/* Scope */}
                  <div className="mb-6">
                    <h3 className="text-xs font-mono text-gray-400 uppercase tracking-wide mb-3">
                      What's Included
                    </h3>
                    <ul className="space-y-2">
                      {kit.scope.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-gray-300">
                          <span className="text-accent mt-1">→</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Best For */}
                  <div className="bg-gray-900/50 border border-gray-700 p-4 rounded-lg mb-6">
                    <div className="text-xs font-mono text-gray-400 uppercase tracking-wide mb-2">
                      Best For
                    </div>
                    <p className="text-sm text-gray-300">{kit.bestFor}</p>
                  </div>

                  {/* CTA */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-800">
                    <span className="text-sm font-medium text-gray-400 group-hover:text-accent transition-colors">
                      Learn more
                    </span>
                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-accent group-hover:translate-x-1 transition-all" />
                  </div>
                </GlassCard>
              </Link>
            ))}
          </div>

          {/* Equity Section */}
          <div className="mt-16 pt-12 border-t border-gray-800">
            <GlassCard className="p-8 text-center" borderRadius="0.75rem">
              <h2 className="text-2xl font-bold text-white mb-3">
                Flexible Engagement Models
              </h2>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                Every engagement can be structured for cash, equity, or a combination that makes sense for your situation. We're open to discussing what works best—no pressure, just options.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-accent text-accent-foreground font-medium hover:bg-accent/90 transition-colors"
              >
                Discuss your project
                <ArrowRight className="w-4 h-4" />
              </Link>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8 border-t border-gray-800">
        <div className="relative z-10 max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <GlassCard className="p-6" borderRadius="0.75rem">
              <div className="text-4xl font-bold text-accent mb-3">1</div>
              <h3 className="text-lg font-bold text-white mb-2">Start Small</h3>
              <p className="text-sm text-gray-400">
                Begin with Clarity Kit to validate your concept. No long-term commitment required.
              </p>
            </GlassCard>
            <GlassCard className="p-6" borderRadius="0.75rem">
              <div className="text-4xl font-bold text-accent mb-3">2</div>
              <h3 className="text-lg font-bold text-white mb-2">Clear Checkpoints</h3>
              <p className="text-sm text-gray-400">
                Every 2 weeks: review progress, validate direction, decide to continue or pivot.
              </p>
            </GlassCard>
            <GlassCard className="p-6" borderRadius="0.75rem">
              <div className="text-4xl font-bold text-accent mb-3">3</div>
              <h3 className="text-lg font-bold text-white mb-2">Scale Confidently</h3>
              <p className="text-sm text-gray-400">
                Move to production only after validating core assumptions with prototypes.
              </p>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8 border-t border-gray-800">
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Not sure which kit fits?</h2>
          <p className="text-gray-300 mb-8">
            Book a 30-minute intro call to discuss your project and determine the right starting point.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base bg-[#FFD700] hover:bg-[#FFE34D] text-black font-semibold transition-all shadow-[0_0_17px_rgba(255,215,0,0.17)] hover:shadow-[0_0_25px_rgba(255,215,0,0.25)]"
            >
              Book intro call
            </Link>
            <Link
              href="/work"
              className="px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base border border-gray-300 hover:border-[#FFD700] text-white font-semibold transition-colors"
            >
              View our work
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
