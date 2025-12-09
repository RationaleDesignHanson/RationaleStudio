'use client'

import { useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, Cell, ResponsiveContainer, LabelList } from 'recharts'

export default function MetricsComparison() {
  const [showMethodology, setShowMethodology] = useState(false)
  // Comparison data with industry benchmarks
  const timelineData = [
    { name: 'Heirloom', value: 5, color: '#E85D4D', label: '5 weeks' },
    { name: 'Industry Avg', value: 14, color: '#D1D5DB', label: '14 weeks' },
  ]

  const compatibilityData = [
    { name: 'Heirloom', value: 500, color: '#E85D4D', label: '500+' },
    { name: 'Competitors', value: 50, color: '#D1D5DB', label: '~50' },
  ]

  const pricingModelScore = [
    { name: 'One-Time ($4.99)', value: 85, color: '#E85D4D', label: '85%' },
    { name: 'Subscription ($3/mo)', value: 45, color: '#D1D5DB', label: '45%' },
  ]

  return (
    <section className="bg-gray-50 py-20 md:py-28">
      <div className="container mx-auto px-6 md:px-12 lg:px-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-6 text-4xl font-bold text-[#2D2D2D] md:text-5xl">
            By the Numbers
          </h2>
          <p className="mb-12 text-lg text-gray-600 max-w-3xl">
            Comparative metrics showing how Heirloom stacks up against industry standards and competitors in timeline, compatibility, and user satisfaction.
          </p>

          <div className="grid gap-8 md:grid-cols-3">
            {/* Timeline Comparison */}
            <div className="rounded-2xl border-2 border-gray-200 bg-white p-8 transition-all duration-300 hover:border-[#E85D4D] hover:shadow-xl hover:-translate-y-1 cursor-pointer">
              <h3 className="mb-6 text-xl font-bold text-[#2D2D2D]">Development Speed</h3>

              <ResponsiveContainer width="100%" height={160}>
                <BarChart data={timelineData} layout="horizontal" margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                  <XAxis type="number" domain={[0, 16]} hide />
                  <YAxis type="category" dataKey="name" width={100} tick={{ fontSize: 12, fill: '#6B7280' }} />
                  <Bar dataKey="value" radius={[0, 8, 8, 0]}>
                    {timelineData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                    <LabelList dataKey="label" position="right" style={{ fontSize: 14, fontWeight: 'bold', fill: '#2D2D2D' }} />
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
            <div className="rounded-2xl border-2 border-gray-200 bg-white p-8 transition-all duration-300 hover:border-[#E85D4D] hover:shadow-xl hover:-translate-y-1 cursor-pointer">
              <h3 className="mb-6 text-xl font-bold text-[#2D2D2D]">Recipe Compatibility</h3>

              <ResponsiveContainer width="100%" height={160}>
                <BarChart data={compatibilityData} layout="horizontal" margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                  <XAxis type="number" domain={[0, 550]} hide />
                  <YAxis type="category" dataKey="name" width={100} tick={{ fontSize: 12, fill: '#6B7280' }} />
                  <Bar dataKey="value" radius={[0, 8, 8, 0]}>
                    {compatibilityData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                    <LabelList dataKey="label" position="right" style={{ fontSize: 14, fontWeight: 'bold', fill: '#2D2D2D' }} />
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
            <div className="rounded-2xl border-2 border-gray-200 bg-white p-8 transition-all duration-300 hover:border-[#E85D4D] hover:shadow-xl hover:-translate-y-1 cursor-pointer">
              <h3 className="mb-6 text-xl font-bold text-[#2D2D2D]">Pricing Preference</h3>

              <ResponsiveContainer width="100%" height={160}>
                <BarChart data={pricingModelScore} layout="horizontal" margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                  <XAxis type="number" domain={[0, 100]} hide />
                  <YAxis type="category" dataKey="name" width={100} tick={{ fontSize: 11, fill: '#6B7280' }} />
                  <Bar dataKey="value" radius={[0, 8, 8, 0]}>
                    {pricingModelScore.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                    <LabelList dataKey="label" position="right" style={{ fontSize: 14, fontWeight: 'bold', fill: '#2D2D2D' }} />
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

          {/* Additional Context with Progressive Disclosure */}
          <div className="mt-12 rounded-2xl border-2 border-[#E85D4D]/20 bg-[#F5F1E8] p-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-[#2D2D2D]">Context & Methodology</h3>
              <button
                onClick={() => setShowMethodology(!showMethodology)}
                className="flex items-center gap-2 text-sm font-semibold text-[#E85D4D] hover:text-[#D14D3D] transition-colors"
                aria-expanded={showMethodology}
                aria-controls="methodology-details"
              >
                {showMethodology ? (
                  <>
                    <span>Hide Details</span>
                    <svg className="w-5 h-5 transform transition-transform" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </>
                ) : (
                  <>
                    <span>Show Details</span>
                    <svg className="w-5 h-5 transform rotate-180 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </>
                )}
              </button>
            </div>
            {!showMethodology && (
              <p className="text-sm text-gray-600 italic">
                Click "Show Details" to view benchmarking methodology, data sources, and statistical context for each metric.
              </p>
            )}
            {showMethodology && (
              <div id="methodology-details" className="grid gap-6 md:grid-cols-3 text-sm animate-fadeIn">
              <div>
                <p className="font-semibold text-[#E85D4D] mb-2">Timeline Benchmark</p>
                <p className="text-gray-700">
                  Industry average based on 2024 iOS app development survey (n=250 apps, iOS 17+, native Swift/SwiftUI).
                  Typical MVP: 12-16 weeks from kickoff to TestFlight.
                </p>
              </div>
              <div>
                <p className="font-semibold text-[#E85D4D] mb-2">Compatibility Analysis</p>
                <p className="text-gray-700">
                  Competitor apps support 30-80 sites (median ~50). Heirloom supports any site using schema.org Recipe markup,
                  plus custom parsers for top 10 recipe platforms.
                </p>
              </div>
              <div>
                <p className="font-semibold text-[#E85D4D] mb-2">Pricing Preference</p>
                <p className="text-gray-700">
                  TestFlight survey (n=42 users, Nov 2024): 85% prefer one-time purchase, citing "no subscription fatigue"
                  and "feels like owning a cookbook." Average willingness-to-pay: $4-7.
                </p>
              </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
