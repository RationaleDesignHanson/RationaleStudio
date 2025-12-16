'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  VINTAGE_COLORS,
  CARD_CONFIG,
  type RecipeCard as RecipeCardType,
  type PlacedSticker,
  type Annotation,
  type LoveMark,
} from '@/components/heirloom/shared/constants';

interface RecipeCardProps {
  card: RecipeCardType;
  width?: number;
  height?: number;
  interactive?: boolean;
  onStickerClick?: (stickerId: string) => void;
  onAnnotationClick?: (annotationId: string) => void;
  children?: React.ReactNode;
}

export function RecipeCard({
  card,
  width = CARD_CONFIG.defaultWidth,
  height = CARD_CONFIG.defaultHeight,
  interactive = false,
  onStickerClick,
  onAnnotationClick,
  children,
}: RecipeCardProps) {
  const backgroundColor = VINTAGE_COLORS[card.backgroundColor];

  return (
    <motion.div
      className="relative overflow-hidden"
      style={{
        width: `${width}px`,
        height: `${height}px`,
        backgroundColor,
        borderRadius: `${CARD_CONFIG.cornerRadius}px`,
        boxShadow: CARD_CONFIG.shadow,
      }}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Love Marks Layer */}
      <LoveMarksLayer loveMarks={card.loveMarks} />

      {/* Recipe Name */}
      <div
        className="absolute top-0 left-0 right-0 p-6"
        style={{
          pointerEvents: 'none',
        }}
      >
        <h2
          className="text-3xl font-serif text-center"
          style={{
            color: 'var(--color-text-dark)',
            textShadow: '0 1px 2px rgba(0,0,0,0.05)',
          }}
        >
          {card.recipeName}
        </h2>
      </div>

      {/* Stickers Layer */}
      <StickersLayer
        stickers={card.stickers}
        interactive={interactive}
        onClick={onStickerClick}
      />

      {/* Annotations Layer */}
      <AnnotationsLayer
        annotations={card.annotations}
        interactive={interactive}
        onClick={onAnnotationClick}
      />

      {/* Times Cooked Badge */}
      {card.timesCooked > 0 && (
        <div
          className="absolute bottom-4 right-4 px-3 py-1.5 rounded-full text-sm font-medium"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            color: '#8B4513',
            border: '1px solid rgba(139, 69, 19, 0.2)',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          }}
        >
          Cooked {card.timesCooked}×
        </div>
      )}

      {/* Children (for dragging overlays, etc.) */}
      {children}
    </motion.div>
  );
}

// ========== LOVE MARKS LAYER ==========
interface LoveMarksLayerProps {
  loveMarks: LoveMark[];
}

function LoveMarksLayer({ loveMarks }: LoveMarksLayerProps) {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {loveMarks.map((mark) => {
        if (mark.type === 'coffee-stain') {
          const stain = mark as any; // CoffeeStain type
          return (
            <div
              key={mark.id}
              className="absolute rounded-full"
              style={{
                left: `${stain.x}%`,
                top: `${stain.y}%`,
                width: `${stain.size}px`,
                height: `${stain.size}px`,
                transform: `translate(-50%, -50%) rotate(${stain.rotation}deg)`,
                background: `radial-gradient(circle, rgba(101, 67, 33, ${mark.intensity * 0.15}) 0%, rgba(101, 67, 33, ${mark.intensity * 0.05}) 70%, transparent 100%)`,
              }}
            />
          );
        }

        if (mark.type === 'worn-edge') {
          const worn = mark as any; // WornEdge type
          return (
            <div
              key={mark.id}
              className="absolute inset-0"
              style={{
                borderRadius: `${CARD_CONFIG.cornerRadius}px`,
                border: `2px solid rgba(139, 69, 19, ${mark.intensity * 0.3})`,
              }}
            />
          );
        }

        return null;
      })}
    </div>
  );
}

// ========== STICKERS LAYER ==========
interface StickersLayerProps {
  stickers: PlacedSticker[];
  interactive: boolean;
  onClick?: (stickerId: string) => void;
}

function StickersLayer({ stickers, interactive, onClick }: StickersLayerProps) {
  return (
    <div className="absolute inset-0">
      {stickers.map((sticker) => (
        <motion.div
          key={sticker.id}
          className="absolute"
          style={{
            left: `${sticker.x}%`,
            top: `${sticker.y}%`,
            transform: `translate(-50%, -50%) rotate(${sticker.rotation}deg) scale(${sticker.scale})`,
            cursor: interactive ? 'grab' : 'default',
          }}
          whileHover={interactive ? { scale: sticker.scale * 1.05 } : {}}
          onClick={() => onClick?.(sticker.id)}
        >
          <img
            src={`/heirloom/stickers/${sticker.stickerId}`}
            alt="Sticker"
            style={{
              width: '80px',
              height: '80px',
              objectFit: 'contain',
              pointerEvents: 'none',
              filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.15))',
            }}
            draggable={false}
          />
        </motion.div>
      ))}
    </div>
  );
}

// ========== ANNOTATIONS LAYER ==========
interface AnnotationsLayerProps {
  annotations: Annotation[];
  interactive: boolean;
  onClick?: (annotationId: string) => void;
}

function AnnotationsLayer({ annotations, interactive, onClick }: AnnotationsLayerProps) {
  return (
    <div className="absolute inset-0">
      {annotations.map((annotation) => (
        <motion.div
          key={annotation.id}
          className="absolute whitespace-nowrap"
          style={{
            left: `${annotation.x}%`,
            top: `${annotation.y}%`,
            transform: `translate(-50%, -50%) rotate(${annotation.rotation}deg)`,
            fontFamily: "'Caveat', cursive",
            fontSize: `${annotation.fontSize}px`,
            color: annotation.color,
            cursor: interactive ? 'pointer' : 'default',
            textShadow: '0 1px 2px rgba(255,255,255,0.8)',
          }}
          whileHover={interactive ? { scale: 1.05 } : {}}
          onClick={() => onClick?.(annotation.id)}
        >
          {annotation.text}
        </motion.div>
      ))}
    </div>
  );
}

// ========== BACKGROUND COLOR PICKER ==========
interface BackgroundPickerProps {
  selectedColor: keyof typeof VINTAGE_COLORS;
  onColorChange: (color: keyof typeof VINTAGE_COLORS) => void;
}

export function BackgroundPicker({ selectedColor, onColorChange }: BackgroundPickerProps) {
  const colors = Object.entries(VINTAGE_COLORS) as [keyof typeof VINTAGE_COLORS, string][];

  return (
    <div className="flex flex-col gap-3">
      <label className="text-sm font-medium text-gray-700">Background Color</label>
      <div className="flex flex-wrap gap-2">
        {colors.map(([name, hex]) => (
          <button
            key={name}
            onClick={() => onColorChange(name)}
            className="relative w-12 h-12 rounded-lg transition-all hover:scale-110"
            style={{
              backgroundColor: hex,
              border: selectedColor === name ? '3px solid #8B4513' : '2px solid #E5E5E5',
              boxShadow: selectedColor === name
                ? '0 4px 8px rgba(139, 69, 19, 0.3)'
                : '0 2px 4px rgba(0,0,0,0.1)',
            }}
            title={name}
          >
            {selectedColor === name && (
              <div
                className="absolute inset-0 flex items-center justify-center text-xl"
                style={{ color: '#8B4513' }}
              >
                ✓
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
