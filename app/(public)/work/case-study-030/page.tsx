/**
 * Case Study 030: Live Sports Streaming Platform AI Thumbnail System
 *
 * Password-protected case study for FUBO AI thumbnail generator
 * Password: 123456
 * Robots: noindex
 */

'use client';

import { PasswordGate } from '@/components/sections/PasswordGate';
import { ASCIIUnifiedGrid } from '@/components/visual';
import { watercolorThemes } from '@/lib/theme/watercolor-palette';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function CaseStudy030Page() {
  return (
    <PasswordGate
      password="123456"
      storageKey="case-study-030-access"
      title="Case Study 030"
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
                  Case Study 030
                </h1>
                <p className="text-xl text-gray-300 mb-4">
                  AI Thumbnail Generation for Live Sports
                </p>
                <Link
                  href="/clients/work/fubo"
                  className="inline-flex items-center gap-2 text-sm text-terminal-gold hover:underline"
                >
                  View Prototype →
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
                  AI-powered thumbnail generation system for live sports streaming platform. Built with Google Gemini 2.5 Flash, the system generates brand-consistent thumbnails across 200+ teams and 8 major leagues with 24 visual styles and real-time processing.
                </p>

                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-gray-400 mb-1">Client Type</div>
                    <div className="text-white font-medium">Live Sports Streaming Platform</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400 mb-1">Industry</div>
                    <div className="text-white font-medium">Media & Entertainment</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400 mb-1">Timeline</div>
                    <div className="text-white font-medium">2-week strategic sprint</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400 mb-1">Team</div>
                    <div className="text-white font-medium">Full-stack + AI (1 engineer)</div>
                  </div>
                </div>
              </div>

              {/* Right: Key Metrics */}
              <div>
                <h2 className="text-2xl font-bold mb-6">Key Outcomes</h2>
                <div className="space-y-4">
                  <div className="p-4 bg-gray-900/50 border border-gray-700 rounded-lg">
                    <div className="text-3xl font-bold text-terminal-gold mb-1">2 weeks</div>
                    <div className="text-sm text-gray-400">Concept → working prototype</div>
                  </div>
                  <div className="p-4 bg-gray-900/50 border border-gray-700 rounded-lg">
                    <div className="text-3xl font-bold text-terminal-gold mb-1">200+ teams</div>
                    <div className="text-sm text-gray-400">Across 8 major leagues</div>
                  </div>
                  <div className="p-4 bg-gray-900/50 border border-gray-700 rounded-lg">
                    <div className="text-3xl font-bold text-terminal-gold mb-1">3-5 seconds</div>
                    <div className="text-sm text-gray-400">Generation time per image</div>
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
                Sports streaming platforms need massive amounts of stylized thumbnail content across hundreds of teams and events. Creating thumbnails manually doesn't scale—design bottlenecks limit content velocity, brand consistency suffers, and costs spiral with volume. FUBO needed a system to generate on-brand thumbnails for 200+ teams across 8 major leagues without manual design intervention.
              </p>

              <div className="bg-gray-900/50 border-l-4 border-terminal-gold p-6 my-8">
                <p className="text-white font-medium mb-2">Jobs to Be Done</p>
                <p className="text-gray-300 italic">
                  "When we need thumbnails for hundreds of sports events, we want to generate brand-consistent, stylized content at scale, so we can maintain content velocity without design bottlenecks or sacrificing quality."
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* The Solution */}
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
            <h2 className="text-3xl font-bold mb-8">The Solution</h2>

            <div className="grid md:grid-cols-2 gap-4 md:gap-6 lg:gap-8 mb-12">
              <div className="p-6 bg-gray-900/50 border border-gray-700 rounded-lg">
                <h3 className="text-xl font-bold text-terminal-gold mb-3">
                  Core Platform Features
                </h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex gap-3">
                    <span className="text-terminal-gold mt-1">→</span>
                    <span>Two-step generation: base image + style application</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-terminal-gold mt-1">→</span>
                    <span>24 visual styles with style blending (up to 3 styles)</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-terminal-gold mt-1">→</span>
                    <span>200+ teams across NFL, NBA, NHL, MLS, EPL, La Liga, Bundesliga, F1</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-terminal-gold mt-1">→</span>
                    <span>Bulk processing workflows with quality assurance scoring</span>
                  </li>
                </ul>
              </div>

              <div className="p-6 bg-gray-900/50 border border-gray-700 rounded-lg">
                <h3 className="text-xl font-bold text-terminal-gold mb-3">
                  Technical Architecture
                </h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex gap-3">
                    <span className="text-terminal-gold mt-1">→</span>
                    <span>Google Gemini 2.5 Flash for AI generation</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-terminal-gold mt-1">→</span>
                    <span>Python Flask backend with rembg (U2-Net)</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-terminal-gold mt-1">→</span>
                    <span>Browser-based UI with real-time preview</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-terminal-gold mt-1">→</span>
                    <span>Compositing engine for overlay/underlay graphics</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4">Core Principles</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <div className="font-semibold text-white mb-1">Subject Preservation</div>
                  <div className="text-sm text-gray-400">Maintain team colors and identity through style transformations</div>
                </div>
                <div>
                  <div className="font-semibold text-white mb-1">Sport-Aware Context</div>
                  <div className="text-sm text-gray-400">League and team-specific prompting for accurate results</div>
                </div>
                <div>
                  <div className="font-semibold text-white mb-1">Scalable Architecture</div>
                  <div className="text-sm text-gray-400">Process entire league rosters in single batch operations</div>
                </div>
                <div>
                  <div className="font-semibold text-white mb-1">Quality Assurance</div>
                  <div className="text-sm text-gray-400">Automated scoring and filtering for production-ready output</div>
                </div>
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
                { category: 'AI/ML', items: ['Google Gemini 2.5 Flash', 'Image Generation', 'Style Transfer', 'Prompt Engineering'] },
                { category: 'Backend', items: ['Python 3.11+', 'Flask', 'rembg (U2-Net)', 'PIL/Pillow'] },
                { category: 'Frontend', items: ['HTML/CSS/JS', 'Tailwind CSS', 'Feather Icons', 'Real-time UI'] },
                { category: 'Processing', items: ['Background Removal', 'Alpha Compositing', 'Image Overlays', 'Bulk Export'] },
                { category: 'Data', items: ['Team Database', 'Style Library', 'Quality Scoring', 'Metadata Management'] },
                { category: 'Leagues', items: ['NFL, NBA, NHL', 'MLS, EPL, La Liga', 'Bundesliga, F1', '200+ teams'] }
              ].map((stack, idx) => (
                <div key={idx} className="p-4 bg-gray-900/50 border border-gray-700 rounded-lg">
                  <div className="font-bold text-terminal-gold mb-2">{stack.category}</div>
                  <ul className="space-y-1 text-sm text-gray-300">
                    {stack.items.map((item, i) => (
                      <li key={i}>• {item}</li>
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

            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-6 bg-gray-900/50 border border-gray-700 rounded-lg text-center">
                <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-terminal-gold mb-2">100%</div>
                <div className="text-sm text-gray-400">On-time delivery</div>
              </div>
              <div className="p-6 bg-gray-900/50 border border-gray-700 rounded-lg text-center">
                <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-terminal-gold mb-2">24 styles</div>
                <div className="text-sm text-gray-400">Visual style catalog</div>
              </div>
              <div className="p-6 bg-gray-900/50 border border-gray-700 rounded-lg text-center">
                <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-terminal-gold mb-2">AI-powered</div>
                <div className="text-sm text-gray-400">Google Gemini 2.5 Flash</div>
              </div>
            </div>

            <div className="mt-12 p-6 bg-gradient-to-r from-gray-900 to-gray-800 border border-gray-700 rounded-lg">
              <h3 className="text-xl font-bold mb-4">What We Delivered</h3>
              <ul className="space-y-2 text-gray-300">
                <li className="flex gap-3">
                  <span className="text-terminal-gold">→</span>
                  <span>Working prototype with browser-based UI and Python backend</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-terminal-gold">→</span>
                  <span>24 visual styles with weighted blending system (up to 3 styles combined)</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-terminal-gold">→</span>
                  <span>200+ team database across 8 major sports leagues</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-terminal-gold">→</span>
                  <span>Two-step generation process with subject preservation prompting</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-terminal-gold">→</span>
                  <span>Bulk processing workflows with quality assurance and organized export</span>
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
            <h2 className="text-2xl font-bold mb-4">Need AI-powered content generation?</h2>
            <p className="text-gray-300 mb-8">
              We specialize in custom AI systems for media production and content automation.
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
