/**
 * Heirloom Demo Component - Complete Interactive Version
 *
 * Full-featured demo showcasing recipe OCR, generational editing, and card flip interaction
 */

'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { UploadSection } from './UploadSection';
import { ProcessingSection } from './ProcessingSection';
import { SampleRecipeSelector } from './SampleRecipeSelector';
import RecipeSelector from './RecipeSelector';
import { RecipeCard } from './RecipeCard';
import { Timeline } from './Timeline';
import {
  DemoStep,
  Recipe,
  ChangeHistory,
  FieldChange,
  HeirloomDemoProps,
  StickerOnCard,
  DetectedRecipe,
  BoundingBox,
} from './types';
import { DEMO_STICKERS, COLORS, API_ENDPOINT, DETECT_API_ENDPOINT } from './constants';
import type { SampleRecipe } from '@/lib/heirloom/sample-recipes';
import Image from 'next/image';

export function HeirloomDemo({
  className = '',
  onStepChange,
  onRecipeExtracted,
  onFlowComplete,
}: HeirloomDemoProps) {
  // Core state
  const [step, setStep] = useState<DemoStep>('upload');
  const [showSampleSelector, setShowSampleSelector] = useState(true);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Multi-recipe detection state
  const [detectedRecipes, setDetectedRecipes] = useState<DetectedRecipe[]>([]);
  const [selectedRecipeId, setSelectedRecipeId] = useState<string | null>(null);

  // Notes and stickers
  const [momNote, setMomNote] = useState('');
  const [yourNote, setYourNote] = useState('');
  const [savedMomNote, setSavedMomNote] = useState('');
  const [savedYourNote, setSavedYourNote] = useState('');
  const [momStickers, setMomStickers] = useState<string[]>([]);
  const [yourStickers, setYourStickers] = useState<string[]>([]);
  const [shuffledStickers, setShuffledStickers] = useState(DEMO_STICKERS);

  // UI state
  const [isDragging, setIsDragging] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [editingField, setEditingField] = useState<string | null>(null);
  const [expandedIngredients, setExpandedIngredients] = useState(false);
  const [expandedInstructions, setExpandedInstructions] = useState(false);
  const [instructionsCollapsed, setInstructionsCollapsed] = useState(false);

  // Change tracking
  const [changes, setChanges] = useState<ChangeHistory>({});

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const demoContainerRef = useRef<HTMLDivElement | null>(null);

  // Shuffle stickers whenever recipe changes
  useEffect(() => {
    const shuffled = [...DEMO_STICKERS].sort(() => Math.random() - 0.5);
    setShuffledStickers(shuffled);
  }, [recipe?.title]);

  const updateStep = useCallback(
    (newStep: DemoStep) => {
      setStep(newStep);
      onStepChange?.(newStep);
    },
    [onStepChange]
  );

  const getCurrentEditor = useCallback(() => {
    if (step === 'fork1') return { name: 'Mom', year: '2015' };
    if (step === 'fork2') return { name: 'You', year: '2025' };
    return null;
  }, [step]);

  const detectRecipes = async (base64Image: string) => {
    updateStep('processing');
    setError(null);

    try {
      const response = await fetch(DETECT_API_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: base64Image }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to detect recipes');
      }

      if ('error' in data) {
        throw new Error(data.error);
      }

      // Check if multiple recipes were detected
      if (data.recipes && data.recipes.length > 1) {
        setDetectedRecipes(data.recipes);
        updateStep('selecting');
      } else if (data.recipes && data.recipes.length === 1) {
        // Single recipe detected, proceed directly to extraction
        const selectedRecipe = data.recipes[0];
        setSelectedRecipeId(selectedRecipe.id);
        extractRecipe(base64Image, selectedRecipe.boundingBox);
      } else {
        throw new Error('No recipes detected in image');
      }
    } catch (err) {
      console.error('Detection error:', err);
      setError(
        err instanceof Error
          ? err.message
          : 'Failed to analyze image. Please try another image.'
      );
      updateStep('upload');
    }
  };

  const extractRecipe = async (base64Image: string, boundingBox?: BoundingBox) => {
    updateStep('processing');
    setError(null);

    try {
      const requestBody: any = { image: base64Image };
      if (boundingBox) {
        requestBody.boundingBox = boundingBox;
      }

      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to extract recipe');
      }

      if ('error' in data) {
        throw new Error(data.error);
      }

      setRecipe(data);
      updateStep('scanned');
      onRecipeExtracted?.(data);

      // Prevent scroll jump on mobile
      if (typeof window !== 'undefined' && window.innerWidth < 768) {
        setTimeout(() => {
          demoContainerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
      }
    } catch (err) {
      console.error('Extraction error:', err);
      setError(
        err instanceof Error
          ? err.message
          : 'Failed to extract recipe. Please try another image.'
      );
      updateStep('upload');
    }
  };

  const handleImageUpload = useCallback((file: File | null) => {
    if (!file || !file.type.startsWith('image/')) {
      setError('Please upload an image file');
      return;
    }

    setShowSampleSelector(false);
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setImagePreview(result);
      const base64Data = result.split(',')[1];
      setUploadedImage(base64Data);
      detectRecipes(base64Data);
    };
    reader.readAsDataURL(file);
  }, []);

  const handleSampleSelect = (sample: SampleRecipe) => {
    setShowSampleSelector(false);
    setImagePreview(sample.imagePath);
    // In production, this would load from the path directly
    // For demo, we'll convert the image to base64
    fetch(sample.imagePath)
      .then((res) => res.blob())
      .then((blob) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const result = e.target?.result as string;
          const base64Data = result.split(',')[1];
          setUploadedImage(base64Data);
          detectRecipes(base64Data);
        };
        reader.readAsDataURL(blob);
      });
  };

  const handleRecipeSelection = (recipeId: string) => {
    const selected = detectedRecipes.find((r) => r.id === recipeId);
    if (!selected || !uploadedImage) return;

    setSelectedRecipeId(recipeId);
    extractRecipe(uploadedImage, selected.boundingBox);
  };

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      handleImageUpload(file);
    },
    [handleImageUpload]
  );

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleRecipeEdit = (field: string, value: string) => {
    const editor = getCurrentEditor();

    let oldValue = '';
    if (field === 'title') {
      oldValue = recipe?.title || '';
    } else if (field.startsWith('ingredient-')) {
      const idx = parseInt(field.split('-')[1]);
      oldValue = recipe?.ingredients?.[idx] || '';
    } else if (field.startsWith('instruction-')) {
      const idx = parseInt(field.split('-')[1]);
      oldValue = recipe?.instructions?.[idx] || '';
    }

    if (editor && value !== oldValue) {
      setChanges((prev) => {
        const fieldChanges = prev[field] || [];
        const lastChange = fieldChanges[fieldChanges.length - 1];

        if (lastChange && lastChange.by === editor.name) {
          return {
            ...prev,
            [field]: [...fieldChanges.slice(0, -1), { ...lastChange, to: value }],
          };
        }

        return {
          ...prev,
          [field]: [...fieldChanges, { by: editor.name, year: editor.year, from: oldValue, to: value }],
        };
      });
    }

    if (!recipe) return;

    if (field === 'title') {
      setRecipe({ ...recipe, title: value });
    } else if (field.startsWith('ingredient-')) {
      const idx = parseInt(field.split('-')[1]);
      const ingredients = recipe.ingredients || [];
      if (idx >= ingredients.length) {
        setRecipe({ ...recipe, ingredients: [...ingredients, value] });
      } else {
        setRecipe({
          ...recipe,
          ingredients: ingredients.map((ing, i) => (i === idx ? value : ing)),
        });
      }
    } else if (field.startsWith('instruction-')) {
      const idx = parseInt(field.split('-')[1]);
      const instructions = recipe.instructions || [];
      if (idx >= instructions.length) {
        setRecipe({ ...recipe, instructions: [...instructions, value] });
      } else {
        setRecipe({
          ...recipe,
          instructions: instructions.map((inst, i) => (i === idx ? value : inst)),
        });
      }
    }
  };

  const getFieldChanges = (field: string): FieldChange[] => changes[field] || [];
  const getLatestChange = (field: string): FieldChange | null => {
    const fieldChanges = changes[field];
    return fieldChanges?.[fieldChanges.length - 1] || null;
  };

  const toggleSticker = (stickerId: string, who: 'mom' | 'you') => {
    if (who === 'mom') {
      setMomStickers((prev) =>
        prev.includes(stickerId) ? prev.filter((s) => s !== stickerId) : [...prev, stickerId]
      );
    } else {
      setYourStickers((prev) =>
        prev.includes(stickerId) ? prev.filter((s) => s !== stickerId) : [...prev, stickerId]
      );
    }
  };

  const handleMomSubmit = () => {
    setSavedMomNote(momNote);
    setIsFlipped(true);
    setTimeout(() => {
      updateStep('fork2');
      setTimeout(() => setIsFlipped(false), 800);
    }, 1200);
  };

  const handleYourSubmit = () => {
    setSavedYourNote(yourNote);
    setIsFlipped(true);
    setTimeout(() => {
      updateStep('lineage');
      onFlowComplete?.();
    }, 800);
  };

  const reset = () => {
    updateStep('upload');
    setShowSampleSelector(true);
    setUploadedImage(null);
    setImagePreview(null);
    setRecipe(null);
    setError(null);
    setMomNote('');
    setYourNote('');
    setSavedMomNote('');
    setSavedYourNote('');
    setIsFlipped(false);
    setChanges({});
    setMomStickers([]);
    setYourStickers([]);
    setExpandedIngredients(false);
    setExpandedInstructions(false);
    setInstructionsCollapsed(false);
  };

  const confidenceToScore = (level: string): number => {
    switch (level) {
      case 'high':
        return Math.floor(Math.random() * 5) + 95;
      case 'medium':
        return Math.floor(Math.random() * 10) + 85;
      case 'low':
        return Math.floor(Math.random() * 15) + 70;
      default:
        return 90;
    }
  };

  const confidenceToColor = (level: string): string => {
    switch (level) {
      case 'high':
        return COLORS.green;
      case 'medium':
        return '#6b5b2d';
      case 'low':
        return '#8b4a2b';
      default:
        return COLORS.primaryDark;
    }
  };

  const scores = recipe?.confidence
    ? {
        title: confidenceToScore(recipe.confidence.title),
        ingredients: confidenceToScore(recipe.confidence.ingredients),
        instructions: confidenceToScore(recipe.confidence.instructions),
      }
    : {};

  const overallScore =
    recipe?.confidence && scores.title && scores.ingredients && scores.instructions
      ? Math.round((scores.title + scores.ingredients + scores.instructions) / 3)
      : 0;

  const getGenerationCount = () => {
    if (savedYourNote || step === 'lineage') return 3;
    if (savedMomNote || step === 'fork2') return 2;
    return 1;
  };

  const getGenerationLabel = () => {
    const count = getGenerationCount();
    if (count === 1) return 'Original';
    return `${count} Generations`;
  };

  const allStickers: StickerOnCard[] = [
    ...momStickers.map((id) => {
      const sticker = DEMO_STICKERS.find((s) => s.id === id);
      return { ...sticker!, by: 'Mom', year: '2015' };
    }),
    ...yourStickers.map((id) => {
      const sticker = DEMO_STICKERS.find((s) => s.id === id);
      return { ...sticker!, by: 'You', year: '2025' };
    }),
  ];

  const isEditable = step === 'scanned' || step === 'fork1' || step === 'fork2';

  // Get step title and description
  const getStepContent = () => {
    switch (step) {
      case 'upload':
        return {
          title: 'Start with a Recipe Card',
          description: 'Select or upload a recipe photo',
        };
      case 'processing':
        return {
          title: 'Reading Your Recipe...',
          description: 'Using AI to extract every detail',
        };
      case 'selecting':
        return {
          title: 'Multiple Recipes Found',
          description: 'Click on a recipe to extract its details',
        };
      case 'scanned':
        return {
          title: 'Recipe Captured',
          description: "Grandma Kay's recipe is now in Heirloom",
        };
      case 'fork1':
        return {
          title: "Mom's Turn",
          description: 'Edit the recipe or add a note on the back',
        };
      case 'fork2':
        return {
          title: 'Your Turn',
          description: 'Make it yours — edit or add a note',
        };
      case 'lineage':
        return {
          title: 'A Living Recipe',
          description: 'Flip the card to see its history',
        };
      default:
        return { title: '', description: '' };
    }
  };

  const stepContent = getStepContent();

  return (
    <div className={`min-h-screen bg-gradient-to-br from-[#faf8f5] via-[#faf8f5] to-[#f4f0e8] font-sans pt-2 pb-6 px-3 md:pt-8 md:pb-16 md:px-5 ${className}`}>
      {/* Header */}
      <div className="text-center mb-3 mt-0">
        <h1 className="text-2xl md:text-4xl font-bold text-[#3d2914] mb-1 leading-none">
          {stepContent.title}
        </h1>
        <p className="text-sm md:text-base text-[#8b7355] leading-relaxed max-w-xs md:max-w-md mx-auto">
          {step === 'upload' && showSampleSelector ? (
            <>
              Select or{' '}
              <button
                onClick={() => setShowSampleSelector(false)}
                className="underline hover:text-[#8b5a2b] transition-colors cursor-pointer"
              >
                upload
              </button>{' '}
              a recipe photo
            </>
          ) : (
            stepContent.description
          )}
        </p>
      </div>

      {/* Main Content */}
      <div ref={demoContainerRef} className="max-w-6xl mx-auto">
        {/* UPLOAD STEP */}
        {step === 'upload' && (
          <div className="space-y-4 md:space-y-8">
            {showSampleSelector ? (
              <SampleRecipeSelector
                onSelectSample={handleSampleSelect}
                onUploadOwn={() => setShowSampleSelector(false)}
              />
            ) : (
              <UploadSection
                isDragging={isDragging}
                error={error}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onFileSelect={handleImageUpload}
                fileInputRef={fileInputRef}
              />
            )}
          </div>
        )}

        {/* PROCESSING STEP */}
        {step === 'processing' && imagePreview && <ProcessingSection imagePreview={imagePreview} />}

        {/* SELECTING STEP */}
        {step === 'selecting' && imagePreview && detectedRecipes.length > 0 && (
          <div className="fade-in">
            <RecipeSelector
              imageUrl={imagePreview}
              detectedRecipes={detectedRecipes}
              onSelectRecipe={handleRecipeSelection}
            />
          </div>
        )}

        {/* RECIPE CARD - shown from scanned onward */}
        {(step === 'scanned' || step === 'fork1' || step === 'fork2' || step === 'lineage') && recipe && (
          <div className="fade-in">
            {/* Desktop: Card centered, timeline to the left */}
            <div className="hidden md:flex md:justify-center md:items-start md:gap-10">
              {/* Timeline */}
              <Timeline step={step} />

              {/* Card and Action Area - centered */}
              <div className="flex flex-col items-center gap-6">
              {/* Recipe Card */}
              <RecipeCard
                recipe={recipe}
                isFlipped={isFlipped}
                onFlip={() => setIsFlipped(!isFlipped)}
                imagePreview={imagePreview}
                step={step}
                editingField={editingField}
                onStartEdit={setEditingField}
                onEndEdit={() => setEditingField(null)}
                onEdit={handleRecipeEdit}
                getFieldChanges={getFieldChanges}
                getLatestChange={getLatestChange}
                isEditable={isEditable}
                expandedIngredients={expandedIngredients}
                setExpandedIngredients={setExpandedIngredients}
                expandedInstructions={expandedInstructions}
                setExpandedInstructions={setExpandedInstructions}
                instructionsCollapsed={instructionsCollapsed}
                setInstructionsCollapsed={setInstructionsCollapsed}
                allStickers={allStickers}
                savedMomNote={savedMomNote}
                savedYourNote={savedYourNote}
                changes={changes}
                getGenerationCount={getGenerationCount}
                getGenerationLabel={getGenerationLabel}
                confidenceToScore={confidenceToScore}
                confidenceToColor={confidenceToColor}
                scores={scores}
                overallScore={overallScore}
              />

              {/* Action Area */}
              <div className="w-full max-w-[420px]">
                {/* Scanned - proceed to fork */}
                {step === 'scanned' && (
                  <div className="fade-in text-center">
                    <div className="bg-[rgba(45,90,39,0.08)] rounded-xl p-4 mb-5">
                      <div className="text-3xl font-bold text-[#2d5a27] font-mono">{overallScore}%</div>
                      <div className="text-xs text-[#5c4033]">Overall Confidence</div>
                    </div>
                    <button
                      onClick={() => updateStep('fork1')}
                      className="w-full bg-[#8b5a2b] text-white border-none rounded-lg py-3.5 px-4 text-[15px] font-semibold cursor-pointer hover:bg-[#6b4a1b] transition-colors"
                    >
                      Share with Mom →
                    </button>
                  </div>
                )}

                {/* Fork 1 - Mom's note input */}
                {step === 'fork1' && !isFlipped && (
                  <div className="fade-in">
                    <label className="text-[13px] text-[#5c4033] font-medium block mb-1.5">
                      Mom writes on the back of the card:
                    </label>
                    <textarea
                      value={momNote}
                      onChange={(e) => setMomNote(e.target.value)}
                      placeholder="I always double the honey — our family likes it sweeter..."
                      className="w-full min-h-[80px] p-3 rounded-lg border border-[#e0d5c5] text-sm resize-y bg-[#fff8dc] mb-3"
                      style={{ fontFamily: 'Georgia, serif' }}
                    />

                    {/* Sticker picker */}
                    <div className="mb-3">
                      <label className="text-xs text-[#8b7355] block mb-1.5">Add a sticker (optional):</label>
                      <div className="sticker-picker flex gap-2 flex-wrap justify-center">
                        {shuffledStickers.map((sticker) => (
                          <button
                            key={sticker.id}
                            className={`sticker-btn ${momStickers.includes(sticker.id) ? 'selected' : ''}`}
                            onClick={() => toggleSticker(sticker.id, 'mom')}
                            title={sticker.label}
                            type="button"
                          >
                            <img src={sticker.imagePath} alt={sticker.label} className="w-full h-full object-contain" />
                          </button>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={handleMomSubmit}
                      disabled={!momNote.trim() && momStickers.length === 0}
                      className={`w-full ${
                        momNote.trim() || momStickers.length > 0
                          ? 'bg-[#8b5a2b] cursor-pointer hover:bg-[#6b4a1b]'
                          : 'bg-[#d4c4a8] cursor-not-allowed'
                      } text-white border-none rounded-lg py-3.5 px-4 text-[15px] font-semibold transition-colors flex items-center justify-center gap-2`}
                    >
                      <span>↻</span> Flip & Add to Card
                    </button>
                  </div>
                )}

                {/* Fork 2 - Your note input */}
                {step === 'fork2' && !isFlipped && (
                  <div className="fade-in">
                    <label className="text-[13px] text-[#5c4033] font-medium block mb-2">
                      Your turn — add your note:
                    </label>
                    <textarea
                      value={yourNote}
                      onChange={(e) => setYourNote(e.target.value)}
                      placeholder="I make it vegan with oat milk and flax eggs..."
                      className="w-full min-h-[80px] p-3 rounded-lg border border-[#c5dcc5] text-sm resize-y bg-[#e8f4e8] mb-4"
                      style={{ fontFamily: 'Georgia, serif' }}
                    />

                    {/* Sticker picker */}
                    <div className="mb-3">
                      <label className="text-xs text-[#8b7355] block mb-1.5">Add a sticker (optional):</label>
                      <div className="sticker-picker flex gap-2 flex-wrap justify-center">
                        {shuffledStickers.map((sticker) => (
                          <button
                            key={sticker.id}
                            className={`sticker-btn ${yourStickers.includes(sticker.id) ? 'selected' : ''}`}
                            onClick={() => toggleSticker(sticker.id, 'you')}
                            title={sticker.label}
                            type="button"
                          >
                            <img src={sticker.imagePath} alt={sticker.label} className="w-full h-full object-contain" />
                          </button>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={handleYourSubmit}
                      disabled={!yourNote.trim() && yourStickers.length === 0}
                      className={`w-full ${
                        yourNote.trim() || yourStickers.length > 0
                          ? 'bg-[#8b5a2b] cursor-pointer hover:bg-[#6b4a1b]'
                          : 'bg-[#d4c4a8] cursor-not-allowed'
                      } text-white border-none rounded-lg py-3.5 px-4 text-[15px] font-semibold transition-colors flex items-center justify-center gap-2`}
                    >
                      <span>↻</span> Flip & Add to Card
                    </button>
                  </div>
                )}

                {/* Lineage - final state */}
                {step === 'lineage' && (
                  <div className="fade-in text-center">
                    <div className="p-4 md:p-6 bg-[rgba(139,90,43,0.05)] rounded-2xl mb-3 md:mb-5">
                      <p
                        className="text-xl text-[#3d2914] italic leading-relaxed m-0"
                        style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
                      >
                        &quot;Every recipe has a story.
                        <br />
                        Heirloom remembers it.&quot;
                      </p>
                    </div>
                    <button
                      onClick={reset}
                      className="bg-transparent text-[#8b5a2b] border-2 border-[#8b5a2b] rounded-lg py-3 px-8 text-[15px] font-semibold cursor-pointer hover:bg-[#8b5a2b] hover:text-white transition-all"
                    >
                      ↺ Try Another Recipe
                    </button>
                  </div>
                )}
              </div>
              </div>
            </div>

            {/* Mobile: Side-by-side layout */}
            <div className="md:hidden flex flex-row items-start gap-1">
              <div className="flex-shrink-0">
                <Timeline step={step} />
              </div>
              <div className="flex-1 min-w-0">
              <RecipeCard
                recipe={recipe}
                isFlipped={isFlipped}
                onFlip={() => setIsFlipped(!isFlipped)}
                imagePreview={imagePreview}
                step={step}
                editingField={editingField}
                onStartEdit={setEditingField}
                onEndEdit={() => setEditingField(null)}
                onEdit={handleRecipeEdit}
                getFieldChanges={getFieldChanges}
                getLatestChange={getLatestChange}
                isEditable={isEditable}
                expandedIngredients={expandedIngredients}
                setExpandedIngredients={setExpandedIngredients}
                expandedInstructions={expandedInstructions}
                setExpandedInstructions={setExpandedInstructions}
                instructionsCollapsed={instructionsCollapsed}
                setInstructionsCollapsed={setInstructionsCollapsed}
                allStickers={allStickers}
                savedMomNote={savedMomNote}
                savedYourNote={savedYourNote}
                changes={changes}
                getGenerationCount={getGenerationCount}
                getGenerationLabel={getGenerationLabel}
                confidenceToScore={confidenceToScore}
                confidenceToColor={confidenceToColor}
                scores={scores}
                overallScore={overallScore}
              />

              {/* Action Area - Mobile */}
              <div className="w-full max-w-[420px]">
                {/* Scanned - proceed to fork */}
                {step === 'scanned' && (
                  <div className="fade-in text-center">
                    <div className="bg-[rgba(45,90,39,0.08)] rounded-xl p-2 mb-3 md:p-3 md:mb-4">
                      <div className="text-[24px] md:text-[32px] font-bold text-[#2d5a27] mb-0.5" style={{ fontFamily: 'ui-monospace, monospace' }}>
                        {overallScore}%
                      </div>
                      <div className="text-[10px] md:text-xs text-[#5c4033]">Overall Confidence</div>
                    </div>
                    <button
                      onClick={() => setStep('fork1')}
                      className="w-full bg-[#8b5a2b] text-white border-none rounded-lg py-3.5 text-[15px] font-semibold cursor-pointer hover:bg-[#7a4d24] transition-colors"
                    >
                      Share with Mom →
                    </button>
                  </div>
                )}

                {/* Fork 1 - Mom's note input */}
                {step === 'fork1' && !isFlipped && (
                  <div className="fade-in">
                    <label className="text-[13px] text-[#5c4033] font-medium block mb-1.5">
                      Mom writes on the back of the card:
                    </label>
                    <textarea
                      value={momNote}
                      onChange={(e) => setMomNote(e.target.value)}
                      placeholder="I always double the honey — our family likes it sweeter..."
                      className="w-full min-h-[80px] p-3 rounded-lg border border-[#e0d5c5] text-sm resize-y bg-[#fff8dc] mb-3"
                      style={{ fontFamily: 'Georgia, serif' }}
                    />

                    {/* Sticker picker - Mom */}
                    <div className="mb-4">
                      <label className="text-xs text-[#8b7355] block mb-2">
                        Add a sticker (optional):
                      </label>
                      <div className="flex gap-2 flex-wrap">
                        {DEMO_STICKERS.map((sticker) => (
                          <button
                            key={sticker.id}
                            onClick={() => toggleSticker(sticker.id, 'mom')}
                            className={`w-10 h-10 rounded-lg border-2 transition-all ${
                              momStickers.includes(sticker.id)
                                ? 'border-[#8b5a2b] bg-[rgba(139,90,43,0.1)]'
                                : 'border-[#e0d5c5] bg-white hover:border-[#c9a66b]'
                            }`}
                            title={sticker.label}
                            type="button"
                          >
                            <img src={sticker.imagePath} alt={sticker.label} className="w-full h-full object-contain" />
                          </button>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={handleMomSubmit}
                      disabled={!momNote.trim() && momStickers.length === 0}
                      className="w-full bg-[#8b5a2b] text-white border-none rounded-lg py-3.5 text-[15px] font-semibold cursor-pointer disabled:bg-[#d4c4a8] disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      <span>↻</span> Flip & Add to Card
                    </button>
                  </div>
                )}

                {/* Fork 2 - Your note input */}
                {step === 'fork2' && !isFlipped && (
                  <div className="fade-in">
                    <label className="text-[13px] text-[#5c4033] font-medium block mb-2">
                      Your turn — add your note:
                    </label>
                    <textarea
                      value={yourNote}
                      onChange={(e) => setYourNote(e.target.value)}
                      placeholder="I make it vegan with oat milk and flax eggs..."
                      className="w-full min-h-[80px] p-3 rounded-lg border border-[#c5dcc5] text-sm resize-y bg-[#e8f4e8] mb-4"
                      style={{ fontFamily: 'Georgia, serif' }}
                    />

                    {/* Sticker picker - You */}
                    <div className="mb-4">
                      <label className="text-xs text-[#8b7355] block mb-2">
                        Add a sticker (optional):
                      </label>
                      <div className="flex gap-2 flex-wrap">
                        {DEMO_STICKERS.map((sticker) => (
                          <button
                            key={sticker.id}
                            onClick={() => toggleSticker(sticker.id, 'you')}
                            className={`w-10 h-10 rounded-lg border-2 transition-all ${
                              yourStickers.includes(sticker.id)
                                ? 'border-[#2d5a27] bg-[rgba(45,90,39,0.1)]'
                                : 'border-[#e0d5c5] bg-white hover:border-[#a4c5a4]'
                            }`}
                            title={sticker.label}
                            type="button"
                          >
                            <img src={sticker.imagePath} alt={sticker.label} className="w-full h-full object-contain" />
                          </button>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={handleYourSubmit}
                      disabled={!yourNote.trim() && yourStickers.length === 0}
                      className="w-full bg-[#8b5a2b] text-white border-none rounded-lg py-3.5 text-[15px] font-semibold cursor-pointer disabled:bg-[#d4c4a8] disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      <span>↻</span> Flip & Add to Card
                    </button>
                  </div>
                )}

                {/* Lineage - final state */}
                {step === 'lineage' && (
                  <div className="fade-in text-center">
                    <div className="p-4 md:p-6 bg-[rgba(139,90,43,0.05)] rounded-2xl mb-3 md:mb-5">
                      <p
                        className="text-xl text-[#3d2914] italic leading-relaxed m-0"
                        style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
                      >
                        &quot;Every recipe has a story.
                        <br />
                        Heirloom remembers it.&quot;
                      </p>
                    </div>
                    <button
                      onClick={reset}
                      className="bg-transparent text-[#8b5a2b] border-2 border-[#8b5a2b] rounded-lg py-3 px-8 text-[15px] font-semibold cursor-pointer hover:bg-[#8b5a2b] hover:text-white transition-all"
                    >
                      ↺ Try Another Recipe
                    </button>
                  </div>
                )}
              </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Styles */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&display=swap');

        @keyframes fadeSlideIn {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes badgePop {
          0% {
            transform: scale(0.8);
            opacity: 0;
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        .fade-in {
          animation: fadeSlideIn 0.5s ease-out both;
        }

        .badge-pop {
          animation: badgePop 0.4s ease-out both;
        }

        .card-container {
          perspective: 1200px;
          overflow: visible;
        }

        .card-flipper {
          position: relative;
          width: 100%;
          max-width: 420px;
          transition: transform 0.7s cubic-bezier(0.4, 0, 0.2, 1);
          transform-style: preserve-3d;
          overflow: visible;
        }

        .card-flipper.flipped {
          transform: rotateY(180deg);
        }

        .card-front,
        .card-back {
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }

        .card-flip-tab {
          position: absolute;
          bottom: 12px;
          right: 12px;
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 6px 10px;
          background: rgba(139, 90, 43, 0.06);
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.2s ease;
          color: #8b7355;
          font-size: 12px;
        }

        .card-flip-tab:hover {
          background: rgba(139, 90, 43, 0.12);
          color: #5c4033;
        }

        .card-flip-tab svg {
          width: 14px;
          height: 14px;
        }

        .sticker-picker {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          justify-content: center;
        }

        .sticker-btn {
          width: 44px;
          height: 44px;
          padding: 3px;
          border-radius: 12px;
          border: 2px solid #e8e0d5;
          background: white;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .sticker-btn:hover {
          border-color: #c9a66b;
          transform: scale(1.1);
        }

        .sticker-btn.selected {
          border-color: #8b5a2b;
          background-color: #fef9e7;
        }

        .editable-text {
          cursor: text;
          border-radius: 4px;
          transition: background-color 0.15s ease;
          padding: 2px 4px;
          margin: -2px -4px;
        }

        .editable-text:hover {
          background-color: rgba(139, 90, 43, 0.08);
        }

        .editable-hint {
          animation: editableHint 2s ease-in-out 3;
        }

        @keyframes editableHint {
          0%,
          100% {
            box-shadow: 0 0 0 0 transparent;
            background-color: transparent;
          }
          50% {
            box-shadow: 0 0 0 2px rgba(139, 90, 43, 0.3);
            background-color: rgba(139, 90, 43, 0.05);
          }
        }

        .change-attribution {
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }

        .change-badge {
          font-size: 9px;
          padding: 2px 6px;
          border-radius: 8px;
          font-weight: 600;
          white-space: nowrap;
          cursor: help;
          position: relative;
        }

        .change-badge.mom {
          background-color: #fff3e0;
          color: #8b5a2b;
        }

        .change-badge.you {
          background-color: #e8f5e9;
          color: #2d5a27;
        }

        .change-badge.multiple {
          background-color: #f3e5f5;
          color: #6a3d7a;
        }

        .changed-text {
          border-bottom: 1px dashed currentColor;
          padding-bottom: 1px;
        }

        .change-tooltip {
          position: absolute;
          bottom: 100%;
          left: 50%;
          transform: translateX(-50%);
          background: #3d2914;
          color: #fff;
          padding: 8px 12px;
          border-radius: 6px;
          font-size: 11px;
          white-space: nowrap;
          z-index: 100;
          margin-bottom: 6px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
        }

        .change-tooltip::after {
          content: '';
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translateX(-50%);
          border: 5px solid transparent;
          border-top-color: #3d2914;
        }

        .sticker-on-card {
          position: absolute;
          filter: drop-shadow(1px 2px 2px rgba(0, 0, 0, 0.15));
          cursor: help;
          transition: transform 0.2s ease;
        }

        .sticker-on-card:hover {
          transform: scale(1.1) rotate(0deg) !important;
          filter: drop-shadow(2px 3px 4px rgba(0, 0, 0, 0.25));
          z-index: 10;
        }

        .sticker-tooltip-card {
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translateX(-50%);
          background: #3d2914;
          color: #fff;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 10px;
          white-space: nowrap;
          z-index: 100;
          margin-top: 4px;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.2s ease;
        }

        .sticker-on-card:hover .sticker-tooltip-card {
          opacity: 1;
        }
      `}</style>
    </div>
  );
}

export default HeirloomDemo;
