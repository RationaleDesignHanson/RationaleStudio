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
                    ? 'bg-white text-[#E85D4D] z-10 translate-y-[4px] shadow-md'
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
                  <span><strong>Browse Example Recipes:</strong> Use the category dropdown to filter through 23 curated recipes (Dinner, Breakfast, Dessert, Sides)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#E85D4D]">2.</span>
                  <span><strong>Try Rando Mode:</strong> Select <strong>🎲 Rando</strong> from the dropdown to generate 10 random recipes with silly names (like "Chaotic Tomato Explosion" or "Dr. Chaos's Garlic Fiasco") to stress-test the parser</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#E85D4D]">3.</span>
                  <span><strong>Add from URL:</strong> Paste a single recipe URL, or click <strong>"Bulk Mode"</strong> to process multiple URLs simultaneously with real-time progress tracking</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#E85D4D]">4.</span>
                  <span><strong>Watch Consolidation:</strong> As you add recipes, the right column shows your shopping list auto-updating with consolidated ingredients</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#E85D4D]">5.</span>
                  <span><strong>Unit Toggle:</strong> Switch between <strong>Imperial</strong> and <strong>Metric</strong> units in the shopping list header</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#E85D4D]">6.</span>
                  <span><strong>Smart Grouping:</strong> Notice how ingredients are grouped by category (Produce, Dairy, Meat, etc.) for efficient shopping</span>
                </li>
              </ul>
            )}

            {activeDemo === 'dinner' && (
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-[#E85D4D]">1.</span>
                  <span><strong>Select Recipes:</strong> Choose which dishes to include in your dinner party (roast, potatoes, vegetables, salad)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#E85D4D]">2.</span>
                  <span><strong>Set Dinner Time:</strong> Pick your desired meal time and watch the timeline adjust to show when to start each recipe</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#E85D4D]">3.</span>
                  <span><strong>Smart Sequencing:</strong> Notice how recipes are staggered so everything finishes perfectly at dinner time</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#E85D4D]">4.</span>
                  <span><strong>Simulate Cooking:</strong> Click "Start Cooking" and adjust speed (1x to 60x) to watch the timeline progress in real-time</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#E85D4D]">5.</span>
                  <span><strong>Auto Shopping List:</strong> Scroll down to see a consolidated shopping list automatically generated from your selected recipes</span>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
