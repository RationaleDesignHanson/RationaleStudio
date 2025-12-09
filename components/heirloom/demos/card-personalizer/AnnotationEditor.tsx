'use client';

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useDrag } from '@use-gesture/react';
import { type Annotation } from '@/components/heirloom/shared/constants';

interface AnnotationEditorProps {
  onAnnotationAdd: (annotation: Annotation) => void;
}

export function AnnotationEditor({ onAnnotationAdd }: AnnotationEditorProps) {
  const [customText, setCustomText] = useState('');
  const [selectedColor, setSelectedColor] = useState('#8B4513');
  const [fontSize, setFontSize] = useState(24);

  const presetPhrases = [
    "Mom's original ❤️",
    'Add more garlic!',
    'Best ever!',
    'Trust me on this',
    'Family favorite',
    "Don't skip this step",
    'Worth the effort',
    'SO good',
    'Make extra!',
    '10/10 would make again',
  ];

  const colors = [
    { name: 'Brown', hex: '#8B4513' },
    { name: 'Red', hex: '#E74C3C' },
    { name: 'Blue', hex: '#3498DB' },
    { name: 'Green', hex: '#27AE60' },
    { name: 'Black', hex: '#2C3E50' },
  ];

  const handleAddAnnotation = (text: string) => {
    if (!text.trim()) return;

    const annotation: Annotation = {
      id: `annotation-${Date.now()}-${Math.random()}`,
      text: text.trim(),
      x: 50, // Center - will be adjusted when placed
      y: 50, // Center - will be adjusted when placed
      rotation: Math.random() * 10 - 5, // -5 to 5 degrees
      fontSize,
      color: selectedColor,
    };

    onAnnotationAdd(annotation);
    setCustomText('');
  };

  return (
    <div className="flex flex-col gap-4">
      <label className="text-sm font-medium text-gray-700">Add Notes</label>

      {/* Preset Phrases */}
      <div className="flex flex-col gap-2">
        <p className="text-xs text-gray-500">Quick phrases:</p>
        <div className="flex flex-wrap gap-2">
          {presetPhrases.map((phrase) => (
            <button
              key={phrase}
              onClick={() => handleAddAnnotation(phrase)}
              className="px-3 py-1.5 text-sm rounded-md transition-all hover:scale-105"
              style={{
                fontFamily: "'Caveat', cursive",
                fontSize: '18px',
                backgroundColor: 'white',
                border: '2px dashed #E5E5E5',
                color: '#666',
              }}
            >
              {phrase}
            </button>
          ))}
        </div>
      </div>

      {/* Custom Text Input */}
      <div className="flex flex-col gap-2">
        <p className="text-xs text-gray-500">Or write your own:</p>
        <div className="flex gap-2">
          <input
            type="text"
            value={customText}
            onChange={(e) => setCustomText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleAddAnnotation(customText);
              }
            }}
            placeholder="Type your note..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
            style={{
              fontFamily: "'Caveat', cursive",
              fontSize: '20px',
            }}
          />
          <button
            onClick={() => handleAddAnnotation(customText)}
            disabled={!customText.trim()}
            className="px-4 py-2 rounded-md font-medium transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            style={{
              backgroundColor: '#F39C12',
              color: 'white',
            }}
          >
            Add
          </button>
        </div>
      </div>

      {/* Font Size Slider */}
      <div className="flex flex-col gap-2">
        <label className="text-xs text-gray-500">
          Font size: {fontSize}px
        </label>
        <input
          type="range"
          min="18"
          max="32"
          value={fontSize}
          onChange={(e) => setFontSize(Number(e.target.value))}
          className="w-full"
        />
      </div>

      {/* Color Picker */}
      <div className="flex flex-col gap-2">
        <label className="text-xs text-gray-500">Ink color:</label>
        <div className="flex gap-2">
          {colors.map((color) => (
            <button
              key={color.hex}
              onClick={() => setSelectedColor(color.hex)}
              className="w-10 h-10 rounded-full transition-all"
              style={{
                backgroundColor: color.hex,
                border: selectedColor === color.hex ? '3px solid #F39C12' : '2px solid #E5E5E5',
                boxShadow: selectedColor === color.hex
                  ? '0 4px 8px rgba(243, 156, 18, 0.3)'
                  : '0 2px 4px rgba(0,0,0,0.1)',
              }}
              title={color.name}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// ========== PLACED ANNOTATION CONTROLS ==========
interface PlacedAnnotationControlsProps {
  annotation: Annotation;
  cardWidth: number;
  cardHeight: number;
  onUpdate: (annotation: Annotation) => void;
  onDelete: () => void;
}

export function PlacedAnnotationControls({
  annotation,
  cardWidth,
  cardHeight,
  onUpdate,
  onDelete,
}: PlacedAnnotationControlsProps) {
  const [position, setPosition] = useState({ x: annotation.x, y: annotation.y });
  const annotationRef = useRef<HTMLDivElement>(null);

  // Drag handler
  const bind = useDrag(
    ({ down, offset: [ox, oy] }) => {
      // Convert pixel offset to percentage
      const xPercent = (ox / cardWidth) * 100;
      const yPercent = (oy / cardHeight) * 100;

      setPosition({ x: xPercent, y: yPercent });

      if (!down) {
        // Update when drag ends
        onUpdate({ ...annotation, x: xPercent, y: yPercent });
      }
    },
    {
      from: () => [(annotation.x / 100) * cardWidth, (annotation.y / 100) * cardHeight],
      bounds: { left: 0, right: cardWidth, top: 0, bottom: cardHeight },
      pointer: { touch: true },
    }
  );

  return (
    <motion.div
      ref={annotationRef}
      {...bind()}
      className="absolute cursor-grab active:cursor-grabbing group whitespace-nowrap select-none"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        transform: `translate(-50%, -50%) rotate(${annotation.rotation}deg)`,
        fontFamily: "'Caveat', cursive",
        fontSize: `${annotation.fontSize}px`,
        color: annotation.color,
        textShadow: '0 1px 2px rgba(255,255,255,0.8)',
        touchAction: 'none',
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
    >
      {annotation.text}

      {/* Control Buttons (show on hover) */}
      <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1 whitespace-nowrap">
        {/* Rotate Left */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onUpdate({ ...annotation, rotation: annotation.rotation - 5 });
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
            onUpdate({ ...annotation, rotation: annotation.rotation + 5 });
          }}
          className="w-6 h-6 rounded-full bg-white shadow-md flex items-center justify-center text-xs hover:bg-gray-100"
          title="Rotate right"
        >
          ↷
        </button>

        {/* Increase Size */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            const newSize = Math.min(annotation.fontSize + 2, 40);
            onUpdate({ ...annotation, fontSize: newSize });
          }}
          className="w-6 h-6 rounded-full bg-white shadow-md flex items-center justify-center text-xs hover:bg-gray-100"
          title="Larger"
        >
          +
        </button>

        {/* Decrease Size */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            const newSize = Math.max(annotation.fontSize - 2, 14);
            onUpdate({ ...annotation, fontSize: newSize });
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
