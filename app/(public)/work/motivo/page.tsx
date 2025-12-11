'use client';

import Link from 'next/link';
import { OS8Window } from '@/components/visual-test';

export default function MotivoPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white">
      {/* Hero Section */}
      <section className="py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-4 sm:px-6 md:px-8 border-b border-gray-800">
        <div className="max-w-5xl mx-auto">
          <Link
            href="/#portfolio"
            className="text-sm text-gray-400 hover:text-terminal-gold font-semibold transition-colors mb-6 inline-block"
          >
            ← Back to Portfolio
          </Link>

          <p className="text-xs sm:text-sm font-mono text-terminal-gold tracking-widest mb-4">
            META FAIR // EMBODIED AI RESEARCH
          </p>

          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6">
            Motivo
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl text-gray-300 leading-relaxed max-w-3xl mb-6">
            Transforming groundbreaking UNICORN models from research into product reality through multimodal prompt interfaces for embodied agents
          </p>

          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 rounded-full bg-gray-800 border border-gray-700 text-gray-300 text-xs font-semibold">
              Research to Product
            </span>
            <span className="px-3 py-1 rounded-full bg-gray-800 border border-gray-700 text-gray-300 text-xs font-semibold">
              Embodied AI
            </span>
            <span className="px-3 py-1 rounded-full bg-gray-800 border border-gray-700 text-gray-300 text-xs font-semibold">
              Multimodal Interfaces
            </span>
            <span className="px-3 py-1 rounded-full bg-gray-800 border border-gray-700 text-gray-300 text-xs font-semibold">
              Team Development
            </span>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-4 sm:px-6 md:px-8 border-b border-gray-800">
        <div className="max-w-5xl mx-auto">
          <OS8Window
            title="Project Overview"
            variant="yellow"
            animateIn={false}
            className="max-w-4xl mx-auto"
          >
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p className="text-base">
                <span className="font-bold text-black">Challenge:</span> Meta's FAIR team had revolutionary UNICORN models capable of learning from language, motion, and pose signals instantly—but no clear pathway to product or user-facing applications. The team was stretched thin with feature chasing, burnout, and duplication of effort across initiatives.
              </p>
              <p className="text-base">
                <span className="font-bold text-black">Approach:</span> Identified the gap between research capability and product opportunity. Proposed building an interface for multimodal prompts to control embodied agents, then secured buy-in from leadership. Conducted strategic planning sessions with founders to map core user behaviors, shifting the team from task-based execution to value-driven product planning.
              </p>
              <p className="text-base border-t border-terminal-gold pt-4 font-semibold text-black">
                Impact: Transformed research into flagship NeurIPS launch, established clear product vision, and rebuilt team capacity through coaching and strategic hiring.
              </p>
            </div>
          </OS8Window>
        </div>
      </section>

      {/* Key Deliverables */}
      <section className="py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-4 sm:px-6 md:px-8 border-b border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
              From Ambiguity to Clarity
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <OS8Window
              title="Strategic Vision"
              variant="minimal"
              delay={100}
            >
              <div className="space-y-3">
                <p className="text-sm text-gray-600 leading-relaxed">
                  Bridged research capability to product opportunity by proposing multimodal prompt interfaces for embodied agents.
                </p>
                <ul className="text-xs text-gray-600 space-y-1 border-t border-gray-200 pt-3">
                  <li>• Identified research-to-product gap</li>
                  <li>• Created unified product vision</li>
                  <li>• Secured leadership buy-in</li>
                </ul>
              </div>
            </OS8Window>

            <OS8Window
              title="Product Planning"
              variant="minimal"
              delay={200}
            >
              <div className="space-y-3">
                <p className="text-sm text-gray-600 leading-relaxed">
                  Shifted team from feature chasing to value-driven approach, mapping core user behaviors and establishing clear priorities.
                </p>
                <ul className="text-xs text-gray-600 space-y-1 border-t border-gray-200 pt-3">
                  <li>• Core user behavior mapping</li>
                  <li>• Value-driven prioritization</li>
                  <li>• Measurable outcome frameworks</li>
                </ul>
              </div>
            </OS8Window>

            <OS8Window
              title="Team Development"
              variant="minimal"
              delay={300}
            >
              <div className="space-y-3">
                <p className="text-sm text-gray-600 leading-relaxed">
                  Coached junior designers, brought in senior support, and established prototyper role to validate technical approaches.
                </p>
                <ul className="text-xs text-gray-600 space-y-1 border-t border-gray-200 pt-3">
                  <li>• Junior designer coaching</li>
                  <li>• Senior designer hiring</li>
                  <li>• Prototyper discipline creation</li>
                </ul>
              </div>
            </OS8Window>
          </div>
        </div>
      </section>

      {/* Technical Context */}
      <section className="py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-4 sm:px-6 md:px-8 border-b border-gray-800">
        <div className="max-w-5xl mx-auto">
          <OS8Window
            title="Technical Foundation"
            variant="default"
            animateIn={false}
            className="max-w-4xl mx-auto"
          >
            <div className="space-y-4">
              <p className="text-sm text-gray-600 leading-relaxed">
                Meta's UNICORN models represented breakthrough capability in embodied AI—learning instantly from language, motion, and pose signals. The challenge wasn't the research; it was creating the product interface and team structure to bring this capability to users.
              </p>
              <div className="grid md:grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                <div>
                  <p className="text-xs font-bold text-black uppercase tracking-wide mb-2">Research Capability</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• UNICORN multimodal models</li>
                    <li>• Instant learning from signals</li>
                    <li>• Embodied agent control</li>
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-bold text-black uppercase tracking-wide mb-2">Product Launch</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Flagship NeurIPS demo</li>
                    <li>• Multimodal prompt interface</li>
                    <li>• Cross-functional alignment</li>
                  </ul>
                </div>
              </div>
            </div>
          </OS8Window>
        </div>
      </section>

      {/* What This Proves */}
      <section className="py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-4 sm:px-6 md:px-8 border-b border-gray-800">
        <div className="max-w-5xl mx-auto">
          <OS8Window
            title="What This Proves About Rationale"
            variant="yellow"
            animateIn={false}
            className="max-w-4xl mx-auto"
          >
            <div className="space-y-3 text-gray-700">
              <p className="text-sm leading-relaxed">
                <span className="font-bold text-black">Research translation:</span> Ability to identify product opportunities in cutting-edge research and secure buy-in for ambitious technical visions.
              </p>
              <p className="text-sm leading-relaxed">
                <span className="font-bold text-black">0→1 product clarity:</span> Transformed ambiguous research capability into clear product vision with measurable outcomes and strategic priorities.
              </p>
              <p className="text-sm leading-relaxed">
                <span className="font-bold text-black">Team rebuilding:</span> Rescued burned-out team through strategic planning, coaching, and smart hiring—shifting from chaos to sustainable execution.
              </p>
            </div>
          </OS8Window>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-4 sm:px-6 lg:px-4 sm:px-6 md:px-8">
        <div className="max-w-5xl mx-auto flex justify-center">
          <OS8Window
            title="Research to Product Challenge?"
            variant="yellow"
            animateIn={false}
            className="max-w-lg"
          >
            <div className="space-y-6">
              <p className="text-base text-gray-700 leading-relaxed">
                Whether you're translating research into product, building embodied AI systems, or rescuing a team stuck in ambiguity—Rationale brings clarity to complex technical challenges.
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
