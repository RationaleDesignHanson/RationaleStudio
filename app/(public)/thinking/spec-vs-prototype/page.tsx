/**
 * Essay: Spec vs Prototype
 *
 * Blog-style article matching home/collab styling
 */

'use client';

import Link from 'next/link';
import { ASCIIUnifiedGrid } from '@/components/visual';
import { watercolorThemes } from '@/lib/theme/watercolor-palette';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export default function SpecVsPrototypePage() {
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
            <span className="text-[10px] font-mono text-terminal-gold tracking-widest">METHODOLOGY</span>
            <span className="text-gray-600">·</span>
            <span className="text-xs text-gray-500">6 min read</span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
            Spec vs Prototype
          </h1>

          <p className="text-base md:text-lg text-gray-300 leading-relaxed">
            Why experiencing beats describing. The fundamental difference between documentation and validation.
          </p>
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

            <h2 className="text-xl md:text-2xl font-bold text-white mt-0 mb-4">The Fundamental Problem</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              A spec describes what something should do. A prototype shows what something does. The difference seems subtle but it's everything.
            </p>
            <p className="text-gray-300 leading-relaxed mb-8">
              Specs require readers to imagine the experience. Prototypes let users feel it. Imagination is unreliable. Feeling is data.
            </p>

            <h2 className="text-xl md:text-2xl font-bold text-white mb-4">What Specs Can't Capture</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              Timing. The difference between 200ms and 400ms feedback delay changes how an interaction feels. You can write "fast feedback" in a spec, but you can't know if 200ms is fast enough until you feel it.
            </p>
            <p className="text-gray-300 leading-relaxed mb-4">
              Cognitive load. A screen might look simple in a mockup but feel overwhelming in use. The spec can't predict which element users will look at first, or whether they'll understand the hierarchy.
            </p>
            <p className="text-gray-300 leading-relaxed mb-8">
              Muscle memory. Gesture-based interfaces depend on physical intuition. No amount of documentation can predict whether a swipe will feel natural or awkward.
            </p>

            <h2 className="text-xl md:text-2xl font-bold text-white mb-4">The Prototype Advantage</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              Prototypes create shared understanding. Instead of debating what "intuitive" means, you watch users interact. Instead of arguing about timing, you measure it.
            </p>
            <p className="text-gray-300 leading-relaxed mb-4">
              Prototypes surface problems early. A spec might pass review and fail in production. A prototype fails in your hands, not your users'.
            </p>
            <p className="text-gray-300 leading-relaxed mb-8">
              Prototypes accelerate decisions. "Does this work?" becomes answerable in hours, not weeks.
            </p>

            <div className="grid sm:grid-cols-2 gap-3 my-6">
              <div className="p-4 bg-gray-900/50 border border-gray-700 rounded-lg">
                <p className="text-[10px] font-mono text-gray-500 mb-2">SPEC</p>
                <ul className="text-sm text-gray-400 space-y-1">
                  <li>→ Describes intent</li>
                  <li>→ Requires imagination</li>
                  <li>→ Fails in production</li>
                </ul>
              </div>
              <div className="p-4 bg-gray-900/50 border border-terminal-gold/30 rounded-lg">
                <p className="text-[10px] font-mono text-terminal-gold mb-2">PROTOTYPE</p>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>→ Demonstrates behavior</li>
                  <li>→ Creates experience</li>
                  <li>→ Fails in your hands</li>
                </ul>
              </div>
            </div>

            <h2 className="text-xl md:text-2xl font-bold text-white mb-4">When Specs Work</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              Specs aren't useless. They're useful for documentation after validation, for communicating decisions to stakeholders who weren't in the room, for creating a record of what was built and why.
            </p>
            <p className="text-gray-300 leading-relaxed">
              But specs should follow prototypes, not precede them. Document what you've validated, not what you hope will work.
            </p>

          </div>
        </div>
      </article>

      {/* Navigation */}
      <section className="relative py-6 md:py-10 px-4 sm:px-6 md:px-8">
        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="flex items-center justify-between">
            <Link
              href="/thinking/build-to-think"
              className="inline-flex items-center gap-2 text-xs text-gray-400 hover:text-terminal-gold transition-colors"
            >
              <ArrowLeft className="w-3 h-3" />
              Previous: Build-to-Think
            </Link>
            <Link
              href="/thinking/methodology-origins"
              className="inline-flex items-center gap-2 text-xs text-gray-400 hover:text-terminal-gold transition-colors"
            >
              Next: Methodology Origins
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
