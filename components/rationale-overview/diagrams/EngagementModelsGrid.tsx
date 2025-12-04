/**
 * Engagement Models Grid
 * Side-by-side comparison of Sprint vs Pilot engagement models
 * SaaS pricing page-inspired clarity with consulting positioning
 */

'use client';

import { useState } from 'react';

interface EngagementModel {
  id: string;
  name: string;
  tagline: string;
  duration: string;
  investment: string;
  color: string;
  bestFor: string;
  deliverables: string[];
  checkpoints: {
    week: number;
    milestone: string;
  }[];
  outcomes: string[];
  cta: string;
}

export default function EngagementModelsGrid() {
  const [selectedModel, setSelectedModel] = useState<string>('sprint');

  const models: EngagementModel[] = [
    {
      id: 'sprint',
      name: '3-Week Validation Sprint',
      tagline: 'Answer core hypothesis with prototypes',
      duration: '3 weeks',
      investment: '3 weeks',
      color: '#00FF94',
      bestFor: 'Testing a single product hypothesis or UX direction before heavy investment',
      deliverables: [
        '7 interactive prototypes testing core assumptions',
        'User testing results with 15-30 participants',
        'Validated UX direction or clear pivot recommendation',
        'Technical architecture specification',
        'Production roadmap with time/cost estimates'
      ],
      checkpoints: [
        { week: 1, milestone: 'Core hypothesis defined, Prototype 1-2 complete' },
        { week: 2, milestone: 'Prototypes 3-5 tested, go/no-go decision' },
        { week: 3, milestone: 'Architecture locked, production roadmap delivered' }
      ],
      outcomes: [
        'Exit Week 1 if hypothesis is unclear: minimal investment',
        'Exit Week 2 if prototypes fail validation: controlled investment',
        'Proceed to production with validated direction: zero waste'
      ],
      cta: 'Start Validation Sprint'
    },
    {
      id: 'pilot',
      name: '12-Week Build Pilot',
      tagline: 'Ship validated product to real users',
      duration: '12 weeks',
      investment: '12 weeks',
      color: '#FFD700',
      bestFor: 'Building production-ready product after validation, or entire 0→1 journey',
      deliverables: [
        'Week 1-3: Validation Sprint (if not already complete)',
        'Week 4-10: Production development with 0 architectural pivots',
        'Week 11-12: Beta launch with rollout strategy',
        'Complete technical documentation',
        'Go-to-market strategy and financial model',
        '24-week product roadmap'
      ],
      checkpoints: [
        { week: 3, milestone: 'Validation complete (if starting from zero)' },
        { week: 6, milestone: 'Core features in production, architecture reviewed' },
        { week: 9, milestone: 'Beta-ready build, QA complete' },
        { week: 12, milestone: 'Live with users, rollout plan executing' }
      ],
      outcomes: [
        'Production app/platform live with real users',
        'Complete product strategy validated by market',
        'Clear roadmap for next 6 months',
        'Option to continue with ongoing product partnership'
      ],
      cta: 'Start Build Pilot'
    }
  ];

  const selectedModelData = models.find(m => m.id === selectedModel) || models[0];

  return (
    <div className="p-6 sm:p-8 bg-gray-900/50 border border-gray-700 rounded-lg">
      <div className="mb-8">
        <h3 className="text-xl font-bold text-white mb-2">How We Work Together</h3>
        <p className="text-sm text-gray-400">
          Two engagement models: Test fast with Sprint, or go 0→1 with Pilot. Clear checkpoints, low commitment.
        </p>
      </div>

      {/* Model Selector */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {models.map((model) => {
          const isSelected = model.id === selectedModel;
          return (
            <button
              key={model.id}
              onClick={() => setSelectedModel(model.id)}
              className={`p-6 rounded-lg border-2 transition-all text-left ${
                isSelected
                  ? 'bg-gray-800/70'
                  : 'bg-gray-800/30 border-gray-700 hover:border-gray-600'
              }`}
              style={{
                borderColor: isSelected ? model.color : undefined
              }}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="text-lg font-bold text-white mb-1">{model.name}</div>
                  <div className="text-xs text-gray-400">{model.tagline}</div>
                </div>
                {isSelected && (
                  <div className="w-3 h-3 rounded-full animate-pulse" style={{ backgroundColor: model.color }} />
                )}
              </div>
              <div className="flex items-center gap-4 mt-4">
                <div>
                  <div className="text-xs text-gray-500">Duration</div>
                  <div className="text-sm font-semibold text-white">{model.duration}</div>
                </div>
                <div className="w-px h-8 bg-gray-700" />
                <div>
                  <div className="text-xs text-gray-500">Investment</div>
                  <div className="text-sm font-semibold" style={{ color: model.color }}>{model.investment}</div>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Model Detail */}
      <div className="space-y-6">
        {/* Best For */}
        <div className="p-4 bg-gray-800/50 border-l-4 rounded" style={{ borderColor: selectedModelData.color }}>
          <div className="text-xs font-mono text-gray-400 mb-2 uppercase tracking-wide">Best For</div>
          <div className="text-sm text-white leading-relaxed">{selectedModelData.bestFor}</div>
        </div>

        {/* Deliverables */}
        <div>
          <div className="text-sm font-semibold text-white mb-3">What You Get</div>
          <div className="space-y-2">
            {selectedModelData.deliverables.map((deliverable, idx) => (
              <div key={idx} className="flex items-start gap-3 p-3 bg-gray-800/30 rounded">
                <div className="flex-shrink-0 w-5 h-5 rounded flex items-center justify-center text-xs font-bold" style={{ backgroundColor: `${selectedModelData.color}30`, color: selectedModelData.color }}>
                  {idx + 1}
                </div>
                <div className="text-xs text-gray-300 leading-relaxed">{deliverable}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Checkpoints Timeline */}
        <div>
          <div className="text-sm font-semibold text-white mb-3">Clear Checkpoints</div>
          <div className="space-y-3">
            {selectedModelData.checkpoints.map((checkpoint, idx) => (
              <div key={idx} className="relative pl-6">
                {/* Timeline dot */}
                <div className="absolute left-0 top-1.5 w-3 h-3 rounded-full border-2" style={{ borderColor: selectedModelData.color, backgroundColor: 'rgba(0,0,0,0.5)' }} />
                {/* Timeline line */}
                {idx < selectedModelData.checkpoints.length - 1 && (
                  <div className="absolute left-[5px] top-6 w-px h-full bg-gray-700" />
                )}
                <div className="pb-4">
                  <div className="text-xs font-mono text-gray-500 mb-1">Week {checkpoint.week}</div>
                  <div className="text-sm text-white">{checkpoint.milestone}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Outcomes */}
        <div>
          <div className="text-sm font-semibold text-white mb-3">Possible Outcomes</div>
          <div className="space-y-2">
            {selectedModelData.outcomes.map((outcome, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs text-gray-300 leading-relaxed">
                <span style={{ color: selectedModelData.color }}>→</span>
                <span>{outcome}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="pt-6">
          <button
            className="w-full py-3 px-6 rounded-lg font-semibold text-black transition-all hover:opacity-90"
            style={{ backgroundColor: selectedModelData.color }}
          >
            {selectedModelData.cta} →
          </button>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="mt-8 pt-8 border-t border-gray-700">
        <div className="text-sm font-semibold text-white mb-4">Side-by-Side Comparison</div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left text-gray-400 font-medium py-3 px-3"></th>
                <th className="text-center text-[#00FF94] font-medium py-3 px-3">Sprint</th>
                <th className="text-center text-[#FFD700] font-medium py-3 px-3">Pilot</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              <tr>
                <td className="py-3 px-3 text-gray-400">Duration</td>
                <td className="py-3 px-3 text-center text-white">3 weeks</td>
                <td className="py-3 px-3 text-center text-white">12 weeks</td>
              </tr>
              <tr>
                <td className="py-3 px-3 text-gray-400">Time Investment</td>
                <td className="py-3 px-3 text-center text-white">3 weeks</td>
                <td className="py-3 px-3 text-center text-white">12 weeks</td>
              </tr>
              <tr>
                <td className="py-3 px-3 text-gray-400">Prototypes</td>
                <td className="py-3 px-3 text-center text-white">7 prototypes</td>
                <td className="py-3 px-3 text-center text-white">7 prototypes + production</td>
              </tr>
              <tr>
                <td className="py-3 px-3 text-gray-400">End Result</td>
                <td className="py-3 px-3 text-center text-white">Validated direction</td>
                <td className="py-3 px-3 text-center text-white">Live product</td>
              </tr>
              <tr>
                <td className="py-3 px-3 text-gray-400">Exit Points</td>
                <td className="py-3 px-3 text-center text-white">Week 1, Week 2</td>
                <td className="py-3 px-3 text-center text-white">Week 3, Week 6, Week 9</td>
              </tr>
              <tr>
                <td className="py-3 px-3 text-gray-400">Best For</td>
                <td className="py-3 px-3 text-center text-white">Testing hypothesis</td>
                <td className="py-3 px-3 text-center text-white">Building product</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Key Insight */}
      <div className="mt-8 p-4 bg-gray-800/50 border border-gray-700 rounded-lg">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#FFD700]/20 flex items-center justify-center">
            <span className="text-[#FFD700] text-sm">💡</span>
          </div>
          <div>
            <div className="text-sm font-semibold text-white mb-1">Why This De-Risks Your Investment</div>
            <div className="text-xs text-gray-400 leading-relaxed">
              Traditional agencies ask for 6-month commitments before validation. Rationale works in clear checkpoints with exit ramps. Start with 3-week Sprint to test hypothesis. If validated, extend to 12-week Pilot. If not, exit after Week 2 with minimal investment instead of sinking months of work.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
