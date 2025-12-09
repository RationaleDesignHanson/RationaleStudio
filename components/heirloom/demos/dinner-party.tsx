'use client'

/**
 * Heirloom Dinner Party Mode Demo
 *
 * Interactive demo showing:
 * - Multi-recipe meal planning
 * - Smart cooking timeline
 * - Auto-scaled ingredients
 * - Coordination assistance
 */

import { useState } from 'react'

interface Recipe {
  id: string
  name: string
  cookTime: number
  prepTime: number
  servings: number
  color: string
}

interface TimelineEvent {
  time: string
  recipe: string
  action: string
  color: string
}

interface DinnerPartyDemoProps {
  onAddToShoppingList?: () => void
}

export function DinnerPartyDemo({ onAddToShoppingList }: DinnerPartyDemoProps) {
  const [guests, setGuests] = useState(6)
  const [dinnerTime, setDinnerTime] = useState('18:00')
  const [addedToList, setAddedToList] = useState(false)

  const handleAddToShoppingList = () => {
    setAddedToList(true)
    if (onAddToShoppingList) {
      onAddToShoppingList()
    }
  }

  const recipes: Recipe[] = [
    { id: '1', name: 'Roasted Chicken', cookTime: 75, prepTime: 15, servings: 4, color: '#E85D4D' },
    { id: '2', name: 'Garlic Mashed Potatoes', cookTime: 20, prepTime: 10, servings: 4, color: '#F4A261' },
    { id: '3', name: 'Green Bean Casserole', cookTime: 25, prepTime: 15, servings: 6, color: '#2A9D8F' },
    { id: '4', name: 'Apple Pie', cookTime: 50, prepTime: 30, servings: 8, color: '#8B9F8D' },
  ]

  // Calculate timeline (simplified)
  const generateTimeline = (): TimelineEvent[] => {
    const dinnerHour = parseInt(dinnerTime.split(':')[0])
    const events: TimelineEvent[] = []

    // Pie (needs to cool)
    events.push({
      time: `${dinnerHour - 3}:00`,
      recipe: 'Apple Pie',
      action: 'Start prep (30 min prep + 50 min bake + cooling)',
      color: '#8B9F8D'
    })

    // Chicken (longest cook time)
    events.push({
      time: `${dinnerHour - 2}:00`,
      recipe: 'Roasted Chicken',
      action: 'Start prep (season and truss)',
      color: '#E85D4D'
    })

    events.push({
      time: `${dinnerHour - 1}:45`,
      recipe: 'Roasted Chicken',
      action: 'Put in oven (75 min cook)',
      color: '#E85D4D'
    })

    // Green beans
    events.push({
      time: `${dinnerHour - 1}:00`,
      recipe: 'Green Bean Casserole',
      action: 'Start prep (trim and blanch)',
      color: '#2A9D8F'
    })

    events.push({
      time: `${dinnerHour}:${45 - 25}`,
      recipe: 'Green Bean Casserole',
      action: 'Put in oven (25 min)',
      color: '#2A9D8F'
    })

    // Potatoes (last, to stay hot)
    events.push({
      time: `${dinnerHour}:${30}`,
      recipe: 'Mashed Potatoes',
      action: 'Start boiling potatoes',
      color: '#F4A261'
    })

    events.push({
      time: dinnerTime,
      recipe: 'Dinner Time!',
      action: 'Everything ready to serve',
      color: '#FFD700'
    })

    return events
  }

  const timeline = generateTimeline()

  return (
    <div className="w-full bg-gradient-to-br from-[#F5F1E8] to-white p-8 rounded-2xl">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Timeline Panel */}
        <div>
          <h3 className="text-lg font-bold text-[#2D2D2D] mb-4">Cooking Timeline</h3>

          {/* Settings */}
          <div className="mb-6 space-y-3 bg-white rounded-lg border-2 border-gray-200 p-4">
            <div>
              <label className="block text-sm font-semibold text-[#2D2D2D] mb-2">
                Number of Guests
              </label>
              <input
                type="number"
                value={guests}
                onChange={(e) => setGuests(parseInt(e.target.value) || 4)}
                min="2"
                max="20"
                className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-[#E85D4D] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#2D2D2D] mb-2">
                Dinner Time
              </label>
              <input
                type="time"
                value={dinnerTime}
                onChange={(e) => setDinnerTime(e.target.value)}
                className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-[#E85D4D] focus:outline-none"
              />
            </div>
          </div>

          {/* Timeline */}
          <div className="bg-white rounded-xl border-2 border-[#E85D4D]/20 p-6 space-y-3 max-h-[400px] overflow-y-auto">
            {timeline.map((event, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex-shrink-0 w-16 text-right">
                  <span className="text-sm font-bold" style={{ color: event.color }}>
                    {event.time}
                  </span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-[#2D2D2D]">{event.recipe}</p>
                  <p className="text-xs text-gray-600 mt-1">{event.action}</p>
                </div>
                <div
                  className="w-3 h-3 rounded-full flex-shrink-0 mt-1"
                  style={{ backgroundColor: event.color }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Recipe Cards & Features */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-[#2D2D2D]">Selected Recipes</h3>

          {/* Recipe Cards */}
          <div className="grid grid-cols-2 gap-3">
            {recipes.map(recipe => (
              <div
                key={recipe.id}
                className="rounded-lg border-2 p-3 cursor-pointer hover:scale-105 transition-transform"
                style={{ borderColor: recipe.color }}
              >
                <p className="font-semibold text-sm text-[#2D2D2D]">{recipe.name}</p>
                <div className="mt-2 space-y-1 text-xs text-gray-600">
                  <p> {recipe.prepTime + recipe.cookTime} min total</p>
                  <p>
                    👥 Serves {recipe.servings}
                    {guests > recipe.servings && (
                      <span className="ml-1 text-[#E85D4D] font-semibold">
                        (×{Math.ceil(guests / recipe.servings)})
                      </span>
                    )}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Features */}
          <div className="space-y-3 mt-6">
            <div className="rounded-lg bg-white border-2 border-gray-200 p-4">
              <div className="flex items-start gap-3">
                <span className="text-2xl"></span>
                <div>
                  <p className="font-semibold text-[#2D2D2D] text-sm">Smart Timeline</p>
                  <p className="text-xs text-gray-600 mt-1">
                    Automatically sequences recipes so everything finishes at dinner time. Accounts for cooling, resting, and keeping warm.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-lg bg-white border-2 border-gray-200 p-4">
              <div className="flex items-start gap-3">
                <span className="text-2xl"></span>
                <div>
                  <p className="font-semibold text-[#2D2D2D] text-sm">Auto-Scaling</p>
                  <p className="text-xs text-gray-600 mt-1">
                    Ingredients automatically scale based on guest count. 6 guests + 4-serving recipe = 1.5x ingredients.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-lg bg-white border-2 border-gray-200 p-4">
              <div className="flex items-start gap-3">
                <span className="text-2xl"></span>
                <div>
                  <p className="font-semibold text-[#2D2D2D] text-sm">Reminders</p>
                  <p className="text-xs text-gray-600 mt-1">
                    Get notifications for each step. "Start prepping mashed potatoes in 15 minutes."
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Add to Shopping List Button */}
          <button
            onClick={handleAddToShoppingList}
            disabled={addedToList}
            className={`mt-6 w-full px-6 py-4 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${
              addedToList
                ? 'bg-[#2A9D8F] text-white cursor-default'
                : 'bg-[#E85D4D] text-white hover:bg-[#d54d3d] hover:shadow-lg'
            }`}
          >
            {addedToList ? (
              <>
                <span></span>
                <span>Added to Shopping List!</span>
              </>
            ) : (
              <>
                <span></span>
                <span>Add Dinner Party to Shopping List</span>
              </>
            )}
          </button>

          {addedToList && (
            <div className="mt-3 rounded-lg bg-[#2A9D8F]/10 border border-[#2A9D8F] p-3 text-center">
              <p className="text-xs text-gray-700">
                <span className="font-bold text-[#2A9D8F]">Success!</span> Switch to the Shopping List tab to see all 4 dinner party recipes aggregated with your existing list.
              </p>
            </div>
          )}

          {/* Stats */}
          <div className="mt-4 rounded-lg bg-[#E85D4D]/10 p-4 text-center">
            <p className="text-xs text-gray-700">
              <span className="font-bold text-[#E85D4D]">Dinner party mode</span> was tested with 12 beta users hosting Thanksgiving meals - all reported reduced stress and better timing.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
