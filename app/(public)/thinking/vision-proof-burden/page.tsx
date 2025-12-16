/**
 * Vision, Proof, and the Work Between
 *
 * Essay on the burden of vision and the path to proof
 */

'use client';

import Link from 'next/link';
import { ASCIIUnifiedGrid } from '@/components/visual';
import { GlassCard } from '@/components/visual';
import { watercolorThemes } from '@/lib/theme/watercolor-palette';

export default function VisionProofBurdenPage() {
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

      {/* Header */}
      <section className="relative py-6 md:py-8 lg:py-12 px-4 sm:px-6 md:px-8 border-b border-gray-800">
        <div className="relative z-10 max-w-4xl mx-auto">
          <Link
            href="/thinking"
            className="text-sm text-gray-400 hover:text-accent transition-colors mb-6 inline-block"
          >
            ← Back to Thinking
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-mono text-gray-400 uppercase tracking-wide">
              Vision
            </span>
            <span className="text-xs text-gray-500">•</span>
            <span className="text-xs text-gray-400">9 min read</span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Vision, Proof, and the Work Between
          </h1>
        </div>
      </section>

      {/* Content */}
      <article className="relative py-8 md:py-12 px-4 sm:px-6 md:px-8">
        <div className="relative z-10 max-w-3xl mx-auto prose prose-invert prose-lg">

          <p className="lead text-xl text-gray-300 mb-8">
            The gift of vision is often misunderstood. It is not simply the ability to imagine what could exist, but the responsibility to stand in the gap between what is visible and what is provable. Vision, by its nature, arrives early. Proof arrives late. The distance between the two is where most ideas fail—not because they are wrong, but because they are unvalidated.
          </p>

          <GlassCard className="my-8 p-6 border-accent/30">
            <blockquote className="text-2xl font-serif italic text-accent mb-2">
              "The gift of vision is cursed with the burden of proof."
            </blockquote>
            <p className="text-sm text-gray-400">
              © Matt Hanson, Rationale
            </p>
          </GlassCard>

          <p>
            This gap creates a burden. Those who can see a future state clearly are routinely asked to defend it using the language, tools, and metrics of the present. Visionaries are expected to produce certainty before the conditions for certainty exist. This is the quiet curse of vision: the obligation to justify what cannot yet be measured, benchmarked, or A/B tested.
          </p>

          <p>
            Traditional product development often collapses this gap too quickly. It either demands premature proof—forcing teams into incrementalism—or it indulges vision without discipline, producing artifacts that inspire but do not ship. Both paths avoid the hard work in the middle.
          </p>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4">
            This company exists to operate in that middle space.
          </h2>

          <p>
            Our methodology is built around transforming vision into evidence without reducing it to guesswork or false confidence. We do this by constructing real, working artifacts early—prototypes that behave, systems that respond, and experiences that can be felt rather than merely described. These artifacts are not endpoints; they are instruments of inquiry. They allow teams to learn what is true before committing to what is expensive.
          </p>

          <p>
            Instead of asking stakeholders to "believe," we ask them to interact. Instead of arguing for ideas abstractly, we let behavior, friction, and usage patterns surface the truth. Proof is not treated as a gate at the end of the process, but as something that can be gradually earned through exposure to reality.
          </p>

          <p>
            Founding this company is a response to years spent carrying that burden alone—having to repeatedly translate conviction into confidence for others. The work we do is not about eliminating vision, nor about worshipping it. It is about respecting it enough to give it a fair path to proof.
          </p>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4">
            In practice
          </h2>

          <p>
            This means designing systems that make insight unavoidable. We prototype not to decorate ideas, but to interrogate them. We ship learning as aggressively as others ship features. And we accept that the role of methodology is not to guarantee outcomes, but to reduce self-deception on the way to them.
          </p>

          <p>
            Vision does not need blind faith. It needs a disciplined process that can meet it where it is—early, incomplete, and fragile—and carry it forward until it can stand on its own.
          </p>

          <p className="text-xl font-semibold text-accent mt-12">
            That is the work.
          </p>

        </div>
      </article>

      {/* CTA */}
      <section className="relative py-8 md:py-12 lg:py-16 px-4 sm:px-6 md:px-8 border-t border-gray-800">
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h2 className="text-xl md:text-2xl font-bold mb-4">Ready to bridge vision and proof?</h2>
          <p className="text-gray-300 mb-8">
            We use this approach on every engagement—whether it's a 3-week sprint or 12-week pilot.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="px-6 py-3 sm:px-8 sm:py-4 bg-terminal-gold hover:bg-[#FFE34D] text-black font-semibold transition-all shadow-[0_0_17px_rgba(255,215,0,0.17)] hover:shadow-[0_0_25px_rgba(255,215,0,0.25)]"
            >
              Book intro call
            </Link>
            <Link
              href="/thinking"
              className="px-6 py-3 sm:px-8 sm:py-4 border border-gray-300 hover:border-terminal-gold text-white font-semibold transition-colors"
            >
              Read more essays
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
