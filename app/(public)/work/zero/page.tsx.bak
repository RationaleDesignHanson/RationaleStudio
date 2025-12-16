/**
 * Zero Public Marketing Page
 *
 * Full public page showcasing Zero as Rationale's product.
 * Focus on technical execution and development process.
 *
 * Restructured with Heirloom's clean layout pattern.
 */

'use client'

import HeroSection from './components/HeroSection'
import AtAGlance from './components/AtAGlance'
import ChallengeSection from './components/ChallengeSection'
import ApproachSection from './components/ApproachSection'
import PrototypeEmbed from './components/PrototypeEmbed'
import WearablesRoadmap from './components/WearablesRoadmap'

export default function ZeroPage() {
  return (
    <main className="zero-case-study">
      {/* Hero with gradient background and clean 2-column layout */}
      <HeroSection />

      {/* Executive summary - At a Glance insight box */}
      <section className="bg-gray-900 py-12 md:py-8 md:py-12 lg:py-16">
        <div className="container mx-auto px-6 md:px-12 lg:px-16">
          <div className="mx-auto max-w-5xl">
            <AtAGlance />
          </div>
        </div>
      </section>

      {/* The problem: inbox is full of hidden work */}
      <ChallengeSection />

      {/* Interactive demos with toggle */}
      <PrototypeEmbed />

      {/* Our approach: AI extracts actions automatically */}
      <ApproachSection />

      {/* Feature Grid */}
      <FeatureGrid />

      {/* Technical Architecture */}
      <section className="relative bg-black py-6 md:py-8 lg:py-12 md:py-28 border-t border-gray-800">
        <div className="relative z-10 container mx-auto px-6 md:px-12 lg:px-16">
          <div className="mx-auto max-w-7xl">
            <h2 className="mb-3 md:mb-6 text-2xl md:text-3xl lg:text-4xl font-bold text-white md:text-5xl text-center">
              How Zero Works
            </h2>
            <p className="mb-3 md:mb-6 md:mb-12 text-lg text-gray-300 text-center">
              Scalable architecture built with proven technologies
            </p>
            <SystemArchitecture />
          </div>
        </div>
      </section>

      {/* Wearables Roadmap */}
      <WearablesRoadmap />

      {/* Final CTA */}
      <section className="bg-gradient-to-br from-gray-900 via-black to-gray-900 py-6 md:py-8 lg:py-12 md:py-28 border-t border-terminal-gold/30">
        <div className="container mx-auto px-6 md:px-12 lg:px-16">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-3 md:mb-6 text-3xl font-bold text-white md:text-2xl md:text-3xl lg:text-4xl">
              Want to Build Products Like This?
            </h2>
            <p className="mb-4 md:mb-8 text-lg text-gray-300">
              Zero demonstrates Rationale's execution capability: fast iteration meets technical excellence. Let's build your product next.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-terminal-gold px-4 sm:px-6 md:px-8 py-4 font-semibold text-black transition-all hover:bg-[#FFE34D] hover:shadow-lg"
            >
              Start a Conversation
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Structured data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: 'Zero: AI Email Intelligence',
            description: 'AI-powered email intelligence that automatically extracts actions from your inbox and presents them as swipeable cards.',
            applicationCategory: 'ProductivityApplication',
            operatingSystem: 'iOS',
            creator: {
              '@type': 'Organization',
              name: 'Rationale',
              url: 'https://rationale.work',
            },
            url: 'https://rationale.work/work/zero',
            datePublished: '2024-11-01',
            keywords: 'AI, email, productivity, iOS app, SwiftUI, Claude AI',
          }),
        }}
      />
    </main>
  )
}

/**
 * Feature Grid Component
 */
