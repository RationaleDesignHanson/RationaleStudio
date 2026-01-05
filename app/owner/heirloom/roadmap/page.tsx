/**
 * Heirloom Launch Tracker
 *
 * Displays 5-phase roadmap from beta testing to full launch with embedded Notion tracker.
 * Once Notion workspace is set up, replace placeholder URL with actual Notion page embed.
 */

import { EmbedFrame } from '../_components';

export default function RoadmapPage() {
  // TODO: Replace with actual Notion page URL after Week 1 setup
  // Format: https://notion.so/YOUR_PAGE_ID?embed=true
  const notionUrl = ''; // Will be filled after Notion setup

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Launch Tracker</h1>
        <p className="text-gray-600 mt-2">
          Track milestones across 5 phases: Closed Beta → Expanded Beta → Soft Launch → Full Launch → Growth
        </p>
      </div>

      {/* Phase Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <PhaseCard
          phase="Phase 1"
          name="Closed Beta"
          status="in-progress"
          date="Now - Jan 15"
          target="20-30 testers"
        />
        <PhaseCard
          phase="Phase 2"
          name="Expanded Beta"
          status="pending"
          date="Jan 16 - Feb 1"
          target="50-100 testers"
        />
        <PhaseCard
          phase="Phase 3"
          name="Soft Launch"
          status="pending"
          date="Feb 2-15"
          target="500-1K downloads"
        />
        <PhaseCard
          phase="Phase 4"
          name="Full Launch"
          status="pending"
          date="Feb 16 - Mar 31"
          target="5K-15K downloads"
        />
        <PhaseCard
          phase="Phase 5"
          name="Growth & Scale"
          status="pending"
          date="Apr 1 - Dec 31"
          target="100K-200K downloads"
        />
      </div>

      {/* Instructions (show until Notion is set up) */}
      {!notionUrl && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-bold text-blue-900 mb-2">
            📝 Setup Instructions
          </h3>
          <p className="text-blue-800 mb-4">
            To enable the interactive launch tracker, complete Week 1 setup:
          </p>
          <ol className="list-decimal list-inside space-y-2 text-blue-800">
            <li>
              Create Notion workspace: "Heirloom Strategy"
            </li>
            <li>
              Import tasks from <code className="bg-blue-100 px-2 py-1 rounded">USER_MILESTONE_ROADMAP.md</code>
            </li>
            <li>Create Kanban, Timeline, and Table views</li>
            <li>
              Click "Share" → "Publish to web" → Copy embed URL
            </li>
            <li>
              Update <code className="bg-blue-100 px-2 py-1 rounded">notionUrl</code> variable in this file
            </li>
          </ol>
        </div>
      )}

      {/* Embedded Notion (or placeholder) */}
      {notionUrl ? (
        <EmbedFrame
          src={notionUrl}
          title="Launch Tracker Notion Database"
          height="1000px"
        />
      ) : (
        <div className="bg-white border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
          <p className="text-gray-600 mb-2">
            Notion tracker will appear here after Week 1 setup
          </p>
          <p className="text-sm text-gray-500">
            In the meantime, reference <span className="font-mono bg-gray-100 px-2 py-1 rounded">
              /Users/matthanson/Heirloom/USER_MILESTONE_ROADMAP.md
            </span>
          </p>
        </div>
      )}
    </div>
  );
}

// Phase Card Component
function PhaseCard({
  phase,
  name,
  status,
  date,
  target,
}: {
  phase: string;
  name: string;
  status: 'completed' | 'in-progress' | 'pending';
  date: string;
  target: string;
}) {
  const statusStyles = {
    completed: 'bg-green-50 border-green-200 text-green-800',
    'in-progress': 'bg-blue-50 border-blue-200 text-blue-800',
    pending: 'bg-gray-50 border-gray-200 text-gray-600',
  };

  const statusLabel = {
    completed: '✓ Complete',
    'in-progress': '→ In Progress',
    pending: '○ Pending',
  };

  return (
    <div className={`border rounded-lg p-4 ${statusStyles[status]}`}>
      <div className="text-xs font-semibold uppercase tracking-wide mb-2">
        {phase}
      </div>
      <h3 className="font-bold text-sm mb-2">{name}</h3>
      <div className="text-xs space-y-1">
        <p>{statusLabel[status]}</p>
        <p className="opacity-80">{date}</p>
        <p className="opacity-80">{target}</p>
      </div>
    </div>
  );
}
