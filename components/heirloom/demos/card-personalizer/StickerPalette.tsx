'use client';

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useDrag } from '@use-gesture/react';
import { STICKERS, type Sticker, type PlacedSticker } from '@/components/heirloom/shared/constants';

interface StickerPaletteProps {
  onStickerPlace: (sticker: PlacedSticker) => void;
}

export function StickerPalette({ onStickerPlace }: StickerPaletteProps) {
  const [selectedCategory, setSelectedCategory] = useState<'all' | Sticker['category']>('all');

  const filteredStickers = selectedCategory === 'all'
    ? STICKERS
    : STICKERS.filter(s => s.category === selectedCategory);

  const categories = [
    { id: 'all', label: 'All', icon: '' },
    { id: 'food', label: 'Food', icon: '' },
    { id: 'love', label: 'Love', icon: '❤️' },
    { id: 'endorsements', label: 'Stars', icon: '⭐' },
    { id: 'occasions', label: 'Occasions', icon: '🎉' },
  ];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-700">Add Stickers</label>

        {/* Category Tabs */}
        <div className="flex gap-1 p-1 bg-gray-100 rounded-lg">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id as any)}
              className="flex-1 px-3 py-2 text-sm font-medium rounded-md transition-all"
              style={{
                backgroundColor: selectedCategory === cat.id ? 'white' : 'transparent',
                color: selectedCategory === cat.id ? '#8B4513' : '#666',
                boxShadow: selectedCategory === cat.id ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
              }}
            >
              <span className="mr-1">{cat.icon}</span>
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Sticker Grid */}
      <div className="grid grid-cols-5 gap-3 p-4 bg-gray-50 rounded-lg max-h-[300px] overflow-y-auto">
        {filteredStickers.map(sticker => (
          <DraggableSticker
            key={sticker.id}
            sticker={sticker}
            onPlace={onStickerPlace}
          />
        ))}
      </div>

      <p className="text-xs text-gray-500 text-center">
        Drag stickers onto your recipe card
      </p>
    </div>
  );
}

// ========== DRAGGABLE STICKER ==========
interface DraggableStickerProps {
  sticker: Sticker;
  onPlace: (placed: PlacedSticker) => void;
}

function DraggableSticker({ sticker, onPlace }: DraggableStickerProps) {
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef<HTMLDivElement>(null);

  const bind = useDrag(
    ({ down, movement: [mx, my], first, last }) => {
      if (first) {
        setIsDragging(true);
      }

      if (last && isDragging) {
        setIsDragging(false);

        // Calculate drop position relative to card
        // This will be handled by parent component
        const randomRotation = Math.random() * 20 - 10; // -10 to 10 degrees
        const placed: PlacedSticker = {
          id: `placed-${Date.now()}-${Math.random()}`,
          stickerId: sticker.filename,
          x: 50, // Center (will be adjusted by drop zone)
          y: 50, // Center (will be adjusted by drop zone)
          rotation: randomRotation,
          scale: 1.0,
        };

        onPlace(placed);
      }
    },
    { pointer: { touch: true } }
  );

  return (
    <motion.div
      ref={dragRef}
      {...bind()}
      className="relative cursor-grab active:cursor-grabbing"
      style={{
        touchAction: 'none',
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      title={sticker.name}
    >
      <div
        className="w-14 h-14 rounded-lg flex items-center justify-center transition-all"
        style={{
          backgroundColor: 'white',
          border: '2px solid #E5E5E5',
          boxShadow: isDragging ? '0 8px 16px rgba(0,0,0,0.2)' : '0 2px 4px rgba(0,0,0,0.1)',
        }}
      >
        <img
          src={sticker.path}
          alt={sticker.name}
          className="w-10 h-10 object-contain pointer-events-none"
          draggable={false}
        />
      </div>
    </motion.div>
  );
}

// ========== PLACED STICKER CONTROLS ==========
interface PlacedStickerControlsProps {
  sticker: PlacedSticker;
  cardWidth: number;
  cardHeight: number;
  onUpdate: (sticker: PlacedSticker) => void;
  onDelete: () => void;
}

export function PlacedStickerControls({
  sticker,
  cardWidth,
  cardHeight,
  onUpdate,
  onDelete,
}: PlacedStickerControlsProps) {
  const [position, setPosition] = useState({ x: sticker.x, y: sticker.y });
  const stickerRef = useRef<HTMLDivElement>(null);

  // Drag handler
  const bind = useDrag(
    ({ down, offset: [ox, oy], first }) => {
      if (first) {
        // Add a slight random rotation on first touch
        const newRotation = sticker.rotation + (Math.random() * 4 - 2);
        onUpdate({ ...sticker, rotation: newRotation });
      }

      // Convert pixel offset to percentage
      const xPercent = (ox / cardWidth) * 100;
      const yPercent = (oy / cardHeight) * 100;

      setPosition({ x: xPercent, y: yPercent });

      if (!down) {
        // Update when drag ends
        onUpdate({ ...sticker, x: xPercent, y: yPercent });
      }
    },
    {
      from: () => [(sticker.x / 100) * cardWidth, (sticker.y / 100) * cardHeight],
      bounds: { left: 0, right: cardWidth, top: 0, bottom: cardHeight },
      pointer: { touch: true },
    }
  );

  return (
    <motion.div
      ref={stickerRef}
      {...bind()}
      className="absolute cursor-grab active:cursor-grabbing group"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        transform: `translate(-50%, -50%) rotate(${sticker.rotation}deg) scale(${sticker.scale})`,
        touchAction: 'none',
      }}
      initial={{ scale: 0 }}
      animate={{ scale: sticker.scale }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
    >
      {/* Sticker Image */}
      <img
        src={`/heirloom/stickers/${sticker.stickerId}`}
        alt="Sticker"
        className="w-20 h-20 object-contain pointer-events-none"
        style={{
          filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.2))',
        }}
        draggable={false}
      />

      {/* Control Buttons (show on hover) */}
      <div className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
        {/* Rotate Left */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onUpdate({ ...sticker, rotation: sticker.rotation - 15 });
          }}
          className="w-6 h-6 rounded-full bg-white shadow-md flex items-center justify-center text-xs hover:bg-gray-100"
          title="Rotate left"
        >
          ↶
        </button>

        {/* Rotate Right */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onUpdate({ ...sticker, rotation: sticker.rotation + 15 });
          }}
          className="w-6 h-6 rounded-full bg-white shadow-md flex items-center justify-center text-xs hover:bg-gray-100"
          title="Rotate right"
        >
          ↷
        </button>

        {/* Scale Up */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            const newScale = Math.min(sticker.scale + 0.2, 2.0);
            onUpdate({ ...sticker, scale: newScale });
          }}
          className="w-6 h-6 rounded-full bg-white shadow-md flex items-center justify-center text-xs hover:bg-gray-100"
          title="Larger"
        >
          +
        </button>

        {/* Scale Down */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            const newScale = Math.max(sticker.scale - 0.2, 0.5);
            onUpdate({ ...sticker, scale: newScale });
          }}
          className="w-6 h-6 rounded-full bg-white shadow-md flex items-center justify-center text-xs hover:bg-gray-100"
          title="Smaller"
        >
          −
        </button>

        {/* Delete */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="w-6 h-6 rounded-full bg-red-500 text-white shadow-md flex items-center justify-center text-xs hover:bg-red-600"
          title="Delete"
        >
          ×
        </button>
      </div>
    </motion.div>
  );
}
