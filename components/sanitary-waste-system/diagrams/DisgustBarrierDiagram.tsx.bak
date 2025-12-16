/**
 * Disgust Barrier Info Card
 * Simple card-based visualization of the problem
 * Shows sensory pain points and behavioral consequences
 */

'use client';

export default function DisgustBarrierDiagram() {
  const painPoints = [
    {
      number: '01',
      problem: 'Heat Transfer',
      detail: 'Through thin film (13-20 microns)',
      consequence: 'Dread walks',
      color: 'border-[#E85D42]/30 bg-[#E85D42]/5',
      accentColor: '#E85D42'
    },
    {
      number: '02',
      problem: 'Moisture Pressure',
      detail: 'Smear risk during pickup',
      consequence: 'Avoid pickup situations',
      color: 'border-[#2A9D8F]/30 bg-[#2A9D8F]/5',
      accentColor: '#2A9D8F'
    },
    {
      number: '03',
      problem: 'Odor Anxiety',
      detail: 'During carry-time',
      consequence: 'Feel embarrassed in public',
      color: 'border-[#F4A261]/30 bg-[#F4A261]/5',
      accentColor: '#F4A261'
    },
    {
      number: '04',
      problem: 'Loose Stool',
      detail: 'Makes everything worse',
      consequence: 'Overuse plastic (double-bagging)',
      color: 'border-[#E76F51]/30 bg-[#E76F51]/5',
      accentColor: '#E76F51'
    }
  ];

  return (
    <div className="bg-white border-2 border-gray-200 rounded-2xl p-4 sm:p-6 lg:p-8 shadow-sm">
      <div className="text-center mb-6 sm:mb-8">
        <h3 className="text-xl sm:text-2xl font-bold mb-2 text-[#2D2D2D]">The Disgust Barrier</h3>
        <p className="text-sm sm:text-base text-[#2D2D2D]/70">Sensory pain points trigger avoidance behaviors</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {painPoints.map((point, index) => (
          <div
            key={index}
            className={`border-2 ${point.color} rounded-2xl p-4 sm:p-5 transition-all hover:border-opacity-60`}
          >
            <div className="flex items-start gap-3 sm:gap-4 mb-3">
              <div
                className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center font-bold text-sm sm:text-base"
                style={{
                  backgroundColor: `${point.accentColor}15`,
                  color: point.accentColor,
                  border: `2px solid ${point.accentColor}30`
                }}
              >
                {point.number}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-base sm:text-lg text-[#2D2D2D] mb-1">{point.problem}</h4>
                <p className="text-xs sm:text-sm text-[#2D2D2D]/60">{point.detail}</p>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-gray-200">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" style={{ color: point.accentColor }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
                <span className="text-xs sm:text-sm font-medium text-[#2D2D2D]/80">{point.consequence}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t-2 border-gray-200">
        <div className="bg-[#F5F1E8] rounded-2xl p-4 sm:p-5 border-2 border-gray-200">
          <p className="text-sm sm:text-base text-[#2D2D2D]/80 text-center">
            <span className="font-semibold text-[#2D2D2D]">Real behavior:</span> People already hack around it with double-bagging and leaves/grass lining.
            <span className="block mt-2 text-[#2D2D2D]/70">This isn't convenience. It's disgust sensitivity.</span>
          </p>
        </div>
      </div>
    </div>
  );
}
