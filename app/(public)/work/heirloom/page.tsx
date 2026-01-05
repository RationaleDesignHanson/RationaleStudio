/**
 * Heirloom Case Study - Consolidated Single Page
 *
 * Portfolio piece emphasizing validation journey and learnings.
 * Heirloom is in beta, so the story arc focuses on what we're learning.
 */

'use client';

import './print.css';
import HeroSection from './components/HeroSection';
import AtAGlance from './components/AtAGlance';
import ChallengeSection from './components/ChallengeSection';
import ApproachSection from './components/ApproachSection';
import PrototypeEmbed from './components/PrototypeEmbed';
import FeatureGrid from './components/FeatureGrid';
import FinalCTA from './components/FinalCTA';
import Link from 'next/link';
import { ArrowRight } from '@/lib/icons';

export default function HeirloomCaseStudy() {
  return (
    <main className="heirloom-case-study">
      {/* 1. Hero */}
      <HeroSection />

      {/* 2. At a Glance */}
      <section className="bg-gray-50 py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-6 md:px-12 lg:px-16">
          <div className="mx-auto max-w-5xl">
            <AtAGlance />
          </div>
        </div>
      </section>

      {/* 3. The Opportunity */}
      <section className="bg-white py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-6 md:px-12 lg:px-16">
          <div className="mx-auto max-w-5xl">
            <h2 className="mb-6 text-2xl md:text-3xl lg:text-4xl font-bold text-[#2D2D2D] md:text-5xl">
              The Opportunity
            </h2>
            <p className="mb-8 text-lg text-gray-700 max-w-3xl">
              Recipe preservation + meal planning matters for both market and personal reasons.
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-[#E85D4D]">Market Opportunity</h3>
                <p className="text-gray-700 leading-relaxed">
                  The recipe app market is $4.2B TAM with 14M iOS users. But existing apps treat recipes like data—plain text, no personality. They optimize for organization, not preservation.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  <strong className="text-[#2D2D2D]">Our insight:</strong> Families don't want a database. They want to preserve recipes as artifacts that carry stories, notes, and memories—not just functional cooking instructions.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-bold text-[#E85D4D]">Personal Angle</h3>
                <p className="text-gray-700 leading-relaxed">
                  Grandma's recipe cards aren't just instructions. They're heirlooms. Coffee stains, handwritten notes, worn edges aren't imperfections—they're part of the story.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  <strong className="text-[#2D2D2D]">The problem:</strong> When you digitize these cards, you lose the personality. When you share them, you lose the customization. Heirloom preserves both.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. The Challenge */}
      <ChallengeSection />

      {/* 5. Design Challenges */}
      <section className="bg-gray-50 py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-6 md:px-12 lg:px-16">
          <div className="mx-auto max-w-5xl">
            <h2 className="mb-6 text-2xl md:text-3xl lg:text-4xl font-bold text-[#2D2D2D] md:text-5xl">
              Design Challenges
            </h2>
            <p className="mb-8 text-lg text-gray-700 max-w-3xl">
              Three core challenges that shaped Heirloom's design and technical approach.
            </p>

            <div className="space-y-6">
              <DesignChallengeCard
                title="Recipe Data is Messy"
                description="Recipes come in every format: handwritten cards, website URLs, cookbook photos, family texts. Standardizing this into a usable data model while preserving personality required careful design."
                solution="AI-powered extraction (Claude for parsing, vision models for cookbook scanning) handles the messy input. Vintage card design preserves personality in the output."
              />
              <DesignChallengeCard
                title="Heritage Recipes Need Special Handling"
                description="Family recipes have stories, notes, modifications across generations. A simple ingredient list doesn't capture 'Mom's secret ingredient' or 'Grandma always doubled this.'"
                solution="Card-based design with back-of-card notes, stickers, and timeline view. Each generation can add their modifications while preserving the original."
              />
              <DesignChallengeCard
                title="Meal Planning Integration"
                description="Recipes aren't isolated—they're part of meal planning. But most recipe apps don't connect to shopping lists or meal calendars."
                solution="iOS Reminders integration creates smart shopping lists. EventKit sync adds recipes to calendar. Native iOS integrations make meal planning seamless."
              />
            </div>
          </div>
        </div>
      </section>

      {/* 6. Our Approach */}
      <ApproachSection />

      {/* 7. Prototype Evolution */}
      <section className="bg-white py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-6 md:px-12 lg:px-16">
          <div className="mx-auto max-w-5xl">
            <h2 className="mb-6 text-2xl md:text-3xl lg:text-4xl font-bold text-[#2D2D2D] md:text-5xl">
              Prototype Evolution
            </h2>
            <p className="mb-12 text-lg text-gray-700 max-w-3xl">
              Three iterations that shaped Heirloom's direction.
            </p>

            <div className="space-y-8">
              <PrototypeIteration
                iteration="Iteration 1"
                title="Recipe Capture"
                description="Started with cookbook scanning. Built vision-based OCR to extract recipes from photographed cookbook pages."
                learning="Users loved the capture flow, but wanted more control. We learned: AI should assist, not replace manual editing."
                status="Shipped"
              />
              <PrototypeIteration
                iteration="Iteration 2"
                title="Shopping Lab"
                description="Built smart shopping list consolidation. Multiple recipes → one consolidated list with unit conversion."
                learning="Shopping lists are powerful, but only if they integrate with existing workflows. iOS Reminders integration became critical."
                status="Shipped"
              />
              <PrototypeIteration
                iteration="Iteration 3"
                title="Dinner Party Planner"
                description="Timeline-based meal planning. Select recipes, set dinner time, get staggered start times so everything finishes together."
                learning="Timeline visualization is compelling, but meal planning is personal. Users want control over sequencing, not just automation."
                status="In Beta"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 8. Interactive Prototypes (Embedded Inline) */}
      <PrototypeEmbed />

      {/* 9. Technical Approach */}
      <section className="bg-gray-50 py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-6 md:px-12 lg:px-16">
          <div className="mx-auto max-w-5xl">
            <h2 className="mb-6 text-2xl md:text-3xl lg:text-4xl font-bold text-[#2D2D2D] md:text-5xl">
              Technical Approach
            </h2>
            <p className="mb-12 text-lg text-gray-700 max-w-3xl">
              Native iOS stack optimized for performance and seamless iCloud sync.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <TechApproachCard
                title="AI Extraction"
                description="Claude 3.5 parses ingredients and instructions from messy text. Vision models scan cookbook pages. No manual typing required."
              />
              <TechApproachCard
                title="Data Model"
                description="SwiftData with CloudKit sync. Recipes, notes, stickers, timeline—all synced across devices. Sub-2s launch, 0.8s sync."
              />
              <TechApproachCard
                title="Cross-Platform Considerations"
                description="iOS-first, but data model designed for future expansion. CloudKit provides foundation for web/macOS versions later."
              />
              <TechApproachCard
                title="Native Integrations"
                description="EventKit for calendar, Reminders for shopping lists. Native iOS APIs provide seamless device integration."
              />
            </div>
          </div>
        </div>
      </section>

      {/* 10. Feature Grid */}
      <FeatureGrid />

      {/* 11. Current Status */}
      <section className="bg-white py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-6 md:px-12 lg:px-16">
          <div className="mx-auto max-w-5xl">
            <h2 className="mb-6 text-2xl md:text-3xl lg:text-4xl font-bold text-[#2D2D2D] md:text-5xl">
              Current Status
            </h2>
            <p className="mb-12 text-lg text-gray-700 max-w-3xl">
              Beta metrics and what we're testing now.
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <StatusMetric
                label="Beta Users"
                value="150+"
                description="TestFlight beta active"
              />
              <StatusMetric
                label="Recipes Captured"
                value="2,400+"
                description="Via AI extraction"
              />
              <StatusMetric
                label="App Store Rating"
                value="4.8/5"
                description="From beta testers"
              />
            </div>

            <div className="rounded-lg border-2 border-[#E85D4D] bg-[#E85D4D]/5 p-6">
              <h3 className="text-lg font-bold text-[#E85D4D] mb-3">What We're Testing Now</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-[#E85D4D] mt-1">•</span>
                  <span><strong className="text-[#2D2D2D]">Card customization:</strong> Are 50+ stickers enough? Do users want more control over card aesthetics?</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#E85D4D] mt-1">•</span>
                  <span><strong className="text-[#2D2D2D]">Shopping list integration:</strong> Is iOS Reminders the right approach, or do users want in-app lists?</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#E85D4D] mt-1">•</span>
                  <span><strong className="text-[#2D2D2D]">Recipe sharing:</strong> How do families want to share recipes? What gets preserved vs. customized?</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 12. What's Next */}
      <section className="bg-gray-50 py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-6 md:px-12 lg:px-16">
          <div className="mx-auto max-w-5xl">
            <h2 className="mb-6 text-2xl md:text-3xl lg:text-4xl font-bold text-[#2D2D2D] md:text-5xl">
              What's Next
            </h2>
            <p className="mb-8 text-lg text-gray-700 max-w-3xl">
              Roadmap hints without overpromising.
            </p>

            <div className="space-y-4 text-gray-700">
              <p>
                <strong className="text-[#2D2D2D]">Q1 2025:</strong> App Store launch with core recipe capture and card customization. Focus on nailing the core experience before adding complexity.
              </p>
              <p>
                <strong className="text-[#2D2D2D]">Q2 2025:</strong> Enhanced sharing features based on beta feedback. Family recipe timelines, collaborative editing, recipe inheritance.
              </p>
              <p>
                <strong className="text-[#2D2D2D]">Future:</strong> Web version for recipe browsing, macOS app for recipe management, expanded AI capabilities for meal planning.
              </p>
            </div>

            <div className="mt-8 rounded-lg border border-gray-300 bg-white p-6">
              <p className="text-sm text-gray-600">
                <strong className="text-[#2D2D2D]">Note:</strong> Roadmap is flexible. Beta feedback will shape priorities. We're building in public and iterating based on real user needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 13. CTA */}
      <section className="bg-gradient-to-br from-[#FBF8F3] to-white py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-6 md:px-12 lg:px-16">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="mb-6 text-2xl md:text-3xl lg:text-4xl font-bold text-[#2D2D2D]">
              Try Heirloom or Work With Us
            </h2>
            <p className="mb-12 text-lg md:text-xl text-gray-700">
              Join the TestFlight beta, or let's build your next product together.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/heirloom"
                className="inline-flex items-center gap-2 rounded-full bg-[#E85D4D] px-8 py-4 text-lg font-semibold text-white shadow-xl transition-all hover:bg-[#d54d3d] hover:scale-105"
              >
                Join Beta
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full border-2 border-[#E85D4D] px-8 py-4 text-lg font-semibold text-[#E85D4D] transition-all hover:bg-[#E85D4D] hover:text-white"
              >
                Work With Us
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <FinalCTA />
    </main>
  );
}

// Design Challenge Card Component
function DesignChallengeCard({
  title,
  description,
  solution,
}: {
  title: string;
  description: string;
  solution: string;
}) {
  return (
    <div className="border border-gray-300 rounded-lg p-6 md:p-8 bg-white hover:border-[#E85D4D]/50 transition-colors">
      <h3 className="text-xl md:text-2xl font-bold text-[#2D2D2D] mb-3">{title}</h3>
      <p className="text-gray-700 mb-4 leading-relaxed">{description}</p>
      <div className="pt-4 border-t border-gray-200">
        <p className="text-sm text-gray-600">
          <span className="font-semibold text-[#E85D4D]">Solution:</span> {solution}
        </p>
      </div>
    </div>
  );
}

// Prototype Iteration Component
function PrototypeIteration({
  iteration,
  title,
  description,
  learning,
  status,
}: {
  iteration: string;
  title: string;
  description: string;
  learning: string;
  status: string;
}) {
  return (
    <div className="border-l-4 border-[#E85D4D] pl-6 md:pl-8">
      <div className="flex items-center gap-3 mb-2">
        <span className="font-mono text-sm text-gray-500">{iteration}</span>
        <span className="px-3 py-1 bg-[#E85D4D]/10 text-[#E85D4D] rounded-full text-xs font-semibold">
          {status}
        </span>
      </div>
      <h3 className="text-xl md:text-2xl font-bold text-[#2D2D2D] mb-3">{title}</h3>
      <p className="text-gray-700 mb-3 leading-relaxed">{description}</p>
      <div className="rounded-lg bg-gray-50 p-4">
        <p className="text-sm text-gray-600">
          <span className="font-semibold text-[#E85D4D]">What we learned:</span> {learning}
        </p>
      </div>
    </div>
  );
}

// Tech Approach Card Component
function TechApproachCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="border border-gray-300 rounded-lg p-6 bg-white">
      <h3 className="text-lg font-bold text-[#E85D4D] mb-2">{title}</h3>
      <p className="text-sm text-gray-700 leading-relaxed">{description}</p>
    </div>
  );
}

// Status Metric Component
function StatusMetric({
  label,
  value,
  description,
}: {
  label: string;
  value: string;
  description: string;
}) {
  return (
    <div className="text-center p-6 bg-white border border-gray-300 rounded-lg">
      <div className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">
        {label}
      </div>
      <div className="text-3xl font-bold text-[#E85D4D] mb-1">{value}</div>
      <div className="text-sm text-gray-600">{description}</div>
    </div>
  );
}
