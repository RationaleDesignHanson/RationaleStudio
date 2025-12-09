'use client';

import Link from 'next/link';
import { OS8Window } from '@/components/visual-test';

export default function AthletesFirstPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-800">
        <div className="max-w-5xl mx-auto">
          <Link
            href="/#portfolio"
            className="text-sm text-gray-400 hover:text-terminal-gold font-semibold transition-colors mb-6 inline-block"
          >
            ← Back to Portfolio
          </Link>

          <p className="text-xs sm:text-sm font-mono text-terminal-gold tracking-widest mb-4">
            CLIENT ENGAGEMENT // STRATEGIC PITCH
          </p>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
            Athletes First
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl text-gray-300 leading-relaxed max-w-3xl mb-6">
            NIL platform strategy and product vision for athlete partnership opportunities
          </p>

          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 rounded-full bg-gray-800 border border-gray-700 text-gray-300 text-xs font-semibold">
              Strategic Pitch
            </span>
            <span className="px-3 py-1 rounded-full bg-gray-800 border border-gray-700 text-gray-300 text-xs font-semibold">
              Product Vision
            </span>
            <span className="px-3 py-1 rounded-full bg-gray-800 border border-gray-700 text-gray-300 text-xs font-semibold">
              Platform Strategy
            </span>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-800">
        <div className="max-w-5xl mx-auto">
          <OS8Window
            title="Project Overview"
            variant="yellow"
            animateIn={false}
            className="max-w-4xl mx-auto"
          >
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p className="text-base">
                <span className="font-bold text-black">Challenge:</span> Athletes First needed a comprehensive platform strategy for the emerging NIL (Name, Image, Likeness) market. The opportunity required clarifying product vision, market positioning, and technical architecture before significant investment.
              </p>
              <p className="text-base">
                <span className="font-bold text-black">Approach:</span> Rationale developed a strategic pitch covering platform vision, user experience architecture, monetization models, and phased rollout strategy. The work synthesized market research, competitive analysis, and technical feasibility into an actionable roadmap.
              </p>
              <p className="text-base border-t border-terminal-gold pt-4 font-semibold text-black">
                Deliverable: Comprehensive pitch deck with product vision, market strategy, and technical architecture recommendations.
              </p>
            </div>
          </OS8Window>
        </div>
      </section>

      {/* Key Deliverables */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              What We Delivered
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <OS8Window
              title="Platform Strategy"
              variant="minimal"
              delay={100}
            >
              <div className="space-y-3">
                <p className="text-sm text-gray-600 leading-relaxed">
                  Market positioning, competitive landscape analysis, and differentiation strategy for NIL platform opportunity.
                </p>
                <ul className="text-xs text-gray-600 space-y-1 border-t border-gray-200 pt-3">
                  <li>• Market opportunity sizing</li>
                  <li>• Competitive positioning</li>
                  <li>• Value proposition framework</li>
                </ul>
              </div>
            </OS8Window>

            <OS8Window
              title="Product Vision"
              variant="minimal"
              delay={200}
            >
              <div className="space-y-3">
                <p className="text-sm text-gray-600 leading-relaxed">
                  User experience architecture, feature prioritization, and product roadmap for multi-sided platform connecting athletes with opportunities.
                </p>
                <ul className="text-xs text-gray-600 space-y-1 border-t border-gray-200 pt-3">
                  <li>• UX architecture</li>
                  <li>• Feature prioritization</li>
                  <li>• Phased rollout strategy</li>
                </ul>
              </div>
            </OS8Window>

            <OS8Window
              title="Technical Architecture"
              variant="minimal"
              delay={300}
            >
              <div className="space-y-3">
                <p className="text-sm text-gray-600 leading-relaxed">
                  Platform infrastructure recommendations, integration strategy, and technical feasibility assessment.
                </p>
                <ul className="text-xs text-gray-600 space-y-1 border-t border-gray-200 pt-3">
                  <li>• Infrastructure design</li>
                  <li>• Integration planning</li>
                  <li>• Technical feasibility</li>
                </ul>
              </div>
            </OS8Window>
          </div>
        </div>
      </section>

      {/* Outcomes */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-800">
        <div className="max-w-5xl mx-auto">
          <OS8Window
            title="Outcomes & Impact"
            variant="default"
            animateIn={false}
            className="max-w-4xl mx-auto"
          >
            <div className="space-y-4">
              <p className="text-sm text-gray-600 leading-relaxed">
                The strategic pitch provided Athletes First with a comprehensive foundation for platform development decisions, including market validation, product scope definition, and phased execution strategy.
              </p>
              <div className="grid md:grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                <div>
                  <p className="text-xs font-bold text-black uppercase tracking-wide mb-2">Clarity Achieved</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Go-to-market strategy defined</li>
                    <li>• Product scope validated</li>
                    <li>• Technical path clarified</li>
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-bold text-black uppercase tracking-wide mb-2">De-Risked Decisions</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Market opportunity validated</li>
                    <li>• Competitive positioning clear</li>
                    <li>• Build vs. buy decisions informed</li>
                  </ul>
                </div>
              </div>
            </div>
          </OS8Window>
        </div>
      </section>

      {/* What This Proves */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-800">
        <div className="max-w-5xl mx-auto">
          <OS8Window
            title="What This Proves About Rationale"
            variant="yellow"
            animateIn={false}
            className="max-w-4xl mx-auto"
          >
            <div className="space-y-3 text-gray-700">
              <p className="text-sm leading-relaxed">
                <span className="font-bold text-black">Strategic thinking:</span> Ability to synthesize market research, competitive intelligence, and technical constraints into actionable product strategy.
              </p>
              <p className="text-sm leading-relaxed">
                <span className="font-bold text-black">Platform expertise:</span> Experience designing multi-sided platforms with complex stakeholder needs and monetization models.
              </p>
              <p className="text-sm leading-relaxed">
                <span className="font-bold text-black">Rapid execution:</span> Delivered comprehensive strategic pitch in compressed timeline without sacrificing depth or quality.
              </p>
            </div>
          </OS8Window>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto flex justify-center">
          <OS8Window
            title="Need Similar Strategic Work?"
            variant="yellow"
            animateIn={false}
            className="max-w-lg"
          >
            <div className="space-y-6">
              <p className="text-base text-gray-700 leading-relaxed">
                Whether you need a strategic pitch, product vision, or technical architecture—Rationale helps you build conviction before committing resources.
              </p>

              <div className="flex flex-col gap-3 pt-4">
                <Link
                  href="/contact"
                  className="w-full bg-terminal-gold hover:bg-[#FFE34D] text-black text-center px-6 py-3 font-semibold transition-colors"
                >
                  Start a Conversation →
                </Link>
                <Link
                  href="/how-we-work"
                  className="w-full border border-gray-300 hover:border-terminal-gold text-black text-center px-6 py-3 font-semibold transition-colors"
                >
                  How We Work
                </Link>
              </div>

              <div className="pt-3 border-t border-gray-200 text-center">
                <p className="text-xs text-gray-500">
                  <a href="/contact" className="hover:text-terminal-gold transition-colors">Contact us</a>
                </p>
              </div>
            </div>
          </OS8Window>
        </div>
      </section>
    </main>
  );
}
