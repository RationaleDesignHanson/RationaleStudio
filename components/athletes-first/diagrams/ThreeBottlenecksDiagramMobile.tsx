'use client';

import { AccordionDiagram, type AccordionSection } from '@/components/diagrams/AccordionDiagram';

/**
 * Mobile-optimized Three Bottlenecks Diagram
 * Shows the value extraction gap: operational constraints limiting performance
 */
export default function ThreeBottlenecksDiagramMobile() {
  const sections: AccordionSection[] = [
    {
      id: 'content',
      title: '🎨 Content Velocity Bottleneck',
      icon: '📊',
      color: 'from-orange-500 to-amber-500',
      content: (
        <div className="space-y-4">
          <div className="text-center mb-4">
            <p className="text-xs text-gray-400 mb-2">Available vs. Delivered</p>
            <div className="flex items-center justify-center gap-4">
              <div>
                <div className="text-3xl font-bold text-green-400">20</div>
                <div className="text-xs text-gray-500">Potential Deals</div>
              </div>
              <div className="text-2xl text-gray-600">→</div>
              <div>
                <div className="text-3xl font-bold text-red-400">2</div>
                <div className="text-xs text-gray-500">Actual Delivered</div>
              </div>
            </div>
          </div>

          <div className="bg-red-500/20 border-2 border-red-500/50 rounded-lg p-4">
            <h4 className="text-red-400 font-bold text-sm mb-2 text-center">90% Brand Revenue Uncaptured</h4>
            <p className="text-xs text-gray-400 text-center">deals/athlete/year</p>
          </div>

          <div className="space-y-3">
            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-3">
              <h5 className="text-orange-400 font-bold text-xs mb-2">The Problem:</h5>
              <ul className="space-y-1 text-xs text-gray-400">
                <li>• Athletes physically can't scale content production</li>
                <li>• Brand deals require 5-10 videos per campaign</li>
                <li>• Manual shooting/editing takes 40+ hours per deal</li>
                <li>• Only 2 deals annually actually get delivered</li>
              </ul>
            </div>

            <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-3">
              <h5 className="text-terminal-gold font-bold text-xs mb-2">The Breakthrough:</h5>
              <ul className="space-y-1 text-xs text-gray-300">
                <li>✓ Digital Twins generate unlimited branded content</li>
                <li>✓ One 30-min video session → 50-100 variations</li>
                <li>✓ Increase from 2 to 20+ deals annually (10x)</li>
                <li>✓ $150K-$500K additional revenue per athlete</li>
              </ul>
            </div>
          </div>

          <div className="text-center pt-2">
            <div className="inline-flex items-center gap-2 bg-terminal-gold/20 border border-terminal-gold/30 rounded px-3 py-1">
              <span className="text-terminal-gold text-sm font-bold">10x Content Multiplier</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'speed',
      title: '⚡ Speed to Market Bottleneck',
      icon: '⏱️',
      color: 'from-purple-500 to-indigo-500',
      content: (
        <div className="space-y-4">
          <div className="text-center mb-4">
            <p className="text-xs text-gray-400 mb-2">Window vs. Execution</p>
            <div className="flex items-center justify-center gap-4">
              <div>
                <div className="text-3xl font-bold text-green-400">72</div>
                <div className="text-xs text-gray-500">Hour Window</div>
              </div>
              <div className="text-2xl text-gray-600">vs</div>
              <div>
                <div className="text-3xl font-bold text-red-400">336</div>
                <div className="text-xs text-gray-500">Typical Response</div>
              </div>
            </div>
          </div>

          <div className="bg-red-500/20 border-2 border-red-500/50 rounded-lg p-4">
            <h4 className="text-red-400 font-bold text-sm mb-2 text-center">70% of Viral Opportunities Expire</h4>
            <p className="text-xs text-gray-400 text-center">hours until moment passes</p>
          </div>

          <div className="space-y-3">
            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-3">
              <h5 className="text-purple-400 font-bold text-xs mb-2">The Problem:</h5>
              <ul className="space-y-1 text-xs text-gray-400">
                <li>• Viral moments have 48-72 hour relevance window</li>
                <li>• Traditional response: 2+ weeks for campaign approval</li>
                <li>• Manual outreach to 100+ brands takes days</li>
                <li>• By the time content is ready, moment has passed</li>
              </ul>
            </div>

            <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-3">
              <h5 className="text-terminal-gold font-bold text-xs mb-2">The Breakthrough:</h5>
              <ul className="space-y-1 text-xs text-gray-300">
                <li>✓ AmplifyAI detects viral moments in real-time</li>
                <li>✓ Auto-generates branded content within 1-12 hours</li>
                <li>✓ Agent reviews and approves (not creates)</li>
                <li>✓ Execute campaigns while momentum exists</li>
              </ul>
            </div>
          </div>

          <div className="text-center pt-2">
            <div className="inline-flex items-center gap-2 bg-terminal-gold/20 border border-terminal-gold/30 rounded px-3 py-1">
              <span className="text-terminal-gold text-sm font-bold">48-72hr Execution</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'conversion',
      title: '🎯 Conversion Efficiency Bottleneck',
      icon: '📈',
      color: 'from-cyan-500 to-blue-500',
      content: (
        <div className="space-y-4">
          <div className="text-center mb-4">
            <p className="text-xs text-gray-400 mb-2">Static vs. Interactive</p>
            <div className="flex items-center justify-center gap-4">
              <div>
                <div className="text-3xl font-bold text-green-400">80%</div>
                <div className="text-xs text-gray-500">Potential Close Rate</div>
              </div>
              <div className="text-2xl text-gray-600">→</div>
              <div>
                <div className="text-3xl font-bold text-red-400">45%</div>
                <div className="text-xs text-gray-500">Actual Close Rate</div>
              </div>
            </div>
          </div>

          <div className="bg-red-500/20 border-2 border-red-500/50 rounded-lg p-4">
            <h4 className="text-red-400 font-bold text-sm mb-2 text-center">44% of Winnable Deals Lost</h4>
            <p className="text-xs text-gray-400 text-center">% close rate gap</p>
          </div>

          <div className="space-y-3">
            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-3">
              <h5 className="text-cyan-400 font-bold text-xs mb-2">The Problem:</h5>
              <ul className="space-y-1 text-xs text-gray-400">
                <li>• Static PDF pitch decks fail to inspire</li>
                <li>• Brands can't visualize athlete integration</li>
                <li>• No emotional connection or differentiation</li>
                <li>• Only 45% of qualified prospects close</li>
              </ul>
            </div>

            <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-3">
              <h5 className="text-terminal-gold font-bold text-xs mb-2">The Breakthrough:</h5>
              <ul className="space-y-1 text-xs text-gray-300">
                <li>✓ Vision Pro immersive pitch experiences</li>
                <li>✓ Spatial computing showcases athlete brand fit</li>
                <li>✓ Interactive demos with real athlete content</li>
                <li>✓ 65%+ close rate (35% improvement)</li>
              </ul>
            </div>
          </div>

          <div className="text-center pt-2">
            <div className="inline-flex items-center gap-2 bg-terminal-gold/20 border border-terminal-gold/30 rounded px-3 py-1">
              <span className="text-terminal-gold text-sm font-bold">65% Close Rate</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'solution',
      title: '✨ Integrated Solution Impact',
      icon: '🚀',
      color: 'from-terminal-gold to-yellow-500',
      content: (
        <div className="space-y-4">
          <p className="text-gray-300 text-sm text-center mb-4">
            When you solve all three bottlenecks simultaneously:
          </p>

          <div className="grid grid-cols-1 gap-3">
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="text-2xl">📊</div>
                <div className="flex-1">
                  <div className="text-green-400 font-bold text-sm">Content Velocity</div>
                  <div className="text-xs text-gray-400">2 → 20 deals/athlete/year</div>
                </div>
                <div className="text-terminal-gold font-bold text-lg">10x</div>
              </div>
            </div>

            <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="text-2xl">⚡</div>
                <div className="flex-1">
                  <div className="text-purple-400 font-bold text-sm">Speed to Market</div>
                  <div className="text-xs text-gray-400">336hrs → 72hrs</div>
                </div>
                <div className="text-terminal-gold font-bold text-lg">5x</div>
              </div>
            </div>

            <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="text-2xl">🎯</div>
                <div className="flex-1">
                  <div className="text-cyan-400 font-bold text-sm">Conversion Rate</div>
                  <div className="text-xs text-gray-400">45% → 65%</div>
                </div>
                <div className="text-terminal-gold font-bold text-lg">+44%</div>
              </div>
            </div>
          </div>

          <div className="bg-terminal-gold/20 border-2 border-terminal-gold/50 rounded-lg p-5 mt-6">
            <h4 className="text-terminal-gold font-bold text-center text-base mb-3">
              Combined Impact
            </h4>
            <div className="space-y-2 text-sm text-gray-300">
              <div className="flex justify-between">
                <span>Deals per agent per year:</span>
                <span className="text-terminal-gold font-bold">20 → 200</span>
              </div>
              <div className="flex justify-between">
                <span>Revenue per athlete:</span>
                <span className="text-terminal-gold font-bold">+$150K-$500K</span>
              </div>
              <div className="flex justify-between">
                <span>Deal close rate improvement:</span>
                <span className="text-terminal-gold font-bold">+35%</span>
              </div>
              <div className="flex justify-between">
                <span>Time to execute campaigns:</span>
                <span className="text-terminal-gold font-bold">48-72 hours</span>
              </div>
            </div>
          </div>

          <div className="text-center pt-3">
            <p className="text-terminal-gold font-bold text-sm">
              → 10x Portfolio Performance
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Without 10x the work
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
          The Value Extraction Gap
        </p>
        <p className="text-xs text-gray-500 mt-1">
          Three operational constraints limiting portfolio performance
        </p>
      </div>

      <AccordionDiagram
        sections={sections}
        title="3 Critical Bottlenecks"
        defaultOpen="content"
      />

      {/* Bottom Summary */}
      <div className="mt-8 bg-red-500/10 border border-red-500/30 rounded-lg p-4">
        <p className="text-red-400 font-bold text-sm text-center mb-2">
          The Status Quo Ceiling
        </p>
        <p className="text-xs text-gray-400 text-center">
          Traditional agencies hit performance limits due to manual content creation, slow execution, and static pitch materials.
          <span className="text-terminal-gold font-bold block mt-2">
            Our platform removes all three constraints simultaneously.
          </span>
        </p>
      </div>
    </div>
  );
}
