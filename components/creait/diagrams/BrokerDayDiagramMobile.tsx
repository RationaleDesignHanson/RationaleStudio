'use client';

import { SwipeableDiagram, type DiagramSlide } from '@/components/diagrams/SwipeableDiagram';

/**
 * Mobile-optimized BrokerDayDiagram
 * Before/After comparison of broker's 8-hour workday
 */
export default function BrokerDayDiagramMobile() {
  const slides: DiagramSlide[] = [
    {
      id: 'before-creait',
      content: (
        <div className="bg-gray-900/50 border-2 border-red-500/50 rounded-lg p-5 h-full">
          <div className="bg-red-500/20 rounded px-3 py-2 mb-4">
            <h4 className="text-red-400 font-bold text-sm">❌ BEFORE: Traditional Workflow</h4>
          </div>

          <div className="space-y-3">
            {/* Wasted Time - 40% */}
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h5 className="text-red-400 font-bold text-sm">Wasted Time</h5>
                <div>
                  <span className="text-red-400 font-bold text-lg font-mono">40%</span>
                  <span className="text-xs text-gray-500 ml-1">(3.2 hrs)</span>
                </div>
              </div>
              <ul className="space-y-1 text-xs text-gray-400">
                <li>• Manual property research</li>
                <li>• Cold lead prospecting</li>
                <li>• Data entry & spreadsheets</li>
                <li>• Chasing dead-end opportunities</li>
              </ul>
              <div className="mt-2 w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-red-500 to-red-400" style={{width: '40%'}}></div>
              </div>
            </div>

            {/* Meetings & Calls - 35% */}
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h5 className="text-blue-400 font-bold text-sm">Meetings & Calls</h5>
                <div>
                  <span className="text-blue-400 font-bold text-lg font-mono">35%</span>
                  <span className="text-xs text-gray-500 ml-1">(2.8 hrs)</span>
                </div>
              </div>
              <ul className="space-y-1 text-xs text-gray-400">
                <li>• Internal meetings</li>
                <li>• General networking calls</li>
                <li>• Low-quality prospect meetings</li>
              </ul>
              <div className="mt-2 w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-blue-500 to-blue-400" style={{width: '35%'}}></div>
              </div>
            </div>

            {/* Productive Time - 25% */}
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h5 className="text-green-400 font-bold text-sm">Productive Time</h5>
                <div>
                  <span className="text-green-400 font-bold text-lg font-mono">25%</span>
                  <span className="text-xs text-gray-500 ml-1">(2.0 hrs)</span>
                </div>
              </div>
              <ul className="space-y-1 text-xs text-gray-400">
                <li>• Hot opportunity follow-up</li>
                <li>• Deal negotiations</li>
              </ul>
              <div className="mt-2 w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-green-500 to-green-400" style={{width: '25%'}}></div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-red-500/30">
            <p className="text-red-400 font-bold text-xs text-center">
              Only 25% of day = productive revenue-generating activity
            </p>
          </div>
        </div>
      ),
    },
    {
      id: 'after-creait',
      content: (
        <div className="bg-gray-900/50 border-2 border-green-500/50 rounded-lg p-5 h-full">
          <div className="bg-green-500/20 rounded px-3 py-2 mb-4">
            <h4 className="text-green-400 font-bold text-sm">✅ AFTER: With CREaiT</h4>
          </div>

          <div className="space-y-3">
            {/* Automated Research - 15% */}
            <div className="bg-gray-700/30 border border-gray-600 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h5 className="text-gray-400 font-bold text-sm">Automated Research</h5>
                <div>
                  <span className="text-gray-400 font-bold text-lg font-mono">15%</span>
                  <span className="text-xs text-gray-500 ml-1">(1.2 hrs)</span>
                </div>
              </div>
              <ul className="space-y-1 text-xs text-gray-400">
                <li>• AI handles property scoring</li>
                <li>• Automated list generation</li>
                <li>• Data entry eliminated</li>
              </ul>
              <div className="mt-2 w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-gray-600 to-gray-500" style={{width: '15%'}}></div>
              </div>
              <div className="mt-2 text-xs text-green-400">
                ↓ 62% reduction (3.2hrs → 1.2hrs)
              </div>
            </div>

            {/* Strategic Meetings - 25% */}
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h5 className="text-blue-400 font-bold text-sm">Strategic Meetings</h5>
                <div>
                  <span className="text-blue-400 font-bold text-lg font-mono">25%</span>
                  <span className="text-xs text-gray-500 ml-1">(2.0 hrs)</span>
                </div>
              </div>
              <ul className="space-y-1 text-xs text-gray-400">
                <li>• High-priority prospects only</li>
                <li>• AI-qualified opportunities</li>
              </ul>
              <div className="mt-2 w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-blue-500 to-blue-400" style={{width: '25%'}}></div>
              </div>
            </div>

            {/* Productive Time - 60% */}
            <div className="bg-green-500/10 border-2 border-green-500/50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h5 className="text-green-400 font-bold text-sm">Productive Time</h5>
                <div>
                  <span className="text-green-400 font-bold text-lg font-mono">60%</span>
                  <span className="text-xs text-gray-500 ml-1">(4.8 hrs)</span>
                </div>
              </div>
              <ul className="space-y-1 text-xs text-gray-400">
                <li>• Hot opportunity follow-up</li>
                <li>• Deal negotiations</li>
                <li>• Relationship building</li>
                <li>• Revenue-generating activities</li>
              </ul>
              <div className="mt-2 w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-green-500 to-green-400" style={{width: '60%'}}></div>
              </div>
              <div className="mt-2 text-xs text-green-400">
                ↑ 140% increase (2.0hrs → 4.8hrs)
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-green-500/30">
            <p className="text-green-400 font-bold text-xs text-center">
              60% of day = productive revenue-generating activity
            </p>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="py-6">
      <div className="text-center mb-6">
        <p className="text-sm text-gray-400 uppercase tracking-wide">
          Broker's 8-Hour Workday
        </p>
        <p className="text-xs text-gray-500 mt-1">
          Before vs After CREaiT
        </p>
      </div>

      <SwipeableDiagram
        slides={slides}
        title="Workday Transformation"
      />

      <div className="mt-6 bg-green-500/10 border border-green-500/30 rounded-lg p-4">
        <h4 className="text-green-400 font-bold text-sm mb-2 text-center">
          2.4x More Productive Time
        </h4>
        <p className="text-xs text-gray-400 text-center">
          CREaiT eliminates 2+ hours of wasted research daily, freeing brokers to focus on revenue-generating activities.
          <span className="text-green-400 block mt-2">Result: 2.4x more time closing deals (2.0hrs → 4.8hrs).</span>
        </p>
      </div>
    </div>
  );
}
