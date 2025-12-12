'use client';

import StepByStepDiagram from '@/components/diagrams/StepByStepDiagram';
import { CRE_COLORS } from '@/lib/creait/design-tokens/colors';
import { DollarSign, Target, TrendingUp, CheckCircle2, Calendar } from 'lucide-react';

/**
 * InvestmentMilestonesDiagramMobile - Mobile-optimized funding roadmap
 *
 * Shows 3 funding stages as step-by-step wizard:
 * - Seed: $500K-1M (Today)
 * - Series A: $3-5M (Month 18)
 * - Series B: $10-15M (Year 3)
 *
 * Each step shows: amount, timing, status, key outcomes
 */

const stages = [
  {
    id: 'seed',
    title: 'Seed Round',
    description: 'Foundation Phase - Build MVP and validate product-market fit',
    visual: (
      <div className="space-y-6">
        {/* Amount Card */}
        <div
          className="p-6 rounded-lg space-y-3"
          style={{
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
            border: `2px solid ${CRE_COLORS.score.critical}`,
          }}
        >
          <div className="flex items-center gap-3">
            <DollarSign
              className="w-6 h-6"
              style={{ color: CRE_COLORS.score.critical }}
            />
            <div>
              <div
                className="text-3xl font-bold"
                style={{ color: CRE_COLORS.score.critical }}
              >
                $500K - $1M
              </div>
              <div className="text-sm text-gray-400 mt-1">Raising Now</div>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="flex items-center gap-3 px-2">
          <Calendar className="w-5 h-5 text-gray-400" />
          <div>
            <div className="text-white font-medium">Timeline</div>
            <div className="text-gray-400 text-sm">Today - Q1 2025</div>
          </div>
        </div>

        {/* Key Outcomes */}
        <div className="space-y-3">
          <div className="text-white font-bold text-lg mb-3">Key Outcomes</div>
          {[
            'MVP Launch',
            '30 Paying Customers',
            '$180K ARR',
            'Product-Market Fit Signals',
          ].map((outcome, index) => (
            <div
              key={index}
              className="flex items-start gap-3 p-3 rounded-lg"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              <CheckCircle2
                className="w-5 h-5 flex-shrink-0 mt-0.5"
                style={{ color: CRE_COLORS.success }}
              />
              <span className="text-gray-300 text-sm">{outcome}</span>
            </div>
          ))}
        </div>

        {/* Status Badge */}
        <div
          className="inline-flex px-4 py-2 rounded-full font-bold text-sm"
          style={{
            backgroundColor: 'rgba(34, 197, 94, 0.15)',
            border: `2px solid ${CRE_COLORS.success}`,
            color: CRE_COLORS.success,
          }}
        >
          Current Stage
        </div>
      </div>
    ),
  },
  {
    id: 'series-a',
    title: 'Series A',
    description: 'Growth Phase - Build sales engine and scale operations',
    visual: (
      <div className="space-y-6">
        {/* Amount Card */}
        <div
          className="p-6 rounded-lg space-y-3"
          style={{
            backgroundColor: 'rgba(14, 165, 233, 0.1)',
            border: `2px solid ${CRE_COLORS.primary}`,
          }}
        >
          <div className="flex items-center gap-3">
            <DollarSign
              className="w-6 h-6"
              style={{ color: CRE_COLORS.primary }}
            />
            <div>
              <div
                className="text-3xl font-bold"
                style={{ color: CRE_COLORS.primary }}
              >
                $3M - $5M
              </div>
              <div className="text-sm text-gray-400 mt-1">Growth Capital</div>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="flex items-center gap-3 px-2">
          <Calendar className="w-5 h-5 text-gray-400" />
          <div>
            <div className="text-white font-medium">Timeline</div>
            <div className="text-gray-400 text-sm">Month 18 (Q3 2026)</div>
          </div>
        </div>

        {/* Key Outcomes */}
        <div className="space-y-3">
          <div className="text-white font-bold text-lg mb-3">Key Outcomes</div>
          {[
            '150 Customers',
            '$1M ARR',
            'Sales Team (5 reps)',
            'Marketing Engine',
          ].map((outcome, index) => (
            <div
              key={index}
              className="flex items-start gap-3 p-3 rounded-lg"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              <Target
                className="w-5 h-5 flex-shrink-0 mt-0.5"
                style={{ color: CRE_COLORS.primary }}
              />
              <span className="text-gray-300 text-sm">{outcome}</span>
            </div>
          ))}
        </div>

        {/* Status Badge */}
        <div
          className="inline-flex px-4 py-2 rounded-full font-bold text-sm"
          style={{
            backgroundColor: 'rgba(14, 165, 233, 0.15)',
            border: `2px solid ${CRE_COLORS.primary}`,
            color: CRE_COLORS.primary,
          }}
        >
          Planned: Month 18
        </div>
      </div>
    ),
  },
  {
    id: 'series-b',
    title: 'Series B',
    description: 'Scale Phase - Become market leader and expand enterprise',
    visual: (
      <div className="space-y-6">
        {/* Amount Card */}
        <div
          className="p-6 rounded-lg space-y-3"
          style={{
            backgroundColor: 'rgba(139, 92, 246, 0.1)',
            border: `2px solid ${CRE_COLORS.secondary}`,
          }}
        >
          <div className="flex items-center gap-3">
            <DollarSign
              className="w-6 h-6"
              style={{ color: CRE_COLORS.secondary }}
            />
            <div>
              <div
                className="text-3xl font-bold"
                style={{ color: CRE_COLORS.secondary }}
              >
                $10M - $15M
              </div>
              <div className="text-sm text-gray-400 mt-1">Scale Capital</div>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="flex items-center gap-3 px-2">
          <Calendar className="w-5 h-5 text-gray-400" />
          <div>
            <div className="text-white font-medium">Timeline</div>
            <div className="text-gray-400 text-sm">Year 3 (2027)</div>
          </div>
        </div>

        {/* Key Outcomes */}
        <div className="space-y-3">
          <div className="text-white font-bold text-lg mb-3">Key Outcomes</div>
          {[
            '500 Customers',
            '$5M ARR',
            'Market Leader Position',
            'Enterprise Product',
          ].map((outcome, index) => (
            <div
              key={index}
              className="flex items-start gap-3 p-3 rounded-lg"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              <TrendingUp
                className="w-5 h-5 flex-shrink-0 mt-0.5"
                style={{ color: CRE_COLORS.secondary }}
              />
              <span className="text-gray-300 text-sm">{outcome}</span>
            </div>
          ))}
        </div>

        {/* Status Badge */}
        <div
          className="inline-flex px-4 py-2 rounded-full font-bold text-sm"
          style={{
            backgroundColor: 'rgba(139, 92, 246, 0.15)',
            border: `2px solid ${CRE_COLORS.secondary}`,
            color: CRE_COLORS.secondary,
          }}
        >
          Planned: Year 3
        </div>
      </div>
    ),
  },
];

export default function InvestmentMilestonesDiagramMobile() {
  return (
    <div className="w-full">
      <StepByStepDiagram
        steps={stages}
        title="Funding Roadmap: Seed to Series B"
        allowNonLinear={true}
      />

      {/* Total Capital Summary */}
      <div
        className="mt-8 mx-4 p-6 rounded-lg text-center space-y-2"
        style={{
          backgroundColor: 'rgba(139, 92, 246, 0.1)',
          border: `2px solid ${CRE_COLORS.secondary}`,
        }}
      >
        <div
          className="text-4xl font-bold"
          style={{ color: CRE_COLORS.secondary }}
        >
          $14M - $21M
        </div>
        <div className="text-gray-400 text-sm font-medium">
          Total Capital Over 3 Years
        </div>
      </div>
    </div>
  );
}
