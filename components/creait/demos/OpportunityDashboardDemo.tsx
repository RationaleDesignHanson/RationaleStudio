'use client';

import { useState } from 'react';
import { CRE_COLORS } from '@/lib/creait/design-tokens/colors';
import { H3, BodyMD, LabelSM, DataMD } from '@/components/creait/typography';

interface Opportunity {
  id: string;
  propertyName: string;
  propertyType: string;
  owner: string;
  city: string;
  score: number;
  timingSignals: string[];
  lastContact: string;
}

const MOCK_OPPORTUNITIES: Opportunity[] = [
  {
    id: '1',
    propertyName: 'Gateway Office Tower',
    propertyType: 'Office',
    owner: 'Pacific Real Estate Group',
    city: 'San Francisco',
    score: 92,
    timingSignals: ['Lease Expiry', 'Debt Maturity'],
    lastContact: '3 days ago',
  },
  {
    id: '2',
    propertyName: 'Westfield Shopping Center',
    propertyType: 'Retail',
    owner: 'Westfield Corp',
    city: 'San Jose',
    score: 85,
    timingSignals: ['Ownership Change'],
    lastContact: '1 week ago',
  },
  {
    id: '3',
    propertyName: 'Bay View Apartments',
    propertyType: 'Multifamily',
    owner: 'Hamilton Properties LLC',
    city: 'Oakland',
    score: 78,
    timingSignals: ['Market Event', 'Lease Expiry'],
    lastContact: '2 weeks ago',
  },
  {
    id: '4',
    propertyName: 'Tech Park Industrial',
    propertyType: 'Industrial',
    owner: 'Prologis',
    city: 'Fremont',
    score: 71,
    timingSignals: ['Relationship'],
    lastContact: '1 month ago',
  },
  {
    id: '5',
    propertyName: 'Downtown Retail Complex',
    propertyType: 'Retail',
    owner: 'Simon Property Group',
    city: 'Palo Alto',
    score: 65,
    timingSignals: ['Debt Maturity'],
    lastContact: '2 months ago',
  },
  {
    id: '6',
    propertyName: 'Mission Bay Office',
    propertyType: 'Office',
    owner: 'Alexandria Real Estate',
    city: 'San Francisco',
    score: 58,
    timingSignals: ['Market Event'],
    lastContact: '3 months ago',
  },
];

const SIGNAL_COLORS: Record<string, string> = {
  'Lease Expiry': CRE_COLORS.signal.lease_expiry,
  'Debt Maturity': CRE_COLORS.signal.debt_maturity,
  'Ownership Change': CRE_COLORS.signal.ownership_change,
  'Market Event': CRE_COLORS.signal.market_event,
  'Relationship': CRE_COLORS.signal.relationship,
};

function getScoreColor(score: number): string {
  if (score >= 80) return CRE_COLORS.score.critical;
  if (score >= 60) return CRE_COLORS.score.high;
  if (score >= 40) return CRE_COLORS.score.medium;
  if (score >= 20) return CRE_COLORS.score.low;
  return CRE_COLORS.score.minimal;
}

function getScoreLabel(score: number): string {
  if (score >= 80) return 'Hot';
  if (score >= 60) return 'High Priority';
  if (score >= 40) return 'Medium';
  if (score >= 20) return 'Low Priority';
  return 'Watch';
}

/**
 * OpportunityDashboardDemo - Interactive table of opportunities
 *
 * Shows CREaiT's daily prioritization dashboard with:
 * - AI-generated scores (0-100)
 * - Timing signals
 * - Property/owner details
 * - Action buttons
 */
