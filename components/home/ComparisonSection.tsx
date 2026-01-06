/**
 * Comparison Section Component
 *
 * "Why This, Not That" comparison showing Rationale vs alternatives.
 */

import Link from 'next/link';
import { ArrowRight } from '@/lib/icons';

export function ComparisonSection() {
  return (
    <section className="relative py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-800">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/20 to-transparent" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
            Why This, Not That
          </h2>
        </div>

        {/* Desktop: Three columns */}
        <div className="hidden md:grid md:grid-cols-3 gap-4 lg:gap-6">
          <ComparisonCard
            title="HIRE A TECHNICAL CO-FOUNDER"
            items={[
              '6+ months to find the right person',
              '15-25% equity for an unknown',
              "Relationship risk if it doesn't work",
              'Still need to manage the build',
            ]}
            highlight={false}
          />
          <ComparisonCard
            title="HIRE AN AGENCY"
            items={[
              'No skin in the game',
              'Optimizes for billable hours',
              'Hands off after delivery',
              "You're still the product person",
            ]}
            highlight={false}
          />
          <ComparisonCard
            title="WORK WITH RATIONALE"
            items={[
              'Start in weeks, not months',
              'Aligned incentives from day one',
              'Discipline forged shipping new categories at billion-user scale',
              'We stay involved through launch and beyond',
            ]}
            highlight={true}
          />
        </div>

        {/* Mobile: Stack vertically */}
        <div className="md:hidden space-y-6">
          <ComparisonCard
            title="HIRE A TECHNICAL CO-FOUNDER"
            items={[
              '6+ months to find the right person',
              '15-25% equity for an unknown',
              "Relationship risk if it doesn't work",
              'Still need to manage the build',
            ]}
            highlight={false}
          />
          <ComparisonCard
            title="HIRE AN AGENCY"
            items={[
              'No skin in the game',
              'Optimizes for billable hours',
              'Hands off after delivery',
              "You're still the product person",
            ]}
            highlight={false}
          />
          <ComparisonCard
            title="WORK WITH RATIONALE"
            items={[
              'Start in weeks, not months',
              'Aligned incentives from day one',
              'Discipline forged shipping new categories at billion-user scale',
              'We stay involved through launch and beyond',
            ]}
            highlight={true}
          />
        </div>

        {/* Structure note */}
        <p className="mt-8 text-center text-sm md:text-base text-gray-400">
          Flexible structures: cash, equity, or hybrid—depending on fit. Details on a call.
        </p>
      </div>
    </section>
  );
}

function ComparisonCard({
  title,
  items,
  highlight,
}: {
  title: string;
  items: string[];
  highlight: boolean;
}) {
  return (
    <div
      className={`p-6 md:p-8 rounded-lg border-2 ${
        highlight
          ? 'border-terminal-gold bg-terminal-gold/5'
          : 'border-gray-700 bg-gray-900/50'
      }`}
    >
      <h3
        className={`text-lg md:text-xl font-bold mb-4 md:mb-6 ${
          highlight ? 'text-terminal-gold' : 'text-white'
        }`}
      >
        {title}
      </h3>
      <ul className="space-y-3">
        {items.map((item, index) => (
          <li
            key={index}
            className="text-sm md:text-base text-gray-300 flex items-start gap-2"
          >
            <span className="text-gray-500 mt-1">•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

