/**
 * Heirloom Case Study - Consolidated Single Page
 *
 * Portfolio piece for investors, potential acqui-hirers, and prospective clients.
 * Streamlined to 6 sections: Hero, At a Glance, The Work, Demo, Results, CTA
 */

'use client';

import './print.css';
import HeroSection from './components/HeroSection';
import AtAGlance from './components/AtAGlance';
import PrototypeEmbed from './components/PrototypeEmbed';
import Link from 'next/link';
import { ArrowRight } from '@/lib/icons';

export default function HeirloomCaseStudy() {
  return (
    <main className="heirloom-case-study">
      {/* 1. Hero */}
      <HeroSection />

      {/* 2. At a Glance */}
      <section className="bg-gray-50 py-10 md:py-12">
        <div className="container mx-auto px-6 md:px-12 lg:px-16">
          <div className="mx-auto max-w-5xl">
            <AtAGlance />
          </div>
        </div>
      </section>

      {/* 3. The Work: Technical Approach + Key Decisions */}
      <section className="bg-white py-10 md:py-12">
        <div className="container mx-auto px-6 md:px-12 lg:px-16">
          <div className="mx-auto max-w-5xl">
            <h2 className="mb-6 text-xl md:text-2xl font-bold text-[#2D2D2D]">
              Technical Approach
            </h2>
            
            {/* Architecture Overview */}
            <div className="rounded-xl border-2 border-[#E85D4D]/30 bg-[#FBF8F3] p-5 md:p-6 mb-6">
              <div className="grid md:grid-cols-4 gap-4">
                <TechCard
                  title="Native iOS"
                  description="SwiftUI + SwiftData for responsive, premium UX"
                  highlight="Sub-2s launch"
                />
                <TechCard
                  title="AI Extraction"
                  description="Claude 3.5 parses ingredients; vision models scan cookbooks"
                  highlight="No typing"
                />
                <TechCard
                  title="Cloud Sync"
                  description="CloudKit enables seamless iCloud sync across devices"
                  highlight="0.8s sync"
                />
                <TechCard
                  title="Native APIs"
                  description="EventKit + Reminders for smart shopping lists"
                  highlight="iOS-first"
                />
              </div>
            </div>

            {/* Key Decisions */}
            <h2 className="mb-4 text-xl md:text-2xl font-bold text-[#2D2D2D]">
              Key Decisions
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              <DecisionCard
                title="Vintage Card Design"
                description="Recipes as artifacts, not data. 50+ stickers, handwriting fonts, customizable aesthetics preserve personality."
              />
              <DecisionCard
                title="Recipe-LD + AI Parsing"
                description="500+ sites via structured data, plus Claude-powered extraction for messy text and cookbook photos."
              />
              <DecisionCard
                title="iOS-First, Expand Later"
                description="Native performance > cross-platform compromise. SwiftUI Previews enabled rapid daily iteration cycles."
              />
            </div>
          </div>
        </div>
      </section>

      {/* 4. Demo - PRESERVED EXACTLY */}
      <PrototypeEmbed />

      {/* 5. Results */}
      <section className="bg-gray-50 py-10 md:py-12">
        <div className="container mx-auto px-6 md:px-12 lg:px-16">
          <div className="mx-auto max-w-5xl">
            <h2 className="mb-6 text-xl md:text-2xl font-bold text-[#2D2D2D]">
              Results & Learnings
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Results */}
              <div className="rounded-xl border border-[#E85D4D]/30 bg-white p-5">
                <h3 className="text-lg font-bold text-[#E85D4D] mb-4">Beta Metrics</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-[#E85D4D]">✓</span>
                    <span><strong className="text-[#2D2D2D]">150+ beta users</strong> on TestFlight</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#E85D4D]">✓</span>
                    <span><strong className="text-[#2D2D2D]">2,400+ recipes</strong> captured via AI</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#E85D4D]">✓</span>
                    <span><strong className="text-[#2D2D2D]">4.8/5 rating</strong> from beta testers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#E85D4D]">✓</span>
                    <span><strong className="text-[#2D2D2D]">500+ sites</strong> supported for import</span>
                  </li>
                </ul>
              </div>

              {/* Learnings */}
              <div className="rounded-xl border border-gray-300 bg-white p-5">
                <h3 className="text-lg font-bold text-[#2D2D2D] mb-4">What We Learned</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-gray-400">•</span>
                    <span><strong className="text-[#2D2D2D]">AI should assist, not replace</strong> — users want control over recipe editing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gray-400">•</span>
                    <span><strong className="text-[#2D2D2D]">Workflow integration is critical</strong> — iOS Reminders beat in-app lists</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gray-400">•</span>
                    <span><strong className="text-[#2D2D2D]">Personalization beats automation</strong> — meal planning needs user control</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CTA */}
      <section className="bg-gradient-to-br from-[#FBF8F3] to-white py-10 md:py-12">
        <div className="container mx-auto px-6 md:px-12 lg:px-16">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="mb-4 text-xl md:text-2xl font-bold text-[#2D2D2D]">
              Try Heirloom or Work With Us
            </h2>
            <p className="mb-8 text-gray-700">
              Join the TestFlight beta, or let's build your next product together.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/heirloom"
                className="inline-flex items-center gap-2 rounded-full bg-[#E85D4D] px-6 py-3 font-semibold text-white shadow-xl transition-all hover:bg-[#d54d3d] hover:scale-105"
              >
                Join Beta
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full border-2 border-[#E85D4D] px-6 py-3 font-semibold text-[#E85D4D] transition-all hover:bg-[#E85D4D] hover:text-white"
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

// Tech Card Component
function TechCard({ title, description, highlight }: { title: string; description: string; highlight: string }) {
  return (
    <div className="text-center p-3">
      <div className="text-sm font-bold text-[#E85D4D] mb-1">{title}</div>
      <p className="text-xs text-gray-600 mb-2">{description}</p>
      <span className="inline-block px-2 py-0.5 bg-[#E85D4D]/10 text-[10px] font-semibold text-[#E85D4D] rounded-full">
        {highlight}
      </span>
    </div>
  );
}

// Compact Decision Card
function DecisionCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="rounded-lg border border-gray-300 bg-white p-4 hover:border-[#E85D4D]/40 transition-colors">
      <h3 className="text-base font-bold text-[#2D2D2D] mb-2">{title}</h3>
      <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
}
