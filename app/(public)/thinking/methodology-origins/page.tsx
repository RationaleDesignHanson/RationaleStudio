/**
 * Essay: The Whiteboard Moment
 *
 * The origin story of Rationale's founding principle
 */

'use client';

import Link from 'next/link';
import { ASCIIUnifiedGrid } from '@/components/visual';
import { GlassCard } from '@/components/visual';
import { watercolorThemes } from '@/lib/theme/watercolor-palette';
import { ArrowLeft } from 'lucide-react';

export default function MethodologyOriginsPage() {
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

      {/* Back Link */}
      <div className="relative z-10 px-4 sm:px-6 lg:px-8 pt-8">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/thinking"
            className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-accent transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Thinking
          </Link>
        </div>
      </div>

      {/* Article Header */}
      <article className="relative py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <header className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-mono text-gray-400 uppercase tracking-wide">
                Origin Story
              </span>
              <span className="text-xs text-gray-500">•</span>
              <span className="text-xs text-gray-400">5 min read</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              The Whiteboard Moment
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              One conversation at Meta Reality Labs changed everything. A simple drawing on a whiteboard became the founding principle of Rationale.
            </p>
          </header>

          {/* The Story */}
          <div className="prose prose-invert max-w-none">
            <GlassCard className="p-8 mb-8" borderRadius="0.75rem">
              <h2 className="text-2xl font-bold text-white mb-4">The Vision Video Request</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                When I worked at Meta, right after they acquired Oculus, I wanted to create a vision video for our augmented reality platform. I went to my skip manager (who would later form Reality Labs) to request budget approval.
              </p>
              <p className="text-gray-300 leading-relaxed">
                He stopped me and told me this story: Someone once came to his office asking for a few million dollars to finish a feature film about virtual reality. It was impressive, expensive, but the entire film only had about 10 minutes of actual in-headset product experience. You couldn't really understand what it did.
              </p>
            </GlassCard>

            <GlassCard className="p-8 mb-8" borderRadius="0.75rem">
              <h2 className="text-2xl font-bold text-white mb-4">The Drawing</h2>
              <p className="text-gray-300 leading-relaxed mb-6">
                He went to the whiteboard. On the left, he drew a lightbulb (an idea). On the right, a ship (a shipping product). He drew a line connecting them.
              </p>

              {/* Visual Representation */}
              <div className="my-8 p-8 bg-gray-900/50 border border-gray-700 rounded-lg">
                <div className="flex items-center justify-between max-w-2xl mx-auto">
                  {/* Lightbulb */}
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 mb-3 flex items-center justify-center text-4xl">
                      💡
                    </div>
                    <p className="text-xs text-gray-400 text-center">AN IDEA</p>
                  </div>

                  {/* Line with markers */}
                  <div className="flex-1 mx-8 relative">
                    <div className="h-0.5 bg-gradient-to-r from-[#FFD700] to-[#00D9FF]"></div>
                    {/* Vision video marker (left) */}
                    <div className="absolute left-[15%] -top-8">
                      <div className="flex flex-col items-center">
                        <div className="w-3 h-3 bg-red-500 rounded-full mb-1"></div>
                        <p className="text-xs text-red-400 whitespace-nowrap">Vision videos</p>
                      </div>
                    </div>
                    {/* Target marker (right) */}
                    <div className="absolute right-[15%] -top-8">
                      <div className="flex flex-col items-center">
                        <div className="w-3 h-3 bg-[#00FF94] rounded-full mb-1"></div>
                        <p className="text-xs text-[#00FF94] whitespace-nowrap">Where you want to be</p>
                      </div>
                    </div>
                  </div>

                  {/* Ship */}
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 mb-3 flex items-center justify-center text-4xl">
                      🚢
                    </div>
                    <p className="text-xs text-gray-400 text-center">SHIPPING<br/>PRODUCT</p>
                  </div>
                </div>
              </div>

              <p className="text-gray-300 leading-relaxed mb-4">
                He made a checkmark close to the lightbulb and said, "This is where vision videos are."
              </p>
              <p className="text-gray-300 leading-relaxed">
                Then he walked to the right side and made a mark close to the ship: <span className="font-bold text-[#00FF94]">"This is where you want to be. Get the work so close to shipping that all you need is engineering resources to make it real."</span>
              </p>
            </GlassCard>

            <GlassCard className="p-8 mb-8" borderRadius="0.75rem">
              <h2 className="text-2xl font-bold text-white mb-4">The Lesson</h2>
              <div className="border-l-4 border-[#FFD700] pl-6 py-4 mb-6 bg-gray-900/30">
                <p className="text-lg text-gray-300 leading-relaxed italic">
                  "Anything to the left of that mark doesn't get you much value."
                </p>
              </div>
              <p className="text-gray-300 leading-relaxed">
                That conversation changed everything for me. It crystallized a principle I'd seen work at scale but never articulated so clearly: the closer you get to real, shipping software, the more value you create. The further left you stay—in concepts, presentations, specs—the less certain you are about what actually works.
              </p>
            </GlassCard>

            <GlassCard className="p-8 mb-8" borderRadius="0.75rem">
              <h2 className="text-2xl font-bold text-white mb-4">Why This Founded Rationale</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                That whiteboard drawing became the founding principle of Rationale: help teams get to that critical point—close to shipping—before committing significant resources.
              </p>
              <p className="text-gray-300 leading-relaxed mb-6">
                Most consultancies and agencies keep you on the left side of that line. They deliver specs, wireframes, design files. Beautiful documentation that tells you what could be built. But you're still far from knowing if it will actually work.
              </p>
              <p className="text-gray-300 leading-relaxed mb-6">
                Rationale exists to move teams to the right side of the line—to that mark close to shipping. We build working prototypes. We validate with real users. We de-risk the expensive parts before you commit to full production.
              </p>
              <div className="bg-gray-900/50 border border-gray-700 p-6 rounded-lg">
                <h3 className="text-white font-bold mb-3 text-sm uppercase tracking-wide">The Rationale Principle</h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Get the work so close to shipping that you know it will work before you scale the team, commit the budget, or build the production system. Validate with working software. Prove before you commit.
                </p>
              </div>
            </GlassCard>

            <GlassCard className="p-8 mb-8" borderRadius="0.75rem">
              <h2 className="text-2xl font-bold text-white mb-4">Where This Shows Up Today</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="text-[#00D9FF] text-xl flex-shrink-0">→</span>
                  <div>
                    <p className="text-white font-semibold mb-1">Clarity Kit (2 weeks)</p>
                    <p className="text-sm text-gray-300">Moves you from idea to validated plan with working prototypes</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-[#00D9FF] text-xl flex-shrink-0">→</span>
                  <div>
                    <p className="text-white font-semibold mb-1">Prototype Kit (4-6 weeks)</p>
                    <p className="text-sm text-gray-300">Gets you close to shipping—interactive software that validates with real users</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-[#00D9FF] text-xl flex-shrink-0">→</span>
                  <div>
                    <p className="text-white font-semibold mb-1">Build Ship Run (6-18 months)</p>
                    <p className="text-sm text-gray-300">Takes you all the way to the ship—production software in market</p>
                  </div>
                </div>
              </div>
            </GlassCard>
          </div>

          {/* Footer Navigation */}
          <div className="mt-12 pt-8 border-t border-gray-800">
            <div className="flex items-center justify-between">
              <Link
                href="/thinking/spec-vs-prototype"
                className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-accent transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Previous: Spec vs Prototype
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-accent transition-colors"
              >
                Learn More About Us
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </article>
    </main>
  );
}
