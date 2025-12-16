'use client'

import { useState } from 'react'

export default function UserJourneyMap() {
  const [hoveredStage, setHoveredStage] = useState<number | null>(null)
  const journeyStages = [
    {
      stage: 'Discover',
      icon: '🔍',
      color: 'var(--color-heirloom-coral)',
      userAction: 'User finds recipe online or in cookbook',
      emotion: 'Interested',
      emotionLevel: 70,
      painPoint: 'Recipe scattered across multiple sources, hard to organize',
      solution: 'Universal import from 500+ sites + OCR scanning',
      features: ['URL import', 'OCR scan', 'Manual entry'],
    },
    {
      stage: 'Import',
      icon: '📥',
      color: 'var(--color-heirloom-orange)',
      userAction: 'Adds recipe to Heirloom collection',
      emotion: 'Hopeful',
      emotionLevel: 75,
      painPoint: 'Import fails or loses formatting, ingredients not parsed correctly',
      solution: 'Smart parser with ingredient normalization',
      features: ['Auto-parse ingredients', 'Image caching', 'Recipe validation'],
    },
    {
      stage: 'Customize',
      icon: '',
      color: 'var(--color-heirloom-teal)',
      userAction: 'Personalizes card with colors, stickers, notes',
      emotion: 'Delighted',
      emotionLevel: 95,
      painPoint: 'Recipe apps treat recipes like database entries, no personality',
      solution: 'Vintage card design with stickers and handwriting',
      features: ['6 backgrounds', '50+ stickers', 'Handwriting font'],
    },
    {
      stage: 'Share',
      icon: '📤',
      color: 'var(--color-heirloom-sage)',
      userAction: 'Exports styled card or shares with family',
      emotion: 'Proud',
      emotionLevel: 90,
      painPoint: 'Shared recipes lose styling, become plain text',
      solution: 'CloudKit sync preserves customization',
      features: ['iCloud sync', 'Image export', 'Family sharing'],
    },
    {
      stage: 'Cook',
      icon: '👨‍🍳',
      color: '#F4A460',
      userAction: 'Follows recipe while cooking, checks off ingredients',
      emotion: 'Confident',
      emotionLevel: 85,
      painPoint: 'Jumping between recipe app and shopping list, ingredients not organized',
      solution: 'Smart shopping lists synced to iOS Reminders',
      features: ['Reminders sync', 'Aisle grouping', 'Multi-recipe merge'],
    },
  ]

  return (
    <div className="w-full">
      <div className="mb-8">
        <h3 className="mb-3 text-2xl font-bold text-[#2D2D2D]">User Journey Map</h3>
        <p className="max-w-3xl text-sm text-gray-600">
          Service blueprint showing user flow from discovery to cooking. Each stage identifies pain points in existing
          recipe apps and demonstrates how Heirloom's features address them.
        </p>
      </div>

      {/* Desktop Timeline - Horizontal Flow */}
      <div className="hidden lg:block">
        <div className="overflow-x-auto">
          <div className="min-w-[1200px]">
            {/* Stage Headers */}
            <div className="mb-8 grid grid-cols-5 gap-4">
              {journeyStages.map((stage, idx) => (
                <div key={idx} className="text-center">
                  <div
                    className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full text-3xl cursor-pointer transition-all duration-300 hover:scale-110"
                    style={{
                      backgroundColor: hoveredStage === idx ? stage.color : `${stage.color}20`,
                      border: `3px solid ${stage.color}`,
                      transform: hoveredStage === idx ? 'scale(1.1)' : 'scale(1)'
                    }}
                    onMouseEnter={() => setHoveredStage(idx)}
                    onMouseLeave={() => setHoveredStage(null)}
                  >
                    {stage.icon}
                  </div>
                  <div className="text-lg font-bold text-[#2D2D2D]">{stage.stage}</div>
                  {idx < journeyStages.length - 1 && (
                    <div className="relative mt-4">
                      <div className="absolute left-1/2 top-0 h-1 w-full" style={{ backgroundColor: journeyStages[idx + 1].color }}></div>
                      <div className="absolute right-0 top-[-4px] h-0 w-0 border-b-[5px] border-l-[8px] border-t-[5px] border-b-transparent border-t-transparent" style={{ borderLeftColor: journeyStages[idx + 1].color }}></div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* User Actions Row */}
            <div className="mb-6 grid grid-cols-5 gap-4">
              {journeyStages.map((stage, idx) => (
                <div key={idx} className="rounded-lg bg-gray-50 p-4">
                  <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">User Action</div>
                  <div className="text-sm text-gray-700">{stage.userAction}</div>
                </div>
              ))}
            </div>

            {/* Emotion Row */}
            <div className="mb-6 grid grid-cols-5 gap-4">
              {journeyStages.map((stage, idx) => (
                <div key={idx} className="rounded-lg p-4" style={{ backgroundColor: `${stage.color}10` }}>
                  <div className="mb-3 flex items-center justify-between">
                    <div className="text-xs font-semibold uppercase tracking-wide" style={{ color: stage.color }}>
                      Emotion
                    </div>
                    <div className="text-sm font-bold text-[#2D2D2D]">{stage.emotion}</div>
                  </div>
                  {/* Emotion Level Bar */}
                  <div className="h-2 overflow-hidden rounded-full bg-gray-200">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${stage.emotionLevel}%`,
                        backgroundColor: stage.color,
                      }}
                    ></div>
                  </div>
                  <div className="mt-1 text-right text-xs text-gray-600">{stage.emotionLevel}%</div>
                </div>
              ))}
            </div>

            {/* Pain Points Row */}
            <div className="mb-6 grid grid-cols-5 gap-4">
              {journeyStages.map((stage, idx) => (
                <div key={idx} className="rounded-lg border-2 border-red-200 bg-red-50 p-4">
                  <div className="mb-2 flex items-center gap-2">
                    <span className="text-red-500"></span>
                    <div className="text-xs font-semibold uppercase tracking-wide text-red-700">Pain Point</div>
                  </div>
                  <div className="text-sm text-gray-700">{stage.painPoint}</div>
                </div>
              ))}
            </div>

            {/* Solution Row */}
            <div className="mb-6 grid grid-cols-5 gap-4">
              {journeyStages.map((stage, idx) => (
                <div key={idx} className="rounded-lg border-2 p-4" style={{ borderColor: stage.color, backgroundColor: `${stage.color}15` }}>
                  <div className="mb-2 flex items-center gap-2">
                    <span style={{ color: stage.color }}></span>
                    <div className="text-xs font-semibold uppercase tracking-wide" style={{ color: stage.color }}>
                      Heirloom Solution
                    </div>
                  </div>
                  <div className="mb-3 text-sm font-semibold text-[#2D2D2D]">{stage.solution}</div>
                  <ul className="space-y-1 text-xs text-gray-600">
                    {stage.features.map((feature, fIdx) => (
                      <li key={fIdx}>• {feature}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile/Tablet - Vertical Flow */}
      <div className="lg:hidden">
        <div className="space-y-8">
          {journeyStages.map((stage, idx) => (
            <div key={idx} className="relative">
              {/* Connector */}
              {idx < journeyStages.length - 1 && (
                <div className="absolute left-8 top-full h-8 w-1" style={{ backgroundColor: journeyStages[idx + 1].color }}></div>
              )}

              <div className="rounded-2xl border-2 p-6" style={{ borderColor: stage.color, backgroundColor: `${stage.color}05` }}>
                {/* Header */}
                <div className="mb-6 flex items-center gap-4">
                  <div
                    className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full text-3xl"
                    style={{ backgroundColor: `${stage.color}20`, border: `3px solid ${stage.color}` }}
                  >
                    {stage.icon}
                  </div>
                  <div>
                    <div className="text-xl font-bold text-[#2D2D2D]">{stage.stage}</div>
                    <div className="text-sm font-semibold" style={{ color: stage.color }}>
                      {stage.emotion} ({stage.emotionLevel}%)
                    </div>
                  </div>
                </div>

                {/* User Action */}
                <div className="mb-4 rounded-lg bg-gray-50 p-4">
                  <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">User Action</div>
                  <div className="text-sm text-gray-700">{stage.userAction}</div>
                </div>

                {/* Pain Point */}
                <div className="mb-4 rounded-lg border-2 border-red-200 bg-red-50 p-4">
                  <div className="mb-2 flex items-center gap-2">
                    <span className="text-red-500"></span>
                    <div className="text-xs font-semibold uppercase tracking-wide text-red-700">Pain Point</div>
                  </div>
                  <div className="text-sm text-gray-700">{stage.painPoint}</div>
                </div>

                {/* Solution */}
                <div className="rounded-lg border-2 p-4" style={{ borderColor: stage.color, backgroundColor: `${stage.color}15` }}>
                  <div className="mb-2 flex items-center gap-2">
                    <span style={{ color: stage.color }}></span>
                    <div className="text-xs font-semibold uppercase tracking-wide" style={{ color: stage.color }}>
                      Heirloom Solution
                    </div>
                  </div>
                  <div className="mb-3 text-sm font-semibold text-[#2D2D2D]">{stage.solution}</div>
                  <ul className="space-y-1 text-xs text-gray-600">
                    {stage.features.map((feature, fIdx) => (
                      <li key={fIdx}>• {feature}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Journey Insights */}
      <div className="mt-12 rounded-2xl border-2 border-[#E85D4D]/20 bg-[#F5F1E8] p-8">
        <h4 className="mb-4 text-xl font-bold text-[#2D2D2D]">Journey Insights</h4>
        <div className="grid gap-6 text-sm md:grid-cols-3">
          <div>
            <p className="mb-2 font-semibold text-[#E85D4D]">Emotional Peak: Customize</p>
            <p className="text-gray-700">
              95% satisfaction during customization phase validates product differentiation. Users reported "finally feels
              personal" and "like a real recipe box." This stage is key retention driver.
            </p>
          </div>
          <div>
            <p className="mb-2 font-semibold text-[#E85D4D]">Critical Path: Import</p>
            <p className="text-gray-700">
              Import success rate directly impacts activation. Smart parser with 94% accuracy (vs 60% industry average)
              reduces drop-off. Failed imports are #1 churn driver in recipe apps.
            </p>
          </div>
          <div>
            <p className="mb-2 font-semibold text-[#E85D4D]">Value Unlock: Cook</p>
            <p className="text-gray-700">
              Reminders sync creates "aha moment" when users realize shopping list auto-populates. 78% of beta testers cited
              this as reason they'd pay for premium. Utility + delight = conversion.
            </p>
          </div>
        </div>
      </div>

      {/* Comparative Analysis */}
      <div className="mt-8 rounded-lg border-2 border-gray-200 bg-white p-6">
        <h4 className="mb-4 text-base font-bold text-[#2D2D2D]">Competitive Journey Comparison</h4>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="pb-3 text-left font-semibold text-gray-700">Stage</th>
                <th className="pb-3 text-left font-semibold text-gray-700">Traditional Recipe Apps</th>
                <th className="pb-3 text-left font-semibold text-[#E85D4D]">Heirloom Advantage</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr>
                <td className="py-3 font-medium text-gray-900">Discover</td>
                <td className="py-3 text-gray-600">Limited import sources (10-30 sites)</td>
                <td className="py-3 text-gray-900">500+ sites + OCR scanning</td>
              </tr>
              <tr>
                <td className="py-3 font-medium text-gray-900">Import</td>
                <td className="py-3 text-gray-600">60% parse accuracy, manual fixes required</td>
                <td className="py-3 text-gray-900">94% parse accuracy, smart normalization</td>
              </tr>
              <tr>
                <td className="py-3 font-medium text-gray-900">Customize</td>
                <td className="py-3 text-gray-600">No customization, database-style list</td>
                <td className="py-3 text-gray-900">Vintage cards, stickers, handwriting</td>
              </tr>
              <tr>
                <td className="py-3 font-medium text-gray-900">Share</td>
                <td className="py-3 text-gray-600">Styling lost on export/share</td>
                <td className="py-3 text-gray-900">CloudKit preserves customization</td>
              </tr>
              <tr>
                <td className="py-3 font-medium text-gray-900">Cook</td>
                <td className="py-3 text-gray-600">In-app shopping list only</td>
                <td className="py-3 text-gray-900">iOS Reminders sync, aisle grouping</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
