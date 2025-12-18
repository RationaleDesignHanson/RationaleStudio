/**
 * SaveRecipeButton Component
 *
 * Button to save a recipe to Firestore
 * Handles authentication, API call, and success/error states
 */

'use client';

import React, { useState } from 'react';
import type { CreateRecipeInput } from '@/lib/firestore/recipes';

interface SaveRecipeButtonProps {
  recipe: Omit<CreateRecipeInput, 'userId'>;
  onSuccess?: (recipeId: string) => void;
  onError?: (error: string) => void;
  className?: string;
  variant?: 'primary' | 'secondary';
}

export function SaveRecipeButton({
  recipe,
  onSuccess,
  onError,
  className = '',
  variant = 'primary',
}: SaveRecipeButtonProps) {
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSave = async () => {
    setSaving(true);
    setError(null);

    try {
      const response = await fetch('/api/recipes/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(recipe),
        credentials: 'include', // Include session cookie
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to save recipe');
      }

      setSaved(true);
      onSuccess?.(data.recipe.id);

      // Reset saved state after 3 seconds
      setTimeout(() => {
        setSaved(false);
      }, 3000);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
      onError?.(errorMessage);

      // Clear error after 5 seconds
      setTimeout(() => {
        setError(null);
      }, 5000);
    } finally {
      setSaving(false);
    }
  };

  const baseStyles = `
    inline-flex items-center justify-center gap-2 px-4 py-2
    rounded-lg font-medium transition-all
    disabled:opacity-50 disabled:cursor-not-allowed
  `;

  const variantStyles = {
    primary: `
      bg-[#E85D4D] text-white hover:bg-[#D94D3D]
      shadow-md hover:shadow-lg
    `,
    secondary: `
      bg-white text-[#E85D4D] border-2 border-[#E85D4D]
      hover:bg-[#FBF8F3]
    `,
  };

  return (
    <div className={className}>
      <button
        onClick={handleSave}
        disabled={saving || saved}
        className={`${baseStyles} ${variantStyles[variant]}`}
      >
        {saving && (
          <>
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            <span>Saving...</span>
          </>
        )}
        {saved && !saving && (
          <>
            <span className="text-lg">✓</span>
            <span>Saved!</span>
          </>
        )}
        {!saving && !saved && (
          <>
            <span className="text-lg">💾</span>
            <span>Save Recipe</span>
          </>
        )}
      </button>

      {error && (
        <div className="mt-2 text-sm text-red-600">
          {error}
        </div>
      )}
    </div>
  );
}

/**
 * Compact icon-only version for toolbars
 */
export function SaveRecipeIconButton({
  recipe,
  onSuccess,
  onError,
  className = '',
}: Omit<SaveRecipeButtonProps, 'variant'>) {
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = async () => {
    setSaving(true);

    try {
      const response = await fetch('/api/recipes/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(recipe),
        credentials: 'include',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to save recipe');
      }

      setSaved(true);
      onSuccess?.(data.recipe.id);

      setTimeout(() => {
        setSaved(false);
      }, 3000);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      onError?.(errorMessage);
    } finally {
      setSaving(false);
    }
  };

  return (
    <button
      onClick={handleSave}
      disabled={saving || saved}
      className={`
        inline-flex items-center justify-center
        w-10 h-10 rounded-full
        bg-[#E85D4D] text-white hover:bg-[#D94D3D]
        shadow-md hover:shadow-lg transition-all
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
      title={saved ? 'Saved!' : 'Save recipe'}
    >
      {saving && (
        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
      )}
      {saved && !saving && <span className="text-lg">✓</span>}
      {!saving && !saved && <span className="text-lg">💾</span>}
    </button>
  );
}
