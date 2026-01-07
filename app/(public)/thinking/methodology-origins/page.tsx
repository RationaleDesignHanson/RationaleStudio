/**
 * Essay: Methodology Origins
 *
 * Blog-style article matching home/collab styling
 */

'use client';

import Link from 'next/link';
import { ASCIIUnifiedGrid } from '@/components/visual';
import { watercolorThemes } from '@/lib/theme/watercolor-palette';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export default function MethodologyOriginsPage() {
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
            <span className="text-[10px] font-mono text-terminal-gold tracking-widest">ORIGIN</span>
            <span className="text-gray-600">·</span>
            <span className="text-xs text-gray-500">7 min read</span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
            Methodology Origins
          </h1>

          <p className="text-base md:text-lg text-gray-300 leading-relaxed">
            7 years at Meta Reality Labs shipping AR/AI products to billions. Where Rationale's approach comes from.
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

            <h2 className="text-xl md:text-2xl font-bold text-white mt-0 mb-4">The Scale Problem</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              At Meta Reality Labs, we shipped AR features to 2 billion+ users. At that scale, small mistakes become massive problems. A gesture that confuses 0.1% of users is still millions of people.
            </p>
            <p className="text-gray-300 leading-relaxed mb-8">
              We learned to validate everything before production because the cost of mistakes was measured in millions—not just dollars, but user experiences broken at scale.
            </p>

            <h2 className="text-xl md:text-2xl font-bold text-white mb-4">What AR Taught Us</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              AR interactions are physical. They require body movement, spatial awareness, gesture memory. You can't spec your way to understanding how a pinch gesture should feel, or how fast a virtual object should respond to head movement.
            </p>
            <p className="text-gray-300 leading-relaxed mb-4">
              We built prototypes constantly—not as deliverables, but as thinking tools. A 2-day prototype could answer questions that 2 weeks of meetings couldn't resolve.
            </p>
            <p className="text-gray-300 leading-relaxed mb-8">
              This wasn't a philosophical preference. It was survival. The complexity of AR meant that specs were always wrong in ways we couldn't predict.
            </p>

            <h2 className="text-xl md:text-2xl font-bold text-white mb-4">The Pattern That Emerged</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              Over 7 years, a pattern hardened:
            </p>
            <ul className="text-gray-300 space-y-2 mb-6">
              <li>→ Build something small that demonstrates the core question</li>
              <li>→ Put it in users' hands (or on their faces, with AR)</li>
              <li>→ Watch behavior, not opinions</li>
              <li>→ Pivot or proceed based on evidence</li>
              <li>→ Repeat until conviction is earned</li>
            </ul>
            <p className="text-gray-300 leading-relaxed mb-8">
              This pattern worked for gesture recognition systems. It worked for commerce features. It worked for never-before-built hardware like Orion glasses. The domain didn't matter—the principle did.
            </p>

            <h2 className="text-xl md:text-2xl font-bold text-white mb-4">From Meta to Rationale</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              Startups face the same problem as Meta, but with higher stakes. Meta had resources to recover from mistakes. Startups don't. Limited runway means you can't afford to build the wrong thing.
            </p>
            <p className="text-gray-300 leading-relaxed mb-4">
              That makes validated learning even more critical. The methodology that worked at billion-user scale works even better at 0-to-1 scale.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Validate early. Pivot cheap. Ship with conviction.
            </p>

          </div>
        </div>
      </article>

      {/* Navigation */}
      <section className="relative py-6 md:py-10 px-4 sm:px-6 md:px-8">
        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="flex items-center justify-between">
            <Link
              href="/thinking/spec-vs-prototype"
              className="inline-flex items-center gap-2 text-xs text-gray-400 hover:text-terminal-gold transition-colors"
            >
              <ArrowLeft className="w-3 h-3" />
              Previous: Spec vs Prototype
            </Link>
            <Link
              href="/thinking"
              className="inline-flex items-center gap-2 text-xs text-gray-400 hover:text-terminal-gold transition-colors"
            >
              All essays
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
