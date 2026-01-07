'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ASCIIUnifiedGrid } from '@/components/visual';
import { watercolorThemes } from '@/lib/theme/watercolor-palette';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { aboutContent } from '@/lib/content';
import { mentalModels } from '@/lib/content/philosophy';
import { founderProfile } from '@/lib/content/founder';

function MentalModelsSection() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section className="relative py-8 md:py-12 px-4 sm:px-6 md:px-8 border-b border-gray-800">
      <div className="relative z-10 max-w-5xl mx-auto">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-2 h-2 rounded-full bg-terminal-gold" />
          <h2 className="text-xl md:text-2xl font-bold text-white">Mental Models</h2>
        </div>
        <p className="text-gray-400 mb-6 text-sm">
          Four mental models that guide our work and help clients build conviction.
        </p>

        <div className="grid md:grid-cols-2 gap-4">
          {mentalModels.map((model, index) => {
            const isExpanded = expandedIndex === index;
            return (
              <div key={index} className="bg-gray-900/50 border border-gray-700 rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleExpand(index)}
                  className="w-full p-5 md:p-6 flex items-center justify-between text-left hover:bg-gray-800/30 transition-colors"
                >
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1">{model.name}</h3>
                    <p className="text-terminal-gold text-sm font-medium">{model.tagline}</p>
                  </div>
                  <ChevronDown 
                    className={`w-5 h-5 text-gray-400 transition-transform duration-200 flex-shrink-0 ml-4 ${
                      isExpanded ? 'rotate-180' : ''
                    }`} 
                  />
                </button>
                
                {isExpanded && (
                  <div className="px-5 md:px-6 pb-5 md:pb-6 pt-0">
                    <p className="text-gray-300 text-sm leading-relaxed mb-4">
                      {model.description}
                    </p>

                    <div className="bg-gray-800/50 border border-gray-700 p-4 rounded-lg mb-4">
                      <p className="text-xs font-mono text-gray-400 uppercase tracking-wide mb-2">Analogy</p>
                      <p className="text-sm text-gray-300">{model.analogy.setup}</p>
                    </div>

                    <div>
                      <p className="text-xs font-mono text-gray-400 uppercase tracking-wide mb-2">In Practice</p>
                      <ul className="space-y-1">
                        {model.application.slice(0, 2).map((app, idx) => (
                          <li key={idx} className="flex gap-2 text-sm">
                            <span className="text-terminal-gold flex-shrink-0">→</span>
                            <span className="text-gray-300">{app}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-6">
          <Link 
            href="/thinking" 
            className="text-terminal-gold hover:text-terminal-gold-hover font-medium text-sm flex items-center gap-2 transition-colors"
          >
            Explore more thinking
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function AboutPage() {
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

      {/* Hero Section */}
      <section className="relative py-8 md:py-12 px-4 sm:px-6 md:px-8 border-b border-gray-800">
        <div className="absolute inset-0 pointer-events-none">
          <ASCIIUnifiedGrid
            opacity={0.08}
            animated={true}
            colorTheme={watercolorThemes.terminalGold}
            charSet="default"
          />
        </div>
        <div className="relative z-10 max-w-5xl mx-auto">
          <p className="text-xs font-mono text-terminal-gold tracking-widest mb-3">
            CONVICTION-FIRST EXECUTION
          </p>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            About Rationale
          </h1>

          <p className="text-base md:text-lg text-gray-300 leading-relaxed max-w-3xl mb-4">
            AI has made execution cheap and fast. But speed without direction accelerates waste. The bottleneck has shifted from execution to conviction—knowing what to build is harder than ever. We help teams build that conviction before committing resources.
          </p>

          <Link
            href="/overview"
            className="text-terminal-gold hover:text-terminal-gold-hover text-sm font-medium flex items-center gap-2 transition-colors"
          >
            Studio Overview
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Origin Story - Featured Quote Callout */}
      <section className="relative py-8 md:py-12 px-4 sm:px-6 md:px-8 border-b border-gray-800">
        <div className="relative z-10 max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-2 h-2 rounded-full bg-terminal-gold" />
            <h2 className="text-xl md:text-2xl font-bold text-white">The Whiteboard Moment</h2>
          </div>

          <div className="border-l-4 border-terminal-gold pl-6 py-4 bg-gray-900/30 rounded-r-lg mb-6">
            <blockquote className="text-lg md:text-xl text-white italic mb-3">
              "Get the work so close to shipping that all you need is engineering resources to make it real. Anything to the left of that mark doesn't get you much value."
            </blockquote>
            <p className="text-gray-400 text-sm">
              — Advice from a Meta Reality Labs leader that became Rationale's founding principle
            </p>
          </div>

          <p className="text-gray-300 leading-relaxed mb-4">
            At Meta, right after the Oculus acquisition, a designer wanted to create a vision video for the AR platform. A senior leader stopped them and drew something on a whiteboard: a lightbulb on the left, a ship on the right, connected by a line. That conversation changed everything—it's why Rationale exists.
          </p>

          <Link 
            href="/thinking/methodology-origins" 
            className="text-terminal-gold hover:text-terminal-gold-hover font-medium text-sm flex items-center gap-2 transition-colors"
          >
            Read the full origin story
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Core Principles */}
      <section className="relative py-8 md:py-12 px-4 sm:px-6 md:px-8 border-b border-gray-800">
        <div className="relative z-10 max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-2 h-2 rounded-full bg-terminal-gold" />
            <h2 className="text-xl md:text-2xl font-bold text-white">Core Principles</h2>
          </div>
          
          <div className="space-y-4">
            {aboutContent.principles.items.map((principle, index) => (
              <div key={index} className="p-5 md:p-6 bg-gray-900/50 border border-gray-700 rounded-lg hover:border-gray-600 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-terminal-gold text-black flex items-center justify-center font-bold text-lg flex-shrink-0">
                    {principle.number}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg md:text-xl font-bold text-white mb-2">
                      {principle.title}
                    </h3>
                    <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                      {principle.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mental Models */}
      <MentalModelsSection />

      {/* What We Learned at Scale */}
      <section className="relative py-8 md:py-12 px-4 sm:px-6 md:px-8 border-b border-gray-800">
        <div className="relative z-10 max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-2 h-2 rounded-full bg-terminal-gold" />
            <h2 className="text-xl md:text-2xl font-bold text-white">What We Learned at 2B+ User Scale</h2>
          </div>
          <p className="text-gray-400 mb-6 text-sm">
            Production necessity at scale. Not theory. Not academic research.
          </p>

          <div className="space-y-4 md:space-y-6">
            {/* Card 1: Specs Failed */}
            <div className="p-5 md:p-6 bg-gray-900/50 border border-gray-700 rounded-lg">
              <h3 className="text-lg font-bold text-white mb-2">Specs Failed in Predictable Ways</h3>
              <p className="text-sm text-gray-300 leading-relaxed mb-4">
                Detailed specs described interactions clearly. But they couldn't predict how users would actually behave. AR interactions are physical—they require body movement, spatial awareness, gesture memory.
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-gray-800/50 border border-gray-700 p-4 rounded-lg">
                  <p className="text-xs font-mono text-terminal-gold uppercase tracking-wide mb-2">Proof at Scale</p>
                  <p className="text-sm text-gray-300">
                    At <span className="text-white font-medium">Meta Spark AR</span>, prototyping led to <span className="text-[#00FF94] font-medium">60% velocity increase</span>.
                  </p>
                </div>
                <div className="bg-gray-800/50 border border-gray-700 p-4 rounded-lg">
                  <p className="text-xs font-mono text-terminal-gold uppercase tracking-wide mb-2">Why This Matters</p>
                  <p className="text-sm text-gray-300">
                    We prototype before committing to production. Working software reveals truth that documents can't.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 2: Prototypes Revealed Truth */}
            <div className="p-5 md:p-6 bg-gray-900/50 border border-gray-700 rounded-lg">
              <h3 className="text-lg font-bold text-white mb-2">Prototypes Revealed Truth</h3>
              <p className="text-sm text-gray-300 leading-relaxed mb-4">
                Put a prototype in someone's hands and their behavior tells you everything. They reach for the wrong gesture. They expect feedback at different timing. All discoverable in hours, not months.
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-gray-800/50 border border-gray-700 p-4 rounded-lg">
                  <p className="text-xs font-mono text-terminal-gold uppercase tracking-wide mb-2">Proof at Scale</p>
                  <p className="text-sm text-gray-300">
                    Led UX for <span className="text-white font-medium">Meta's Orion AR Glasses day 1 launch slate</span>. Working prototypes resulted in <span className="text-[#00FF94] font-medium">15+ patents</span>.
                  </p>
                </div>
                <div className="bg-gray-800/50 border border-gray-700 p-4 rounded-lg">
                  <p className="text-xs font-mono text-terminal-gold uppercase tracking-wide mb-2">Why This Matters</p>
                  <p className="text-sm text-gray-300">
                    We validate with working software. When you know what you're building, engineering becomes execution.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 3: Scale Amplified Mistakes */}
            <div className="p-5 md:p-6 bg-gray-900/50 border border-gray-700 rounded-lg">
              <h3 className="text-lg font-bold text-white mb-2">Scale Amplified Mistakes</h3>
              <p className="text-sm text-gray-300 leading-relaxed mb-4">
                When you ship to billions, small UX issues become massive problems. 0.1% of users is still millions of people. The cost of mistakes was measured in millions.
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-gray-800/50 border border-gray-700 p-4 rounded-lg">
                  <p className="text-xs font-mono text-terminal-gold uppercase tracking-wide mb-2">Proof at Scale</p>
                  <p className="text-sm text-gray-300">
                    Managed a <span className="text-white font-medium">400+ person organization</span> serving 2B+ users. Validation became essential, not optional.
                  </p>
                </div>
                <div className="bg-gray-800/50 border border-gray-700 p-4 rounded-lg">
                  <p className="text-xs font-mono text-terminal-gold uppercase tracking-wide mb-2">Why This Matters</p>
                  <p className="text-sm text-gray-300">
                    Startups face higher stakes: limited runway. Validate early. Pivot cheap. Ship with conviction.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Synthesis */}
          <div className="mt-6 p-5 md:p-6 bg-gray-900/50 border border-terminal-gold/30 rounded-lg">
            <h3 className="text-base font-bold text-white mb-3">Every Engagement Applies Patterns Proven at Scale</h3>
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="flex items-start gap-2">
                <span className="text-terminal-gold flex-shrink-0">→</span>
                <p className="text-sm text-gray-300">Rapid prototyping before production commitment</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-terminal-gold flex-shrink-0">→</span>
                <p className="text-sm text-gray-300">Systematic testing with real users</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-terminal-gold flex-shrink-0">→</span>
                <p className="text-sm text-gray-300">Clear pass/fail criteria for each prototype</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-terminal-gold flex-shrink-0">→</span>
                <p className="text-sm text-gray-300">Pivot-friendly development</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Founder */}
      <section className="relative py-8 md:py-12 px-4 sm:px-6 md:px-8 border-b border-gray-800">
        <div className="relative z-10 max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-2 h-2 rounded-full bg-terminal-gold" />
            <h2 className="text-xl md:text-2xl font-bold text-white">Meet the Founder</h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Left: Bio */}
            <div className="lg:col-span-2">
              <h3 className="text-2xl font-bold text-white mb-1">{founderProfile.name}</h3>
              <p className="text-terminal-gold font-medium mb-4">{founderProfile.tagline}</p>
              <p className="text-gray-300 leading-relaxed mb-6">
                {founderProfile.bio}
              </p>

              {/* Timeline Image */}
              <div className="mb-6">
                <Image
                  src="/images/work/hanson/background-timeline.png"
                  alt="Career timeline from 2000-2024"
                  width={1200}
                  height={400}
                  className="w-full rounded-lg border border-gray-700"
                  style={{ width: '100%', height: 'auto' }}
                  loading="lazy"
                  placeholder="blur"
                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mM8c+Z8PQAHZAL+4SiGjgAAAABJRU5ErkJggg=="
                />
              </div>

              <Link href="/thinking/methodology-origins" className="text-terminal-gold hover:text-terminal-gold-hover font-medium text-sm">
                Read the methodology origins →
              </Link>
            </div>

            {/* Right: Track Record & Capabilities */}
            <div className="space-y-6">
              <div className="p-5 bg-gray-900/50 border border-gray-700 rounded-lg">
                <h4 className="text-xs font-mono text-terminal-gold uppercase tracking-wide mb-3">
                  Track Record
                </h4>
                <ul className="space-y-2">
                  {founderProfile.trackRecord.slice(0, 4).map((item, index) => (
                    <li key={index} className="flex gap-2 text-sm">
                      <span className="text-terminal-gold flex-shrink-0">•</span>
                      <span className="text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-5 bg-gray-900/50 border border-gray-700 rounded-lg">
                <h4 className="text-xs font-mono text-terminal-gold uppercase tracking-wide mb-3">
                  Capabilities
                </h4>
                <ul className="space-y-2">
                  {founderProfile.capabilities.slice(0, 4).map((capability, index) => (
                    <li key={index} className="flex gap-2 text-sm">
                      <span className="text-terminal-gold flex-shrink-0">•</span>
                      <span className="text-gray-300">{capability}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-12 md:py-16 px-4 sm:px-6 md:px-8">
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to build with conviction?</h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            We bring the same systematic approach to every engagement—whether it's a 3-week sprint or 12-week pilot.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="px-6 py-3 md:px-8 md:py-4 text-sm md:text-base bg-terminal-gold hover:bg-[#FFE34D] text-black font-semibold rounded-lg transition-all shadow-[0_0_17px_rgba(255,215,0,0.17)] hover:shadow-[0_0_25px_rgba(255,215,0,0.25)]"
            >
              Book intro call
            </Link>
            <Link
              href="/partnerships"
              className="px-6 py-3 md:px-8 md:py-4 text-sm md:text-base border border-gray-600 hover:border-terminal-gold text-white font-semibold rounded-lg transition-colors"
            >
              View partnerships
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
