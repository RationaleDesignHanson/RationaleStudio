/**
 * Zero Case Study - Consolidated Single Page
 *
 * Portfolio piece for investors, potential acqui-hirers, and prospective clients.
 * Tells Rationale's story about building Zero in a single cohesive narrative.
 */

'use client';

import HeroSection from './components/HeroSection';
import AtAGlance from './components/AtAGlance';
import ChallengeSection from './components/ChallengeSection';
import ApproachSection from './components/ApproachSection';
import PrototypeEmbed from './components/PrototypeEmbed';
import FinalCTA from './components/FinalCTA';
import Link from 'next/link';
import { ArrowRight } from '@/lib/icons';

export default function ZeroCaseStudy() {
  return (
    <main className="zero-case-study">
      {/* 1. Hero */}
      <HeroSection />

      {/* 2. At a Glance */}
      <section className="bg-gray-900 py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-6 md:px-12 lg:px-16">
          <div className="mx-auto max-w-5xl">
            <AtAGlance />
          </div>
        </div>
      </section>

      {/* 3. The Challenge */}
      <ChallengeSection />

      {/* 4. Our Approach */}
      <ApproachSection />

      {/* 5. Key Decisions */}
      <section className="bg-gray-900 py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-6 md:px-12 lg:px-16">
          <div className="mx-auto max-w-5xl">
            <h2 className="mb-6 text-2xl md:text-3xl lg:text-4xl font-bold text-white md:text-5xl">
              Key Decisions
            </h2>
            <p className="mb-12 text-lg text-gray-300 max-w-3xl">
              Three pivotal choices that shaped Zero's direction and execution.
            </p>

            <div className="space-y-8">
              <DecisionCard
                title="Swipe Interface Over Traditional Lists"
                rationale="We tested both card-based swipe and traditional list UIs. Swipe won because it makes actions immediate—no tap-to-open, no context switching. Users complete tasks 3x faster."
                impact="This decision drove our entire interaction model and influenced how we structured AI outputs."
              />
              <DecisionCard
                title="43 Intent Categories (Not 10, Not 100)"
                rationale="Too few categories miss nuance (bills vs. subscriptions). Too many create confusion. 43 categories hit the sweet spot: specific enough to be useful, broad enough to cover 95% of inbox actions."
                impact="This taxonomy became our core differentiator and required careful prompt engineering with Claude 3.5."
              />
              <DecisionCard
                title="Native iOS First, Web Later"
                rationale="Email actions happen on mobile. Native iOS gives us device integrations (Calendar, Contacts, Wallet) that web can't match. We can add web later, but mobile-first ensures we nail the core experience."
                impact="This accelerated our timeline—we shipped to TestFlight in 30 days instead of building cross-platform."
              />
            </div>
          </div>
        </div>
      </section>

      {/* 6. Technical Highlights (Condensed Architecture) */}
      <section className="bg-black py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-6 md:px-12 lg:px-16">
          <div className="mx-auto max-w-5xl">
            <h2 className="mb-6 text-2xl md:text-3xl lg:text-4xl font-bold text-white md:text-5xl">
              Technical Highlights
            </h2>
            <p className="mb-12 text-lg text-gray-300 max-w-3xl">
              Production-ready architecture built for scale and security.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <TechHighlight
                title="Gmail OAuth Integration"
                description="Secure OAuth 2.0 with read-only permissions. Encrypted token storage. No email content stored—only metadata and extracted entities."
              />
              <TechHighlight
                title="AI Classification Pipeline"
                description="Claude 3.5 Sonnet classifies emails into 43 intent categories. Entity extraction pulls tracking numbers, due dates, amounts, event details."
              />
              <TechHighlight
                title="10-Service Backend"
                description="Microservices on Google Cloud Run. FastAPI + PostgreSQL. Async job queue handles classification without blocking UI."
              />
              <TechHighlight
                title="Native iOS SwiftUI"
                description="Device integrations: Add to Calendar, Save to Contacts, Add to Wallet. Works offline with synced data. Native performance."
              />
            </div>

            <div className="rounded-lg border border-terminal-gold/30 bg-terminal-gold/5 p-6">
              <p className="text-sm text-gray-300">
                <span className="font-bold text-terminal-gold">Security First:</span> OAuth tokens encrypted, read-only email access, no content storage. Privacy-focused design from day one.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Interactive Demo (Embedded Inline) */}
      <PrototypeEmbed />

      {/* 8. Outcomes & Learnings */}
      <section className="bg-gray-900 py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-6 md:px-12 lg:px-16">
          <div className="mx-auto max-w-5xl">
            <h2 className="mb-6 text-2xl md:text-3xl lg:text-4xl font-bold text-white md:text-5xl">
              Outcomes & Learnings
            </h2>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div>
                <h3 className="text-xl font-bold text-terminal-gold mb-4">Results</h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="text-terminal-gold mt-1">✓</span>
                    <span><strong className="text-white">30 days</strong> from concept to TestFlight beta</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-terminal-gold mt-1">✓</span>
                    <span><strong className="text-white">91.7%</strong> baseline classification accuracy</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-terminal-gold mt-1">✓</span>
                    <span><strong className="text-white">43 intent categories</strong> covering 95% of inbox actions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-terminal-gold mt-1">✓</span>
                    <span><strong className="text-white">Production-ready</strong> architecture scaling to 10k+ users</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-terminal-gold mb-4">What We'd Do Differently</h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="text-gray-500 mt-1">•</span>
                    <span><strong className="text-white">Start with user testing earlier:</strong> We built the swipe interface based on intuition. User testing confirmed it, but earlier validation would have saved iteration cycles.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gray-500 mt-1">•</span>
                    <span><strong className="text-white">Invest in corpus building:</strong> Classification accuracy improves with more examples. We'd start building the corpus from day one, not after MVP.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gray-500 mt-1">•</span>
                    <span><strong className="text-white">Design for multi-account from the start:</strong> Gmail OAuth works great, but we built single-account first. Multi-account support requires refactoring.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. CTA */}
      <section className="bg-gradient-to-br from-gray-900 via-black to-gray-900 py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-6 md:px-12 lg:px-16">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="mb-6 text-2xl md:text-3xl lg:text-4xl font-bold text-white">
              Try Zero or Work With Us
            </h2>
            <p className="mb-12 text-lg md:text-xl text-gray-300">
              Experience the product yourself, or let's build your next product together.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/zero"
                className="inline-flex items-center gap-2 rounded-full bg-terminal-gold px-8 py-4 text-lg font-semibold text-black shadow-xl transition-all hover:bg-[#FFE34D] hover:scale-105"
              >
                Try Zero
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full border-2 border-terminal-gold px-8 py-4 text-lg font-semibold text-terminal-gold transition-all hover:bg-terminal-gold hover:text-black"
              >
                Work With Us
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

// Decision Card Component
function DecisionCard({
  title,
  rationale,
  impact,
}: {
  title: string;
  rationale: string;
  impact: string;
}) {
  return (
    <div className="border border-gray-700 rounded-lg p-6 md:p-8 bg-gray-800/50 hover:border-terminal-gold/50 transition-colors">
      <h3 className="text-xl md:text-2xl font-bold text-white mb-3">{title}</h3>
      <p className="text-gray-300 mb-4 leading-relaxed">{rationale}</p>
      <div className="pt-4 border-t border-gray-700">
        <p className="text-sm text-gray-400">
          <span className="font-semibold text-terminal-gold">Impact:</span> {impact}
        </p>
      </div>
    </div>
  );
}

// Tech Highlight Component
function TechHighlight({ title, description }: { title: string; description: string }) {
  return (
    <div className="border border-gray-700 rounded-lg p-6 bg-gray-800/50">
      <h3 className="text-lg font-bold text-terminal-gold mb-2">{title}</h3>
      <p className="text-sm text-gray-300 leading-relaxed">{description}</p>
    </div>
  );
}
