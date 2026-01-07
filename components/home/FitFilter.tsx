/**
 * Fit Filter Component
 *
 * Restyled to match Work page patterns:
 * - No GlassCard wrapper
 * - Simple 4-column grid
 * - Minimal card aesthetic
 */

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function FitFilter() {
  const fitCriteria = [
    {
      label: 'BUILDERS',
      description: 'Founders who ship and understand the work—not just managers.'
    },
    {
      label: 'VELOCITY',
      description: 'Have conviction but need speed and systematic execution.'
    },
    {
      label: 'PARTNERSHIP',
      description: 'Looking for partners who share risk, not vendors who bill hours.'
    },
    {
      label: 'FLEXIBLE',
      description: 'Open to equity, cash, or hybrid—depending on fit.'
    }
  ];

  return (
    <div>
      {/* Criteria Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-4">
        {fitCriteria.map((criterion, index) => (
          <div
            key={index}
            className="p-4 bg-gray-900/50 border border-gray-700 rounded-lg"
          >
            <div className="font-mono text-[10px] text-terminal-gold tracking-widest mb-2">
              {criterion.label}
            </div>
            <p className="text-xs text-gray-300 leading-relaxed">
              {criterion.description}
            </p>
          </div>
        ))}
      </div>

      {/* Inline CTA */}
      <p className="text-xs text-gray-400">
        Not all apply? That's okay.{' '}
        <Link
          href="/contact"
          className="inline-flex items-center gap-1 text-terminal-gold hover:text-terminal-gold-hover font-medium"
        >
          Let's talk fit <ArrowRight className="w-3 h-3" />
        </Link>
      </p>
    </div>
  );
}
