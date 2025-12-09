/**
 * About Page - Window Shrine Design
 *
 * Transformed with OS8Window components and Terminal Republic aesthetic.
 * Philosophy, mental models, frameworks, and founder story preserved.
 */

'use client';

import Link from 'next/link';
import { OS8Window } from '@/components/visual-test';
import { ASCIIUnifiedGrid } from '@/components/visual';
import { watercolorThemes } from '@/lib/theme/watercolor-palette';
import { mentalModels, frameworks } from '@/lib/content/philosophy';
import { founderProfile } from '@/lib/content/founder';
import { aboutContent } from '@/lib/content';
import { StickyCTABar } from '@/components/conversion';
import { ButtonPrimary, ButtonSecondary } from '@/components/ui';
import type { Metadata } from 'next';

export default function AboutPage() {
  return (
    <>
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
            <p className="text-xs sm:text-sm font-mono text-terminal-gold tracking-widest mb-4 text-center animate-fade-in-up">
              CONVICTION-FIRST VENTURE STUDIO
            </p>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-center animate-fade-in-up delay-100">
              About Rationale
            </h1>

            <p className="text-lg sm:text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto text-center mb-8 animate-fade-in-up delay-200">
              Two engines. One system. Rationale Kits (client engagements) fund runway and validate execution. Portfolio IP (ventures we own) accumulates value over time. Mental models for systematic conviction.
            </p>
          </div>
        </section>

        {/* Dual-Engine Operating Model */}
        <section className="relative py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-800 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <ASCIIUnifiedGrid
              opacity={0.06}
              animated={true}
              colorTheme={watercolorThemes.terminalSubtle}
              charSet="default"
            />
          </div>

          <div className="relative z-10 max-w-5xl mx-auto">
            <OS8Window
              title="Two Engines, One System"
              variant="featured"
              animateIn={false}
            >
              <div className="text-center mb-8">
                <p className="text-base sm:text-lg text-terminal-gold font-medium">
                  How we build conviction-backed IP through systematic execution
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                {/* Rationale Kits */}
                <div className="p-6 rounded-lg border border-terminal-gold/20 bg-black/60">
                  <h3 className="text-2xl font-bold mb-3">Rationale Kits</h3>
                  <p className="text-sm text-terminal-gold font-medium mb-4">Productized Client Engagements</p>
                  <p className="text-sm text-gray-100 mb-6">
                    2-week sprints to 18-month builds. Cash, equity, or hybrid payment. Every engagement validates our execution systems and generates market data.
                  </p>
                  <div className="space-y-3 mb-6">
                    <div className="flex items-start gap-3">
                      <span className="text-terminal-gold">→</span>
                      <p className="text-sm text-gray-100">Fund Portfolio exploration and de-risk new ideas</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-terminal-gold">→</span>
                      <p className="text-sm text-gray-100">Validate market assumptions with real clients</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-terminal-gold">→</span>
                      <p className="text-sm text-gray-100">Compound execution capability with every project</p>
                    </div>
                  </div>
                  <Link href="/partnerships" className="text-sm text-terminal-gold hover:underline font-medium">
                    View Rationale Kits →
                  </Link>
                </div>

                {/* Portfolio IP */}
                <div className="p-6 rounded-lg border border-terminal-gold/20 bg-black/60">
                  <h3 className="text-2xl font-bold mb-3">Portfolio IP</h3>
                  <p className="text-sm text-terminal-gold font-medium mb-4">Conviction-Backed Ventures We Own</p>
                  <p className="text-sm text-gray-100 mb-6">
                    Products we originate and own. Built with conviction, designed to appreciate over time. IP accumulation, not time-trading.
                  </p>
                  <div className="space-y-3 mb-6">
                    <div className="flex items-start gap-3">
                      <span className="text-terminal-gold">→</span>
                      <p className="text-sm text-gray-100">Zero: Live on App Store with beta rollout</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-terminal-gold">→</span>
                      <p className="text-sm text-gray-100">Project Atlas: Complete CRE intelligence roadmap</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-terminal-gold">→</span>
                      <p className="text-sm text-gray-100">Project Amplify: Full NIL platform architecture</p>
                    </div>
                  </div>
                  <Link href="/ventures" className="text-sm text-terminal-gold hover:underline font-medium">
                    View Portfolio IP →
                  </Link>
                </div>
              </div>

              {/* How They Work Together */}
              <div className="p-6 rounded-lg border border-terminal-gold/30 bg-terminal-gold/5">
                <h4 className="text-lg font-bold mb-4 text-center">How They Work Together</h4>
                <div className="grid md:grid-cols-3 gap-6 text-center">
                  <div>
                    <div className="text-2xl font-bold text-terminal-gold mb-2">Kits Fund Runway</div>
                    <p className="text-xs text-gray-300">Client engagements generate revenue for Portfolio exploration</p>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-terminal-gold mb-2">Portfolio Proves Conviction</div>
                    <p className="text-xs text-gray-300">Ventures demonstrate our systematic execution at speed</p>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-terminal-gold mb-2">Both Compound Value</div>
                    <p className="text-xs text-gray-300">Every engagement strengthens our execution systems</p>
                  </div>
                </div>
                <p className="text-sm text-center mt-6 pt-6 border-t border-terminal-gold/20">
                  <span className="font-bold text-terminal-gold">Result:</span> Systematic IP accumulation. Conviction first, IP always.
                </p>
              </div>
            </OS8Window>
          </div>
        </section>

        {/* The Whiteboard Moment - Origin Story */}
        <section className="relative py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-800 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <ASCIIUnifiedGrid
              opacity={0.06}
              animated={true}
              colorTheme={watercolorThemes.darkGalaxy}
              charSet="default"
            />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto">
            <OS8Window
              title={`◆ ${aboutContent.originStory.title}`}
              variant="body"
              animateIn={false}
            >
              <div className="mb-6 text-center">
                <p className="text-sm sm:text-base lg:text-lg text-terminal-gold font-medium">
                  {aboutContent.originStory.subtitle}
                </p>
              </div>

              <div className="space-y-6">
                {aboutContent.originStory.content.map((paragraph, index) => (
                  <p key={index} className="text-base sm:text-lg text-gray-100 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="mt-8 pt-8 border-t border-terminal-gold/20">
                <p className="text-sm sm:text-base text-center text-gray-100 italic">
                  This moment defined our approach: we help teams build the conviction they need before committing resources to engineering.
                </p>
              </div>
            </OS8Window>
          </div>
        </section>

        {/* Philosophy - Mental Models */}
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
            <div className="mb-12 text-center">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                How We Think
              </h2>
              <p className="text-base sm:text-lg text-gray-300">
                Four mental models that guide our work and help clients build conviction.
              </p>
            </div>

            <div className="space-y-8">
              {mentalModels.map((model, index) => (
                <OS8Window
                  key={index}
                  title={model.name}
                  variant="body"
                  animateIn={false}
                >
                  <div className="mb-4">
                    <p className="text-sm sm:text-base text-terminal-gold font-medium">
                      {model.tagline}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-sm sm:text-base text-gray-100 leading-relaxed mb-6">
                    {model.description}
                  </p>

                  {/* Analogy */}
                  <div className="mb-6 p-4 sm:p-6 rounded-lg bg-terminal-gold/5 border border-terminal-gold/20">
                    <h4 className="text-xs font-semibold uppercase tracking-wide text-terminal-gold mb-3">
                      Analogy
                    </h4>
                    <div className="space-y-3 text-sm sm:text-base">
                      <p className="text-white"><strong>Setup:</strong> {model.analogy.setup}</p>
                      <p className="text-gray-100"><strong>Problem:</strong> {model.analogy.problem}</p>
                      <p className="text-white"><strong>Solution:</strong> {model.analogy.solution}</p>
                    </div>
                  </div>

                  {/* Application */}
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wide text-terminal-gold mb-3">
                      In Practice
                    </h4>
                    <ul className="space-y-2">
                      {model.application.map((app, idx) => (
                        <li key={idx} className="flex gap-3 text-sm sm:text-base">
                          <span className="text-terminal-gold">→</span>
                          <span className="text-gray-100">{app}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </OS8Window>
              ))}
            </div>
          </div>
        </section>

        {/* Frameworks in Practice */}
        <section className="relative py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-800 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <ASCIIUnifiedGrid
              opacity={0.06}
              animated={true}
              colorTheme={watercolorThemes.darkGalaxy}
              charSet="default"
            />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto">
            <div className="mb-12 text-center">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Frameworks in Practice
              </h2>
              <p className="text-base sm:text-lg text-gray-300">
                Practical approaches we often apply to build conviction fast. These aren't rigid processes—they're tools we adapt based on your specific needs and constraints.
              </p>
            </div>

            <div className="space-y-8">
              {frameworks.map((framework, index) => (
                <OS8Window
                  key={index}
                  title={framework.name}
                  variant="body"
                  animateIn={false}
                >
                  <div className="mb-4">
                    <p className="text-sm sm:text-base text-terminal-gold font-medium">
                      {framework.tagline}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-sm sm:text-base text-gray-100 leading-relaxed mb-6">
                    {framework.description}
                  </p>

                  {/* When to Use */}
                  <div className="mb-6">
                    <h4 className="text-xs font-semibold uppercase tracking-wide text-terminal-gold mb-3">
                      When to Use This
                    </h4>
                    <ul className="space-y-2">
                      {framework.whenToUse.map((use, idx) => (
                        <li key={idx} className="flex gap-3 text-sm sm:text-base">
                          <span className="text-terminal-gold">→</span>
                          <span className="text-gray-100">{use}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* How It Works */}
                  <div className="mb-6">
                    <h4 className="text-xs font-semibold uppercase tracking-wide text-terminal-gold mb-4">
                      How It Works
                    </h4>
                    <div className="space-y-4">
                      {framework.howItWorks.map((step, idx) => (
                        <div
                          key={idx}
                          className="flex gap-4 p-4 rounded-lg bg-terminal-gold/5 border border-terminal-gold/20"
                        >
                          <div className="flex-shrink-0 w-8 h-8 rounded bg-terminal-gold text-black flex items-center justify-center font-bold text-sm">
                            {idx + 1}
                          </div>
                          <div>
                            <h5 className="text-sm font-semibold text-white mb-1">
                              {step.step}
                            </h5>
                            <p className="text-sm text-gray-100">
                              {step.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Outcomes */}
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wide text-terminal-gold mb-3">
                      Outcomes
                    </h4>
                    <ul className="space-y-2">
                      {framework.outcomes.map((outcome, idx) => (
                        <li key={idx} className="flex gap-3 text-sm sm:text-base">
                          <span className="text-terminal-gold">→</span>
                          <span className="text-gray-100">{outcome}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </OS8Window>
              ))}
            </div>

            <div className="mt-12 text-center">
              <OS8Window
                title="Methodology Serves Outcome"
                variant="subtle"
                animateIn={false}
              >
                <p className="text-sm sm:text-base text-gray-100 mb-4">
                  These frameworks are tools, not rules. We've used them across dozens of engagements, but we always start with your business needs and adapt our approach accordingly.
                </p>
                <ButtonPrimary href="/contact" size="md">
                  Let's talk about your needs
                </ButtonPrimary>
              </OS8Window>
            </div>
          </div>
        </section>

        {/* Portfolio IP - Proof of Execution */}
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
              title="Portfolio IP—Systematic Execution at Scale"
              variant="featured"
              animateIn={false}
            >
              <div className="text-center mb-8">
                <p className="text-base sm:text-lg text-gray-100">
                  These mental models and frameworks aren't theoretical—we apply them to our own Portfolio IP. Conviction-backed ventures that prove our systematic execution.
                </p>
              </div>

              <div className="mb-8 p-6 rounded-lg border border-terminal-gold/20 bg-terminal-gold/5">
                <div className="grid sm:grid-cols-3 gap-6 mb-6">
                  <div className="text-center">
                    <div className="text-3xl sm:text-4xl font-bold text-terminal-gold mb-2">3</div>
                    <div className="text-sm text-gray-300">Active Ventures</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl sm:text-4xl font-bold text-terminal-gold mb-2">1 mo</div>
                    <div className="text-sm text-gray-300">Concept to Plan</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl sm:text-4xl font-bold text-terminal-gold mb-2">350KB+</div>
                    <div className="text-sm text-gray-300">Documentation</div>
                  </div>
                </div>
                <p className="text-sm text-center text-white">
                  Portfolio IP built with systematic conviction. Zero is live on App Store with 7 working prototypes. Project Atlas has complete technical architecture. Project Amplify has 4 detailed product modules.
                </p>
              </div>

              <div className="space-y-4 mb-8">
                <div className="p-4 rounded-lg border border-terminal-gold/20 bg-black/60">
                  <h4 className="text-lg font-bold mb-2">Zero · AI Email Triage</h4>
                  <p className="text-sm text-gray-100 mb-3">
                    Full transparency: 97% size reduction, 67% faster builds, complete fundraising deck. This is how we prove speed.
                  </p>
                  <Link href="/ventures/zero" className="text-sm text-terminal-gold hover:underline">
                    View complete details →
                  </Link>
                </div>

                <div className="p-4 rounded-lg border border-terminal-gold/20 bg-black/60">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="text-lg font-bold">Project Atlas · CRE Intelligence</h4>
                    <span className="px-2 py-0.5 rounded-full bg-yellow-500/20 text-yellow-400 text-xs font-medium">Stealth</span>
                  </div>
                  <p className="text-sm text-gray-100 mb-3">
                    12-week MVP with complete technical architecture. 103KB of documentation proving we can design complex data platforms.
                  </p>
                  <Link href="/ventures/project-atlas" className="text-sm text-terminal-gold hover:underline">
                    View overview →
                  </Link>
                </div>

                <div className="p-4 rounded-lg border border-terminal-gold/20 bg-black/60">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="text-lg font-bold">Project Amplify · NIL Platform</h4>
                    <span className="px-2 py-0.5 rounded-full bg-yellow-500/20 text-yellow-400 text-xs font-medium">Stealth</span>
                  </div>
                  <p className="text-sm text-gray-100 mb-3">
                    4-module platform with complete user stories and flows. 129KB of documentation showing we can handle complex multi-product builds.
                  </p>
                  <Link href="/ventures/project-amplify" className="text-sm text-terminal-gold hover:underline">
                    View overview →
                  </Link>
                </div>
              </div>

              <div className="text-center">
                <ButtonPrimary href="/ventures" size="md">
                  View Portfolio IP →
                </ButtonPrimary>
              </div>
            </OS8Window>
          </div>
        </section>

        {/* Founder */}
        <section className="relative py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-800 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <ASCIIUnifiedGrid
              opacity={0.06}
              animated={true}
              colorTheme={watercolorThemes.darkGalaxy}
              charSet="default"
            />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-center">
              Meet the Founder
            </h2>

            <OS8Window
              title={`${founderProfile.name} · ${founderProfile.role}`}
              variant="body"
              animateIn={false}
            >
              {/* Tagline */}
              <div className="mb-6">
                <p className="text-sm sm:text-base text-terminal-gold font-medium">
                  {founderProfile.tagline}
                </p>
              </div>

              {/* Bio */}
              <p className="text-sm sm:text-base text-gray-100 leading-relaxed mb-6">
                {founderProfile.bio}
              </p>

              {/* Personal Story */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold uppercase tracking-wide text-terminal-gold mb-4">
                  The Story
                </h4>
                <div className="space-y-4">
                  {founderProfile.personalStory.map((paragraph, index) => (
                    <p key={index} className="text-sm sm:text-base text-gray-100 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Capabilities */}
                <div>
                  <h4 className="text-sm font-semibold uppercase tracking-wide text-terminal-gold mb-3">
                    Capabilities
                  </h4>
                  <ul className="space-y-2">
                    {founderProfile.capabilities.map((capability, index) => (
                      <li key={index} className="flex gap-2 text-sm sm:text-base">
                        <span className="text-terminal-gold">•</span>
                        <span className="text-gray-100">{capability}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Track Record */}
                <div>
                  <h4 className="text-sm font-semibold uppercase tracking-wide text-terminal-gold mb-3">
                    Track Record
                  </h4>
                  <ul className="space-y-2">
                    {founderProfile.trackRecord.map((item, index) => (
                      <li key={index} className="flex gap-2 text-sm sm:text-base">
                        <span className="text-terminal-gold">•</span>
                        <span className="text-gray-100">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Patent */}
              <div className="mt-6 pt-6 border-t border-terminal-gold/20">
                <h4 className="text-sm font-semibold uppercase tracking-wide text-terminal-gold mb-3">
                  Innovation
                </h4>
                <p className="text-sm sm:text-base text-gray-100">
                  <strong className="text-white">Patent:</strong>{' '}
                  <a
                    href={founderProfile.patent.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-terminal-gold hover:underline"
                  >
                    {founderProfile.patent.title}
                  </a>
                  {' '}— {founderProfile.patent.description} ({founderProfile.patent.year})
                </p>
              </div>

              {/* Contact */}
              <div className="mt-6 pt-6 border-t border-terminal-gold/20">
                <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
                  <div>
                    <h4 className="text-sm font-semibold uppercase tracking-wide text-terminal-gold mb-2">
                      Get in Touch
                    </h4>
                    <a
                      href={`mailto:${founderProfile.contact.email}`}
                      className="text-sm sm:text-base text-white hover:text-terminal-gold transition-colors"
                    >
                      {founderProfile.contact.email}
                    </a>
                  </div>
                  {(founderProfile.contact.linkedin || founderProfile.contact.twitter) && (
                    <div className="flex gap-4">
                      {founderProfile.contact.linkedin && (
                        <a
                          href={founderProfile.contact.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-terminal-gold hover:underline text-sm"
                        >
                          LinkedIn →
                        </a>
                      )}
                      {founderProfile.contact.twitter && (
                        <a
                          href={founderProfile.contact.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-terminal-gold hover:underline text-sm"
                        >
                          Twitter →
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </OS8Window>
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
              title="Let's work together"
              variant="cta"
              animateIn={false}
              className="max-w-3xl"
            >
              <div className="space-y-6">
                <p className="text-base text-terminal-gold leading-relaxed text-center">
                  Ready to apply these mental models to your product challenge? Let's talk about how we can help you build conviction.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                  <ButtonPrimary href="/contact" size="lg">
                    Start a conversation
                  </ButtonPrimary>
                  <ButtonSecondary href="/partnerships" size="lg">
                    View Rationale Kits
                  </ButtonSecondary>
                </div>
              </div>
            </OS8Window>
          </div>
        </section>
      </main>

      {/* Sticky CTA Bar */}
      <StickyCTABar
        message="Let's talk about your opportunity"
        ctaText="Get in touch"
        ctaHref="/contact"
        scrollThreshold={0.3}
        storageKey="about-sticky-cta"
      />
    </>
  );
}
