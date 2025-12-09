'use client';

import { useState } from 'react';
import { GlassCard } from '@/components/visual';
import { ASCIIUnifiedGrid } from '@/components/visual';
import { watercolorThemes } from '@/lib/theme/watercolor-palette';
import { ChevronDown, ChevronUp, Mail, MessageSquare, Calendar, CheckCircle2 } from 'lucide-react';

export default function ContactPage() {
  const [showWhatToInclude, setShowWhatToInclude] = useState(false);

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white">
      {/* 1. HERO SECTION */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-800">
        <div className="absolute inset-0 pointer-events-none">
          <ASCIIUnifiedGrid
            opacity={0.08}
            animated={true}
            colorTheme={watercolorThemes.terminalGold}
            charSet="default"
          />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <p className="text-xs sm:text-sm font-mono text-[#FFD700] tracking-widest mb-4">
            START A CONVERSATION
          </p>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
            Let's Figure Out the Right Fit
          </h1>

          <p className="text-lg sm:text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
            Whether you need a 2-week strategy sprint or an 18-month technical co-founder,
            we're here to help you ship.
          </p>
        </div>
      </section>

      {/* 2. PRIMARY EMAIL CTA */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-800">
        <div className="absolute inset-0 pointer-events-none">
          <ASCIIUnifiedGrid
            opacity={0.04}
            animated={true}
            colorTheme={watercolorThemes.terminalSubtle}
            charSet="default"
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <GlassCard className="p-8 sm:p-10" borderRadius="0.75rem">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-[#FFD700]/10 border border-[#FFD700]/30 rounded-lg flex items-center justify-center mx-auto mb-6">
                <Mail className="w-8 h-8 text-[#FFD700]" />
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                Get in Touch
              </h2>

              <a
                href="mailto:studio@rationale.design"
                className="inline-block px-8 py-4 bg-[#FFD700] hover:bg-[#FFE34D] text-black font-semibold rounded-lg transition-all duration-200 shadow-lg shadow-[#FFD700]/20 hover:shadow-[#FFD700]/40 hover:scale-105 text-lg mb-6"
              >
                studio@rationale.design
              </a>

              <p className="text-sm text-gray-400">
                We typically respond within 24 hours with initial feedback and next steps.
              </p>
            </div>

            {/* Collapsible What to Include */}
            <div className="border-t border-gray-700 pt-6">
              <button
                onClick={() => setShowWhatToInclude(!showWhatToInclude)}
                className="flex items-center justify-between w-full text-left group"
              >
                <span className="text-base font-semibold text-[#FFD700] group-hover:text-[#FFE34D] transition-colors">
                  What to Include in Your Email
                </span>
                {showWhatToInclude ? (
                  <ChevronUp className="w-5 h-5 text-[#FFD700]" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-[#FFD700]" />
                )}
              </button>

              {showWhatToInclude && (
                <div className="mt-4 space-y-2 text-sm text-gray-300 animate-fade-in">
                  <div className="flex items-start gap-2">
                    <span className="text-[#FFD700] mt-1">•</span>
                    <span>What you're building and the problem you're solving</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-[#FFD700] mt-1">•</span>
                    <span>Your timeline (weeks? months?)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-[#FFD700] mt-1">•</span>
                    <span>Your preference: cash, equity, or hybrid engagement</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-[#FFD700] mt-1">•</span>
                    <span>Any existing work (prototypes, specs, etc.)</span>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-6 p-4 bg-[#FFD700]/5 border border-[#FFD700]/20 rounded">
              <p className="text-sm text-gray-300">
                <span className="font-bold text-[#FFD700]">Not the right fit?</span> We'll tell you
                honestly and recommend alternatives. No hard feelings.
              </p>
            </div>
          </GlassCard>
        </div>
      </section>

      {/* 3. WHAT HAPPENS NEXT */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-800">
        <div className="absolute inset-0 pointer-events-none">
          <ASCIIUnifiedGrid
            opacity={0.04}
            animated={true}
            colorTheme={watercolorThemes.terminalSubtle}
            charSet="default"
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs sm:text-sm font-mono text-[#FFD700] tracking-widest mb-2">
              OUR PROCESS
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              What Happens Next
            </h2>
          </div>

          <div className="space-y-6">
            {/* Step 1 */}
            <GlassCard className="p-6" borderRadius="0.75rem">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#FFD700]/10 border border-[#FFD700]/30 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-[#FFD700]" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-mono text-[#FFD700]">STEP 1</span>
                    <span className="text-xs text-gray-500">•</span>
                    <span className="text-xs text-gray-400">24 hours</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Initial Review</h3>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    We review your email and respond with initial thoughts on fit, approach, and
                    feasibility. If we're not the right partner, we'll recommend alternatives.
                  </p>
                </div>
              </div>
            </GlassCard>

            {/* Step 2 */}
            <GlassCard className="p-6" borderRadius="0.75rem">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#FFD700]/10 border border-[#FFD700]/30 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MessageSquare className="w-6 h-6 text-[#FFD700]" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-mono text-[#FFD700]">STEP 2</span>
                    <span className="text-xs text-gray-500">•</span>
                    <span className="text-xs text-gray-400">2-3 days</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Discovery Call</h3>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    30-minute conversation to dig deeper into your goals, constraints, and success
                    criteria. We'll discuss which engagement model (cash, equity, hybrid) makes sense.
                  </p>
                </div>
              </div>
            </GlassCard>

            {/* Step 3 */}
            <GlassCard className="p-6" borderRadius="0.75rem">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#FFD700]/10 border border-[#FFD700]/30 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-6 h-6 text-[#FFD700]" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-mono text-[#FFD700]">STEP 3</span>
                    <span className="text-xs text-gray-500">•</span>
                    <span className="text-xs text-gray-400">1 week</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Proposal & Terms</h3>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    We send a detailed proposal with scope, timeline, deliverables, and commercial
                    terms. You review, we adjust if needed, and finalize the agreement.
                  </p>
                </div>
              </div>
            </GlassCard>

            {/* Step 4 */}
            <GlassCard className="p-6" borderRadius="0.75rem">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#FFD700]/10 border border-[#FFD700]/30 rounded-lg flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-6 h-6 text-[#FFD700]" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-mono text-[#FFD700]">STEP 4</span>
                    <span className="text-xs text-gray-500">•</span>
                    <span className="text-xs text-gray-400">Kickoff</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Start Building</h3>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    We kick off with day 1 planning, establish communication cadence, and start
                    shipping. You'll see progress daily with working software every sprint.
                  </p>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* 4. ENGAGEMENT SELECTOR (OPTIONAL) */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 pointer-events-none">
          <ASCIIUnifiedGrid
            opacity={0.04}
            animated={true}
            colorTheme={watercolorThemes.terminalSubtle}
            charSet="default"
          />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs sm:text-sm font-mono text-[#FFD700] tracking-widest mb-2">
              OPTIONAL: PRE-QUALIFY
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Which Engagement Fits Best?
            </h2>
            <p className="text-base text-gray-400 max-w-2xl mx-auto">
              Use these pre-filled email templates to quickly reach out with the right context
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {/* Clarity Kit */}
            <a
              href="mailto:studio@rationale.design?subject=Clarity%20Kit%20Inquiry&body=Hi%20Rationale%20team%2C%0A%0AI'm%20interested%20in%20a%20Clarity%20Kit%20engagement.%0A%0AWhat%20I'm%20building%3A%20%0ATimeline%3A%20%0APreference%3A%20cash%20%7C%20equity%20%7C%20hybrid%0A%0AThanks!"
              className="block p-5 bg-gray-800/30 border border-gray-700 hover:border-[#FFD700] rounded-lg transition-all group"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <p className="text-xs font-mono text-[#FFD700]">2 WEEKS</p>
                    <p className="text-base font-semibold text-white">I have an idea I want to validate</p>
                  </div>
                  <p className="text-sm text-gray-300 mb-3">
                    Get technical plan, market positioning, and go/no-go recommendation
                  </p>
                  <p className="text-xs text-gray-500">
                    Investment: ~2-3 weeks of senior engineering time
                  </p>
                </div>
                <span className="text-[#FFD700] text-xl group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </a>

            {/* Prototype Kit */}
            <a
              href="mailto:studio@rationale.design?subject=Prototype%20Kit%20Inquiry&body=Hi%20Rationale%20team%2C%0A%0AI'm%20interested%20in%20a%20Prototype%20Kit%20engagement.%0A%0AWhat%20I'm%20building%3A%20%0ATimeline%3A%20%0APreference%3A%20cash%20%7C%20equity%20%7C%20hybrid%0A%0AThanks!"
              className="block p-5 bg-gray-800/30 border border-gray-700 hover:border-[#FFD700] rounded-lg transition-all group"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <p className="text-xs font-mono text-[#FFD700]">4-6 WEEKS</p>
                    <p className="text-base font-semibold text-white">I need a working prototype to test</p>
                  </div>
                  <p className="text-sm text-gray-300 mb-3">
                    Get interactive software to validate with real users before full build
                  </p>
                  <p className="text-xs text-gray-500">
                    Investment: ~Mid-level full-stack dev for 2 months
                  </p>
                </div>
                <span className="text-[#FFD700] text-xl group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </a>

            {/* Build Ship Run */}
            <a
              href="mailto:studio@rationale.design?subject=Build%20Ship%20Run%20Inquiry&body=Hi%20Rationale%20team%2C%0A%0AI'm%20interested%20in%20a%20Build%20Ship%20Run%20engagement.%0A%0AWhat%20I'm%20building%3A%20%0ATimeline%3A%20%0APreference%3A%20cash%20%7C%20equity%20%7C%20hybrid%0A%0AThanks!"
              className="block p-5 bg-gray-800/30 border border-gray-700 hover:border-[#FFD700] rounded-lg transition-all group"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <p className="text-xs font-mono text-[#FFD700]">6-18 MONTHS</p>
                    <p className="text-base font-semibold text-white">I'm ready to build and ship a full product</p>
                  </div>
                  <p className="text-sm text-gray-300 mb-3">
                    Get full product development from concept to App Store/launch
                  </p>
                  <p className="text-xs text-gray-500">
                    Investment: ~Your first technical co-founder
                  </p>
                </div>
                <span className="text-[#FFD700] text-xl group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </a>

            {/* Not Sure */}
            <a
              href="mailto:studio@rationale.design?subject=Custom%20Engagement%20Inquiry&body=Hi%20Rationale%20team%2C%0A%0AI'm%20not%20sure%20which%20engagement%20fits%20best.%20Here's%20what%20I'm%20looking%20for%3A%0A%0A%0A%0AThanks!"
              className="block p-5 bg-gray-900/50 border border-gray-600 hover:border-[#FFD700] rounded-lg transition-all group"
            >
              <div className="flex justify-between items-center">
                <div className="flex-1">
                  <p className="text-sm font-semibold text-white mb-1">Not sure which fits?</p>
                  <p className="text-xs text-gray-400">Let's talk — we'll help you figure out the right approach</p>
                </div>
                <span className="text-[#FFD700] text-xl group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </a>
          </div>

          <p className="text-center text-xs text-gray-500 mt-8">
            Each option opens a pre-filled email template
          </p>
        </div>
      </section>
    </main>
  );
}
