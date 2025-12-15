/**
 * Manufacturing Flow Diagram
 * Converter partnership process flow
 */

'use client';

export default function ManufacturingFlowDiagram() {
  const steps = [
    { name: 'Airlaid + PBAT Webs', icon: '📄' },
    { name: 'Cut & Place', icon: '✂️' },
    { name: 'Hot Melt Bonding', icon: '🔥' },
    { name: 'Interfolding', icon: '📦' },
    { name: 'Pocket Pack', icon: '✅' }
  ];

  return (
    <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6 sm:p-8">
      <h3 className="text-2xl font-bold text-center mb-8">Manufacturing Process Flow</h3>

      {/* Process Steps */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
        {steps.map((step, index) => (
          <div key={index} className="flex-1 w-full">
            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 text-center">
              <div className="text-4xl mb-2">{step.icon}</div>
              <div className="text-sm font-medium text-white">{step.name}</div>
            </div>
            {index < steps.length - 1 && (
              <div className="hidden md:flex items-center justify-center w-8 h-full absolute">
                <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Partner Types */}
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gray-800/50 border border-green-700/50 rounded-lg p-4">
          <h4 className="font-bold text-green-400 mb-2">Type A: Wet Wipe Manufacturers</h4>
          <p className="text-sm text-gray-400">
            Best fit. Experts in airlaid/non-wovens and interfolding. Run "dry line" with bioplastic film.
          </p>
        </div>
        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
          <h4 className="font-bold text-gray-300 mb-2">Type B: Flexible Packaging</h4>
          <p className="text-sm text-gray-400">
            Lamination and bag-making expertise. May struggle with thick paper component.
          </p>
        </div>
        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
          <h4 className="font-bold text-gray-300 mb-2">Type C: Label Converters</h4>
          <p className="text-sm text-gray-400">
            Tipping capabilities. Slower batch process for "tip" liner inside bag.
          </p>
        </div>
      </div>

      {/* Geography */}
      <div className="bg-gray-950/50 border border-gray-800 rounded-lg p-4">
        <div className="flex flex-wrap gap-6 justify-center text-sm">
          <div className="flex items-center gap-2">
            <span className="text-gray-400">China/Turkey:</span>
            <span className="text-white">Cost-optimized</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-400">USA:</span>
            <span className="text-white">Speed + Quality</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-400">CAPEX:</span>
            <span className="text-green-400">$40K-80K (mid-range)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
