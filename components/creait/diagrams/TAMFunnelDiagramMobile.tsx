'use client';

/**
 * Mobile-optimized TAMFunnelDiagram
 * Simple stacked funnel showing TAM → SAM → SOM
 */
export default function TAMFunnelDiagramMobile() {
  return (
    <div className="py-6">
      <div className="text-center mb-6">
        <p className="text-sm text-gray-400 uppercase tracking-wide">
          Market Opportunity
        </p>
        <p className="text-xs text-gray-500 mt-1">
          TAM → SAM → SOM Funnel
        </p>
      </div>

      <div className="space-y-4">
        {/* TAM - Widest */}
        <div className="bg-gradient-to-r from-red-500/20 to-red-500/5 border-2 border-red-500/50 rounded-lg p-5">
          <div className="flex items-center justify-between mb-2">
            <h5 className="text-red-400 font-bold text-sm">TAM - Total Addressable Market</h5>
            <div className="text-2xl font-bold text-red-400 font-mono">$9B</div>
          </div>
          <p className="text-xs text-gray-400 mb-3">
            150,000 commercial brokers nationwide
          </p>
          <div className="bg-gray-800/50 rounded p-3">
            <p className="text-xs text-gray-500 font-mono">
              $500/mo × 150K brokers × 12 months = $9B/year
            </p>
          </div>
          <div className="mt-3 pt-3 border-t border-red-500/30">
            <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-red-500 to-red-400" style={{width: '100%'}}></div>
            </div>
            <p className="text-xs text-gray-500 text-center mt-1">100% of market</p>
          </div>
        </div>

        {/* SAM - Medium */}
        <div className="bg-gradient-to-r from-orange-500/20 to-orange-500/5 border-2 border-orange-500/50 rounded-lg p-5 mx-4">
          <div className="flex items-center justify-between mb-2">
            <h5 className="text-orange-400 font-bold text-sm">SAM - Serviceable Addressable</h5>
            <div className="text-2xl font-bold text-orange-400 font-mono">$2.7B</div>
          </div>
          <p className="text-xs text-gray-400 mb-3">
            75,000 brokers at firms with 5+ agents
          </p>
          <div className="bg-gray-800/50 rounded p-3">
            <p className="text-xs text-gray-500 font-mono">
              50% of brokers at targetable firms
            </p>
          </div>
          <div className="mt-3 pt-3 border-t border-orange-500/30">
            <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-orange-500 to-orange-400" style={{width: '65%'}}></div>
            </div>
            <p className="text-xs text-gray-500 text-center mt-1">30% of TAM (realistic target)</p>
          </div>
        </div>

        {/* SOM - Narrowest */}
        <div className="bg-gradient-to-r from-green-500/20 to-green-500/5 border-2 border-green-500/50 rounded-lg p-5 mx-8">
          <div className="flex items-center justify-between mb-2">
            <h5 className="text-green-400 font-bold text-sm">SOM - Serviceable Obtainable</h5>
            <div className="text-2xl font-bold text-green-400 font-mono">$90M</div>
          </div>
          <p className="text-xs text-gray-400 mb-3">
            3,000 customers at 5% market share
          </p>
          <div className="bg-gray-800/50 rounded p-3">
            <p className="text-xs text-gray-500 font-mono">
              3K customers × $2.5K annual value
            </p>
          </div>
          <div className="mt-3 pt-3 border-t border-green-500/30">
            <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-green-500 to-green-400" style={{width: '33%'}}></div>
            </div>
            <p className="text-xs text-gray-500 text-center mt-1">1% of TAM (Year 5 target)</p>
          </div>
        </div>
      </div>

      <div className="mt-6 bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
        <h4 className="text-blue-400 font-bold text-sm mb-2 text-center">
          Conservative Go-to-Market
        </h4>
        <p className="text-xs text-gray-400 text-center">
          Year 1 target: 500 customers ($2.5M ARR) = 0.05% of TAM.
          <span className="text-blue-400 block mt-2">Massive headroom for growth without market saturation.</span>
        </p>
      </div>
    </div>
  );
}
