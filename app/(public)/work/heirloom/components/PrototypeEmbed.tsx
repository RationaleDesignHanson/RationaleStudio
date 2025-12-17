// components/PrototypeEmbed.tsx

'use client'

import { useState, lazy, Suspense } from 'react'
import { DinnerPartyDemo } from '@/components/heirloom/demos'

// Lazy load Shopping Lab for performance (complex component with many features)
const ShoppingLabDemo = lazy(() =>
  import('@/components/heirloom/demos').then(mod => ({ default: mod.ShoppingLabDemo }))
)

export default function PrototypeEmbed() {
  const [activeDemo, setActiveDemo] = useState<'shopping' | 'dinner'>('shopping')

  const demos = [
    { id: 'shopping' as const, label: 'Shopping Lab', icon: '' },
    { id: 'dinner' as const, label: 'Dinner Party', icon: '' },
  ]

  return (
    <section id="prototype" className="bg-white py-12 md:py-16 lg:py-20 md:py-28">
      <div className="container mx-auto px-6 md:px-12 lg:px-16">
        {/* Section Header */}
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <h2 className="mb-6 text-2xl md:text-3xl lg:text-4xl font-bold text-[#2D2D2D] md:text-5xl">
            Try It Yourself
          </h2>
          <p className="text-xl text-gray-700">
            Explore Heirloom's intelligent shopping features in these interactive demos. No download required.
          </p>
        </div>

        {/* Demo Container with Binder Tabs */}
        <div className="mx-auto max-w-6xl">
          {/* Binder Tabs - Positioned above the demo */}
          <div className="flex justify-start gap-0.5 mb-[-4px] pl-8 md:pl-12">
            {demos.map(demo => (
              <button
                key={demo.id}
                onClick={() => setActiveDemo(demo.id)}
                className={`
                  relative px-3 md:px-4 py-1.5 md:py-2 text-sm md:text-base font-bold transition-all
                  ${activeDemo === demo.id
                    ? 'bg-white text-[#E85D4D] z-10 translate-y-[4px]'
                    : 'bg-gray-100/50 text-gray-500 hover:text-[#E85D4D] rounded-t-sm'
                  }
                `}
                style={{
                  clipPath: activeDemo === demo.id
                    ? 'polygon(5% 0%, 95% 0%, 100% 100%, 0% 100%)'
                    : 'none'
                }}
              >
                <span>{demo.label}</span>
                {/* Tab hole punch effect */}
                {activeDemo === demo.id && (
                  <div className="absolute top-0.5 left-1/2 -translate-x-1/2 w-0.5 h-0.5 rounded-full bg-gray-400"></div>
                )}
              </button>
            ))}
          </div>

          {/* Demo Container */}
          <div className="rounded-2xl border-4 border-gray-200 shadow-2xl overflow-hidden relative z-0 bg-white">
            <div className="p-6 md:p-8 lg:p-12">
              {activeDemo === 'shopping' && (
                <Suspense fallback={
                  <div className="flex items-center justify-center py-20">
                    <div className="text-center">
                      <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#E85D4D]"></div>
                      <p className="mt-4 text-gray-600">Loading Shopping Lab...</p>
                    </div>
                  </div>
                }>
                  <ShoppingLabDemo />
                </Suspense>
              )}
              {activeDemo === 'dinner' && <DinnerPartyDemo />}
            </div>
          </div>

          {/* Instructions */}
          <div className="mt-8 rounded-xl bg-[#FBF8F3] p-6">
            <h4 className="mb-3 font-semibold text-[#2D2D2D]">
              How to use the demos:
            </h4>

            {activeDemo === 'shopping' && (
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-[#E85D4D]">1.</span>
                  <span><strong>Add Recipes:</strong> Enter recipes manually, paste a single URL, or use <strong>Bulk Mode</strong> to import multiple recipe URLs at once (comma or newline separated)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#E85D4D]">2.</span>
                  <span><strong>Bulk Import Demo:</strong> Click "Bulk Mode →" to see how the scraper processes 5-10 recipe URLs simultaneously with real-time progress tracking</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#E85D4D]">3.</span>
                  <span><strong>Track Pantry:</strong> Switch to the Pantry tab and add items you already have at home</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#E85D4D]">4.</span>
                  <span><strong>Generate Smart List:</strong> Click "Generate List" to see ingredients consolidated and pantry items excluded</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#E85D4D]">5.</span>
                  <span><strong>Parser Demo:</strong> Try the Parser tab to see how ingredient text is analyzed in real-time (try "2-3 cups flour" or "1 1/2 lbs butter, softened")</span>
                </li>
              </ul>
            )}

            {activeDemo === 'dinner' && (
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-[#E85D4D]">1.</span>
                  <span>Adjust the number of guests to see ingredients auto-scale</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#E85D4D]">2.</span>
                  <span>Set your desired dinner time and watch the timeline adjust</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#E85D4D]">3.</span>
                  <span>See how recipes are sequenced so everything finishes at dinner time</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#E85D4D]">4.</span>
                  <span>Notice scaling multipliers (×1.5, ×2) when guest count exceeds servings</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#E85D4D]">5.</span>
                  <span><strong>Play the simulation</strong> at various speeds (1x to 60x) to watch the timeline progress in real-time</span>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
