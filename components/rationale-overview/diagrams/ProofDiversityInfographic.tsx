/**
 * Proof Diversity Infographic
 * Shows three proof points demonstrating systematic velocity across domains
 */

'use client';

export default function ProofDiversityInfographic() {
  const proofs = [
    {
      title: 'Zero',
      subtitle: 'Consumer AI Product',
      timeline: '30 days',
      timelineLabel: 'Concept to App Store',
      color: '#00FF94',
      highlights: [
        '10 microservices',
        '182 Swift files',
        'Live on App Store'
      ]
    },
    {
      title: 'Case Study 010',
      subtitle: 'Enterprise B2B Platform',
      timeline: '16 weeks',
      timelineLabel: 'MVP delivery',
      color: '#00D9FF',
      highlights: [
        'Commercial RE',
        'Full-stack platform',
        'Enterprise scale'
      ]
    },
    {
      title: 'Case Study 020',
      subtitle: 'Complex Multi-Module System',
      timeline: '40+ demos',
      timelineLabel: 'Built and tested',
      color: '#FFD700',
      highlights: [
        '4 integrated modules',
        'Wearables integration',
        'Vision Pro support'
      ]
    }
  ];

  return (
    <div className="p-6 sm:p-8 bg-gray-900/50 border border-gray-700 rounded-lg">
      <div className="mb-8 text-center">
        <h3 className="text-xl font-bold text-white mb-2">Proof Diversity</h3>
        <p className="text-sm text-gray-400">
          Same methodology, different contexts. Three proof points across domains.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {proofs.map((proof, idx) => (
          <div
            key={proof.title}
            className="p-6 bg-gray-800/50 border-2 rounded-lg transition-all hover:bg-gray-800/70"
            style={{ borderColor: proof.color }}
          >
            {/* Header */}
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-black"
                  style={{ backgroundColor: proof.color }}
                >
                  {idx + 1}
                </div>
                <h4 className="text-lg font-bold text-white">{proof.title}</h4>
              </div>
              <p className="text-xs text-gray-400">{proof.subtitle}</p>
            </div>

            {/* Timeline */}
            <div className="mb-6 p-4 bg-gray-900/50 rounded-lg">
              <div className="text-2xl font-bold text-white mb-1">{proof.timeline}</div>
              <div className="text-xs text-gray-400">{proof.timelineLabel}</div>
            </div>

            {/* Highlights */}
            <div className="space-y-2">
              {proof.highlights.map((highlight) => (
                <div key={highlight} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: proof.color }} />
                  <div className="text-sm text-gray-300">{highlight}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="mt-8 pt-6 border-t border-gray-700 text-center">
        <p className="text-sm text-gray-400">
          <span className="font-semibold text-white">Same velocity, different domains.</span> Whether consumer AI, enterprise platforms, or complex systems—we ship with systematic speed.
        </p>
      </div>
    </div>
  );
}
