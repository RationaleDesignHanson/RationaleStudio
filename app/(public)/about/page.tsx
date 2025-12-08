'use client';

import Link from 'next/link';
import { GlassCard } from '@/components/visual';
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
            We spent 7 years at Meta Reality Labs shipping AR/AI to billions. Learned specs fail, prototypes work. Now we apply that systematic execution to our own portfolio IP and select equity partnerships.
          </p>
        </div>
      </section>

      {/* Manifesto */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-800">
        <div className="max-w-5xl mx-auto">
          <GlassCard className="p-8" borderRadius="0.75rem">
            <h2 className="text-2xl font-bold text-white mb-4">Our Approach</h2>
            <p className="text-lg text-gray-300 leading-relaxed mb-4">
              Working software is the oxygen for ideas. We validate before we commit. Build to prove, not to guess.
            </p>
            <p className="text-base text-gray-400 leading-relaxed">
              Build-to-think methodology: prototype to learn, validate before committing, ship to prove. No guesswork.
            </p>
            <div className="mt-6 pt-6 border-t border-gray-700">
              <Link href="/thinking" className="text-accent hover:underline font-medium">
                read about our approach →
              </Link>
            </div>
          </GlassCard>
        </div>
      </section>

      {/* Background & Proof */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-800">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-center">
            Background & Proof
          </h2>

          <GlassCard className="p-8" borderRadius="0.75rem">
            <h3 className="text-2xl font-bold text-white mb-2">Matt Hanson</h3>
            <p className="text-gray-300 mb-8">
              20+ years building products—from motion design and brand strategy to shipping AR/AI features at Meta to 2B+ users. Former Head of Design at FuboTV. Now building Rationale's dual-engine model: portfolio IP and client partnerships.
            </p>

            <div className="space-y-6 mb-8">
              <div>
                <h4 className="text-sm font-mono text-[#FFD700] uppercase tracking-wide mb-3">The Pattern</h4>
                <p className="text-gray-300 leading-relaxed mb-4">
                  7 years at Meta Reality Labs taught us one lesson you can't learn from theory: specs fail, prototypes work. When you're building AR Shopping for Nike and Target, or shipping features to 2 billion Instagram users, you can't iterate in production. Every UX mistake hits millions. We learned to validate everything before committing—not as best practice, but as production necessity.
                </p>
                <p className="text-gray-400 text-sm leading-relaxed">
                  AR Shopping: 100%+ inventory growth first year. F8 2018 stage presenter. 15+ patents in AR/AI interaction systems. But that experience wasn't about credentials. It was about discovering what works when you can't afford to guess.
                </p>
              </div>

              <div>
                <h4 className="text-sm font-mono text-[#FFD700] uppercase tracking-wide mb-3">Proving It On Our Own</h4>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Zero Inbox went from concept to App Store in 30 days using the same methodology. 7 prototypes validated every decision. 0 architectural pivots. Zero exists to prove the methodology works—on our own products, with our own capital.
                </p>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Now we apply those same patterns to client partnerships using a fee + equity model that aligns incentives.
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

      {/* Business Model */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-800">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-center">
            How We Work
          </h2>

          <GlassCard className="p-8 mb-8" borderRadius="0.75rem">
            <h3 className="text-xl font-bold text-white mb-3">Two Engines, One System</h3>
            <p className="text-gray-300 leading-relaxed mb-6">
              Rationale runs two engines: <span className="text-white font-semibold">Portfolio IP</span> (products we own like Zero) and <span className="text-white font-semibold">Client Partnerships</span> (fee + equity engagements). Internal products test methodologies in production. Client work funds R&D and provides real-world validation. Each engine feeds the other.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-gray-900/50 border border-gray-700 p-4 rounded-lg">
                <div className="text-sm font-mono text-gray-400 mb-2">ENGINE 1</div>
                <div className="text-white font-bold mb-1">Portfolio IP</div>
                <div className="text-sm text-gray-400">Zero, Compass, future products</div>
              </div>
              <div className="bg-gray-900/50 border border-gray-700 p-4 rounded-lg">
                <div className="text-sm font-mono text-gray-400 mb-2">ENGINE 2</div>
                <div className="text-white font-bold mb-1">Client Partnerships</div>
                <div className="text-sm text-gray-400">Clarity Kit, Prototype Kit, Build Ship Run</div>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t border-gray-700 flex gap-4">
              <Link href="/thinking/dual-engine-model" className="text-accent hover:underline font-medium text-sm">
                Read the full model →
              </Link>
              <Link href="/partnerships" className="text-accent hover:underline font-medium text-sm">
                View partnerships →
              </Link>
            </div>
          </GlassCard>
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
