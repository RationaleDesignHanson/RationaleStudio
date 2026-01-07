/**
 * Zero Case Study - Consolidated Single Page
 *
 * Portfolio piece for investors, potential acqui-hirers, and prospective clients.
 * Streamlined to 6 sections: Hero, At a Glance, The Work, Demo, Results, CTA
 */

'use client';

import HeroSection from './components/HeroSection';
import AtAGlance from './components/AtAGlance';
import OmnirepoArchitecture from './components/OmnirepoArchitecture';
import PrototypeEmbed from './components/PrototypeEmbed';
import Link from 'next/link';
import { ArrowRight } from '@/lib/icons';

export default function ZeroCaseStudy() {
  return (
    <main className="zero-case-study">
      {/* 1. Hero */}
      <HeroSection />

      {/* 2. Value Prop - The Elevator Pitch */}
      <section className="bg-gradient-to-b from-gray-900 to-black py-10 md:py-14">
        <div className="container mx-auto px-6 md:px-12 lg:px-16">
          <div className="mx-auto max-w-5xl">
            {/* Main Pitch */}
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
                Turn Email Into Actions, Not Homework
              </h2>
              <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                For busy professionals drowning in 50+ daily emails—AI extracts the bills, packages, RSVPs, and forms you need to act on. Swipe to complete. Done.
              </p>
            </div>

            {/* Value Props Grid */}
            <div className="grid sm:grid-cols-3 gap-4 mb-8">
              <ValueCard
                metric="2-3 hours"
                label="saved per week"
                detail="Stop reading 200+ emails. Act on the 12 that matter."
              />
              <ValueCard
                metric="Zero"
                label="missed deadlines"
                detail="Bills, RSVPs, forms surface automatically."
              />
              <ValueCard
                metric="< 5 min"
                label="to inbox zero"
                detail="Swipe through actions, archive the rest."
              />
            </div>

            {/* Transition */}
            <p className="text-center text-lg text-terminal-gold font-medium">
              What if your inbox only showed you what needed action?
            </p>
          </div>
        </div>
      </section>

      {/* 3. At a Glance */}
      <section className="bg-gray-900 py-10 md:py-12">
        <div className="container mx-auto px-6 md:px-12 lg:px-16">
          <div className="mx-auto max-w-5xl">
            <AtAGlance />
          </div>
        </div>
      </section>

      {/* 4. The Work: Architecture + Key Decisions */}
      <OmnirepoArchitecture />
      
      {/* Key Decisions */}
      <section className="bg-gray-900 py-10 md:py-12">
        <div className="container mx-auto px-6 md:px-12 lg:px-16">
          <div className="mx-auto max-w-5xl">
            <h2 className="mb-6 text-xl md:text-2xl font-bold text-white">
              Key Decisions
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              <DecisionCard
                title="Swipe Interface"
                description="Card-based triage makes actions immediate—no tap-to-open. Users complete tasks 3x faster."
              />
              <DecisionCard
                title="43 Intent Categories"
                description="Specific enough to be useful, broad enough to cover 95% of inbox actions. Our core differentiator."
              />
              <DecisionCard
                title="Universal Platform"
                description="Expo + React Native: single codebase, 85% code shared across iOS, Android, web, wearables."
              />
            </div>
          </div>
        </div>
      </section>

      {/* 5. Demo */}
      <PrototypeEmbed />

      {/* 6. Results */}
      <section className="bg-gray-900 py-10 md:py-12">
        <div className="container mx-auto px-6 md:px-12 lg:px-16">
          <div className="mx-auto max-w-5xl">
            <h2 className="mb-6 text-xl md:text-2xl font-bold text-white">
              Results & Learnings
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Results */}
              <div className="rounded-xl border border-terminal-gold/30 bg-gray-800/50 p-5">
                <h3 className="text-lg font-bold text-terminal-gold mb-4">Outcomes</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="text-terminal-gold">✓</span>
                    <span><strong className="text-white">30 days</strong> concept to TestFlight beta</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-terminal-gold">✓</span>
                    <span><strong className="text-white">91.7%</strong> baseline classification accuracy</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-terminal-gold">✓</span>
                    <span><strong className="text-white">43 categories</strong> covering 95% of inbox actions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-terminal-gold">✓</span>
                    <span><strong className="text-white">Production-ready</strong> architecture for 10k+ users</span>
                  </li>
                </ul>
              </div>

              {/* Learnings */}
              <div className="rounded-xl border border-gray-700 bg-gray-800/50 p-5">
                <h3 className="text-lg font-bold text-white mb-4">What We'd Do Differently</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="text-gray-500">•</span>
                    <span><strong className="text-white">Earlier user testing</strong> — intuition was right but validation saves cycles</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gray-500">•</span>
                    <span><strong className="text-white">Corpus building from day one</strong> — classification improves with examples</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gray-500">•</span>
                    <span><strong className="text-white">Multi-account architecture</strong> — design for it early, not after MVP</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. CTA */}
      <section className="bg-gradient-to-br from-gray-900 via-black to-gray-900 py-10 md:py-12">
        <div className="container mx-auto px-6 md:px-12 lg:px-16">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="mb-4 text-xl md:text-2xl font-bold text-white">
              Try Zero or Work With Us
            </h2>
            <p className="mb-8 text-gray-300">
              Experience the product yourself, or let's build your next product together.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/zero"
                className="inline-flex items-center gap-2 rounded-full bg-terminal-gold px-6 py-3 font-semibold text-black shadow-xl transition-all hover:bg-[#FFE34D] hover:scale-105"
              >
                Try Zero
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full border-2 border-terminal-gold px-6 py-3 font-semibold text-terminal-gold transition-all hover:bg-terminal-gold hover:text-black"
              >
                Work With Us
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

// Value Prop Card
function ValueCard({ metric, label, detail }: { metric: string; label: string; detail: string }) {
  return (
    <div className="rounded-xl border border-terminal-gold/30 bg-gray-800/30 p-5 text-center">
      <div className="text-3xl md:text-4xl font-bold text-terminal-gold mb-1">{metric}</div>
      <div className="text-sm font-medium text-white mb-2">{label}</div>
      <p className="text-xs text-gray-400">{detail}</p>
    </div>
  );
}

// Compact Decision Card
function DecisionCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="rounded-lg border border-gray-700 bg-gray-800/50 p-4 hover:border-terminal-gold/40 transition-colors">
      <h3 className="text-base font-bold text-white mb-2">{title}</h3>
      <p className="text-sm text-gray-400 leading-relaxed">{description}</p>
    </div>
  );
}
