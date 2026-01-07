// components/AtAGlance.tsx - Compact version

export default function AtAGlance() {
  return (
    <div className="rounded-xl border-2 border-terminal-gold bg-gradient-to-br from-gray-900 to-gray-800 p-5 md:p-6 shadow-xl">
      {/* Header */}
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-terminal-gold text-lg font-bold text-black">
          Z
        </div>
        <h3 className="text-xl font-bold text-white">At a Glance</h3>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        <div className="rounded-lg border border-terminal-gold/20 bg-gray-800/50 p-3">
          <div className="text-[10px] font-semibold uppercase tracking-wide text-gray-500 mb-1">Platform</div>
          <div className="text-lg md:text-xl font-bold text-terminal-gold leading-tight">All Devices</div>
          <div className="text-[10px] text-gray-400 mt-0.5">Phone, Tablet, Watch, Web</div>
        </div>

        <div className="rounded-lg border border-terminal-gold/20 bg-gray-800/50 p-3">
          <div className="text-[10px] font-semibold uppercase tracking-wide text-gray-500 mb-1">AI Power</div>
          <div className="text-lg md:text-xl font-bold text-terminal-gold leading-tight">43 / 168</div>
          <div className="text-[10px] text-gray-400 mt-0.5">Intents / Actions</div>
        </div>

        <div className="rounded-lg border border-terminal-gold/20 bg-gray-800/50 p-3">
          <div className="text-[10px] font-semibold uppercase tracking-wide text-gray-500 mb-1">Status</div>
          <div className="text-lg md:text-xl font-bold text-terminal-gold leading-tight">Alpha</div>
          <div className="text-[10px] text-gray-400 mt-0.5">Invite only</div>
        </div>
      </div>

      {/* Challenge + Solution - Single line */}
      <div className="text-sm text-gray-300 mb-4 leading-relaxed">
        <span className="text-white font-medium">Challenge:</span> Hidden work buried in 47 daily emails.{' '}
        <span className="text-white font-medium">Solution:</span> AI extracts actions as swipeable cards—complete, archive, or snooze with a swipe.
      </div>

      {/* Key Capabilities - 2x2 grid */}
      <div className="border-t border-terminal-gold/20 pt-4">
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="flex items-start gap-1.5">
            <span className="text-terminal-gold mt-0.5">•</span>
            <span className="text-gray-300"><strong className="text-white">Swipe UI:</strong> Card-based triage</span>
          </div>
          <div className="flex items-start gap-1.5">
            <span className="text-terminal-gold mt-0.5">•</span>
            <span className="text-gray-300"><strong className="text-white">AI Classification:</strong> 43 intent categories</span>
          </div>
          <div className="flex items-start gap-1.5">
            <span className="text-terminal-gold mt-0.5">•</span>
            <span className="text-gray-300"><strong className="text-white">Gmail OAuth:</strong> Secure, read-only</span>
          </div>
          <div className="flex items-start gap-1.5">
            <span className="text-terminal-gold mt-0.5">•</span>
            <span className="text-gray-300"><strong className="text-white">Universal:</strong> One codebase, all platforms</span>
          </div>
        </div>
      </div>
    </div>
  )
}
