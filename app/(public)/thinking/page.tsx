/**
 * Thinking Index Page
 *
 * Collection of essays on software methodology and execution
 * Extracted from /overview presentation content
 */

'use client';

import Link from 'next/link';
import { ASCIIUnifiedGrid } from '@/components/visual';
import { GlassCard } from '@/components/visual';
import { watercolorThemes } from '@/lib/theme/watercolor-palette';

interface Essay {
  id: string;
  title: string;
  slug: string;
  description: string;
  readTime: string;
  category: string;
}

const essays: Essay[] = [
  {
    id: '1',
    title: 'Vision, Proof, and the Work Between',
    slug: 'vision-proof-burden',
    description: 'The gift of vision is cursed with the burden of proof. On the responsibility of standing between what is visible and what is provable.',
    readTime: '9 min',
    category: 'Vision'
  },
  {
    id: '2',
    title: 'The Build-First Trap',
    slug: 'build-first-trap',
    description: 'Why most teams waste 6 months building the wrong thing—and how specs fail before you even start coding.',
    readTime: '8 min',
    category: 'Problem'
  },
  {
    id: '3',
    title: 'Build-to-Think Methodology',
    slug: 'build-to-think',
    description: 'The systematic framework for de-risking development through rapid prototyping and validated decisions.',
    readTime: '10 min',
    category: 'Methodology'
  },
  {
    id: '4',
    title: 'Spec vs Prototype',
    slug: 'spec-vs-prototype',
    description: 'Why experiencing beats describing. The fundamental difference between documentation and validation.',
    readTime: '6 min',
    category: 'Methodology'
  },
  {
    id: '5',
    title: 'Methodology Origins',
    slug: 'methodology-origins',
    description: '7 years at Meta Reality Labs shipping AR/AI products to billions. Where Rationale\'s approach comes from.',
    readTime: '7 min',
    category: 'Origin Story'
  }
];

export default function ThinkingPage() {
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
      <section className="relative py-6 md:py-8 lg:py-12 px-4 sm:px-6 lg:px-4 sm:px-6 md:px-8 border-b border-gray-800">
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <h1 className="text-2xl sm:text-3xl md:text-2xl md:text-3xl lg:text-4xl lg:text-5xl font-bold mb-3 md:mb-6">
            Thinking
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
            Essays on software methodology, execution, and what we've learned building products at Meta and with clients.
          </p>
        </div>
      </section>

      {/* Essays Grid */}
      <section className="relative py-6 md:py-8 lg:py-12 px-4 sm:px-6 lg:px-4 sm:px-6 md:px-8">
        <div className="relative z-10 max-w-5xl mx-auto">
          <div className="space-y-6">
            {essays.map((essay) => (
              <Link
                key={essay.id}
                href={`/thinking/${essay.slug}`}
                className="block group"
              >
                <GlassCard className="p-4 md:p-6 hover:border-accent/50 transition-all duration-300" borderRadius="0.75rem">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-xs font-mono text-gray-400 uppercase tracking-wide">
                          {essay.category}
                        </span>
                        <span className="text-xs text-gray-500">•</span>
                        <span className="text-xs text-gray-400">{essay.readTime} read</span>
                      </div>
                      <h2 className="text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-accent transition-colors">
                        {essay.title}
                      </h2>
                      <p className="text-gray-400 leading-relaxed">
                        {essay.description}
                      </p>
                    </div>
                    <div className="flex-shrink-0 pt-2">
                      <svg
                        className="w-4 h-4 md:w-5 md:h-5 text-gray-400 group-hover:text-accent group-hover:translate-x-1 transition-all"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </GlassCard>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-8 md:py-12 lg:py-16 px-4 sm:px-6 lg:px-4 sm:px-6 md:px-8 border-t border-gray-800">
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <h2 className="text-xl md:text-2xl font-bold mb-4">Ready to apply this methodology?</h2>
          <p className="text-gray-300 mb-4 md:mb-8">
            We use this systematic approach on every engagement—whether it's a 3-week sprint or 12-week pilot.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="px-6 py-3 sm:px-4 sm:px-6 md:px-8 sm:py-4 text-sm sm:text-base bg-terminal-gold hover:bg-[#FFE34D] text-black font-semibold transition-all shadow-[0_0_17px_rgba(255,215,0,0.17)] hover:shadow-[0_0_25px_rgba(255,215,0,0.25)]"
            >
              Book intro call
            </Link>
            <Link
              href="/partnerships"
              className="px-6 py-3 sm:px-4 sm:px-6 md:px-8 sm:py-4 text-sm sm:text-base border border-gray-300 hover:border-terminal-gold text-white font-semibold transition-colors"
            >
              View partnerships
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
