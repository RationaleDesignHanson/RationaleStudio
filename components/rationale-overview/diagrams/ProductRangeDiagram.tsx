/**
 * Product Range Diagram
 * Compact side-by-side comparison showing Zero and Heirloom
 * Problem → Solution → Impact for each product
 */

'use client';

export default function ProductRangeDiagram() {
  return (
    <div className="space-y-4 sm:space-y-6">

      {/* Side-by-Side Product Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* Zero Column */}
        <div className="bg-[var(--color-zero-cyan)]/5 border-2 border-[var(--color-zero-cyan)]/30 rounded-lg p-4 sm:p-5">
          <div className="mb-3 sm:mb-4">
            <div className="text-base sm:text-lg font-bold text-white mb-1">Zero</div>
            <div className="text-[10px] sm:text-xs text-gray-400">AI Email Triage • Live on App Store</div>
          </div>

          <div className="space-y-3 sm:space-y-4">
            {/* Problem */}
            <div>
              <div className="text-[10px] sm:text-xs font-mono text-red-400 mb-1 uppercase tracking-wide">Problem</div>
              <div className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                Busy professionals get 200+ emails daily. Flight confirmations, package tracking, and meeting follow-ups buried in promotional noise. They spend 45 minutes each morning just figuring out what needs attention.
              </div>
            </div>

            {/* Solution */}
            <div>
              <div className="text-[10px] sm:text-xs font-mono text-[var(--color-zero-cyan)] mb-1 uppercase tracking-wide">What We Built</div>
              <div className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                AI automatically categorizes emails and extracts actions (tracking numbers, flight details, deadlines). Swipeable triage interface. Smart notifications for only what matters.
              </div>
            </div>

            {/* Impact */}
            <div className="pt-3 border-t border-[var(--color-zero-cyan)]/20">
              <div className="text-[10px] sm:text-xs font-mono text-[var(--color-zero-cyan)] mb-2 uppercase tracking-wide">Impact</div>
              <div className="flex items-baseline gap-2 mb-2">
                <div className="text-2xl sm:text-3xl font-black text-white">45 → 5</div>
                <div className="text-xs sm:text-sm text-gray-400">minutes daily</div>
              </div>
              <div className="text-[10px] sm:text-xs text-gray-400">Real users saving 6+ hours weekly</div>
            </div>
          </div>
        </div>

        {/* Heirloom Column */}
        <div className="bg-terminal-gold/5 border-2 border-terminal-gold/30 rounded-lg p-4 sm:p-5">
          <div className="mb-3 sm:mb-4">
            <div className="text-base sm:text-lg font-bold text-white mb-1">Heirloom</div>
            <div className="text-[10px] sm:text-xs text-gray-400">Recipe Preservation • Shipped & Live</div>
          </div>

          <div className="space-y-3 sm:space-y-4">
            {/* Problem */}
            <div>
              <div className="text-[10px] sm:text-xs font-mono text-red-400 mb-1 uppercase tracking-wide">Problem</div>
              <div className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                Family recipes scattered across camera rolls, Safari bookmarks, text messages. Handwritten recipe cards from grandparents fading. No way to organize, preserve, or share with loved ones.
              </div>
            </div>

            {/* Solution */}
            <div>
              <div className="text-[10px] sm:text-xs font-mono text-terminal-gold mb-1 uppercase tracking-wide">What We Built</div>
              <div className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                AI scans recipes from any photo (handwritten or printed). Vintage-inspired digital cookbook with iCloud sync. Share collections with family. Beautiful design that honors emotional value.
              </div>
            </div>

            {/* Impact */}
            <div className="pt-3 border-t border-terminal-gold/20">
              <div className="text-[10px] sm:text-xs font-mono text-terminal-gold mb-2 uppercase tracking-wide">Impact</div>
              <div className="text-xl sm:text-2xl font-black text-white mb-2">Modern Utility</div>
              <div className="text-[10px] sm:text-xs text-gray-400">Solves real human problems—preserving family recipes, organizing kitchen life, sharing culinary knowledge</div>
            </div>
          </div>
        </div>

      </div>

      {/* What This Proves */}
      <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 sm:p-5">
        <div className="text-[10px] sm:text-xs font-mono text-terminal-gold mb-3 uppercase tracking-wide">What This Range Proves</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
          <div>
            <div className="text-sm font-semibold text-white mb-1">Different Problem Spaces</div>
            <div className="text-[10px] sm:text-xs text-gray-400 leading-relaxed">Productivity tool vs. emotional preservation app. Both validated with build-to-think methodology.</div>
          </div>
          <div>
            <div className="text-sm font-semibold text-white mb-1">Real Products, Real Users</div>
            <div className="text-[10px] sm:text-xs text-gray-400 leading-relaxed">Not demos. Both shipped to production with real people using them daily. Live proof of execution.</div>
          </div>
          <div>
            <div className="text-sm font-semibold text-white mb-1">Studio That Ships</div>
            <div className="text-[10px] sm:text-xs text-gray-400 leading-relaxed">We don't show decks about what we could build. We work in shipped products. Same approach you get.</div>
          </div>
        </div>
      </div>

    </div>
  );
}
