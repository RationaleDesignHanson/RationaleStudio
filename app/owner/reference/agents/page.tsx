/**
 * Agent System Documentation
 *
 * Documentation for Zero, Atlas, Amplify, and internal agents
 */

'use client';

import Link from 'next/link';
import { Cpu, Zap } from 'lucide-react';

export default function AgentsPage() {
  const agents = [
    {
      name: 'Zero Email AI',
      status: 'Production',
      description: 'Multi-agent email triage system with 91.7% accuracy',
      agents: ['Classifier', 'Summarizer', 'Responder', 'Scheduler'],
    },
    {
      name: 'Atlas CRE Intelligence',
      status: 'Blueprint',
      description: 'AI-powered commercial real estate intelligence platform',
      agents: ['Property Analyzer', 'Market Intelligence', 'Deal Finder'],
    },
    {
      name: 'Amplify NIL Platform',
      status: 'Blueprint',
      description: 'Multi-agent system for NIL compliance and recruiting',
      agents: ['Compliance Checker', 'Brand Matcher', 'Deal Negotiator', 'Content Generator'],
    },
    {
      name: 'Internal Development Agents',
      status: 'Active',
      description: 'Claude Code agents for development workflow',
      agents: ['Systems Architect', 'UX Expert', 'VC Analyst', 'Marketing Strategist'],
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
          <Cpu className="w-8 h-8 text-terminal-gold" />
          <h1 className="text-3xl font-bold text-white">Agent System</h1>
        </div>
        <p className="text-gray-400">
          Documentation for product agents (Zero, Atlas, Amplify) and internal development agents
        </p>
      </div>

      <div className="space-y-6">
        {agents.map((agent, idx) => (
          <div
            key={idx}
            className="p-6 bg-gray-900/50 border border-gray-700 rounded-lg"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold text-white mb-2">{agent.name}</h3>
                <p className="text-sm text-gray-400 mb-3">{agent.description}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                agent.status === 'Production'
                  ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                  : agent.status === 'Blueprint'
                  ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                  : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
              }`}>
                {agent.status}
              </span>
            </div>

            <div className="flex items-center gap-2 mb-4">
              <Zap className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-500">Sub-agents:</span>
            </div>

            <div className="flex flex-wrap gap-2">
              {agent.agents.map((subAgent, sidx) => (
                <span
                  key={sidx}
                  className="px-3 py-1 rounded text-xs bg-gray-800 text-gray-300 border border-gray-700"
                >
                  {subAgent}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 p-6 bg-gray-900/30 border border-gray-800 rounded-lg">
        <h3 className="text-lg font-bold text-white mb-3">Agent Architecture</h3>
        <p className="text-sm text-gray-400 mb-4">
          All Rationale products are built with multi-agent AI architectures:
        </p>
        <ul className="space-y-2 text-sm text-gray-400">
          <li>• Specialized sub-agents for different tasks</li>
          <li>• Coordinator agents that orchestrate workflows</li>
          <li>• Context-aware reasoning with tool use</li>
          <li>• Continuous learning from user feedback</li>
          <li>• 90%+ accuracy benchmarks before launch</li>
        </ul>
      </div>
    </div>
  );
}