function FeatureGrid() {
  const features = [
    {
      title: 'Gmail Integration',
      description: 'OAuth 2.0 authentication with read-only access. Secure token management and automatic refresh.',
    },
    {
      title: 'AI Classification',
      description: '43 intent categories powered by Claude 3.5. Identifies bills, packages, RSVPs, forms, and more.',
    },
    {
      title: 'Entity Extraction',
      description: 'Automatically extracts tracking numbers, due dates, amounts, event details, and actionable data.',
    },
    {
      title: 'Native iOS',
      description: 'SwiftUI app with device integrations. Add to Calendar, Save to Contacts, Add to Wallet.',
    },
    {
      title: 'Cloud Backend',
      description: '10 microservices on Google Cloud Run. FastAPI, PostgreSQL, async job queue, scalable architecture.',
    },
    {
      title: 'Security First',
      description: 'Encrypted OAuth tokens, read-only email access, no content storage. Privacy-focused design.',
    },
  ]

  return (
    <section className="bg-gray-900 py-6 md:py-12 lg:py-16 md:py-20 border-t border-gray-800">
      <div className="container mx-auto px-6 md:px-12 lg:px-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-3 md:mb-6 text-2xl md:text-3xl lg:text-4xl font-bold text-white md:text-5xl text-center">
            Key Features
          </h2>
          <p className="mb-3 md:mb-6 text-base md:text-lg text-gray-300 text-center max-w-3xl mx-auto">
            Production-ready capabilities built for real-world email workflows
          </p>

          {/* Mobile: Horizontal scroll carousel */}
          <div className="md:hidden flex gap-3 overflow-x-auto snap-x snap-mandatory pb-4 -mx-6 px-6">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="flex-shrink-0 w-[85vw] snap-center rounded-xl border-2 border-gray-700 bg-gray-800/50 p-4"
              >
                <h3 className="text-base font-bold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          {/* Desktop: Original grid layout */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 p-0 md:p-4 lg:p-6">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="rounded-2xl border-2 border-gray-700 bg-gray-800/50 p-4 md:p-6 lg:p-8 transition-all duration-300 hover:border-terminal-gold hover:shadow-xl hover:-translate-y-1"
              >
                <h3 className="text-lg md:text-xl font-bold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-xs md:text-sm text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/**
 * Development Timeline Component
 */
function DevelopmentTimeline() {
  const phases = [
    {
      phase: 'Phase 1',
      title: 'Problem Discovery',
      date: 'Aug 2024',
      description: 'Identified inbox management as core workflow friction',
      metrics: ['100+ user interviews', 'Hidden work quantified'],
      color: '#FFD700',
    },
    {
      phase: 'Phase 2',
      title: 'Technical Foundation',
      date: 'Sep-Oct 2024',
      description: 'Built classification system + working prototype',
      metrics: ['43 intent categories', 'Gmail OAuth integration'],
      color: '#FFA500',
    },
    {
      phase: 'Phase 3',
      title: 'Production MVP',
      date: 'Nov 2024',
      description: 'Validated accuracy, deployed beta infrastructure',
      metrics: ['91.7% baseline accuracy', 'Ready for beta users'],
      color: '#FF8C00',
    },
  ]

  return (
    <div className="py-8">
      <div className="relative max-w-4xl mx-auto">
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#FFD700] via-[#FFA500] to-[#FF8C00]" />
        <div className="space-y-12">
          {phases.map((item, index) => (
            <div key={index} className="relative pl-20">
              <div
                className="absolute left-6 top-2 w-4 h-4 md:w-5 md:h-5 rounded-full border-4 border-gray-900"
                style={{ backgroundColor: item.color }}
              />
              <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 md:p-6 hover:border-terminal-gold transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="text-xs font-mono text-gray-400 mb-1">
                      {item.phase}
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-white mb-1">
                      {item.title}
                    </h3>
                    <div className="text-sm text-terminal-gold font-medium">
                      {item.date}
                    </div>
                  </div>
                </div>
                <p className="text-gray-300 mb-4 text-sm leading-relaxed">
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
          <div className="absolute left-6 top-2 w-4 h-4 md:w-5 md:h-5">
            <svg viewBox="0 0 20 20" className="w-4 h-4 md:w-5 md:h-5">
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
  )
}

/**
 * System Architecture Component
 */
function SystemArchitecture() {
  return (
    <div className="py-8">
      <div className="relative">
        {/* Flow Caption */}
        <div className="text-xs md:text-sm text-gray-400 mb-3 md:mb-6 text-center">
          Data flow through the system
        </div>

        {/* Mobile: Compact list view */}
        <div className="lg:hidden">
          <div className="bg-gray-900/50 border-2 border-gray-700 rounded-lg p-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="flex-1">
                  <div className="text-sm font-bold text-white">Gmail</div>
                  <div className="text-xs text-gray-400">OAuth 2.0 • Read-only</div>
                </div>
                <svg className="w-4 h-4 text-terminal-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex-1">
                  <div className="text-sm font-bold text-white">Backend</div>
                  <div className="text-xs text-gray-400">Python/FastAPI • Queue mgmt</div>
                </div>
                <svg className="w-4 h-4 text-terminal-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex-1">
                  <div className="text-sm font-bold text-terminal-gold">AI Layer</div>
                  <div className="text-xs text-gray-400">Claude 3.5 • 43 intents</div>
                </div>
                <svg className="w-4 h-4 text-terminal-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex-1">
                  <div className="text-sm font-bold text-white">Supabase</div>
                  <div className="text-xs text-gray-400">PostgreSQL • History</div>
                </div>
                <svg className="w-4 h-4 text-terminal-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex-1">
                  <div className="text-sm font-bold text-white">Frontend</div>
                  <div className="text-xs text-gray-400">Next.js/React • Dashboard</div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Key Points */}
          <div className="mt-6 space-y-2">
            <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-3">
              <h4 className="text-xs font-bold text-terminal-gold mb-1">Security First</h4>
              <p className="text-xs text-gray-300">Encrypted OAuth, read-only access, no content stored</p>
            </div>
            <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-3">
              <h4 className="text-xs font-bold text-terminal-gold mb-1">Async Processing</h4>
              <p className="text-xs text-gray-300">Background queue, no UI blocking</p>
            </div>
            <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-3">
              <h4 className="text-xs font-bold text-terminal-gold mb-1">Scalable Design</h4>
              <p className="text-xs text-gray-300">Serverless architecture for 10k+ users</p>
            </div>
          </div>
        </div>

        {/* Desktop: Original horizontal flow */}
        <div className="hidden lg:block">
          <div className="flex flex-row items-center justify-center gap-3">
            <ArchComponent
              title="Gmail"
              description="OAuth 2.0"
              tags={['Real inbox', 'Read-only']}
              color="border-gray-600/50"
            />

            <div className="flex-shrink-0">
              <svg className="w-8 h-8 text-terminal-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </div>

            <ArchComponent
              title="Backend"
              description="Python/FastAPI"
              tags={['Queue mgmt', 'Security']}
              color="border-gray-600/50"
            />

            <div className="flex-shrink-0">
              <svg className="w-8 h-8 text-terminal-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </div>

            <ArchComponent
              title="AI Layer"
              description="Claude 3.5"
              tags={['43 intents', 'Actions']}
              color="border-[#FFD700]/50"
            />

            <div className="flex-shrink-0">
              <svg className="w-8 h-8 text-terminal-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </div>

            <ArchComponent
              title="Supabase"
              description="PostgreSQL"
              tags={['Results', 'History']}
              color="border-gray-600/50"
            />

            <div className="flex-shrink-0">
              <svg className="w-8 h-8 text-terminal-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </div>

            <ArchComponent
              title="Frontend"
              description="Next.js/React"
              tags={['Dashboard', 'Insights']}
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
    </div>
  )
}

function ArchComponent({
  title,
  description,
  tags,
  color,
}: {
  title: string
  description: string
  tags: string[]
  color: string
}) {
  return (
    <div
      className={`bg-gray-900/50 border-2 ${color} rounded-lg p-4 md:p-6 text-center hover:border-terminal-gold transition-colors`}
    >
      <h3 className="text-base md:text-lg font-bold text-white mb-1">{title}</h3>
      <div className="text-xs md:text-sm text-gray-400 mb-4">{description}</div>
      <div className="space-y-1">
        {tags.map((tag, i) => (
          <div key={i} className="text-xs text-gray-300 bg-gray-900/50 rounded px-2 py-1">
            {tag}
          </div>
        ))}
      </div>
    </div>
  )
}

function ArchKeyPoint({ title, description }: { title: string; description: string }) {
  return (
    <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-4 md:p-6 hover:border-terminal-gold transition-colors">
      <h4 className="text-sm font-bold text-terminal-gold mb-2">{title}</h4>
      <p className="text-xs text-gray-300 leading-relaxed">{description}</p>
    </div>
  )
}
