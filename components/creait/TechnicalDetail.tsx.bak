/**
 * TechnicalDetail Component
 *
 * Collapsible section for detailed technical content.
 * Shows complete specifications, code examples, and implementation notes.
 */

'use client';

import { useState, ReactNode } from 'react';

interface TechnicalDetailProps {
  title: string;
  summary?: string;
  children: ReactNode;
  defaultOpen?: boolean;
  badge?: string;
}

export function TechnicalDetail({
  title,
  summary,
  children,
  defaultOpen = true,
  badge,
}: TechnicalDetailProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-2 border-purple-500/30 rounded-lg bg-background/50 overflow-hidden">
      {/* Header - Clickable */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-muted/20 transition-colors text-left"
      >
        <div className="flex items-center gap-3 flex-1">
          <div className="text-xl flex-shrink-0">🔧</div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-1">
              <h4 className="text-base font-semibold text-foreground">{title}</h4>
              {badge && (
                <span className="px-2 py-0.5 text-xs font-medium uppercase tracking-wide rounded bg-accent/10 text-accent">
                  {badge}
                </span>
              )}
            </div>
            {summary && <p className="text-sm text-muted">{summary}</p>}
          </div>
        </div>
        <svg
          className={`w-5 h-5 text-muted transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Content - Collapsible */}
      {isOpen && (
        <div className="px-6 py-4 border-t border-border">
          <div className="prose prose-sm max-w-none">{children}</div>
        </div>
      )}
    </div>
  );
}

interface TechnicalSectionProps {
  title: string;
  children: ReactNode;
  className?: string;
}

/**
 * Section wrapper for technical content
 */
export function TechnicalSection({ title, children, className = '' }: TechnicalSectionProps) {
  return (
    <div className={`space-y-4 ${className}`}>
      <h3 className="text-lg font-bold text-foreground">{title}</h3>
      <div className="space-y-3">{children}</div>
    </div>
  );
}
