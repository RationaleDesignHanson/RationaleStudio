/**
 * Portfolio Page
 *
 * Current ventures and partner collaboration opportunities
 */

import Link from 'next/link';
import { TrendingUp, ArrowRight } from 'lucide-react';
import { partnerContent } from '@/lib/content';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Portfolio | Partner Portal',
  description: 'Current ventures and collaboration opportunities for strategic partners',
};

export default function PortfolioPage() {
  const { portfolio } = partnerContent;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white">
      {/* Hero */}
      <section className="py-12 px-4 sm:px-6 lg:px-4 sm:px-6 md:px-8 border-b border-gray-800">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl sm:text-2xl md:text-3xl lg:text-4xl md:text-5xl font-bold text-white mb-4">
            Portfolio Ventures
          </h1>
          <p className="text-xl text-[#00FF94] mb-4">
            Current products and partnership opportunities
          </p>
          <p className="text-base text-gray-300">
            As a strategic partner, you can help shape product direction, introduce customers, and accelerate go-to-market for portfolio companies.
          </p>
        </div>
      </section>

      {/* Current Ventures */}
      <section className="py-12 px-4 sm:px-6 lg:px-4 sm:px-6 md:px-8 border-b border-gray-800">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8">Active Ventures</h2>
          <div className="space-y-8">
            {portfolio.ventures.map((venture, idx) => (
              <div
                key={idx}
                className="p-8 bg-gray-900/50 border border-gray-700 rounded-lg hover:border-[#00FF94]/50 transition-colors"
              >
                {/* Header */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">{venture.name}</h3>
                    <p className="text-lg text-gray-300">{venture.tagline}</p>
                  </div>
                  <span className="px-4 py-2 rounded-full text-sm font-medium bg-[#00FF94]/20 text-[#00FF94] border border-[#00FF94]/30">
                    {venture.status}
                  </span>
                </div>

                {/* Details Grid */}
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  {/* Left Column */}
                  <div className="space-y-4">
                    <div>
                      <p className="text-xs font-semibold text-[#00FF94] mb-2">Stage:</p>
                      <p className="text-sm text-gray-300">{venture.stage}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-[#00FF94] mb-2">Partner Opportunity:</p>
                      <p className="text-sm text-gray-300">{venture.opportunity}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-[#00FF94] mb-2">How You Can Help:</p>
                      <p className="text-sm text-gray-300">{venture.partnerValue}</p>
                    </div>
                  </div>

                  {/* Right Column - Metrics */}
                  <div className="p-6 bg-gray-900/70 border border-gray-800 rounded-lg">
                    <p className="text-xs font-semibold text-[#00FF94] mb-4">Key Metrics:</p>
                    <div className="space-y-3">
                      {Object.entries(venture.metrics).map(([key, value], midx) => (
                        <div key={midx}>
                          <p className="text-xs text-gray-400 capitalize mb-1">{key.replace(/([A-Z])/g, ' $1').trim()}:</p>
                          <p className="text-sm text-white">{value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Next Steps */}
                <div className="pt-6 border-t border-gray-800">
                  <p className="text-xs font-semibold text-[#00FF94] mb-3">Next Steps:</p>
                  <ul className="space-y-2">
                    {venture.nextSteps.map((step, sidx) => (
                      <li key={sidx} className="flex items-start gap-3 text-sm text-gray-300">
                        <span className="text-[#00FF94] flex-shrink-0">→</span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Concepts */}
      <section className="py-12 px-4 sm:px-6 lg:px-4 sm:px-6 md:px-8 border-b border-gray-800">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              {portfolio.upcomingConcepts.title}
            </h2>
            <p className="text-base text-gray-300">{portfolio.upcomingConcepts.description}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {portfolio.upcomingConcepts.concepts.map((concept, idx) => (
              <div
                key={idx}
                className="p-6 bg-gray-900/50 border border-gray-700 rounded-lg"
              >
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-800 text-gray-300 border border-gray-700 inline-block mb-4">
                  {concept.category}
                </span>
                <h3 className="text-lg font-bold text-white mb-2">{concept.name}</h3>
                <p className="text-sm text-gray-300 mb-4">{concept.oneLiner}</p>
                <div className="pt-4 border-t border-gray-800">
                  <p className="text-xs text-gray-500">
                    <span className="font-semibold text-white">Problem:</span> {concept.problem}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 px-4 sm:px-6 lg:px-4 sm:px-6 md:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="p-8 bg-gradient-to-r from-[#00FF94]/10 to-[#00FF94]/5 border border-[#00FF94]/30 rounded-lg">
            <h2 className="text-2xl font-bold text-white mb-4">Help Us Decide</h2>
            <p className="text-base text-gray-300 mb-6">
              Which ventures should we prioritize? Your input shapes our roadmap. Join the Q1 2025 quarterly review to vote on upcoming concepts.
            </p>
            <Link
              href="/partners/governance"
              className="inline-flex items-center gap-2 px-4 sm:px-6 md:px-8 py-4 bg-[#00FF94] hover:bg-[#00FF94]/90 text-black font-semibold rounded-lg transition-colors"
            >
              Learn About Quarterly Voting
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
