import React from 'react';

interface CriticalGapDiagramProps {
  className?: string;
}

const CriticalGapDiagram: React.FC<CriticalGapDiagramProps> = ({ className = '' }) => {
  const gaps = [
    {
      severity: 'critical',
      title: 'CRITICAL GAP #1: Scoring Engine (Backend)',
      icon: '🚨',
      missingFiles: [
        '/app/services/scoring_service.py (0 bytes - doesn\'t exist)',
        '/app/api/opportunities.py (doesn\'t exist)',
        '/app/models/opportunity.py (doesn\'t exist)',
        'Database: No opportunities table, no timing_signals table'
      ],
      impact: 'Can\'t tell brokers WHO to contact TODAY',
      evidence: 'Grep search result: 0 implementations of scoring logic'
    },
    {
      severity: 'critical',
      title: 'CRITICAL GAP #2: Scoring Dashboard (Frontend)',
      icon: '🚨',
      missingFiles: [
        '/src/pages/OpportunityDashboard.tsx (doesn\'t exist)',
        '/src/components/OpportunityCard.tsx (doesn\'t exist)',
        '/src/components/ScoreBreakdown.tsx (doesn\'t exist)',
        '/src/components/SignalTimeline.tsx (doesn\'t exist)'
      ],
      impact: 'Can\'t display intelligence to users',
      evidence: 'Frontend exists but shows wrong focus (campaigns, not intelligence)'
    },
    {
      severity: 'medium',
      title: 'MEDIUM GAP #3: Frontend-Backend Connection',
      icon: '⚠️',
      missingFiles: [
        '39 direct Supabase calls (bypassing backend API)',
        'No state management (just local useState)',
        '/src/services/api.ts doesn\'t exist'
      ],
      impact: 'Hard to maintain, test, and add features',
      evidence: 'Architectural issue blocking scalability'
    }
  ];

  return (
    <div className={`bg-gray-900/40 backdrop-blur-sm rounded-lg border border-gray-700 p-8 ${className}`}>
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">The Critical Gap</h2>
        <p className="text-lg text-gray-400">Why pilots haven't launched: Missing core intelligence features</p>
      </div>

      {/* Gap Cards */}
      <div className="space-y-6">
        {gaps.map((gap, idx) => (
          <div
            key={idx}
            className={`rounded-lg border-2 p-6 ${
              gap.severity === 'critical'
                ? 'border-red-500/50 bg-red-500/10'
                : 'border-yellow-500/50 bg-yellow-500/10'
            }`}
          >
            {/* Gap Header */}
            <div className="flex items-start mb-4">
              <span className="text-2xl mr-3">{gap.icon}</span>
              <div className="flex-1">
                <h3
                  className={`text-lg font-bold mb-2 ${
                    gap.severity === 'critical' ? 'text-red-400' : 'text-yellow-400'
                  }`}
                >
                  {gap.title}
                </h3>
              </div>
            </div>

            {/* Missing Files Section */}
            <div className="mb-4">
              <h4
                className={`text-sm font-semibold mb-2 ${
                  gap.severity === 'critical' ? 'text-red-300' : 'text-yellow-300'
                }`}
              >
                Missing Files:
              </h4>
              <div className="space-y-2">
                {gap.missingFiles.map((file, fileIdx) => (
                  <div key={fileIdx} className="flex items-start">
                    <span className="text-red-500 mr-2 mt-0.5">✗</span>
                    <span className="font-mono text-sm text-gray-300 flex-1">{file}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Impact Section */}
            <div
              className={`p-4 rounded-lg border ${
                gap.severity === 'critical'
                  ? 'bg-red-500/20 border-red-500/50'
                  : 'bg-yellow-500/20 border-yellow-500/50'
              }`}
            >
              <div className="flex items-start">
                <span className="font-semibold text-sm mr-2 text-white">Impact:</span>
                <span
                  className={`text-sm font-semibold ${
                    gap.severity === 'critical' ? 'text-red-300' : 'text-yellow-300'
                  }`}
                >
                  "{gap.impact}"
                </span>
              </div>
              {gap.evidence && (
                <div className="mt-2 text-xs text-gray-400 italic">{gap.evidence}</div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Summary Footer */}
      <div className="mt-8 pt-6 border-t-2 border-gray-700">
        <div className="grid grid-cols-2 gap-6">
          <div className="text-center p-4 bg-red-500/10 rounded-lg border-2 border-red-500/50">
            <div className="text-2xl font-bold text-red-400">2</div>
            <div className="text-sm text-red-300 mt-1 font-semibold">Critical Gaps</div>
            <div className="text-xs text-red-400 mt-1">Blocking launch</div>
          </div>
          <div className="text-center p-4 bg-yellow-500/10 rounded-lg border-2 border-yellow-500/50">
            <div className="text-2xl font-bold text-yellow-400">1</div>
            <div className="text-sm text-yellow-300 mt-1 font-semibold">Medium Gap</div>
            <div className="text-xs text-yellow-400 mt-1">Technical debt</div>
          </div>
        </div>
        <div className="mt-6 p-4 bg-blue-500/10 rounded-lg border-l-4 border-blue-500">
          <div className="flex items-center">
            <svg className="w-5 h-5 text-blue-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <p className="text-blue-300 font-semibold">
              Estimated Fix: 12-14 weeks of focused development work
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CriticalGapDiagram;
