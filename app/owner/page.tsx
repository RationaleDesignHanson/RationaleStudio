/**
 * Owner Dashboard
 *
 * Matt-only dashboard for quick access to content library,
 * reference materials, and publishing tools.
 */

'use client';

import Link from 'next/link';
import { FileText, Book, Zap, TrendingUp, Clock, Folder } from 'lucide-react';

export default function OwnerDashboardPage() {
  // TODO: Replace with real data from content management system
  const recentlyViewed = [
    { title: 'Zero Case Study (Long)', path: '/owner/content/case-studies/zero', type: 'Case Study', date: '2 hours ago' },
    { title: 'Product Studio Positioning', path: '/owner/reference/playbooks/positioning', type: 'Playbook', date: '1 day ago' },
    { title: 'LinkedIn Post Template', path: '/owner/content/social/templates', type: 'Template', date: '3 days ago' },
  ];

  const quickStats = [
    { label: 'Blog Drafts', value: '3', icon: FileText },
    { label: 'Case Studies', value: '8', icon: Folder },
    { label: 'Published Posts', value: '12', icon: TrendingUp },
    { label: 'Templates', value: '15', icon: Zap },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4 sm:px-6 md:px-8 py-12">
      {/* Welcome Section */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-white mb-2">
          Welcome Back, Matt
        </h2>
        <p className="text-gray-400">
          Your content library and reference materials, organized by function.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
        {quickStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="p-6 bg-gray-900/70 border border-gray-800 rounded-lg hover:border-terminal-gold/30 transition-colors"
            >
              <Icon className="w-6 h-6 text-terminal-gold mb-3" />
              <div className="text-3xl font-bold text-white mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </div>
          );
        })}
      </div>

      {/* Main Sections */}
      <div className="grid md:grid-cols-2 gap-4 md:gap-6 lg:gap-8 mb-12">
        {/* Content Library */}
        <div className="p-8 bg-gray-900/50 border border-gray-700 rounded-lg">
          <div className="flex items-center gap-3 mb-6">
            <FileText className="w-6 h-6 text-terminal-gold" />
            <h3 className="text-xl font-bold text-white">Content Library</h3>
          </div>

          <p className="text-sm text-gray-400 mb-6">
            Blog posts, case studies, and social content ready to publish or export.
          </p>

          <div className="space-y-3">
            <Link
              href="/owner/content/blog"
              className="block p-4 bg-gray-800/50 hover:bg-gray-800 border border-gray-700 hover:border-terminal-gold/30 rounded-lg transition-colors"
            >
              <div className="font-semibold text-white mb-1">Blog Posts</div>
              <div className="text-xs text-gray-400">
                Drafts ready for /thinking section
              </div>
            </Link>

            <Link
              href="/owner/content/case-studies"
              className="block p-4 bg-gray-800/50 hover:bg-gray-800 border border-gray-700 hover:border-terminal-gold/30 rounded-lg transition-colors"
            >
              <div className="font-semibold text-white mb-1">Case Studies</div>
              <div className="text-xs text-gray-400">
                Multiple formats (long, short, carousel, talk)
              </div>
            </Link>

            <Link
              href="/owner/content/social"
              className="block p-4 bg-gray-800/50 hover:bg-gray-800 border border-gray-700 hover:border-terminal-gold/30 rounded-lg transition-colors"
            >
              <div className="font-semibold text-white mb-1">Social Content</div>
              <div className="text-xs text-gray-400">
                LinkedIn posts, Twitter threads, carousels
              </div>
            </Link>
          </div>
        </div>

        {/* Reference Materials */}
        <div className="p-8 bg-gray-900/50 border border-gray-700 rounded-lg">
          <div className="flex items-center gap-3 mb-6">
            <Book className="w-6 h-6 text-terminal-gold" />
            <h3 className="text-xl font-bold text-white">Reference</h3>
          </div>

          <p className="text-sm text-gray-400 mb-6">
            Process docs, playbooks, and agent system documentation.
          </p>

          <div className="space-y-3">
            <Link
              href="/owner/reference/agents"
              className="block p-4 bg-gray-800/50 hover:bg-gray-800 border border-gray-700 hover:border-terminal-gold/30 rounded-lg transition-colors"
            >
              <div className="font-semibold text-white mb-1">Agent System</div>
              <div className="text-xs text-gray-400">
                Zero, Atlas, Amplify agent documentation
              </div>
            </Link>

            <Link
              href="/owner/reference/playbooks"
              className="block p-4 bg-gray-800/50 hover:bg-gray-800 border border-gray-700 hover:border-terminal-gold/30 rounded-lg transition-colors"
            >
              <div className="font-semibold text-white mb-1">Playbooks</div>
              <div className="text-xs text-gray-400">
                Product studio processes and frameworks
              </div>
            </Link>

            <Link
              href="/owner/reference/templates"
              className="block p-4 bg-gray-800/50 hover:bg-gray-800 border border-gray-700 hover:border-terminal-gold/30 rounded-lg transition-colors"
            >
              <div className="font-semibold text-white mb-1">Templates</div>
              <div className="text-xs text-gray-400">
                Pitch decks, proposals, content formats
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Recently Viewed */}
      <div className="p-8 bg-gray-900/50 border border-gray-700 rounded-lg">
        <div className="flex items-center gap-3 mb-6">
          <Clock className="w-5 h-5 text-terminal-gold" />
          <h3 className="text-lg font-bold text-white">Recently Viewed</h3>
        </div>

        <div className="space-y-3">
          {recentlyViewed.map((item, index) => (
            <Link
              key={index}
              href={item.path}
              className="block p-4 bg-gray-800/30 hover:bg-gray-800/50 border border-gray-800 hover:border-terminal-gold/20 rounded-lg transition-colors"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="font-medium text-white mb-1">{item.title}</div>
                  <div className="text-xs text-gray-400">{item.type}</div>
                </div>
                <div className="text-xs text-gray-500">{item.date}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Publishing Tools (Placeholder) */}
      <div className="mt-8 p-6 bg-gray-900/30 border border-gray-800 rounded-lg">
        <div className="flex items-center gap-3 mb-3">
          <Zap className="w-5 h-5 text-terminal-gold" />
          <h4 className="text-sm font-bold text-white">Publishing Tools</h4>
        </div>
        <p className="text-xs text-gray-400 mb-4">
          One-click publish to /thinking, export social variants, copy to clipboard.
          Full workflow coming in later phase.
        </p>
        <div className="flex gap-3">
          <button
            disabled
            className="px-4 py-2 bg-gray-800 text-gray-600 text-sm font-medium rounded-lg cursor-not-allowed"
          >
            Publish Blog Post
          </button>
          <button
            disabled
            className="px-4 py-2 bg-gray-800 text-gray-600 text-sm font-medium rounded-lg cursor-not-allowed"
          >
            Export Social Variants
          </button>
        </div>
      </div>
    </div>
  );
}
