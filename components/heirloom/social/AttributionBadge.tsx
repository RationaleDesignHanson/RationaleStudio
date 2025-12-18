/**
 * AttributionBadge Component
 *
 * Displays recipe source attribution (website, cookbook, family, etc.)
 * Shows "Originally from [source]" badge on recipe cards
 */

'use client';

import React from 'react';
import type { SourceType } from '@/lib/firestore/recipes';

interface AttributionBadgeProps {
  sourceType: SourceType;
  sourceURL?: string;
  sourceBookTitle?: string;
  sourcePerson?: string;
  className?: string;
}

export function AttributionBadge({
  sourceType,
  sourceURL,
  sourceBookTitle,
  sourcePerson,
  className = '',
}: AttributionBadgeProps) {
  // Generate attribution text based on source type
  const getAttributionText = (): string => {
    switch (sourceType) {
      case 'website':
        if (sourceURL) {
          try {
            const url = new URL(sourceURL);
            return url.hostname.replace('www.', '');
          } catch {
            return 'a website';
          }
        }
        return 'a website';

      case 'cookbook':
        return sourceBookTitle || 'a cookbook';

      case 'family':
        return sourcePerson || 'family';

      case 'user':
        return sourcePerson || 'a friend';

      default:
        return 'unknown source';
    }
  };

  const attributionText = getAttributionText();

  // Icon for each source type
  const getIcon = (): string => {
    switch (sourceType) {
      case 'website':
        return '🌐';
      case 'cookbook':
        return '📖';
      case 'family':
        return '👨‍👩‍👧‍👦';
      case 'user':
        return '👤';
      default:
        return '📝';
    }
  };

  return (
    <div
      className={`
        inline-flex items-center gap-2 px-3 py-1.5
        bg-[#FBF8F3] border border-gray-200 rounded-full
        text-sm text-gray-700
        ${className}
      `}
    >
      <span className="text-base">{getIcon()}</span>
      <span>
        Originally from <span className="font-medium">{attributionText}</span>
      </span>
    </div>
  );
}

/**
 * Compact version for smaller spaces
 */
export function AttributionBadgeCompact({
  sourceType,
  sourceURL,
  sourceBookTitle,
  sourcePerson,
  className = '',
}: AttributionBadgeProps) {
  const getShortText = (): string => {
    switch (sourceType) {
      case 'website':
        if (sourceURL) {
          try {
            const url = new URL(sourceURL);
            const hostname = url.hostname.replace('www.', '');
            // Shorten long domains
            return hostname.length > 20 ? `${hostname.slice(0, 17)}...` : hostname;
          } catch {
            return 'Web';
          }
        }
        return 'Web';

      case 'cookbook':
        const title = sourceBookTitle || 'Cookbook';
        return title.length > 15 ? `${title.slice(0, 12)}...` : title;

      case 'family':
        return sourcePerson || 'Family';

      case 'user':
        return sourcePerson || 'Shared';

      default:
        return 'Source';
    }
  };

  return (
    <div
      className={`
        inline-flex items-center gap-1.5 px-2 py-1
        bg-gray-100 rounded text-xs text-gray-600
        ${className}
      `}
      title={`Originally from ${getShortText()}`}
    >
      <span className="text-sm">{getIcon(sourceType)}</span>
      <span>{getShortText()}</span>
    </div>
  );
}

// Helper to get icon (extracted for reuse)
function getIcon(sourceType: SourceType): string {
  switch (sourceType) {
    case 'website':
      return '🌐';
    case 'cookbook':
      return '📖';
    case 'family':
      return '👨‍👩‍👧‍👦';
    case 'user':
      return '👤';
    default:
      return '📝';
  }
}
