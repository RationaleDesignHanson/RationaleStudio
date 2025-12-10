'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils/cn';

export interface DiagramElement {
  id: string;
  icon: string;
  title: string;
  summary: string;
  details: string[];
  color?: string;
}

interface ProgressiveDisclosureDiagramProps {
  elements: DiagramElement[];
  title: string;
  layout?: 'grid' | 'flow';
}

/**
 * Progressive Disclosure Pattern
 *
 * For medium-complexity diagrams (5-10 elements)
 * Shows overview grid, tap to expand full details
 *
 * @example
 * <ProgressiveDisclosureDiagram
 *   elements={modules}
 *   title="4 Integrated Modules"
 *   layout="grid"
 * />
 */
export function ProgressiveDisclosureDiagram({
  elements,
  title,
  layout = 'grid'
}: ProgressiveDisclosureDiagramProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selectedElement = elements.find(el => el.id === selectedId);

  if (selectedElement) {
    // Detail view
    const currentIndex = elements.indexOf(selectedElement);

    return (
      <div className="space-y-6">
        <button
          onClick={() => setSelectedId(null)}
          className="flex items-center text-terminal-gold text-sm hover:text-terminal-gold-hover transition-colors"
          aria-label="Back to overview"
        >
          ← Back to overview
        </button>

        <div className="bg-gray-900/70 border border-terminal-gold/30 rounded-lg p-6">
          <div className="text-6xl text-center mb-4" aria-hidden="true">
            {selectedElement.icon}
          </div>
          <h3 className="text-2xl font-bold text-center mb-2">
            {selectedElement.title}
          </h3>
          <p className="text-gray-300 text-center mb-6">
            {selectedElement.summary}
          </p>

          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-terminal-gold uppercase tracking-wide">
              Key Features
            </h4>
            {selectedElement.details.map((detail, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="text-terminal-gold text-lg mt-0.5" aria-hidden="true">
                  ✓
                </div>
                <div className="text-base text-gray-200">{detail}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation to next/prev element */}
        <div className="flex justify-between">
          {currentIndex > 0 && (
            <button
              onClick={() => setSelectedId(elements[currentIndex - 1].id)}
              className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded transition-colors"
              aria-label={`Previous: ${elements[currentIndex - 1].title}`}
            >
              ← Previous
            </button>
          )}
          <div className="flex-1" />
          {currentIndex < elements.length - 1 && (
            <button
              onClick={() => setSelectedId(elements[currentIndex + 1].id)}
              className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded transition-colors"
              aria-label={`Next: ${elements[currentIndex + 1].title}`}
            >
              Next →
            </button>
          )}
        </div>

        {/* Progress indicator */}
        <div className="text-center text-sm text-gray-400">
          {currentIndex + 1} of {elements.length}
        </div>
      </div>
    );
  }

  // Overview grid
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">{title}</h2>
        <p className="text-gray-400">Tap any item to learn more</p>
      </div>

      <div
        className={cn(
          'grid gap-4',
          layout === 'grid' ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1'
        )}
      >
        {elements.map((element) => (
          <button
            key={element.id}
            onClick={() => setSelectedId(element.id)}
            className={cn(
              'bg-gray-900/70 border border-gray-700 hover:border-terminal-gold/50',
              'rounded-lg p-6 text-center space-y-3 transition-all duration-200',
              'min-h-[200px] focus:outline-none focus:ring-2 focus:ring-terminal-gold',
              element.color && `hover:bg-gradient-to-br ${element.color} hover:bg-opacity-10`
            )}
            aria-label={`View details for ${element.title}`}
          >
            <div className="text-5xl" aria-hidden="true">
              {element.icon}
            </div>
            <div className="text-lg font-semibold">{element.title}</div>
            <div className="text-sm text-gray-400 line-clamp-2">
              {element.summary}
            </div>
            <div className="text-xs text-terminal-gold">Tap for details →</div>
          </button>
        ))}
      </div>
    </div>
  );
}
