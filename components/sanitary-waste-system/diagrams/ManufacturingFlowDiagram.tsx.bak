/**
 * Manufacturing Strategy Component
 * Static informative layout presenting manufacturing partners, process flow, and supply chain
 */

'use client';

export default function ManufacturingFlowDiagram() {
  const processSteps = [
    { name: 'Web Unwind', description: 'Two webs (plastic + paper) unwound simultaneously' },
    { name: 'Cut & Place', description: 'Paper cut into sheets, placed on plastic via vacuum drum' },
    { name: 'Hot Melt Bonding', description: 'Bio-based adhesive applied just before placement' },
    { name: 'Interfolding', description: 'V-fold or Z-fold machine creates pop-up format' },
    { name: 'Cutting & Stacking', description: 'Continuous stream cut into 15-20 count packs' }
  ];

  const partnerTypes = [
    {
      type: 'Type A: Wet Wipe Manufacturers',
      fit: 'Best Fit',
      description: 'Experts in airlaid/non-wovens and interfolding. Run "dry line" with bioplastic film instead of standard packaging.',
      advantages: ['Airlaid handling expertise', 'Interfolding capability', 'Hygiene product experience'],
      color: 'border-[#2A9D8F]',
      bgColor: 'bg-[#2A9D8F]/5'
    },
    {
      type: 'Type B: Flexible Packaging Converters',
      fit: 'Alternative',
      description: 'Lamination and bag-making expertise. May struggle with thick paper component but understand film processing.',
      advantages: ['Film expertise', 'Sealing capabilities', 'Pouch manufacturing'],
      color: 'border-[#F4A261]',
      bgColor: 'bg-[#F4A261]/5'
    },
    {
      type: 'Type C: Label Converters',
      fit: 'Viable Option',
      description: 'Tipping capabilities. Slower batch process for applying liner inside bag, similar to transdermal patch manufacturing.',
      advantages: ['Cut-and-place technology', 'Precision application', 'Small batch flexibility'],
      color: 'border-gray-300',
      bgColor: 'bg-gray-50'
    }
  ];

  return (
    <div className="bg-white border-2 border-gray-200 rounded-2xl p-4 sm:p-6 lg:p-8 shadow-sm space-y-6 sm:space-y-8">
      <div className="text-center">
        <h3 className="text-xl sm:text-2xl font-bold mb-2 text-[#2D2D2D]">Manufacturing Strategy</h3>
        <p className="text-sm sm:text-base text-[#2D2D2D]/70">Partner with converters—don't build factories early</p>
      </div>

      {/* Process Flow */}
      <div>
        <h4 className="text-base sm:text-lg font-bold text-[#2D2D2D] mb-4 flex items-center gap-2">
          <div className="h-1 w-8 rounded-full bg-[#E85D42]"></div>
          Interfolded Manufacturing Process
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 sm:gap-4">
          {processSteps.map((step, index) => (
            <div key={index} className="relative">
              <div className="bg-white border-2 border-gray-200 rounded-2xl p-3 sm:p-4 text-center shadow-sm hover:border-[#E85D42] transition-all h-full flex flex-col">
                <div className="flex-shrink-0 mb-2">
                  <div className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-[#E85D42]/10 border-2 border-[#E85D42]/30 text-[#E85D42] font-bold text-sm">
                    {index + 1}
                  </div>
                </div>
                <div className="text-sm sm:text-sm font-bold text-[#2D2D2D] mb-2">{step.name}</div>
                <div className="text-xs sm:text-sm text-[#2D2D2D]/60 leading-relaxed">{step.description}</div>
              </div>
              {index < processSteps.length - 1 && (
                <div className="hidden md:flex absolute top-1/2 -right-2 transform -translate-y-1/2 z-10">
                  <svg className="w-4 h-4 text-[#2A9D8F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Manufacturing Partner Types */}
      <div>
        <h4 className="text-base sm:text-lg font-bold text-[#2D2D2D] mb-4 flex items-center gap-2">
          <div className="h-1 w-8 rounded-full bg-[#E85D42]"></div>
          Contract Manufacturing Partners
        </h4>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {partnerTypes.map((partner, index) => (
            <div key={index} className={`${partner.bgColor} border-2 ${partner.color} rounded-2xl p-4 sm:p-5 shadow-sm`}>
              <div className="mb-3">
                <div className="flex items-center justify-between mb-2">
                  <h5 className="text-sm sm:text-base font-bold text-[#2D2D2D]">{partner.type}</h5>
                  <span className={`text-xs px-2 py-1 rounded-full ${partner.fit === 'Best Fit' ? 'bg-[#2A9D8F]/20 text-[#2A9D8F]' : 'bg-gray-200 text-[#2D2D2D]/70'} font-medium`}>
                    {partner.fit}
                  </span>
                </div>
                <p className="text-sm sm:text-sm text-[#2D2D2D]/70 leading-relaxed">{partner.description}</p>
              </div>
              <div className="space-y-2">
                {partner.advantages.map((advantage, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-[#E85D42] flex-shrink-0"></div>
                    <span className="text-xs sm:text-sm text-[#2D2D2D]/80">{advantage}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Key Insight */}
      <div className="bg-[#E85D42]/5 border-2 border-[#E85D42]/30 rounded-2xl p-4 sm:p-5">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 mt-1">
            <svg className="w-5 h-5 text-[#E85D42]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h5 className="text-sm font-bold text-[#2D2D2D] mb-1">Strategic Insight</h5>
            <p className="text-xs sm:text-sm text-[#2D2D2D]/80 leading-relaxed">
              Partner with nonwoven hygiene converters who already run similar lines (wet wipes, tissues, sanitary products). Ask for pilot run + path to automation. Wet wipe manufacturers are the best fit—they understand airlaid handling and interfolding technology.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
