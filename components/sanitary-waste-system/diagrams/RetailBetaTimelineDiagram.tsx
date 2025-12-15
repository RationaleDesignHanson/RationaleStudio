/**
 * Retail Beta Timeline Diagram
 * Milestone-based product development roadmap
 * Mobile-responsive with adaptive layouts
 */

'use client';

export default function RetailBetaTimelineDiagram() {
  const phases = [
    {
      name: 'Phase 1',
      timeline: 'Weeks 1-4',
      milestone: 'Frankenstein Prototypes + Mustard Test',
      deliverables: [
        'Hand-assembled prototypes',
        'Mustard test validation',
        'Liner dimension optimization',
        '3D-printed dispenser mockup'
      ],
      color: 'border-blue-500/50'
    },
    {
      name: 'Phase 2',
      timeline: 'Weeks 5-12',
      milestone: '5K-10K Pilot + Retail Beta + Provisional Patent',
      deliverables: [
        'Contract manufacturer pilot run',
        '25-50 boutique retail beta',
        'Provisional patent filing',
        'Customer feedback collection'
      ],
      color: 'border-purple-500/50'
    },
    {
      name: 'Phase 3',
      timeline: 'Months 4-9',
      milestone: 'Automated Production + Certification + Scale',
      deliverables: [
        'Automated interfold line',
        'Compostability certification',
        'Retail expansion',
        'DTC subscription launch'
      ],
      color: 'border-green-500/50'
    }
  ];

  return (
    <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-4 sm:p-6 lg:p-8">
      <h3 className="text-xl sm:text-2xl font-bold text-center mb-6 sm:mb-8">Product Development Roadmap</h3>

      <div className="space-y-4 sm:space-y-6">
        {phases.map((phase, index) => (
          <div key={index} className={`bg-gray-800/50 border-2 ${phase.color} rounded-lg p-4 sm:p-6`}>
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 sm:gap-4 mb-3 sm:mb-4">
              <div>
                <h4 className="font-bold text-white text-base sm:text-lg mb-1">{phase.name}</h4>
                <p className="text-xs sm:text-sm text-gray-400">{phase.timeline}</p>
              </div>
              <div className="text-left md:text-right">
                <div className="inline-flex items-center px-2 sm:px-3 py-1 rounded-full bg-gray-900/50 border border-gray-700">
                  <span className="text-xs sm:text-sm font-medium text-white">{phase.milestone}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-3">
              {phase.deliverables.map((deliverable, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-xs sm:text-sm text-gray-300">{deliverable}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-800">
        <div className="flex flex-wrap gap-3 sm:gap-4 justify-center text-xs sm:text-sm text-gray-400">
          <div className="flex items-center gap-2">
            <div className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-blue-500"></div>
            <span>Validation</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-purple-500"></div>
            <span>Beta Testing</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-green-500"></div>
            <span>Scale</span>
          </div>
        </div>
      </div>
    </div>
  );
}
