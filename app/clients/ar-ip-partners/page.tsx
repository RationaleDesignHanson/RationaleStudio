'use client';

import Link from 'next/link';
import { ASCIIUnifiedGrid } from '@/components/visual';
import { watercolorThemes } from '@/lib/theme/watercolor-palette';
import { Lock, ArrowRight } from 'lucide-react';

export default function ARIPPartnersClientPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white">
      <div className="fixed inset-0 pointer-events-none">
        <ASCIIUnifiedGrid opacity={0.04} animated={true} colorTheme={watercolorThemes.terminalSubtle} charSet="default" />
      </div>

      {/* HERO */}
      <section className="relative py-10 md:py-16 px-4 sm:px-6 md:px-8 border-b border-gray-800">
        <div className="absolute inset-0 pointer-events-none">
          <ASCIIUnifiedGrid opacity={0.08} animated={true} colorTheme={watercolorThemes.terminalGold} charSet="default" />
        </div>
        <div className="relative z-10 max-w-5xl mx-auto">
          <Link href="/work" className="text-sm text-gray-400 hover:text-terminal-gold mb-6 inline-block">
            ← Back to work
          </Link>

          <div className="flex items-center gap-2 mb-3">
            <Lock className="w-4 h-4 text-amber-400" />
            <p className="text-xs font-mono text-amber-400 tracking-widest">CONFIDENTIAL · META · 2018–2024</p>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">AR for IP Partners</h1>

          <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-3xl">
            Partner pitches and strategic positioning for major IP partners across location-based AR, branded experiences, and platform integration.
          </p>
        </div>
      </section>

      {/* WHAT'S IN HERE */}
      <section className="relative py-8 md:py-12 px-4 sm:px-6 md:px-8 border-b border-gray-800">
        <div className="relative z-10 max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-2 h-2 rounded-full bg-terminal-gold" />
            <h2 className="text-xl md:text-2xl font-bold text-white">What&rsquo;s in here</h2>
          </div>
          <p className="text-base md:text-lg text-gray-300 leading-relaxed max-w-3xl mb-4">
            Pitch decks and strategic materials developed for IP partner engagements during the Spark AR years. Includes:
          </p>
          <ul className="space-y-2 text-base md:text-lg text-gray-300 leading-relaxed max-w-3xl">
            <li>· Disney location-based AR pitch (Points of Interest)</li>
            <li>· Internal location-based AR research synthesis from the Tate, Starbucks, and British Vogue partnership era</li>
            <li>· Other partner-specific platform pitches</li>
          </ul>
        </div>
      </section>

      {/* GATE */}
      <section className="relative py-8 md:py-12 px-4 sm:px-6 md:px-8 border-b border-gray-800">
        <div className="relative z-10 max-w-5xl mx-auto">
          <div className="rounded-xl border border-amber-400/25 bg-gray-900/40 p-5 md:p-6">
            <div className="flex items-start gap-3">
              <Lock className="w-5 h-5 text-amber-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-base font-bold text-white mb-2">Confidential materials</h3>
                <p className="text-sm md:text-base text-gray-300 leading-relaxed">
                  Partner-specific decks and strategy artifacts remain under NDA. Available with login or by request, depending on which engagement.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-10 md:py-14 px-4 sm:px-6 md:px-8">
        <div className="relative z-10 max-w-5xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-3 flex-wrap">
            <a
              href="mailto:hanson@rationale.work?subject=AR%20for%20IP%20Partners%20case%20studies"
              className="inline-flex items-center gap-2 px-5 py-3 bg-terminal-gold hover:bg-[#FFE34D] text-black font-semibold rounded-lg transition-colors"
            >
              Email about this work <ArrowRight className="w-4 h-4" />
            </a>
            <Link
              href="/work"
              className="inline-flex items-center gap-1 px-5 py-3 border border-gray-600 hover:border-terminal-gold text-white font-semibold rounded-lg transition-colors"
            >
              Back to work
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
