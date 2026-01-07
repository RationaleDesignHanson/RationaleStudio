// components/AtAGlance.tsx - Compact version for Heirloom

export default function AtAGlance() {
  return (
    <div className="rounded-xl border-2 border-[#E85D4D] bg-gradient-to-br from-[#F5F1E8] to-white p-5 md:p-6 shadow-xl">
      {/* Header */}
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E85D4D] text-lg font-bold text-white">
          H
        </div>
        <h3 className="text-xl font-bold text-[#2D2D2D]">At a Glance</h3>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        <div className="rounded-lg border border-[#E85D4D]/20 bg-white p-3">
          <div className="text-[10px] font-semibold uppercase tracking-wide text-gray-500 mb-1">Platform</div>
          <div className="text-lg md:text-xl font-bold text-[#E85D4D] leading-tight">Native iOS</div>
          <div className="text-[10px] text-gray-500 mt-0.5">SwiftUI + SwiftData</div>
        </div>

        <div className="rounded-lg border border-[#E85D4D]/20 bg-white p-3">
          <div className="text-[10px] font-semibold uppercase tracking-wide text-gray-500 mb-1">Market</div>
          <div className="text-lg md:text-xl font-bold text-[#E85D4D] leading-tight">$4.2B</div>
          <div className="text-[10px] text-gray-500 mt-0.5">Recipe app TAM</div>
        </div>

        <div className="rounded-lg border border-[#E85D4D]/20 bg-white p-3">
          <div className="text-[10px] font-semibold uppercase tracking-wide text-gray-500 mb-1">Status</div>
          <div className="text-lg md:text-xl font-bold text-[#E85D4D] leading-tight">Beta</div>
          <div className="text-[10px] text-gray-500 mt-0.5">TestFlight active</div>
        </div>
      </div>

      {/* Challenge + Solution - Single line */}
      <div className="text-sm text-gray-700 mb-4 leading-relaxed">
        <span className="text-[#2D2D2D] font-medium">Challenge:</span> Recipe apps treat recipes like data—plain text, no personality.{' '}
        <span className="text-[#2D2D2D] font-medium">Solution:</span> Preserve recipes as beautiful artifacts with vintage cards, stickers, and handwritten annotations.
      </div>

      {/* Key Capabilities - 2x2 grid */}
      <div className="border-t border-[#E85D4D]/20 pt-4">
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="flex items-start gap-1.5">
            <span className="text-[#E85D4D] mt-0.5">•</span>
            <span className="text-gray-600"><strong className="text-[#2D2D2D]">AI Capture:</strong> Claude + vision models</span>
          </div>
          <div className="flex items-start gap-1.5">
            <span className="text-[#E85D4D] mt-0.5">•</span>
            <span className="text-gray-600"><strong className="text-[#2D2D2D]">500+ Sites:</strong> Recipe-LD import</span>
          </div>
          <div className="flex items-start gap-1.5">
            <span className="text-[#E85D4D] mt-0.5">•</span>
            <span className="text-gray-600"><strong className="text-[#2D2D2D]">Smart Lists:</strong> iOS Reminders sync</span>
          </div>
          <div className="flex items-start gap-1.5">
            <span className="text-[#E85D4D] mt-0.5">•</span>
            <span className="text-gray-600"><strong className="text-[#2D2D2D]">CloudKit:</strong> Seamless iCloud sync</span>
          </div>
        </div>
      </div>
    </div>
  )
}