export default function OpportunityDashboardDemo() {
  const [sortBy, setSortBy] = useState<'score' | 'lastContact'>('score');
  const [filterScore, setFilterScore] = useState<'all' | 'hot' | 'high'>('all');

  // Filter opportunities
  let filtered = MOCK_OPPORTUNITIES;
  if (filterScore === 'hot') {
    filtered = filtered.filter((opp) => opp.score >= 80);
  } else if (filterScore === 'high') {
    filtered = filtered.filter((opp) => opp.score >= 60);
  }

  // Sort opportunities
  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'score') {
      return b.score - a.score;
    }
    // For lastContact, we'd need proper date parsing, but for demo just keep order
    return 0;
  });

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
        <div className="flex items-center gap-4">
          <LabelSM color={CRE_COLORS.text.muted}>SORT BY:</LabelSM>
          <div className="flex gap-2">
            <button
              onClick={() => setSortBy('score')}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                sortBy === 'score'
                  ? 'bg-sky-500 text-white'
                  : 'bg-white/10 text-white/60 hover:bg-white/15'
              }`}
            >
              Score
            </button>
            <button
              onClick={() => setSortBy('lastContact')}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                sortBy === 'lastContact'
                  ? 'bg-sky-500 text-white'
                  : 'bg-white/10 text-white/60 hover:bg-white/15'
              }`}
            >
              Last Contact
            </button>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <LabelSM color={CRE_COLORS.text.muted}>FILTER:</LabelSM>
          <div className="flex gap-2">
            <button
              onClick={() => setFilterScore('all')}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                filterScore === 'all'
                  ? 'bg-sky-500 text-white'
                  : 'bg-white/10 text-white/60 hover:bg-white/15'
              }`}
            >
              All ({MOCK_OPPORTUNITIES.length})
            </button>
            <button
              onClick={() => setFilterScore('hot')}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                filterScore === 'hot'
                  ? 'bg-red-500 text-white'
                  : 'bg-white/10 text-white/60 hover:bg-white/15'
              }`}
            >
              Hot (2)
            </button>
            <button
              onClick={() => setFilterScore('high')}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                filterScore === 'high'
                  ? 'bg-orange-500 text-white'
                  : 'bg-white/10 text-white/60 hover:bg-white/15'
              }`}
            >
              High (4)
            </button>
          </div>
        </div>
      </div>

      {/* Opportunities Table */}
      <div className="space-y-3">
        {sorted.map((opp) => (
          <div
            key={opp.id}
            className="p-4 rounded-xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-white/10 hover:border-white/20 transition-all hover:shadow-lg"
          >
            <div className="flex items-start justify-between gap-4">
              {/* Left: Score + Property Info */}
              <div className="flex items-start gap-4 flex-1">
                {/* Score Badge */}
                <div
                  className="flex-shrink-0 w-16 h-16 rounded-xl flex flex-col items-center justify-center"
                  style={{
                    backgroundColor: `${getScoreColor(opp.score)}20`,
                    borderLeft: `4px solid ${getScoreColor(opp.score)}`,
                  }}
                >
                  <DataMD style={{ color: getScoreColor(opp.score) }}>{opp.score}</DataMD>
                  <LabelSM
                    className="text-xs"
                    style={{ color: getScoreColor(opp.score) }}
                  >
                    {getScoreLabel(opp.score)}
                  </LabelSM>
                </div>

                {/* Property Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start gap-3 mb-2">
                    <div className="flex-1">
                      <H3 className="text-lg mb-1">{opp.propertyName}</H3>
                      <div className="flex items-center gap-3 flex-wrap">
                        <LabelSM color={CRE_COLORS.text.muted}>
                          {opp.propertyType}
                        </LabelSM>
                        <span className="text-white/20">•</span>
                        <LabelSM color={CRE_COLORS.text.muted}>{opp.city}</LabelSM>
                      </div>
                    </div>
                  </div>

                  <BodyMD color={CRE_COLORS.text.secondary} className="mb-3">
                    {opp.owner}
                  </BodyMD>

                  {/* Timing Signals */}
                  <div className="flex items-center gap-2 flex-wrap">
                    {opp.timingSignals.map((signal, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded-full text-xs font-medium"
                        style={{
                          backgroundColor: `${SIGNAL_COLORS[signal]}20`,
                          color: SIGNAL_COLORS[signal],
                        }}
                      >
                        {signal}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right: Actions */}
              <div className="flex flex-col gap-2 flex-shrink-0">
                <button className="px-4 py-2 rounded-lg bg-sky-500 hover:bg-sky-600 text-white text-sm font-medium transition-colors">
                  Draft Email
                </button>
                <button className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/15 text-white text-sm font-medium transition-colors">
                  View Details
                </button>
                <LabelSM color={CRE_COLORS.text.muted} className="text-center mt-1">
                  {opp.lastContact}
                </LabelSM>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Stats Footer */}
      <div className="p-4 rounded-xl bg-white/5 border border-white/10">
        <div className="flex items-center justify-between">
          <BodyMD color={CRE_COLORS.text.secondary}>
            Showing <strong>{sorted.length}</strong> of <strong>{MOCK_OPPORTUNITIES.length}</strong>{' '}
            opportunities
          </BodyMD>
          <BodyMD color={CRE_COLORS.text.muted}>
            Last updated: <strong>5 minutes ago</strong>
          </BodyMD>
        </div>
      </div>
    </div>
  );
}
