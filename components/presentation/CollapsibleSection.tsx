/**
 * Collapsible Section Component (Shared)
 * Progressive disclosure for dense content
 *
 * Features:
 * - Expand/collapse with smooth animation
 * - Optional default expanded state
 * - Terminal Gold accent for expand indicator
 * - Accessible with proper ARIA attributes
 */

'use client';

import { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { RATIONALE_ACCENT } from '@/lib/presentation/design-tokens';

interface CollapsibleSectionProps {
  title: string;
  children: React.ReactNode;
  defaultExpanded?: boolean;
  accentColor?: string;
  className?: string;
}

export default function CollapsibleSection({
  title,
  children,
  defaultExpanded = false,
  accentColor = RATIONALE_ACCENT,
  className = ''
}: CollapsibleSectionProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <div className={`border border-gray-700 rounded-lg overflow-hidden ${className}`}>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-4 py-3 flex items-center justify-between bg-gray-900/40 hover:bg-gray-900/60 transition-colors"
        aria-expanded={isExpanded}
        aria-controls={`collapsible-${title.replace(/\s+/g, '-')}`}
      >
        <span className="text-sm font-semibold text-white flex items-center gap-2">
          {isExpanded ? (
            <ChevronDown className="w-4 h-4" style={{ color: accentColor }} />
          ) : (
            <ChevronRight className="w-4 h-4" style={{ color: accentColor }} />
          )}
          {title}
        </span>
        <span className="text-xs text-gray-500">
          {isExpanded ? 'Collapse' : 'Expand'}
        </span>
      </button>

      {isExpanded && (
        <div
          id={`collapsible-${title.replace(/\s+/g, '-')}`}
          className="p-4 animate-fade-in"
        >
          {children}
        </div>
      )}
    </div>
  );
}
