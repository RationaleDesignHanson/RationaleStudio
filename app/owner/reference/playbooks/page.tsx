/**
 * Playbooks Library
 *
 * Product studio processes, methodologies, and frameworks
 */

'use client';

import Link from 'next/link';
import { BookOpen, CheckCircle } from 'lucide-react';

export default function PlaybooksPage() {
  const playbooks = [
    {
      title: 'Product Definition Methodology',
      description: 'How to define products before building them',
      lastUpdated: 'Nov 2024',
      status: 'Complete',
    },
    {
      title: 'Dual-Engine Studio Model',
      description: 'Balancing ventures + partnerships for sustainable growth',
      lastUpdated: 'Nov 2024',
      status: 'Complete',
    },
    {
      title: 'Kits Engagement Process',
      description: 'Clarity Kit → Prototype Kit → Build+Ship+Run methodology',
      lastUpdated: 'Oct 2024',
      status: 'Complete',
    },
    {
      title: 'Partner Governance Framework',
      description: 'Quarterly voting, decision-making, and collaboration structure',
      lastUpdated: 'Dec 2024',
      status: 'Complete',
    },
    {
      title: 'AI-Accelerated Development',
      description: '10x productivity with Claude, Cursor, and modern tools',
      lastUpdated: 'Nov 2024',
      status: 'Complete',
    },
    {
      title: 'Portfolio Construction Strategy',
      description: 'Systematic approach to building 2-3 ventures per year',
      lastUpdated: 'Nov 2024',
      status: 'Complete',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-4 sm:px-6 md:px-8 py-12">
      <div className="mb-8">
        <Link
          href="/owner/reference"
          className="text-sm text-gray-400 hover:text-terminal-gold transition-colors mb-4 inline-block"
        >
          ← Back to Reference Library
        </Link>
        <div className="flex items-center gap-3 mb-4">
          <BookOpen className="w-8 h-8 text-terminal-gold" />
          <h1 className="text-3xl font-bold text-white">Playbooks</h1>
        </div>
        <p className="text-gray-400">
          Product studio processes, methodologies, and frameworks that guide how we build
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {playbooks.map((playbook, idx) => (
          <div
            key={idx}
            className="p-6 bg-gray-900/50 border border-gray-700 rounded-lg hover:border-terminal-gold/30 transition-colors"
          >
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-lg font-bold text-white">{playbook.title}</h3>
              <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
            </div>
            <p className="text-sm text-gray-400 mb-4">{playbook.description}</p>
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>Last updated: {playbook.lastUpdated}</span>
              <button
                disabled
                className="px-3 py-1 bg-gray-800 text-gray-600 rounded cursor-not-allowed"
              >
                View
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 p-6 bg-gray-900/30 border border-gray-800 rounded-lg">
        <h3 className="text-lg font-bold text-white mb-3">Playbook System</h3>
        <p className="text-sm text-gray-400 mb-4">
          These playbooks document the processes that make Rationale Studio systematic and scalable:
        </p>
        <ul className="space-y-2 text-sm text-gray-400">
          <li>• How we validate product ideas before building</li>
          <li>• How we structure partnerships and collaborations</li>
          <li>• How we use AI to accelerate development (10x productivity)</li>
          <li>• How we manage portfolio construction (2-3 ventures/year)</li>
          <li>• How partners participate in decision-making</li>
        </ul>
      </div>
    </div>
  );
}
