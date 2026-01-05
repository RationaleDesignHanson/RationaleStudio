/**
 * Heirloom Financial Model
 *
 * 3-scenario financial projections with cash flow tracking and break-even analysis.
 * Embeds Looker Studio dashboard once Google Sheets model is set up in Week 1.
 */

'use client';

import { useState } from 'react';
import { EmbedFrame } from '../_components';

type Scenario = 'conservative' | 'baseline' | 'optimistic';

export default function FinancialsPage() {
  const [selectedScenario, setSelectedScenario] = useState<Scenario>('baseline');

  // TODO: Replace with actual Looker Studio dashboard URL after Week 1 setup
  // Format: https://lookerstudio.google.com/embed/reporting/DASHBOARD_ID
  const lookerStudioUrl = ''; // Will be filled after Google Sheets + Looker setup

  const scenarios = {
    conservative: {
      name: 'Conservative',
      downloads: 100000,
      conversion: 8,
      revenue: 20000,
      breakEven: 'Month 18',
      description: 'Modest growth with organic ASO focus',
    },
    baseline: {
      name: 'Baseline',
      downloads: 150000,
      conversion: 12,
      revenue: 60000,
      breakEven: 'Month 12',
      description: 'Expected growth with balanced marketing',
    },
    optimistic: {
      name: 'Optimistic',
      downloads: 200000,
      conversion: 15,
      revenue: 150000,
      breakEven: 'Month 8',
      description: 'Strong growth with $150K fundraise',
    },
  };

  const currentScenario = scenarios[selectedScenario];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Financial Model</h1>
        <p className="text-gray-600 mt-2">
          12-month projections across 3 scenarios with cash flow analysis and break-even timeline
        </p>
      </div>

      {/* Scenario Selector */}
      <div className="flex gap-4">
        {(Object.keys(scenarios) as Scenario[]).map((scenario) => (
          <button
            key={scenario}
            onClick={() => setSelectedScenario(scenario)}
            className={`flex-1 p-4 rounded-lg border-2 transition-all ${
              selectedScenario === scenario
                ? 'border-blue-600 bg-blue-50'
                : 'border-gray-200 bg-white hover:border-blue-300'
            }`}
          >
            <h3 className="font-bold text-lg mb-1">{scenarios[scenario].name}</h3>
            <p className="text-sm text-gray-600">{scenarios[scenario].description}</p>
          </button>
        ))}
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <MetricCard
          label="Year 1 Downloads"
          value={currentScenario.downloads.toLocaleString()}
          scenario={selectedScenario}
        />
        <MetricCard
          label="Conversion Rate"
          value={`${currentScenario.conversion}%`}
          scenario={selectedScenario}
        />
        <MetricCard
          label="Year 1 Revenue"
          value={`$${currentScenario.revenue.toLocaleString()}`}
          scenario={selectedScenario}
        />
        <MetricCard
          label="Break-Even"
          value={currentScenario.breakEven}
          scenario={selectedScenario}
        />
      </div>

      {/* Revenue Model Breakdown */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Revenue Model</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-bold text-gray-900 mb-3">Pricing Tiers</h3>
            <div className="space-y-3">
              <PricingRow tier="Free" price="$0" features="100 recipes, basic search" />
              <PricingRow tier="Premium Monthly" price="$4.99" features="Unlimited recipes, AI features" />
              <PricingRow tier="Premium Annual" price="$39.99" features="Save $20, family sharing" />
            </div>
          </div>
          <div>
            <h3 className="font-bold text-gray-900 mb-3">Assumptions ({currentScenario.name})</h3>
            <div className="space-y-2 text-sm">
              <AssumptionRow label="Monthly Active Users (MAU)" value="60% of downloads" />
              <AssumptionRow label="Free-to-Premium Conversion" value={`${currentScenario.conversion}%`} />
              <AssumptionRow label="Annual Plan Mix" value="40% of premiums" />
              <AssumptionRow label="Churn Rate (Monthly)" value="3-5%" />
              <AssumptionRow label="LTV:CAC Target" value="3:1" />
            </div>
          </div>
        </div>
      </div>

      {/* Cost Breakdown */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Cost Structure (Year 1)</h2>
        <div className="space-y-3">
          <CostRow category="Development & Infrastructure" amount={12000} percentage={30} />
          <CostRow category="Marketing & GTM" amount={10000} percentage={25} />
          <CostRow category="AI API Costs (OpenAI)" amount={6000} percentage={15} />
          <CostRow category="App Store Fees (30%)" amount={8000} percentage={20} />
          <CostRow category="Legal & Administrative" amount={4000} percentage={10} />
          <div className="pt-3 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <span className="font-bold text-gray-900">Total Operating Costs</span>
              <span className="font-bold text-gray-900">$40,000</span>
            </div>
            <p className="text-xs text-gray-600 mt-1">
              Net: ${(currentScenario.revenue - 40000).toLocaleString()} ({selectedScenario === 'conservative' ? '-$20K loss' : selectedScenario === 'baseline' ? '+$20K profit' : '+$110K profit'})
            </p>
          </div>
        </div>
      </div>

      {/* Cash Flow Milestones */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Cash Flow Milestones</h2>
        <div className="space-y-4">
          <MilestoneRow
            month="Month 1-3"
            milestone="Initial traction"
            cashflow={selectedScenario === 'conservative' ? '-$5K' : selectedScenario === 'baseline' ? '-$3K' : '+$2K'}
            status={selectedScenario === 'optimistic' ? 'positive' : 'negative'}
          />
          <MilestoneRow
            month="Month 4-6"
            milestone="Growth phase"
            cashflow={selectedScenario === 'conservative' ? '-$2K' : selectedScenario === 'baseline' ? '+$5K' : '+$20K'}
            status={selectedScenario === 'conservative' ? 'negative' : 'positive'}
          />
          <MilestoneRow
            month="Month 7-9"
            milestone="Scaling up"
            cashflow={selectedScenario === 'conservative' ? '+$3K' : selectedScenario === 'baseline' ? '+$15K' : '+$40K'}
            status="positive"
          />
          <MilestoneRow
            month="Month 10-12"
            milestone="Profitability"
            cashflow={selectedScenario === 'conservative' ? '+$8K' : selectedScenario === 'baseline' ? '+$25K' : '+$60K'}
            status="positive"
          />
        </div>
      </div>

      {/* Instructions (show until Looker Studio is set up) */}
      {!lookerStudioUrl && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-bold text-blue-900 mb-2">
            📝 Setup Instructions
          </h3>
          <p className="text-blue-800 mb-4">
            To enable the interactive financial model, complete Week 1 setup:
          </p>
          <ol className="list-decimal list-inside space-y-2 text-blue-800">
            <li>
              Create Google Sheet: "Heirloom Financial Model"
            </li>
            <li>
              Import data from <code className="bg-blue-100 px-2 py-1 rounded">FINANCIAL_MODEL_DETAILED.md</code>
            </li>
            <li>Build sheets for: Cash Flow, Revenue Breakdown, Cost Analysis</li>
            <li>Connect to Looker Studio and create dashboard</li>
            <li>Add charts: Revenue trend, conversion funnel, cost breakdown</li>
            <li>
              Click "Share" → Get embed link → Copy URL
            </li>
            <li>
              Update <code className="bg-blue-100 px-2 py-1 rounded">lookerStudioUrl</code> variable in this file
            </li>
          </ol>
        </div>
      )}

      {/* Embedded Looker Studio (or placeholder) */}
      {lookerStudioUrl ? (
        <EmbedFrame
          src={lookerStudioUrl}
          title="Financial Model Dashboard"
          height="1200px"
        />
      ) : (
        <div className="bg-white border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
          <p className="text-gray-600 mb-2">
            Looker Studio dashboard will appear here after Week 1 setup
          </p>
          <p className="text-sm text-gray-500">
            In the meantime, reference <span className="font-mono bg-gray-100 px-2 py-1 rounded">
              /Users/matthanson/Heirloom/FINANCIAL_MODEL_DETAILED.md
            </span>
          </p>
        </div>
      )}
    </div>
  );
}

// Metric Card Component
function MetricCard({
  label,
  value,
  scenario,
}: {
  label: string;
  value: string;
  scenario: Scenario;
}) {
  const bgColor = {
    conservative: 'bg-yellow-50 border-yellow-200',
    baseline: 'bg-blue-50 border-blue-200',
    optimistic: 'bg-green-50 border-green-200',
  }[scenario];

  return (
    <div className={`border rounded-lg p-4 ${bgColor}`}>
      <p className="text-sm text-gray-600 mb-1">{label}</p>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
    </div>
  );
}

// Pricing Row Component
function PricingRow({
  tier,
  price,
  features,
}: {
  tier: string;
  price: string;
  features: string;
}) {
  return (
    <div className="flex justify-between items-start border-b border-gray-200 pb-2">
      <div>
        <p className="font-medium text-gray-900">{tier}</p>
        <p className="text-xs text-gray-600">{features}</p>
      </div>
      <p className="font-bold text-gray-900">{price}</p>
    </div>
  );
}

// Assumption Row Component
function AssumptionRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-gray-600">{label}</span>
      <span className="font-medium text-gray-900">{value}</span>
    </div>
  );
}

// Cost Row Component
function CostRow({
  category,
  amount,
  percentage,
}: {
  category: string;
  amount: number;
  percentage: number;
}) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-700">{category}</span>
        <span className="text-sm font-medium text-gray-900">
          ${amount.toLocaleString()}
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-green-600 h-2 rounded-full transition-all"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
}

// Milestone Row Component
function MilestoneRow({
  month,
  milestone,
  cashflow,
  status,
}: {
  month: string;
  milestone: string;
  cashflow: string;
  status: 'positive' | 'negative';
}) {
  const statusColor = status === 'positive' ? 'text-green-600' : 'text-red-600';

  return (
    <div className="flex justify-between items-center border-b border-gray-200 pb-3">
      <div>
        <p className="font-medium text-gray-900">{month}</p>
        <p className="text-sm text-gray-600">{milestone}</p>
      </div>
      <p className={`font-bold text-lg ${statusColor}`}>{cashflow}</p>
    </div>
  );
}
