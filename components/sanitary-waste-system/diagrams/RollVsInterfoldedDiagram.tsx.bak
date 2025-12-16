/**
 * Roll vs Interfolded Format Comparison Diagram
 * Shows manufacturing constraints and UX benefits
 */

'use client';

export default function RollVsInterfoldedDiagram() {
  return (
    <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 sm:p-8 shadow-sm">
      <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
        {/* Roll Format - Problems */}
        <div className="space-y-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-8 w-8 rounded-full bg-[#E85D42]/20 flex items-center justify-center border-2 border-[#E85D42]/30">
              <svg className="w-5 h-5 text-[#E85D42]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-[#2D2D2D]">Roll Format</h3>
          </div>

          <div className="aspect-square bg-[#F5F1E8] rounded-2xl flex items-center justify-center border-2 border-gray-200">
            <svg className="w-32 h-32 text-[#2D2D2D]/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="8" strokeWidth="2" />
              <circle cx="12" cy="12" r="6" strokeWidth="2" />
              <circle cx="12" cy="12" r="4" strokeWidth="2" />
              <path d="M12 4 L12 20" strokeWidth="1" strokeDasharray="2,2" />
            </svg>
          </div>

          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <span className="text-[#E85D42] mt-1 font-bold">•</span>
              <span className="text-[#2D2D2D]/70">Telescoping (center pushes out)</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-[#E85D42] mt-1 font-bold">•</span>
              <span className="text-[#2D2D2D]/70">Web tension mismatch</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-[#E85D42] mt-1 font-bold">•</span>
              <span className="text-[#2D2D2D]/70">Perforation failure</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-[#E85D42] mt-1 font-bold">•</span>
              <span className="text-[#2D2D2D]/70">10-20x thicker than standard</span>
            </div>
          </div>
        </div>

        {/* Interfolded Format - Solutions */}
        <div className="space-y-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-8 w-8 rounded-full bg-[#2A9D8F]/20 flex items-center justify-center border-2 border-[#2A9D8F]/30">
              <svg className="w-5 h-5 text-[#2A9D8F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-[#2D2D2D]">Interfolded Flat Pack</h3>
          </div>

          <div className="aspect-square bg-[#2A9D8F]/5 rounded-2xl flex items-center justify-center border-2 border-[#2A9D8F]/30">
            <svg className="w-32 h-32 text-[#2A9D8F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <rect x="6" y="8" width="12" height="2" fill="currentColor" opacity="0.8" />
              <rect x="6" y="11" width="12" height="2" fill="currentColor" opacity="0.6" />
              <rect x="6" y="14" width="12" height="2" fill="currentColor" opacity="0.4" />
              <path d="M9 7 L9 17" strokeWidth="1" strokeDasharray="2,2" opacity="0.3" />
              <path d="M15 7 L15 17" strokeWidth="1" strokeDasharray="2,2" opacity="0.3" />
            </svg>
          </div>

          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <span className="text-[#2A9D8F] mt-1 font-bold">✓</span>
              <span className="text-[#2D2D2D]/80">No winding issues</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-[#2A9D8F] mt-1 font-bold">✓</span>
              <span className="text-[#2D2D2D]/80">Pop-up dispensing</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-[#2A9D8F] mt-1 font-bold">✓</span>
              <span className="text-[#2D2D2D]/80">One-handed use</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-[#2A9D8F] mt-1 font-bold">✓</span>
              <span className="text-[#2D2D2D]/80">Premium UX</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 pt-6 border-t-2 border-gray-200">
        <p className="text-center text-[#2D2D2D]/70 text-sm">
          Interfolded format leverages proven tissue/wipe manufacturing technology
        </p>
      </div>
    </div>
  );
}
