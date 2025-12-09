/**
 * Zero Public Marketing Page
 *
 * Full public page showcasing Zero as Rationale's product.
 * Focus on technical execution and development process.
 *
 * CORRECTED VERSION - Accurate claims, proper styling
 */

'use client';

import Link from 'next/link';
import { OS8Window } from '@/components/visual-test';
import { ASCIIUnifiedGrid } from '@/components/visual';
import { watercolorThemes } from '@/lib/theme/watercolor-palette';
import InteractiveDemo from '@/components/zero/InteractiveDemo';
import GalaxyBackground from '@/components/zero/GalaxyBackground';
import { ZeroSequenceDemo } from '@/components/zero-sequence';
import type { Metadata } from 'next';

export default function ZeroPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-800">
        <div className="max-w-5xl mx-auto">
          <Link
            href="/work"
            className="text-sm text-gray-400 hover:text-[#FFD700] font-semibold transition-colors mb-6 inline-block"
          >
            ← Back to Work
          </Link>

          <p className="text-xs sm:text-sm font-mono text-[#FFD700] tracking-widest mb-4">
            RATIONALE PRODUCT // PRODUCTION-READY · PRE-LAUNCH
          </p>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
            Zero: AI Email Intelligence
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl text-gray-300 leading-relaxed max-w-3xl mb-6">
            Your inbox has 47 emails. Buried inside: a bill due tomorrow, a package arriving today, and a permission slip you need to sign. Zero's AI finds these actions and puts them in swipeable cards.
          </p>

          <div className="mb-8">
            <Link
              href="/contact"
              className="inline-block px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base bg-[#FFD700] hover:bg-[#FFE34D] text-black font-semibold transition-all"
            >
              Join Beta Waitlist
            </Link>
          </div>

          {/* Enhanced Quick Stats */}
          <EnhancedQuickStats />
        </div>
      </section>

      {/* The Problem */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-800">
        <div className="relative z-10 max-w-5xl mx-auto">
          {/* Section Header */}
          <div className="mb-8">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              The Problem: Your Inbox Is Full of Hidden Work
            </h2>
          </div>

          {/* Content - Direct Typography */}
          <div className="space-y-6 text-base sm:text-lg text-gray-300 leading-relaxed">
            <p>
              You get <span className="font-bold text-white">47 emails today</span>. Somewhere in there: a bill that's due tomorrow, a package arriving in an hour, a form your kid needs signed, and an event you need to RSVP to. But to find them, you have to read everything.
            </p>
            <p>
              Email tools organize your inbox. They don't extract what matters. You still have to open each email, scan for actions, then context-switch to pay the bill or track the package. <span className="font-bold text-white">Your inbox is a todo list you have to manually decode.</span>
            </p>

            {/* Solution Statement - Yellow emphasis */}
            <div className="mt-8 pt-6 border-t border-[#FFD700]/30">
              <p className="text-lg sm:text-xl font-semibold text-[#FFD700]">
                Zero's AI reads your emails and extracts the actions automatically. RSVP to events. Track packages. Pay bills. Sign forms. All in swipeable cards, sorted into Mail and Ads. No reading. Just acting.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Demo */}
      <section id="demo" className="relative py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-800 overflow-hidden">
        {/* Galaxy Background with Fireflies */}
        <div className="absolute inset-0">
          <GalaxyBackground />
        </div>

        {/* Content on top of galaxy */}
        <div className="relative z-10 max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              Try Zero: Interactive Demo
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Experience Zero's swipe-based email triage. Swipe right to complete actions, left to archive, down to snooze.
            </p>
          </div>

          <div className="max-w-4xl mx-auto mb-8">
            <InteractiveDemo />
          </div>

          {/* What the Production App Adds - Homepage Card Pattern */}
          <div className="max-w-4xl mx-auto">
            <div className="p-6 sm:p-8 bg-gray-900/70 border border-[#FFD700]/30 rounded-lg">
              <h3 className="text-2xl font-bold text-white mb-4">What the Production App Adds</h3>

              <p className="text-gray-300 mb-6 leading-relaxed">
                The production app extends the prototype with real-world integrations, scalable architecture, and native iOS capabilities.
              </p>

              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#FFD700] mt-2 flex-shrink-0" />
                    <span className="text-sm text-gray-300">Real Gmail integration (OAuth 2.0)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#FFD700] mt-2 flex-shrink-0" />
                    <span className="text-sm text-gray-300">AI classification (43 intent categories)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#FFD700] mt-2 flex-shrink-0" />
                    <span className="text-sm text-gray-300">Entity extraction (tracking #s, dates, amounts)</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#FFD700] mt-2 flex-shrink-0" />
                    <span className="text-sm text-gray-300">Native device actions (Calendar, Contacts, Wallet)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#FFD700] mt-2 flex-shrink-0" />
                    <span className="text-sm text-gray-300">10-service backend architecture</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#FFD700] mt-2 flex-shrink-0" />
                    <span className="text-sm text-gray-300">Summarization and smart replies</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-3xl mx-auto mt-6 text-center">
            <p className="text-xs text-gray-500">
              Curious about our process? We built a <a href="/zero/originalprototype" className="text-[#FFD700] hover:underline">weekend prototype</a> to validate the concept before investing in production architecture.
            </p>
          </div>
        </div>
      </section>

      {/* Why We Built Zero */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-800">
        <div className="relative z-10 max-w-5xl mx-auto">
          {/* Section Header */}
          <div className="mb-8">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              Why We Built Zero
            </h2>
          </div>

          {/* Content - OS8Window Grid */}
          <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            <OS8Window title="Personal Need" variant="minimal">
              <p className="text-sm text-gray-600 leading-relaxed">
                As busy professionals and parents, we all drown in email. Bills, packages, permission slips, RSVPs—they're all buried in your inbox, and you have to manually hunt for them every day. Email tools organize. They don't extract actions. That's the gap Zero fills.
              </p>
            </OS8Window>

            <OS8Window title="Proof of Capability" variant="minimal">
              <p className="text-sm text-gray-600 leading-relaxed">
                Zero proves Rationale ships real products, not just client work. We built this to demonstrate our execution capability—same speed and technical depth we bring to client engagements.
              </p>
            </OS8Window>

            <OS8Window title="Validation → Production" variant="minimal">
              <p className="text-sm text-gray-600 leading-relaxed">
                We built a weekend prototype to test the core UX before investing in production infrastructure. Once validated, we designed clean-room production architecture with zero technical debt.
              </p>
            </OS8Window>

            <OS8Window title="Technical Execution" variant="minimal">
              <p className="text-sm text-gray-600 leading-relaxed">
                268 Swift files with protocol-driven architecture. 10 microservices on Google Cloud Run. Gmail OAuth integration. AI classification with 43 intent categories. Native iOS with device integrations (Calendar, Contacts, Wallet).
              </p>
            </OS8Window>
          </div>

          {/* Summary CTA */}
          <div className="mt-8 pt-8 border-t border-[#FFD700]/30 text-center max-w-3xl mx-auto">
            <p className="text-xl font-bold text-[#FFD700]">
              This is how we build products: fast iteration meets technical excellence.
            </p>
          </div>
        </div>
      </section>

      {/* Development Journey */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-800">
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              Development Journey
            </h2>
            <p className="text-lg text-gray-300">
              From weekend prototype to production-ready architecture
            </p>
          </div>

          <DevelopmentTimeline />
        </div>
      </section>

      {/* Technical Architecture */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-800">
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              Technical Architecture
            </h2>
            <p className="text-lg text-gray-300">
              Production-ready systems designed for scale
            </p>
          </div>

          <SystemArchitecture />

          <div className="mt-12">
            <div className="max-w-6xl mx-auto">
              <div className="mb-8 text-center">
                <h3 className="text-3xl font-bold text-white mb-3">See How Zero Classifies Intent Live</h3>
                <p className="text-base text-gray-300 max-w-3xl mx-auto">
                  Test email classification with our golden corpus or your own examples. Watch Zero extract entities, identify intent, and generate response flows in real time—backend included as we refine the system.
                </p>
              </div>
              <div className="relative w-full">
                <ZeroSequenceDemo />
              </div>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}

/**
 * Enhanced Quick Stats Component
 */
function EnhancedQuickStats() {
  const stats = [
    {
      label: "Swift Files",
      value: "268",
      description: "Protocol-driven iOS",
      color: "#FFD700"
    },
    {
      label: "Microservices",
      value: "10",
      description: "Cloud Run backend",
      color: "#4ADE80"
    },
    {
      label: "Intent Categories",
      value: "43",
      description: "AI classification",
      color: "#F59E0B"
    }
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-3xl">
      {stats.map((stat, i) => (
        <div key={i} className="bg-gray-900/50 border border-gray-700 rounded-lg p-6 hover:border-[#FFD700] transition-colors">
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
 * Development Timeline Component
 */
function DevelopmentTimeline() {
  const phases = [
    {
      phase: "Phase 1",
      title: "Problem Discovery",
      date: "Aug 2024",
      description: "Identified inbox management as core workflow friction",
      metrics: ["100+ user interviews", "Hidden work quantified"],
      color: "#FFD700"
    },
    {
      phase: "Phase 2",
      title: "Technical Foundation",
      date: "Sep-Oct 2024",
      description: "Built classification system + working prototype",
      metrics: ["43 intent categories", "Gmail OAuth integration"],
      color: "#FFA500"
    },
    {
      phase: "Phase 3",
      title: "Production MVP",
      date: "Nov 2024",
      description: "Validated accuracy, deployed beta infrastructure",
      metrics: ["91.7% baseline accuracy", "Ready for beta users"],
      color: "#FF8C00"
    }
  ];

  return (
    <div className="py-8">
      <div className="relative max-w-4xl mx-auto">
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#FFD700] via-[#FFA500] to-[#FF8C00]" />
        <div className="space-y-12">
          {phases.map((item, index) => (
            <div key={index} className="relative pl-20">
              <div
                className="absolute left-6 top-2 w-5 h-5 rounded-full border-4 border-gray-900"
                style={{ backgroundColor: item.color }}
              />
              <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-6 hover:border-[#FFD700] transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="text-xs font-mono text-gray-400 mb-1">
                      {item.phase}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-1">
                      {item.title}
                    </h3>
                    <div className="text-sm text-[#FFD700] font-medium">
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
            Beta launch → User feedback → Corpus building
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * System Architecture Component
 */
function SystemArchitecture() {
  return (
    <div className="py-8">
      <div className="relative">
        {/* Flow Caption */}
        <div className="text-sm text-gray-400 mb-6 text-center">
          Data flow through the system
        </div>

        {/* Architecture Flow - Flexbox for linear coherent flow */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-3">
          <ArchComponent
            title="Gmail"
            description="OAuth 2.0"
            tags={["Real inbox", "Read-only"]}
            color="border-gray-600/50"
          />

          <div className="hidden lg:block flex-shrink-0">
            <svg className="w-8 h-8 text-[#FFD700]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </div>

          <div className="lg:hidden flex-shrink-0 rotate-90">
            <svg className="w-6 h-6 text-[#FFD700]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </div>

          <ArchComponent
            title="Backend"
            description="Python/FastAPI"
            tags={["Queue mgmt", "Security"]}
            color="border-gray-600/50"
          />

          <div className="hidden lg:block flex-shrink-0">
            <svg className="w-8 h-8 text-[#FFD700]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </div>

          <div className="lg:hidden flex-shrink-0 rotate-90">
            <svg className="w-6 h-6 text-[#FFD700]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </div>

          <ArchComponent
            title="AI Layer"
            description="Claude 3.5"
            tags={["43 intents", "Actions"]}
            color="border-[#FFD700]/50"
          />

          <div className="hidden lg:block flex-shrink-0">
            <svg className="w-8 h-8 text-[#FFD700]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </div>

          <div className="lg:hidden flex-shrink-0 rotate-90">
            <svg className="w-6 h-6 text-[#FFD700]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </div>

          <ArchComponent
            title="Supabase"
            description="PostgreSQL"
            tags={["Results", "History"]}
            color="border-gray-600/50"
          />

          <div className="hidden lg:block flex-shrink-0">
            <svg className="w-8 h-8 text-[#FFD700]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </div>

          <div className="lg:hidden flex-shrink-0 rotate-90">
            <svg className="w-6 h-6 text-[#FFD700]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </div>

          <ArchComponent
            title="Frontend"
            description="Next.js/React"
            tags={["Dashboard", "Insights"]}
            color="border-gray-600/50"
          />
        </div>

        <div className="mt-12 grid md:grid-cols-3 gap-4">
          <ArchKeyPoint
            title="Security First"
            description="OAuth tokens encrypted, read-only access, no email content stored"
          />
          <ArchKeyPoint
            title="Async Processing"
            description="Background job queue handles classification without blocking UI"
          />
          <ArchKeyPoint
            title="Scalable Design"
            description="Serverless architecture ready for 10k+ users"
          />
        </div>
      </div>
    </div>
  );
}

function ArchComponent({
  title,
  description,
  tags,
  color
}: {
  title: string;
  description: string;
  tags: string[];
  color: string;
}) {
  return (
    <div className={`bg-gray-900/50 border-2 ${color} rounded-lg p-6 text-center hover:border-[#FFD700] transition-colors`}>
      <h3 className="text-lg font-bold text-white mb-1">{title}</h3>
      <div className="text-sm text-gray-400 mb-4">{description}</div>
      <div className="space-y-1">
        {tags.map((tag, i) => (
          <div key={i} className="text-xs text-gray-300 bg-gray-900/50 rounded px-2 py-1">
            {tag}
          </div>
        ))}
      </div>
    </div>
  );
}

function ArchKeyPoint({
  title,
  description
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-6 hover:border-[#FFD700] transition-colors">
      <h4 className="text-sm font-bold text-[#FFD700] mb-2">{title}</h4>
      <p className="text-xs text-gray-100 leading-relaxed">{description}</p>
    </div>
  );
}
