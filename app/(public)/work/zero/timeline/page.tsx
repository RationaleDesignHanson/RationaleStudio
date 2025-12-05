/**
 * Development Timeline Infographic - Standalone Test Page
 *
 * Visual timeline showing Zero's development journey
 * Replaces 3 text cards with visual flow (60% text reduction)
 */

'use client';

import Link from 'next/link';
import { OS8Window } from '@/components/visual-test';

export default function TimelinePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white">
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Navigation */}
          <div className="mb-8">
            <Link
              href="/work/zero"
              className="text-sm text-gray-400 hover:text-[#FFD700] transition-colors"
            >
              ← Back to Zero
            </Link>
          </div>

          {/* Page Header */}
          <div className="mb-12 text-center">
            <p className="text-xs sm:text-sm font-mono text-[#FFD700] tracking-widest mb-4">
              INFOGRAPHIC TEST // DEVELOPMENT TIMELINE
            </p>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              Zero Development Timeline
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Visual timeline showing the progression from problem identification to production-ready MVP.
              This infographic reduces text by ~60% while improving comprehension.
            </p>
          </div>

          {/* Timeline Infographic */}
          <OS8Window
            title="Development Journey"
            variant="minimal"
            animateIn={false}
            className="max-w-4xl mx-auto"
          >
            <DevelopmentTimeline />
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
                  <strong>Replaces:</strong> Three text-heavy OS8Window cards describing "Where We Started",
                  "What We Built", and "Where We're Going"
                </p>
                <p>
                  <strong>Benefits:</strong> Scannable at a glance, shows progression visually,
                  reduces reading time by ~60%
                </p>
                <p>
                  <strong>Accessibility:</strong> All phases labeled, sequential flow indicated,
                  works without color distinction
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
 * Development Timeline Component
 * Shows 3 phases with visual progression
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
      {/* Timeline Container */}
      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#FFD700] via-[#FFA500] to-[#FF8C00]" />

        {/* Timeline Phases */}
        <div className="space-y-12">
          {phases.map((item, index) => (
            <div key={index} className="relative pl-20">
              {/* Timeline Dot */}
              <div
                className="absolute left-6 top-2 w-5 h-5 rounded-full border-4 border-gray-900"
                style={{ backgroundColor: item.color }}
              />

              {/* Phase Content */}
              <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 hover:border-gray-600 transition-colors">
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

                {/* Metrics */}
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

        {/* Future Arrow */}
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
