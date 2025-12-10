'use client';

import { StepByStepDiagram, type Step } from '@/components/diagrams/StepByStepDiagram';

/**
 * Mobile-optimized UnitEconomicsFlowDiagram
 * Shows 4-stage unit economics breakdown as wizard
 */
export default function UnitEconomicsFlowDiagramMobile() {
  const steps: Step[] = [
    {
      id: 'customer-revenue',
      title: 'Step 1: Customer Revenue',
      description: 'Monthly subscription revenue from broker customers.',
      visual: (
        <div className="bg-blue-500/10 border-2 border-blue-500/50 rounded-lg p-6">
          <div className="text-center mb-4">
            <div className="text-4xl mb-2">💰</div>
            <h5 className="text-blue-400 font-bold text-lg mb-1">Customer Pays</h5>
            <div className="text-5xl font-bold text-blue-400 font-mono">$499</div>
            <div className="text-sm text-gray-400 mt-1">/month per broker</div>
          </div>
          <div className="bg-gray-800/50 rounded p-4 mt-4">
            <h6 className="text-blue-400 font-bold text-xs mb-2">What's Included:</h6>
            <ul className="space-y-1 text-xs text-gray-400">
              <li>• AI-scored property list (updated daily)</li>
              <li>• Unlimited searches and filters</li>
              <li>• Email/phone integrations</li>
              <li>• Performance analytics dashboard</li>
            </ul>
          </div>
        </div>
      ),
      metrics: [
        { label: 'MRR', value: '$499' },
        { label: 'ARR', value: '$5,988' },
      ],
    },
    {
      id: 'cost-breakdown',
      title: 'Step 2: Cost Breakdown',
      description: 'Customer acquisition cost (one-time) and monthly operating costs.',
      visual: (
        <div className="space-y-3">
          <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <h5 className="text-orange-400 font-bold text-sm">CAC (one-time)</h5>
              <div className="text-2xl font-bold text-orange-400 font-mono">$416</div>
            </div>
            <ul className="space-y-1 text-xs text-gray-400">
              <li>• Sales team commission: $200</li>
              <li>• Marketing attribution: $150</li>
              <li>• Onboarding/setup: $66</li>
            </ul>
            <div className="mt-2 pt-2 border-t border-orange-500/30">
              <p className="text-xs text-gray-500">Payback period: 1.0 months</p>
            </div>
          </div>

          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <h5 className="text-yellow-400 font-bold text-sm">COGS (monthly)</h5>
              <div className="text-2xl font-bold text-yellow-400 font-mono">$100</div>
            </div>
            <ul className="space-y-1 text-xs text-gray-400">
              <li>• AWS infrastructure: $45</li>
              <li>• Data API costs: $30</li>
              <li>• Customer support: $15</li>
              <li>• Payment processing: $10</li>
            </ul>
            <div className="mt-2 pt-2 border-t border-yellow-500/30">
              <p className="text-xs text-gray-500">80% gross margin</p>
            </div>
          </div>
        </div>
      ),
      metrics: [
        { label: 'CAC', value: '$416' },
        { label: 'COGS', value: '$100/mo' },
      ],
    },
    {
      id: 'gross-margin',
      title: 'Step 3: Gross Margin',
      description: 'Monthly profit after direct costs (revenue - COGS).',
      visual: (
        <div className="bg-green-500/10 border-2 border-green-500/50 rounded-lg p-6">
          <div className="text-center mb-4">
            <div className="text-4xl mb-2">📈</div>
            <h5 className="text-green-400 font-bold text-lg mb-1">Gross Margin</h5>
            <div className="text-5xl font-bold text-green-400 font-mono">$399</div>
            <div className="text-sm text-gray-400 mt-1">/month per customer</div>
          </div>

          <div className="grid grid-cols-2 gap-3 mt-4">
            <div className="bg-gray-800/50 rounded p-3 text-center">
              <div className="text-green-400 font-bold text-lg font-mono">80%</div>
              <div className="text-xs text-gray-500">Gross Margin %</div>
            </div>
            <div className="bg-gray-800/50 rounded p-3 text-center">
              <div className="text-green-400 font-bold text-lg font-mono">$4,788</div>
              <div className="text-xs text-gray-500">Annual Profit</div>
            </div>
          </div>

          <div className="bg-gray-800/50 rounded p-4 mt-4">
            <h6 className="text-green-400 font-bold text-xs mb-2">Why This Matters:</h6>
            <p className="text-xs text-gray-400">
              High gross margins (80%) enable rapid scaling without proportional cost increases.
              Every new customer adds $399/mo in profit.
            </p>
          </div>
        </div>
      ),
      metrics: [
        { label: 'Monthly', value: '$399' },
        { label: 'Margin %', value: '80%' },
      ],
    },
    {
      id: 'ltv-ratio',
      title: 'Step 4: LTV:CAC Ratio',
      description: 'Customer lifetime value vs acquisition cost (target: 3:1 or higher).',
      visual: (
        <div className="space-y-4">
          <div className="bg-purple-500/10 border-2 border-purple-500/50 rounded-lg p-6">
            <div className="text-center mb-4">
              <div className="text-4xl mb-2">🎯</div>
              <h5 className="text-purple-400 font-bold text-lg mb-1">LTV (6 months avg)</h5>
              <div className="text-5xl font-bold text-purple-400 font-mono">$2,993</div>
              <div className="text-sm text-gray-400 mt-1">lifetime gross profit</div>
            </div>

            <div className="bg-gray-800/50 rounded p-4">
              <h6 className="text-purple-400 font-bold text-xs mb-2">Calculation:</h6>
              <div className="space-y-1 text-xs text-gray-400 font-mono">
                <div>Monthly Margin: $399</div>
                <div>× Avg Lifetime: 7.5 months</div>
                <div className="border-t border-gray-700 pt-1 mt-1">= $2,993 LTV</div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 border-2 border-green-500/50 rounded-lg p-5">
            <div className="text-center">
              <h5 className="text-green-400 font-bold text-sm mb-3">LTV:CAC Ratio</h5>
              <div className="flex items-center justify-center gap-3">
                <div>
                  <div className="text-3xl font-bold text-green-400 font-mono">7.2</div>
                  <div className="text-xs text-gray-500">to 1</div>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-green-500/30">
                <p className="text-xs text-gray-400">
                  <strong className="text-green-400">Excellent:</strong> 7.2:1 ratio (target: 3:1+)
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  $2,993 LTV ÷ $416 CAC = 7.2x return
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className="bg-blue-500/10 border border-blue-500/30 rounded p-2">
              <div className="text-blue-400 font-bold font-mono">1.0mo</div>
              <div className="text-gray-500">CAC Payback</div>
            </div>
            <div className="bg-purple-500/10 border border-purple-500/30 rounded p-2">
              <div className="text-purple-400 font-bold font-mono">7.5mo</div>
              <div className="text-gray-500">Avg Lifetime</div>
            </div>
            <div className="bg-green-500/10 border border-green-500/30 rounded p-2">
              <div className="text-green-400 font-bold font-mono">18%</div>
              <div className="text-gray-500">Churn Rate</div>
            </div>
          </div>
        </div>
      ),
      metrics: [
        { label: 'LTV', value: '$2,993' },
        { label: 'LTV:CAC', value: '7.2:1' },
      ],
    },
  ];

  return (
    <div className="py-6">
      <div className="text-center mb-6">
        <p className="text-sm text-gray-400 uppercase tracking-wide">
          Unit Economics
        </p>
        <p className="text-xs text-gray-500 mt-1">
          Revenue → Costs → Margin → LTV
        </p>
      </div>

      <StepByStepDiagram
        steps={steps}
        title="4-Stage Financial Model"
        allowNonLinear={true}
      />

      <div className="mt-6 bg-green-500/10 border border-green-500/30 rounded-lg p-4">
        <h4 className="text-green-400 font-bold text-sm mb-2 text-center">
          Why Investors Love This
        </h4>
        <p className="text-xs text-gray-400 text-center">
          7.2:1 LTV:CAC ratio with 80% gross margins proves scalable, capital-efficient growth.
          <span className="text-green-400 block mt-2">Every $1 spent acquiring customers returns $7.20 in profit.</span>
        </p>
      </div>
    </div>
  );
}
