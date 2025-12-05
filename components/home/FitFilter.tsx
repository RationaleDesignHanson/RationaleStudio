/**
 * Fit Filter Component
 *
 * Softened, aspirational language for self-qualification
 * Two CTAs: Primary "Let's talk fit" + Secondary "Browse work"
 */

import Link from 'next/link';
import { Check } from 'lucide-react';
import { GlassCard } from '@/components/visual';

export function FitFilter() {
  const fitCriteria = [
    {
      title: 'Hands-on builders',
      description: 'Not just managers—founders who ship and understand the work'
    },
    {
      title: 'Need execution velocity',
      description: 'Have conviction but need speed and systematic execution'
    },
    {
      title: 'Value partnership',
      description: 'Looking for partners who share risk, not vendors who bill hours'
    },
    {
      title: 'Open to equity discussions',
      description: 'Exploring equity structures (cash engagements welcome too)'
    }
  ];

  return (
    <GlassCard className="p-8" borderRadius="0.75rem">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
          What Makes a Great Fit
        </h2>
        <p className="text-base text-gray-400 max-w-2xl mx-auto">
          We love working with founders who share these values. Not all apply? That's okay—let's talk.
        </p>
      </div>

      {/* Criteria Grid */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {fitCriteria.map((criterion, index) => (
          <div key={index} className="flex gap-4">
            {/* Checkmark */}
            <div className="flex-shrink-0">
              <Check className="w-5 h-5 text-accent mt-0.5" />
            </div>

            {/* Content */}
            <div>
              <h3 className="text-base font-bold text-white mb-1">
                {criterion.title}
              </h3>
              <p className="text-sm text-gray-400">
                {criterion.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* CTAs */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6 border-t border-gray-800">
        <Link
          href="/contact"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-accent text-accent-foreground font-medium hover:bg-accent/90 transition-colors"
        >
          Let's talk fit
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>

        <Link
          href="/work"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-gray-700 bg-gray-900/50 text-white font-medium hover:bg-gray-900/80 transition-colors"
        >
          Not sure? Browse our work
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
        </Link>
      </div>

      {/* Note about equity/cash */}
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-400">
          <span className="font-medium text-white">Equity or cash?</span> Both structures available.
          We prefer equity when the fit is right, but all engagements can be cash-based.
        </p>
      </div>
    </GlassCard>
  );
}
