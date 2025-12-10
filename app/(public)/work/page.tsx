/**
 * Work Portfolio Index
 *
 * Reorganized: Our products first, then partnerships
 * Clear separation between ventures we own vs. client work
 * Simple card aesthetic matching home page style
 */

'use client';

import Link from 'next/link';
import { ASCIIUnifiedGrid } from '@/components/visual';
import { watercolorThemes } from '@/lib/theme/watercolor-palette';
import { getAllProjects, getProjectBySlug } from '@/lib/content/work-projects';
import { Lock, ArrowRight } from 'lucide-react';
import { ButtonPrimary, ButtonSecondary } from '@/components/ui/ButtonHierarchy';
import { ProjectStatusBadge } from '@/components/ui/Badge';

export default function WorkPage() {
  const projects = getAllProjects();
  const zero = getProjectBySlug('zero');
  const heirloom = getProjectBySlug('heirloom');

  // Separate our products from partnerships
  const ourProducts = projects.filter(p => p.category === 'consumer' && !p.isProtected);
  const partnerships = projects.filter(p => p.category !== 'consumer' || p.isProtected);

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white">
      {/* Header */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-800">
        <div className="absolute inset-0 pointer-events-none">
          <ASCIIUnifiedGrid
            opacity={0.08}
            animated={true}
            colorTheme={watercolorThemes.terminalGold}
            charSet="default"
          />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            Our Work
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
            Products we ship, systems we build, problems we solve. Everything here demonstrates our methodology under real market pressure.
          </p>
        </div>
      </section>

      {/* Featured Projects Hero - Zero & Heirloom */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-800">
        <div className="absolute inset-0 pointer-events-none">
          <ASCIIUnifiedGrid
            opacity={0.04}
            animated={true}
            colorTheme={watercolorThemes.terminalSubtle}
            charSet="default"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-2 h-2 rounded-full bg-terminal-gold" />
            <h2 className="text-3xl font-bold text-white">Featured Projects</h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Zero Inbox - Featured Hero */}
            {zero && (
              <Link href={`/work/${zero.slug}`} className="group block">
                <div className="h-full p-6 sm:p-8 bg-gray-900/70 border border-terminal-gold/30 rounded-lg hover:border-terminal-gold/50 transition-all duration-300">
                  <div className="space-y-6">
                    {/* Title */}
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-terminal-gold transition-colors">
                        {zero.title}
                      </h3>
                      <p className="text-sm text-gray-400">{zero.subtitle}</p>
                    </div>

                    {/* Status Badge */}
                    <div className="flex items-center justify-between">
                      <ProjectStatusBadge status="live" size="md" className="font-bold" />
                      <span className="text-xs text-gray-400 font-mono">STATUS: PRODUCTION</span>
                    </div>

                    {/* Description */}
                    <p className="text-gray-300 leading-relaxed">
                      AI email assistant that achieves Inbox Zero autonomously. Early beta used daily by our team to validate core workflows. Learn your preferences, handle routine responses, stay focused on what matters.
                    </p>

                    {/* Metrics Grid */}
                    <div className="grid grid-cols-3 gap-4 py-6 border-y border-terminal-gold/20">
                      {zero.metrics.map((metric, idx) => (
                        <div key={idx}>
                          <div className="text-lg font-bold text-terminal-gold mb-1">{metric.value}</div>
                          <div className="text-xs text-gray-400 uppercase tracking-wider">{metric.label}</div>
                        </div>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-3">
                      <a
                        href="https://testflight.apple.com/join/zero-inbox"
                        className="block w-full px-6 py-4 bg-terminal-gold hover:bg-terminal-gold-hover text-gray-900 rounded-lg text-center text-base font-bold transition-all shadow-lg shadow-terminal-gold/20 hover:shadow-xl hover:shadow-terminal-gold/30"
                      >
                        🚀 Join Beta on TestFlight
                      </a>
                      <div className="flex gap-3">
                        <Link
                          href="/work/zero/overview"
                          className="flex-1 px-4 py-3 bg-terminal-gold/10 border border-terminal-gold/30 hover:border-terminal-gold hover:bg-terminal-gold/20 rounded-lg text-center text-sm font-bold text-terminal-gold transition-all"
                        >
                          Product Overview
                        </Link>
                        <Link
                          href={`/work/${zero.slug}`}
                          className="flex-1 px-4 py-3 bg-gray-800/50 border border-gray-700 hover:border-terminal-gold/50 rounded-lg text-center text-sm font-bold text-white hover:text-terminal-gold transition-all"
                        >
                          Case Study
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            )}

            {/* Heirloom - Featured Hero */}
            {heirloom && (
              <Link href={`/work/${heirloom.slug}`} className="group block">
                <div className="h-full p-6 sm:p-8 bg-gray-900/70 border border-[#00D9FF]/30 rounded-lg hover:border-[#00D9FF]/50 transition-all duration-300">
                  <div className="space-y-6">
                    {/* Title */}
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-[#00D9FF] transition-colors">
                        {heirloom.title}
                      </h3>
                      <p className="text-sm text-gray-400">{heirloom.subtitle}</p>
                    </div>

                    {/* Status Badge */}
                    <div className="flex items-center justify-between">
                      <ProjectStatusBadge status="live" size="md" className="font-bold" />
                      <span className="text-xs text-gray-400 font-mono">STATUS: LIVE BETA</span>
                    </div>

                    {/* Description */}
                    <p className="text-gray-300 leading-relaxed">
                      Modern recipe box where grandma's handwritten chicken soup sits alongside that NYT cookie you bookmarked. Style each recipe as a personal artifact, share exactly as you created it, and build the collection worth passing down.
                    </p>

                    {/* Metrics Grid */}
                    <div className="grid grid-cols-3 gap-4 py-6 border-y border-[#00D9FF]/20">
                      {heirloom.metrics.map((metric, idx) => (
                        <div key={idx}>
                          <div className="text-lg font-bold text-[#00D9FF] mb-1">{metric.value}</div>
                          <div className="text-xs text-gray-400 uppercase tracking-wider">{metric.label}</div>
                        </div>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-3">
                      <a
                        href="https://testflight.apple.com/join/heirloom"
                        className="block w-full px-6 py-4 bg-[#00D9FF] hover:bg-[#00C5E6] text-gray-900 rounded-lg text-center text-base font-bold transition-all shadow-lg shadow-[#00D9FF]/20 hover:shadow-xl hover:shadow-[#00D9FF]/30"
                      >
                        🚀 Join Beta on TestFlight
                      </a>
                      <div className="flex gap-3">
                        <Link
                          href="/work/heirloom/pitch"
                          className="flex-1 px-4 py-3 bg-[#00D9FF]/10 border border-[#00D9FF]/30 hover:border-[#00D9FF] hover:bg-[#00D9FF]/20 rounded-lg text-center text-sm font-bold text-[#00D9FF] transition-all"
                        >
                          Product Overview
                        </Link>
                        <Link
                          href={`/work/${heirloom.slug}`}
                          className="flex-1 px-4 py-3 bg-gray-800/50 border border-gray-700 hover:border-[#00D9FF]/50 rounded-lg text-center text-sm font-bold text-white hover:text-[#00D9FF] transition-all"
                        >
                          Case Study
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Additional Ventures - If we add more consumer products */}
      {ourProducts.length > 2 && (
        <section className="relative py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-800">
          <div className="absolute inset-0 pointer-events-none">
            <ASCIIUnifiedGrid
              opacity={0.04}
              animated={true}
              colorTheme={watercolorThemes.terminalSubtle}
              charSet="default"
            />
          </div>

          <div className="relative z-10 max-w-6xl mx-auto">
            <div className="flex items-center gap-3 mb-12">
              <div className="w-2 h-2 rounded-full bg-terminal-gold" />
              <h2 className="text-3xl font-bold text-white">More Ventures</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {ourProducts.slice(2).map((project) => (
                <Link key={project.id} href={`/work/${project.slug}`} className="group block">
                  <div className="h-full p-6 bg-gray-900/50 border border-gray-700 rounded-lg hover:border-terminal-gold/50 transition-all duration-300">
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-terminal-gold transition-colors">
                          {project.title}
                        </h3>
                      </div>

                      <div className="flex items-center justify-between">
                        <ProjectStatusBadge status={project.status as any} size="md" className="font-bold" />
                      </div>

                      <p className="text-gray-300 text-sm">{project.description}</p>

                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <span key={tag} className="px-2 py-1 rounded text-xs bg-gray-700 text-gray-300">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Why We Build Products - Philosophy */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8 border-b border-gray-800">
        <div className="absolute inset-0 pointer-events-none">
          <ASCIIUnifiedGrid
            opacity={0.04}
            animated={true}
            colorTheme={watercolorThemes.terminalSubtle}
            charSet="default"
          />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="p-6 sm:p-8 bg-gray-900/50 border border-gray-700 rounded-lg">
            <h3 className="text-xl font-bold text-white mb-4">Why We Build Our Own Products</h3>
            <p className="text-sm text-gray-300 leading-relaxed">
              <span className="font-bold text-white">We build our own products to stay sharp.</span> Market feedback is the
              only validation that matters. Every product here has been tested under real pressure—users, revenue, distribution.
              We only partner when we believe in the opportunity as much as our own ventures.
            </p>
          </div>
        </div>
      </section>

      {/* Partnership Work Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 pointer-events-none">
          <ASCIIUnifiedGrid
            opacity={0.04}
            animated={true}
            colorTheme={watercolorThemes.terminalSubtle}
            charSet="default"
          />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-2 h-2 rounded-full bg-terminal-gold" />
            <h2 className="text-3xl font-bold text-white">Partnership Work</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {partnerships.map((project) => {
              // Special treatment for protected/confidential work
              const isConfidential = project.isProtected;
              const needsBlur = isConfidential;

              return (
                <div key={project.id} className="relative group">
                  <Link href={`/work/${project.slug}`} className="block">
                    <div className={`h-full p-6 bg-gray-900/50 border rounded-lg transition-all duration-300 ${
                      isConfidential
                        ? 'border-amber-400/30 hover:border-amber-400/50'
                        : 'border-gray-700 hover:border-terminal-gold/50'
                    }`}>
                      <div className={`space-y-4 ${needsBlur ? 'relative' : ''}`}>
                        {/* Title */}
                        <div>
                          <h3 className={`text-xl font-bold text-white mb-2 transition-colors ${
                            isConfidential ? 'group-hover:text-amber-400' : 'group-hover:text-terminal-gold'
                          }`}>
                            {project.title}
                          </h3>
                          {!isConfidential && (
                            <p className="text-sm text-gray-400">{project.subtitle}</p>
                          )}
                          {isConfidential && (
                            <p className="text-sm text-amber-400">CLASSIFIED</p>
                          )}
                        </div>

                        {/* Confidential Badge */}
                        {isConfidential && (
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <Lock className="w-3 h-3 text-amber-400" />
                              <span className="text-xs font-mono text-amber-400 font-bold">
                                PASSWORD PROTECTED
                              </span>
                            </div>
                            <ProjectStatusBadge status={project.status as any} size="md" className="font-bold" />
                          </div>
                        )}

                        {!isConfidential && (
                          <div className="flex items-center justify-between">
                            <ProjectStatusBadge status={project.status as any} size="md" className="font-bold" />
                          </div>
                        )}

                        {/* Blur effect for confidential content */}
                        <div className={needsBlur ? 'filter blur-sm group-hover:blur-0 transition-all duration-300' : ''}>
                          <p className="text-gray-300 text-sm leading-relaxed">
                            {project.description}
                          </p>

                          {/* Metrics */}
                          <div className="grid grid-cols-3 gap-3 py-4 border-y border-gray-700">
                            {project.metrics.map((metric, idx) => (
                              <div key={idx}>
                                <div className="text-sm font-bold text-terminal-gold">{metric.value}</div>
                                <div className="text-xs text-gray-500 uppercase tracking-wider">{metric.label}</div>
                              </div>
                            ))}
                          </div>

                          {/* Tags */}
                          <div className="flex flex-wrap gap-2">
                            {project.tags.map((tag) => (
                              <span key={tag} className="px-2 py-1 rounded text-xs bg-gray-800 text-gray-400 border border-gray-700">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Protected Case Study CTA */}
                        {isConfidential && (
                          <div className="pt-4 border-t border-amber-400/20">
                            <p className="text-xs text-amber-400/70 mb-3">
                              Enter password to view full case study details
                            </p>
                            <div className="flex items-center gap-2 text-amber-400 text-sm font-semibold">
                              <Lock className="w-3 h-3" />
                              <span>Unlock Case Study</span>
                            </div>
                          </div>
                        )}

                        {/* Regular CTA */}
                        {!isConfidential && (
                          <div className="flex items-center gap-2 text-gray-400 group-hover:text-terminal-gold transition-colors">
                            <span className="text-sm">View Details</span>
                            <ArrowRight className="w-4 h-4" />
                          </div>
                        )}
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>

          {/* Partnership Philosophy */}
          <div className="mt-12">
            <div className="p-6 sm:p-8 bg-gray-900/50 border border-gray-700 rounded-lg">
              <h3 className="text-xl font-bold text-white mb-4">Partnership Model</h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                <span className="font-bold text-white">We're selective about partnerships.</span> We only engage when we see
                strong alignment and the opportunity to apply our product methodology to genuinely complex problems. Some work
                is confidential and password-protected—we respect our partners' need for discretion.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8 border-t border-gray-800">
        <div className="absolute inset-0 pointer-events-none">
          <ASCIIUnifiedGrid
            opacity={0.04}
            animated={true}
            colorTheme={watercolorThemes.terminalSubtle}
            charSet="default"
          />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-white">Interested in partnering?</h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            We take on select partnerships where we see strong alignment and opportunity to apply our product expertise.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <ButtonPrimary
              href="/contact"
              size="lg"
              className="shadow-lg shadow-[#FFD700]/20 hover:shadow-[#FFD700]/40 hover:scale-105"
            >
              Schedule Intro Call
            </ButtonPrimary>
            <ButtonSecondary
              href="/partnerships"
              size="lg"
            >
              View Partnership Models
            </ButtonSecondary>
          </div>
        </div>
      </section>
    </main>
  );
}
