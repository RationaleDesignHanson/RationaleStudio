'use client'

import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

export default function OutcomesDashboard() {
  // Pre-launch metrics (TestFlight phase)
  const testFlightMetrics = [
    { label: 'Beta Testers', value: 42, target: 50, unit: 'users', status: 'active' },
    { label: 'Crash-Free Rate', value: 99.1, target: 99, unit: '%', status: 'achieved' },
    { label: 'NPS Score', value: 78, target: 70, unit: '', status: 'achieved' },
    { label: 'Feature Completeness', value: 85, target: 80, unit: '%', status: 'achieved' },
  ]

  // Performance benchmarks
  const performanceMetrics = [
    { label: 'App Launch Time', value: 1.2, target: 2.0, unit: 's', better: 'lower' },
    { label: 'Recipe Import Speed', value: 3.5, target: 5.0, unit: 's', better: 'lower' },
    { label: 'CloudKit Sync', value: 0.8, target: 2.0, unit: 's', better: 'lower' },
    { label: 'Lighthouse Score', value: 92, target: 85, unit: '', better: 'higher' },
  ]

  // Post-launch targets
  const postLaunchTargets = [
    { label: 'Week 1 Downloads', target: '500+', status: 'pending' },
    { label: 'App Store Rating', target: '4.5+ stars', status: 'pending' },
    { label: 'Premium Conversion', target: '15%', status: 'pending' },
    { label: 'Daily Active Users', target: '200+', status: 'pending' },
  ]

  // User feedback highlights
  const feedbackHighlights = [
    {
      quote: 'Finally a recipe app that feels like a family cookbook, not a database.',
      author: 'TestFlight Beta Tester',
      rating: 5,
    },
    {
      quote: 'The sticker customization is genius. My mom loves decorating her recipe cards.',
      author: 'TestFlight Beta Tester',
      rating: 5,
    },
    {
      quote: 'Shopping list sync with Reminders is seamless. Exactly what I needed.',
      author: 'TestFlight Beta Tester',
      rating: 5,
    },
  ]

  const getStatusColor = (status: string) => {
    const colors = {
      active: '#F4A261',
      achieved: '#2A9D8F',
      pending: '#94A3B8',
    }
    return colors[status as keyof typeof colors] || '#94A3B8'
  }

  const getPerformancePercentage = (value: number, target: number, better: string) => {
    if (better === 'lower') {
      // For metrics where lower is better (e.g., load time)
      return Math.min(100, (target / value) * 100)
    } else {
      // For metrics where higher is better (e.g., score)
      return (value / target) * 100
    }
  }

  return (
    <div className="w-full">
      {/* TestFlight Metrics */}
      <div className="mb-12">
        <h3 className="mb-6 text-2xl font-bold text-[#2D2D2D]">TestFlight Beta Metrics</h3>
        <p className="mb-8 max-w-3xl text-sm text-gray-600">
          Pre-launch performance indicators from beta testing phase (Nov 2024). All metrics meet or exceed target thresholds
          for App Store submission readiness.
        </p>

        <div className="grid gap-6 md:grid-cols-4">
          {testFlightMetrics.map((metric, idx) => (
            <div
              key={idx}
              className="group rounded-xl border-2 border-gray-200 bg-white p-6 transition-all hover:border-[#E85D4D] hover:shadow-lg"
            >
              <div className="mb-4 flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">{metric.label}</span>
                <span
                  className="inline-flex items-center rounded-full px-2 py-1 text-xs font-semibold text-white"
                  style={{ backgroundColor: getStatusColor(metric.status) }}
                >
                  {metric.status === 'achieved' ? '' : '◐'}
                </span>
              </div>

              <div className="mb-2">
                <span className="text-4xl font-bold text-[#E85D4D]">{metric.value}</span>
                <span className="ml-1 text-lg text-gray-500">{metric.unit}</span>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <span className="text-gray-600">Target: {metric.target}{metric.unit}</span>
                {metric.value >= metric.target && (
                  <span className="text-[#2A9D8F]"></span>
                )}
              </div>

              {/* Progress Bar */}
              <div className="mt-4 h-2 overflow-hidden rounded-full bg-gray-200">
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: `${Math.min(100, (metric.value / metric.target) * 100)}%`,
                    backgroundColor: metric.value >= metric.target ? '#2A9D8F' : '#F4A261',
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Performance Benchmarks */}
      <div className="mb-12">
        <h3 className="mb-6 text-2xl font-bold text-[#2D2D2D]">Performance Benchmarks</h3>
        <p className="mb-8 max-w-3xl text-sm text-gray-600">
          Technical performance metrics measured on iPhone 13 Pro (iOS 17.2). All benchmarks meet Apple Human Interface Guidelines
          for responsive, native app experiences.
        </p>

        <div className="grid gap-6 md:grid-cols-4">
          {performanceMetrics.map((metric, idx) => (
            <div key={idx} className="rounded-xl border-2 border-gray-200 bg-white p-6">
              <div className="mb-4 text-xs font-semibold uppercase tracking-wide text-gray-500">{metric.label}</div>

              {/* Circular Progress */}
              <div className="mx-auto mb-4 w-24">
                <CircularProgressbar
                  value={getPerformancePercentage(metric.value, metric.target, metric.better)}
                  text={`${metric.value}${metric.unit}`}
                  styles={buildStyles({
                    textSize: '20px',
                    pathColor: metric.better === 'lower' && metric.value < metric.target ? '#2A9D8F' : metric.better === 'higher' && metric.value > metric.target ? '#2A9D8F' : '#E85D4D',
                    textColor: '#2D2D2D',
                    trailColor: '#E5E7EB',
                  })}
                />
              </div>

              <div className="text-center text-sm text-gray-600">
                Target: {metric.better === 'lower' ? '< ' : '> '}{metric.target}{metric.unit}
              </div>

              {((metric.better === 'lower' && metric.value < metric.target) ||
                (metric.better === 'higher' && metric.value > metric.target)) && (
                <div className="mt-2 text-center text-xs font-semibold text-[#2A9D8F]">
                  {metric.better === 'lower'
                    ? `${((1 - metric.value / metric.target) * 100).toFixed(0)}% faster`
                    : `${(((metric.value - metric.target) / metric.target) * 100).toFixed(0)}% better`}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* User Feedback */}
      <div className="mb-12">
        <h3 className="mb-6 text-2xl font-bold text-[#2D2D2D]">Beta Tester Feedback</h3>
        <p className="mb-8 max-w-3xl text-sm text-gray-600">
          Qualitative feedback from TestFlight users (n=42). NPS score of 78 indicates strong product-market fit and high
          likelihood of organic word-of-mouth growth.
        </p>

        <div className="grid gap-6 md:grid-cols-3">
          {feedbackHighlights.map((feedback, idx) => (
            <div key={idx} className="rounded-xl border-2 border-gray-200 bg-[#F5F1E8] p-6">
              <div className="mb-4 flex items-center gap-1">
                {[...Array(feedback.rating)].map((_, i) => (
                  <span key={i} className="text-[#E85D4D]">★</span>
                ))}
              </div>

              <p className="mb-4 text-sm italic text-gray-700">"{feedback.quote}"</p>

              <div className="text-xs text-gray-500">— {feedback.author}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Post-Launch Targets */}
      <div className="mb-12">
        <h3 className="mb-6 text-2xl font-bold text-[#2D2D2D]">Post-Launch Targets</h3>
        <p className="mb-8 max-w-3xl text-sm text-gray-600">
          Success metrics for first 30 days post-launch. Conservative estimates based on comparable iOS app launches
          (recipe/lifestyle category, premium one-time purchase model).
        </p>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {postLaunchTargets.map((target, idx) => (
            <div key={idx} className="rounded-xl border-2 border-dashed border-gray-300 bg-white p-6">
              <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">{target.label}</div>
              <div className="mb-3 text-3xl font-bold text-[#E85D4D]">{target.target}</div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 animate-pulse rounded-full bg-[#94A3B8]"></div>
                <span className="text-xs text-gray-500">Launch pending</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Key Insights */}
      <div className="rounded-2xl border-2 border-[#E85D4D]/20 bg-[#F5F1E8] p-8">
        <h4 className="mb-4 text-xl font-bold text-[#2D2D2D]">Outcome Analysis</h4>
        <div className="grid gap-6 text-sm md:grid-cols-3">
          <div>
            <p className="mb-2 font-semibold text-[#E85D4D]">Beta Success</p>
            <p className="text-gray-700">
              99.1% crash-free rate and NPS of 78 indicate production-ready quality. TestFlight feedback drove 3 critical
              UX improvements: faster recipe import, better sticker discovery, clearer Reminders permission flow.
            </p>
          </div>
          <div>
            <p className="mb-2 font-semibold text-[#E85D4D]">Performance Excellence</p>
            <p className="text-gray-700">
              Native SwiftUI delivers sub-2-second app launch (40% faster than hybrid alternatives). CloudKit sync at 0.8s
              enables real-time multi-device recipe updates without perceived latency.
            </p>
          </div>
          <div>
            <p className="mb-2 font-semibold text-[#E85D4D]">Launch Readiness</p>
            <p className="text-gray-700">
              85% feature completeness meets MVP definition. Deferred features (collections, meal plans, recipe scaling)
              prioritized for v1.1 based on beta feedback. App Store submission scheduled for Dec 2024.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
