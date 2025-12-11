/**
 * Content Library Index
 *
 * All content ready to publish or export:
 * - Blog posts for /thinking
 * - Case studies in multiple formats
 * - Social media content variants
 */

'use client';

import Link from 'next/link';
import { FileText, Folder, Share2 } from 'lucide-react';

export default function ContentLibraryPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-4 sm:px-6 md:px-8 py-12">
      <div className="mb-8">
        <Link
          href="/owner"
          className="text-sm text-gray-400 hover:text-terminal-gold transition-colors mb-4 inline-block"
        >
          ← Back to Dashboard
        </Link>
        <h1 className="text-3xl font-bold text-white mb-2">Content Library</h1>
        <p className="text-gray-400">
          Content organized and ready to publish or export.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Blog Posts */}
        <Link
          href="/owner/content/blog"
          className="p-6 bg-gray-900/50 border border-gray-700 hover:border-terminal-gold/30 rounded-lg transition-colors"
        >
          <FileText className="w-8 h-8 text-terminal-gold mb-4" />
          <h3 className="text-lg font-bold text-white mb-2">Blog Posts</h3>
          <p className="text-sm text-gray-400 mb-4">
            Drafts ready for /thinking section. One-click publish workflow.
          </p>
          <div className="text-xs text-gray-500">3 drafts</div>
        </Link>

        {/* Case Studies */}
        <Link
          href="/owner/content/case-studies"
          className="p-6 bg-gray-900/50 border border-gray-700 hover:border-terminal-gold/30 rounded-lg transition-colors"
        >
          <Folder className="w-8 h-8 text-terminal-gold mb-4" />
          <h3 className="text-lg font-bold text-white mb-2">Case Studies</h3>
          <p className="text-sm text-gray-400 mb-4">
            Multiple formats: long, short, carousel, talk outlines, LinkedIn posts.
          </p>
          <div className="text-xs text-gray-500">Zero, FUBO, Rumi (5 variants each)</div>
        </Link>

        {/* Social Content */}
        <Link
          href="/owner/content/social"
          className="p-6 bg-gray-900/50 border border-gray-700 hover:border-terminal-gold/30 rounded-lg transition-colors"
        >
          <Share2 className="w-8 h-8 text-terminal-gold mb-4" />
          <h3 className="text-lg font-bold text-white mb-2">Social Content</h3>
          <p className="text-sm text-gray-400 mb-4">
            LinkedIn posts, Twitter threads, carousel templates.
          </p>
          <div className="text-xs text-gray-500">15 templates</div>
        </Link>
      </div>

      {/* Content from V01 to Organize */}
      <div className="mt-12 p-6 bg-gray-900/30 border border-gray-800 rounded-lg">
        <h3 className="text-lg font-bold text-white mb-4">
          Content to Organize (from V01)
        </h3>
        <div className="space-y-2 text-sm text-gray-400">
          <div>• /cases/zero/ - 5 formats (long, short, carousel, talk, LinkedIn)</div>
          <div>• /cases/fubo/ - 5 formats (long, short, carousel, talk, LinkedIn)</div>
          <div>• /cases/rumi/ - 5 formats (long, short, carousel, talk, LinkedIn)</div>
          <div>• Content marketing suite documents</div>
          <div>• Social post templates and variants</div>
        </div>
      </div>
    </div>
  );
}
