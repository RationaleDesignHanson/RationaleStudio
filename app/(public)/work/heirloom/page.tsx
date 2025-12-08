/**
 * Heirloom Product Page
 *
 * Native iOS recipe app preserving family cooking heritage
 * Focus on narrative and family story over technical granularity
 */

'use client';

import Link from 'next/link';
import { ASCIIUnifiedGrid } from '@/components/visual';
import { watercolorThemes } from '@/lib/theme/watercolor-palette';

export default function HeirloomPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-800">
        <div className="max-w-5xl mx-auto">
          <Link
            href="/work"
            className="text-sm text-gray-400 hover:text-[#00D9FF] font-semibold transition-colors mb-6 inline-block"
          >
            ← Back to Work
          </Link>

          <p className="text-xs sm:text-sm font-mono text-[#00D9FF] tracking-widest mb-4">
            RATIONALE PRODUCT // IN DEVELOPMENT
          </p>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
            Heirloom: Recipe Heritage
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl text-gray-300 leading-relaxed max-w-3xl mb-6">
            Your grandmother's handwritten recipe cards are fading. Her techniques live only in memory.
            In one generation, family cooking heritage disappears. Heirloom preserves it before it's too late.
          </p>

          <div className="mb-8">
            <Link
              href="/contact"
              className="inline-block px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base bg-[#00D9FF] hover:bg-[#00D9FF]/80 text-black font-semibold transition-all"
            >
              Follow Development
            </Link>
          </div>

          {/* Quick Status */}
          <HeirloomQuickStatus />
        </div>
      </section>

      {/* The Problem */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-800">
        <div className="absolute inset-0 pointer-events-none">
          <ASCIIUnifiedGrid
            opacity={0.04}
            animated={true}
            colorTheme={watercolorThemes.terminalSubtle}
            charSet="default"
          />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto">
          {/* Section Header */}
          <div className="mb-8">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              The Problem: Lost Family Recipes
            </h2>
            <div className="h-1 w-20 bg-[#00D9FF]" />
          </div>

          {/* Content */}
          <div className="space-y-6 text-base sm:text-lg text-gray-300 leading-relaxed">
            <p>
              Your grandmother's sauce recipe is written on a stained index card from 1967.
              The handwriting is fading. <span className="font-bold text-white">You've been meaning to preserve it for years.</span>
            </p>
            <p>
              Your dad makes the family lasagna every Thanksgiving, but he doesn't measure anything.
              He cooks by feel. <span className="font-bold text-white">When he's gone, so is the recipe.</span>
            </p>
            <p>
              Recipe apps treat cooking like data entry. They don't understand that recipes carry stories,
              techniques, and family history. <span className="font-bold text-white">They're optimized for convenience, not preservation.</span>
            </p>

            {/* Solution Statement */}
            <div className="mt-8 pt-6 border-t border-[#00D9FF]/30">
              <p className="text-lg sm:text-xl font-semibold text-[#00D9FF]">
                Heirloom captures recipes naturally—photos, voice notes, family stories—then preserves them
                with beautiful presentation that honors the heritage. Native iOS app built for families, not databases.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* App Showcase */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-800">
        <div className="absolute inset-0 pointer-events-none">
          <ASCIIUnifiedGrid
            opacity={0.04}
            animated={true}
            colorTheme={watercolorThemes.terminalSubtle}
            charSet="default"
          />
        </div>
        <div className="relative z-10 max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              How Heirloom Works
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Preserve recipes, build community through food
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              number="1"
              title="Smart Capture"
              description="Photograph recipe cards, record voice notes of techniques, or type naturally. Heirloom understands all formats."
              color="#E54B4B"
            />
            <FeatureCard
              number="2"
              title="Personal Expression"
              description="Add family stories, cooking memories, and photos of finished dishes. Recipes become living family history."
              color="#D4A574"
            />
            <FeatureCard
              number="3"
              title="Community Building"
              description="Share recipes for dinner parties, family gatherings, holiday events, and cultural exchanges. Food brings people together."
              color="#00D9FF"
            />
          </div>

          <div className="mt-12 text-center">
            <div className="inline-block bg-gray-900/50 border border-gray-700 rounded-lg p-6 max-w-2xl">
              <p className="text-sm text-gray-300 leading-relaxed">
                <span className="font-semibold text-white">Native iOS design:</span> SwiftUI interface with
                warm color palette (Cream, Tomato, Amber) designed to feel like family recipe cards, not sterile databases.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Development Progress */}
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
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              Development Progress
            </h2>
            <p className="text-lg text-gray-300">
              Building fast with systematic execution
            </p>
          </div>

          <DevelopmentTimeline />
        </div>
      </section>

      {/* Why We Built This */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-800">
        <div className="absolute inset-0 pointer-events-none">
          <ASCIIUnifiedGrid
            opacity={0.04}
            animated={true}
            colorTheme={watercolorThemes.terminalSubtle}
            charSet="default"
          />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto">
          {/* Section Header */}
          <div className="mb-8">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              Why We Built Heirloom
            </h2>
            <div className="h-1 w-20 bg-[#00D9FF]" />
          </div>

          {/* Content - Left Border Cards */}
          <div className="space-y-6">
            {/* Personal Story */}
            <div className="p-6 bg-gray-900/30 border-l-4 border-[#00D9FF] rounded-r-lg">
              <h3 className="text-xl font-bold text-white mb-3">Personal Story</h3>
              <p className="text-base text-gray-300 leading-relaxed">
                We all have family recipes we've been meaning to preserve. Handwritten cards fading,
                techniques living only in memory, stories getting lost between generations. This isn't
                a product problem we read about—it's personal.
              </p>
            </div>

            {/* Speed of Execution */}
            <div className="p-6 bg-gray-900/30 border-l-4 border-[#00D9FF] rounded-r-lg">
              <h3 className="text-xl font-bold text-white mb-3">Speed of Execution</h3>
              <p className="text-base text-gray-300 leading-relaxed">
                Heirloom demonstrates how Rationale builds products: validate fast, ship faster.
                We're applying the same methodology we bring to client engagements—systematic velocity
                with clean architecture.
              </p>
            </div>

            {/* Native iOS Excellence */}
            <div className="p-6 bg-gray-900/30 border-l-4 border-[#00D9FF] rounded-r-lg">
              <h3 className="text-xl font-bold text-white mb-3">Native iOS Excellence</h3>
              <p className="text-base text-gray-300 leading-relaxed">
                SwiftUI with SwiftData persistence and CloudKit sync. Native iOS designed to feel warm
                and personal—like family recipe cards, not corporate databases. This is how iOS apps
                should feel.
              </p>
            </div>

            {/* Summary CTA */}
            <div className="pt-8 border-t border-[#00D9FF]/30 text-center">
              <p className="text-xl font-bold text-[#00D9FF]">
                Preserve family heritage before it's too late.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What's Next */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-800">
        <div className="absolute inset-0 pointer-events-none">
          <ASCIIUnifiedGrid
            opacity={0.04}
            animated={true}
            colorTheme={watercolorThemes.terminalSubtle}
            charSet="default"
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              What's Next
            </h2>
            <p className="text-lg text-gray-300">
              Shipping to TestFlight soon
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <RoadmapPhase
              phase="Current"
              title="Core Development"
              description="Building capture, storage, and sharing workflows. SwiftUI interface with warm, family-focused design system."
              status="active"
            />
            <RoadmapPhase
              phase="Next"
              title="TestFlight Beta"
              description="Family and friends testing. Gather feedback on capture workflows and sharing features. Target: 5 weeks."
              status="upcoming"
            />
            <RoadmapPhase
              phase="Future"
              title="AI Enhancement"
              description="Smart ingredient parsing, automatic nutrition info, and technique suggestions from family patterns."
              status="planned"
            />
            <RoadmapPhase
              phase="Vision"
              title="Family Network"
              description="Share recipes privately within families. Collaborative family cookbooks. Heritage preservation at scale."
              status="planned"
            />
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 pointer-events-none">
          <ASCIIUnifiedGrid
            opacity={0.04}
            animated={true}
            colorTheme={watercolorThemes.terminalSubtle}
            charSet="default"
          />
        </div>
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base bg-[#00D9FF] hover:bg-[#00D9FF]/80 text-black font-semibold transition-all"
            >
              Get Early Access
            </Link>
            <Link
              href="/work"
              className="px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base border border-gray-300 hover:border-[#00D9FF] text-white font-semibold transition-colors"
            >
              See More Work
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

/**
 * Quick Status Component
 */
function HeirloomQuickStatus() {
  const stats = [
    {
      label: "Status",
      value: "In Development",
      description: "Active build phase",
      color: "#00D9FF"
    },
    {
      label: "Platform",
      value: "Native iOS",
      description: "SwiftUI + SwiftData",
      color: "#D4A574"
    },
    {
      label: "Timeline",
      value: "5 Weeks",
      description: "To TestFlight",
      color: "#E54B4B"
    }
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-3xl">
      {stats.map((stat, i) => (
        <div key={i} className="bg-gray-900/50 border border-gray-700 rounded-lg p-6 hover:border-[#00D9FF] transition-colors">
          <div className="text-2xl font-bold text-white mb-1" style={{ color: stat.color }}>
            {stat.value}
          </div>
          <div className="text-xs font-medium text-white mb-1">{stat.label}</div>
          <div className="text-xs text-gray-400 leading-tight">{stat.description}</div>
        </div>
      ))}
    </div>
  );
}

/**
 * Feature Card Component
 */
function FeatureCard({
  number,
  title,
  description,
  color
}: {
  number: string;
  title: string;
  description: string;
  color: string;
}) {
  return (
    <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-8 hover:border-[#00D9FF] transition-colors">
      <div className="flex items-center gap-3 mb-4">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white text-lg"
          style={{ backgroundColor: color }}
        >
          {number}
        </div>
        <h3 className="text-xl font-bold text-white">{title}</h3>
      </div>
      <p className="text-sm text-gray-300 leading-relaxed">
        {description}
      </p>
    </div>
  );
}

/**
 * Development Timeline Component
 */
function DevelopmentTimeline() {
  const phases = [
    {
      phase: "Week 1",
      title: "Foundation & Planning",
      date: "Dec 2024",
      description: "Architecture design, SwiftData models, and design system setup",
      metrics: ["Models defined", "Colors + Typography"],
      color: "#00D9FF"
    },
    {
      phase: "Week 2",
      title: "Core Features",
      date: "Dec 2024",
      description: "CRUD operations, recipe capture flows, and basic analytics",
      metrics: ["Day 2 complete", "21 Swift files"],
      color: "#D4A574"
    },
    {
      phase: "Weeks 3-5",
      title: "Polish & Beta",
      date: "Jan 2025",
      description: "Styled sharing, CloudKit sync, TestFlight deployment",
      metrics: ["Beta ready", "Family testing"],
      color: "#E54B4B"
    }
  ];

  return (
    <div className="py-8">
      <div className="relative max-w-4xl mx-auto">
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#00D9FF] via-[#D4A574] to-[#E54B4B]" />
        <div className="space-y-12">
          {phases.map((item, index) => (
            <div key={index} className="relative pl-20">
              <div
                className="absolute left-6 top-2 w-5 h-5 rounded-full border-4 border-gray-900"
                style={{ backgroundColor: item.color }}
              />
              <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-6 hover:border-[#00D9FF] transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="text-xs font-mono text-gray-400 mb-1">
                      {item.phase}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-1">
                      {item.title}
                    </h3>
                    <div className="text-sm text-[#00D9FF] font-medium">
                      {item.date}
                    </div>
                  </div>
                </div>
                <p className="text-gray-100 mb-4 text-sm leading-relaxed">
                  {item.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {item.metrics.map((metric, i) => (
                    <div
                      key={i}
                      className="px-3 py-1.5 bg-gray-900 rounded text-xs text-gray-300 border border-gray-700"
                    >
                      {metric}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="relative pl-20 mt-8">
          <div className="absolute left-6 top-2 w-5 h-5">
            <svg viewBox="0 0 20 20" className="w-5 h-5">
              <path
                d="M10 0 L10 15 M5 10 L10 15 L15 10"
                stroke="#4B5563"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="text-gray-500 text-sm font-medium">
            TestFlight → Beta feedback → App Store launch
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Roadmap Phase Component
 */
function RoadmapPhase({
  phase,
  title,
  description,
  status
}: {
  phase: string;
  title: string;
  description: string;
  status: 'active' | 'upcoming' | 'planned';
}) {
  const statusColors = {
    active: '#00D9FF',
    upcoming: '#D4A574',
    planned: '#6B7280'
  };

  const statusLabels = {
    active: 'In Progress',
    upcoming: 'Next',
    planned: 'Planned'
  };

  return (
    <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-6 hover:border-[#00D9FF] transition-colors">
      <div className="flex items-center gap-3 mb-4">
        <div
          className="px-3 py-1 rounded-full text-xs font-medium"
          style={{
            backgroundColor: `${statusColors[status]}20`,
            color: statusColors[status],
            border: `1px solid ${statusColors[status]}`
          }}
        >
          {statusLabels[status]}
        </div>
      </div>
      <div className="mb-2">
        <div className="text-xs font-mono text-gray-400 mb-1">{phase}</div>
        <h3 className="text-lg font-bold text-white">{title}</h3>
      </div>
      <p className="text-sm text-gray-300 leading-relaxed">
        {description}
      </p>
    </div>
  );
}
