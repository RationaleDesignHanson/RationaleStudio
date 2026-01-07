/**
 * Essay: Vision, Proof, and the Work Between
 *
 * Blog-style article matching home/collab styling
 */

'use client';

import Link from 'next/link';
import { ASCIIUnifiedGrid } from '@/components/visual';
import { watercolorThemes } from '@/lib/theme/watercolor-palette';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export default function VisionProofBurdenPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white">

      {/* Hero */}
      <section className="relative py-6 md:py-10 px-4 sm:px-6 md:px-8 border-b border-gray-800">
        <div className="absolute inset-0 pointer-events-none">
          <ASCIIUnifiedGrid
            opacity={0.08}
            animated={true}
            colorTheme={watercolorThemes.terminalGold}
            charSet="default"
          />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto">
          <Link
            href="/thinking"
            className="inline-flex items-center gap-2 text-xs text-gray-400 hover:text-terminal-gold transition-colors mb-4"
          >
            <ArrowLeft className="w-3 h-3" />
            Back to Thinking
          </Link>

          <div className="flex items-center gap-3 mb-3">
            <span className="text-[10px] font-mono text-terminal-gold tracking-widest">VISION</span>
            <span className="text-gray-600">·</span>
            <span className="text-xs text-gray-500">9 min read</span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
            Vision, Proof, and the Work Between
          </h1>

          <div className="border-l-2 border-terminal-gold pl-4 mb-4">
            <p className="text-lg md:text-xl italic text-terminal-gold">
              "The gift of vision is cursed with the burden of proof."
            </p>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <article className="relative py-6 md:py-10 px-4 sm:px-6 md:px-8 border-b border-gray-800">
        <div className="absolute inset-0 pointer-events-none">
          <ASCIIUnifiedGrid
            opacity={0.04}
            animated={true}
            colorTheme={watercolorThemes.terminalSubtle}
            charSet="default"
          />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="prose prose-invert prose-lg max-w-none">

            <p className="text-lg text-gray-300 leading-relaxed mb-6">
              The gift of vision is often misunderstood. It is not simply the ability to imagine what could exist, but the responsibility to stand in the gap between what is visible and what is provable. Vision, by its nature, arrives early. Proof arrives late. The distance between the two is where most ideas fail—not because they are wrong, but because they are unvalidated.
            </p>

            <p className="text-gray-300 leading-relaxed mb-4">
              This gap creates a burden. Those who can see a future state clearly are routinely asked to defend it using the language, tools, and metrics of the present. Visionaries are expected to produce certainty before the conditions for certainty exist. This is the quiet curse of vision: the obligation to justify what cannot yet be measured, benchmarked, or A/B tested.
            </p>

            <p className="text-gray-300 leading-relaxed mb-8">
              Traditional product development often collapses this gap too quickly. It either demands premature proof—forcing teams into incrementalism—or it indulges vision without discipline, producing artifacts that inspire but do not ship. Both paths avoid the hard work in the middle.
            </p>

            <h2 className="text-xl md:text-2xl font-bold text-white mb-4">
              This company exists to operate in that middle space.
            </h2>

            <p className="text-gray-300 leading-relaxed mb-4">
              Our methodology is built around transforming vision into evidence without reducing it to guesswork or false confidence. We do this by constructing real, working artifacts early—prototypes that behave, systems that respond, and experiences that can be felt rather than merely described. These artifacts are not endpoints; they are instruments of inquiry. They allow teams to learn what is true before committing to what is expensive.
            </p>

            <p className="text-gray-300 leading-relaxed mb-4">
              Instead of asking stakeholders to "believe," we ask them to interact. Instead of arguing for ideas abstractly, we let behavior, friction, and usage patterns surface the truth. Proof is not treated as a gate at the end of the process, but as something that can be gradually earned through exposure to reality.
            </p>

            <p className="text-gray-300 leading-relaxed mb-8">
              Founding this company is a response to years spent carrying that burden alone—having to repeatedly translate conviction into confidence for others. The work we do is not about eliminating vision, nor about worshipping it. It is about respecting it enough to give it a fair path to proof.
            </p>

            <h2 className="text-xl md:text-2xl font-bold text-white mb-4">In practice</h2>

            <p className="text-gray-300 leading-relaxed mb-4">
              This means designing systems that make insight unavoidable. We prototype not to decorate ideas, but to interrogate them. We ship learning as aggressively as others ship features. And we accept that the role of methodology is not to guarantee outcomes, but to reduce self-deception on the way to them.
            </p>

            <p className="text-gray-300 leading-relaxed mb-6">
              Vision does not need blind faith. It needs a disciplined process that can meet it where it is—early, incomplete, and fragile—and carry it forward until it can stand on its own.
            </p>

            <p className="text-lg font-semibold text-terminal-gold">
              That is the work.
            </p>

          </div>
        </div>
      </article>

      {/* Navigation */}
      <section className="relative py-6 md:py-10 px-4 sm:px-6 md:px-8">
        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="flex items-center justify-between">
            <Link
              href="/thinking"
              className="inline-flex items-center gap-2 text-xs text-gray-400 hover:text-terminal-gold transition-colors"
            >
              <ArrowLeft className="w-3 h-3" />
              All essays
            </Link>
            <Link
              href="/thinking/build-first-trap"
              className="inline-flex items-center gap-2 text-xs text-gray-400 hover:text-terminal-gold transition-colors"
            >
              Next: Build-First Trap
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
