'use client';

import { SwipeableDiagram, type DiagramSlide } from '@/components/diagrams/SwipeableDiagram';

/**
 * Mobile-optimized Interactive Pitch Interface Diagram
 * Shows 3 interface panels as swipeable cards
 */
export default function InteractivePitchInterfaceDiagramMobile() {
  const slides: DiagramSlide[] = [
    {
      id: 'contract-comparison',
      title: 'Contract Comparison',
      content: (
        <div className="bg-gray-900/50 border-2 border-cyan-500/50 rounded-lg p-5 h-full">
          <div className="bg-cyan-500/20 rounded px-3 py-2 mb-4">
            <h4 className="text-cyan-400 font-bold text-sm">CONTRACT COMPARISON</h4>
          </div>

          <p className="text-xs text-gray-400 mb-4">
            Side-by-side analysis of 3 competing offers with real-time adjustments
          </p>

          <div className="space-y-3">
            {/* Table Headers */}
            <div className="grid grid-cols-4 gap-2 pb-2 border-b border-cyan-500/30">
              <div className="text-xs text-gray-500">Metric</div>
              <div className="text-xs text-cyan-400 text-center">Offer A</div>
              <div className="text-xs text-green-400 text-center">Offer B ✓</div>
              <div className="text-xs text-purple-400 text-center">Offer C</div>
            </div>

            {/* Table Rows */}
            <div className="space-y-2 text-xs">
              <div className="grid grid-cols-4 gap-2 py-1">
                <div className="text-gray-400">Total Value</div>
                <div className="text-cyan-300 text-center font-mono">$8.2M</div>
                <div className="text-green-300 text-center font-mono font-bold">$6.5M</div>
                <div className="text-purple-300 text-center font-mono">$7.8M</div>
              </div>
              <div className="grid grid-cols-4 gap-2 py-1 bg-gray-800/50 rounded">
                <div className="text-gray-400">Guaranteed</div>
                <div className="text-cyan-300 text-center font-mono">$4.1M</div>
                <div className="text-green-300 text-center font-mono font-bold">$5.2M</div>
                <div className="text-purple-300 text-center font-mono">$3.9M</div>
              </div>
              <div className="grid grid-cols-4 gap-2 py-1">
                <div className="text-gray-400">Signing Bonus</div>
                <div className="text-cyan-300 text-center font-mono">$2.0M</div>
                <div className="text-green-300 text-center font-mono font-bold">$1.5M</div>
                <div className="text-purple-300 text-center font-mono">$2.5M</div>
              </div>
              <div className="grid grid-cols-4 gap-2 py-1 bg-gray-800/50 rounded">
                <div className="text-gray-400">Year 1</div>
                <div className="text-cyan-300 text-center font-mono">$1.2M</div>
                <div className="text-green-300 text-center font-mono font-bold">$1.5M</div>
                <div className="text-purple-300 text-center font-mono">$1.1M</div>
              </div>
              <div className="grid grid-cols-4 gap-2 py-1">
                <div className="text-gray-400">Year 2</div>
                <div className="text-cyan-300 text-center font-mono">$1.4M</div>
                <div className="text-green-300 text-center font-mono font-bold">$1.8M</div>
                <div className="text-purple-300 text-center font-mono">$1.3M</div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-cyan-500/30">
            <p className="text-xs text-gray-500 text-center">
              ✓ Offer B selected: Highest guaranteed money
            </p>
          </div>
        </div>
      ),
    },
    {
      id: 'nil-calculator',
      title: 'NIL Calculator',
      content: (
        <div className="bg-gray-900/50 border-2 border-purple-500/50 rounded-lg p-5 h-full">
          <div className="bg-purple-500/20 rounded px-3 py-2 mb-4">
            <h4 className="text-purple-400 font-bold text-sm">LIVE NIL CALCULATOR</h4>
          </div>

          <p className="text-xs text-gray-400 mb-4">
            Real-time earnings projections based on social media reach and engagement
          </p>

          <div className="space-y-4">
            {/* Input Sliders */}
            <div className="bg-gray-800/50 rounded p-3">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-gray-400">Instagram Followers</span>
                <span className="text-purple-400 font-mono font-bold">125K</span>
              </div>
              <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500" style={{width: '62%'}}></div>
              </div>
            </div>

            <div className="bg-gray-800/50 rounded p-3">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-gray-400">Engagement Rate</span>
                <span className="text-purple-400 font-mono font-bold">8.5%</span>
              </div>
              <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500" style={{width: '85%'}}></div>
              </div>
            </div>

            <div className="bg-gray-800/50 rounded p-3">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-gray-400">Content Deals/Year</span>
                <span className="text-purple-400 font-mono font-bold">12</span>
              </div>
              <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500" style={{width: '60%'}}></div>
              </div>
            </div>

            {/* Output Metrics */}
            <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4 mt-5">
              <h5 className="text-purple-400 font-bold text-xs mb-3 text-center">Projected Annual NIL Income</h5>
              <div className="text-center">
                <div className="text-4xl font-bold text-terminal-gold mb-1">$287K</div>
                <div className="text-xs text-gray-500">Based on current metrics</div>
              </div>
              <div className="grid grid-cols-2 gap-3 mt-4 text-xs">
                <div className="bg-gray-800/50 rounded p-2 text-center">
                  <div className="text-purple-400 font-mono font-bold">$18K</div>
                  <div className="text-gray-500">Per Deal (Avg)</div>
                </div>
                <div className="bg-gray-800/50 rounded p-2 text-center">
                  <div className="text-purple-400 font-mono font-bold">$24/hr</div>
                  <div className="text-gray-500">Content Value</div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-purple-500/30">
            <p className="text-xs text-gray-500 text-center">
              💡 Adjust sliders to see real-time projections
            </p>
          </div>
        </div>
      ),
    },
    {
      id: 'career-pathway',
      title: 'Career Pathway',
      content: (
        <div className="bg-gray-900/50 border-2 border-green-500/50 rounded-lg p-5 h-full">
          <div className="bg-green-500/20 rounded px-3 py-2 mb-4">
            <h4 className="text-green-400 font-bold text-sm">CAREER PATHWAY</h4>
          </div>

          <p className="text-xs text-gray-400 mb-4">
            Visual timeline of athletic career with financial milestones
          </p>

          <div className="space-y-3">
            {/* Year 1 */}
            <div className="relative pl-6">
              <div className="absolute left-0 top-1 w-3 h-3 bg-green-500 rounded-full border-2 border-green-400"></div>
              <div className="absolute left-1.5 top-5 bottom-0 w-0.5 bg-green-500/30"></div>
              <div className="bg-gray-800/50 border border-green-500/30 rounded p-3">
                <div className="flex justify-between items-start mb-1">
                  <div className="text-green-400 font-bold text-xs">Year 1: Freshman</div>
                  <div className="text-terminal-gold font-mono font-bold text-sm">$125K</div>
                </div>
                <ul className="text-xs text-gray-400 space-y-0.5">
                  <li>• 5 NIL deals ($25K each)</li>
                  <li>• Build social presence</li>
                  <li>• Establish brand partnerships</li>
                </ul>
              </div>
            </div>

            {/* Year 2 */}
            <div className="relative pl-6">
              <div className="absolute left-0 top-1 w-3 h-3 bg-green-500 rounded-full border-2 border-green-400"></div>
              <div className="absolute left-1.5 top-5 bottom-0 w-0.5 bg-green-500/30"></div>
              <div className="bg-gray-800/50 border border-green-500/30 rounded p-3">
                <div className="flex justify-between items-start mb-1">
                  <div className="text-green-400 font-bold text-xs">Year 2-3: Growth</div>
                  <div className="text-terminal-gold font-mono font-bold text-sm">$275K/yr</div>
                </div>
                <ul className="text-xs text-gray-400 space-y-0.5">
                  <li>• 12 NIL deals ($23K average)</li>
                  <li>• Expand to national brands</li>
                  <li>• Video Twin content library</li>
                </ul>
              </div>
            </div>

            {/* Year 3 */}
            <div className="relative pl-6">
              <div className="absolute left-0 top-1 w-3 h-3 bg-green-500 rounded-full border-2 border-green-400"></div>
              <div className="bg-gray-800/50 border border-green-500/30 rounded p-3">
                <div className="flex justify-between items-start mb-1">
                  <div className="text-green-400 font-bold text-xs">Year 4: Pro Draft</div>
                  <div className="text-terminal-gold font-mono font-bold text-sm">$8.2M</div>
                </div>
                <ul className="text-xs text-gray-400 space-y-0.5">
                  <li>• Draft signing bonus</li>
                  <li>• Leverage NIL portfolio for endorsements</li>
                  <li>• Proven brand value = higher deals</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-green-500/30 bg-green-500/10 rounded p-3">
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-400">Total Pathway Value:</span>
              <span className="text-terminal-gold font-bold text-lg font-mono">$8.9M+</span>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="py-6">
      <div className="text-center mb-6">
        <p className="text-sm text-gray-400 uppercase tracking-wide">
          Interactive Pitch Interface
        </p>
        <p className="text-xs text-gray-500 mt-1">
          Real-time contract modeling, NIL projections, and career pathways
        </p>
      </div>

      <SwipeableDiagram
        slides={slides}
        title="3 Interactive Tools"
      />

      <div className="mt-6 bg-terminal-gold/10 border border-terminal-gold/30 rounded-lg p-4">
        <p className="text-terminal-gold font-bold text-sm text-center mb-2">
          Why This Wins Deals
        </p>
        <p className="text-xs text-gray-400 text-center">
          Brands and athletes see themselves in the platform, not abstract features. Interactive demos convert 65%+ vs. 45% with static PDFs.
        </p>
      </div>
    </div>
  );
}
