'use client';

import { StepByStepDiagram, type Step } from '@/components/diagrams/StepByStepDiagram';

/**
 * Mobile-optimized AIScoreFlowDiagram
 * Shows 3-stage AI scoring process as step-by-step wizard
 */
export default function AIScoreFlowDiagramMobile() {
  const steps: Step[] = [
    {
      id: 'data-sources',
      title: 'Step 1: Data Sources',
      description: 'AI ingests multiple data streams to identify timing signals across the portfolio.',
      visual: (
        <div className="space-y-3">
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="text-2xl">📁</div>
              <h5 className="text-blue-400 font-bold text-sm">Property Records</h5>
            </div>
            <ul className="space-y-1 text-xs text-gray-400">
              <li>• Lease expiration dates</li>
              <li>• Ownership history & transfers</li>
              <li>• Property tax assessments</li>
              <li>• Zoning and permits</li>
            </ul>
          </div>

          <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="text-2xl">💰</div>
              <h5 className="text-purple-400 font-bold text-sm">Financing Data</h5>
            </div>
            <ul className="space-y-1 text-xs text-gray-400">
              <li>• Mortgage maturity schedules</li>
              <li>• Debt service coverage ratios</li>
              <li>• Refinancing windows</li>
              <li>• Interest rate sensitivity</li>
            </ul>
          </div>

          <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="text-2xl">📈</div>
              <h5 className="text-cyan-400 font-bold text-sm">Market Trends</h5>
            </div>
            <ul className="space-y-1 text-xs text-gray-400">
              <li>• Cap rate movements by submarket</li>
              <li>• Comparable sales velocity</li>
              <li>• Vacancy rates & absorption</li>
              <li>• Rental growth trajectories</li>
            </ul>
          </div>
        </div>
      ),
      metrics: [
        { label: 'Sources', value: '3 streams' },
        { label: 'Properties', value: '5,000+' },
      ],
    },
    {
      id: 'ai-processing',
      title: 'Step 2: AI Processing',
      description: 'Neural network analyzes timing signals and predicts optimal outreach windows.',
      visual: (
        <div className="space-y-4">
          <div className="bg-green-500/10 border-2 border-green-500/50 rounded-lg p-4">
            <div className="text-center mb-3">
              <div className="text-4xl mb-2">🧠</div>
              <h5 className="text-green-400 font-bold text-sm">AI Scoring Engine</h5>
            </div>
            <div className="space-y-2 text-xs text-gray-300">
              <div className="bg-gray-800/50 rounded p-2">
                <strong className="text-green-400">Pattern Recognition:</strong> Identifies 12+ timing signals per property
              </div>
              <div className="bg-gray-800/50 rounded p-2">
                <strong className="text-green-400">Predictive Models:</strong> Forecasts likelihood of sale within 18 months
              </div>
              <div className="bg-gray-800/50 rounded p-2">
                <strong className="text-green-400">Broker Context:</strong> Factors in your past relationships and success rates
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className="bg-blue-500/10 border border-blue-500/30 rounded p-2">
              <div className="text-blue-400 font-bold font-mono">92%</div>
              <div className="text-gray-500">Accuracy</div>
            </div>
            <div className="bg-purple-500/10 border border-purple-500/30 rounded p-2">
              <div className="text-purple-400 font-bold font-mono">&lt;1s</div>
              <div className="text-gray-500">Per Property</div>
            </div>
            <div className="bg-cyan-500/10 border border-cyan-500/30 rounded p-2">
              <div className="text-cyan-400 font-bold font-mono">0-100</div>
              <div className="text-gray-500">Score Range</div>
            </div>
          </div>
        </div>
      ),
      metrics: [
        { label: 'Processing', value: '<1 sec' },
        { label: 'Accuracy', value: '92%' },
      ],
    },
    {
      id: 'scored-output',
      title: 'Step 3: Scored Output',
      description: 'Properties ranked 0-100 by sale likelihood, with actionable insights.',
      visual: (
        <div className="space-y-3">
          <div className="bg-gradient-to-r from-green-500/20 to-green-500/5 border-2 border-green-500/50 rounded-lg p-3">
            <div className="flex justify-between items-center mb-1">
              <span className="text-green-400 font-bold text-sm">123 Main St</span>
              <span className="text-green-400 font-bold text-2xl font-mono">92</span>
            </div>
            <p className="text-xs text-gray-400">Lease expires in 6 months, cap rate 200bps below market</p>
            <div className="mt-2 flex gap-2">
              <span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded">High Priority</span>
              <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded">Known Owner</span>
            </div>
          </div>

          <div className="bg-gradient-to-r from-yellow-500/20 to-yellow-500/5 border border-yellow-500/40 rounded-lg p-3">
            <div className="flex justify-between items-center mb-1">
              <span className="text-yellow-400 font-bold text-sm">456 Oak Ave</span>
              <span className="text-yellow-400 font-bold text-2xl font-mono">85</span>
            </div>
            <p className="text-xs text-gray-400">Mortgage matures Q4, owner refinanced 2x in 5 years</p>
            <div className="mt-2 flex gap-2">
              <span className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-0.5 rounded">Medium Priority</span>
            </div>
          </div>

          <div className="bg-gradient-to-r from-orange-500/20 to-orange-500/5 border border-orange-500/30 rounded-lg p-3">
            <div className="flex justify-between items-center mb-1">
              <span className="text-orange-400 font-bold text-sm">789 Elm Blvd</span>
              <span className="text-orange-400 font-bold text-2xl font-mono">78</span>
            </div>
            <p className="text-xs text-gray-400">Property taxes up 40% YoY, market softening</p>
            <div className="mt-2 flex gap-2">
              <span className="text-xs bg-orange-500/20 text-orange-400 px-2 py-0.5 rounded">Watch List</span>
            </div>
          </div>

          <div className="text-center pt-2 text-xs text-gray-500">
            ... 4,997 more properties scored and ranked
          </div>
        </div>
      ),
      metrics: [
        { label: 'Properties Scored', value: '5,000' },
        { label: 'High Priority', value: '127' },
      ],
    },
  ];

  return (
    <div className="py-6">
      <div className="text-center mb-6">
        <p className="text-sm text-gray-400 uppercase tracking-wide">
          AI Scoring Process
        </p>
        <p className="text-xs text-gray-500 mt-1">
          Data → AI → Ranked Opportunities
        </p>
      </div>

      <StepByStepDiagram
        steps={steps}
        title="3-Stage AI Pipeline"
        allowNonLinear={true}
      />

      <div className="mt-6 bg-green-500/10 border border-green-500/30 rounded-lg p-4">
        <h4 className="text-green-400 font-bold text-sm mb-2 text-center">
          Why This Works
        </h4>
        <p className="text-xs text-gray-400 text-center">
          Traditional brokers rely on gut instinct and manual research. AI scores 5,000+ properties daily, identifying timing signals human brokers miss.
          <span className="text-green-400 block mt-2">Result: 3-5x more qualified opportunities.</span>
        </p>
      </div>
    </div>
  );
}
