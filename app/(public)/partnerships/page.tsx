/**
 * Partnerships Page
 *
 * Strategic partnerships with companies to build custom AI products
 * Positioned as secondary to core studio model (building own ventures)
 */

'use client';

import Link from 'next/link';
import { ASCIIUnifiedGrid } from '@/components/visual';
import { GlassCard } from '@/components/visual';
import { watercolorThemes } from '@/lib/theme/watercolor-palette';
import { ArrowRight, Sparkles, Rocket, Building2 } from 'lucide-react';

interface PartnershipModel {
  id: string;
  name: string;
  tagline: string;
  timeline: string;
  priceRange: string;
  slug: string;
  scope: string[];
  bestFor: string;
  icon: React.ComponentType<{ className?: string }>;
}

const partnershipModels: PartnershipModel[] = [
  {
    id: 'discovery',
    name: 'Discovery Sprint',
    tagline: 'Validate direction before committing',
    timeline: '2 weeks',
    priceRange: '$15-25K',
    slug: 'clarity-kit',
    scope: [
      'Strategic assessment & opportunity mapping',
      'AI product concept validation',
      'Technical feasibility analysis',
      'Clear go/no-go recommendation'
    ],
    bestFor: 'Companies exploring AI product opportunities but need validation before full commitment',
    icon: Sparkles,
  },
  {
    id: 'prototype',
    name: 'Prototype Partnership',
    tagline: 'De-risk development with working prototypes',
    timeline: '4-6 weeks',
    priceRange: '$40-60K',
    slug: 'prototype-kit',
    scope: [
      'Multiple interactive prototypes',
      'Technical architecture design',
      'User testing & validation',
      'Production implementation roadmap'
    ],
    bestFor: 'Teams ready to validate core product assumptions with real prototypes before production build',
    icon: Rocket,
  },
  {
    id: 'build',
    name: 'Build Partnership',
    tagline: 'Full product development & launch',
    timeline: '8-12 weeks',
    priceRange: '$80-150K+',
    slug: 'build-ship-run',
    scope: [
      'Production-ready MVP development',
      'Deployment & infrastructure setup',
      'Beta rollout & launch strategy',
      'Post-launch support options'
    ],
    bestFor: 'Validated concepts ready for production development and market launch',
    icon: Building2,
  }
];

