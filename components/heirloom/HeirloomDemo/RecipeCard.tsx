/**
 * Recipe Card Component
 * Flippable card showing recipe (front) and notes/history (back)
 */

'use client';

import { useState, useRef, useEffect } from 'react';
import { EditableText } from './EditableText';
import { Recipe, FieldChange, StickerOnCard } from './types';
import { COLORS } from './constants';
import Image from 'next/image';

interface RecipeCardProps {
  recipe: Recipe;
  isFlipped: boolean;
  onFlip: () => void;
  imagePreview: string | null;
  step: string;
  editingField: string | null;
  onStartEdit: (field: string) => void;
  onEndEdit: () => void;
  onEdit: (field: string, value: string) => void;
  getFieldChanges: (field: string) => FieldChange[];
  getLatestChange: (field: string) => FieldChange | null;
  isEditable: boolean;
  expandedIngredients: boolean;
  setExpandedIngredients: (v: boolean) => void;
  expandedInstructions: boolean;
  setExpandedInstructions: (v: boolean) => void;
  instructionsCollapsed: boolean;
  setInstructionsCollapsed: (v: boolean) => void;
  allStickers: StickerOnCard[];
  savedMomNote: string;
  savedYourNote: string;
  changes: Record<string, FieldChange[]>;
  getGenerationCount: () => number;
  getGenerationLabel: () => string;
  confidenceToScore?: (level: string) => number;
  confidenceToColor?: (level: string) => string;
  scores?: { title?: number; ingredients?: number; instructions?: number };
  overallScore?: number;
}

