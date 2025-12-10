'use client';

import { SwipeableDiagram, type DiagramSlide } from '@/components/diagrams/SwipeableDiagram';

/**
 * Mobile-optimized AmplifyAI Timing Diagram
 * Shows traditional vs AmplifyAI workflow timing as swipeable comparison
 */
export default function AmplifyAITimingDiagramMobile() {
  const slides: DiagramSlide[] = [
    {
      id: 'traditional-workflow',
      content: (
        <div className="bg-gray-900/50 border-2 border-red-500/50 rounded-lg p-5 h-full">
          <div className="bg-red-500/20 rounded px-3 py-2 mb-4">
            <h4 className="text-red-400 font-bold text-sm">❌ TRADITIONAL WORKFLOW</h4>
          </div>

          <div className="space-y-4">
            {/* Day 0 - Viral Moment */}
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-16 text-center">
                <div className="text-terminal-gold font-bold text-sm">Day 0</div>
                <div className="text-xs text-gray-500 mt-0.5">⚡</div>
              </div>
              <div className="flex-1 bg-terminal-gold/20 border border-terminal-gold/50 rounded p-3">
                <h5 className="text-terminal-gold font-bold text-xs mb-1">Viral Moment Happens</h5>
                <p className="text-xs text-gray-400">
                  Athlete goes viral with game-winning play or social moment
                </p>
              </div>
            </div>

            {/* Day 1-2 */}
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-16 text-center">
                <div className="text-red-400 font-bold text-sm">Day 1-2</div>
              </div>
              <div className="flex-1 bg-gray-800/50 border border-red-500/30 rounded p-3">
                <h5 className="text-red-400 font-bold text-xs mb-1">Manual Brand Outreach</h5>
                <p className="text-xs text-gray-400">
                  Agent manually contacts 50-100 brands with generic pitch
                </p>
              </div>
            </div>

            {/* Day 3-5 */}
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-16 text-center">
                <div className="text-red-400 font-bold text-sm">Day 3-5</div>
              </div>
              <div className="flex-1 bg-gray-800/50 border border-red-500/30 rounded p-3">
                <h5 className="text-red-400 font-bold text-xs mb-1">Brand Deliberation</h5>
                <p className="text-xs text-gray-400">
                  Internal meetings, budget approvals, legal reviews
                </p>
              </div>
            </div>

            {/* Day 7-10 */}
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-16 text-center">
                <div className="text-red-400 font-bold text-sm">Day 7-10</div>
              </div>
              <div className="flex-1 bg-gray-800/50 border border-red-500/30 rounded p-3">
                <h5 className="text-red-400 font-bold text-xs mb-1">Content Production</h5>
                <p className="text-xs text-gray-400">
                  Schedule shoot, film, edit, approve final cut
                </p>
              </div>
            </div>

            {/* Day 14-21 */}
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-16 text-center">
                <div className="text-red-400 font-bold text-sm">Day 14+</div>
              </div>
              <div className="flex-1 bg-red-500/20 border border-red-500/50 rounded p-3">
                <h5 className="text-red-400 font-bold text-xs mb-1">Campaign Launch</h5>
                <p className="text-xs text-gray-400">
                  Content finally goes live — 2-3 weeks later
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Warning */}
          <div className="mt-5 pt-4 border-t border-red-500/30">
            <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 text-center">
              <div className="text-red-400 font-bold text-sm mb-1">⚠ Moment Has Passed</div>
              <p className="text-xs text-gray-500">
                70% of viral opportunities expire within 72 hours
              </p>
              <div className="text-red-400 font-bold text-2xl mt-2">336 hrs</div>
              <div className="text-xs text-gray-500">Typical Response Time</div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'amplifyai-workflow',
      content: (
        <div className="bg-gray-900/50 border-2 border-terminal-gold/50 rounded-lg p-5 h-full">
          <div className="bg-terminal-gold/20 rounded px-3 py-2 mb-4">
            <h4 className="text-terminal-gold font-bold text-sm">✅ AMPLIFYAI WORKFLOW</h4>
          </div>

          <div className="space-y-4">
            {/* Hour 0 - Viral Moment */}
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-16 text-center">
                <div className="text-terminal-gold font-bold text-sm">Hour 0</div>
                <div className="text-xs text-gray-500 mt-0.5">⚡</div>
              </div>
              <div className="flex-1 bg-terminal-gold/20 border border-terminal-gold/50 rounded p-3">
                <h5 className="text-terminal-gold font-bold text-xs mb-1">Viral Moment Happens</h5>
                <p className="text-xs text-gray-400">
                  Athlete goes viral with game-winning play or social moment
                </p>
              </div>
            </div>

            {/* Hour 1-12 */}
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-16 text-center">
                <div className="text-green-400 font-bold text-sm">1-12hr</div>
              </div>
              <div className="flex-1 bg-green-500/10 border border-green-500/30 rounded p-3">
                <h5 className="text-green-400 font-bold text-xs mb-1">AI Detection + Matching</h5>
                <p className="text-xs text-gray-400">
                  AmplifyAI detects trend, auto-matches to relevant brands
                </p>
              </div>
            </div>

            {/* Hour 12-24 */}
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-16 text-center">
                <div className="text-green-400 font-bold text-sm">12-24hr</div>
              </div>
              <div className="flex-1 bg-green-500/10 border border-green-500/30 rounded p-3">
                <h5 className="text-green-400 font-bold text-xs mb-1">AI Content Generation</h5>
                <p className="text-xs text-gray-400">
                  Digital Twin generates branded content variations
                </p>
              </div>
            </div>

            {/* Hour 24-48 */}
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-16 text-center">
                <div className="text-green-400 font-bold text-sm">24-48hr</div>
              </div>
              <div className="flex-1 bg-green-500/10 border border-green-500/30 rounded p-3">
                <h5 className="text-green-400 font-bold text-xs mb-1">Agent Review + Approve</h5>
                <p className="text-xs text-gray-400">
                  Agent reviews AI-generated content, approves best options
                </p>
              </div>
            </div>

            {/* Hour 48-72 */}
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-16 text-center">
                <div className="text-green-400 font-bold text-sm">48-72hr</div>
              </div>
              <div className="flex-1 bg-terminal-gold/20 border border-terminal-gold/50 rounded p-3">
                <h5 className="text-terminal-gold font-bold text-xs mb-1">Campaign Execution</h5>
                <p className="text-xs text-gray-400">
                  Content goes live while moment is still relevant
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Success */}
          <div className="mt-5 pt-4 border-t border-terminal-gold/30">
            <div className="bg-terminal-gold/20 border border-terminal-gold/50 rounded-lg p-3 text-center">
              <div className="text-terminal-gold font-bold text-sm mb-1">✓ Moment Captured</div>
              <p className="text-xs text-gray-500">
                Execute campaigns while cultural relevance exists
              </p>
              <div className="text-terminal-gold font-bold text-2xl mt-2">48-72hrs</div>
              <div className="text-xs text-gray-500">AmplifyAI Execution</div>
            </div>
          </div>

          {/* Comparison Footer */}
          <div className="mt-4 bg-green-500/10 border border-green-500/30 rounded p-3">
            <div className="flex justify-between items-center">
              <div className="text-center flex-1">
                <div className="text-xs text-gray-500 mb-1">Traditional</div>
                <div className="text-red-400 font-bold text-lg">336hrs</div>
              </div>
              <div className="text-2xl text-gray-600">→</div>
              <div className="text-center flex-1">
                <div className="text-xs text-gray-500 mb-1">AmplifyAI</div>
                <div className="text-terminal-gold font-bold text-lg">72hrs</div>
              </div>
            </div>
            <div className="text-center mt-2 pt-2 border-t border-green-500/30">
              <span className="text-green-400 font-bold text-sm">5x Faster Execution</span>
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
          The 48-72 Hour Window
        </p>
        <p className="text-xs text-gray-500 mt-1">
          Cultural moments have extremely short half-lives
        </p>
      </div>

      <SwipeableDiagram
        slides={slides}
        title="Traditional vs AmplifyAI Timing"
      />

      <div className="mt-6 bg-gray-800/50 border border-gray-700 rounded-lg p-4">
        <h4 className="text-terminal-gold font-bold text-sm mb-2 text-center">
          Why Speed = Competitive Advantage
        </h4>
        <p className="text-xs text-gray-400 text-center">
          Traditional agencies take 2-3 weeks to execute campaigns. By then, the viral moment has passed and engagement drops 70%.
          <span className="text-terminal-gold block mt-2">AmplifyAI captures momentum within 48-72 hours.</span>
        </p>
      </div>
    </div>
  );
}
