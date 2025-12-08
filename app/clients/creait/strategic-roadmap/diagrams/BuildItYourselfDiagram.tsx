import React, { useState } from 'react';

interface BuildItYourselfDiagramProps {
  className?: string;
}

const BuildItYourselfDiagram: React.FC<BuildItYourselfDiagramProps> = ({ className = '' }) => {
  const [expandedPhase, setExpandedPhase] = useState<number | null>(0);

  const phases = [
    {
      title: 'Scoring Engine (Backend)',
      weeks: 'WEEK 1-4',
      color: 'indigo',
      sections: [
        {
          heading: 'Files to Create:',
          items: [
            '/app/services/scoring_service.py',
            '/app/api/opportunities.py',
            '/app/models/opportunity.py',
            '/supabase/migrations/020_opportunities.sql'
          ],
          type: 'file'
        },
        {
          heading: 'Key Functions to Implement:',
          items: [
            'calculate_opportunity_score(property_id) - Returns: 0-100 score + explanation',
            'get_prioritized_opportunities(user_id) - Returns: Sorted list of top opportunities',
            'explain_score(opportunity_id) - Returns: "Why now?" breakdown'
          ],
          type: 'function'
        },
        {
          heading: 'Database Tables:',
          items: [
            'opportunities (id, total_score, why_now, etc)',
            'timing_signals (lease_expiry, debt_maturity)'
          ],
          type: 'database'
        },
        {
          heading: 'API Endpoints:',
          items: [
            'GET /api/opportunities',
            'GET /api/opportunities/{id}',
            'GET /api/opportunities/{id}/score'
          ],
          type: 'api'
        }
      ]
    },
    {
      title: 'Scoring Dashboard (Frontend)',
      weeks: 'WEEK 5-8',
      color: 'blue',
      sections: [
        {
          heading: 'Files to Create:',
          items: [
            '/src/pages/OpportunityDashboard.tsx',
            '/src/components/OpportunityCard.tsx',
            '/src/components/ScoreBreakdown.tsx',
            '/src/services/api.ts (API client layer)'
          ],
          type: 'file'
        },
        {
          heading: 'Key Components to Implement:',
          items: [
            'OpportunityDashboard - Daily prioritized list (sortable, filterable)',
            'OpportunityCard - Shows: Score (0-100), "Why now?", Next action',
            'ScoreBreakdown - Visual: Timing 40% + Relationship 30% + Market 30% = Total score'
          ],
          type: 'component'
        },
        {
          heading: 'Architectural Fix:',
          items: [
            'Replace 39 direct Supabase calls',
            'Use API client layer instead',
            'Add React Query for caching'
          ],
          type: 'architecture'
        }
      ]
    },
    {
      title: 'Data Pipeline (Automation)',
      weeks: 'WEEK 9-12',
      color: 'purple',
      sections: [
        {
          heading: 'Files to Create:',
          items: [
            '/app/services/signal_detection_service.py',
            '/app/tasks/scoring_tasks.py (Celery)'
          ],
          type: 'file'
        },
        {
          heading: 'External Data Integrations:',
          items: [
            'Public records (county assessor data)',
            'Market data (optional: MLS $500-2000/mo)',
            'News/events (web scraping)'
          ],
          type: 'integration'
        },
        {
          heading: 'Automation Tasks:',
          items: [
            'Daily scoring refresh (6am cron) - Recalculate all opportunity scores',
            'Signal detection (hourly) - Check for new lease expiries, ownership changes',
            'Data quality monitoring - Alert if data sources fail or scores stale'
          ],
          type: 'automation'
        }
      ]
    },
    {
      title: 'Polish + Pilot Launch',
      weeks: 'WEEK 13-14',
      color: 'emerald',
      sections: [
        {
          heading: 'Launch Checklist:',
          items: [
            'Bug fixes and performance tuning',
            'User testing with 3-5 real brokers',
            'Documentation (user guide + API docs)',
            'Training materials (video walkthrough)',
            'Pilot customer onboarding'
          ],
          type: 'checklist'
        }
      ]
    }
  ];

  const colorMap = {
    indigo: {
      bg: 'bg-indigo-50',
      border: 'border-indigo-500',
      text: 'text-indigo-900',
      badge: 'bg-indigo-600',
      hover: 'hover:bg-indigo-100',
      icon: 'text-indigo-500'
    },
    blue: {
      bg: 'bg-blue-50',
      border: 'border-blue-500',
      text: 'text-blue-900',
      badge: 'bg-blue-600',
      hover: 'hover:bg-blue-100',
      icon: 'text-blue-500'
    },
    purple: {
      bg: 'bg-purple-50',
      border: 'border-purple-500',
      text: 'text-purple-900',
      badge: 'bg-purple-600',
      hover: 'hover:bg-purple-100',
      icon: 'text-purple-500'
    },
    emerald: {
      bg: 'bg-emerald-50',
      border: 'border-emerald-500',
      text: 'text-emerald-900',
      badge: 'bg-emerald-600',
      hover: 'hover:bg-emerald-100',
      icon: 'text-emerald-500'
    }
  };

  const typeIcons = {
    file: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    function: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    database: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
      </svg>
    ),
    api: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    component: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ),
    architecture: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
    integration: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    automation: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    checklist: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    )
  };

  return (
    <div className={`bg-white rounded-lg shadow-lg p-8 ${className}`}>
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Build It Yourself Roadmap</h2>
        <p className="text-lg text-gray-600">Complete DIY implementation plan (12-14 weeks)</p>
      </div>

      {/* Phase Accordion */}
      <div className="space-y-4">
        {phases.map((phase, idx) => {
          const colors = colorMap[phase.color as keyof typeof colorMap];
          const isExpanded = expandedPhase === idx;

          return (
            <div key={idx} className={`border-2 rounded-lg overflow-hidden ${colors.border}`}>
              {/* Phase Header (Clickable) */}
              <button
                onClick={() => setExpandedPhase(isExpanded ? null : idx)}
                className={`w-full text-left p-4 ${colors.bg} ${colors.hover} transition-colors flex items-center justify-between`}
              >
                <div className="flex items-center flex-1">
                  <div className={`w-10 h-10 rounded ${colors.badge} text-white flex items-center justify-center font-bold mr-4`}>
                    {idx + 1}
                  </div>
                  <div>
                    <h3 className={`text-lg font-bold ${colors.text}`}>{phase.title}</h3>
                    <p className="text-sm text-gray-600 font-semibold mt-1">{phase.weeks}</p>
                  </div>
                </div>
                <svg
                  className={`w-6 h-6 ${colors.text} transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Phase Content (Expandable) */}
              {isExpanded && (
                <div className="p-6 bg-white border-t-2 border-gray-200">
                  <div className="space-y-6">
                    {phase.sections.map((section, sectionIdx) => (
                      <div key={sectionIdx}>
                        <div className="flex items-center mb-3">
                          <div className={colors.icon}>
                            {typeIcons[section.type as keyof typeof typeIcons]}
                          </div>
                          <h4 className="ml-2 font-semibold text-gray-900">{section.heading}</h4>
                        </div>
                        <div className={`${colors.bg} rounded p-4 space-y-2`}>
                          {section.items.map((item, itemIdx) => (
                            <div key={itemIdx} className="flex items-start">
                              <input
                                type="checkbox"
                                className="mt-1 mr-3 h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                              />
                              <span className="text-sm text-gray-700 font-mono flex-1">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Launch Ready Banner */}
      <div className="mt-8 bg-gradient-to-r from-emerald-500 to-blue-600 rounded-lg p-6 text-white">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="ml-4">
            <h3 className="text-2xl font-bold mb-1">LAUNCH READY</h3>
            <p className="text-blue-100">
              After completing all phases, you'll have a production-ready intelligence platform
              capable of identifying and prioritizing opportunities for commercial real estate brokers.
            </p>
          </div>
        </div>
      </div>

      {/* Implementation Tips */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
          <h4 className="font-semibold text-blue-900 mb-2">Pro Tip: Sequential Build</h4>
          <p className="text-sm text-blue-800">
            Complete backend (Weeks 1-4) before starting frontend. This ensures you have working APIs to integrate with.
          </p>
        </div>
        <div className="bg-purple-50 border-l-4 border-purple-500 p-4 rounded">
          <h4 className="font-semibold text-purple-900 mb-2">Pro Tip: Test Early</h4>
          <p className="text-sm text-purple-800">
            Get user feedback during Week 8. Real broker input will shape the final polish phase (Weeks 13-14).
          </p>
        </div>
      </div>

      {/* Resources Section */}
      <div className="mt-8 pt-6 border-t-2 border-gray-200">
        <h3 className="font-bold text-gray-900 mb-4">Recommended Resources</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="bg-gray-50 p-4 rounded">
            <h4 className="font-semibold text-gray-900 mb-2">Backend Stack</h4>
            <ul className="space-y-1 text-gray-700">
              <li>• Flask (already in use)</li>
              <li>• Celery + Redis (already set up)</li>
              <li>• PostgreSQL (Supabase)</li>
            </ul>
          </div>
          <div className="bg-gray-50 p-4 rounded">
            <h4 className="font-semibold text-gray-900 mb-2">Frontend Stack</h4>
            <ul className="space-y-1 text-gray-700">
              <li>• React + TypeScript</li>
              <li>• React Query (state mgmt)</li>
              <li>• Recharts (score viz)</li>
            </ul>
          </div>
          <div className="bg-gray-50 p-4 rounded">
            <h4 className="font-semibold text-gray-900 mb-2">Data Sources</h4>
            <ul className="space-y-1 text-gray-700">
              <li>• Public records (free)</li>
              <li>• Web scraping (free)</li>
              <li>• MLS data (optional, $500-2K/mo)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuildItYourselfDiagram;
