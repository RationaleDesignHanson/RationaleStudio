'use client';

import Link from 'next/link';
import { OS8Window } from '@/components/visual-test';

export default function CreaitPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-800">
        <div className="max-w-5xl mx-auto">
          <Link
            href="/#portfolio"
            className="text-sm text-gray-400 hover:text-[#FFD700] font-semibold transition-colors mb-6 inline-block"
          >
            ← Back to Portfolio
          </Link>

          <p className="text-xs sm:text-sm font-mono text-[#FFD700] tracking-widest mb-4">
            CLIENT ENGAGEMENT // STRATEGIC PITCH
          </p>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
            CREaiT
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl text-gray-300 leading-relaxed max-w-3xl mb-6">
            AI-powered commercial real estate intelligence platform strategy and go-to-market positioning
          </p>

          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 rounded-full bg-gray-800 border border-gray-700 text-gray-300 text-xs font-semibold">
              Strategic Pitch
            </span>
            <span className="px-3 py-1 rounded-full bg-gray-800 border border-gray-700 text-gray-300 text-xs font-semibold">
              AI Platform
            </span>
            <span className="px-3 py-1 rounded-full bg-gray-800 border border-gray-700 text-gray-300 text-xs font-semibold">
              CRE Intelligence
            </span>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-800">
        <div className="max-w-5xl mx-auto">
          <OS8Window
            title="Project Overview"
            variant="featured"
            animateIn={false}
            className="max-w-4xl mx-auto"
          >
            <div className="space-y-4 text-gray-100 leading-relaxed">
              <p className="text-base">
                <span className="font-bold text-[#FFD700]">Challenge:</span> CREaiT needed strategic positioning and product vision for an AI-powered commercial real estate intelligence platform. The market opportunity required synthesizing complex data workflows, user needs, and competitive differentiation into a compelling investor pitch.
              </p>
              <p className="text-base">
                <span className="font-bold text-[#FFD700]">Approach:</span> Rationale developed a comprehensive strategic pitch covering market analysis, product positioning, AI architecture, and business model recommendations. The work translated technical complexity into clear value propositions for CRE professionals.
              </p>
              <p className="text-base border-t border-[#FFD700] pt-4 font-semibold text-[#FFD700]">
                Deliverable: Strategic pitch deck with market positioning, product vision, AI capabilities roadmap, and go-to-market strategy.
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
              title="Market Strategy"
              variant="body"
              delay={100}
            >
              <div className="space-y-3">
                <p className="text-sm text-gray-100 leading-relaxed">
                  Commercial real estate market analysis, buyer persona definition, and competitive positioning strategy.
                </p>
                <ul className="text-xs text-gray-300 space-y-1 border-t border-gray-700 pt-3">
                  <li>• CRE market opportunity</li>
                  <li>• Buyer persona research</li>
                  <li>• Competitive differentiation</li>
                </ul>
              </div>
            </OS8Window>

            <OS8Window
              title="AI Product Vision"
              variant="body"
              delay={200}
            >
              <div className="space-y-3">
                <p className="text-sm text-gray-100 leading-relaxed">
                  AI capabilities roadmap, data intelligence architecture, and user experience design for CRE professionals.
                </p>
                <ul className="text-xs text-gray-300 space-y-1 border-t border-gray-700 pt-3">
                  <li>• AI capabilities framework</li>
                  <li>• Data intelligence UX</li>
                  <li>• Workflow automation design</li>
                </ul>
              </div>
            </OS8Window>

            <OS8Window
              title="Go-to-Market"
              variant="body"
              delay={300}
            >
              <div className="space-y-3">
                <p className="text-sm text-gray-100 leading-relaxed">
                  Business model recommendations, pricing strategy, and phased market entry plan for CRE intelligence platform.
                </p>
                <ul className="text-xs text-gray-300 space-y-1 border-t border-gray-700 pt-3">
                  <li>• Business model design</li>
                  <li>• Pricing strategy</li>
                  <li>• Phased rollout plan</li>
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
            variant="body"
            animateIn={false}
            className="max-w-4xl mx-auto"
          >
            <div className="space-y-4">
              <p className="text-sm text-gray-100 leading-relaxed">
                The strategic pitch provided CREaiT with a clear foundation for investor conversations, product development prioritization, and market entry decisions in the commercial real estate intelligence space.
              </p>
              <div className="grid md:grid-cols-2 gap-4 pt-4 border-t border-gray-700">
                <div>
                  <p className="text-xs font-bold text-gray-100 uppercase tracking-wide mb-2">Strategic Clarity</p>
                  <ul className="text-sm text-gray-100 space-y-1">
                    <li>• Market positioning defined</li>
                    <li>• Value proposition validated</li>
                    <li>• AI capabilities prioritized</li>
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-100 uppercase tracking-wide mb-2">Investor-Ready</p>
                  <ul className="text-sm text-gray-100 space-y-1">
                    <li>• Compelling narrative crafted</li>
                    <li>• Business model validated</li>
                    <li>• Go-to-market strategy clear</li>
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
            variant="featured"
            animateIn={false}
            className="max-w-4xl mx-auto"
          >
            <div className="space-y-3 text-gray-100">
              <p className="text-sm leading-relaxed">
                <span className="font-bold text-[#FFD700]">Domain expertise:</span> Ability to rapidly synthesize complex domain knowledge (commercial real estate) and translate it into clear product strategy.
              </p>
              <p className="text-sm leading-relaxed">
                <span className="font-bold text-[#FFD700]">AI product design:</span> Experience designing AI-powered intelligence platforms with sophisticated data workflows and user needs.
              </p>
              <p className="text-sm leading-relaxed">
                <span className="font-bold text-[#FFD700]">Investor positioning:</span> Skill in crafting compelling narratives that bridge technical capability with business value for investor audiences.
              </p>
            </div>
          </OS8Window>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto flex justify-center">
          <OS8Window
            title="Building an AI Product?"
            variant="cta"
            animateIn={false}
            className="max-w-lg"
          >
            <div className="space-y-6">
              <p className="text-base text-[#FFD700] leading-relaxed">
                Rationale specializes in AI product strategy—from market positioning to technical architecture. Get clarity before you build.
              </p>

              <div className="flex flex-col gap-3 pt-4">
                <Link
                  href="/contact"
                  className="w-full bg-[#FFD700] hover:bg-[#FFE34D] text-black text-center px-6 py-3 font-semibold transition-colors"
                >
                  Start a Conversation →
                </Link>
                <Link
                  href="/how-we-work"
                  className="w-full border border-[#FFD700] hover:border-[#FFE34D] text-[#FFD700] hover:text-[#FFE34D] text-center px-6 py-3 font-semibold transition-colors"
                >
                  How We Work
                </Link>
              </div>

              <div className="pt-3 border-t border-[#FFD700]/30 text-center">
                <p className="text-xs text-[#FFD700]/70">
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
