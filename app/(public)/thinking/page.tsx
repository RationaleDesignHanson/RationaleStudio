/**
 * Thinking Index Page
 *
 * Clean blog-style article list
 */

'use client';

import Link from 'next/link';
import { ASCIIUnifiedGrid } from '@/components/visual';
import { watercolorThemes } from '@/lib/theme/watercolor-palette';
import { ArrowRight } from 'lucide-react';

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
    id: '0',
    title: 'Two Engines, Proven in Production',
    slug: 'dual-engine-model',
    description: 'How Rationale operates two integrated engines that reinforce each other—and why this model produces better outcomes for clients.',
    readTime: '5 min',
    category: 'MODEL'
  },
  {
    id: '1',
    title: 'Vision, Proof, and the Work Between',
    slug: 'vision-proof-burden',
    description: 'The gift of vision is cursed with the burden of proof. On the responsibility of standing between what is visible and what is provable.',
    readTime: '9 min',
    category: 'VISION'
  },
  {
    id: '2',
    title: 'The Build-First Trap',
    slug: 'build-first-trap',
    description: 'Why most teams waste 6 months building the wrong thing—and how specs fail before you even start coding.',
    readTime: '8 min',
    category: 'PROBLEM'
  },
  {
    id: '3',
    title: 'Build-to-Think Methodology',
    slug: 'build-to-think',
    description: 'The systematic framework for de-risking development through rapid prototyping and validated decisions.',
    readTime: '10 min',
    category: 'METHODOLOGY'
  },
  {
    id: '4',
    title: 'Spec vs Prototype',
    slug: 'spec-vs-prototype',
    description: 'Why experiencing beats describing. The fundamental difference between documentation and validation.',
    readTime: '6 min',
    category: 'METHODOLOGY'
  },
  {
    id: '5',
    title: 'Methodology Origins',
    slug: 'methodology-origins',
    description: '7 years at Meta Reality Labs shipping AR/AI products to billions. Where Rationale\'s approach comes from.',
    readTime: '7 min',
    category: 'ORIGIN'
  }
];

export default function ThinkingPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white">

      {/* Hero */}
      <section className="relative py-6 md:py-10 px-4 sm:px-6 md:px-8 border-b border-gray-800">
        <div className="absolute inset-0 pointer-events-none">
          <ASCIIUnifiedGrid
            opacity={0.08}
            animated={true}
            colorTheme={watercolorThemes.terminalGold}
            charSet="default"
          />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto">
          <p className="text-xs font-mono text-terminal-gold tracking-widest mb-3">
            THINKING
          </p>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
            Essays on building software that matters.
          </h1>

          <p className="text-base md:text-lg text-gray-300 max-w-3xl">
            What we've learned shipping products at Meta, building our own IP, and working with founders who move fast.
          </p>
        </div>
      </section>

      {/* Article List */}
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
          <div className="space-y-8">
            {essays.map((essay) => (
              <Link
                key={essay.id}
                href={`/thinking/${essay.slug}`}
                className="group block"
              >
                <div className="flex flex-col gap-1">
                  <h2 className="text-base md:text-lg font-semibold text-white group-hover:text-terminal-gold transition-colors">
                    {essay.title}
                  </h2>
                  <p className="text-xs md:text-sm text-gray-400 leading-relaxed">
                    {essay.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA (minimal) */}
      <section className="relative py-6 md:py-10 px-4 sm:px-6 md:px-8">
        <div className="relative z-10 max-w-5xl mx-auto">
          <div className="relative">
            <div className="absolute -left-5 top-[5px] w-2 h-2 rounded-full bg-terminal-gold" />
            <p className="text-xs md:text-sm text-gray-300 leading-relaxed">
              Want to apply this thinking to your product?{' '}
              <Link
                href="/contact"
                className="inline-flex items-center gap-1 text-terminal-gold hover:text-terminal-gold-hover font-semibold transition-colors"
              >
                Let's talk <ArrowRight className="w-3 h-3" />
              </Link>
            </p>
          </div>
        </div>
      </section>

    </main>
  );
}
