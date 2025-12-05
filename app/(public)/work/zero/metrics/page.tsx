/**
 * Performance Metrics Dashboard - Standalone Test Page
 *
 * Visual metrics dashboard with circular charts and category bars
 * Replaces dense accuracy paragraph (80% text reduction)
 */

'use client';

import Link from 'next/link';
import { OS8Window } from '@/components/visual-test';

export default function MetricsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white">
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
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
              INFOGRAPHIC TEST // PERFORMANCE METRICS
            </p>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              Zero Baseline Performance
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Visual performance dashboard showing baseline accuracy metrics and category breakdown.
              This infographic reduces text by ~80% while making metrics instantly scannable.
            </p>
          </div>

          {/* Metrics Dashboard */}
          <OS8Window
            title="Baseline Performance Metrics"
            variant="minimal"
            animateIn={false}
          >
            <PerformanceMetrics />
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
                  <strong>Replaces:</strong> Dense paragraph listing accuracy percentages, test corpus details,
                  and category-by-category performance
                </p>
                <p>
                  <strong>Benefits:</strong> Visual hierarchy shows what matters most, circular charts provide
                  at-a-glance assessment, category bars reveal granular performance
                </p>
                <p>
                  <strong>Accessibility:</strong> All metrics labeled with percentages, color not sole indicator,
                  responsive layout for mobile
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
 * Performance Metrics Component
 * Circular charts + category bars
 */
function PerformanceMetrics() {
  const overallMetrics = [
    {
      label: "Intent Classification",
      value: 91.7,
      total: 100,
      color: "#FFD700",
      description: "43 intent categories"
    },
    {
      label: "Action Extraction",
      value: 100,
      total: 100,
      color: "#4ADE80",
      description: "Perfect recall"
    }
  ];

  const categoryPerformance = [
    { category: "Billing", accuracy: 100, count: 45 },
    { category: "Finance", accuracy: 100, count: 38 },
    { category: "Healthcare", accuracy: 100, count: 29 },
    { category: "Legal", accuracy: 96.2, count: 26 },
    { category: "Travel", accuracy: 93.5, count: 31 },
    { category: "Logistics", accuracy: 88.9, count: 27 },
    { category: "Marketing", accuracy: 85.7, count: 21 }
  ];

  return (
    <div className="py-8">
      {/* Overall Metrics - Circular Charts */}
      <div className="mb-12">
        <h3 className="text-lg font-bold text-white mb-6 text-center">
          Overall Baseline Accuracy
        </h3>
        <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
          {overallMetrics.map((metric, i) => (
            <CircularMetric key={i} {...metric} />
          ))}
        </div>
        <p className="text-center text-sm text-gray-400 mt-6">
          Baseline established with 217 test emails before building broader corpus
        </p>
      </div>

      {/* Category Performance - Horizontal Bars */}
      <div>
        <h3 className="text-lg font-bold text-white mb-6">
          Performance by Category
        </h3>
        <div className="space-y-3">
          {categoryPerformance.map((cat, i) => (
            <CategoryBar key={i} {...cat} />
          ))}
        </div>
        <p className="text-sm text-gray-400 mt-6">
          Core business intents (billing, finance, healthcare) at 100% accuracy.
          Accuracy will improve as we build email corpus from beta users.
        </p>
      </div>
    </div>
  );
}

/**
 * Circular Metric Chart
 */
function CircularMetric({
  label,
  value,
  total,
  color,
  description
}: {
  label: string;
  value: number;
  total: number;
  color: string;
  description: string;
}) {
  const percentage = (value / total) * 100;
  const circumference = 2 * Math.PI * 70; // radius = 70
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      {/* Circular Chart */}
      <div className="relative w-48 h-48 mb-4">
        <svg className="transform -rotate-90 w-48 h-48">
          {/* Background Circle */}
          <circle
            cx="96"
            cy="96"
            r="70"
            stroke="#1F2937"
            strokeWidth="12"
            fill="none"
          />
          {/* Progress Circle */}
          <circle
            cx="96"
            cy="96"
            r="70"
            stroke={color}
            strokeWidth="12"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        {/* Center Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-4xl font-bold text-white">
            {value}%
          </div>
          <div className="text-xs text-gray-400">
            of {total}
          </div>
        </div>
      </div>

      {/* Label */}
      <div className="text-center">
        <div className="text-base font-semibold text-white mb-1">
          {label}
        </div>
        <div className="text-sm text-gray-400">
          {description}
        </div>
      </div>
    </div>
  );
}

/**
 * Category Performance Bar
 */
function CategoryBar({
  category,
  accuracy,
  count
}: {
  category: string;
  accuracy: number;
  count: number;
}) {
  // Color based on accuracy
  const getColor = (acc: number) => {
    if (acc === 100) return "bg-green-500";
    if (acc >= 95) return "bg-[#FFD700]";
    if (acc >= 90) return "bg-yellow-500";
    return "bg-orange-500";
  };

  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-white">{category}</span>
        <div className="flex items-center gap-3">
          <span className="text-xs text-gray-400">{count} emails</span>
          <span className="text-sm font-bold text-white">{accuracy}%</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="h-2 bg-gray-900 rounded-full overflow-hidden">
        <div
          className={`h-full ${getColor(accuracy)} transition-all duration-700 ease-out`}
          style={{ width: `${accuracy}%` }}
        />
      </div>
    </div>
  );
}
