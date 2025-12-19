'use client'

import { BarChart, Bar, XAxis, YAxis, Cell, ResponsiveContainer, LabelList } from 'recharts'

export default function MetricsComparison() {
  // Comparison data with industry benchmarks
  const timelineData = [
    { name: 'Heirloom', value: 5, color: 'var(--color-heirloom-coral)', label: '5 weeks' },
    { name: 'Industry Avg', value: 14, color: '#D1D5DB', label: '14 weeks' },
  ]

  const compatibilityData = [
    { name: 'Heirloom', value: 500, color: 'var(--color-heirloom-coral)', label: '500+ sites' },
    { name: 'Competitors', value: 50, color: '#D1D5DB', label: '~50' },
  ]

  const pricingModelScore = [
    { name: 'One-Time\n($4.99)', value: 85, color: 'var(--color-heirloom-coral)', label: '85%' },
    { name: 'Subscription\n($3/mo)', value: 45, color: '#D1D5DB', label: '45%' },
  ]

  return (
    <section className="bg-gray-50 py-6 md:py-12 lg:py-16 md:py-20">
      <div className="container mx-auto px-6 md:px-12 lg:px-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-3 md:mb-6 text-2xl md:text-3xl lg:text-4xl font-bold text-[#2D2D2D] md:text-5xl">
            By the Numbers
          </h2>
          <p className="mb-6 md:mb-12 text-sm md:text-lg text-gray-600 max-w-3xl">
            Comparative metrics showing how Heirloom stacks up against industry standards and competitors in timeline, compatibility, and user satisfaction.
          </p>

          {/* Mobile: Compact stat cards */}
          <div className="md:hidden flex gap-3 overflow-x-auto snap-x snap-mandatory pb-4 -mx-6 px-6">
            {/* Timeline Stat */}
            <div className="flex-shrink-0 w-[85vw] snap-center rounded-xl border-2 border-[#E85D4D]/20 bg-white p-4">
              <h3 className="text-base font-bold text-[#2D2D2D] mb-3">Development Speed</h3>
              <div className="flex items-end justify-between gap-3 mb-3">
                <div className="flex-1">
                  <div className="text-xs text-gray-600 mb-1">Heirloom</div>
                  <div className="text-3xl font-bold text-[#E85D4D]">5 weeks</div>
                </div>
                <div className="flex-1">
                  <div className="text-xs text-gray-600 mb-1">Industry Avg</div>
                  <div className="text-2xl font-bold text-gray-400">14 weeks</div>
                </div>
              </div>
              <div className="rounded-lg bg-[#E85D4D]/10 p-3">
                <p className="text-xs font-semibold text-[#E85D4D]">64% faster than typical MVP</p>
                <p className="mt-1 text-xs text-gray-600">
                  Rapid iteration with SwiftUI Previews
                </p>
              </div>
            </div>

            {/* Compatibility Stat */}
            <div className="flex-shrink-0 w-[85vw] snap-center rounded-xl border-2 border-[#E85D4D]/20 bg-white p-4">
              <h3 className="text-base font-bold text-[#2D2D2D] mb-3">Recipe Compatibility</h3>
              <div className="flex items-end justify-between gap-3 mb-3">
                <div className="flex-1">
                  <div className="text-xs text-gray-600 mb-1">Heirloom</div>
                  <div className="text-3xl font-bold text-[#E85D4D]">500+</div>
                </div>
                <div className="flex-1">
                  <div className="text-xs text-gray-600 mb-1">Competitors</div>
                  <div className="text-2xl font-bold text-gray-400">~50</div>
                </div>
              </div>
              <div className="rounded-lg bg-[#E85D4D]/10 p-3">
                <p className="text-xs font-semibold text-[#E85D4D]">10x broader compatibility</p>
                <p className="mt-1 text-xs text-gray-600">
                  AllRecipes, NYT, Serious Eats + schema.org
                </p>
              </div>
            </div>

            {/* Pricing Preference Stat */}
            <div className="flex-shrink-0 w-[85vw] snap-center rounded-xl border-2 border-[#E85D4D]/20 bg-white p-4">
              <h3 className="text-base font-bold text-[#2D2D2D] mb-3">Pricing Preference</h3>
              <div className="flex items-end justify-between gap-3 mb-3">
                <div className="flex-1">
                  <div className="text-xs text-gray-600 mb-1">One-Time ($4.99)</div>
                  <div className="text-3xl font-bold text-[#E85D4D]">85%</div>
                </div>
                <div className="flex-1">
                  <div className="text-xs text-gray-600 mb-1">Subscription ($3/mo)</div>
                  <div className="text-2xl font-bold text-gray-400">45%</div>
                </div>
              </div>
              <div className="rounded-lg bg-[#E85D4D]/10 p-3">
                <p className="text-xs font-semibold text-[#E85D4D]">User satisfaction score</p>
                <p className="mt-1 text-xs text-gray-600">
                  TestFlight feedback: no subscription fatigue
                </p>
              </div>
            </div>
          </div>

          {/* Desktop: Original chart view */}
          <div className="hidden md:grid gap-4 md:gap-6 lg:gap-8 md:grid-cols-3">
            {/* Timeline Comparison */}
            <div className="rounded-2xl border-2 border-gray-200 bg-white p-8 transition-all duration-300 hover:border-[#E85D4D] hover:shadow-xl hover:-translate-y-1 cursor-pointer overflow-hidden">
              <h3 className="mb-6 text-xl font-bold text-[#2D2D2D]">Development Speed</h3>

              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={timelineData} margin={{ top: 30, right: 20, bottom: 30, left: 40 }}>
                  <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#6B7280' }} angle={0} textAnchor="middle" />
                  <YAxis domain={[0, 16]} hide />
                  <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                    {timelineData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                    <LabelList dataKey="label" position="top" offset={8} style={{ fontSize: 14, fontWeight: 'bold', fill: 'var(--color-text-dark)' }} />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>

              <div className="mt-6 rounded-lg bg-[#E85D4D]/10 p-4">
                <p className="text-sm font-semibold text-[#E85D4D]">64% faster than typical MVP</p>
                <p className="mt-1 text-xs text-gray-600">
                  Rapid iteration with SwiftUI Previews and focused MVP scope
                </p>
              </div>
            </div>

            {/* Compatibility Comparison */}
            <div className="rounded-2xl border-2 border-gray-200 bg-white p-8 transition-all duration-300 hover:border-[#E85D4D] hover:shadow-xl hover:-translate-y-1 cursor-pointer overflow-hidden">
              <h3 className="mb-6 text-xl font-bold text-[#2D2D2D]">Recipe Compatibility</h3>

              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={compatibilityData} margin={{ top: 30, right: 20, bottom: 30, left: 40 }}>
                  <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#6B7280' }} angle={0} textAnchor="middle" />
                  <YAxis domain={[0, 550]} hide />
                  <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                    {compatibilityData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                    <LabelList dataKey="label" position="top" offset={8} style={{ fontSize: 14, fontWeight: 'bold', fill: 'var(--color-text-dark)' }} />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>

              <div className="mt-6 rounded-lg bg-[#E85D4D]/10 p-4">
                <p className="text-sm font-semibold text-[#E85D4D]">10x broader compatibility</p>
                <p className="mt-1 text-xs text-gray-600">
                  Supports AllRecipes, NYT Cooking, Serious Eats, plus schema.org standard
                </p>
              </div>
            </div>

            {/* User Preference Comparison */}
            <div className="rounded-2xl border-2 border-gray-200 bg-white p-8 transition-all duration-300 hover:border-[#E85D4D] hover:shadow-xl hover:-translate-y-1 cursor-pointer overflow-hidden">
              <h3 className="mb-6 text-xl font-bold text-[#2D2D2D]">Pricing Preference</h3>

              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={pricingModelScore} margin={{ top: 30, right: 20, bottom: 40, left: 40 }}>
                  <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#6B7280' }} angle={0} textAnchor="middle" height={50} />
                  <YAxis domain={[0, 100]} hide />
                  <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                    {pricingModelScore.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                    <LabelList dataKey="label" position="top" offset={8} style={{ fontSize: 14, fontWeight: 'bold', fill: 'var(--color-text-dark)' }} />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>

              <div className="mt-6 rounded-lg bg-[#E85D4D]/10 p-4">
                <p className="text-sm font-semibold text-[#E85D4D]">User satisfaction score</p>
                <p className="mt-1 text-xs text-gray-600">
                  Based on TestFlight feedback: 85% prefer one-time vs. subscription
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
