/**
 * System Architecture Infographic - Standalone Test Page
 *
 * Visual data flow diagram showing how Zero processes emails
 * Replaces technical text with diagram (70% text reduction)
 */

'use client';

import Link from 'next/link';
import { OS8Window } from '@/components/visual-test';

export default function ArchitecturePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white">
      <section className="py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-4 sm:px-6 md:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Navigation */}
          <div className="mb-8">
            <Link
              href="/work/zero"
              className="text-sm text-gray-400 hover:text-terminal-gold transition-colors"
            >
              ← Back to Zero
            </Link>
          </div>

          {/* Page Header */}
          <div className="mb-12 text-center">
            <p className="text-xs sm:text-sm font-mono text-terminal-gold tracking-widest mb-4">
              INFOGRAPHIC TEST // SYSTEM ARCHITECTURE
            </p>
            <h1 className="text-2xl md:text-3xl lg:text-4xl sm:text-5xl font-bold mb-4">
              Zero System Architecture
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Data flow diagram showing how Zero connects Gmail, classifies emails, and presents insights.
              This infographic reduces text by ~70% while making the system instantly comprehensible.
            </p>
          </div>

          {/* Architecture Diagram */}
          <OS8Window
            title="System Architecture"
            variant="minimal"
            animateIn={false}
          >
            <SystemArchitecture />
          </OS8Window>

          {/* Usage Notes */}
          <div className="mt-12 max-w-2xl mx-auto">
            <OS8Window
              title="Implementation Notes"
              variant="yellow"
              animateIn={false}
            >
              <div className="space-y-4 text-gray-700 text-sm">
                <p>
                  <strong>Replaces:</strong> Dense paragraph describing technical stack, OAuth flow,
                  classification pipeline, and data storage
                </p>
                <p>
                  <strong>Benefits:</strong> Shows data flow visually, reveals system boundaries,
                  makes architecture scannable in 10 seconds
                </p>
                <p>
                  <strong>Accessibility:</strong> Clear labels on all components, directional arrows,
                  logical left-to-right flow
                </p>
              </div>
            </OS8Window>
          </div>
        </div>
      </section>
    </main>
  );
}

/**
 * System Architecture Component
 * Visual data flow with 5 main components
 */
function SystemArchitecture() {
  return (
    <div className="py-8">
      <div className="relative">
        {/* Architecture Flow - Horizontal Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-4">
          {/* 1. Gmail */}
          <ArchComponent
            title="Gmail"
            description="OAuth 2.0"
            tags={["Real inbox", "Read-only"]}
            color="border-blue-500/50"
          />

          {/* Arrow */}
          <div className="hidden lg:flex items-center justify-center">
            <svg className="w-8 h-8 text-terminal-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </div>

          {/* 2. Backend API */}
          <ArchComponent
            title="Backend"
            description="Python/FastAPI"
            tags={["Queue mgmt", "Security"]}
            color="border-green-500/50"
          />

          {/* Arrow */}
          <div className="hidden lg:flex items-center justify-center">
            <svg className="w-8 h-8 text-terminal-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </div>

          {/* 3. AI Classification */}
          <ArchComponent
            title="AI Layer"
            description="Claude 3.5"
            tags={["43 intents", "Actions"]}
            color="border-purple-500/50"
          />

          {/* Arrow */}
          <div className="hidden lg:flex items-center justify-center">
            <svg className="w-8 h-8 text-terminal-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </div>

          {/* 4. Database */}
          <ArchComponent
            title="Supabase"
            description="PostgreSQL"
            tags={["Results", "History"]}
            color="border-teal-500/50"
          />

          {/* Arrow */}
          <div className="hidden lg:flex items-center justify-center">
            <svg className="w-8 h-8 text-terminal-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </div>

          {/* 5. Frontend */}
          <ArchComponent
            title="Frontend"
            description="Next.js/React"
            tags={["Dashboard", "Insights"]}
            color="border-[#FFD700]/50"
          />
        </div>

        {/* Key Architecture Points */}
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

/**
 * Architecture Component Card
 */
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
    <div className={`bg-gray-800/50 border-2 ${color} rounded-lg p-6 text-center hover:bg-gray-800/70 transition-colors`}>
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

/**
 * Architecture Key Point Card
 */
function ArchKeyPoint({
  title,
  description
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-4">
      <h4 className="text-sm font-bold text-terminal-gold mb-2">{title}</h4>
      <p className="text-xs text-gray-100 leading-relaxed">{description}</p>
    </div>
  );
}
