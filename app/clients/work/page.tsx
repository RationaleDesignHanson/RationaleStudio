/**
 * Work Page - Window Shrine Design
 *
 * Transformed with OS8Window components and Terminal Republic aesthetic.
 * Preserves CaseStudyTeaser components and past experience cards.
 */

import Link from 'next/link';
import { OS8Window } from '@/components/visual-test';
import { ASCIIUnifiedGrid } from '@/components/visual';
import { watercolorThemes } from '@/lib/theme/watercolor-palette';
import { CaseStudyTeaser } from '@/components/cards';
import { caseStudyTeasers } from '@/lib/content/case-studies';
import { pastExperience } from '@/lib/content/founder';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Work — Rationale',
  description: 'Complex systems, multiple surfaces, emerging technology, high stakes. See how Rationale has helped teams eliminate ambiguity before shipping.',
};

export default function WorkPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white">
      {/* Hero */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-800 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <ASCIIUnifiedGrid
            opacity={0.08}
            animated={true}
            colorTheme={watercolorThemes.terminalGold}
            charSet="default"
          />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto">
          <p className="text-xs sm:text-sm font-mono text-[#FFD700] tracking-widest mb-4 text-center animate-fade-in-up">
            EVIDENCE OVER PITCH DECKS
          </p>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-center animate-fade-in-up delay-100">
            Work
          </h1>

          <p className="text-lg sm:text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto text-center mb-8 animate-fade-in-up delay-200">
            Complex systems, multiple surfaces, emerging technology, high stakes. See how we've helped teams eliminate ambiguity before shipping.
          </p>
        </div>
      </section>

      {/* Rationale Projects */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-800 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <ASCIIUnifiedGrid
            opacity={0.06}
            animated={true}
            colorTheme={watercolorThemes.terminalSubtle}
            charSet="default"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="mb-12 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Rationale Projects
            </h2>
            <p className="text-sm sm:text-base text-gray-300">
              Case studies are password-protected. Contact us for access.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {caseStudyTeasers.map((caseStudy, index) => {
              // Cycle through different gradients for each card
              const gradientColors = [
                ['#8b5cf6', '#6366f1', '#3b82f6'], // Cool Purple
                ['#14b8a6', '#06b6d4', '#ec4899'], // Teal Pink
                ['#f97316', '#fb923c', '#f472b6'], // Coral Orange
                ['#10b981', '#14b8a6', '#06b6d4'], // Green Teal
              ];
              const colors = gradientColors[index % gradientColors.length];

              return (
                <div
                  key={caseStudy.slug}
                  className="rounded-lg border border-[#FFD700]/20 backdrop-blur-sm overflow-hidden transition-all hover:border-[#FFD700] hover:shadow-lg"
                  style={{
                    background: `linear-gradient(135deg, ${colors[0]}20 0%, ${colors[1]}15 50%, ${colors[2]}10 100%)`
                  }}
                >
                  <CaseStudyTeaser caseStudy={caseStudy} />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Past Experience */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-800 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <ASCIIUnifiedGrid
            opacity={0.06}
            animated={true}
            colorTheme={watercolorThemes.darkGalaxy}
            charSet="default"
          />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Past Experience
            </h2>
            <p className="text-base sm:text-lg text-gray-300 max-w-3xl mx-auto">
              Before founding Rationale, Matt led AR product development at Meta (2018-2024).
              These projects shaped the methodologies and principles that define how Rationale works today.
            </p>
          </div>

          <div className="grid gap-6">
            {pastExperience.map((project, index) => (
              <OS8Window
                key={index}
                title={project.title}
                variant="body"
                animateIn={false}
              >
                <div className="space-y-4">
                  {/* Header Info */}
                  <div>
                    <p className="text-sm text-[#FFD700] font-medium mb-2">
                      {project.company} • {project.timeline} • {project.role}
                    </p>
                    <p className="text-base text-[#FFD700] font-medium">
                      {project.tagline}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-gray-100 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Impact */}
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-2">
                      Impact
                    </h4>
                    <ul className="grid sm:grid-cols-2 gap-2">
                      {project.impact.map((item, idx) => (
                        <li key={idx} className="flex gap-2 text-sm text-gray-100">
                          <span className="text-[#FFD700]">✓</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Skills */}
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-2">
                      Skills
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {project.skills.map((skill, idx) => (
                        <span
                          key={idx}
                          className="text-xs px-3 py-1 rounded-full border border-gray-700 text-gray-300 bg-gray-800/50"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Related Insight */}
                  {project.relatedInsight && (
                    <div className="pt-4 border-t border-[#FFD700]/20">
                      <Link
                        href={`/insights/${project.relatedInsight}`}
                        className="text-sm text-[#FFD700] hover:underline inline-flex items-center gap-1"
                      >
                        Read the full story →
                      </Link>
                    </div>
                  )}
                </div>
              </OS8Window>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <ASCIIUnifiedGrid
            opacity={0.12}
            animated={true}
            colorTheme={watercolorThemes.terminalGold}
            charSet="default"
          />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto flex justify-center">
          <OS8Window
            title="Want to see the full stories?"
            variant="cta"
            animateIn={false}
            className="max-w-lg"
          >
            <div className="space-y-6">
              <p className="text-base text-[#FFD700] leading-relaxed text-center">
                Our case studies include detailed breakdowns of challenges, constraints, solutions, and outcomes. Get in touch for access.
              </p>

              <div className="flex flex-col gap-3 pt-4">
                <Link
                  href="/contact"
                  className="w-full bg-[#FFD700] hover:bg-[#FFE34D] text-black text-center px-6 py-3 font-semibold transition-colors"
                >
                  Request access
                </Link>
              </div>
            </div>
          </OS8Window>
        </div>
      </section>
    </main>
  );
}