export function RecipeCard({
  recipe,
  isFlipped,
  onFlip,
  imagePreview,
  step,
  editingField,
  onStartEdit,
  onEndEdit,
  onEdit,
  getFieldChanges,
  getLatestChange,
  isEditable,
  expandedIngredients,
  setExpandedIngredients,
  expandedInstructions,
  setExpandedInstructions,
  instructionsCollapsed,
  setInstructionsCollapsed,
  allStickers,
  savedMomNote,
  savedYourNote,
  changes,
  getGenerationCount,
  getGenerationLabel,
  confidenceToScore,
  confidenceToColor,
  scores,
}: RecipeCardProps) {
  const hasNotes = savedMomNote || savedYourNote;
  const hasStickers = allStickers.length > 0;
  const [showImageModal, setShowImageModal] = useState(false);
  const [titleIsLong, setTitleIsLong] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const titleRef = useRef<HTMLHeadingElement>(null);

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Check if title wraps to multiple lines (mobile only)
  useEffect(() => {
    if (!titleRef.current || !isMobile) {
      setTitleIsLong(false);
      return;
    }

    const checkTitleWrap = () => {
      const element = titleRef.current;
      if (!element) return;

      // Get the line height and total height
      const lineHeight = parseFloat(window.getComputedStyle(element).lineHeight);
      const totalHeight = element.offsetHeight;

      // If total height is more than 1.5x line height, it's wrapped
      setTitleIsLong(totalHeight > lineHeight * 1.5);
    };

    // Small delay to ensure styles are applied
    setTimeout(checkTitleWrap, 50);
    window.addEventListener('resize', checkTitleWrap);

    return () => window.removeEventListener('resize', checkTitleWrap);
  }, [recipe.title, isMobile]);

  return (
    <div className="card-container w-full flex justify-center" style={{ perspective: '1200px', overflow: 'visible' }}>
      <div
        className={`card-flipper ${isFlipped ? 'flipped' : ''}`}
        style={{ marginTop: '15px', marginLeft: '15px' }}
      >
        {/* FRONT OF CARD */}
        <div
          className="card-front bg-white p-4 md:p-8 shadow-[0_8px_40px_rgba(92,64,51,0.18)] border border-[#ece6dc] rounded-xl"
          style={{ backfaceVisibility: 'hidden' }}
        >
          {/* Generation Badge */}
          <div
            className={step === 'scanned' ? 'badge-pop' : ''}
            style={{
              position: 'absolute',
              top: '-12px',
              right: '-12px',
              backgroundColor:
                getGenerationCount() === 1
                  ? COLORS.green
                  : getGenerationCount() === 2
                  ? '#6b5b2d'
                  : COLORS.primary,
              color: 'white',
              fontSize: '11px',
              padding: '6px 14px',
              borderRadius: '20px',
              fontWeight: 600,
              boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
              zIndex: 10,
              display: isFlipped ? 'none' : 'block',
            }}
          >
            {getGenerationLabel()}
          </div>

          {/* Original image thumbnail */}
          {imagePreview && !isFlipped && (
            <div
              className="group"
              onClick={(e) => {
                e.stopPropagation();
                // Only on mobile/touch devices
                if (typeof window !== 'undefined' && (window.innerWidth < 768 || 'ontouchstart' in window)) {
                  setShowImageModal(true);
                }
              }}
              style={{
                position: 'absolute',
                top: '-20px',
                left: '-20px',
                width: '80px',
                backgroundColor: '#fff',
                padding: '4px',
                boxShadow: '0 3px 12px rgba(0,0,0,0.2)',
                transform: 'rotate(-6deg)',
                zIndex: 10,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
            >
              <img
                src={imagePreview}
                alt="Original card"
                className="group-hover:scale-[3.5] transition-transform duration-300 origin-top-left"
                style={{
                  width: '100%',
                  display: 'block',
                  borderRadius: '2px',
                }}
              />
              <div
                style={{
                  fontSize: '7px',
                  textAlign: 'center',
                  color: COLORS.grayText,
                  marginTop: '3px',
                  fontWeight: 500,
                }}
              >
                ORIGINAL
              </div>
            </div>
          )}

          {/* Origin Tag */}
          <div style={{ fontSize: '11px', color: COLORS.grayText, marginBottom: '8px', paddingLeft: '50px' }}>
            Grandma Kay • 1987
          </div>

          {/* Title */}
          <h2
            ref={titleRef}
            className="mb-5 border-b-2 border-[#f0ebe3] pb-4 pl-[50px] transition-[font-size] duration-200"
            style={{
              fontFamily: '"Playfair Display", Georgia, serif',
              fontSize: isMobile ? (titleIsLong ? '18px' : '24px') : '28px',
              color: COLORS.primaryDarkest
            }}
          >
            <EditableText
              field="title"
              value={recipe.title}
              style={{ display: 'inline' }}
              isEditing={editingField === 'title'}
              onStartEdit={onStartEdit}
              onEndEdit={onEndEdit}
              onChange={onEdit}
              fieldChanges={getFieldChanges('title')}
              latestChange={getLatestChange('title')}
              isEditable={isEditable}
            />
          </h2>

          {/* Ingredients */}
          <div className="mb-5 text-left">
            <p className="text-[11px] uppercase tracking-wider text-[#8b7355] mb-2.5">Ingredients</p>
            <ul className="m-0 pl-5 text-[#5c4033] text-[15px] leading-relaxed text-left list-disc">
              {(expandedIngredients ? recipe.ingredients : recipe.ingredients?.slice(0, 6))?.map((ing, i) => (
                <li key={i}>
                  <EditableText
                    field={`ingredient-${i}`}
                    value={ing}
                    style={{ display: 'inline' }}
                    showHint={i === 0 && isEditable && !getFieldChanges(`ingredient-${i}`).length}
                    isEditing={editingField === `ingredient-${i}`}
                    onStartEdit={onStartEdit}
                    onEndEdit={onEndEdit}
                    onChange={onEdit}
                    fieldChanges={getFieldChanges(`ingredient-${i}`)}
                    latestChange={getLatestChange(`ingredient-${i}`)}
                    isEditable={isEditable}
                  />
                </li>
              ))}
              {recipe.ingredients && recipe.ingredients.length > 6 && !expandedIngredients && (
                <li className="text-[#2d5a27] cursor-pointer" onClick={() => setExpandedIngredients(true)}>
                  +{recipe.ingredients.length - 6} more
                </li>
              )}
              {expandedIngredients && recipe.ingredients && recipe.ingredients.length > 6 && (
                <li
                  className="text-[#8b7355] cursor-pointer text-[13px]"
                  onClick={() => setExpandedIngredients(false)}
                >
                  show less
                </li>
              )}
            </ul>
          </div>

          {/* Instructions */}
          <div className="text-left">
            <div
              onClick={() => setInstructionsCollapsed(!instructionsCollapsed)}
              className="flex items-center gap-1.5 cursor-pointer mb-2.5 select-none"
            >
              <span
                className="text-[#a89880] text-[10px] transition-transform duration-200"
                style={{ transform: instructionsCollapsed ? 'rotate(-90deg)' : 'rotate(0deg)' }}
              >
                ▼
              </span>
              <p className="text-[11px] uppercase tracking-wider text-[#8b7355] m-0">
                Instructions
                {instructionsCollapsed && recipe.instructions && recipe.instructions.length > 0 && (
                  <span className="font-normal normal-case ml-1.5">({recipe.instructions.length} steps)</span>
                )}
              </p>
            </div>
            {!instructionsCollapsed && (
              <ol className="m-0 pl-5 text-[#5c4033] text-[15px] leading-relaxed text-left list-decimal instructions-list">
                {recipe.instructions && recipe.instructions.length > 0 ? (
                  (expandedInstructions ? recipe.instructions : recipe.instructions?.slice(0, 4))?.map((inst, i) => (
                    <li key={i} className="mb-1">
                      <EditableText
                        field={`instruction-${i}`}
                        value={inst}
                        style={{ display: 'inline' }}
                        isEditing={editingField === `instruction-${i}`}
                        onStartEdit={onStartEdit}
                        onEndEdit={onEndEdit}
                        onChange={onEdit}
                        fieldChanges={getFieldChanges(`instruction-${i}`)}
                        latestChange={getLatestChange(`instruction-${i}`)}
                        isEditable={isEditable}
                      />
                    </li>
                  ))
                ) : (
                  <li>
                    <EditableText
                      field="instruction-0"
                      value=""
                      style={{ display: 'inline', color: '#a89880', fontStyle: 'italic' }}
                      showHint={true}
                      isEditing={editingField === 'instruction-0'}
                      onStartEdit={onStartEdit}
                      onEndEdit={onEndEdit}
                      onChange={onEdit}
                      fieldChanges={getFieldChanges('instruction-0')}
                      latestChange={getLatestChange('instruction-0')}
                      isEditable={isEditable}
                    />
                  </li>
                )}
                {recipe.instructions && recipe.instructions.length > 4 && !expandedInstructions && (
                  <li
                    className="text-[#2d5a27] cursor-pointer list-none -ml-4.5"
                    onClick={(e) => {
                      e.stopPropagation();
                      setExpandedInstructions(true);
                    }}
                  >
                    +{recipe.instructions.length - 4} more steps
                  </li>
                )}
                {expandedInstructions && recipe.instructions && recipe.instructions.length > 4 && (
                  <li
                    className="text-[#8b7355] cursor-pointer text-[13px] list-none -ml-4.5"
                    onClick={(e) => {
                      e.stopPropagation();
                      setExpandedInstructions(false);
                    }}
                  >
                    show less
                  </li>
                )}
              </ol>
            )}
          </div>

          {/* Flip hint - show when there are notes, changes, or stickers */}
          {(hasNotes || hasStickers || Object.keys(changes).length > 0) && step === 'lineage' && (
            <div
              className="flip-hint mt-6 p-3 bg-[rgba(139,90,43,0.06)] rounded-lg text-center flex items-center justify-center gap-2 cursor-pointer hover:scale-105 transition-transform"
              onClick={onFlip}
            >
              <span className="text-lg">↻</span>
              <span className="text-[13px] text-[#8b5a2b] font-medium">Flip to see the back</span>
            </div>
          )}

          {/* Flip tab - available during editing steps */}
          {(step === 'fork1' || step === 'fork2') && (
            <div className="card-flip-tab" onClick={onFlip}>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 7v6h6" />
                <path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13" />
              </svg>
              <span>See back</span>
            </div>
          )}
        </div>

        {/* BACK OF CARD */}
        <div
          className="card-back bg-[#f5f0e6] p-4 md:p-8 shadow-[0_8px_40px_rgba(92,64,51,0.18)] border border-[#e0d5c5] rounded-xl"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            transform: 'rotateY(180deg)',
            backfaceVisibility: 'hidden',
          }}
        >
          {/* Stickers scattered on card */}
          {allStickers.map((sticker, idx) => {
            const positions = [
              { top: '10px', right: '10px', rotate: '12deg' },
              { top: '60px', right: '40px', rotate: '-8deg' },
              { bottom: '60px', left: '10px', rotate: '5deg' },
              { bottom: '20px', right: '20px', rotate: '-15deg' },
              { top: '40px', left: '15px', rotate: '8deg' },
              { bottom: '100px', right: '10px', rotate: '-5deg' },
            ];
            const pos = positions[idx % positions.length];
            return (
              <div
                key={`${sticker.id}-${sticker.by}`}
                className="sticker-on-card absolute"
                style={{
                  ...pos,
                  transform: `rotate(${pos.rotate})`,
                  width: '40px',
                  height: '40px',
                  padding: '4px',
                }}
              >
                <img
                  src={sticker.imagePath}
                  alt={sticker.label}
                  className="w-full h-full object-contain drop-shadow-md"
                />
                <span className="sticker-tooltip-card">
                  {sticker.by} · {sticker.year}
                </span>
              </div>
            );
          })}

          {/* Header */}
          <div className="text-center mb-6 pb-4 border-b-2 border-[#e0d5c5]">
            <div className="text-[11px] text-[#8b7355] uppercase tracking-wide mb-1">Family Notes</div>
            <div
              className="text-xl text-[#3d2914]"
              style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
            >
              {recipe.title}
            </div>
          </div>

          {/* Notes */}
          <div className="flex flex-col gap-5">
            {/* Recipe Changes */}
            {Object.keys(changes).length > 0 && (
              <div className="bg-white p-4 rounded-lg border border-[#e8e0d5]">
                <div className="text-[11px] text-[#8b7355] uppercase tracking-wider mb-3">Recipe Changes</div>
                {Object.entries(changes).map(([field, fieldChanges]) => (
                  <div key={field} className="mb-2">
                    {fieldChanges.map((change, idx) => (
                      <div key={idx} className="text-[13px] text-[#5c4033] flex items-start gap-2 mb-1">
                        <span
                          className={`text-[10px] px-1.5 py-0.5 rounded-md font-semibold shrink-0 ${
                            change.by === 'Mom'
                              ? 'bg-[#fff3e0] text-[#8b5a2b]'
                              : 'bg-[#e8f5e9] text-[#2d5a27]'
                          }`}
                        >
                          {change.by}
                        </span>
                        <span>
                          <span className="line-through text-[#a89880]">{change.from}</span>
                          {' → '}
                          <span className="font-medium">{change.to}</span>
                        </span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            )}

            {/* Mom's note */}
            {savedMomNote && (
              <div className="bg-[#fff8dc] p-5 rounded shadow-md transform -rotate-1">
                <div className="flex justify-between items-center mb-2.5">
                  <span className="text-xs text-[#8b7355] font-semibold">Mom</span>
                  <span className="text-[11px] text-[#a89880]">2015</span>
                </div>
                <div className="text-[15px] text-[#5c4033] italic leading-relaxed" style={{ fontFamily: 'Georgia, serif' }}>
                  &quot;{savedMomNote}&quot;
                </div>
              </div>
            )}

            {/* Your note */}
            {savedYourNote && (
              <div className="bg-[#e8f4e8] p-5 rounded shadow-md transform rotate-[0.5deg]">
                <div className="flex justify-between items-center mb-2.5">
                  <span className="text-xs text-[#2d5a27] font-semibold">You</span>
                  <span className="text-[11px] text-[#6b8b6b]">2025</span>
                </div>
                <div className="text-[15px] text-[#3d5a3d] italic leading-relaxed" style={{ fontFamily: 'Georgia, serif' }}>
                  &quot;{savedYourNote}&quot;
                </div>
              </div>
            )}

            {/* Empty state */}
            {!savedMomNote && !savedYourNote && Object.keys(changes).length === 0 && !hasStickers && (
              <div className="text-center py-10 px-5 text-[#a89880]">
                <div className="text-sm italic">Notes, stickers & changes will appear here...</div>
              </div>
            )}
          </div>

          {/* Flip back hint */}
          {step === 'lineage' && (
            <div
              className="flip-hint mt-8 p-3 bg-[rgba(139,90,43,0.08)] rounded-lg text-center flex items-center justify-center gap-2 cursor-pointer hover:scale-105 transition-transform"
              onClick={onFlip}
            >
              <span className="text-lg">↻</span>
              <span className="text-[13px] text-[#8b5a2b] font-medium">Flip to see recipe</span>
            </div>
          )}

          {/* Flip tab - available during editing steps */}
          {(step === 'fork1' || step === 'fork2') && (
            <div className="card-flip-tab" onClick={onFlip}>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 7v6h-6" />
                <path d="M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3L21 13" />
              </svg>
              <span>See recipe</span>
            </div>
          )}
        </div>
      </div>

      {/* Image Modal for Mobile */}
      {showImageModal && imagePreview && (
        <div
          className="fixed inset-0 z-[9999] bg-black/90 flex items-center justify-center p-4"
          onClick={() => setShowImageModal(false)}
        >
          <div className="relative max-w-4xl max-h-[90vh] w-full">
            <button
              className="absolute -top-10 right-0 bg-white rounded-full w-10 h-10 flex items-center justify-center text-gray-800 font-bold text-xl hover:bg-gray-100 transition-colors z-10"
              onClick={(e) => {
                e.stopPropagation();
                setShowImageModal(false);
              }}
              aria-label="Close"
            >
              ✕
            </button>
            <img
              src={imagePreview}
              alt="Recipe card"
              className="max-w-full max-h-[90vh] w-auto h-auto mx-auto rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </div>
  );
}
