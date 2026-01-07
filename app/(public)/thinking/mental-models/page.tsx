/**
 * Essay: Mental Models for Building Products
 *
 * Four frameworks that guide how we approach product development
 */

'use client';

import Link from 'next/link';
import { ASCIIUnifiedGrid } from '@/components/visual';
import { watercolorThemes } from '@/lib/theme/watercolor-palette';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export default function MentalModelsPage() {
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

      {/* Back Link */}
      <div className="relative z-10 px-4 sm:px-6 md:px-8 pt-8">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/thinking"
            className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-terminal-gold transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Thinking
          </Link>
        </div>
      </div>

      {/* Article */}
      <article className="relative py-12 px-4 sm:px-6 md:px-8">
        <div className="max-w-3xl mx-auto">
          <header className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-mono text-terminal-gold uppercase tracking-wide">
                FRAMEWORKS
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
              Mental Models for Building Products
            </h1>
            <p className="text-lg text-gray-300 leading-relaxed">
              Four frameworks that guide how we approach product development—and help clients build conviction before committing resources.
            </p>
          </header>

          {/* Content */}
          <div className="space-y-12">

            {/* Model 1 */}
            <section>
              <div className="border-l-2 border-terminal-gold pl-5">
                <h2 className="text-xl font-bold text-white mb-1">Clarity Precedes Illumination</h2>
                <p className="text-terminal-gold text-sm font-medium mb-4">Design the circuit before the lightbulb</p>
              </div>
              <p className="text-gray-300 leading-relaxed mb-4">
                The most elegant execution is meaningless without an underlying system of clarity, behavior, and intent. A lightbulb is a brilliant invention, but it only works because a circuit directs energy with intent.
              </p>
              <p className="text-gray-300 leading-relaxed mb-4">
                Modern product teams rush to be the lightbulb—the visible execution. They skip the essential work of designing the circuit. We start with clarity: the system that gives shape to energy and ensures the right experience is illuminated for the right people.
              </p>
              <div className="bg-gray-900/50 border border-gray-700 p-4 rounded-lg">
                <p className="text-xs font-mono text-gray-400 uppercase tracking-wide mb-2">In Practice</p>
                <ul className="space-y-1 text-sm text-gray-300">
                  <li className="flex gap-2"><span className="text-terminal-gold">→</span> Map the problem space before the solution space</li>
                  <li className="flex gap-2"><span className="text-terminal-gold">→</span> Define behavior change, not features</li>
                  <li className="flex gap-2"><span className="text-terminal-gold">→</span> Build conviction before execution</li>
                </ul>
              </div>
            </section>

            {/* Model 2 */}
            <section>
              <div className="border-l-2 border-terminal-gold pl-5">
                <h2 className="text-xl font-bold text-white mb-1">Course Before Speed</h2>
                <p className="text-terminal-gold text-sm font-medium mb-4">Direction is the new bottleneck</p>
              </div>
              <p className="text-gray-300 leading-relaxed mb-4">
                AI has given everyone unprecedented speed. But without clear direction, more speed only gets you lost faster. A ship moving slowly in the wrong direction is a problem. A ship moving at high speed toward disaster is a catastrophe.
              </p>
              <p className="text-gray-300 leading-relaxed mb-4">
                The rise of AI has accelerated everyone's engines, but this has created a new bottleneck. Speed is no longer the primary constraint; direction is. We serve as the navigator—charting the map, revealing unmapped waters, and providing a clear bearing before the engines ignite.
              </p>
              <div className="bg-gray-900/50 border border-gray-700 p-4 rounded-lg">
                <p className="text-xs font-mono text-gray-400 uppercase tracking-wide mb-2">In Practice</p>
                <ul className="space-y-1 text-sm text-gray-300">
                  <li className="flex gap-2"><span className="text-terminal-gold">→</span> Validate assumptions before scaling execution</li>
                  <li className="flex gap-2"><span className="text-terminal-gold">→</span> Test the hardest risks first</li>
                  <li className="flex gap-2"><span className="text-terminal-gold">→</span> Build the map before accelerating</li>
                </ul>
              </div>
            </section>

            {/* Model 3 */}
            <section>
              <div className="border-l-2 border-terminal-gold pl-5">
                <h2 className="text-xl font-bold text-white mb-1">Environment Shapes Behavior</h2>
                <p className="text-terminal-gold text-sm font-medium mb-4">Build systems where better outcomes are the default</p>
              </div>
              <p className="text-gray-300 leading-relaxed mb-4">
                To change something, you don't fight the existing system. You build a new one that renders the old one obsolete. Buckminster Fuller taught us that lasting change comes from designing new environments, not fighting old systems.
              </p>
              <p className="text-gray-300 leading-relaxed mb-4">
                Most products try to change user behavior through friction, forcing functions, or persuasion. We build new environments—workflows, behavioral systems, and mental models where better outcomes happen naturally.
              </p>
              <div className="bg-gray-900/50 border border-gray-700 p-4 rounded-lg">
                <p className="text-xs font-mono text-gray-400 uppercase tracking-wide mb-2">In Practice</p>
                <ul className="space-y-1 text-sm text-gray-300">
                  <li className="flex gap-2"><span className="text-terminal-gold">→</span> Design for defaults, not willpower</li>
                  <li className="flex gap-2"><span className="text-terminal-gold">→</span> Make the right choice the easy choice</li>
                  <li className="flex gap-2"><span className="text-terminal-gold">→</span> Build systems, not just features</li>
                </ul>
              </div>
            </section>

            {/* Model 4 */}
            <section>
              <div className="border-l-2 border-terminal-gold pl-5">
                <h2 className="text-xl font-bold text-white mb-1">Working Software as Thinking Tool</h2>
                <p className="text-terminal-gold text-sm font-medium mb-4">Build to think, not just to ship</p>
              </div>
              <p className="text-gray-300 leading-relaxed mb-4">
                Prototypes aren't just for testing ideas—they're for generating them. The act of building reveals constraints, opportunities, and insights that no amount of planning can surface.
              </p>
              <p className="text-gray-300 leading-relaxed mb-4">
                Specs describe what you think you know. Prototypes reveal what you don't. We use working software as a thinking tool—a way to externalize assumptions and test them against reality before committing to expensive production builds.
              </p>
              <div className="bg-gray-900/50 border border-gray-700 p-4 rounded-lg">
                <p className="text-xs font-mono text-gray-400 uppercase tracking-wide mb-2">In Practice</p>
                <ul className="space-y-1 text-sm text-gray-300">
                  <li className="flex gap-2"><span className="text-terminal-gold">→</span> Prototype the riskiest assumptions first</li>
                  <li className="flex gap-2"><span className="text-terminal-gold">→</span> Use builds to generate clarity, not just validate it</li>
                  <li className="flex gap-2"><span className="text-terminal-gold">→</span> Ship to learn, iterate to ship</li>
                </ul>
              </div>
            </section>

            {/* Summary */}
            <section>
              <h2 className="text-xl font-bold text-white mb-4">Applying These Models</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                These aren't abstract principles—they're operational frameworks we use on every engagement. They shape how we scope projects, where we focus attention, and how we sequence work to reduce risk.
              </p>
              <p className="text-gray-300 leading-relaxed">
                When you work with Rationale, you're not just getting execution. You're getting a systematic approach to building conviction—one that's been tested on our own products and refined through dozens of client engagements.
              </p>
            </section>
          </div>

          {/* Footer Navigation */}
          <div className="mt-12 pt-8 border-t border-gray-800">
            <div className="flex items-center justify-between">
              <Link
                href="/thinking"
                className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-terminal-gold transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                All Essays
              </Link>
              <Link
                href="/thinking/build-to-think"
                className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-terminal-gold transition-colors"
              >
                Next: Build-to-Think Methodology
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </article>
    </main>
  );
}

