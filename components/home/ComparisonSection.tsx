/**
 * Comparison Section Component
 *
 * "Why This, Not That" - redesigned to match work page patterns
 */

export function ComparisonSection() {
  return (
    <div>
      {/* Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 mb-4">
        {/* Option 1: Co-founder */}
        <div className="p-4 md:p-5 bg-gray-900/50 border border-gray-700 rounded-lg">
          <div className="font-mono text-[10px] text-gray-500 tracking-widest mb-2">
            HIRE A CO-FOUNDER
          </div>
          <ul className="text-xs text-gray-400 space-y-1.5">
            <li>→ 6+ months to find the right person</li>
            <li>→ 15-25% equity for an unknown</li>
            <li>→ Relationship risk if it doesn't work</li>
          </ul>
        </div>

        {/* Option 2: Agency */}
        <div className="p-4 md:p-5 bg-gray-900/50 border border-gray-700 rounded-lg">
          <div className="font-mono text-[10px] text-gray-500 tracking-widest mb-2">
            HIRE AN AGENCY
          </div>
          <ul className="text-xs text-gray-400 space-y-1.5">
            <li>→ No skin in the game</li>
            <li>→ Optimizes for billable hours</li>
            <li>→ Hands off after delivery</li>
          </ul>
        </div>

        {/* Option 3: Rationale (highlighted) */}
        <div className="p-4 md:p-5 bg-gray-900/50 border border-terminal-gold/40 rounded-lg">
          <div className="font-mono text-[10px] text-terminal-gold tracking-widest mb-2">
            WORK WITH RATIONALE
          </div>
          <ul className="text-xs text-gray-300 space-y-1.5">
            <li>→ Start in weeks, not months</li>
            <li>→ Aligned incentives from day one</li>
            <li>→ We stay involved through launch</li>
          </ul>
        </div>
      </div>

      {/* Note */}
      <p className="text-xs text-gray-500">
        Flexible structures: cash, equity, or hybrid—depending on fit.
      </p>
    </div>
  );
}
