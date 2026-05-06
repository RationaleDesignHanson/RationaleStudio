/**
 * Team Documentation Page
 *
 * Internal documentation hub with playbooks, processes, and best practices
 */

import Link from 'next/link';
import { FileText, Download } from 'lucide-react';
import { teamContent } from '@/lib/content';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Documentation | Team Portal | Rationale',
  description: 'Internal playbooks, processes, and knowledge base for Rationale team',
};

export default function TeamDocsPage() {
  const { documentation } = teamContent;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white">
      {/* Hero Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-4 sm:px-6 md:px-8 border-b border-gray-800">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl sm:text-2xl md:text-3xl lg:text-4xl md:text-5xl font-bold text-white mb-4">
            {documentation.hero.title}
          </h1>
          <p className="text-xl text-purple-400 mb-4">{documentation.hero.subtitle}</p>
          <p className="text-base text-gray-300 max-w-3xl">{documentation.hero.description}</p>
        </div>
      </section>

      {/* Search/Filter Section */}
      <section className="py-8 px-4 sm:px-6 lg:px-4 sm:px-6 md:px-8 border-b border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <div className="flex-1 w-full">
              <input
                type="text"
                placeholder="Search documentation..."
                className="w-full px-4 py-3 bg-gray-900/70 border border-gray-700 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-purple-400/50"
                disabled
              />
            </div>
            <button
              className="px-6 py-3 bg-purple-500/20 border border-purple-500/30 text-purple-400 rounded-lg hover:bg-purple-500/30 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              disabled
            >
              Search (Coming Soon)
            </button>
          </div>
        </div>
      </section>

      {/* Documentation Categories */}
      <section className="py-12 px-4 sm:px-6 lg:px-4 sm:px-6 md:px-8">
        <div className="max-w-7xl mx-auto space-y-12">
          {documentation.categories.map((category, idx) => (
            <div
              key={idx}
              className="p-6 bg-gray-900/50 border border-gray-700 rounded-lg"
            >
              {/* Category Header */}
              <div className="flex items-start gap-4 mb-6 pb-6 border-b border-gray-800">
                <div className="text-2xl md:text-3xl lg:text-4xl">{category.icon}</div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-white mb-2">{category.name}</h2>
                  <p className="text-sm text-gray-400">{category.description}</p>
                </div>
                <div className="text-sm text-purple-400 font-medium">
                  {category.docs.length} documents
                </div>
              </div>

              {/* Documents List */}
              <div className="grid md:grid-cols-2 gap-4">
                {category.docs.map((doc, didx) => (
                  <Link
                    key={didx}
                    href="#"
                    className="flex items-start gap-3 p-4 bg-gray-900/70 border border-gray-800 rounded-lg hover:border-purple-400/50 transition-colors group"
                  >
                    <FileText className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-semibold text-white mb-1 group-hover:text-purple-400 transition-colors">
                        {doc.title}
                      </h3>
                      <p className="text-xs text-gray-500">
                        Last updated: {doc.lastUpdated}
                      </p>
                    </div>
                    <Download className="w-4 h-4 text-gray-500 group-hover:text-purple-400 transition-colors flex-shrink-0" />
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-12 px-4 sm:px-6 lg:px-4 sm:px-6 md:px-8 border-t border-gray-800">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-xl font-bold text-white mb-6">Documentation Stats</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="p-6 bg-gray-900/50 border border-gray-700 rounded-lg">
              <div className="text-3xl font-bold text-purple-400 mb-2">
                {documentation.categories.reduce((acc, cat) => acc + cat.docs.length, 0)}
              </div>
              <div className="text-sm font-semibold text-white mb-1">Total Documents</div>
              <div className="text-xs text-gray-400">Across all categories</div>
            </div>
            <div className="p-6 bg-gray-900/50 border border-gray-700 rounded-lg">
              <div className="text-3xl font-bold text-purple-400 mb-2">
                {documentation.categories.length}
              </div>
              <div className="text-sm font-semibold text-white mb-1">Categories</div>
              <div className="text-xs text-gray-400">Development, Product, Ops, Marketing, Design, Security</div>
            </div>
            <div className="p-6 bg-gray-900/50 border border-gray-700 rounded-lg">
              <div className="text-3xl font-bold text-purple-400 mb-2">6</div>
              <div className="text-sm font-semibold text-white mb-1">Recent Updates</div>
              <div className="text-xs text-gray-400">Updated in Dec 2024</div>
            </div>
            <div className="p-6 bg-gray-900/50 border border-gray-700 rounded-lg">
              <div className="text-3xl font-bold text-purple-400 mb-2">100%</div>
              <div className="text-sm font-semibold text-white mb-1">Coverage</div>
              <div className="text-xs text-gray-400">All processes documented</div>
            </div>
          </div>
        </div>
      </section>

      {/* Request New Doc */}
      <section className="py-12 px-4 sm:px-6 lg:px-4 sm:px-6 md:px-8 border-t border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="p-8 bg-purple-500/10 border border-purple-500/30 rounded-lg text-center">
            <h2 className="text-2xl font-bold text-white mb-3">Need a New Document?</h2>
            <p className="text-sm text-gray-300 mb-6 max-w-2xl mx-auto">
              If you can't find what you're looking for or need a new process documented, reach out to the team lead or submit a documentation request.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/team"
                className="px-6 py-3 bg-purple-500/20 border border-purple-500/30 text-purple-400 rounded-lg hover:bg-purple-500/30 transition-colors font-medium"
              >
                Request Documentation
              </Link>
              <Link
                href="/team/admin"
                className="px-6 py-3 bg-gray-900/70 border border-gray-700 text-gray-300 rounded-lg hover:border-purple-400/50 transition-colors font-medium"
              >
                Contact Admin
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
