/**
 * Seed Metrics Dashboard
 * Interactive display of 4 hard-threshold seed trigger metrics
 */

'use client';

import { useState } from 'react';

interface Metric {
  id: string;
  name: string;
  target: string;
  current: string;
  progress: number; // 0-100 representing progress toward target
  status: 'on-track' | 'trending' | 'needs-attention';
  calculation: string;
  color: string;
}

interface SecondaryMetric {
  name: string;
  target: string;
  current: string;
  status: 'good' | 'monitor';
}

export default function SeedMetricsDashboard() {
  const [showSecondary, setShowSecondary] = useState(false);

  const primaryMetrics: Metric[] = [
    {
      id: 'refill-repeat',
      name: 'Refill Repeat Rate',
      target: '>40%',
      current: '38%',
      progress: 95,
      status: 'trending',
      calculation: 'Customers who purchased refill within 60 days ÷ Total starter kit buyers',
      color: '#E85D42'
    },
    {
      id: 'dispenser-attach',
      name: 'Dispenser Attach Rate',
      target: '>60%',
      current: '64%',
      progress: 100,
      status: 'on-track',
      calculation: 'Starter kit sales ÷ Total bag pack sales',
      color: '#2A9D8F'
    },
    {
      id: 'nps',
      name: 'Net Promoter Score',
      target: '>50',
      current: '52',
      progress: 100,
      status: 'on-track',
      calculation: '% Promoters (9-10) - % Detractors (0-6)',
      color: '#2A9D8F'
    },
    {
      id: 'keyword-freq',
      name: 'Review Keyword Frequency',
      target: '>30%',
      current: '34%',
      progress: 100,
      status: 'on-track',
      calculation: 'Reviews mentioning feel/gross/tactile/heat/smell ÷ Total reviews',
      color: '#2A9D8F'
    }
  ];

  const secondaryMetrics: SecondaryMetric[] = [
    { name: 'Sell-Through Velocity', target: '2-3 weeks', current: '2.4 weeks', status: 'good' },
    { name: 'Staff Recommendation Rate', target: '>70%', current: '73%', status: 'good' },
    { name: 'Return / Complaint Rate', target: '<3%', current: '1.8%', status: 'good' },
    { name: 'Subscription Conversion', target: '>15%', current: '12%', status: 'monitor' }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'on-track':
        return (
          <svg className="w-5 h-5 text-[#2A9D8F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'trending':
        return (
          <svg className="w-5 h-5 text-[#F4A261]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
        );
      case 'needs-attention':
        return (
          <svg className="w-5 h-5 text-[#E85D42]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white border-2 border-gray-200 rounded-2xl p-4 sm:p-6 lg:p-8 shadow-sm space-y-6">
      <div className="text-center">
        <h3 className="text-xl sm:text-2xl font-bold mb-2 text-[#2D2D2D]">Seed Trigger Metrics</h3>
        <p className="text-sm sm:text-base text-[#2D2D2D]/70">4 hard thresholds that unlock seed funding</p>
      </div>

      {/* Primary Metrics Grid */}
      <div className="grid md:grid-cols-2 gap-4">
        {primaryMetrics.map((metric) => (
          <div
            key={metric.id}
            className="bg-[#F5F1E8] border-2 border-gray-200 rounded-xl p-4 hover:border-[#2A9D8F] transition-all"
          >
            {/* Metric Header */}
            <div className="flex items-start justify-between mb-3">
              <div>
                <h4 className="text-sm font-bold text-[#2D2D2D] mb-1">{metric.name}</h4>
                <p className="text-xs text-[#2D2D2D]/60">Target: {metric.target}</p>
              </div>
              {getStatusIcon(metric.status)}
            </div>

            {/* Current Value */}
            <div className="mb-3">
              <div className="text-3xl font-bold" style={{ color: metric.color }}>
                {metric.current}
              </div>
              <div className={`text-xs font-bold mt-1 ${
                metric.status === 'on-track' ? 'text-[#2A9D8F]' :
                metric.status === 'trending' ? 'text-[#F4A261]' :
                'text-[#E85D42]'
              }`}>
                {metric.status === 'on-track' ? '✓ Target met' :
                 metric.status === 'trending' ? '↗ Trending to target' :
                 '⚠ Needs attention'}
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-3">
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${metric.progress}%`,
                    backgroundColor: metric.color
                  }}
                ></div>
              </div>
            </div>

            {/* Calculation Formula */}
            <div className="text-xs text-[#2D2D2D]/70 leading-relaxed">
              {metric.calculation}
            </div>
          </div>
        ))}
      </div>

      {/* Seed Decision Gate */}
      <div className="bg-[#2A9D8F]/10 border-2 border-[#2A9D8F] rounded-xl p-5">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-lg font-bold text-[#2D2D2D] mb-1">Seed Round Status</h4>
            <p className="text-sm text-[#2D2D2D]/70">3 of 4 hard thresholds met</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-[#F4A261]">75%</div>
            <div className="text-xs font-bold text-[#F4A261]">Ready for seed in ~4 weeks</div>
          </div>
        </div>
      </div>

      {/* Secondary Metrics Expandable Section */}
      <div className="border-2 border-gray-200 rounded-xl overflow-hidden">
        <button
          onClick={() => setShowSecondary(!showSecondary)}
          className="w-full px-5 py-4 flex items-center justify-between bg-[#F5F1E8] hover:bg-[#F5F1E8]/70 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="h-1 w-8 rounded-full bg-[#E85D42]"></div>
            <span className="text-base font-bold text-[#2D2D2D]">Secondary Metrics (Optimization Signals)</span>
          </div>
          <svg
            className={`w-5 h-5 text-[#2D2D2D]/60 transition-transform duration-300 ${
              showSecondary ? 'rotate-180' : ''
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {showSecondary && (
          <div className="p-5 space-y-3 bg-white animate-in slide-in-from-top duration-300">
            {secondaryMetrics.map((metric, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-3 border-b border-gray-200 last:border-0"
              >
                <div>
                  <div className="text-sm font-bold text-[#2D2D2D]">{metric.name}</div>
                  <div className="text-xs text-[#2D2D2D]/60">Target: {metric.target}</div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-[#2D2D2D]">{metric.current}</div>
                  <div className={`text-xs font-bold ${
                    metric.status === 'good' ? 'text-[#2A9D8F]' : 'text-[#F4A261]'
                  }`}>
                    {metric.status === 'good' ? '✓ On track' : '○ Monitor'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Key Insight */}
      <div className="bg-[#E85D42]/5 border-2 border-[#E85D42]/30 rounded-xl p-4 sm:p-5">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 mt-1">
            <svg className="w-5 h-5 text-[#E85D42]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <div>
            <h5 className="text-sm font-bold text-[#2D2D2D] mb-1">Hard Gate, Not Aspiration</h5>
            <p className="text-xs sm:text-sm text-[#2D2D2D]/80 leading-relaxed">
              These 4 metrics are non-negotiable thresholds. All must be met before seed capital deploys. This protects investor capital by ensuring we've proven product-market fit, repeatability, and customer love before scaling. If metrics don't hit by Week 12, we extend beta phase rather than force growth.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
