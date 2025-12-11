/**
 * Case Study 020: Multi-Module Platform for Athlete Agency
 *
 * Password-protected case study for complex multi-module system
 * Password: 123456
 * Robots: noindex
 */

'use client';

import { PasswordGate } from '@/components/sections/PasswordGate';
import { ASCIIUnifiedGrid } from '@/components/visual';
import { watercolorThemes } from '@/lib/theme/watercolor-palette';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function CaseStudy020Page() {
  return (
    <PasswordGate
      password="123456"
      storageKey="case-study-020-access"
      title="Case Study 020"
      description="This case study is password protected. Hint: Six ones, but actually sixes."
    >
      <main className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white">
        {/* Header */}
        <section className="relative py-12 px-4 sm:px-6 lg:px-4 sm:px-6 md:px-8 border-b border-gray-800">
          <div className="absolute inset-0 pointer-events-none">
            <ASCIIUnifiedGrid
              opacity={0.04}
              animated={true}
              colorTheme={watercolorThemes.terminalSubtle}
              charSet="default"
            />
          </div>

          <div className="relative z-10 max-w-5xl mx-auto">
            <Link
              href="/work"
              className="inline-flex items-center gap-2 text-sm text-terminal-gold hover:underline mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Work
            </Link>

            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border bg-accent/20 text-accent border-accent/30 mb-4">
                  Delivered
                </span>
                <h1 className="text-2xl md:text-3xl lg:text-4xl sm:text-5xl font-bold mb-4">
                  Case Study 020
                </h1>
                <p className="text-xl text-gray-300 mb-4">
                  Sports & Entertainment Modernization
                </p>
                <Link
                  href="/clients/athletes-first/pitch-deck"
                  className="inline-flex items-center gap-2 text-sm text-terminal-gold hover:underline"
                >
                  View Presentation Deck →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Overview */}
        <section className="relative py-16 px-4 sm:px-6 lg:px-4 sm:px-6 md:px-8 border-b border-gray-800">
          <div className="absolute inset-0 pointer-events-none">
            <ASCIIUnifiedGrid
              opacity={0.04}
              animated={true}
              colorTheme={watercolorThemes.terminalSubtle}
              charSet="default"
            />
          </div>

          <div className="relative z-10 max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Left: Project Info */}
              <div>
                <h2 className="text-2xl font-bold mb-6">Project Overview</h2>
                <p className="text-gray-300 leading-relaxed mb-6">
                  Four interconnected modules designed to scale a sports agency's operations through AI-powered tools: NIL Guidance Platform, Interactive Pitch System, Video & Digital Twins, and AmplifyAI for content generation.
                </p>

                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-gray-400 mb-1">Client Type</div>
                    <div className="text-white font-medium">Sports Technology Platform</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400 mb-1">Industry</div>
                    <div className="text-white font-medium">Sports Tech / Agency Services</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400 mb-1">Timeline</div>
                    <div className="text-white font-medium">4 modules × 40 days each</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400 mb-1">Scope</div>
                    <div className="text-white font-medium">Pilot phase prototypes</div>
                  </div>
                </div>
              </div>

              {/* Right: Key Metrics */}
              <div>
                <h2 className="text-2xl font-bold mb-6">Key Outcomes</h2>
                <div className="space-y-4">
                  <div className="p-4 bg-gray-900/50 border border-gray-700 rounded-lg">
                    <div className="text-3xl font-bold text-terminal-gold mb-1">4 modules</div>
                    <div className="text-sm text-gray-400">Interconnected system design</div>
                  </div>
                  <div className="p-4 bg-gray-900/50 border border-gray-700 rounded-lg">
                    <div className="text-3xl font-bold text-terminal-gold mb-1">40 days</div>
                    <div className="text-sm text-gray-400">Per module pilot delivery</div>
                  </div>
                  <div className="p-4 bg-gray-900/50 border border-gray-700 rounded-lg">
                    <div className="text-3xl font-bold text-terminal-gold mb-1">Vision Pro</div>
                    <div className="text-sm text-gray-400">Spatial computing integration</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* The Challenge */}
        <section className="relative py-16 px-4 sm:px-6 lg:px-4 sm:px-6 md:px-8 border-b border-gray-800">
          <div className="absolute inset-0 pointer-events-none">
            <ASCIIUnifiedGrid
              opacity={0.04}
              animated={true}
              colorTheme={watercolorThemes.terminalSubtle}
              charSet="default"
            />
          </div>

          <div className="relative z-10 max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">The Challenge</h2>

            <div className="prose prose-invert max-w-none">
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                Sports agencies face three critical bottlenecks: limited bandwidth for personalized athlete guidance, manual deal evaluation that misses opportunities, and content creation that can't scale. With 800+ certified NFL agents competing for ~250 draft picks annually, systematic advantages are essential.
              </p>

              <div className="bg-gray-900/50 border-l-4 border-terminal-gold p-6 my-8">
                <p className="text-white font-medium mb-2">Core Problem</p>
                <p className="text-gray-300 italic">
                  "How do we scale high-touch, personalized service to hundreds of athletes without sacrificing quality or burning out our team?"
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-4 mt-8">
                <div className="p-4 bg-gray-900/50 border border-gray-700 rounded-lg">
                  <h3 className="text-sm font-bold text-white mb-2">Bandwidth Ceiling</h3>
                  <p className="text-xs text-gray-400">Manual work doesn't scale—agencies hit growth limits when personalization breaks down</p>
                </div>
                <div className="p-4 bg-gray-900/50 border border-gray-700 rounded-lg">
                  <h3 className="text-sm font-bold text-white mb-2">NIL Complexity</h3>
                  <p className="text-xs text-gray-400">College athletes need guidance through fragmented NIL landscape with conflicting incentives</p>
                </div>
                <div className="p-4 bg-gray-900/50 border border-gray-700 rounded-lg">
                  <h3 className="text-sm font-bold text-white mb-2">Content Bottleneck</h3>
                  <p className="text-xs text-gray-400">Traditional production can't keep pace with demand for personalized athlete content</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* The Solution: Four Modules */}
        <section className="relative py-16 px-4 sm:px-6 lg:px-4 sm:px-6 md:px-8 border-b border-gray-800">
          <div className="absolute inset-0 pointer-events-none">
            <ASCIIUnifiedGrid
              opacity={0.04}
              animated={true}
              colorTheme={watercolorThemes.terminalSubtle}
              charSet="default"
            />
          </div>

          <div className="relative z-10 max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">The Solution: Four Integrated Modules</h2>

            <div className="space-y-6">
              {/* Module 1: NIL Platform */}
              <div className="p-6 bg-gray-900/50 border-l-4 border-[#FF6B00] rounded-lg">
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#FF6B00]/20 border border-[#FF6B00]/30 flex items-center justify-center text-[#FF6B00] font-bold">
                    01
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">NIL Guidance Platform</h3>
                    <p className="text-sm text-gray-400">Trust-building educational hub for college athletes</p>
                  </div>
                </div>
                <ul className="space-y-2 text-sm text-gray-300 ml-14">
                  <li className="flex gap-3">
                    <span className="text-[#FF6B00]">→</span>
                    <span>Interactive tutorials breaking down NIL complexity</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[#FF6B00]">→</span>
                    <span>Scenario-based learning (brand deals, social media, compliance)</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[#FF6B00]">→</span>
                    <span>Progress tracking and personalized recommendations</span>
                  </li>
                </ul>
              </div>

              {/* Module 2: Interactive Pitch */}
              <div className="p-6 bg-gray-900/50 border-l-4 border-[#9D4EDD] rounded-lg">
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#9D4EDD]/20 border border-[#9D4EDD]/30 flex items-center justify-center text-[#9D4EDD] font-bold">
                    02
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Interactive Pitch System</h3>
                    <p className="text-sm text-gray-400">AI-powered deal evaluation and immersive brand presentations</p>
                  </div>
                </div>
                <ul className="space-y-2 text-sm text-gray-300 ml-14">
                  <li className="flex gap-3">
                    <span className="text-[#9D4EDD]">→</span>
                    <span>Contract modeling canvas for deal structure exploration</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[#9D4EDD]">→</span>
                    <span>Vision Pro spatial computing for immersive brand experiences</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[#9D4EDD]">→</span>
                    <span>Real-time deal comparison and scenario modeling</span>
                  </li>
                </ul>
              </div>

              {/* Module 3: Video & Digital Twins */}
              <div className="p-6 bg-gray-900/50 border-l-4 border-[#00FF94] rounded-lg">
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#00FF94]/20 border border-[#00FF94]/30 flex items-center justify-center text-[#00FF94] font-bold">
                    03
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Video & Digital Twins</h3>
                    <p className="text-sm text-gray-400">Scalable content production with digital athlete replicas</p>
                  </div>
                </div>
                <ul className="space-y-2 text-sm text-gray-300 ml-14">
                  <li className="flex gap-3">
                    <span className="text-[#00FF94]">→</span>
                    <span>Digital twin creation for brand campaign deployment</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[#00FF94]">→</span>
                    <span>Roster-level campaign generation (50+ athletes simultaneously)</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[#00FF94]">→</span>
                    <span>Athlete-controlled deployment with approval workflows</span>
                  </li>
                </ul>
              </div>

              {/* Module 4: AmplifyAI */}
              <div className="p-6 bg-gray-900/50 border-l-4 border-[#FF3366] rounded-lg">
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#FF3366]/20 border border-[#FF3366]/30 flex items-center justify-center text-[#FF3366] font-bold">
                    04
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">AmplifyAI</h3>
                    <p className="text-sm text-gray-400">Agent toolkit for automated content and outreach</p>
                  </div>
                </div>
                <ul className="space-y-2 text-sm text-gray-300 ml-14">
                  <li className="flex gap-3">
                    <span className="text-[#FF3366]">→</span>
                    <span>Automated recruitment analysis and target identification</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[#FF3366]">→</span>
                    <span>AI-powered social media content generation</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[#FF3366]">→</span>
                    <span>Personalized outreach at scale with quality control</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Technology Stack */}
        <section className="relative py-16 px-4 sm:px-6 lg:px-4 sm:px-6 md:px-8 border-b border-gray-800">
          <div className="absolute inset-0 pointer-events-none">
            <ASCIIUnifiedGrid
              opacity={0.04}
              animated={true}
              colorTheme={watercolorThemes.terminalSubtle}
              charSet="default"
            />
          </div>

          <div className="relative z-10 max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">Technology Stack</h2>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { category: 'Frontend', items: ['Next.js 15', 'React 19', 'TypeScript', 'Tailwind CSS'] },
                { category: 'Spatial', items: ['Vision Pro', 'visionOS', '3D Models', 'Spatial Audio'] },
                { category: 'AI/ML', items: ['GPT-4', 'Claude', 'Video Generation', 'Digital Twins'] },
                { category: 'Backend', items: ['Node.js', 'Python', 'PostgreSQL', 'Redis'] },
                { category: 'Video', items: ['FFmpeg', 'WebRTC', 'HLS Streaming', 'Video Synthesis'] },
                { category: 'Infrastructure', items: ['AWS', 'Docker', 'CI/CD', 'Monitoring'] }
              ].map((stack, idx) => (
                <div key={idx} className="p-4 bg-gray-900/50 border border-gray-700 rounded-lg">
                  <div className="font-bold text-terminal-gold mb-2">{stack.category}</div>
                  <ul className="space-y-1 text-sm text-gray-300">
                    {stack.items.map((item, i) => (
                      <li key={i} className="flex gap-2">
                        <span className="text-terminal-gold">→</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Results & Impact */}
        <section className="relative py-16 px-4 sm:px-6 lg:px-4 sm:px-6 md:px-8 border-b border-gray-800">
          <div className="absolute inset-0 pointer-events-none">
            <ASCIIUnifiedGrid
              opacity={0.04}
              animated={true}
              colorTheme={watercolorThemes.terminalSubtle}
              charSet="default"
            />
          </div>

          <div className="relative z-10 max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">Results & Impact</h2>

            <div className="grid md:grid-cols-4 gap-6 mb-12">
              <div className="p-6 bg-gray-900/50 border border-gray-700 rounded-lg text-center">
                <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-terminal-gold mb-2">4</div>
                <div className="text-sm text-gray-400">Pilot modules delivered</div>
              </div>
              <div className="p-6 bg-gray-900/50 border border-gray-700 rounded-lg text-center">
                <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-terminal-gold mb-2">40 days</div>
                <div className="text-sm text-gray-400">Per module timeline</div>
              </div>
              <div className="p-6 bg-gray-900/50 border border-gray-700 rounded-lg text-center">
                <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-terminal-gold mb-2">100%</div>
                <div className="text-sm text-gray-400">On-time delivery</div>
              </div>
              <div className="p-6 bg-gray-900/50 border border-gray-700 rounded-lg text-center">
                <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-terminal-gold mb-2">Vision Pro</div>
                <div className="text-sm text-gray-400">Spatial computing</div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-gray-900 to-gray-800 border border-gray-700 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4">What We Delivered</h3>
              <ul className="space-y-2 text-gray-300">
                <li className="flex gap-3">
                  <span className="text-terminal-gold">→</span>
                  <span>Four interconnected pilot modules with working prototypes</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-terminal-gold">→</span>
                  <span>Vision Pro spatial computing integration for immersive brand pitches</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-terminal-gold">→</span>
                  <span>Digital twin video generation system for scalable content</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-terminal-gold">→</span>
                  <span>AI-powered agent toolkit for recruitment and content automation</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-terminal-gold">→</span>
                  <span>Comprehensive technical documentation and system architecture</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="relative py-16 px-4 sm:px-6 lg:px-4 sm:px-6 md:px-8">
          <div className="absolute inset-0 pointer-events-none">
            <ASCIIUnifiedGrid
              opacity={0.04}
              animated={true}
              colorTheme={watercolorThemes.terminalSubtle}
              charSet="default"
            />
          </div>

          <div className="relative z-10 max-w-5xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">Building complex multi-module systems?</h2>
            <p className="text-gray-300 mb-8">
              We specialize in interconnected platforms with AI-powered automation and spatial computing.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="px-4 sm:px-6 md:px-8 py-4 bg-terminal-gold hover:bg-[#FFE34D] text-black font-semibold transition-all shadow-[0_0_17px_rgba(255,215,0,0.17)] hover:shadow-[0_0_25px_rgba(255,215,0,0.25)]"
              >
                Book intro call
              </Link>
              <Link
                href="/work"
                className="px-4 sm:px-6 md:px-8 py-4 border border-gray-300 hover:border-terminal-gold text-white font-semibold transition-colors"
              >
                View more work
              </Link>
            </div>
          </div>
        </section>
      </main>
    </PasswordGate>
  );
}
