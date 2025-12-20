// components/PrototypeEmbed.tsx

'use client'

import { useState, lazy, Suspense } from 'react'
import { DinnerPartyDemo } from '@/components/heirloom/demos'

// Lazy load Shopping Lab and Recipe Capture for performance
const ShoppingLabDemo = lazy(() =>
  import('@/components/heirloom/demos').then(mod => ({ default: mod.ShoppingLabDemo }))
)

const RecipeCaptureDemo = lazy(() =>
  import('@/components/heirloom/HeirloomDemo')
)

export default function PrototypeEmbed() {
  const [activeDemo, setActiveDemo] = useState<'capture' | 'shopping' | 'dinner'>('capture')
  const [instructionsOpen, setInstructionsOpen] = useState(false)

  const demos = [
    { id: 'capture' as const, label: 'Recipe Capture', icon: '' },
    { id: 'shopping' as const, label: 'Shopping Lab', icon: '' },
    { id: 'dinner' as const, label: 'Dinner Party', icon: '' },
  ]

  return (
    <section id="prototype" className="bg-white py-8 md:py-16 lg:py-20">
      <div className="container mx-auto px-6 md:px-12 lg:px-16">
        {/* Section Header */}
        <div className="mx-auto mb-12 max-w-5xl text-center">
          <h2 className="mb-6 text-3xl sm:text-4xl md:text-5xl font-bold text-[#2D2D2D]">
            Try It Yourself
          </h2>
        </div>

        {/* Demo Container with Binder Tabs */}
        <div className="mx-auto max-w-6xl">
          {/* Binder Tabs - Positioned above the demo */}
          <div className="flex justify-start gap-0.5 mb-[-1px] pl-8 md:pl-12">
            {demos.map(demo => (
              <button
                key={demo.id}
                onClick={() => setActiveDemo(demo.id)}
                className={`
                  relative px-3 md:px-4 py-1.5 md:py-2 text-sm md:text-base font-bold transition-all rounded-t-lg
                  ${activeDemo === demo.id
                    ? 'bg-white text-[#E85D4D] z-10 border-4 border-b-0 border-[#e0d5c5]'
                    : 'bg-gray-100/50 text-gray-500 hover:text-[#E85D4D]'
                  }
                `}
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
          <div className="rounded-2xl border-4 border-[#e0d5c5] shadow-2xl overflow-hidden relative z-0 bg-white">
            <div className="p-6 md:p-8 lg:p-12">
              {activeDemo === 'capture' && (
                <Suspense fallback={
                  <div className="flex items-center justify-center py-20">
                    <div className="text-center">
                      <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#E85D4D]"></div>
                      <p className="mt-4 text-sm md:text-base text-gray-600">Loading Recipe Capture...</p>
                    </div>
                  </div>
                }>
                  <RecipeCaptureDemo className="!min-h-0 !bg-transparent !pt-8 !px-0 !pb-0" />
                </Suspense>
              )}
              {activeDemo === 'shopping' && (
                <Suspense fallback={
                  <div className="flex items-center justify-center py-20">
                    <div className="text-center">
                      <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#E85D4D]"></div>
                      <p className="mt-4 text-sm md:text-base text-gray-600">Loading Shopping Lab...</p>
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
            <p className="text-sm md:text-base text-[#E85D4D] mb-4 font-semibold">
              Experience Heirloom's recipe capture, smart shopping, and dinner planning features. No download required.
            </p>
            <button
              onClick={() => setInstructionsOpen(!instructionsOpen)}
              className="flex items-center justify-between w-full mb-3 text-base md:text-lg font-semibold text-[#2D2D2D] hover:text-[#E85D4D] transition-colors"
            >
              <span>How to use the demos</span>
              <svg
                className={`w-5 h-5 transition-transform duration-200 ${instructionsOpen ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <div className={`overflow-hidden transition-all duration-300 ${instructionsOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}>
            {activeDemo === 'capture' && (
              <ul className="space-y-2 text-sm md:text-base text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-[#E85D4D]">1.</span>
                  <span><strong>Choose a Sample Recipe:</strong> Browse 23 photographed recipe cards organized by category, or upload your own handwritten recipe photo</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#E85D4D]">2.</span>
                  <span><strong>Watch OCR Extraction:</strong> We analyze the recipe card, extract the title, ingredients, and instructions with confidence scoring</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#E85D4D]">3.</span>
                  <span><strong>Edit the Recipe:</strong> Click any field (title, ingredients, instructions) to make corrections or add notes</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#E85D4D]">4.</span>
                  <span><strong>Share with Mom:</strong> Simulate passing the recipe to the next generation — Mom can add her own notes and stickers on the back of the card</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#E85D4D]">5.</span>
                  <span><strong>Add Your Own Notes:</strong> Continue the lineage by adding your generation's modifications and memories</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#E85D4D]">6.</span>
                  <span><strong>View the Timeline:</strong> See how recipes evolve across generations with visual attribution and change tracking</span>
                </li>
              </ul>
            )}

            {activeDemo === 'shopping' && (
              <ul className="space-y-2 text-sm md:text-base text-gray-700">
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
              <ul className="space-y-2 text-sm md:text-base text-gray-700">
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
      </div>
    </section>
  )
}
