'use client'

/**
 * Heirloom Card Personalizer Demo
 *
 * Interactive demo showing:
 * - Recipe card with vintage backgrounds
 * - Sticker library (50+ hand-drawn stickers)
 * - Handwritten annotation tool
 * - Real-time preview
 */

import { useState } from 'react'
import Image from 'next/image'

interface Sticker {
  id: string
  name: string
  path: string
  category: 'love' | 'food'
}

export function RecipeCardDemo() {
  const [selectedBackground, setSelectedBackground] = useState('cream')
  const [selectedStickers, setSelectedStickers] = useState<Sticker[]>([])
  const [handwrittenNote, setHandwrittenNote] = useState("Mom's secret: use cold butter!")

  const backgrounds = [
    { id: 'cream', name: 'Cream', color: '#F5F1E8' },
    { id: 'vintage-paper', name: 'Vintage Paper', color: '#F4E4C1' },
    { id: 'recipe-card', name: 'Recipe Card', color: '#FFF8E7' },
    { id: 'cookbook', name: 'Cookbook', color: '#F0E6D2' },
  ]

  const availableStickers: Sticker[] = [
    // Love stickers
    { id: 'love-heart', name: 'Heart', path: '/heirloom/stickers/love/sticker_love_heart.png', category: 'love' },
    { id: 'love-kiss', name: 'Kiss', path: '/heirloom/stickers/love/sticker_love_kiss.png', category: 'love' },
    { id: 'love-badge', name: 'Badge', path: '/heirloom/stickers/love/sticker_love_badge.png', category: 'love' },
    { id: 'love-gift', name: 'Gift', path: '/heirloom/stickers/love/sticker_love_gift.png', category: 'love' },
    // Food stickers
    { id: 'food-pie', name: 'Pie', path: '/heirloom/stickers/food/sticker_food_pie.png', category: 'food' },
    { id: 'food-cookie', name: 'Cookie', path: '/heirloom/stickers/food/sticker_food_cookie.png', category: 'food' },
    { id: 'food-butter', name: 'Butter', path: '/heirloom/stickers/food/sticker_food_butter.png', category: 'food' },
    { id: 'food-lemon', name: 'Lemon', path: '/heirloom/stickers/food/sticker_food_lemon.png', category: 'food' },
  ]

  const addSticker = (sticker: Sticker) => {
    if (selectedStickers.length < 3) {
      setSelectedStickers([...selectedStickers, sticker])
    }
  }

  const removeSticker = (index: number) => {
    setSelectedStickers(selectedStickers.filter((_, i) => i !== index))
  }

  return (
    <div className="w-full bg-gradient-to-br from-[#F5F1E8] to-white p-8 rounded-2xl">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Preview Panel */}
        <div>
          <h3 className="text-lg font-bold text-[#2D2D2D] mb-4">Recipe Card Preview</h3>
          <div
            className="aspect-[3/4] rounded-2xl border-4 border-[#E85D4D]/20 shadow-2xl relative overflow-hidden"
            style={{ backgroundColor: backgrounds.find(b => b.id === selectedBackground)?.color }}
          >
            {/* Recipe Card Content */}
            <div className="p-6">
              <h4 className="text-2xl font-bold text-[#2D2D2D] mb-2">Grandma's Apple Pie</h4>
              <p className="text-sm text-gray-600 mb-4">Family favorite since 1952</p>

              <div className="space-y-2 text-sm">
                <p className="font-semibold text-[#2D2D2D]">Ingredients:</p>
                <p className="text-gray-700">• 6 cups sliced apples</p>
                <p className="text-gray-700">• 1 cup sugar</p>
                <p className="text-gray-700">• 2 tbsp butter</p>
              </div>

              {/* Stickers Overlay */}
              {selectedStickers.map((sticker, idx) => (
                <div
                  key={idx}
                  onClick={() => removeSticker(idx)}
                  className="absolute cursor-pointer hover:scale-110 transition-transform"
                  style={{
                    top: `${20 + idx * 15}%`,
                    right: `${10 + idx * 10}%`,
                    width: '60px',
                    height: '60px'
                  }}
                  title="Click to remove"
                >
                  <Image
                    src={sticker.path}
                    alt={sticker.name}
                    width={60}
                    height={60}
                    className="drop-shadow-md"
                  />
                </div>
              ))}
            </div>

            {/* Handwritten Note - Now Larger and Editable */}
            <div className="absolute bottom-6 left-6 right-6 bg-[#FFE34D] p-4 rounded rotate-[-2deg] shadow-lg">
              <textarea
                value={handwrittenNote}
                onChange={(e) => setHandwrittenNote(e.target.value)}
                placeholder="Add your personal note..."
                className="w-full bg-transparent font-handwriting text-[#2D2D2D] text-base resize-none border-none outline-none"
                rows={2}
                maxLength={80}
              />
            </div>
          </div>
        </div>

        {/* Customization Panel */}
        <div className="space-y-6">
          {/* Backgrounds */}
          <div>
            <h4 className="text-base font-bold text-[#2D2D2D] mb-3">Backgrounds</h4>
            <div className="grid grid-cols-4 gap-2">
              {backgrounds.map(bg => (
                <button
                  key={bg.id}
                  onClick={() => setSelectedBackground(bg.id)}
                  className={`aspect-square rounded-lg border-2 transition-all ${
                    selectedBackground === bg.id
                      ? 'border-[#E85D4D] scale-110 shadow-md'
                      : 'border-gray-300 hover:border-[#E85D4D]/50'
                  }`}
                  style={{ backgroundColor: bg.color }}
                  title={bg.name}
                />
              ))}
            </div>
          </div>

          {/* Stickers */}
          <div>
            <h4 className="text-base font-bold text-[#2D2D2D] mb-3">
              Love & Food Stickers{' '}
              <span className="text-xs text-gray-600">
                ({selectedStickers.length}/3 added)
              </span>
            </h4>
            <div className="grid grid-cols-4 gap-3">
              {availableStickers.map(sticker => (
                <button
                  key={sticker.id}
                  onClick={() => addSticker(sticker)}
                  disabled={selectedStickers.length >= 3}
                  className={`aspect-square rounded-lg border-2 border-gray-300 hover:border-[#E85D4D] hover:scale-110 transition-all flex items-center justify-center bg-white p-2 ${
                    selectedStickers.length >= 3 ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  title={sticker.name}
                >
                  <Image
                    src={sticker.path}
                    alt={sticker.name}
                    width={40}
                    height={40}
                    className="w-full h-full object-contain"
                  />
                </button>
              ))}
            </div>
            <button
              onClick={() => setSelectedStickers([])}
              className="mt-3 text-xs text-[#E85D4D] hover:underline"
            >
              Clear all stickers
            </button>
          </div>

          {/* Handwritten Note Editor */}
          <div>
            <h4 className="text-base font-bold text-[#2D2D2D] mb-3">Handwritten Note</h4>
            <textarea
              value={handwrittenNote}
              onChange={(e) => setHandwrittenNote(e.target.value)}
              placeholder="Type your personal note..."
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#E85D4D] focus:outline-none font-handwriting text-sm resize-none"
              rows={3}
              maxLength={80}
            />
            <p className="text-xs text-gray-500 mt-1">{handwrittenNote.length}/80 characters</p>
          </div>

          {/* Instructions */}
          <div className="rounded-lg bg-[#E85D4D]/10 p-4 text-sm text-gray-700">
            <p className="font-semibold text-[#2D2D2D] mb-2">How it works:</p>
            <ul className="space-y-1 text-xs">
              <li>• Choose a vintage background</li>
              <li>• Add love & food stickers (up to 3)</li>
              <li>• Edit your handwritten note</li>
              <li>• Click stickers on the card to remove them</li>
              <li>• All customization is preserved when shared!</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
