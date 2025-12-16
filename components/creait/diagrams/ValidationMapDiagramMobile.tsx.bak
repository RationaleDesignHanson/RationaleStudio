'use client';

import { ProgressiveDisclosureDiagram, type DiagramElement } from '@/components/diagrams/ProgressiveDisclosureDiagram';

/**
 * Mobile-optimized ValidationMapDiagram
 * 25 customer interviews across 8 major CRE markets
 */
export default function ValidationMapDiagramMobile() {
  const markets: DiagramElement[] = [
    {
      id: 'sf-bay',
      icon: '🌉',
      title: 'SF Bay Area',
      summary: '5 interviews across major firms',
      details: [
        '📍 San Francisco - CBRE',
        '📍 Oakland - Cushman & Wakefield',
        '📍 San Jose - JLL',
        '📍 Berkeley - Marcus & Millichap',
        '📍 Palo Alto - Colliers',
      ],
      color: 'from-blue-500 to-cyan-500',
    },
    {
      id: 'nyc',
      icon: '🗽',
      title: 'NYC Metro',
      summary: '5 interviews across major firms',
      details: [
        '📍 New York - CBRE',
        '📍 Brooklyn - JLL',
        '📍 Manhattan - Cushman & Wakefield',
        '📍 Jersey City - Newmark',
        '📍 Queens - Marcus & Millichap',
      ],
      color: 'from-purple-500 to-pink-500',
    },
    {
      id: 'la',
      icon: '🌴',
      title: 'Los Angeles',
      summary: '4 interviews across major firms',
      details: [
        '📍 Los Angeles - Newmark',
        '📍 Santa Monica - Kidder Mathews',
        '📍 Irvine - Lee & Associates',
        '📍 Pasadena - Avison Young',
      ],
      color: 'from-orange-500 to-red-500',
    },
    {
      id: 'chicago',
      icon: '🏙️',
      title: 'Chicago',
      summary: '3 interviews across major firms',
      details: [
        '📍 Chicago - JLL',
        '📍 Oak Brook - Colliers',
        '📍 Naperville - CBRE',
      ],
      color: 'from-indigo-500 to-blue-500',
    },
    {
      id: 'miami',
      icon: '🏖️',
      title: 'Miami',
      summary: '2 interviews across major firms',
      details: [
        '📍 Miami - Cushman & Wakefield',
        '📍 Fort Lauderdale - Avison Young',
      ],
      color: 'from-cyan-500 to-teal-500',
    },
    {
      id: 'dallas',
      icon: '🤠',
      title: 'Dallas',
      summary: '2 interviews across major firms',
      details: [
        '📍 Dallas - CBRE',
        '📍 Plano - JLL',
      ],
      color: 'from-red-500 to-orange-500',
    },
    {
      id: 'seattle',
      icon: '☕',
      title: 'Seattle',
      summary: '2 interviews across major firms',
      details: [
        '📍 Seattle - Kidder Mathews',
        '📍 Bellevue - Colliers',
      ],
      color: 'from-green-500 to-emerald-500',
    },
    {
      id: 'other',
      icon: '🗺️',
      title: 'Other Markets',
      summary: '2 interviews in growing markets',
      details: [
        '📍 Denver - Newmark',
        '📍 Phoenix - Lee & Associates',
      ],
      color: 'from-yellow-500 to-orange-500',
    },
  ];

  return (
    <div className="py-6">
      <div className="text-center mb-6">
        <p className="text-sm text-gray-400 uppercase tracking-wide">
          Geographic Validation
        </p>
        <p className="text-xs text-gray-500 mt-1">
          25 interviews across 8 major CRE markets
        </p>
      </div>

      <ProgressiveDisclosureDiagram
        elements={markets}
        title="8 Major Markets"
        layout="grid"
      />

      <div className="mt-6 space-y-3">
        <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-blue-400 font-bold text-sm">25 Interviews</h4>
              <p className="text-xs text-gray-500 mt-1">In-depth customer discovery</p>
            </div>
            <div className="text-3xl">💬</div>
          </div>
        </div>

        <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-purple-400 font-bold text-sm">12 Brokerage Firms</h4>
              <p className="text-xs text-gray-500 mt-1">CBRE, JLL, Cushman, Colliers, Newmark + 7 more</p>
            </div>
            <div className="text-3xl">🏢</div>
          </div>
        </div>

        <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-cyan-400 font-bold text-sm">Coast-to-Coast Coverage</h4>
              <p className="text-xs text-gray-500 mt-1">West Coast, Midwest, East Coast validation</p>
            </div>
            <div className="text-3xl">🗺️</div>
          </div>
        </div>
      </div>

      <div className="mt-6 bg-green-500/10 border border-green-500/30 rounded-lg p-4">
        <h4 className="text-green-400 font-bold text-sm mb-2 text-center">
          National Market Validation
        </h4>
        <p className="text-xs text-gray-400 text-center">
          25 brokers across 8 major markets confirmed the core problem: 70-80% of their day is wasted on low-quality leads.
          <span className="text-green-400 block mt-2">Result: Strong product-market fit validated across diverse geographies.</span>
        </p>
      </div>
    </div>
  );
}
