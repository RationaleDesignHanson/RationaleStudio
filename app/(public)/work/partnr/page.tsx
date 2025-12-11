'use client';

import Link from 'next/link';
import { OS8Window } from '@/components/visual-test';

export default function PartnrPage() {
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

          <h1 className="text-2xl md:text-3xl lg:text-4xl sm:text-5xl md:text-2xl md:text-3xl lg:text-4xl md:text-5xl lg:text-6xl lg:text-7xl font-bold mb-6">
            PARTNR
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl text-gray-300 leading-relaxed max-w-3xl mb-6">
            Human-robot collaboration benchmark transforming AI from agents to partners
          </p>

          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 rounded-full bg-gray-800 border border-gray-700 text-gray-300 text-xs font-semibold">
              Embodied AI
            </span>
            <span className="px-3 py-1 rounded-full bg-gray-800 border border-gray-700 text-gray-300 text-xs font-semibold">
              Robotics
            </span>
            <span className="px-3 py-1 rounded-full bg-gray-800 border border-gray-700 text-gray-300 text-xs font-semibold">
              Human-AI Collaboration
            </span>
            <span className="px-3 py-1 rounded-full bg-gray-800 border border-gray-700 text-gray-300 text-xs font-semibold">
              Research Platform
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
                <span className="font-bold text-black">Challenge:</span> Creating truly collaborative human-robot systems requires fundamentally new approaches to AI. Existing benchmarks focused on robots as independent agents, not as partners working alongside humans in complex, dynamic environments.
              </p>
              <p className="text-base">
                <span className="font-bold text-black">Approach:</span> PARTNR (Planning And Reasoning Tasks in humaN-Robot collaboration) establishes the largest benchmark of its kind—100,000 natural language tasks across 60 simulated homes with 5,800+ unique objects. Built on Habitat 3.0, the framework evaluates how LLMs/VLMs collaborate with humans in real-world scenarios like cleaning, cooking, and home management.
              </p>
              <p className="text-base border-t border-terminal-gold pt-4 font-semibold text-black">
                Impact: Successfully deployed on Boston Dynamics Spot robot, validating real-world applicability beyond simulation.
              </p>
            </div>
          </OS8Window>
        </div>
      </section>

      {/* Key Capabilities */}
      <section className="py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-4 sm:px-6 md:px-8 border-b border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-2xl md:text-3xl lg:text-4xl md:text-5xl font-bold mb-4">
              Platform Capabilities
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <OS8Window
              title="Simulation at Scale"
              variant="minimal"
              delay={100}
            >
              <div className="space-y-3">
                <p className="text-sm text-gray-600 leading-relaxed">
                  100,000 natural language tasks across realistic home environments, enabling comprehensive evaluation of collaborative AI behaviors.
                </p>
                <ul className="text-xs text-gray-600 space-y-1 border-t border-gray-200 pt-3">
                  <li>• 60 unique home environments</li>
                  <li>• 5,800+ distinct objects</li>
                  <li>• Human-in-the-loop testing</li>
                </ul>
              </div>
            </OS8Window>

            <OS8Window
              title="Real-World Validation"
              variant="minimal"
              delay={200}
            >
              <div className="space-y-3">
                <p className="text-sm text-gray-600 leading-relaxed">
                  Successfully bridged sim-to-real gap with deployment on Boston Dynamics Spot, proving commercial viability of research approach.
                </p>
                <ul className="text-xs text-gray-600 space-y-1 border-t border-gray-200 pt-3">
                  <li>• Boston Dynamics integration</li>
                  <li>• Physical environment testing</li>
                  <li>• Real-world performance validation</li>
                </ul>
              </div>
            </OS8Window>

            <OS8Window
              title="Collaborative Intelligence"
              variant="minimal"
              delay={300}
            >
              <div className="space-y-3">
                <p className="text-sm text-gray-600 leading-relaxed">
                  Transforms AI from independent agents to collaborative partners through context-aware reasoning and adaptive coordination.
                </p>
                <ul className="text-xs text-gray-600 space-y-1 border-t border-gray-200 pt-3">
                  <li>• Natural language understanding</li>
                  <li>• Multi-agent coordination</li>
                  <li>• Adaptive task planning</li>
                </ul>
              </div>
            </OS8Window>
          </div>
        </div>
      </section>

      {/* Technical Foundation */}
      <section className="py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-4 sm:px-6 md:px-8 border-b border-gray-800">
        <div className="max-w-5xl mx-auto">
          <OS8Window
            title="Technical Architecture"
            variant="default"
            animateIn={false}
            className="max-w-4xl mx-auto"
          >
            <div className="space-y-4">
              <p className="text-sm text-gray-600 leading-relaxed">
                Built on Meta's Habitat 3.0 simulator, PARTNR supports both humanoid avatars and robotic agents in high-fidelity home environments. The platform integrates state-of-the-art LLMs and VLMs, providing standardized benchmarks for evaluating collaborative intelligence.
              </p>
              <div className="grid md:grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                <div>
                  <p className="text-xs font-bold text-black uppercase tracking-wide mb-2">Platform Foundation</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Habitat 3.0 simulation engine</li>
                    <li>• LLM/VLM integration layer</li>
                    <li>• Human-in-the-loop tooling</li>
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-bold text-black uppercase tracking-wide mb-2">Research Output</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Open-source benchmark dataset</li>
                    <li>• Standardized evaluation metrics</li>
                    <li>• Baseline model performance</li>
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
                <span className="font-bold text-black">Frontier research:</span> Experience working at the edge of AI capabilities, translating academic research into deployable systems.
              </p>
              <p className="text-sm leading-relaxed">
                <span className="font-bold text-black">Embodied AI expertise:</span> Deep understanding of physical-digital interaction, robotics integration, and real-world deployment challenges.
              </p>
              <p className="text-sm leading-relaxed">
                <span className="font-bold text-black">Scale + quality:</span> Ability to build research platforms handling 100,000+ tasks while maintaining rigorous evaluation standards.
              </p>
            </div>
          </OS8Window>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-4 sm:px-6 lg:px-4 sm:px-6 md:px-8">
        <div className="max-w-5xl mx-auto flex justify-center">
          <OS8Window
            title="Building Embodied AI?"
            variant="yellow"
            animateIn={false}
            className="max-w-lg"
          >
            <div className="space-y-6">
              <p className="text-base text-gray-700 leading-relaxed">
                Whether you're building robotics platforms, embodied AI systems, or human-AI collaboration tools—Rationale brings Meta-scale research experience to your product.
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
