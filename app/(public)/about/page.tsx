'use client';

import Link from 'next/link';
import { GlassCard, CredentialsBar, StatementBlock } from '@/components/visual';
import { ASCIIUnifiedGrid } from '@/components/visual';
import { watercolorThemes } from '@/lib/theme/watercolor-palette';

export default function AboutPage() {
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

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-800">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs sm:text-sm font-mono text-[#FFD700] tracking-widest mb-4">
            CONVICTION-FIRST EXECUTION
          </p>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
            About Rationale
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl text-gray-300 leading-relaxed max-w-3xl">
            Most innovation dies in slide decks. At Meta, we shipped AR platforms for 400+ people by building working software first, not debating specs. Now we do the same for our studio IP and partners who trade equity for velocity.
          </p>
        </div>
      </section>

      {/* Our Approach Introduction */}
      <section className="relative py-12 px-4 sm:px-6 lg:px-8 border-b border-gray-800">
        <div className="max-w-5xl mx-auto">
          <StatementBlock
            title="Our Approach"
            statement="Working software is the oxygen for ideas. We validate before we commit."
            supporting="Build → Validate → Ship. No guesswork."
          />
        </div>
      </section>

      {/* The Meta Reality Labs Context */}
      <section className="relative py-12 px-4 sm:px-6 lg:px-8 border-b border-gray-800">
        <div className="max-w-5xl mx-auto">
          <GlassCard className="p-8" borderRadius="0.75rem">
            <h2 className="text-2xl font-bold text-white mb-4">The Meta Reality Labs Context</h2>
            <div className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                Led Product and Experience Design for Meta's AR platform—a 400+ person organization serving 2B+ users. Designed strategy for the horizontal platform and four verticals: Commerce, World AR, Avatars, and consumer experiences across Instagram/Facebook. Scaled mobile AR team from 2 to 22 people across product design, prototyping, technical art, and UX research.
              </p>
              <p className="text-gray-300 leading-relaxed">
                At scale, you don't iterate—you validate. When a feature ships to 2 billion users, there's no room for guesswork. That constraint hardened a systematic approach to de-risking product direction: prototype to compress decision time, validate before committing engineering, build working software to force honest conversation. It's the same discipline we bring to every engagement.
              </p>
            </div>
          </GlassCard>
        </div>
      </section>

      {/* Proof at Scale - 3 Card Grid */}
      <section className="relative py-12 px-4 sm:px-6 lg:px-8 border-b border-gray-800">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Proof at Scale</h2>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Card 1: Spark AR */}
            <GlassCard className="p-6" borderRadius="0.75rem">
              <h3 className="text-xl font-bold text-white mb-2">Spark AR: Platform + Verticals</h3>
              <p className="text-sm text-gray-400 mb-4">400+ person XFN org, 2B+ users</p>
              <div className="space-y-3 text-sm text-gray-300">
                <p>Built horizontal AR platform + multiple verticals:</p>
                <div className="pl-4 space-y-2">
                  <div>
                    <span className="font-semibold text-white">Commerce:</span> Virtual try-on for Nike, Target, Sephora. 150% platform growth first year, 100x inventory volume.
                  </div>
                  <div>
                    <span className="font-semibold text-white">Entertainment:</span> World AR experiences on Instagram/Facebook.
                  </div>
                  <div>
                    <span className="font-semibold text-white">Avatars:</span> Consumer avatar systems.
                  </div>
                  <div>
                    <span className="font-semibold text-white">Other:</span> Diverse consumer experiences across Meta apps.
                  </div>
                </div>
                <p className="pt-2 border-t border-gray-700">
                  Pioneered mobile AR prototyping: <span className="text-[#00FF94] font-semibold">60% velocity increase</span>
                </p>
                <p>Scaled mobile AR team: <span className="text-[#00FF94] font-semibold">2→22 people</span></p>
              </div>
            </GlassCard>

            {/* Card 2: Orion */}
            <GlassCard className="p-6" borderRadius="0.75rem">
              <h3 className="text-xl font-bold text-white mb-2">Orion AR Glasses + Quest MR</h3>
              <p className="text-sm text-gray-400 mb-4">Never-before-built AR hardware</p>
              <div className="space-y-3 text-sm text-gray-300">
                <p>Led team building experiences showcasing why revolutionary AR hardware matters.</p>
                <p>Created product vision demonstrating value proposition for next-generation wearables.</p>
                <p>Meta leadership and board were the customer—had to prove the "why" behind the hardware investment.</p>
                <p className="pt-2 border-t border-gray-700">
                  15+ patents filed in AR/AI interaction systems.
                </p>
              </div>
            </GlassCard>

            {/* Card 3: Cross-Functional Leadership */}
            <GlassCard className="p-6" borderRadius="0.75rem">
              <h3 className="text-xl font-bold text-white mb-2">Cross-Functional Leadership</h3>
              <p className="text-sm text-gray-400 mb-4">Deep understanding of all functions</p>
              <div className="space-y-3 text-sm text-gray-300">
                <p>Directly managed diverse disciplines:</p>
                <ul className="pl-4 space-y-1 list-disc list-inside">
                  <li>Product designers</li>
                  <li>Prototypers</li>
                  <li>Technical artists</li>
                  <li>UX researchers</li>
                </ul>
                <p className="pt-2 border-t border-gray-700">
                  Cross-functional nature of leading a 400+ person org gave deep understanding of ALL functions: engineering, PM, research, operations.
                </p>
                <p className="font-semibold text-white">
                  This breadth enables Rationale's end-to-end execution from strategy to production.
                </p>
              </div>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* What We Learned - Colored Insight Cards */}
      <section className="relative py-12 px-4 sm:px-6 lg:px-8 border-b border-gray-800">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-4 text-center">What We Learned</h2>
          <p className="text-center text-gray-300 mb-8">The pattern repeated across every product:</p>

          <div className="space-y-6 mb-8">
            {/* Insight 1 */}
            <div className="border-l-4 pl-6 py-4" style={{ borderColor: '#00D9FF' }}>
              <h3 className="text-xl font-bold text-white mb-2">Specs Failed in Predictable Ways</h3>
              <p className="text-gray-300 leading-relaxed">
                Detailed specs described interactions clearly. But they couldn't predict how users would actually behave. AR interactions are physical—they require body movement, spatial awareness, gesture memory. You can't spec your way to understanding those.
              </p>
            </div>

            {/* Insight 2 */}
            <div className="border-l-4 pl-6 py-4" style={{ borderColor: '#00FF94' }}>
              <h3 className="text-xl font-bold text-white mb-2">Prototypes Revealed Truth</h3>
              <p className="text-gray-300 leading-relaxed">
                Put a prototype in someone's hands and their behavior tells you everything. They reach for the wrong gesture. They expect feedback at different timing. They misunderstand affordances. All discoverable in hours, not months.
              </p>
            </div>

            {/* Insight 3 */}
            <div className="border-l-4 pl-6 py-4" style={{ borderColor: '#FFD700' }}>
              <h3 className="text-xl font-bold text-white mb-2">Scale Amplified Mistakes</h3>
              <p className="text-gray-300 leading-relaxed">
                When you ship to billions, small UX issues become massive problems. A confusing gesture that affects 0.1% of users is still millions of people. We learned to validate everything before production because the cost of mistakes was measured in millions.
              </p>
            </div>
          </div>

          <p className="text-center text-lg text-gray-300 leading-relaxed max-w-3xl mx-auto">
            This is where the build-to-think methodology came from. Not theory. Not academic research. Production necessity at scale.
          </p>

          <div className="mt-8 text-center">
            <Link href="/thinking" className="text-accent hover:underline font-medium">
              read about our approach →
            </Link>
          </div>
        </div>
      </section>

      {/* Why This Matters for Rationale */}
      <section className="relative py-12 px-4 sm:px-6 lg:px-8 border-b border-gray-800">
        <div className="max-w-5xl mx-auto">
          <GlassCard className="p-8" borderRadius="0.75rem">
            <h2 className="text-2xl font-bold text-white mb-4">Why This Matters for Rationale</h2>
            <div className="space-y-4 mb-6">
              <p className="text-gray-300 leading-relaxed">
                Building platforms from 0→1, scaling teams across multiple disciplines, and shipping to billions—that's not résumé decoration. It's the foundation of how we work.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Every Rationale engagement applies patterns proven at Meta scale:
              </p>
            </div>

            <div className="bg-gray-900/50 border border-gray-700 p-6 rounded-lg space-y-3">
              <div className="flex items-start gap-3">
                <span className="text-[#00D9FF] text-xl flex-shrink-0">→</span>
                <p className="text-gray-300">Rapid prototyping to validate before committing to production architecture</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[#00D9FF] text-xl flex-shrink-0">→</span>
                <p className="text-gray-300">Systematic testing of interaction patterns with real users</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[#00D9FF] text-xl flex-shrink-0">→</span>
                <p className="text-gray-300">Clear binary decision points: pass/fail criteria for each prototype</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[#00D9FF] text-xl flex-shrink-0">→</span>
                <p className="text-gray-300">Pivot-friendly development that treats changes as learning, not failure</p>
              </div>
            </div>
          </GlassCard>
        </div>
      </section>

      {/* The Transfer from Meta to Startups */}
      <section className="relative py-12 px-4 sm:px-6 lg:px-8 border-b border-gray-800">
        <div className="max-w-5xl mx-auto">
          <GlassCard className="p-8" borderRadius="0.75rem">
            <h2 className="text-2xl font-bold text-white mb-4">The Transfer from Meta to Startups</h2>
            <div className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                Startups face the same problem as Meta, just with higher stakes: limited runway means you can't afford to build the wrong thing.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Meta had resources to recover from mistakes. Startups don't. That makes validated learning even more critical.
              </p>
              <p className="text-gray-300 leading-relaxed">
                The methodology that worked at billion-user scale works even better at 0-to-1 scale. Validate early. Pivot cheap. Ship with conviction.
              </p>
            </div>
          </GlassCard>
        </div>
      </section>

      {/* Background & Approach */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-800">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-center">
            Background & Approach
          </h2>

          <GlassCard className="p-8" borderRadius="0.75rem">
            <h3 className="text-2xl font-bold text-white mb-2">Matt Hanson: Founder</h3>
            <p className="text-gray-300 mb-8">
              20+ years building products—from motion design and brand strategy to shipping AR/AI features at Meta to 2B+ users. Former Head of Design at FuboTV. Now building Rationale's dual-engine model: portfolio IP and client partnerships.
            </p>

            <div className="space-y-6 mb-8">
              <div>
                <h4 className="text-sm font-mono text-[#FFD700] uppercase tracking-wide mb-3">From Meta Scale to Studio Discipline</h4>
                <p className="text-gray-300 leading-relaxed mb-4">
                  At Meta, building at 2B+ user scale meant validating everything before committing—prototypes compressed decision cycles from months to weeks. That discipline transferred directly: startups face the same constraint with higher stakes. Limited runway means you can't afford to build the wrong thing. The same methodology that worked at billion-user scale works better at 0-to-1 scale.
                </p>
              </div>

              <div>
                <h4 className="text-sm font-mono text-[#FFD700] uppercase tracking-wide mb-3">Proving It On Our Own</h4>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Zero Inbox went from concept to App Store in 30 days using the same build-to-think methodology. No architectural pivots. Zero exists to prove the approach works on our own products, with our own capital, before we ask clients to trust it.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  Now we apply those patterns to client partnerships using a fee + equity model that aligns long-term incentives. Client work funds R&D. Internal products test methodologies in production. Each engine validates the other.
                </p>
              </div>
            </div>

            {/* Timeline Image */}
            <div className="mb-6">
              <img
                src="/images/work/hanson/background-timeline.png"
                alt="Career timeline from 2000-2024 showing progression from creative work through Meta Reality Labs to current Rationale projects"
                className="w-full h-auto rounded-lg"
              />
            </div>

            <div className="pt-6 border-t border-gray-700">
              <Link href="/thinking/methodology-origins" className="text-accent hover:underline font-medium text-sm">
                Read the origin story →
              </Link>
            </div>
          </GlassCard>
        </div>
      </section>

      {/* How We Work */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-800">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-center">
            How We Work
          </h2>

          <div className="space-y-8">
            {/* AI Acceleration */}
            <GlassCard className="p-8" borderRadius="0.75rem">
              <div className="flex items-start gap-3 mb-6">
                <div className="text-3xl">⚡</div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">AI-Accelerated Execution</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Modern tooling fundamentally changed the economics of product development. Claude Code and Cursor mean small, disciplined teams ship faster than large teams could in 2023. Zero went from concept to App Store in 30 days. Same capital buys more validation cycles—more shots on goal before committing to full production.
                  </p>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6 pt-6 border-t border-gray-700">
                <div>
                  <div className="text-2xl font-bold text-[#00FF94] mb-1">30 days</div>
                  <div className="text-sm text-gray-400">Concept → App Store (Zero)</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-[#00FF94] mb-1">2-3x</div>
                  <div className="text-sm text-gray-400">Ventures per year vs industry</div>
                </div>
              </div>
            </GlassCard>

            {/* Dual Engine Model */}
            <GlassCard className="p-8" borderRadius="0.75rem">
              <h3 className="text-xl font-bold text-white mb-3">Two Engines, Proven in Production</h3>
              <p className="text-gray-300 leading-relaxed mb-6">
                Rationale runs two integrated engines: <span className="text-white font-semibold">Portfolio IP</span> (products we own like Zero) proves methodologies work with our own capital. <span className="text-white font-semibold">Client Partnerships</span> (fee + equity engagements) apply those same patterns to your highest-stakes product decisions. Internal products test approaches before we recommend them. Client work funds continued R&D. You get methods hardened in production, not theory.
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-gray-900/50 border border-gray-700 p-4 rounded-lg">
                  <div className="text-sm font-mono text-gray-400 mb-2">ENGINE 1</div>
                  <div className="text-white font-bold mb-1">Portfolio IP</div>
                  <div className="text-sm text-gray-400 mb-3">Zero, Compass, future products</div>
                  <div className="text-xs text-[#00FF94]">Proves methodology with our capital</div>
                </div>
                <div className="bg-gray-900/50 border border-gray-700 p-4 rounded-lg">
                  <div className="text-sm font-mono text-gray-400 mb-2">ENGINE 2</div>
                  <div className="text-white font-bold mb-1">Client Partnerships</div>
                  <div className="text-sm text-gray-400 mb-3">Discovery Sprint, Prototype Sprint, Build Ship Run</div>
                  <div className="text-xs text-[#00FF94]">Applies proven patterns to your roadmap</div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-700 flex gap-4">
                <Link href="/investors/dual-engine-model" className="text-accent hover:underline font-medium text-sm">
                  Read the full model →
                </Link>
                <Link href="/partnerships" className="text-accent hover:underline font-medium text-sm">
                  View partnerships →
                </Link>
              </div>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to build with conviction?</h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            We bring the same systematic approach to every engagement—whether it's a 3-week sprint or 12-week pilot.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base bg-[#FFD700] hover:bg-[#FFE34D] text-black font-semibold transition-all shadow-[0_0_17px_rgba(255,215,0,0.17)] hover:shadow-[0_0_25px_rgba(255,215,0,0.25)]"
            >
              Book intro call
            </Link>
            <Link
              href="/partnerships"
              className="px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base border border-gray-300 hover:border-[#FFD700] text-white font-semibold transition-colors"
            >
              View partnerships
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
