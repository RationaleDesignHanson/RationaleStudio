/**
 * Work Portfolio Index
 *
 * Reorganized: Our products first, then partnerships
 * Clear separation between ventures we own vs. client work
 */

'use client';

import Link from 'next/link';
import { ASCIIUnifiedGrid } from '@/components/visual';
import { watercolorThemes } from '@/lib/theme/watercolor-palette';
import { FeaturedWorkCard } from '@/components/work/FeaturedWorkCard';
import { getAllProjects } from '@/lib/content/work-projects';
import { Rocket, Handshake } from 'lucide-react';

export default function WorkPage() {
  const projects = getAllProjects();

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
            Products we build and own, plus select partnership engagements where we applied our methodology to solve complex problems.
          </p>
        </div>
      </section>

      {/* Our Products Section */}
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
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-[#FFD700]/10 rounded-lg">
              <Rocket className="w-6 h-6 text-[#FFD700]" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white">Our Ventures</h2>
              <p className="text-sm text-gray-400">Products we build, own, and operate</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ourProducts.map((project) => (
              <FeaturedWorkCard
                key={project.id}
                title={project.title}
                subtitle={project.subtitle}
                metrics={project.metrics.map(m => m.value)}
                tags={project.tags}
                href={`/work/${project.slug}`}
                status={project.status}
                isProtected={project.isProtected}
              />
            ))}
          </div>

          {/* Products Callout */}
          <div className="mt-12 p-6 bg-gray-900/50 border border-gray-700 rounded-lg">
            <p className="text-sm text-gray-400">
              <span className="font-semibold text-white">Why we build our own products:</span> It keeps our skills sharp, validates our methodology with real market feedback, and creates ownership alignment. We only partner when we believe in the opportunity as much as our own ventures.
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
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-[#FFD700]/10 rounded-lg">
              <Handshake className="w-6 h-6 text-[#FFD700]" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white">Partnership Work</h2>
              <p className="text-sm text-gray-400">Pre-Kickoff engagements where we partnered with companies to build custom products</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {partnerships.map((project) => (
              <FeaturedWorkCard
                key={project.id}
                title={project.title}
                subtitle={project.subtitle}
                metrics={project.metrics.map(m => m.value)}
                tags={project.tags}
                href={`/work/${project.slug}`}
                status={project.status}
                isProtected={project.isProtected}
              />
            ))}
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
          <h2 className="text-2xl font-bold mb-4">Interested in partnering?</h2>
          <p className="text-gray-300 mb-8">
            We take on select partnerships where we see strong alignment and opportunity to apply our product expertise.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base bg-[#FFD700] hover:bg-[#FFE34D] text-black font-semibold transition-all shadow-[0_0_17px_rgba(255,215,0,0.17)] hover:shadow-[0_0_25px_rgba(255,215,0,0.25)]"
            >
              Schedule Intro Call
            </Link>
            <Link
              href="/partnerships"
              className="px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base border border-gray-300 hover:border-[#FFD700] text-white font-semibold transition-colors"
            >
              View Partnership Models
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
