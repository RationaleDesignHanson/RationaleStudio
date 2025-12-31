/**
 * Heirloom GTM Planner
 *
 * Week-by-week go-to-market tactics with channel breakdown and budget tracking.
 * Embeds Notion GTM planner once set up in Week 1.
 */

import { EmbedFrame } from '../_components';

export default function GTMPage() {
  // TODO: Replace with actual Notion page URL after Week 1 setup
  // Format: https://notion.so/YOUR_PAGE_ID?embed=true
  const notionUrl = ''; // Will be filled after Notion setup

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">GTM Planner</h1>
        <p className="text-gray-600 mt-2">
          8-week tactical launch plan with channel-specific strategies and budget allocation
        </p>
      </div>

      {/* Week Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <WeekCard
          week="Week 1"
          title="Soft Launch"
          status="in-progress"
          focus="Landing page + TestFlight"
          budget="$500"
        />
        <WeekCard
          week="Week 2"
          title="Product Hunt"
          status="pending"
          focus="PH launch + initial press"
          budget="$1,000"
        />
        <WeekCard
          week="Week 3"
          title="Launch Week"
          status="pending"
          focus="App Store launch"
          budget="$2,000"
        />
        <WeekCard
          week="Week 4"
          title="Press & Media"
          status="pending"
          focus="Tech blogs + podcasts"
          budget="$1,500"
        />
        <WeekCard
          week="Week 5"
          title="Influencer Push"
          status="pending"
          focus="Cooking influencers"
          budget="$2,500"
        />
        <WeekCard
          week="Week 6"
          title="Community"
          status="pending"
          focus="Reddit + Slack groups"
          budget="$500"
        />
        <WeekCard
          week="Week 7"
          title="ASO Optimization"
          status="pending"
          focus="Keyword refinement"
          budget="$1,000"
        />
        <WeekCard
          week="Week 8"
          title="Retention Focus"
          status="pending"
          focus="In-app messaging"
          budget="$500"
        />
      </div>

      {/* Channel Performance Preview */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Channel Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ChannelCard
            name="Product Hunt"
            target="500-1K downloads"
            budget="$1,000"
            timing="Week 2"
          />
          <ChannelCard
            name="Tech Press"
            target="2K-5K downloads"
            budget="$1,500"
            timing="Week 4"
          />
          <ChannelCard
            name="Influencer Marketing"
            target="3K-8K downloads"
            budget="$2,500"
            timing="Week 5"
          />
          <ChannelCard
            name="Reddit & Communities"
            target="1K-3K downloads"
            budget="$500"
            timing="Week 6"
          />
          <ChannelCard
            name="ASO (Organic)"
            target="5K-10K downloads"
            budget="$1,000"
            timing="Ongoing"
          />
          <ChannelCard
            name="Paid Ads (Optional)"
            target="2K-5K downloads"
            budget="$3,000"
            timing="Week 7-8"
          />
        </div>
      </div>

      {/* Budget Summary */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Budget Allocation</h2>
        <div className="space-y-3">
          <BudgetRow category="Landing Page & Assets" amount={500} percentage={5} />
          <BudgetRow category="Product Hunt Campaign" amount={1000} percentage={10} />
          <BudgetRow category="Press & PR Outreach" amount={1500} percentage={15} />
          <BudgetRow category="Influencer Partnerships" amount={2500} percentage={25} />
          <BudgetRow category="Community & Content" amount={500} percentage={5} />
          <BudgetRow category="ASO Tools & Optimization" amount={1000} percentage={10} />
          <BudgetRow category="Paid Ads (Optional)" amount={3000} percentage={30} />
          <div className="pt-3 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <span className="font-bold text-gray-900">Total Budget</span>
              <span className="font-bold text-gray-900">$10,000</span>
            </div>
          </div>
        </div>
      </div>

      {/* Instructions (show until Notion is set up) */}
      {!notionUrl && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-bold text-blue-900 mb-2">
            📝 Setup Instructions
          </h3>
          <p className="text-blue-800 mb-4">
            To enable the interactive GTM planner, complete Week 1 setup:
          </p>
          <ol className="list-decimal list-inside space-y-2 text-blue-800">
            <li>
              Create Notion page: "Heirloom GTM Planner"
            </li>
            <li>
              Import weekly tasks from <code className="bg-blue-100 px-2 py-1 rounded">GO_TO_MARKET_PLAYBOOK.md</code>
            </li>
            <li>Add database properties: Week, Channel, Budget, Status, Owner</li>
            <li>Create Calendar and Kanban views</li>
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
          title="GTM Planner Notion Database"
          height="1000px"
        />
      ) : (
        <div className="bg-white border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
          <p className="text-gray-600 mb-2">
            Notion GTM planner will appear here after Week 1 setup
          </p>
          <p className="text-sm text-gray-500">
            In the meantime, reference <span className="font-mono bg-gray-100 px-2 py-1 rounded">
              /Users/matthanson/Heirloom/GO_TO_MARKET_PLAYBOOK.md
            </span>
          </p>
        </div>
      )}
    </div>
  );
}

// Week Card Component
function WeekCard({
  week,
  title,
  status,
  focus,
  budget,
}: {
  week: string;
  title: string;
  status: 'completed' | 'in-progress' | 'pending';
  focus: string;
  budget: string;
}) {
  const statusStyles = {
    completed: 'bg-green-50 border-green-200 text-green-800',
    'in-progress': 'bg-blue-50 border-blue-200 text-blue-800',
    pending: 'bg-gray-50 border-gray-200 text-gray-600',
  };

  const statusIcon = {
    completed: '✓',
    'in-progress': '→',
    pending: '○',
  };

  return (
    <div className={`border rounded-lg p-4 ${statusStyles[status]}`}>
      <div className="text-xs font-semibold uppercase tracking-wide mb-2">
        {week}
      </div>
      <h3 className="font-bold text-sm mb-2">{title}</h3>
      <div className="text-xs space-y-1">
        <p>{statusIcon[status]} {status === 'in-progress' ? 'In Progress' : status === 'completed' ? 'Complete' : 'Pending'}</p>
        <p className="opacity-80">{focus}</p>
        <p className="font-medium">{budget}</p>
      </div>
    </div>
  );
}

// Channel Card Component
function ChannelCard({
  name,
  target,
  budget,
  timing,
}: {
  name: string;
  target: string;
  budget: string;
  timing: string;
}) {
  return (
    <div className="border border-gray-200 rounded-lg p-4">
      <h4 className="font-bold text-gray-900 mb-3">{name}</h4>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">Target:</span>
          <span className="font-medium text-gray-900">{target}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Budget:</span>
          <span className="font-medium text-gray-900">{budget}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Timing:</span>
          <span className="font-medium text-gray-900">{timing}</span>
        </div>
      </div>
    </div>
  );
}

// Budget Row Component
function BudgetRow({
  category,
  amount,
  percentage,
}: {
  category: string;
  amount: number;
  percentage: number;
}) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-700">{category}</span>
        <span className="text-sm font-medium text-gray-900">
          ${amount.toLocaleString()}
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-blue-600 h-2 rounded-full transition-all"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
}
