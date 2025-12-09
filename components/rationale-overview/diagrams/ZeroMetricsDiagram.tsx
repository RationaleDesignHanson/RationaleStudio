/**
 * Zero Metrics Diagram
 * Timeline-focused infographic with bold metrics and clear comparison anchors
 * Redesigned for maximum clarity and immediate impact
 */

'use client';

import { useState } from 'react';

interface Metric {
  id: string;
  label: string;
  value: string;
  unit: string;
  color: string;
  description: string;
}

export default function ZeroMetricsDiagram() {
  const [hoveredMetric, setHoveredMetric] = useState<string | null>(null);

  const metrics: Metric[] = [
    {
      id: 'services',
      label: 'Microservices',
      value: '10',
      unit: 'services',
      color: '#00D9FF',
      description: 'Production infrastructure'
    },
    {
      id: 'files',
      label: 'Swift Files',
      value: '182',
      unit: 'files',
      color: '#00D9FF',
      description: 'Full iOS codebase'
    },
    {
      id: 'prototypes',
      label: 'Prototypes',
      value: '7',
      unit: 'iterations',
      color: '#FFD700',
      description: 'Validated before build'
    }
  ];

  return (
    <div className="p-6 sm:p-8 bg-gray-900/50 border border-gray-700 rounded-lg">
      {/* Hero Timeline Comparison */}
      <div className="mb-8 pb-8 border-b border-gray-700">
        <div className="text-xs font-bold text-gray-400 tracking-wider mb-6">CONCEPT TO APP STORE</div>

        <div className="space-y-6">
          {/* Rationale Timeline - Hero */}
          <div>
            <div className="flex items-end gap-3 mb-3">
              <div className="text-6xl font-black text-[#00FF94] leading-none tabular-nums">1</div>
              <div className="pb-2">
                <div className="text-2xl font-bold text-[#00FF94] leading-none">MONTH</div>
                <div className="text-xs text-gray-400 mt-1">Rationale Approach</div>
              </div>
            </div>
            <div className="h-4 bg-[#00FF94] rounded-full shadow-lg shadow-[#00FF94]/30" style={{ width: '16.7%' }} />
          </div>

          {/* Traditional Timeline - Comparison */}
          <div className="opacity-60">
            <div className="flex items-end gap-3 mb-3">
              <div className="text-4xl font-black text-gray-500 leading-none tabular-nums">6</div>
              <div className="pb-1">
                <div className="text-xl font-bold text-gray-500 leading-none">MONTHS</div>
                <div className="text-xs text-gray-600 mt-1">Traditional Build</div>
              </div>
            </div>
            <div className="h-3 bg-gray-700 rounded-full" style={{ width: '100%' }} />
          </div>
        </div>

        {/* Impact Badge */}
        <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-[#00FF94]/10 border border-[#00FF94]/30 rounded-full">
          <div className="w-2 h-2 bg-[#00FF94] rounded-full animate-pulse" />
          <span className="text-sm font-bold text-[#00FF94]">6X FASTER</span>
        </div>
      </div>

      {/* Production Metrics Grid */}
      <div className="mb-8">
        <div className="text-xs font-bold text-gray-400 tracking-wider mb-4">PRODUCTION METRICS</div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {metrics.map((metric) => {
            const isHovered = hoveredMetric === metric.id;
            return (
              <div
                key={metric.id}
                className="p-5 rounded-lg border-2 transition-all duration-200 cursor-pointer"
                style={{
                  borderColor: isHovered ? metric.color : '#374151',
                  backgroundColor: isHovered ? `${metric.color}08` : 'transparent',
                  boxShadow: isHovered ? `0 0 20px ${metric.color}30` : 'none'
                }}
                onMouseEnter={() => setHoveredMetric(metric.id)}
                onMouseLeave={() => setHoveredMetric(null)}
              >
                <div className="text-5xl font-black leading-none mb-2 tabular-nums" style={{ color: metric.color }}>
                  {metric.value}
                </div>
                <div className="text-sm font-bold text-white mb-1">
                  {metric.label}
                </div>
                <div className="text-xs text-gray-400">
                  {metric.description}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Validation Comparison */}
      <div className="pt-6 border-t border-gray-700">
        <div className="text-xs font-bold text-gray-400 tracking-wider mb-4">VALIDATION APPROACH</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Rationale: Validate First */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="text-2xl font-black text-terminal-gold tabular-nums">7</div>
              <div>
                <div className="text-sm font-bold text-white">Prototypes First</div>
                <div className="text-xs text-gray-400">Then build production</div>
              </div>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <div className="flex-1 h-3 bg-terminal-gold rounded-full" />
              <span className="text-xs text-terminal-gold font-bold">7 iterations</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-[#00FF94] flex items-center justify-center">
                <span className="text-xs font-black">0</span>
              </div>
              <span className="text-xs text-gray-400">Post-build pivots</span>
            </div>
          </div>

          {/* Traditional: Build First */}
          <div className="opacity-60">
            <div className="flex items-center gap-2 mb-3">
              <div className="text-2xl font-black text-gray-500 tabular-nums">1-2</div>
              <div>
                <div className="text-sm font-bold text-gray-500">Prototypes (Maybe)</div>
                <div className="text-xs text-gray-600">Then pivot repeatedly</div>
              </div>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <div className="flex-1 h-3 bg-gray-700 rounded-full overflow-hidden">
                <div className="h-full bg-gray-600" style={{ width: '28%' }} />
              </div>
              <span className="text-xs text-gray-500 font-bold">1-2 iterations</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-[#FF4444] flex items-center justify-center">
                <span className="text-xs font-black">3-5</span>
              </div>
              <span className="text-xs text-gray-600">Post-build pivots</span>
            </div>
          </div>
        </div>
      </div>

      {/* Production Badge */}
      <div className="mt-8 pt-6 border-t border-gray-700">
        <div className="flex flex-wrap items-center gap-3">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#00D9FF]/10 border border-[#00D9FF]/30 rounded">
            <svg className="w-3 h-3 text-[#00D9FF]" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span className="text-xs font-bold text-[#00D9FF]">PRODUCTION-READY</span>
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#00D9FF]/10 border border-[#00D9FF]/30 rounded">
            <svg className="w-3 h-3 text-[#00D9FF]" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span className="text-xs font-bold text-[#00D9FF]">REAL USERS</span>
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#00D9FF]/10 border border-[#00D9FF]/30 rounded">
            <svg className="w-3 h-3 text-[#00D9FF]" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span className="text-xs font-bold text-[#00D9FF]">APP STORE LIVE</span>
          </div>
        </div>
      </div>
    </div>
  );
}
