import Link from 'next/link';
import Image from 'next/image';
import { GlassCard, CredentialsBar, StatementBlock } from '@/components/visual';
import { ASCIIUnifiedGrid } from '@/components/visual';
import { watercolorThemes } from '@/lib/theme/watercolor-palette';
import { ArrowRight } from '@/lib/icons';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white">
      {/* Background Grid - 30 FPS on all devices */}
      <div className="fixed inset-0 pointer-events-none">
        <ASCIIUnifiedGrid
          opacity={0.04}
          animated={true}
          colorTheme={watercolorThemes.terminalSubtle}
          charSet="default"
        />
      </div>

      {/* Hero Section */}
      <section className="relative py-10 md:py-16 px-4 sm:px-6 lg:px-4 sm:px-6 md:px-8 border-b border-gray-800">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs font-mono text-terminal-gold tracking-widest mb-3">
            CONVICTION-FIRST EXECUTION
          </p>

          <h1 className="text-3xl md:text-2xl md:text-3xl lg:text-4xl lg:text-5xl font-bold mb-4">
            About Rationale
          </h1>

          <p className="text-base md:text-lg text-gray-300 leading-relaxed max-w-3xl mb-4">
            Most innovation dies in slide decks. At Meta, we shipped AR platforms for 400+ people by building working software first, not debating specs. Now we do the same for our studio IP and partners who trade equity for velocity.
          </p>

          {/* Overview CTA */}
          <Link
            href="/overview"
            className="text-terminal-gold hover:text-terminal-gold-hover text-sm font-normal flex items-center gap-1 transition-colors !p-0"
          >
            Studio Overview
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </section>

      {/* Our Approach Introduction */}
      <section className="relative py-8 md:py-12 px-4 sm:px-6 lg:px-4 sm:px-6 md:px-8 border-b border-gray-800">
        <div className="max-w-5xl mx-auto">
          <StatementBlock
            title="Our Approach"
            statement="Working software is the oxygen for ideas. We validate before we commit."
            supporting="Build → Validate → Ship. No guesswork."
          />
        </div>
      </section>

      {/* Why Rationale? */}
      <section className="relative py-8 md:py-12 px-4 sm:px-6 lg:px-4 sm:px-6 md:px-8 border-b border-gray-800">
        <div className="max-w-5xl mx-auto">
          <GlassCard className="p-6 md:p-8" borderRadius="0.75rem">
            <h2 className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4">Why Rationale?</h2>
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

      {/* What We Learned - Colored Insight Cards */}
      <section className="relative py-12 px-4 sm:px-6 lg:px-4 sm:px-6 md:px-8 border-b border-gray-800">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-4 text-center">What We Learned</h2>
          <p className="text-center text-gray-300 mb-8">The pattern repeated across every product:</p>

          <div className="space-y-6 mb-8">
            {/* Insight 1 */}
            <div className="border-l-4 pl-6 py-4" style={{ borderColor: 'var(--color-zero-cyan)' }}>
              <h3 className="text-xl font-bold text-white mb-2">Specs Failed in Predictable Ways</h3>
              <p className="text-gray-300 leading-relaxed">
                Detailed specs described interactions clearly. But they couldn't predict how users would actually behave. AR interactions are physical—they require body movement, spatial awareness, gesture memory. You can't spec your way to understanding those.
              </p>
            </div>

            {/* Insight 2 */}
            <div className="border-l-4 pl-6 py-4" style={{ borderColor: 'var(--color-zero-green)' }}>
              <h3 className="text-xl font-bold text-white mb-2">Prototypes Revealed Truth</h3>
              <p className="text-gray-300 leading-relaxed">
                Put a prototype in someone's hands and their behavior tells you everything. They reach for the wrong gesture. They expect feedback at different timing. They misunderstand affordances. All discoverable in hours, not months.
              </p>
            </div>

            {/* Insight 3 */}
            <div className="border-l-4 border-terminal-gold pl-6 py-4">
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

      {/* Proof at Scale - Condensed */}
      <section className="relative py-8 md:py-12 px-4 sm:px-6 lg:px-4 sm:px-6 md:px-8 border-b border-gray-800">
        <div className="max-w-5xl mx-auto">
          <GlassCard className="p-6 md:p-8" borderRadius="0.75rem">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 md:mb-6">Proof at Scale</h2>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>
                Led Product and Experience Design for Meta's AR platform—a 400+ person organization serving 2B+ users. Built horizontal AR platform and four verticals: Commerce (Nike, Target, Sephora), World AR, Avatars, and consumer experiences across Instagram/Facebook.
              </p>
              <p>
                Pioneered mobile AR prototyping methodology: <span className="text-terminal-gold font-semibold">60% velocity increase</span>. Scaled mobile AR team from <span className="text-terminal-gold font-semibold">2→22 people</span> across product design, prototyping, technical art, and UX research.
              </p>
              <p>
                Led experiences for Orion AR Glasses and Quest MR—never-before-built AR hardware. Created product vision demonstrating value proposition for next-generation wearables. <span className="text-terminal-gold font-semibold">15+ patents filed</span> in AR/AI interaction systems.
              </p>
              <p className="pt-4 border-t border-gray-700 font-semibold text-white">
                This breadth—from 0→1 platform creation to billion-user scale—enables Rationale's end-to-end execution from strategy to production.
              </p>
            </div>
          </GlassCard>
        </div>
      </section>

      {/* Why This Matters for Rationale */}
      <section className="relative py-12 px-4 sm:px-6 lg:px-4 sm:px-6 md:px-8 border-b border-gray-800">
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
      <section className="relative py-12 px-4 sm:px-6 lg:px-4 sm:px-6 md:px-8 border-b border-gray-800">
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
      <section className="relative py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-4 sm:px-6 md:px-8 border-b border-gray-800">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-12 text-center">
            Background & Approach
          </h2>

          <GlassCard className="p-8" borderRadius="0.75rem">
            <h3 className="text-2xl font-bold text-white mb-2">Matt Hanson: Founder</h3>
            <p className="text-gray-300 mb-8">
              20+ years building products—from motion design and brand strategy to shipping AR/AI features at Meta to 2B+ users. Former Head of Design at FuboTV. Now building Rationale's dual-engine model: portfolio IP and client partnerships.
            </p>

            <div className="space-y-6 mb-8">
              <div>
                <h4 className="text-sm font-mono text-terminal-gold uppercase tracking-wide mb-3">From Meta Scale to Studio Discipline</h4>
                <p className="text-gray-300 leading-relaxed mb-4">
                  At Meta, building at 2B+ user scale meant validating everything before committing—prototypes compressed decision cycles from months to weeks. That discipline transferred directly: startups face the same constraint with higher stakes. Limited runway means you can't afford to build the wrong thing. The same methodology that worked at billion-user scale works better at 0-to-1 scale.
                </p>
              </div>

              <div>
                <h4 className="text-sm font-mono text-terminal-gold uppercase tracking-wide mb-3">Proving It On Our Own</h4>
                <p className="text-gray-300 leading-relaxed mb-4">
                  This site itself is a living case study. The work showcased here—Zero, Heirloom, and client presentations—demonstrates our methodology in practice. Each project page, interactive diagram, and pitch deck proves the approach works on our own products, with our own capital, before we ask clients to trust it. The site is the portfolio, and the portfolio is the proof.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  Now we apply those patterns to client partnerships using a fee + equity model that aligns long-term incentives. Client work funds R&D. Internal products test methodologies in production. Each engine validates the other.
                </p>
              </div>
            </div>

            {/* Timeline Image */}
            <div className="mb-6">
              <Image
                src="/images/work/hanson/background-timeline.png"
                alt="Career timeline from 2000-2024 showing progression from creative work through Meta Reality Labs to current Rationale projects"
                width={1200}
                height={400}
                className="w-full rounded-lg"
                style={{ width: '100%', height: 'auto' }}
                loading="lazy"
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mM8c+Z8PQAHZAL+4SiGjgAAAABJRU5ErkJggg=="
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

      {/* How We Work - Link to dedicated page */}
      <section className="relative py-8 md:py-12 px-4 sm:px-6 lg:px-4 sm:px-6 md:px-8 border-b border-gray-800">
        <div className="max-w-5xl mx-auto">
          <GlassCard className="p-6 md:p-8" borderRadius="0.75rem">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">How We Work</h2>
            <p className="text-gray-300 leading-relaxed mb-6">
              We build our own products to stay sharp and honest. Shipping forces clarity: real users, real tradeoffs, real distribution. That's why our partner work moves faster—our methods are constantly pressure-tested in production.
            </p>
            <Link
              href="/how-we-work"
              className="inline-flex items-center gap-2 text-terminal-gold hover:text-terminal-gold-hover font-medium transition-colors"
            >
              See our methodology
              <ArrowRight className="w-4 h-4" />
            </Link>
          </GlassCard>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-4 sm:px-6 md:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 md:mb-6">
            Ready to talk?
          </h2>
          <p className="text-base md:text-lg text-gray-300 mb-8 md:mb-10 max-w-2xl mx-auto">
            Let's figure out if there's a fit. 30-minute call, no pitch deck required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="px-6 py-3 sm:px-8 sm:py-4 text-base md:text-lg bg-terminal-gold hover:bg-terminal-gold-hover text-black font-semibold transition-all shadow-lg shadow-terminal-gold/20 hover:shadow-xl hover:shadow-terminal-gold/30 rounded-lg"
            >
              Book intro call
            </Link>
            <Link
              href="/work"
              className="px-6 py-3 sm:px-8 sm:py-4 text-base md:text-lg border border-gray-700 hover:border-terminal-gold text-white font-semibold transition-colors rounded-lg flex items-center justify-center gap-2"
            >
              See the work
              <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
