import React from 'react';

interface CriticalPathDiagramProps {
  className?: string;
}

const CriticalPathDiagram: React.FC<CriticalPathDiagramProps> = ({ className = '' }) => {
  const phases = [
    {
      number: 1,
      title: 'Scoring Engine',
      weeks: 'Weeks 1-4',
      color: 'indigo',
      sections: [
        {
          subtitle: 'Week 1-2: Algorithm + Database Schema',
          items: [
            'scoring_service.py',
            'opportunities table (PostgreSQL)',
            'timing_signals table'
          ]
        },
        {
          subtitle: 'Week 3-4: API Endpoints + Testing',
          items: [
            '/app/api/opportunities.py',
            'GET /api/opportunities (prioritized list)',
            'GET /api/opportunities/{id}/score (breakdown)'
          ]
        }
      ],
      deliverable: 'Backend returns scored opportunities (0-100)'
    },
    {
      number: 2,
      title: 'Scoring Dashboard',
      weeks: 'Weeks 5-8',
      color: 'blue',
      sections: [
        {
          subtitle: 'Week 5-6: Dashboard UI + Components',
          items: [
            'OpportunityDashboard.tsx (main page)',
            'OpportunityCard.tsx (list item)',
            '/src/services/api.ts (API client)'
          ]
        },
        {
          subtitle: 'Week 7-8: Score Visualization + Integration',
          items: [
            'ScoreBreakdown.tsx (visual score chart)',
            'SignalTimeline.tsx (timing signals)',
            'Fix 39 direct DB calls → use API'
          ]
        }
      ],
      deliverable: 'Users see prioritized opportunities'
    },
    {
      number: 3,
      title: 'Data Pipeline',
      weeks: 'Weeks 9-12',
      color: 'purple',
      sections: [
        {
          subtitle: 'Week 9-10: External Data + Signal Detection',
          items: [
            'signal_detection_service.py',
            'Data connectors (public records, market data)'
          ]
        },
        {
          subtitle: 'Week 11-12: Automation + Quality Monitoring',
          items: [
            'scoring_tasks.py (Celery tasks)',
            'Daily scoring refresh (6am cron)'
          ]
        }
      ],
      deliverable: 'Automated intelligence updates'
    }
  ];

  const colorMap = {
    indigo: {
      bg: 'bg-indigo-500/10',
      border: 'border-indigo-500/50',
      text: 'text-indigo-400',
      badge: 'bg-indigo-500',
      light: 'bg-indigo-500/20',
      deliverable: 'bg-indigo-500/30'
    },
    blue: {
      bg: 'bg-blue-500/10',
      border: 'border-blue-500/50',
      text: 'text-blue-400',
      badge: 'bg-blue-500',
      light: 'bg-blue-500/20',
      deliverable: 'bg-blue-500/30'
    },
    purple: {
      bg: 'bg-purple-500/10',
      border: 'border-purple-500/50',
      text: 'text-purple-400',
      badge: 'bg-purple-500',
      light: 'bg-purple-500/20',
      deliverable: 'bg-purple-500/30'
    }
  };

  return (
    <div className={`bg-gray-900/40 backdrop-blur-sm rounded-lg border border-gray-700 p-8 ${className}`}>
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">The Critical Path</h2>
        <p className="text-lg text-gray-400">20% of work that delivers 80% of value</p>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Progress Bar Background */}
        <div className="absolute left-12 top-0 bottom-0 w-1 bg-gray-700"></div>

        {/* Phases */}
        <div className="space-y-8">
          {phases.map((phase, idx) => {
            const colors = colorMap[phase.color as keyof typeof colorMap];
            return (
              <div key={idx} className="relative pl-24">
                {/* Phase Number Circle */}
                <div
                  className={`absolute left-8 w-9 h-9 rounded-full ${colors.badge} text-white flex items-center justify-center font-bold text-lg z-10`}
                >
                  {phase.number}
                </div>

                {/* Phase Card */}
                <div className={`rounded-lg border-2 ${colors.border} ${colors.bg} p-6`}>
                  {/* Phase Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className={`text-xl font-bold ${colors.text}`}>{phase.title}</h3>
                      <p className="text-sm text-gray-400 mt-1">{phase.weeks}</p>
                    </div>
                    <div className="flex space-x-1">
                      {[...Array(4)].map((_, i) => (
                        <div key={i} className={`w-16 h-2 ${colors.badge} rounded`}></div>
                      ))}
                    </div>
                  </div>

                  {/* Sections */}
                  <div className="space-y-4">
                    {phase.sections.map((section, sectionIdx) => (
                      <div key={sectionIdx}>
                        <h4 className="text-sm font-semibold text-white mb-2">
                          {section.subtitle}
                        </h4>
                        <div className={`${colors.light} border ${colors.border} rounded p-3 space-y-1`}>
                          {section.items.map((item, itemIdx) => (
                            <div key={itemIdx} className="flex items-start text-sm">
                              <span className="text-[#FFD700] mr-2">•</span>
                              <span className="font-mono text-gray-300">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Deliverable */}
                  <div className={`mt-4 p-3 ${colors.deliverable} border ${colors.border} rounded-lg`}>
                    <div className="flex items-center text-white">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="font-semibold">Deliverable: {phase.deliverable}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Launch Ready Section */}
        <div className="relative pl-24 mt-8">
          <div className="absolute left-8 w-9 h-9 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold z-10">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div className="rounded-lg border-2 border-emerald-500/50 bg-emerald-500/10 p-6">
            <h3 className="text-xl font-bold text-emerald-400 mb-2">LAUNCH READY</h3>
            <p className="text-gray-300">Week 13-14: Polish + Pilot Program</p>
          </div>
        </div>
      </div>

      {/* Footer Note */}
      <div className="mt-8 pt-6 border-t-2 border-gray-700">
        <div className="p-4 bg-gray-800/40 rounded-lg border-l-4 border-[#FFD700]">
          <p className="text-white font-semibold">
            Everything else (CRM integration, advanced features) = Month 4+
          </p>
          <p className="text-sm text-gray-400 mt-1">
            Focus on core intelligence platform first, then expand feature set
          </p>
        </div>
      </div>
    </div>
  );
};

export default CriticalPathDiagram;
