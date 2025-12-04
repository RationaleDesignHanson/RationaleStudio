'use client';

import Link from 'next/link';
import { OS8Window } from '@/components/visual-test';

export default function HowWeWorkPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-800">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs sm:text-sm font-mono text-[#FFD700] tracking-widest mb-4 animate-fade-in-up">
            PROVEN VELOCITY // ALIGNED INCENTIVES
          </p>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in-up delay-100">
            How We Work
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl text-gray-300 leading-relaxed max-w-3xl mb-8 animate-fade-in-up delay-200">
            Engagement models built for speed and alignment. From 2-week validation sprints to multi-year equity partnerships—we structure every engagement around what you need and what we believe is worth building together.
          </p>
        </div>
      </section>

      {/* Three Engagement Models */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-800">
        <div className="max-w-7xl mx-auto">
          {/* Section Title */}
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              Three Ways to Work Together
            </h2>
            <p className="text-sm text-gray-400 font-mono tracking-wider">
              CASH // EQUITY // HYBRID
            </p>
          </div>

          {/* Desktop: 3-Column Grid */}
          <div className="hidden lg:grid lg:grid-cols-3 gap-8">
            {/* Model 1: Cash */}
            <OS8Window
              title="Cash Engagements"
              variant="default"
              delay={100}
              className="h-full hover:scale-[1.02] transition-transform duration-300"
            >
              <div className="space-y-6">
                <h3 className="text-lg font-bold text-black">
                  When you need speed and certainty
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Fixed-scope sprints and validation engagements. You pay, we deliver, no equity complexity. Best for teams with runway who need fast answers or prototypes to de-risk direction.
                </p>

                <div className="border-l-2 border-gray-300 pl-4">
                  <p className="font-bold text-black text-xs mb-2">BEST FOR</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 2-6 week validation sprints</li>
                    <li>• Pre-seed founders testing ideas</li>
                    <li>• Series A+ de-risking features</li>
                    <li>• Clear scope, fast timeline</li>
                  </ul>
                </div>

                <div className="border-l-2 border-gray-300 pl-4">
                  <p className="font-bold text-black text-xs mb-2">STRUCTURE</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Fixed deliverables</li>
                    <li>• Clear timeline (2-12 weeks)</li>
                    <li>• Payment upfront or milestones</li>
                    <li>• IP transfers at completion</li>
                  </ul>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <Link
                    href="/contact"
                    className="text-sm text-black hover:text-gray-600 font-semibold transition-colors"
                  >
                    Learn More →
                  </Link>
                </div>
              </div>
            </OS8Window>

            {/* Model 2: Equity (FEATURED) */}
            <OS8Window
              title="Equity Partnerships"
              variant="yellow"
              delay={200}
              className="h-full lg:scale-105 shadow-2xl relative z-10"
            >
              {/* Featured badge */}
              <div className="absolute -top-3 right-4 bg-[#FFD700] text-black px-3 py-1 text-xs font-bold z-10">
                FEATURED
              </div>

              <div className="space-y-6">
                <h3 className="text-lg font-bold text-black">
                  When we believe in what you're building
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  We become your product co-founder. Equity-only or reduced cash + equity. Highly selective (2-3 active at a time). We only partner when our expertise creates strategic advantage in AI, AR, or 0-1 products.
                </p>

                {/* Callout: Like Zero */}
                <div className="p-4 border border-[#FFD700] bg-yellow-50">
                  <p className="text-sm text-black mb-2">
                    <span className="font-bold text-[#FFD700]">Like Zero:</span> We're building our own AI email platform from concept to market. 1 month to complete execution plan, 7 working prototypes. Same conviction we bring to equity partnerships.
                  </p>
                  <Link href="/work/zero" className="text-sm font-semibold text-[#FFD700] hover:underline">
                    See our proof →
                  </Link>
                </div>

                <div className="border-l-2 border-[#FFD700] pl-4">
                  <p className="font-bold text-black text-xs mb-2">BEST FOR</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 6-18 month build partnerships</li>
                    <li>• Fractional CPO relationships</li>
                    <li>• Pre-seed to Series A</li>
                    <li>• AI/AR/0-1 product expertise</li>
                  </ul>
                </div>

                <div className="border-l-2 border-[#FFD700] pl-4">
                  <p className="font-bold text-black text-xs mb-2">STRUCTURE</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 0.5-3% equity typical</li>
                    <li>• Vesting over engagement period</li>
                    <li>• Board observer rights (optional)</li>
                    <li>• Long-term aligned incentives</li>
                  </ul>
                </div>

                <div className="pt-4 border-t border-[#FFD700]">
                  <Link
                    href="/contact"
                    className="block w-full bg-[#FFD700] hover:bg-[#FFE34D] text-black text-center px-6 py-3 font-semibold transition-colors"
                  >
                    Start the Conversation →
                  </Link>
                </div>
              </div>
            </OS8Window>

            {/* Model 3: Hybrid */}
            <OS8Window
              title="Hybrid (Cash + Equity)"
              variant="minimal"
              delay={300}
              className="h-full hover:scale-[1.02] transition-transform duration-300"
            >
              <div className="space-y-6">
                <h3 className="text-lg font-bold text-black">
                  Most common for longer engagements
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Reduced cash rate + equity stake. You conserve runway, we share upside. Typical for 3-12 month builds where mutual belief is high but you need to preserve capital for engineering and growth.
                </p>

                <div className="border-l-2 border-gray-800 pl-4">
                  <p className="font-bold text-black text-xs mb-2">BEST FOR</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 3-12 month product builds</li>
                    <li>• Seed-stage runway preservation</li>
                    <li>• Strategic partnership mindset</li>
                    <li>• Ongoing post-launch support</li>
                  </ul>
                </div>

                <div className="border-l-2 border-gray-800 pl-4">
                  <p className="font-bold text-black text-xs mb-2">STRUCTURE</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 50-70% cash discount</li>
                    <li>• 0.5-2% equity typical</li>
                    <li>• Milestone-based payments</li>
                    <li>• Shared success metrics</li>
                  </ul>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <Link
                    href="/contact"
                    className="text-sm text-black hover:text-gray-600 font-semibold transition-colors"
                  >
                    Learn More →
                  </Link>
                </div>
              </div>
            </OS8Window>
          </div>

          {/* Mobile: Stacked */}
          <div className="lg:hidden space-y-8">
            {/* Same windows, no animation delays */}
            <OS8Window
              title="Cash Engagements"
              variant="default"
              animateIn={false}
            >
              <div className="space-y-4">
                <h3 className="text-base font-bold text-black">
                  When you need speed and certainty
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Fixed-scope sprints. You pay, we deliver, no equity complexity.
                </p>
                <div className="border-l-2 border-gray-300 pl-3 space-y-2">
                  <p className="font-bold text-black text-xs">BEST FOR</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 2-6 week sprints</li>
                    <li>• Testing ideas</li>
                    <li>• De-risking features</li>
                  </ul>
                </div>
                <Link href="/contact" className="text-sm text-black font-semibold">
                  Learn More →
                </Link>
              </div>
            </OS8Window>

            <OS8Window
              title="Equity Partnerships"
              variant="yellow"
              animateIn={false}
            >
              <div className="space-y-4">
                <div className="bg-[#FFD700] text-black px-2 py-1 text-xs font-bold inline-block mb-2">
                  FEATURED
                </div>
                <h3 className="text-base font-bold text-black">
                  When we believe in what you're building
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  We become your product co-founder. Equity-only or reduced cash + equity.
                </p>
                <div className="p-3 border border-[#FFD700] bg-yellow-50">
                  <p className="text-sm text-black mb-2">
                    <span className="font-bold text-[#FFD700]">Like Zero:</span> 1 month to plan, 7 prototypes.
                  </p>
                  <Link href="/work/zero" className="text-sm font-semibold text-[#FFD700]">
                    See proof →
                  </Link>
                </div>
                <div className="border-l-2 border-[#FFD700] pl-3 space-y-2">
                  <p className="font-bold text-black text-xs">STRUCTURE</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 0.5-3% equity typical</li>
                    <li>• 6-18 months</li>
                    <li>• Long-term aligned</li>
                  </ul>
                </div>
                <Link
                  href="/contact"
                  className="block w-full bg-[#FFD700] text-black text-center px-4 py-3 font-semibold"
                >
                  Start the Conversation →
                </Link>
              </div>
            </OS8Window>

            <OS8Window
              title="Hybrid (Cash + Equity)"
              variant="minimal"
              animateIn={false}
            >
              <div className="space-y-4">
                <h3 className="text-base font-bold text-black">
                  Most common for longer engagements
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Reduced cash + equity. Conserve runway, share upside.
                </p>
                <div className="border-l-2 border-gray-800 pl-3 space-y-2">
                  <p className="font-bold text-black text-xs">STRUCTURE</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 50-70% cash discount</li>
                    <li>• 0.5-2% equity</li>
                    <li>• 3-12 months</li>
                  </ul>
                </div>
                <Link href="/contact" className="text-sm text-black font-semibold">
                  Learn More →
                </Link>
              </div>
            </OS8Window>
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-800">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              Our Process
            </h2>
            <p className="text-base sm:text-lg text-gray-400">
              Every engagement starts the same way: understanding your riskiest assumptions.
            </p>
          </div>

          <OS8Window
            title="Our Process"
            variant="minimal"
            animateIn={false}
            className="max-w-4xl mx-auto"
          >
            <div className="space-y-6">
              {[
                {
                  phase: "Week 1: Align",
                  description: "We map your product thesis, biggest unknowns, and success criteria. What would prove this is worth building? What would kill it?"
                },
                {
                  phase: "Weeks 2-4: Prototype",
                  description: "We build functional software that tests your core assumptions. Not mockups—working demos you can put in front of users or investors."
                },
                {
                  phase: "Weeks 4-6: Test & Validate",
                  description: "We run your prototype through real usage scenarios. User testing, technical validation, market signal gathering. Evidence, not opinions."
                },
                {
                  phase: "Week 6+: Refine or Build",
                  description: "Based on what we learned: pivot, persevere, or scale. If it's working, we help you build it. If not, we help you redirect before burning runway."
                }
              ].map((step, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-[#FFD700] text-black flex items-center justify-center font-bold text-sm">
                      {i + 1}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-black mb-2">{step.phase}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </OS8Window>
        </div>
      </section>

      {/* Why Equity Alignment Matters */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-800">
        <div className="max-w-5xl mx-auto">
          <OS8Window
            title="Why Equity Alignment Matters"
            variant="yellow"
            animateIn={false}
            className="max-w-4xl mx-auto"
          >
            <div className="space-y-6">
              <p className="text-base text-gray-700 leading-relaxed">
                Equity is not just about economics—it changes how we think, decide, and build together.
              </p>

              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-bold text-[#FFD700] uppercase tracking-wide mb-3">What Changes</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex gap-2">
                      <span className="text-[#FFD700]">→</span>
                      <span>We say no to bad ideas (even if billable)</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-[#FFD700]">→</span>
                      <span>We prioritize long-term value over scope</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-[#FFD700]">→</span>
                      <span>We build IP, not just deliverables</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-[#FFD700]">→</span>
                      <span>We care about your Series A, not just handoff</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#FFD700] uppercase tracking-wide mb-3">What Doesn't Change</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex gap-2">
                      <span className="text-[#FFD700]">→</span>
                      <span>We still move fast (equity ≠ slow)</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-[#FFD700]">→</span>
                      <span>You still own your company and roadmap</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-[#FFD700]">→</span>
                      <span>We're selective, not transactional</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-[#FFD700]">→</span>
                      <span>Clear deliverables and milestones still exist</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </OS8Window>
        </div>
      </section>

      {/* Tier 3: Pricing Philosophy */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-800">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs sm:text-sm font-mono text-[#FFD700] tracking-widest mb-2">
              PRICING PHILOSOPHY
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              How We Price Engagements
            </h2>
            <p className="text-base sm:text-lg text-gray-400 max-w-3xl mx-auto">
              Transparent, customized, and always aligned with what you're building
            </p>
          </div>

          <OS8Window
            title="pricing_philosophy.txt"
            variant="body"
            animateIn={false}
            className="max-w-4xl mx-auto"
          >
            <div className="space-y-6 text-gray-100">
              <p className="text-sm leading-relaxed">
                <span className="font-bold text-[#FFD700]">We share pricing after understanding your context.</span> Every engagement is structured as cash, equity, or hybrid — and the mix depends on your stage, timeline, and goals.
              </p>

              <div className="border-l-2 border-[#FFD700] pl-4 space-y-3">
                <p className="text-xs font-semibold text-gray-100">What determines pricing:</p>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs font-semibold text-gray-100 mb-1">• Scope & Timeline</p>
                    <p className="text-xs text-gray-300">2 weeks vs 6 months impacts structure</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-100 mb-1">• Team Size & Complexity</p>
                    <p className="text-xs text-gray-300">Solo founder vs 10-person team</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-100 mb-1">• Equity Participation</p>
                    <p className="text-xs text-gray-300">More equity = lower cash investment</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-100 mb-1">• Strategic Fit</p>
                    <p className="text-xs text-gray-300">AI/AR expertise creates unique value</p>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-700 pt-6">
                <p className="text-sm font-semibold text-[#FFD700] mb-3">Ballpark Expectations:</p>
                <div className="space-y-3">
                  <div className="bg-gray-800/50 border border-gray-700 p-4 rounded">
                    <p className="text-xs font-mono text-[#FFD700] mb-2">Clarity Kit (2 weeks)</p>
                    <p className="text-xs text-gray-300">
                      Comparable to 2-3 weeks of senior engineering time. You get strategy, design, and architecture—not just development hours.
                    </p>
                  </div>

                  <div className="bg-gray-800/50 border border-gray-700 p-4 rounded">
                    <p className="text-xs font-mono text-[#FFD700] mb-2">Prototype Kit (4-6 weeks)</p>
                    <p className="text-xs text-gray-300">
                      Comparable to hiring a mid-level full-stack developer for 2 months. You get working software, not just mockups.
                    </p>
                  </div>

                  <div className="bg-gray-800/50 border border-gray-700 p-4 rounded">
                    <p className="text-xs font-mono text-[#FFD700] mb-2">Build Ship Run (6-18 months)</p>
                    <p className="text-xs text-gray-300">
                      Comparable to your first technical co-founder (senior full-stack + designer). Equity partnerships significantly reduce cash requirements.
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-700 pt-6">
                <p className="text-sm leading-relaxed">
                  <span className="font-bold text-[#FFD700]">Why no exact pricing on the site?</span> Because the right structure depends on mutual fit. A Seed-stage founder with runway needs different terms than a bootstrapped team building on nights and weekends. We'll share exact pricing on our intro call after learning about your project.
                </p>
              </div>

              <div className="bg-gray-900 border border-[#FFD700]/30 p-4 rounded">
                <p className="text-xs text-gray-100 leading-relaxed">
                  <span className="font-semibold text-[#FFD700]">Our promise:</span> No surprises, no pressure, no bait-and-switch. If our pricing doesn't fit your budget, we'll tell you upfront and point you toward alternatives that might.
                </p>
              </div>
            </div>
          </OS8Window>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto flex justify-center">
          <OS8Window
            title="Start the Conversation"
            variant="yellow"
            animateIn={false}
            className="max-w-lg"
          >
            <div className="space-y-6">
              <p className="text-base text-gray-700 leading-relaxed">
                Every engagement starts with a conversation about your timeline, runway, and what you're trying to prove. Let's figure out the right structure together.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Link
                  href="/contact"
                  className="flex-1 bg-[#FFD700] hover:bg-[#FFE34D] text-black text-center px-6 py-3 font-semibold transition-colors"
                >
                  Book a Call →
                </Link>
                <a
                  href="mailto:studio@rationale.design"
                  className="flex-1 border border-gray-300 hover:border-[#FFD700] text-black text-center px-6 py-3 font-semibold transition-colors"
                >
                  Email Studio
                </a>
              </div>

              <div className="pt-3 border-t border-gray-200 text-center">
                <p className="text-xs text-gray-500">
                  studio@rationale.design
                </p>
              </div>
            </div>
          </OS8Window>
        </div>
      </section>
    </main>
  );
}
