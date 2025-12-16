/**
 * Competitive Positioning Diagram
 * 2x2 matrix showing competitive landscape and blue ocean opportunity
 */

'use client';

export default function CompetitivePositioningDiagram() {
  const competitors = [
    { name: 'Standard HDPE', x: 15, y: 80, color: '#9CA3AF', issue: 'Cheap, gross, guilt' },
    { name: 'Earth Rated', x: 35, y: 60, color: '#9CA3AF', issue: 'Scent masks, still thin' },
    { name: 'Flush Puppies', x: 70, y: 45, color: '#F87171', issue: 'Dissolves in rain' },
    { name: 'PoopShark', x: 75, y: 40, color: '#F87171', issue: 'Rigid, bulky' },
    { name: 'Us', x: 85, y: 85, color: '#2A9D8F', highlight: true, value: 'Blue Ocean' }
  ];

  return (
    <div className="bg-white border-2 border-gray-200 rounded-2xl p-4 sm:p-6 lg:p-8 shadow-sm space-y-6 sm:space-y-8">
      <div className="text-center">
        <h3 className="text-xl sm:text-2xl font-bold mb-2 text-[#2D2D2D]">Competitive Positioning</h3>
        <p className="text-sm sm:text-base text-[#2D2D2D]/70">Blue ocean opportunity at premium + sanitary intersection</p>
      </div>

      {/* 2x2 Matrix */}
      <div className="w-full max-w-2xl mx-auto" style={{ aspectRatio: '1/1' }}>
        <div className="relative bg-[#F5F1E8] border-2 border-gray-200 rounded-2xl p-8 sm:p-12 h-full w-full">
        {/* Axes */}
        <div className="absolute inset-0 flex items-center justify-center p-8 sm:p-12">
          {/* Vertical axis line */}
          <div className="absolute left-1/2 top-8 sm:top-12 bottom-8 sm:bottom-12 w-0.5 bg-[#2D2D2D]/20"></div>
          {/* Horizontal axis line */}
          <div className="absolute top-1/2 left-8 sm:left-12 right-8 sm:right-12 h-0.5 bg-[#2D2D2D]/20"></div>
        </div>

        {/* Y-axis label (Sanitary Performance) */}
        <div className="absolute left-2 top-1/2 -translate-y-1/2 -rotate-90 origin-center">
          <span className="text-xs sm:text-sm font-bold text-[#2D2D2D]/70 uppercase tracking-wider">Sanitary Performance</span>
        </div>
        <div className="absolute left-1 top-4 sm:top-8 text-xs text-[#2D2D2D]/50">High</div>
        <div className="absolute left-1 bottom-4 sm:bottom-8 text-xs text-[#2D2D2D]/50">Low</div>

        {/* X-axis label (Price/Premium) */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2">
          <span className="text-xs sm:text-sm font-bold text-[#2D2D2D]/70 uppercase tracking-wider">Price Positioning</span>
        </div>
        <div className="absolute bottom-1 left-4 sm:left-8 text-xs text-[#2D2D2D]/50">Commodity</div>
        <div className="absolute bottom-1 right-4 sm:right-8 text-xs text-[#2D2D2D]/50">Premium</div>

        {/* Competitors plotted */}
        <div className="absolute inset-0 p-8 sm:p-12">
          {competitors.map((comp, index) => (
            <div
              key={index}
              className="absolute"
              style={{
                left: `${comp.x}%`,
                bottom: `${comp.y}%`,
                transform: 'translate(-50%, 50%)'
              }}
            >
              {/* Dot */}
              <div className={`relative ${comp.highlight ? 'z-10' : 'z-0'}`}>
                <div
                  className={`rounded-full transition-all ${
                    comp.highlight
                      ? 'w-5 h-5 sm:w-6 sm:h-6 border-4 border-[#2A9D8F] bg-[#2A9D8F] shadow-lg'
                      : 'w-3 h-3 sm:w-4 sm:h-4 border-2'
                  }`}
                  style={{
                    backgroundColor: comp.color,
                    borderColor: comp.color
                  }}
                ></div>

                {/* Label */}
                <div
                  className={`absolute top-full mt-2 whitespace-nowrap ${
                    comp.highlight ? 'font-bold' : ''
                  }`}
                  style={{
                    left: '50%',
                    transform: 'translateX(-50%)'
                  }}
                >
                  <div
                    className={`text-xs sm:text-sm text-center ${
                      comp.highlight
                        ? 'text-[#2A9D8F] font-bold px-2 py-1 bg-[#2A9D8F]/10 rounded-lg border-2 border-[#2A9D8F]/30'
                        : 'text-[#2D2D2D]/70'
                    }`}
                  >
                    {comp.name}
                  </div>
                  {!comp.highlight && comp.issue && (
                    <div className="text-[10px] text-[#2D2D2D]/50 text-center mt-0.5 italic">
                      {comp.issue}
                    </div>
                  )}
                  {comp.highlight && comp.value && (
                    <div className="text-[10px] sm:text-xs text-[#2A9D8F] text-center mt-0.5 font-medium">
                      {comp.value}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Blue Ocean Zone Highlight */}
        <div
          className="absolute rounded-2xl border-2 border-dashed border-[#2A9D8F]/30 bg-[#2A9D8F]/5 pointer-events-none"
          style={{
            right: '12%',
            top: '12%',
            width: '35%',
            height: '35%'
          }}
        ></div>
        </div>
      </div>

      {/* Legend */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-[#F5F1E8] border-2 border-gray-200 rounded-2xl p-4">
          <h5 className="text-sm font-bold text-[#2D2D2D] mb-3">Why Competitors Fail</h5>
          <div className="space-y-2 text-xs sm:text-sm">
            <div className="flex items-start gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-gray-400 flex-shrink-0 mt-1.5"></div>
              <span className="text-[#2D2D2D]/70"><span className="font-medium">Standard HDPE:</span> Cheap but gross, environmental guilt</span>
            </div>
            <div className="flex items-start gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-gray-400 flex-shrink-0 mt-1.5"></div>
              <span className="text-[#2D2D2D]/70"><span className="font-medium">Earth Rated:</span> Scent masks but doesn't eliminate</span>
            </div>
            <div className="flex items-start gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-red-400 flex-shrink-0 mt-1.5"></div>
              <span className="text-[#2D2D2D]/70"><span className="font-medium">Flush Puppies:</span> Dissolves in rain/wet grass</span>
            </div>
            <div className="flex items-start gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-red-400 flex-shrink-0 mt-1.5"></div>
              <span className="text-[#2D2D2D]/70"><span className="font-medium">PoopShark:</span> Rigid, bulky, different scooping motion</span>
            </div>
          </div>
        </div>

        <div className="bg-[#2A9D8F]/5 border-2 border-[#2A9D8F]/30 rounded-2xl p-4">
          <h5 className="text-sm font-bold text-[#2D2D2D] mb-3">Our Blue Ocean</h5>
          <div className="space-y-2 text-xs sm:text-sm">
            <div className="flex items-start gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-[#2A9D8F] flex-shrink-0 mt-1.5"></div>
              <span className="text-[#2D2D2D]/80">Familiar bag mechanics (no behavior change)</span>
            </div>
            <div className="flex items-start gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-[#2A9D8F] flex-shrink-0 mt-1.5"></div>
              <span className="text-[#2D2D2D]/80">True sanitary insulation (paper liner)</span>
            </div>
            <div className="flex items-start gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-[#2A9D8F] flex-shrink-0 mt-1.5"></div>
              <span className="text-[#2D2D2D]/80">Premium system with ecosystem lock-in</span>
            </div>
            <div className="flex items-start gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-[#2A9D8F] flex-shrink-0 mt-1.5"></div>
              <span className="text-[#2D2D2D]/80">Super-premium positioning justifies price</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
