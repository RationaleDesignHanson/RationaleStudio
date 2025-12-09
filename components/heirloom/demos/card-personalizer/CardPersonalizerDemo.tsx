'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RecipeCard, BackgroundPicker } from './RecipeCard';
import { StickerPalette, PlacedStickerControls } from './StickerPalette';
import { AnnotationEditor, PlacedAnnotationControls } from './AnnotationEditor';
import {
  exportAsImage,
  shareCardImage,
  copyCardToClipboard,
} from '@/components/heirloom/shared/exportCard';
import { generateLoveMarks, describeLoveMarks, getNextMilestone } from '@/components/heirloom/shared/loveMarks';
import {
  CARD_CONFIG,
  VINTAGE_COLORS,
  type RecipeCard as RecipeCardType,
  type PlacedSticker,
  type Annotation,
} from '@/components/heirloom/shared/constants';

export function CardPersonalizerDemo() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [exportMessage, setExportMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Card state
  const [card, setCard] = useState<RecipeCardType>({
    id: 'demo-card',
    recipeName: 'Grandma\'s Lasagna',
    backgroundColor: 'cream',
    stickers: [],
    annotations: [],
    loveMarks: [],
    timesCooked: 0,
  });

  // Regenerate love marks when timesCooked changes
  useEffect(() => {
    const loveMarks = generateLoveMarks(card.timesCooked, card.id);
    setCard((prev) => ({ ...prev, loveMarks }));
  }, [card.timesCooked]);

  // Handlers
  const handleBackgroundChange = (color: keyof typeof VINTAGE_COLORS) => {
    setCard((prev) => ({ ...prev, backgroundColor: color }));
  };

  const handleRecipeNameChange = (name: string) => {
    setCard((prev) => ({ ...prev, recipeName: name }));
  };

  const handleStickerPlace = (sticker: PlacedSticker) => {
    setCard((prev) => ({
      ...prev,
      stickers: [...prev.stickers, sticker],
    }));
  };

  const handleStickerUpdate = (id: string, updated: PlacedSticker) => {
    setCard((prev) => ({
      ...prev,
      stickers: prev.stickers.map((s) => (s.id === id ? updated : s)),
    }));
  };

  const handleStickerDelete = (id: string) => {
    setCard((prev) => ({
      ...prev,
      stickers: prev.stickers.filter((s) => s.id !== id),
    }));
  };

  const handleAnnotationAdd = (annotation: Annotation) => {
    setCard((prev) => ({
      ...prev,
      annotations: [...prev.annotations, annotation],
    }));
  };

  const handleAnnotationUpdate = (id: string, updated: Annotation) => {
    setCard((prev) => ({
      ...prev,
      annotations: prev.annotations.map((a) => (a.id === id ? updated : a)),
    }));
  };

  const handleAnnotationDelete = (id: string) => {
    setCard((prev) => ({
      ...prev,
      annotations: prev.annotations.filter((a) => a.id !== id),
    }));
  };

  const handleTimesCooked = (increment: number) => {
    setCard((prev) => ({
      ...prev,
      timesCooked: Math.max(0, prev.timesCooked + increment),
    }));
  };

  // Export handlers
  const handleExport = async () => {
    if (!cardRef.current) return;

    setIsExporting(true);
    setExportMessage(null);

    const result = await exportAsImage(cardRef.current, {
      fileName: card.recipeName.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      scale: 3, // 3x for high quality
      format: 'png',
    });

    setIsExporting(false);

    if (result.success) {
      setExportMessage({ type: 'success', text: 'Card saved successfully!' });
    } else {
      setExportMessage({ type: 'error', text: result.error || 'Export failed' });
    }

    setTimeout(() => setExportMessage(null), 3000);
  };

  const handleShare = async () => {
    if (!cardRef.current) return;

    setIsExporting(true);
    const result = await shareCardImage(cardRef.current, {
      title: card.recipeName,
      text: `Check out my ${card.recipeName} recipe card!`,
      fileName: card.recipeName.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    });

    setIsExporting(false);

    if (result.success) {
      setExportMessage({ type: 'success', text: 'Shared successfully!' });
    } else {
      // Fallback to download if share fails
      handleExport();
    }
  };

  const handleCopy = async () => {
    if (!cardRef.current) return;

    setIsExporting(true);
    const result = await copyCardToClipboard(cardRef.current);

    setIsExporting(false);

    if (result.success) {
      setExportMessage({ type: 'success', text: 'Copied to clipboard!' });
    } else {
      setExportMessage({ type: 'error', text: 'Copy not supported in this browser' });
    }

    setTimeout(() => setExportMessage(null), 3000);
  };

  const milestone = getNextMilestone(card.timesCooked);

  return (
    <div className="w-full max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-serif mb-3" style={{ color: '#2C1810' }}>
          Recipe Card Personalizer
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Customize your recipe cards with stickers, handwritten notes, and love marks.
          Just like the real thing, your cards get more character the more you cook.
        </p>
      </div>

      <div className="grid lg:grid-cols-[1fr,400px] gap-8">
        {/* Left: Card Preview */}
        <div className="flex flex-col gap-6">
          {/* Card Container */}
          <div className="flex items-center justify-center bg-gray-50 rounded-xl p-8">
            <div ref={cardRef} style={{ width: CARD_CONFIG.defaultWidth, height: CARD_CONFIG.defaultHeight }}>
              <RecipeCard card={card} interactive={false}>
                {/* Placed Stickers with Controls */}
                {card.stickers.map((sticker) => (
                  <PlacedStickerControls
                    key={sticker.id}
                    sticker={sticker}
                    cardWidth={CARD_CONFIG.defaultWidth}
                    cardHeight={CARD_CONFIG.defaultHeight}
                    onUpdate={(updated) => handleStickerUpdate(sticker.id, updated)}
                    onDelete={() => handleStickerDelete(sticker.id)}
                  />
                ))}

                {/* Placed Annotations with Controls */}
                {card.annotations.map((annotation) => (
                  <PlacedAnnotationControls
                    key={annotation.id}
                    annotation={annotation}
                    cardWidth={CARD_CONFIG.defaultWidth}
                    cardHeight={CARD_CONFIG.defaultHeight}
                    onUpdate={(updated) => handleAnnotationUpdate(annotation.id, updated)}
                    onDelete={() => handleAnnotationDelete(annotation.id)}
                  />
                ))}
              </RecipeCard>
            </div>
          </div>

          {/* Love Marks Info */}
          <div className="bg-amber-50 border-2 border-amber-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <span className="text-2xl">☕</span>
              <div className="flex-1">
                <h3 className="font-medium text-amber-900 mb-1">Love Marks</h3>
                <p className="text-sm text-amber-800 mb-2">
                  {describeLoveMarks(card.timesCooked)}
                </p>
                {milestone && (
                  <p className="text-xs text-amber-700">
                    Cook {milestone.count} more time{milestone.count > 1 ? 's' : ''} to unlock: {milestone.description}
                  </p>
                )}
              </div>
              <div className="flex gap-1">
                <button
                  onClick={() => handleTimesCooked(-1)}
                  disabled={card.timesCooked === 0}
                  className="w-8 h-8 rounded-full bg-white border-2 border-amber-300 text-amber-700 font-medium hover:bg-amber-50 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  −
                </button>
                <button
                  onClick={() => handleTimesCooked(1)}
                  className="w-8 h-8 rounded-full bg-white border-2 border-amber-300 text-amber-700 font-medium hover:bg-amber-50"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Export Buttons */}
          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleExport}
              disabled={isExporting}
              className="flex-1 px-6 py-3 rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                backgroundColor: '#F39C12',
                color: 'white',
              }}
            >
              {isExporting ? 'Exporting...' : 'Download Card'}
            </button>

            {typeof navigator !== 'undefined' && navigator.share && (
              <button
                onClick={handleShare}
                disabled={isExporting}
                className="px-6 py-3 rounded-lg font-medium transition-all border-2"
                style={{
                  borderColor: '#F39C12',
                  color: '#F39C12',
                }}
              >
                Share
              </button>
            )}

            <button
              onClick={handleCopy}
              disabled={isExporting}
              className="px-6 py-3 rounded-lg font-medium transition-all border-2"
              style={{
                borderColor: '#8B4513',
                color: '#8B4513',
              }}
            >
              Copy
            </button>
          </div>

          {/* Export Message */}
          <AnimatePresence>
            {exportMessage && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={`p-3 rounded-lg text-center text-sm font-medium ${
                  exportMessage.type === 'success'
                    ? 'bg-green-50 text-green-800 border border-green-200'
                    : 'bg-red-50 text-red-800 border border-red-200'
                }`}
              >
                {exportMessage.text}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right: Controls */}
        <div className="flex flex-col gap-6">
          {/* Recipe Name */}
          <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Recipe Name
            </label>
            <input
              type="text"
              value={card.recipeName}
              onChange={(e) => handleRecipeNameChange(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 font-serif text-lg"
              placeholder="Enter recipe name..."
            />
          </div>

          {/* Background Color */}
          <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
            <BackgroundPicker
              selectedColor={card.backgroundColor}
              onColorChange={handleBackgroundChange}
            />
          </div>

          {/* Stickers */}
          <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
            <StickerPalette onStickerPlace={handleStickerPlace} />
          </div>

          {/* Annotations */}
          <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
            <AnnotationEditor onAnnotationAdd={handleAnnotationAdd} />
          </div>

          {/* Tips */}
          <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
            <h3 className="font-medium text-blue-900 mb-2 flex items-center gap-2">
              <span>💡</span>
              Tips
            </h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Drag stickers and notes to reposition them</li>
              <li>• Hover over items to see control buttons</li>
              <li>• Increase "times cooked" to add love marks</li>
              <li>• Download your card to share with friends!</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
