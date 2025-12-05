/**
 * Work Portfolio Index
 *
 * Public portfolio showing all projects
 * Displays Zero + password-protected case studies
 */

'use client';

import { ASCIIUnifiedGrid } from '@/components/visual';
import { watercolorThemes } from '@/lib/theme/watercolor-palette';
import { FeaturedWorkCard } from '@/components/work/FeaturedWorkCard';
import { getAllProjects } from '@/lib/content/work-projects';

export default function WorkPage() {
  const projects = getAllProjects();

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
            Products we've built and client engagements that prove our methodology.
            Consumer apps, enterprise platforms, and complex multi-module systems.
          </p>
        </div>
      </section>

      {/* Projects Grid */}
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
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

          {/* Proof Diversity */}
          <div className="mt-16 pt-12 border-t border-gray-800">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold text-white mb-4">
                Diverse Proof of Execution
              </h2>
              <p className="text-gray-400 mb-8">
                Our portfolio demonstrates systematic velocity across consumer products, enterprise B2B platforms, and complex multi-module systems. Same methodology, different domains.
              </p>
              <div className="grid sm:grid-cols-3 gap-6">
                <div className="p-4 bg-gray-900/50 border border-gray-700 rounded-lg">
                  <div className="text-3xl font-bold text-[#FFD700] mb-2">30 days</div>
                  <div className="text-sm text-gray-400">Concept to live product</div>
                </div>
                <div className="p-4 bg-gray-900/50 border border-gray-700 rounded-lg">
                  <div className="text-3xl font-bold text-[#FFD700] mb-2">16 weeks</div>
                  <div className="text-sm text-gray-400">Enterprise MVP delivery</div>
                </div>
                <div className="p-4 bg-gray-900/50 border border-gray-700 rounded-lg">
                  <div className="text-3xl font-bold text-[#FFD700] mb-2">4 modules</div>
                  <div className="text-sm text-gray-400">Complex system design</div>
                </div>
              </div>
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
          <h2 className="text-2xl font-bold mb-4">Ready to build?</h2>
          <p className="text-gray-300 mb-8">
            We bring the same systematic approach to every engagement—whether it's a consumer app, enterprise platform, or complex multi-module system.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base bg-[#FFD700] hover:bg-[#FFE34D] text-black font-semibold transition-all shadow-[0_0_17px_rgba(255,215,0,0.17)] hover:shadow-[0_0_25px_rgba(255,215,0,0.25)]"
            >
              Book intro call
            </a>
            <a
              href="/services"
              className="px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base border border-gray-300 hover:border-[#FFD700] text-white font-semibold transition-colors"
            >
              View services
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
