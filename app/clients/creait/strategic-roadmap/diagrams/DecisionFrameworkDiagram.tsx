import React from 'react';

interface DecisionFrameworkDiagramProps {
  className?: string;
}

const DecisionFrameworkDiagram: React.FC<DecisionFrameworkDiagramProps> = ({ className = '' }) => {
  const options = [
    {
      letter: 'A',
      title: 'Build It Yourself',
      timeline: '3-4 months (1 engineer)',
      cost: '$30-40K (salary + benefits)',
      risk: 'First-mover window closing (12-18 mo)',
      riskLevel: 'medium',
      pros: [
        'Full control over roadmap',
        'No vendor dependency',
        'Build exactly what you want'
      ],
      cons: [
        'Slower time to market',
        'Need to find/hire right engineer',
        'Risk: Competitors catch up'
      ]
    },
    {
      letter: 'B',
      title: 'Get Help (Partner)',
      timeline: '12-14 weeks (2 engineers)',
      cost: '$24-30K (consulting or equity)',
      risk: 'Finding the right partner fit',
      riskLevel: 'medium',
      pros: [
        'Faster (2x engineers, proven process)',
        'Experience with similar projects',
        'Dedicated focus on your success'
      ],
      cons: [
        'Less day-to-day control',
        'Partner selection critical',
        'Coordination overhead'
      ]
    },
    {
      letter: 'C',
      title: 'Pivot to Campaign Manager',
      timeline: '2-4 weeks (polish existing)',
      cost: '$10-15K (minor dev work)',
      risk: 'Low execution risk (already built)',
      riskLevel: 'low',
      pros: [
        'Launch quickly with working product',
        'Lower development cost',
        'Validated email system'
      ],
      cons: [
        'Different market positioning',
        'Less differentiated (crowded space)',
        'Abandons original vision'
      ]
    }
  ];

  const riskColors = {
    medium: 'text-yellow-400',
    low: 'text-emerald-400'
  };

  return (
    <div className={`bg-gray-900/40 backdrop-blur-sm rounded-lg border border-gray-700 p-8 ${className}`}>
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">Decision Framework</h2>
        <p className="text-lg text-gray-400">Three paths forward: Choose your strategy</p>
      </div>

      {/* Options Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {options.map((option, idx) => (
          <div
            key={idx}
            className="border-2 border-gray-700 rounded-lg bg-gray-800/40 hover:border-[#FFD700] transition-colors"
          >
            {/* Option Header */}
            <div className="bg-gray-800 text-white p-4 rounded-t-lg border-b border-gray-700">
              <div className="flex items-center mb-2">
                <div className="w-8 h-8 bg-[#FFD700] text-gray-900 rounded-full flex items-center justify-center font-bold mr-3">
                  {option.letter}
                </div>
                <h3 className="text-lg font-bold">{option.title}</h3>
              </div>
            </div>

            {/* Key Metrics */}
            <div className="p-4 space-y-3 bg-gray-900/60 border-b-2 border-gray-700">
              <div>
                <div className="flex items-center text-sm">
                  <svg className="w-4 h-4 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-gray-400 font-semibold">Timeline:</span>
                </div>
                <div className="ml-6 text-white font-medium">{option.timeline}</div>
              </div>

              <div>
                <div className="flex items-center text-sm">
                  <svg className="w-4 h-4 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                  <span className="text-gray-400 font-semibold">Cost:</span>
                </div>
                <div className="ml-6 text-white font-medium">{option.cost}</div>
              </div>

              <div>
                <div className="flex items-center text-sm">
                  <svg className="w-4 h-4 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <span className="text-gray-400 font-semibold">Risk:</span>
                </div>
                <div className={`ml-6 font-medium ${riskColors[option.riskLevel as keyof typeof riskColors]}`}>
                  {option.risk}
                </div>
              </div>
            </div>

            {/* Pros */}
            <div className="p-4 bg-gray-900/40">
              <h4 className="font-semibold text-white mb-2 flex items-center">
                <span className="text-emerald-400 mr-2">✓</span>
                Pros:
              </h4>
              <ul className="space-y-1">
                {option.pros.map((pro, proIdx) => (
                  <li key={proIdx} className="text-sm text-gray-300 flex items-start">
                    <span className="text-emerald-400 mr-2 mt-0.5">•</span>
                    <span>{pro}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Cons */}
            <div className="p-4 bg-gray-800/40 rounded-b-lg">
              <h4 className="font-semibold text-white mb-2 flex items-center">
                <span className="text-red-400 mr-2">✗</span>
                Cons:
              </h4>
              <ul className="space-y-1">
                {option.cons.map((con, conIdx) => (
                  <li key={conIdx} className="text-sm text-gray-300 flex items-start">
                    <span className="text-red-400 mr-2 mt-0.5">•</span>
                    <span>{con}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Recommendation */}
      <div className="bg-blue-500/20 border border-blue-500/50 text-white rounded-lg p-6">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <svg className="w-8 h-8 mt-1 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <div className="ml-4 flex-1">
            <h3 className="text-xl font-bold mb-2">Our Recommendation: Option A or B (Intelligence Platform)</h3>
            <p className="text-blue-200 mb-3">
              <span className="font-semibold">Reasoning:</span> Speed to market is your biggest competitive advantage.
              The first-mover window is 12-18 months before horizontal AI tools add CRE-specific features.
            </p>
            <div className="bg-blue-500/30 border border-blue-500/50 rounded p-3">
              <p className="text-sm text-gray-200">
                <span className="font-semibold">Key insight:</span> Option C (Campaign Manager) abandons your unique intelligence positioning
                and puts you in a crowded market with established players.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="mt-8 overflow-x-auto">
        <table className="w-full text-sm border border-gray-700 rounded-lg overflow-hidden">
          <thead className="bg-gray-800">
            <tr>
              <th className="px-4 py-3 text-left font-semibold text-gray-300 border-b border-gray-700">Factor</th>
              <th className="px-4 py-3 text-center font-semibold text-gray-300 border-b border-gray-700">Option A</th>
              <th className="px-4 py-3 text-center font-semibold text-gray-300 border-b border-gray-700">Option B</th>
              <th className="px-4 py-3 text-center font-semibold text-gray-300 border-b border-gray-700">Option C</th>
            </tr>
          </thead>
          <tbody className="bg-gray-900/40 divide-y divide-gray-700">
            <tr>
              <td className="px-4 py-3 font-medium text-white">Speed to Market</td>
              <td className="px-4 py-3 text-center text-yellow-400">Medium</td>
              <td className="px-4 py-3 text-center text-emerald-400 font-semibold">Fast</td>
              <td className="px-4 py-3 text-center text-emerald-400">Fastest</td>
            </tr>
            <tr className="bg-gray-800/40">
              <td className="px-4 py-3 font-medium text-white">Strategic Value</td>
              <td className="px-4 py-3 text-center text-emerald-400 font-semibold">High</td>
              <td className="px-4 py-3 text-center text-emerald-400 font-semibold">High</td>
              <td className="px-4 py-3 text-center text-red-400">Low</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-medium text-white">Market Differentiation</td>
              <td className="px-4 py-3 text-center text-emerald-400 font-semibold">Strong</td>
              <td className="px-4 py-3 text-center text-emerald-400 font-semibold">Strong</td>
              <td className="px-4 py-3 text-center text-red-400">Weak</td>
            </tr>
            <tr className="bg-gray-800/40">
              <td className="px-4 py-3 font-medium text-white">Execution Risk</td>
              <td className="px-4 py-3 text-center text-yellow-400">Medium</td>
              <td className="px-4 py-3 text-center text-yellow-400">Medium</td>
              <td className="px-4 py-3 text-center text-emerald-400">Low</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DecisionFrameworkDiagram;
