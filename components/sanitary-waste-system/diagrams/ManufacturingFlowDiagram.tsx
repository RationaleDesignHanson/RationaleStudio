/**
 * Manufacturing Flow Diagram
 * Converter partnership process flow
 * Mobile-responsive with adaptive layouts
 */

'use client';

export default function ManufacturingFlowDiagram() {
  const steps = [
    { name: 'Airlaid + PBAT Webs', icon: '📄', step: '1' },
    { name: 'Cut & Place', icon: '✂️', step: '2' },
    { name: 'Hot Melt Bonding', icon: '🔥', step: '3' },
    { name: 'Interfolding', icon: '📦', step: '4' },
    { name: 'Pocket Pack', icon: '✅', step: '5' }
  ];

  return (
    <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-4 sm:p-6 lg:p-8">
      <h3 className="text-xl sm:text-2xl font-bold text-center mb-6 sm:mb-8">Manufacturing Process Flow</h3>

      {/* Process Steps */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-2 md:gap-4 mb-6 sm:mb-8">
        {steps.map((step, index) => (
          <div key={index} className="w-full md:flex-1">
            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-3 sm:p-4 text-center">
              <div className="text-xs text-gray-500 mb-1">Step {step.step}</div>
              <div className="text-3xl sm:text-4xl mb-2">{step.icon}</div>
              <div className="text-xs sm:text-sm font-medium text-white">{step.name}</div>
            </div>
            {index < steps.length - 1 && (
              <div className="flex md:hidden items-center justify-center my-2">
                <svg className="w-4 h-4 text-green-500 rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Partner Types */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6">
        <div className="bg-gray-800/50 border border-green-700/50 rounded-lg p-3 sm:p-4">
          <h4 className="font-bold text-green-400 mb-2 text-sm sm:text-base">Type A: Wet Wipe Manufacturers</h4>
          <p className="text-xs sm:text-sm text-gray-400">
            Best fit. Experts in airlaid/non-wovens and interfolding. Run "dry line" with bioplastic film.
          </p>
        </div>
        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-3 sm:p-4">
          <h4 className="font-bold text-gray-300 mb-2 text-sm sm:text-base">Type B: Flexible Packaging</h4>
          <p className="text-xs sm:text-sm text-gray-400">
            Lamination and bag-making expertise. May struggle with thick paper component.
          </p>
        </div>
        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-3 sm:p-4">
          <h4 className="font-bold text-gray-300 mb-2 text-sm sm:text-base">Type C: Label Converters</h4>
          <p className="text-xs sm:text-sm text-gray-400">
            Tipping capabilities. Slower batch process for "tip" liner inside bag.
          </p>
        </div>
      </div>

      {/* Geography */}
      <div className="bg-gray-950/50 border border-gray-800 rounded-lg p-3 sm:p-4">
        <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-6 justify-center text-xs sm:text-sm">
          <div className="flex items-center gap-2 justify-center sm:justify-start">
            <span className="text-gray-400">China/Turkey:</span>
            <span className="text-white">Cost-optimized</span>
          </div>
          <div className="flex items-center gap-2 justify-center sm:justify-start">
            <span className="text-gray-400">USA:</span>
            <span className="text-white">Speed + Quality</span>
          </div>
          <div className="flex items-center gap-2 justify-center sm:justify-start">
            <span className="text-gray-400">CAPEX:</span>
            <span className="text-green-400">$40K-80K (mid-range)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
