/**
 * Blog Content Library
 *
 * Repository of blog posts for /thinking section
 */

'use client';

import Link from 'next/link';
import { FileText, Clock, Tag } from 'lucide-react';

export default function BlogContentPage() {
  const drafts = [
    {
      title: 'Build-First Trap: Why Starting with Code Kills Products',
      status: 'Draft',
      lastEdited: '3 days ago',
      wordCount: 1850,
      tags: ['Product Strategy', 'Methodology'],
    },
    {
      title: 'Dual-Engine Model: Ventures + Kits',
      status: 'Draft',
      lastEdited: '1 week ago',
      wordCount: 2100,
      tags: ['Business Model', 'Studio'],
    },
    {
      title: 'AI Acceleration: 10x Productivity in 2024',
      status: 'Draft',
      lastEdited: '2 weeks ago',
      wordCount: 1650,
      tags: ['AI', 'Development'],
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <Link
          href="/owner/content"
          className="text-sm text-gray-400 hover:text-[#FFD700] transition-colors mb-4 inline-block"
        >
          ← Back to Content Library
        </Link>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Blog Posts</h1>
            <p className="text-gray-400">
              Drafts ready for /thinking section. One-click publish workflow coming soon.
            </p>
          </div>
          <button
            disabled
            className="px-4 py-2 bg-gray-800 text-gray-600 rounded-lg cursor-not-allowed"
          >
            + New Draft
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {drafts.map((draft, idx) => (
          <div
            key={idx}
            className="p-6 bg-gray-900/50 border border-gray-700 rounded-lg hover:border-[#FFD700]/30 transition-colors"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-2">{draft.title}</h3>
                <div className="flex items-center gap-4 text-sm text-gray-400">
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {draft.lastEdited}
                  </span>
                  <span>{draft.wordCount} words</span>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-yellow-500/20 text-yellow-400 border border-yellow-500/30">
                {draft.status}
              </span>
            </div>

            <div className="flex items-center gap-2 mb-4">
              <Tag className="w-4 h-4 text-gray-500" />
              {draft.tags.map((tag, tidx) => (
                <span
                  key={tidx}
                  className="px-2 py-1 rounded text-xs bg-gray-800 text-gray-300"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex gap-3">
              <button
                disabled
                className="px-4 py-2 bg-gray-800 text-gray-600 text-sm font-medium rounded-lg cursor-not-allowed"
              >
                Edit Draft
              </button>
              <button
                disabled
                className="px-4 py-2 bg-gray-800 text-gray-600 text-sm font-medium rounded-lg cursor-not-allowed"
              >
                Publish to /thinking
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 p-6 bg-gray-900/30 border border-gray-800 rounded-lg">
        <h3 className="text-lg font-bold text-white mb-3">Content Workflow (Coming Soon)</h3>
        <ul className="space-y-2 text-sm text-gray-400">
          <li>• One-click publish to /thinking section</li>
          <li>• Auto-generate social variants (LinkedIn, Twitter)</li>
          <li>• Export as markdown or PDF</li>
          <li>• Schedule publication dates</li>
          <li>• Track analytics and engagement</li>
        </ul>
      </div>
    </div>
  );
}
