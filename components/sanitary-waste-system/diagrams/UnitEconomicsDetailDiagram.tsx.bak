/**
 * Unit Economics Detail Diagram
 * Interactive BOM breakdown with hover details
 */

'use client';

import { useState } from 'react';

export default function UnitEconomicsDetailDiagram() {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const bomItems = [
    { id: 'film', label: 'Outer film (PBAT/PLA)', value: '$0.022', percentage: 35, color: '#E85D42' },
    { id: 'liner', label: 'Inner liner (airlaid 60gsm)', value: '$0.018', percentage: 30, color: '#2A9D8F' },
    { id: 'adhesive', label: 'Adhesive (bio-based)', value: '$0.003', percentage: 5, color: '#F4A261' },
    { id: 'packaging', label: 'Primary packaging (allocated)', value: '$0.010', percentage: 15, color: '#D84A32' },
    { id: 'conversion', label: 'Conversion/labor', value: '$0.012', percentage: 15, color: '#1D7068' }
  ];

  const pricingTiers = [
    { label: 'Standard', price: '$0.03-0.08', category: 'Commodity', color: '#9CA3AF' },
    { label: 'Premium (Earth Rated)', price: '$0.06-0.10', category: 'Current Premium', color: '#F4A261' },
    { label: 'Our Position', price: '$0.25-0.30', category: 'Super-Premium', color: '#2A9D8F', highlight: true }
  ];

  return (
    <div className="bg-white border-2 border-gray-200 rounded-2xl p-4 sm:p-6 lg:p-8 shadow-sm space-y-6 sm:space-y-8">
      <div className="text-center">
        <h3 className="text-xl sm:text-2xl font-bold mb-2 text-[#2D2D2D]">Unit Economics Detail</h3>
        <p className="text-sm sm:text-base text-[#2D2D2D]/70">Bill of Materials breakdown & pricing architecture</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Left Panel: BOM Breakdown */}
        <div className="space-y-4">
          <h4 className="text-base sm:text-lg font-bold text-[#2D2D2D] flex items-center gap-2">
            <div className="h-1 w-8 rounded-full bg-[#E85D42]"></div>
            Per-Bag COGS Breakdown
          </h4>

          {/* Interactive BOM List */}
          <div className="space-y-3">
            {bomItems.map((item) => (
              <div
                key={item.id}
                className="relative bg-[#F5F1E8] border-2 border-gray-200 rounded-xl p-4 transition-all hover:border-[#E85D42] hover:shadow-md cursor-pointer"
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-[#2D2D2D]">{item.label}</span>
                  <span className="text-lg font-bold text-[#2A9D8F]">{item.value}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${item.percentage}%`,
                        backgroundColor: item.color
                      }}
                    ></div>
                  </div>
                  <span className="text-xs font-bold text-[#2D2D2D]/60">{item.percentage}%</span>
                </div>
                {hoveredItem === item.id && (
                  <div className="absolute -top-2 -right-2 bg-[#E85D42] text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg animate-in fade-in zoom-in duration-200">
                    {item.percentage}% of total
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Total COGS */}
          <div className="bg-[#2A9D8F]/10 border-2 border-[#2A9D8F]/30 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <span className="text-base font-bold text-[#2D2D2D]">Total COGS (per bag)</span>
              <span className="text-2xl font-bold text-[#2A9D8F]">$0.053-0.076</span>
            </div>
          </div>
        </div>

        {/* Right Panel: Pricing Architecture */}
        <div className="space-y-4">
          <h4 className="text-base sm:text-lg font-bold text-[#2D2D2D] flex items-center gap-2">
            <div className="h-1 w-8 rounded-full bg-[#2A9D8F]"></div>
            Pricing Architecture
          </h4>

          {/* Pricing Tiers */}
          <div className="space-y-3">
            {pricingTiers.map((tier, index) => (
              <div
                key={index}
                className={`bg-white border-2 rounded-xl p-4 transition-all ${
                  tier.highlight
                    ? 'border-[#2A9D8F] bg-[#2A9D8F]/5 shadow-md'
                    : 'border-gray-200 hover:border-[#F4A261]'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <div className="text-sm font-bold text-[#2D2D2D]">{tier.label}</div>
                    <div className="text-xs text-[#2D2D2D]/60">{tier.category}</div>
                  </div>
                  <div className="text-2xl font-bold" style={{ color: tier.color }}>
                    {tier.price}
                  </div>
                </div>
                {tier.highlight && (
                  <div className="pt-3 border-t border-[#2A9D8F]/30">
                    <div className="flex items-center gap-2 text-xs text-[#2D2D2D]/70">
                      <div className="h-1.5 w-1.5 rounded-full bg-[#2A9D8F]"></div>
                      <span>This is diaper economics, not trash bag economics</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Pack Economics */}
          <div className="bg-[#F5F1E8] border-2 border-gray-200 rounded-xl p-4">
            <h5 className="text-sm font-bold text-[#2D2D2D] mb-3">Pack-Level Economics</h5>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-[#2D2D2D]/70">60-bag pack retail:</span>
                <span className="font-bold text-[#2D2D2D]">$15-18</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#2D2D2D]/70">Wholesale (50% margin):</span>
                <span className="font-bold text-[#2D2D2D]">~$7.50-9.00</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#2D2D2D]/70">COGS per pack:</span>
                <span className="font-bold text-[#2D2D2D]">$3.18-4.56</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-gray-300">
                <span className="text-[#2D2D2D] font-bold">Gross Margin:</span>
                <span className="text-2xl font-bold text-[#2A9D8F]">44-50%</span>
              </div>
            </div>
          </div>

          {/* Starter Kit */}
          <div className="bg-[#E85D42]/5 border-2 border-[#E85D42]/30 rounded-xl p-4">
            <h5 className="text-sm font-bold text-[#2D2D2D] mb-3">Starter Kit Economics</h5>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-[#2D2D2D]/70">Retail price:</span>
                <span className="font-bold text-[#E85D42]">$24.99</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#2D2D2D]/70">Contents:</span>
                <span className="font-bold text-[#2D2D2D]">Dispenser + 2 packs</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#2D2D2D]/70">Margin:</span>
                <span className="font-bold text-[#E85D42]">Break-even CAC</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Key Insight */}
      <div className="bg-[#2A9D8F]/5 border-2 border-[#2A9D8F]/30 rounded-xl p-4 sm:p-5">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 mt-1">
            <svg className="w-5 h-5 text-[#2A9D8F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
          <div>
            <h5 className="text-sm font-bold text-[#2D2D2D] mb-1">Path to Margin Expansion</h5>
            <p className="text-xs sm:text-sm text-[#2D2D2D]/80 leading-relaxed">
              Current margins assume pilot/beta production volumes (5K-10K units). At scale (50K+ units), material costs drop 15-25%, conversion costs drop 20-30%, and packaging costs drop 10-15%. Target gross margins at scale: 50-55%, creating room for retail distribution, marketing spend, and strong unit economics.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
