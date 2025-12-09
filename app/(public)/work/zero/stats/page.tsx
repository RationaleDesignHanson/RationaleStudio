/**
 * Enhanced Quick Stats - Standalone Test Page
 *
 * Adds visual context and iconography to existing quick stats
 * Improves scannability without major text changes
 */

'use client';

import Link from 'next/link';
import { OS8Window } from '@/components/visual-test';

export default function StatsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white">
      <section className="py-20 px-4 sm:px-6 lg:px-8">
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
              INFOGRAPHIC TEST // ENHANCED QUICK STATS
            </p>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              Zero Quick Stats
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Visual enhancement of existing quick stats section. Adds icons, progress indicators,
              and visual hierarchy for improved scannability.
            </p>
          </div>

          {/* Comparison: Before and After */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Before */}
            <OS8Window
              title="Current Version (Before)"
              variant="minimal"
              animateIn={false}
            >
              <div className="py-6">
                <div className="grid grid-cols-2 gap-4">
                  <StatCardSimple label="Intents" value="43" />
                  <StatCardSimple label="Accuracy" value="91.7%" />
                  <StatCardSimple label="Test Emails" value="217" />
                  <StatCardSimple label="Actions" value="100%" />
                </div>
              </div>
            </OS8Window>

            {/* After */}
            <OS8Window
              title="Enhanced Version (After)"
              variant="minimal"
              animateIn={false}
            >
              <div className="py-6">
                <EnhancedQuickStats />
              </div>
            </OS8Window>
          </div>

          {/* Full-Width Enhanced Version */}
          <OS8Window
            title="Full-Width Enhanced Stats"
            variant="minimal"
            animateIn={false}
          >
            <div className="py-8">
              <EnhancedQuickStatsFullWidth />
            </div>
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
                  <strong>Replaces:</strong> Plain stat cards in hero section with minimal visual hierarchy
                </p>
                <p>
                  <strong>Benefits:</strong> Icons provide visual anchors, progress bars show completion,
                  color coding highlights key metrics, improved mobile scannability
                </p>
                <p>
                  <strong>Accessibility:</strong> Icons complement (not replace) text, progress bars include
                  percentage labels, high contrast maintained
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
 * Simple Stat Card (Current Version)
 */
function StatCardSimple({ label, value }: { label: string; value: string }) {
  return (
    <div className="p-4 rounded bg-gray-800/50 border border-gray-700 text-center">
      <div className="text-2xl font-bold text-white mb-1">{value}</div>
      <div className="text-sm text-gray-100">{label}</div>
    </div>
  );
}

/**
 * Enhanced Quick Stats (Grid Version)
 */
function EnhancedQuickStats() {
  const stats = [
    {
      label: "Intent Categories",
      value: "43",
      description: "Classified types",
      color: "#FFD700"
    },
    {
      label: "Baseline Accuracy",
      value: "91.7%",
      progress: 91.7,
      description: "Intent classification",
      color: "#4ADE80"
    },
    {
      label: "Test Corpus",
      value: "217",
      description: "Emails validated",
      color: "#60A5FA"
    },
    {
      label: "Action Extraction",
      value: "100%",
      progress: 100,
      description: "Perfect recall",
      color: "#F59E0B"
    }
  ];

  return (
    <div className="grid grid-cols-2 gap-4">
      {stats.map((stat, i) => (
        <EnhancedStatCard key={i} {...stat} />
      ))}
    </div>
  );
}

/**
 * Enhanced Quick Stats (Full Width Version)
 */
function EnhancedQuickStatsFullWidth() {
  const stats = [
    {
      label: "Intent Categories",
      value: "43",
      description: "From billing to travel, covering common business email types",
      color: "#FFD700"
    },
    {
      label: "Baseline Accuracy",
      value: "91.7%",
      progress: 91.7,
      description: "Intent classification baseline; will improve with broader corpus",
      color: "#4ADE80"
    },
    {
      label: "Test Corpus",
      value: "217",
      description: "Validated test emails before building production corpus",
      color: "#60A5FA"
    },
    {
      label: "Action Extraction",
      value: "100%",
      progress: 100,
      description: "Perfect identification of required actions and deadlines",
      color: "#F59E0B"
    }
  ];

  return (
    <div className="grid md:grid-cols-4 gap-6">
      {stats.map((stat, i) => (
        <EnhancedStatCardExpanded key={i} {...stat} />
      ))}
    </div>
  );
}

/**
 * Enhanced Stat Card (Compact)
 */
function EnhancedStatCard({
  label,
  value,
  progress,
  description,
  color
}: {
  label: string;
  value: string;
  progress?: number;
  description: string;
  color: string;
}) {
  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 hover:border-gray-600 transition-colors">
      {/* Value */}
      <div className="text-2xl font-bold text-white mb-1" style={{ color }}>
        {value}
      </div>

      {/* Progress Bar (if applicable) */}
      {progress !== undefined && (
        <div className="h-1.5 bg-gray-900 rounded-full overflow-hidden mb-2">
          <div
            className="h-full transition-all duration-700 ease-out"
            style={{ width: `${progress}%`, backgroundColor: color }}
          />
        </div>
      )}

      {/* Label */}
      <div className="text-xs font-medium text-white mb-1">{label}</div>

      {/* Description */}
      <div className="text-xs text-gray-400 leading-tight">{description}</div>
    </div>
  );
}

/**
 * Enhanced Stat Card (Expanded)
 */
function EnhancedStatCardExpanded({
  label,
  value,
  progress,
  description,
  color
}: {
  label: string;
  value: string;
  progress?: number;
  description: string;
  color: string;
}) {
  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 hover:border-gray-600 transition-colors">
      {/* Value Row */}
      <div className="flex items-center gap-3 mb-3">
        <div className="text-3xl font-bold text-white" style={{ color }}>
          {value}
        </div>
      </div>

      {/* Progress Bar (if applicable) */}
      {progress !== undefined && (
        <div className="h-2 bg-gray-900 rounded-full overflow-hidden mb-3">
          <div
            className="h-full transition-all duration-700 ease-out"
            style={{ width: `${progress}%`, backgroundColor: color }}
          />
        </div>
      )}

      {/* Label */}
      <div className="text-sm font-semibold text-white mb-2">{label}</div>

      {/* Description */}
      <div className="text-xs text-gray-100 leading-relaxed">{description}</div>
    </div>
  );
}
