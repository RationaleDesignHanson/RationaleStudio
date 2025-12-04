/**
 * Historical Work Page
 *
 * Showcases past independent ventures and client work that demonstrate
 * technical execution, brand systems, and product thinking.
 */

import Link from 'next/link';
import { Container, Section } from '@/components/layout';
import { OS8Window } from '@/components/visual-test';
import { getSectionTheme } from '@/lib/theme/watercolor-palette';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Historical Work | Rationale',
  description: 'Independent ventures and client work demonstrating brand systems, interactive prototypes, and technical execution.',
};

export default function HistoricalWorkPage() {
  const theme = getSectionTheme('content');

  return (
    <>
      {/* Hero */}
      <Section spacing="large" background="default" colorTheme={theme}>
        <Container>
          <div className="max-w-4xl mx-auto mb-12">
            <Link href="/" className="text-[#FFD700] hover:underline text-sm mb-6 block">
              ← Back to Home
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold text-[#FFD700] mb-4">
              Historical Work
            </h1>
            <p className="text-lg text-gray-300 leading-relaxed">
              Past independent ventures and client work that shaped Rationale's approach to product development, brand systems, and technical execution.
            </p>
          </div>

          {/* RUMI: Independent Venture */}
          <div className="mb-12 max-w-6xl mx-auto">
            <OS8Window
              title="Rumi · Context-Aware AI Companion"
              variant="featured"
              animateIn={false}
            >
              <div className="space-y-6">
                <div>
                  <span className="text-xs font-bold text-[#FFD700] uppercase tracking-wide">
                    Co-Founded as Head of Design · 2024 · Founding Equity Partner
                  </span>
                </div>

                <h3 className="text-2xl md:text-3xl font-bold text-[#FFD700]">
                  End-to-End Product Development: Brand to Prototype
                </h3>

                <p className="text-sm text-gray-100 leading-relaxed">
                  Co-founded Rumi as Head of Design with founding equity. Context-aware AI companion that transforms passive media into interactive experiences. Built complete brand identity, modular type system, product UI/UX, and functional HTML/CSS/JS prototype. Demonstrates capability to take products from concept to working software.
                </p>

                {/* Case Study Images Grid */}
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="rounded-lg overflow-hidden border border-[#FFD700]/20">
                    <img
                      src="/images/work/rumi/rumi-problem.png"
                      alt="Rumi problem statement: vision wasn't the problem, definition was"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="rounded-lg overflow-hidden border border-[#FFD700]/20">
                    <img
                      src="/images/work/rumi/rumi-brand-system.png"
                      alt="Rumi brand system showing modular typography and color palette"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="rounded-lg overflow-hidden border border-[#FFD700]/20">
                    <img
                      src="/images/work/rumi/rumi-product-screens.png"
                      alt="Rumi product screens showing rewards system and auto mode"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Prototype Link */}
                <div className="pt-4">
                  <a
                    href="/prototypes/rumi/index.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-6 py-3 bg-[#FFD700] text-black font-semibold rounded-lg hover:bg-[#FFD700]/90 transition-colors"
                  >
                    Launch Interactive Prototype →
                  </a>
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  <span className="px-3 py-1 rounded-full bg-[#FFD700]/10 border border-[#FFD700]/30 text-[#FFD700] text-xs font-semibold">Brand System Design</span>
                  <span className="px-3 py-1 rounded-full bg-[#FFD700]/10 border border-[#FFD700]/30 text-[#FFD700] text-xs font-semibold">Interactive Prototype</span>
                  <span className="px-3 py-1 rounded-full bg-[#FFD700]/10 border border-[#FFD700]/30 text-[#FFD700] text-xs font-semibold">UX Flow Design</span>
                </div>
              </div>
            </OS8Window>
          </div>

          {/* VIACOM: Client Work */}
          <div className="mb-12 max-w-6xl mx-auto">
            <OS8Window
              title="Viacom History Installation · Mixed Reality Experience"
              variant="interactive"
              animateIn={false}
            >
              <div className="space-y-6">
                <div>
                  <span className="text-xs font-bold text-[#FFD700] uppercase tracking-wide">
                    Client Engagement · 2016 · Technical Lead
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-[#FFD700]">
                  Building Large-Scale Mixed Reality Installations
                </h3>

                <p className="text-sm text-gray-100 leading-relaxed">
                  Led technical development for Viacom's "Composition VI" mixed reality installation at their Times Square headquarters. Interactive experience combining physical space, projection mapping, and real-time motion capture.
                </p>

                <div className="bg-gray-900/50 border border-[#FFD700]/20 rounded-lg p-6">
                  <h4 className="text-lg font-bold text-[#FFD700] mb-4">What Was Built</h4>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li>• Real-time motion tracking system for multi-user interactions</li>
                    <li>• Custom projection mapping software synchronized across multiple displays</li>
                    <li>• Interactive content management system for dynamic experiences</li>
                    <li>• Physical installation integrated with digital systems</li>
                  </ul>
                </div>

                <div className="flex gap-4">
                  <a
                    href="https://slanted.studio/work/viacom-composition-vi/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#FFD700] hover:underline text-sm font-semibold"
                  >
                    View Case Study →
                  </a>
                  <a
                    href="https://motionographer.com/2016/10/18/making-mixed-reality-behind-the-scenes-of-the-history-of-viacom-installation/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#FFD700] hover:underline text-sm font-semibold"
                  >
                    Behind The Scenes Article →
                  </a>
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  <span className="px-3 py-1 rounded-full bg-[#FFD700]/10 border border-[#FFD700]/30 text-[#FFD700] text-xs font-semibold">Motion Tracking</span>
                  <span className="px-3 py-1 rounded-full bg-[#FFD700]/10 border border-[#FFD700]/30 text-[#FFD700] text-xs font-semibold">Projection Mapping</span>
                  <span className="px-3 py-1 rounded-full bg-[#FFD700]/10 border border-[#FFD700]/30 text-[#FFD700] text-xs font-semibold">Real-time Systems</span>
                </div>
              </div>
            </OS8Window>
          </div>

        </Container>
      </Section>
    </>
  );
}
