// components/PrototypeEmbed.tsx

'use client'

import { useState } from 'react'
import { RecipeCardDemo, ShoppingListDemo, DinnerPartyDemo, SmallifyDemo } from '@/components/heirloom/demos'

export default function PrototypeEmbed() {
  const [activeDemo, setActiveDemo] = useState<'card' | 'shopping' | 'dinner' | 'smallify'>('card')
  const [dinnerPartyAddedToList, setDinnerPartyAddedToList] = useState(false)

  const handleAddDinnerPartyToList = () => {
    setDinnerPartyAddedToList(true)
    setActiveDemo('shopping')
  }

  const demos = [
    { id: 'card' as const, label: 'Recipe Card', icon: '' },
    { id: 'shopping' as const, label: 'Shopping List', icon: '' },
    { id: 'dinner' as const, label: 'Dinner Party', icon: '' },
    { id: 'smallify' as const, label: 'Smallify', icon: '' },
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
            Explore Heirloom's key features in these interactive demos. No download required.
          </p>
        </div>

        {/* Demo Selector */}
        <div className="mx-auto max-w-6xl mb-8">
          <div className="flex justify-center gap-4 flex-wrap">
            {demos.map(demo => (
              <button
                key={demo.id}
                onClick={() => setActiveDemo(demo.id)}
                className={`px-6 py-3 rounded-full font-semibold transition-all flex items-center gap-2 ${
                  activeDemo === demo.id
                    ? 'bg-[#E85D4D] text-white shadow-lg scale-105'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                <span className="text-xl">{demo.icon}</span>
                <span>{demo.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Demo Container */}
        <div className="mx-auto max-w-6xl">
          <div className="rounded-2xl border-4 border-gray-200 shadow-2xl overflow-hidden">
            {activeDemo === 'card' && <RecipeCardDemo />}
            {activeDemo === 'shopping' && <ShoppingListDemo dinnerPartyAdded={dinnerPartyAddedToList} />}
            {activeDemo === 'dinner' && <DinnerPartyDemo onAddToShoppingList={handleAddDinnerPartyToList} />}
            {activeDemo === 'smallify' && <SmallifyDemo />}
          </div>

          {/* Instructions */}
          <div className="mt-8 rounded-xl bg-[#FBF8F3] p-6">
            <h4 className="mb-3 font-semibold text-[#2D2D2D]">
              How to use the demos:
            </h4>

            {activeDemo === 'card' && (
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-[#E85D4D]">1.</span>
                  <span>Choose from 4 vintage backgrounds (cream, vintage paper, recipe card, cookbook)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#E85D4D]">2.</span>
                  <span>Add up to 3 stickers from 50+ hand-drawn options across categories</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#E85D4D]">3.</span>
                  <span>See how customizations preserve the vintage recipe card aesthetic</span>
                </li>
              </ul>
            )}

            {activeDemo === 'shopping' && (
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-[#E85D4D]">1.</span>
                  <span>Notice how Butter and Sugar show <strong>total amounts</strong> calculated from multiple recipes</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#E85D4D]">2.</span>
                  <span>Aggregated ingredients show a breakdown of individual amounts with recipe sources</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#E85D4D]">3.</span>
                  <span><strong>Try it:</strong> Switch to Dinner Party, click "Add to Shopping List", then come back to see Butter's total updated with a 3rd recipe!</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#E85D4D]">4.</span>
                  <span>Check off items as you shop to track progress</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#E85D4D]">5.</span>
                  <span>Export to iOS Reminders for cross-device sync via iCloud</span>
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
                  <span><strong>Click "Add to Shopping List"</strong> then switch to the Shopping List tab to see dinner party recipes added!</span>
                </li>
              </ul>
            )}

            {activeDemo === 'smallify' && (
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-[#E85D4D]">1.</span>
                  <span>Select different serving sizes to see <strong>intelligent ingredient scaling</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#E85D4D]">2.</span>
                  <span>Notice <strong>purple "Smart Scaled" badges</strong> on ingredients with non-linear adjustments</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#E85D4D]">3.</span>
                  <span>See how spices scale at 90% (too much overpowers), eggs at 95% (rounded to whole numbers)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#E85D4D]">4.</span>
                  <span>Watch for warnings when scaling to extreme sizes (very small or very large batches)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#E85D4D]">5.</span>
                  <span>Compare original quantities (shown in gray) to understand the scaling adjustments</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#E85D4D]">6.</span>
                  <span><strong>Pro tip:</strong> Try scaling to 6 cookies vs 72 cookies to see how dramatically different the adjustments are!</span>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
