/**
 * Razor-Blade Economics Diagram
 * LTV calculation and recurring revenue model
 * Mobile-responsive with adaptive layouts
 */

'use client';

export default function RazorBladeEconomicsDiagram() {
  return (
    <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-4 sm:p-6 lg:p-8">
      <h3 className="text-xl sm:text-2xl font-bold text-center mb-6 sm:mb-8">Business Model: Recurring Revenue</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-6 sm:mb-8">
        {/* Acquisition */}
        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 sm:p-6">
          <div className="text-center mb-4">
            <div className="inline-flex items-center justify-center h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-blue-500/20 mb-3">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <h4 className="font-bold text-white mb-2 text-base sm:text-lg">Acquisition</h4>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm sm:text-base text-gray-400">Starter Kit</span>
              <span className="font-bold text-blue-400 text-base sm:text-lg">$24.99</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm sm:text-base text-gray-400">Margin</span>
              <span className="text-sm sm:text-base text-gray-400">Break-even</span>
            </div>
            <div className="pt-3 border-t border-gray-700 text-xs sm:text-sm text-gray-500">
              Includes dispenser + 2 refill packs
            </div>
          </div>
        </div>

        {/* Retention */}
        <div className="bg-gray-800/50 border border-green-700 rounded-lg p-4 sm:p-6">
          <div className="text-center mb-4">
            <div className="inline-flex items-center justify-center h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-green-500/20 mb-3">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </div>
            <h4 className="font-bold text-white mb-2 text-base sm:text-lg">Retention</h4>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm sm:text-base text-gray-400">Monthly Refills</span>
              <span className="font-bold text-green-400 text-base sm:text-lg">$15-18</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm sm:text-base text-gray-400">Gross Margin</span>
              <span className="font-bold text-green-400 text-base sm:text-lg">~44%</span>
            </div>
            <div className="pt-3 border-t border-gray-700 text-xs sm:text-sm text-gray-500">
              Subscription + retail channels
            </div>
          </div>
        </div>
      </div>

      {/* LTV Calculation */}
      <div className="bg-gray-950/50 border border-green-500/30 rounded-lg p-4 sm:p-6">
        <h4 className="font-bold text-white mb-4 text-center text-base sm:text-lg">12-Month Customer Lifetime Value</h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-xs sm:text-sm text-gray-400 mb-1">Starter Kit</div>
            <div className="text-xl sm:text-2xl font-bold text-white">$25</div>
          </div>
          <div>
            <div className="text-xs sm:text-sm text-gray-400 mb-1">+ 12 Refills</div>
            <div className="text-xl sm:text-2xl font-bold text-white">$180-216</div>
          </div>
          <div>
            <div className="text-xs sm:text-sm text-gray-400 mb-1">= Total LTV</div>
            <div className="text-2xl sm:text-3xl font-bold text-green-400">$205-241</div>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-gray-800 text-center text-xs sm:text-sm text-gray-400">
          Assumes monthly subscription at $15-18/box (60 bags)
        </div>
      </div>
    </div>
  );
}
