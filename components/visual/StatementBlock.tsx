/**
 * StatementBlock Component
 *
 * Bold accented container for philosophy/approach statements
 * Provides clear typography hierarchy and visual impact
 *
 * Phase 4.3: Migrated to use terminal-gold token
 */

import React from 'react';

interface StatementBlockProps {
  title?: string;
  statement: string;
  supporting?: string;
  accentColor?: string;
  className?: string;
}

export function StatementBlock({
  title,
  statement,
  supporting,
  accentColor = 'rgb(255 215 0)', // terminal-gold
  className = ''
}: StatementBlockProps) {
  return (
    <div className={`max-w-3xl mx-auto ${className}`}>
      {title && (
        <h2 className="text-3xl sm:text-4xl font-bold mb-6">
          {title}
        </h2>
      )}
      <div
        className="bg-gray-900/50 border-l-4 p-6 sm:p-8 rounded-lg"
        style={{ borderLeftColor: accentColor }}
      >
        <p className="text-xl sm:text-2xl font-semibold text-white leading-relaxed mb-4">
          {statement}
        </p>
        {supporting && (
          <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
            {supporting}
          </p>
        )}
      </div>
    </div>
  );
}
