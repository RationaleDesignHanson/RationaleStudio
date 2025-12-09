/**
 * Reference Library Index
 *
 * Process docs, playbooks, agent system documentation,
 * and templates organized by function.
 */

'use client';

import Link from 'next/link';
import { Cpu, BookOpen, FileCode } from 'lucide-react';

export default function ReferenceLibraryPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <Link
          href="/owner"
          className="text-sm text-gray-400 hover:text-terminal-gold transition-colors mb-4 inline-block"
        >
          ← Back to Dashboard
        </Link>
        <h1 className="text-3xl font-bold text-white mb-2">Reference Library</h1>
        <p className="text-gray-400">
          Process documentation, playbooks, and agent system specs.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Agent System */}
        <Link
          href="/owner/reference/agents"
          className="p-6 bg-gray-900/50 border border-gray-700 hover:border-terminal-gold/30 rounded-lg transition-colors"
        >
          <Cpu className="w-8 h-8 text-terminal-gold mb-4" />
          <h3 className="text-lg font-bold text-white mb-2">Agent System</h3>
          <p className="text-sm text-gray-400 mb-4">
            Documentation for Zero, Atlas, Amplify, and internal agents.
          </p>
          <div className="text-xs text-gray-500">5 active agents</div>
        </Link>

        {/* Playbooks */}
        <Link
          href="/owner/reference/playbooks"
          className="p-6 bg-gray-900/50 border border-gray-700 hover:border-terminal-gold/30 rounded-lg transition-colors"
        >
          <BookOpen className="w-8 h-8 text-terminal-gold mb-4" />
          <h3 className="text-lg font-bold text-white mb-2">Playbooks</h3>
          <p className="text-sm text-gray-400 mb-4">
            Product studio processes, methodologies, and frameworks.
          </p>
          <div className="text-xs text-gray-500">Kits methodology, dual-engine model</div>
        </Link>

        {/* Templates */}
        <Link
          href="/owner/reference/templates"
          className="p-6 bg-gray-900/50 border border-gray-700 hover:border-terminal-gold/30 rounded-lg transition-colors"
        >
          <FileCode className="w-8 h-8 text-terminal-gold mb-4" />
          <h3 className="text-lg font-bold text-white mb-2">Templates</h3>
          <p className="text-sm text-gray-400 mb-4">
            Pitch decks, proposals, content templates, and formats.
          </p>
          <div className="text-xs text-gray-500">15+ templates</div>
        </Link>
      </div>

      {/* Key Reference Documents */}
      <div className="mt-12">
        <h3 className="text-lg font-bold text-white mb-6">Key Documents</h3>

        <div className="space-y-3">
          <div className="p-4 bg-gray-900/30 border border-gray-800 rounded-lg">
            <div className="flex items-start justify-between">
              <div>
                <div className="font-medium text-white mb-1">
                  Customer Analysis (VC Perspective)
                </div>
                <div className="text-xs text-gray-400">
                  From investor folder - positioning analysis
                </div>
              </div>
              <Link
                href="/owner/reference/playbooks"
                className="text-xs text-terminal-gold hover:underline"
              >
                View →
              </Link>
            </div>
          </div>

          <div className="p-4 bg-gray-900/30 border border-gray-800 rounded-lg">
            <div className="flex items-start justify-between">
              <div>
                <div className="font-medium text-white mb-1">
                  Agent System Quick Start
                </div>
                <div className="text-xs text-gray-400">
                  Initialize and use agents for product development
                </div>
              </div>
              <Link
                href="/owner/reference/agents"
                className="text-xs text-terminal-gold hover:underline"
              >
                View →
              </Link>
            </div>
          </div>

          <div className="p-4 bg-gray-900/30 border border-gray-800 rounded-lg">
            <div className="flex items-start justify-between">
              <div>
                <div className="font-medium text-white mb-1">
                  VC Validation Roadmap
                </div>
                <div className="text-xs text-gray-400">
                  Investment thesis and portfolio strategy
                </div>
              </div>
              <Link
                href="/owner/reference/playbooks"
                className="text-xs text-terminal-gold hover:underline"
              >
                View →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
