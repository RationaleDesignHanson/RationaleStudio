/**
 * How We Work Page - Window Shrine Design
 *
 * Explains engagement models, equity structure, and partnership approach
 * Transformed with OS8Window components and Terminal Republic aesthetic.
 */

'use client';

import Link from 'next/link';
import { OS8Window } from '@/components/visual-test';
import { ASCIIUnifiedGrid } from '@/components/visual';
import { watercolorThemes } from '@/lib/theme/watercolor-palette';
import { ButtonPrimary } from '@/components/ui';

export default function HowWeWorkPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white">
      {/* Hero */}
      <section className="relative py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-4 sm:px-6 md:px-8 border-b border-gray-800 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <ASCIIUnifiedGrid
            opacity={0.08}
            animated={true}
            colorTheme={watercolorThemes.terminalGold}
            charSet="default"
          />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto">
          <h1 className="text-2xl md:text-3xl lg:text-4xl sm:text-5xl lg:text-2xl md:text-3xl lg:text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            How We Work
          </h1>
          <p className="text-xl sm:text-2xl text-terminal-gold font-medium mb-4">
            Engagement models built for speed and alignment
          </p>
          <p className="text-lg text-gray-300 max-w-3xl">
            From 2-week validation sprints to multi-year equity partnerships. We structure every engagement around what you need—and what we believe is worth building together.
          </p>
        </div>
      </section>

      {/* Three Engagement Models */}
      <section className="relative py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-4 sm:px-6 md:px-8 border-b border-gray-800 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <ASCIIUnifiedGrid
            opacity={0.06}
            animated={true}
            colorTheme={watercolorThemes.terminalSubtle}
            charSet="default"
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="mb-12 text-center">
            <h2 className="text-3xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
              Three Ways to Work Together
            </h2>
            <p className="text-base sm:text-lg text-gray-300">
              Every engagement can be structured as cash, equity, or hybrid based on timeline, scope, and mutual belief.
            </p>
          </div>

          <div className="space-y-6">
            {/* Model 1: Cash */}
            <OS8Window
              title="$ Cash Engagements"
              variant="body"
              animateIn={false}
            >
              <p className="text-sm text-terminal-gold font-medium mb-3">When you need speed and certainty</p>
              <p className="text-base text-gray-300 leading-relaxed mb-4">
                Fixed-scope sprints and validation engagements. You pay, we deliver, no equity complexity. Best for teams with runway who need fast answers or prototypes to de-risk direction.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wide mb-2">Best For</h4>
                  <ul className="space-y-1 text-sm text-gray-300">
                    <li>• 2-6 week validation sprints</li>
                    <li>• Pre-seed founders testing ideas</li>
                    <li>• Series A+ de-risking features</li>
                    <li>• Clear scope, fast timeline</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wide mb-2">Structure</h4>
                  <ul className="space-y-1 text-sm text-gray-300">
                    <li>• Fixed deliverables</li>
                    <li>• Clear timeline (2-12 weeks)</li>
                    <li>• Payment upfront or milestones</li>
                    <li>• IP transfers at completion</li>
                  </ul>
                </div>
              </div>
            </OS8Window>

            {/* Model 2: Equity */}
            <OS8Window
              title="% Equity Partnerships"
              variant="featured"
              animateIn={false}
              className="border-2 border-terminal-gold/30"
            >
              <p className="text-sm text-terminal-gold font-medium mb-3">When we believe in what you're building</p>
              <p className="text-base text-gray-300 leading-relaxed mb-4">
                We become your product co-founder. Equity-only or reduced cash + equity. Highly selective (2-3 active at a time). We only partner when our expertise creates strategic advantage in AI, AR, or 0-1 products.
              </p>
              <div className="mb-4 p-4 rounded-lg bg-terminal-gold/5 border border-terminal-gold/20">
                <p className="text-sm text-white">
                  <span className="font-bold text-terminal-gold">Like Zero:</span> We're building our own AI email platform from concept to market. 1 month to complete execution plan, 7 working prototypes. Same conviction we bring to equity partnerships.{' '}
                  <Link href="/ventures/zero" className="text-terminal-gold hover:underline">See our proof →</Link>
                </p>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wide mb-2">Best For</h4>
                  <ul className="space-y-1 text-sm text-gray-300">
                    <li>• 6-18 month build partnerships</li>
                    <li>• Fractional CPO relationships</li>
                    <li>• Pre-seed to Series A</li>
                    <li>• AI/AR/0-1 product expertise</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wide mb-2">Structure</h4>
                  <ul className="space-y-1 text-sm text-gray-300">
                    <li>• 0.5-3% equity typical</li>
                    <li>• Vesting over engagement period</li>
                    <li>• Board observer rights (optional)</li>
                    <li>• Long-term aligned incentives</li>
                  </ul>
                </div>
              </div>
            </OS8Window>

            {/* Model 3: Hybrid */}
            <OS8Window
              title="$% Hybrid (Cash + Equity)"
              variant="body"
              animateIn={false}
            >
              <p className="text-sm text-terminal-gold font-medium mb-3">Most common for longer engagements</p>
              <p className="text-base text-gray-300 leading-relaxed mb-4">
                Reduced cash rate + equity stake. You conserve runway, we share upside. Typical for 3-12 month builds where mutual belief is high but you need to preserve capital for engineering and growth.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wide mb-2">Best For</h4>
                  <ul className="space-y-1 text-sm text-gray-300">
                    <li>• 3-12 month product builds</li>
                    <li>• Seed-stage runway preservation</li>
                    <li>• Strategic partnership mindset</li>
                    <li>• Ongoing post-launch support</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wide mb-2">Structure</h4>
                  <ul className="space-y-1 text-sm text-gray-300">
                    <li>• 50-70% cash discount</li>
                    <li>• 0.5-2% equity typical</li>
                    <li>• Milestone-based payments</li>
                    <li>• Shared success metrics</li>
                  </ul>
                </div>
              </div>
            </OS8Window>
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="relative py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-4 sm:px-6 md:px-8 border-b border-gray-800 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <ASCIIUnifiedGrid
            opacity={0.06}
            animated={true}
            colorTheme={watercolorThemes.darkGalaxy}
            charSet="default"
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="mb-12 text-center">
            <h2 className="text-3xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
              Our Process
            </h2>
            <p className="text-base sm:text-lg text-gray-300">
              Every engagement starts the same way: understanding your riskiest assumptions.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                phase: "Week 1: Align",
                description: "We map your product thesis, biggest unknowns, and success criteria. What would prove this is worth building? What would kill it?",
              },
              {
                phase: "Weeks 2-4: Prototype",
                description: "We build functional software that tests your core assumptions. Not mockups—working demos you can put in front of users or investors.",
              },
              {
                phase: "Weeks 4-6: Test & Validate",
                description: "We run your prototype through real usage scenarios. User testing, technical validation, market signal gathering. Evidence, not opinions.",
              },
              {
                phase: "Week 6+: Refine or Build",
                description: "Based on what we learned: pivot, persevere, or scale. If it's working, we help you build it. If not, we help you redirect before burning runway.",
              },
            ].map((step, i) => (
              <OS8Window key={i} title={step.phase} variant="body" animateIn={false}>
                <p className="text-sm text-gray-300 leading-relaxed">{step.description}</p>
              </OS8Window>
            ))}
          </div>
        </div>
      </section>

      {/* Why Equity Matters */}
      <section className="relative py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-4 sm:px-6 md:px-8 border-b border-gray-800 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <ASCIIUnifiedGrid
            opacity={0.06}
            animated={true}
            colorTheme={watercolorThemes.terminalSubtle}
            charSet="default"
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <OS8Window
            title="Why Equity Alignment Matters"
            variant="body"
            animateIn={false}
          >
            <p className="text-base text-gray-300 leading-relaxed mb-6 text-center">
              Equity is not just about economics—it changes how we think, decide, and build together.
            </p>

            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-bold text-terminal-gold uppercase tracking-wide mb-3">What Changes</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex gap-2"><span className="text-terminal-gold">•</span><span>We say no to bad ideas (even if billable)</span></li>
                  <li className="flex gap-2"><span className="text-terminal-gold">•</span><span>We prioritize long-term value over scope</span></li>
                  <li className="flex gap-2"><span className="text-terminal-gold">•</span><span>We are incentivized to build IP, not deliverables</span></li>
                  <li className="flex gap-2"><span className="text-terminal-gold">•</span><span>We care about your Series A, not just handoff</span></li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-bold text-terminal-gold uppercase tracking-wide mb-3">What Does Not Change</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex gap-2"><span className="text-terminal-gold">•</span><span>We still move fast (equity ≠ slow)</span></li>
                  <li className="flex gap-2"><span className="text-terminal-gold">•</span><span>You still own your company and roadmap</span></li>
                  <li className="flex gap-2"><span className="text-terminal-gold">•</span><span>We are selective, not transactional</span></li>
                  <li className="flex gap-2"><span className="text-terminal-gold">•</span><span>Clear deliverables and milestones still exist</span></li>
                </ul>
              </div>
            </div>
          </OS8Window>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-32 px-4 sm:px-6 lg:px-4 sm:px-6 md:px-8 overflow-hidden">
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
            title="Figure Out the Right Structure Together"
            variant="cta"
            animateIn={false}
            className="max-w-3xl"
          >
            <div className="space-y-6">
              <p className="text-base text-terminal-gold leading-relaxed text-center">
                Every engagement starts with a conversation about your timeline, runway, and what you're trying to prove.
              </p>

              <div className="flex justify-center pt-4">
                <ButtonPrimary href="/contact" size="lg">
                  Start the Conversation
                </ButtonPrimary>
              </div>
            </div>
          </OS8Window>
        </div>
      </section>
    </main>
  );
}
