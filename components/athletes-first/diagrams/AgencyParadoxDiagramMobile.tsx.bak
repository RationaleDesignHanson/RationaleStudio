'use client';

/**
 * Mobile-optimized Agency Paradox Diagram
 *
 * Simplified stacked visualization showing current pain points vs. breakthrough solution
 * No canvas animations - pure HTML/CSS for better mobile performance
 */
export default function AgencyParadoxDiagramMobile() {
  return (
    <div className="space-y-8 py-6">
      {/* Current State - Problem */}
      <div className="bg-red-900/20 border-2 border-red-500/50 rounded-lg p-6">
        <div className="text-center mb-4">
          <div className="text-5xl mb-2" aria-hidden="true">
            ⚠️
          </div>
          <h3 className="text-2xl font-bold text-red-400">Current State</h3>
          <p className="text-sm text-gray-400">The Agency Paradox</p>
        </div>

        <ul className="space-y-3">
          {[
            'Manual outreach takes 40+ hours per deal',
            'Generic pitch decks fail to convert (25% close rate)',
            'No data on athlete brand fit or market rates',
            'Agencies hit revenue ceiling at $2-3M',
            '800 agents competing for 250 draft spots annually',
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="text-red-500 text-lg mt-0.5 flex-shrink-0" aria-hidden="true">
                ✗
              </span>
              <span className="text-base text-gray-200">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Arrow */}
      <div className="text-center">
        <div className="text-4xl text-terminal-gold" aria-hidden="true">
          ↓
        </div>
        <p className="text-sm text-terminal-gold font-semibold mt-2 uppercase tracking-wide">
          The Breakthrough
        </p>
      </div>

      {/* Breakthrough State - Solution */}
      <div className="bg-terminal-gold/20 border-2 border-terminal-gold/50 rounded-lg p-6">
        <div className="text-center mb-4">
          <div className="text-5xl mb-2" aria-hidden="true">
            ✨
          </div>
          <h3 className="text-2xl font-bold text-terminal-gold">New Reality</h3>
          <p className="text-sm text-gray-400">AI-Powered NIL Platform</p>
        </div>

        <ul className="space-y-3">
          {[
            'Automated athlete discovery and matching (AI-powered)',
            'Immersive Vision Pro pitch experiences (65% close rate)',
            'AI-powered deal recommendations with market data',
            'Scale to $10M+ revenue with same team size',
            'Video Twins enable infinite content from one session',
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="text-terminal-gold text-lg mt-0.5 flex-shrink-0" aria-hidden="true">
                ✓
              </span>
              <span className="text-base text-gray-200">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Key Metric */}
      <div className="bg-gray-900/70 border border-gray-700 rounded-lg p-6 text-center">
        <div className="text-4xl font-bold text-terminal-gold mb-2">
          3-5x
        </div>
        <div className="text-sm text-gray-400">
          Revenue Growth Potential
        </div>
        <div className="text-xs text-gray-500 mt-1">
          $2-3M → $10M+ with same team
        </div>
      </div>
    </div>
  );
}
