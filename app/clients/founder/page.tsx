/**
 * Founder Page - Window Shrine Design
 *
 * Meet Matt Hanson - 7 years at Meta, building systematic portfolio companies
 * Transformed with OS8Window components and Terminal Republic aesthetic.
 */

'use client';

import Link from 'next/link';
import { OS8Window } from '@/components/visual-test';
import { ASCIIUnifiedGrid } from '@/components/visual';
import { watercolorThemes } from '@/lib/theme/watercolor-palette';
import { founderProfile, originStory, founderPhilosophy, pastExperience } from '@/lib/content';
import { ButtonPrimary, ButtonSecondary } from '@/components/ui';

export default function FounderPage() {
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
            MEET THE FOUNDER
          </p>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-center animate-fade-in-up delay-100">
            {founderProfile.name}
          </h1>

          <p className="text-lg sm:text-xl text-[#FFD700] leading-relaxed text-center mb-2 animate-fade-in-up delay-200">
            {founderProfile.role}
          </p>

          <p className="text-base text-gray-300 leading-relaxed max-w-3xl mx-auto text-center mb-8 animate-fade-in-up delay-300">
            {founderProfile.bio}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-fade-in-up delay-[400ms]">
            <ButtonPrimary href="/contact" size="lg">
              Schedule a Call
            </ButtonPrimary>
            <ButtonSecondary href={founderProfile.contact.linkedin || '#'} size="lg">
              LinkedIn →
            </ButtonSecondary>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
            <div className="p-4 rounded-lg border border-[#FFD700]/20 bg-black/60 backdrop-blur-sm text-center">
              <div className="text-3xl font-bold text-[#FFD700] mb-1">7 years</div>
              <div className="text-xs text-gray-300">Meta Reality Labs</div>
            </div>
            <div className="p-4 rounded-lg border border-[#FFD700]/20 bg-black/60 backdrop-blur-sm text-center">
              <div className="text-3xl font-bold text-[#FFD700] mb-1">3</div>
              <div className="text-xs text-gray-300">Ventures Built</div>
              <div className="text-xs text-green-400 mt-1">Zero live, 2 ready</div>
            </div>
            <div className="p-4 rounded-lg border border-[#FFD700]/20 bg-black/60 backdrop-blur-sm text-center">
              <div className="text-3xl font-bold text-[#FFD700] mb-1">1 month</div>
              <div className="text-xs text-gray-300">Concept to Plan</div>
              <div className="text-xs text-gray-300 mt-1">AI-accelerated</div>
            </div>
          </div>
        </div>
      </section>

      {/* Origin Story */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-800 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <ASCIIUnifiedGrid
            opacity={0.06}
            animated={true}
            colorTheme={watercolorThemes.terminalSubtle}
            charSet="default"
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <OS8Window
            title={originStory.title}
            variant="featured"
            animateIn={false}
          >
            <p className="text-lg text-[#FFD700] text-center mb-6">{originStory.subtitle}</p>

            <div className="space-y-4 mb-6">
              {founderProfile.personalStory.map((paragraph, idx) => (
                <p key={idx} className="text-sm text-gray-100 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="p-6 rounded-lg border border-[#FFD700]/20 bg-black/40">
              <p className="text-sm text-gray-100 italic text-center">
                "{originStory.response}"
              </p>
            </div>
          </OS8Window>
        </div>
      </section>

      {/* Track Record */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-800 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <ASCIIUnifiedGrid
            opacity={0.06}
            animated={true}
            colorTheme={watercolorThemes.darkGalaxy}
            charSet="default"
          />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-center">
            Track Record
          </h2>

          <OS8Window
            title="Professional Achievements"
            variant="body"
            animateIn={false}
          >
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div>
                <h3 className="text-base font-semibold text-[#FFD700] mb-4">Meta Achievements</h3>
                <div className="space-y-2">
                  {founderProfile.trackRecord.slice(0, 6).map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-sm text-gray-100">
                      <span className="text-[#FFD700] mt-0.5">•</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-base font-semibold text-[#FFD700] mb-4">Technical Capabilities</h3>
                <div className="space-y-2">
                  {founderProfile.capabilities.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-sm text-gray-100">
                      <span className="text-[#FFD700] mt-0.5">•</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid sm:grid-cols-3 gap-4">
              {pastExperience.slice(0, 3).map((project, idx) => (
                <div key={idx} className="p-4 rounded-lg border border-[#FFD700]/20 bg-black/40">
                  <div className="text-xs text-[#FFD700] font-semibold mb-1">{project.company}</div>
                  <h4 className="text-sm font-semibold text-white mb-2">{project.title}</h4>
                  <p className="text-xs text-gray-300 mb-2">{project.tagline}</p>
                  <div className="text-xs text-gray-400">{project.timeline}</div>
                </div>
              ))}
            </div>
          </OS8Window>
        </div>
      </section>

      {/* Philosophy */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-800 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <ASCIIUnifiedGrid
            opacity={0.06}
            animated={true}
            colorTheme={watercolorThemes.terminalSubtle}
            charSet="default"
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-center">
            Philosophy & Approach
          </h2>

          <OS8Window
            title="Core Philosophy"
            variant="body"
            animateIn={false}
          >
            <div className="space-y-6">
              <div className="p-6 rounded-lg border border-[#FFD700]/20 bg-black/40 text-center">
                <p className="text-base text-gray-100 italic">
                  "{founderPhilosophy.coreBelief}"
                </p>
              </div>

              <div className="p-6 rounded-lg border border-[#FFD700]/20 bg-black/40">
                <h3 className="text-sm font-semibold text-[#FFD700] mb-3">Approach</h3>
                <p className="text-sm text-gray-100 leading-relaxed">
                  {founderPhilosophy.approach}
                </p>
              </div>

              <div className="p-6 rounded-lg border border-[#FFD700]/20 bg-black/40">
                <h3 className="text-sm font-semibold text-[#FFD700] mb-3">Vision</h3>
                <p className="text-sm text-gray-100 leading-relaxed">
                  {founderPhilosophy.vision}
                </p>
              </div>
            </div>
          </OS8Window>
        </div>
      </section>

      {/* Why Invest */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-800 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <ASCIIUnifiedGrid
            opacity={0.06}
            animated={true}
            colorTheme={watercolorThemes.darkGalaxy}
            charSet="default"
          />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-center">
            Why This Founder?
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <OS8Window
              title="Solo Founder = Total Control"
              variant="interactive"
              animateIn={false}
            >
              <p className="text-sm text-gray-100 mb-4">
                No co-founder conflicts. No partner dilution. One person makes decisions, ships products, and owns outcomes. This is why Zero went from concept to App Store in 1 month.
              </p>
              <ul className="text-xs text-gray-300 space-y-2">
                <li>→ No board drama or founder disputes</li>
                <li>→ 100% execution alignment</li>
                <li>→ Fast decisions, faster shipping</li>
              </ul>
            </OS8Window>

            <OS8Window
              title="Meta-Grade Execution"
              variant="interactive"
              animateIn={false}
            >
              <p className="text-sm text-gray-100 mb-4">
                7 years building 0-1 products at Meta means enterprise-grade architecture, not agency shortcuts. Zero has 10 microservices and 182 Swift files—built by one person in 6 weeks.
              </p>
              <ul className="text-xs text-gray-300 space-y-2">
                <li>→ Production-ready from day 1</li>
                <li>→ Scalable architecture patterns</li>
                <li>→ No technical debt shortcuts</li>
              </ul>
            </OS8Window>

            <OS8Window
              title="AI-Accelerated Speed"
              variant="interactive"
              animateIn={false}
            >
              <p className="text-sm text-gray-100 mb-4">
                Leverages AI for everything from architecture to code generation. This isn't "prompt engineering"—it's systematic use of AI as a force multiplier for senior execution.
              </p>
              <ul className="text-xs text-gray-300 space-y-2">
                <li>→ 1 month: Zero concept → complete plan</li>
                <li>→ 3 weeks: Atlas 103KB roadmap</li>
                <li>→ 2 weeks: Amplify 129KB blueprint</li>
              </ul>
            </OS8Window>

            <OS8Window
              title="Proven Portfolio Model"
              variant="interactive"
              animateIn={false}
            >
              <p className="text-sm text-gray-100 mb-4">
                Not just building one product—building a systematic model that can launch 2-3 ventures per year. Zero, Atlas, and Amplify prove the process works across different markets.
              </p>
              <ul className="text-xs text-gray-300 space-y-2">
                <li>→ 3 ventures built in 6 months</li>
                <li>→ Different sectors (productivity, CRE, sports)</li>
                <li>→ Repeatable execution playbook</li>
              </ul>
            </OS8Window>
          </div>
        </div>
      </section>

      {/* Patent & IP */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-800 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <ASCIIUnifiedGrid
            opacity={0.06}
            animated={true}
            colorTheme={watercolorThemes.terminalSubtle}
            charSet="default"
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-center">
            Intellectual Property
          </h2>

          <OS8Window
            title="Patent Portfolio"
            variant="body"
            animateIn={false}
          >
            <div className="p-6 rounded-lg border border-[#FFD700]/20 bg-black/40">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">
                    {founderProfile.patent.title}
                  </h3>
                  <p className="text-sm text-gray-300">{founderProfile.patent.description}</p>
                </div>
                <span className="text-xs px-3 py-1 rounded-full bg-[#FFD700]/20 text-[#FFD700] font-medium">
                  {founderProfile.patent.year}
                </span>
              </div>
              <p className="text-xs text-gray-400">
                This patent demonstrates Matt's ability to create defensible IP, a key skill for building venture portfolio value.
              </p>
            </div>
          </OS8Window>
        </div>
      </section>

      {/* Advisors */}
      {founderProfile.advisors && founderProfile.advisors.length > 0 && (
        <section className="relative py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-800 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <ASCIIUnifiedGrid
              opacity={0.06}
              animated={true}
              colorTheme={watercolorThemes.darkGalaxy}
              charSet="default"
            />
          </div>

          <div className="relative z-10 max-w-5xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-center">
              Advisory Board
            </h2>
            <p className="text-center text-gray-300 mb-8">
              Strategic advisors providing domain expertise, network access, and operational guidance
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {founderProfile.advisors.map((advisor, idx) => (
                <OS8Window
                  key={idx}
                  title={advisor.name}
                  variant="body"
                  animateIn={false}
                >
                  <p className="text-sm text-[#FFD700] mb-3">{advisor.title}</p>
                  <p className="text-xs text-gray-300 mb-3">{advisor.background}</p>
                  <div className="pt-3 border-t border-[#FFD700]/20">
                    <p className="text-xs font-semibold text-white mb-1">Expertise:</p>
                    <p className="text-xs text-gray-300">{advisor.expertise}</p>
                  </div>
                </OS8Window>
              ))}
            </div>

            <div className="max-w-3xl mx-auto p-6 rounded-lg border border-[#FFD700]/20 bg-black/40 text-center">
              <p className="text-sm text-gray-100">
                <span className="font-bold text-[#FFD700]">Solo founder doesn't mean solo execution.</span>
                {' '}Matt has assembled a seasoned advisory board with deep expertise in product scaling, exits, and AI deployment to derisk key operational areas.
              </p>
            </div>
          </div>
        </section>
      )}

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
            title="Work With Matt"
            variant="cta"
            animateIn={false}
            className="max-w-3xl"
          >
            <div className="space-y-6">
              <p className="text-base text-[#FFD700] leading-relaxed text-center">
                Whether you're investing in Zero, partnering on portfolio ventures, or joining the studio waitlist—you're backing proven execution velocity and systematic thinking.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <ButtonPrimary href="/contact" size="lg">
                  Schedule a Call
                </ButtonPrimary>
                <ButtonSecondary href="/investment" size="lg">
                  View Investment Options
                </ButtonSecondary>
              </div>

              <p className="text-sm text-gray-300 text-center pt-4 border-t border-[#FFD700]/20">
                Email: <a href={`mailto:${founderProfile.contact.email}`} className="text-[#FFD700] hover:underline">{founderProfile.contact.email}</a>
              </p>
            </div>
          </OS8Window>
        </div>
      </section>
    </main>
  );
}
