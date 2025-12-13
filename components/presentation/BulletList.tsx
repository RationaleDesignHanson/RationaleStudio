/**
 * Bullet List Component (Shared)
 * Renders bullet points with markdown support
 *
 * Features:
 * - Headers: Wrap text in ** to create section headers
 * - Bold: Use **text** within bullets for emphasis
 * - Empty strings: Create spacing
 * - Customizable bullet color and style
 */

'use client';

import { RATIONALE_ACCENT } from '@/lib/presentation/design-tokens';

interface BulletListProps {
  bullets: string[];
  bulletColor?: string;
  className?: string;
}

export default function BulletList({
  bullets,
  bulletColor = '#3B82F6', // Default blue
  className = ''
}: BulletListProps) {
  if (!bullets || bullets.length === 0) return null;

  return (
    <div className={`mt-6 space-y-3 ${className}`}>
      {bullets.map((bullet, index) => {
        // Check if bullet is a header (starts with ** and ends with **)
        if (bullet.startsWith('**') && bullet.endsWith('**')) {
          return (
            <div key={index} className="text-base font-semibold text-white mt-6 first:mt-0">
              {bullet.replace(/\*\*/g, '')}
            </div>
          );
        }

        // Check if bullet is empty (spacing)
        if (bullet.trim() === '') {
          return <div key={index} className="h-2" />;
        }

        // Parse markdown bold within bullets
        const parts = bullet.split(/(\*\*.*?\*\*)/g);

        return (
          <div key={index} className="flex items-start gap-3">
            <div
              className="flex-shrink-0 mt-1.5"
              style={{ color: bulletColor }}
              aria-hidden="true"
            >
              •
            </div>
            <div className="text-sm text-gray-300 leading-relaxed">
              {parts.map((part, i) => {
                if (part.startsWith('**') && part.endsWith('**')) {
                  return (
                    <span key={i} className="font-semibold text-white">
                      {part.replace(/\*\*/g, '')}
                    </span>
                  );
                }
                return <span key={i}>{part}</span>;
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