export default function PartnershipsPage() {
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
          <div className="inline-block px-4 py-2 bg-[#FFD700]/10 border border-[#FFD700]/30 rounded-full text-sm text-[#FFD700] mb-6">
            Strategic Partnerships
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            Partner with a Product Studio
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
            We build our own ventures, but we also partner with companies to develop custom AI products. Same systematic approach, same product thinking—applied to your opportunity.
          </p>
        </div>
      </section>

      {/* Studio Context */}
      <section className="relative py-12 px-4 sm:px-6 lg:px-8 bg-gray-900/30 border-b border-gray-800">
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="flex items-start gap-4 p-6 bg-gray-900/50 border border-gray-700 rounded-lg">
            <div className="p-3 bg-[#FFD700]/10 rounded-lg flex-shrink-0">
              <Sparkles className="w-6 h-6 text-[#FFD700]" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white mb-2">Why Partner with Us?</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Most studios only do client work. We're different—we build our own products (Zero, Atlas, Amplify) using the same process we'd use for partners. You get battle-tested methodology and AI expertise from a team that's actually shipping products.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Partnership Models */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="relative z-10 max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-4 text-center">
            Three Partnership Models
          </h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Start with discovery, move to prototypes, scale to production—or stop at any checkpoint.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {partnershipModels.map((model, index) => {
              const Icon = model.icon;
              return (
                <Link
                  key={model.id}
                  href={`/partnerships/${model.slug}`}
                  className="block group"
                >
                  <GlassCard className="h-full p-8 hover:border-accent/50 transition-all duration-300" borderRadius="0.75rem">
                    {/* Icon & Number */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 bg-[#FFD700]/10 rounded-lg">
                        <Icon className="w-6 h-6 text-[#FFD700]" />
                      </div>
                      <div className="px-3 py-1 bg-gray-900/50 border border-gray-700 rounded text-xs font-mono text-gray-400">
                        0{index + 1}
                      </div>
                    </div>

                    {/* Name & Tagline */}
                    <h2 className="text-2xl font-bold text-white mb-2 group-hover:text-accent transition-colors">
                      {model.name}
                    </h2>
                    <p className="text-sm text-gray-400 mb-6">{model.tagline}</p>

                    {/* Timeline & Price */}
                    <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-800">
                      <div>
                        <div className="text-xs text-gray-500 mb-1">Duration</div>
                        <div className="text-lg font-bold text-white">{model.timeline}</div>
                      </div>
                      <div className="w-px h-10 bg-gray-800"></div>
                      <div>
                        <div className="text-xs text-gray-500 mb-1">Investment</div>
                        <div className="text-lg font-bold text-white">{model.priceRange}</div>
                      </div>
                    </div>

                    {/* Scope */}
                    <div className="mb-6">
                      <h3 className="text-xs font-mono text-gray-400 uppercase tracking-wide mb-3">
                        What's Included
                      </h3>
                      <ul className="space-y-2">
                        {model.scope.map((item, idx) => (
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
                      <p className="text-sm text-gray-300">{model.bestFor}</p>
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
              );
            })}
          </div>

          {/* Flexible Terms Section */}
          <div className="mt-16 pt-12 border-t border-gray-800">
            <GlassCard className="p-8 text-center" borderRadius="0.75rem">
              <h2 className="text-2xl font-bold text-white mb-3">
                Flexible Partnership Terms
              </h2>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                We structure partnerships for cash, equity, or a combination based on your situation and alignment. For the right opportunities, we'll consider product equity stakes.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-accent text-accent-foreground font-medium hover:bg-accent/90 transition-colors"
              >
                Discuss your opportunity
                <ArrowRight className="w-4 h-4" />
              </Link>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* How Partnerships Work */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8 border-t border-gray-800">
        <div className="relative z-10 max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            How Partnerships Work
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <GlassCard className="p-6" borderRadius="0.75rem">
              <div className="text-4xl font-bold text-accent mb-3">1</div>
              <h3 className="text-lg font-bold text-white mb-2">Start with Discovery</h3>
              <p className="text-sm text-gray-400">
                2-week sprint to validate your opportunity. No long-term contracts—decide to continue or stop after every checkpoint.
              </p>
            </GlassCard>
            <GlassCard className="p-6" borderRadius="0.75rem">
              <div className="text-4xl font-bold text-accent mb-3">2</div>
              <h3 className="text-lg font-bold text-white mb-2">Bi-Weekly Reviews</h3>
              <p className="text-sm text-gray-400">
                Regular checkpoints to review progress, validate direction, and decide to continue, pivot, or conclude.
              </p>
            </GlassCard>
            <GlassCard className="p-6" borderRadius="0.75rem">
              <div className="text-4xl font-bold text-accent mb-3">3</div>
              <h3 className="text-lg font-bold text-white mb-2">Scale with Confidence</h3>
              <p className="text-sm text-gray-400">
                Move to production only after validating core assumptions with working prototypes and user testing.
              </p>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* Our Focus Areas */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8 border-t border-gray-800 bg-gray-900/30">
        <div className="relative z-10 max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            What We Partner On
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <GlassCard className="p-6" borderRadius="0.75rem">
              <h3 className="text-xl font-bold text-white mb-3">AI Product Development</h3>
              <p className="text-sm text-gray-400 mb-4">
                Custom AI-powered products leveraging LLMs, RAG systems, intelligent automation, and predictive analytics.
              </p>
              <p className="text-xs text-gray-500">
                Examples: Email AI, content intelligence, CRM automation, document analysis, conversational interfaces
              </p>
            </GlassCard>

            <GlassCard className="p-6" borderRadius="0.75rem">
              <h3 className="text-xl font-bold text-white mb-3">Platform & SaaS</h3>
              <p className="text-sm text-gray-400 mb-4">
                Modern web platforms, SaaS products, and internal tools with focus on speed, scalability, and user experience.
              </p>
              <p className="text-xs text-gray-500">
                Examples: B2B platforms, workflow automation, data dashboards, marketplace systems, admin portals
              </p>
            </GlassCard>

            <GlassCard className="p-6" borderRadius="0.75rem">
              <h3 className="text-xl font-bold text-white mb-3">Strategic Prototyping</h3>
              <p className="text-sm text-gray-400 mb-4">
                Rapid prototypes to test ideas with users before committing to full development. Multiple concepts, fast iteration.
              </p>
              <p className="text-xs text-gray-500">
                Examples: New product concepts, feature validation, user flow testing, technical feasibility studies
              </p>
            </GlassCard>

            <GlassCard className="p-6" borderRadius="0.75rem">
              <h3 className="text-xl font-bold text-white mb-3">Innovation Labs</h3>
              <p className="text-sm text-gray-400 mb-4">
                Embedded product teams for enterprises exploring new product opportunities or modernizing existing systems.
              </p>
              <p className="text-xs text-gray-500">
                Examples: 0-to-1 products for established companies, digital transformation initiatives, R&D partnerships
              </p>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8 border-t border-gray-800">
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to explore a partnership?</h2>
          <p className="text-gray-300 mb-8">
            Schedule a 30-minute intro call to discuss your opportunity and determine if we're a good fit.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base bg-[#FFD700] hover:bg-[#FFE34D] text-black font-semibold transition-all shadow-[0_0_17px_rgba(255,215,0,0.17)] hover:shadow-[0_0_25px_rgba(255,215,0,0.25)]"
            >
              Schedule Intro Call
            </Link>
            <Link
              href="/work"
              className="px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base border border-gray-300 hover:border-[#FFD700] text-white font-semibold transition-colors"
            >
              View Our Work
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
