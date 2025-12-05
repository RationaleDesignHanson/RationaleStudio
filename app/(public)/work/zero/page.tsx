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
              The Problem: Your Inbox Is Full of Hidden Work
            </h2>
            <div className="h-1 w-20 bg-[#FFD700]" />
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
      <section id="demo" className="relative py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-800">
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
              Try Zero: Interactive Demo
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Experience Zero's swipe-based email triage. Swipe right to complete actions, left to archive, down to snooze.
            </p>
          </div>

          <div className="max-w-4xl mx-auto mb-8">
            <InteractiveDemo />
          </div>

          <OS8Window
            title="What the Production App Adds"
            variant="minimal"
            className="max-w-3xl mx-auto"
          >
            <div className="grid sm:grid-cols-2 gap-6">
              <ul className="text-sm text-gray-100 space-y-2">
                <li>• Real Gmail integration (OAuth 2.0)</li>
                <li>• AI classification (43 intent categories)</li>
                <li>• Entity extraction (tracking #s, dates, amounts)</li>
              </ul>
              <ul className="text-sm text-gray-100 space-y-2">
                <li>• Native device actions (Calendar, Contacts, Wallet)</li>
                <li>• 10-service backend architecture</li>
                <li>• Summarization and smart replies</li>
              </ul>
            </div>
          </OS8Window>

          <div className="max-w-3xl mx-auto mt-6 text-center">
            <p className="text-xs text-gray-500">
              Curious about our process? We built a <a href="https://swipeer.netlify.app/" target="_blank" rel="noopener noreferrer" className="text-[#FFD700] hover:underline">weekend prototype</a> (password: 111111) to validate the concept before investing in production architecture.
            </p>
          </div>
        </div>
      </section>

      {/* Development Journey */}
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
              Technical Architecture
            </h2>
            <p className="text-lg text-gray-300">
              Production-ready systems designed for scale
            </p>
          </div>

          <SystemArchitecture />

          <div className="mt-12">
            <IntentTaxonomy />
          </div>
        </div>
      </section>

      {/* Why We Built Zero */}
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
              Why We Built Zero
            </h2>
            <div className="h-1 w-20 bg-[#FFD700]" />
          </div>

          {/* Content - Left Border Cards */}
          <div className="space-y-6">
            {/* Personal Need */}
            <div className="p-6 bg-gray-900/30 border-l-4 border-[#FFD700] rounded-r-lg">
              <h3 className="text-xl font-bold text-white mb-3">Personal Need</h3>
              <p className="text-base text-gray-300 leading-relaxed">
                As busy professionals and parents, we all drown in email. Bills, packages, permission slips, RSVPs—they're all buried in your inbox, and you have to manually hunt for them every day. Email tools organize. They don't extract actions. That's the gap Zero fills.
              </p>
            </div>

            {/* Proof of Capability */}
            <div className="p-6 bg-gray-900/30 border-l-4 border-[#FFD700] rounded-r-lg">
              <h3 className="text-xl font-bold text-white mb-3">Proof of Capability</h3>
              <p className="text-base text-gray-300 leading-relaxed">
                Zero proves Rationale ships real products, not just client work. We built this to demonstrate our execution capability—same speed and technical depth we bring to client engagements.
              </p>
            </div>

            {/* Validation → Production */}
            <div className="p-6 bg-gray-900/30 border-l-4 border-[#FFD700] rounded-r-lg">
              <h3 className="text-xl font-bold text-white mb-3">Validation → Production</h3>
              <p className="text-base text-gray-300 leading-relaxed">
                We built a weekend prototype to test the core UX before investing in production infrastructure. Once validated, we designed clean-room production architecture with zero technical debt.
              </p>
            </div>

            {/* Technical Execution */}
            <div className="p-6 bg-gray-900/30 border-l-4 border-[#FFD700] rounded-r-lg">
              <h3 className="text-xl font-bold text-white mb-3">Technical Execution</h3>
              <p className="text-base text-gray-300 leading-relaxed">
                268 Swift files with protocol-driven architecture. 10 microservices on Google Cloud Run. Gmail OAuth integration. AI classification with 43 intent categories. Native iOS with device integrations (Calendar, Contacts, Wallet).
              </p>
            </div>

            {/* Summary CTA */}
            <div className="pt-8 border-t border-[#FFD700]/30 text-center">
              <p className="text-xl font-bold text-[#FFD700]">
                This is how we build products: fast iteration meets technical excellence.
              </p>
            </div>
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
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            Work With Us
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Zero demonstrates how Rationale builds products: validation, technical excellence, and execution speed. Let's build yours.
          </p>

          {/* Velocity Stats */}
          <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto mb-10">
            <div>
              <div className="text-3xl sm:text-4xl font-bold text-[#FFD700] mb-2">54%</div>
              <div className="text-sm text-gray-400">Faster time to market</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-bold text-[#FFD700] mb-2">75%</div>
              <div className="text-sm text-gray-400">Risk reduction</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-bold text-[#FFD700] mb-2">7x</div>
              <div className="text-sm text-gray-400">More validation cycles</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base bg-[#FFD700] hover:bg-[#FFE34D] text-black font-semibold transition-all"
            >
              Start a Conversation
            </Link>
            <Link
              href="/work"
              className="px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base border border-gray-300 hover:border-[#FFD700] text-white font-semibold transition-colors"
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

/**
 * Intent Taxonomy Component
 */
function IntentTaxonomy() {
  const taxonomy = [
    {
      domain: "Financial",
      color: "#4ADE80",
      count: 8,
      intents: [
        "Billing inquiry",
        "Payment confirmation",
        "Invoice request",
        "Subscription management",
        "Refund request",
        "Budget approval",
        "Expense report",
        "Tax documentation"
      ]
    },
    {
      domain: "Scheduling",
      color: "#60A5FA",
      count: 6,
      intents: [
        "Meeting request",
        "Calendar invite",
        "Reschedule request",
        "Availability query",
        "Event reminder",
        "Appointment confirmation"
      ]
    },
    {
      domain: "Logistics",
      color: "#F59E0B",
      count: 7,
      intents: [
        "Shipping notification",
        "Delivery update",
        "Order confirmation",
        "Return request",
        "Tracking inquiry",
        "Address update",
        "Package pickup"
      ]
    },
    {
      domain: "Healthcare",
      color: "#EC4899",
      count: 5,
      intents: [
        "Appointment reminder",
        "Test results",
        "Prescription refill",
        "Insurance claim",
        "Medical records request"
      ]
    },
    {
      domain: "Travel",
      color: "#8B5CF6",
      count: 6,
      intents: [
        "Booking confirmation",
        "Itinerary update",
        "Check-in reminder",
        "Flight change",
        "Hotel reservation",
        "Travel advisory"
      ]
    },
    {
      domain: "Legal",
      color: "#EF4444",
      count: 5,
      intents: [
        "Contract review",
        "Compliance notice",
        "Legal document",
        "NDA request",
        "Terms update"
      ]
    },
    {
      domain: "General",
      color: "#FFD700",
      count: 6,
      intents: [
        "Information request",
        "Newsletter",
        "Notification",
        "Feedback request",
        "Survey invitation",
        "General inquiry"
      ]
    }
  ];

  return (
    <OS8Window
      title="43 Intent Categories, 7 Domains"
      variant="minimal"
      animateIn={false}
      className="max-w-5xl mx-auto"
    >
      <div className="py-8">
        <div className="space-y-4">
          {taxonomy.map((item, i) => (
            <div key={i} className="bg-gray-900/50 border border-gray-700 rounded-lg p-6 hover:border-[#FFD700] transition-colors">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="text-lg font-bold text-white">{item.domain}</h3>
                  <div className="text-xs text-gray-400">
                    {item.count} intent{item.count !== 1 ? 's' : ''}
                  </div>
                </div>
                <div
                  className="w-12 h-1 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
              </div>
              <div className="grid md:grid-cols-2 gap-2">
                {item.intents.map((intent, j) => (
                  <div
                    key={j}
                    className="flex items-center gap-2 text-sm text-gray-100 p-2 rounded"
                  >
                    <div
                      className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ backgroundColor: item.color }}
                    />
                    {intent}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-6 bg-gray-900/50 border border-gray-700 rounded-lg hover:border-[#FFD700] transition-colors">
            <div className="text-2xl font-bold text-[#FFD700] mb-1">7</div>
            <div className="text-xs text-gray-400">Total Domains</div>
          </div>
          <div className="text-center p-6 bg-gray-900/50 border border-gray-700 rounded-lg hover:border-[#FFD700] transition-colors">
            <div className="text-2xl font-bold text-[#FFD700] mb-1">43</div>
            <div className="text-xs text-gray-400">Total Intents</div>
          </div>
          <div className="text-center p-6 bg-gray-900/50 border border-gray-700 rounded-lg hover:border-[#FFD700] transition-colors">
            <div className="text-2xl font-bold text-[#FFD700] mb-1">6.1</div>
            <div className="text-xs text-gray-400">Avg per Domain</div>
          </div>
          <div className="text-center p-6 bg-gray-900/50 border border-gray-700 rounded-lg hover:border-[#FFD700] transition-colors">
            <div className="text-2xl font-bold text-[#FFD700] mb-1">91.7%</div>
            <div className="text-xs text-gray-400">Coverage</div>
          </div>
        </div>
      </div>
    </OS8Window>
  );
}
