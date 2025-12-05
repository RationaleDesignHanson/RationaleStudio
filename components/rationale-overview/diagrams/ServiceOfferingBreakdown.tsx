/**
 * Service Offering Breakdown
 * ROI visualization showing cost of DIY vs Rationale partnership
 * Financial Times-inspired data visualization with clear value proposition
 */

'use client';

import { useState } from 'react';

interface ServiceTier {
  id: string;
  name: string;
  description: string;
  duration: string;
  investment: number;
  roiMultiple: string;
  color: string;
  services: {
    category: string;
    items: string[];
  }[];
  diyCost: number;
  rationaleCost: number;
  savings: string;
}

export default function ServiceOfferingBreakdown() {
  const [selectedTier, setSelectedTier] = useState<string>('sprint');

  const tiers: ServiceTier[] = [
    {
      id: 'sprint',
      name: '3-Week Validation Sprint',
      description: 'De-risk hypothesis with prototypes before heavy investment',
      duration: '3 weeks',
      investment: 50000,
      roiMultiple: '10-15x',
      color: '#00FF94',
      services: [
        {
          category: 'Product Strategy',
          items: [
            'Problem space analysis & hypothesis definition',
            'Competitive landscape mapping',
            'Success metrics framework'
          ]
        },
        {
          category: 'Prototyping & Validation',
          items: [
            '7 interactive prototypes (Figma + functional)',
            'User testing with 15-30 participants',
            'Behavioral data analysis (not just surveys)'
          ]
        },
        {
          category: 'Technical Architecture',
          items: [
            'System architecture specification',
            'Technology stack recommendation',
            'Production roadmap with cost estimates'
          ]
        }
      ],
      diyCost: 500000,
      rationaleCost: 50000,
      savings: 'significant waste avoided'
    },
    {
      id: 'pilot',
      name: '12-Week Build Pilot',
      description: 'Ship validated product from concept to real users',
      duration: '12 weeks',
      investment: 200000,
      roiMultiple: '15-20x',
      color: '#FFD700',
      services: [
        {
          category: 'Full Validation Sprint (Week 1-3)',
          items: [
            'All Sprint deliverables if starting from zero',
            '7 prototypes, user testing, architecture locked'
          ]
        },
        {
          category: 'Production Development (Week 4-10)',
          items: [
            'Full-stack development (iOS/Android/Web)',
            'Backend microservices architecture',
            'AI/ML integration if applicable',
            'QA testing & bug resolution',
            'Production deployment infrastructure'
          ]
        },
        {
          category: 'Go-To-Market Strategy (Week 11-12)',
          items: [
            'Beta rollout strategy with cohort planning',
            'Financial model (TAM/SAM/SOM, unit economics)',
            '24-week product roadmap',
            'User feedback loops & analytics setup',
            'Complete technical documentation'
          ]
        }
      ],
      diyCost: 3000000,
      rationaleCost: 200000,
      savings: 'major waste avoided + 6 months faster'
    }
  ];

  const selectedTierData = tiers.find(t => t.id === selectedTier) || tiers[0];

  return (
    <div className="p-6 sm:p-8 bg-gray-900/50 border border-gray-700 rounded-lg">
      <div className="mb-8">
        <h3 className="text-xl font-bold text-white mb-2">What You're Actually Buying</h3>
        <p className="text-sm text-gray-400">
          Not consulting hours. Systematic de-risking that saves 10-20x the investment in avoided waste.
        </p>
      </div>

      {/* Tier Selector */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {tiers.map((tier) => {
          const isSelected = tier.id === selectedTier;
          return (
            <button
              key={tier.id}
              onClick={() => setSelectedTier(tier.id)}
              className={`p-5 rounded-lg border-2 transition-all text-left ${
                isSelected
                  ? 'bg-gray-800/70'
                  : 'bg-gray-800/30 border-gray-700 hover:border-gray-600'
              }`}
              style={{
                borderColor: isSelected ? tier.color : undefined
              }}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="text-base font-bold text-white mb-1">{tier.name}</div>
                  <div className="text-xs text-gray-400 leading-relaxed">{tier.description}</div>
                </div>
                {isSelected && (
                  <div className="w-2.5 h-2.5 rounded-full animate-pulse flex-shrink-0" style={{ backgroundColor: tier.color }} />
                )}
              </div>
              <div className="flex items-center gap-4 mt-4">
                <div>
                  <div className="text-xs text-gray-500">ROI Multiple</div>
                  <div className="text-lg font-bold" style={{ color: tier.color }}>{tier.roiMultiple}</div>
                </div>
                <div className="w-px h-8 bg-gray-700" />
                <div>
                  <div className="text-xs text-gray-500">Investment</div>
                  <div className="text-sm font-semibold text-white">${(tier.investment / 1000).toFixed(0)}K</div>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Tier Services */}
      <div className="mb-8">
        <div className="text-sm font-semibold text-white mb-4">Complete Service Breakdown</div>
        <div className="space-y-4">
          {selectedTierData.services.map((service, idx) => (
            <div key={idx} className="p-4 bg-gray-800/50 border border-gray-700 rounded-lg">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-1.5 h-4 rounded-full" style={{ backgroundColor: selectedTierData.color }} />
                <div className="text-sm font-semibold text-white">{service.category}</div>
              </div>
              <div className="ml-5 space-y-1.5">
                {service.items.map((item, itemIdx) => (
                  <div key={itemIdx} className="flex items-start gap-2">
                    <div className="text-xs" style={{ color: selectedTierData.color }}>•</div>
                    <div className="text-xs text-gray-300 leading-relaxed">{item}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ROI Comparison */}
      <div className="p-6 bg-gray-800/50 border-2 rounded-lg mb-6" style={{ borderColor: selectedTierData.color }}>
        <div className="text-sm font-semibold text-white mb-6">ROI Analysis: DIY vs Rationale</div>

        <div className="space-y-6">
          {/* DIY Cost */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="text-xs text-gray-400">DIY Approach (hiring team + trial & error)</div>
              <div className="text-lg font-bold text-[#FF4444]">
                ${(selectedTierData.diyCost / 1000).toFixed(0)}K
              </div>
            </div>
            <div className="h-3 bg-gray-700 rounded-full overflow-hidden">
              <div className="h-full bg-[#FF4444]" style={{ width: '100%' }} />
            </div>
            <div className="mt-2 text-xs text-gray-500">
              Includes: hiring delays, learning curve, architectural pivots, sunk cost waste
            </div>
          </div>

          {/* Rationale Cost */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="text-xs text-gray-400">Rationale Partnership</div>
              <div className="text-lg font-bold" style={{ color: selectedTierData.color }}>
                ${(selectedTierData.investment / 1000).toFixed(0)}K
              </div>
            </div>
            <div className="h-3 bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full transition-all duration-500"
                style={{
                  width: `${(selectedTierData.investment / selectedTierData.diyCost) * 100}%`,
                  backgroundColor: selectedTierData.color
                }}
              />
            </div>
            <div className="mt-2 text-xs text-gray-500">
              Includes: validation, development, strategy—no waste, no surprises
            </div>
          </div>
        </div>

        {/* Savings */}
        <div className="mt-6 pt-6 border-t border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs text-gray-500 mb-1">Net Savings</div>
              <div className="text-sm text-gray-300">{selectedTierData.savings}</div>
            </div>
            <div className="text-right">
              <div className="text-xs text-gray-500 mb-1">ROI Multiple</div>
              <div className="text-2xl font-bold" style={{ color: selectedTierData.color }}>
                {selectedTierData.roiMultiple}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Why This ROI Multiple */}
      <div className="p-4 bg-[#FFD700]/10 border border-[#FFD700]/30 rounded-lg">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#FFD700]/20 flex items-center justify-center">
            <span className="text-[#FFD700] text-sm">📊</span>
          </div>
          <div>
            <div className="text-sm font-semibold text-white mb-2">How We Calculate {selectedTierData.roiMultiple} ROI</div>
            <div className="text-xs text-gray-300 leading-relaxed space-y-2">
              <div>
                <span className="font-semibold text-white">Avoided waste:</span> Traditional approach builds for 12+ weeks before validation. When UX fails, you've sunk months of work. Rationale validates in Week 2 with minimal investment. That's substantial savings per failed hypothesis.
              </div>
              <div>
                <span className="font-semibold text-white">Speed premium:</span> 6 months faster to market = 6 months competitive advantage. For time-sensitive products, this compounds into millions in first-mover value.
              </div>
              <div>
                <span className="font-semibold text-white">Zero pivots:</span> No architectural rework, no "we should have tested this" moments. Single-pass development because prototypes validated everything. This alone saves 30-40% of typical project budgets.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Comparison Grid */}
      <div className="mt-8 pt-8 border-t border-gray-700">
        <div className="text-sm font-semibold text-white mb-4">Investment Comparison</div>
        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 bg-gray-800/30 border border-gray-700 rounded">
            <div className="text-xs text-gray-500 mb-2">Traditional Agency</div>
            <div className="text-2xl font-bold text-[#FF4444] mb-1">6 months</div>
            <div className="text-xs text-gray-400">No validation, high risk</div>
          </div>
          <div className="p-4 bg-gray-800/30 border border-gray-700 rounded">
            <div className="text-xs text-gray-500 mb-2">Hire In-House Team</div>
            <div className="text-2xl font-bold text-[#FFA500] mb-1">9 months</div>
            <div className="text-xs text-gray-400">Including hiring delays</div>
          </div>
          <div className="p-4 border-2 rounded" style={{ borderColor: selectedTierData.color, backgroundColor: `${selectedTierData.color}10` }}>
            <div className="text-xs text-gray-500 mb-2">Rationale {selectedTierData.name}</div>
            <div className="text-2xl font-bold text-white mb-1">${(selectedTierData.investment / 1000).toFixed(0)}K</div>
            <div className="text-xs text-gray-400">{selectedTierData.duration}, validated</div>
          </div>
        </div>
      </div>
    </div>
  );
}
