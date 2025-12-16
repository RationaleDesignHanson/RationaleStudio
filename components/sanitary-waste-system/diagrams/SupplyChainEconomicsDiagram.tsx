/**
 * Supply Chain & Economics Diagram
 * Material sourcing, geography, and CAPEX information
 */

'use client';

export default function SupplyChainEconomicsDiagram() {
  const materialSources = [
    {
      category: 'Bioplastic Film',
      suppliers: 'BASF (Ecoflex), Novamont (Mater-Bi), Asian PBAT suppliers',
      note: 'Buy finished film from converter vs raw resin for small-scale'
    },
    {
      category: 'Airlaid Non-Woven',
      suppliers: 'Glatfelter, McAirlaids, Chinese equivalents',
      note: '60-80 GSM, latex-bonded for wet strength'
    },
    {
      category: 'Adhesives',
      suppliers: 'Henkel, H.B. Fuller, eco-adhesive specialists',
      note: 'Bio-based hot melt for compostability certification'
    }
  ];

  const geographyOptions = [
    { region: 'China/Turkey', advantage: 'Cost-optimized', capex: '$40K-80K mid-range' },
    { region: 'USA', advantage: 'Speed + Quality control', capex: '$80K-250K+ premium' }
  ];

  return (
    <div className="bg-white border-2 border-gray-200 rounded-2xl p-4 sm:p-6 lg:p-8 shadow-sm space-y-6 sm:space-y-8">
      <div className="text-center">
        <h3 className="text-xl sm:text-2xl font-bold mb-2 text-[#2D2D2D]">Supply Chain & Economics</h3>
        <p className="text-sm sm:text-base text-[#2D2D2D]/70">Strategic sourcing for pilot through scale</p>
      </div>

      {/* Supply Chain & Material Sourcing */}
      <div>
        <h4 className="text-base sm:text-lg font-bold text-[#2D2D2D] mb-4 flex items-center gap-2">
          <div className="h-1 w-8 rounded-full bg-[#E85D42]"></div>
          Material Sourcing
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
          {materialSources.map((source, index) => (
            <div key={index} className="bg-white border-2 border-gray-200 rounded-2xl p-4 shadow-sm">
              <h5 className="text-sm font-bold text-[#2D2D2D] mb-2">{source.category}</h5>
              <p className="text-xs text-[#2D2D2D]/70 mb-2 leading-relaxed">{source.suppliers}</p>
              <div className="pt-2 border-t border-gray-200">
                <p className="text-xs text-[#2D2D2D]/60 italic">{source.note}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Geography & CAPEX */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <div className="bg-[#F5F1E8] border-2 border-gray-200 rounded-2xl p-4 sm:p-5">
          <h5 className="text-sm font-bold text-[#2D2D2D] mb-3">Geographic Options</h5>
          <div className="space-y-3">
            {geographyOptions.map((option, index) => (
              <div key={index} className="flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-[#2D2D2D]">{option.region}</span>
                  <span className="text-xs text-[#2D2D2D]/60">{option.advantage}</span>
                </div>
                <div className="text-xs text-[#2A9D8F] font-medium">{option.capex}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#F5F1E8] border-2 border-gray-200 rounded-2xl p-4 sm:p-5">
          <h5 className="text-sm font-bold text-[#2D2D2D] mb-3">Manufacturing Economics</h5>
          <div className="space-y-3 text-xs sm:text-sm">
            <div className="flex justify-between items-start">
              <span className="text-[#2D2D2D]/70">Custom dies:</span>
              <span className="text-[#2D2D2D] font-medium">$5K-10K</span>
            </div>
            <div className="flex justify-between items-start">
              <span className="text-[#2D2D2D]/70">Entry-level semi-auto:</span>
              <span className="text-[#2D2D2D] font-medium">&lt;$15K</span>
            </div>
            <div className="flex justify-between items-start">
              <span className="text-[#2D2D2D]/70">Mid-range modified line:</span>
              <span className="text-[#2D2D2D] font-medium">$40K-80K</span>
            </div>
            <div className="flex justify-between items-start">
              <span className="text-[#2D2D2D]/70">High-end European:</span>
              <span className="text-[#2D2D2D] font-medium">$250K+</span>
            </div>
          </div>
        </div>
      </div>

      {/* Phase Strategy */}
      <div className="bg-[#E85D42]/5 border-2 border-[#E85D42]/30 rounded-2xl p-4 sm:p-5">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 mt-1">
            <svg className="w-5 h-5 text-[#E85D42]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
          <div>
            <h5 className="text-sm font-bold text-[#2D2D2D] mb-1">Phased Approach</h5>
            <p className="text-xs sm:text-sm text-[#2D2D2D]/80 leading-relaxed">
              <span className="font-semibold">Phase 1 (Pilot):</span> Buy finished films and airlaid rolls. Small-batch manual assembly or entry-level equipment ($5K-15K total).
              <span className="block mt-2 font-semibold">Phase 2 (Beta):</span> Partner with converter for 5K-10K pilot run. Chinese mid-range equipment if moving in-house.
              <span className="block mt-2 font-semibold">Phase 3 (Scale):</span> Dedicated high-speed line or long-term converter partnership based on unit economics.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
