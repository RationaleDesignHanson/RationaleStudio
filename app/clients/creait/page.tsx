/**
 * CREaiT Client Portal
 *
 * Navigation hub for all CREaiT materials and presentations
 */

'use client';

import Link from 'next/link';
import { FileText, Map, TrendingUp, Users } from 'lucide-react';

export default function CREaiTPortalPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white">
      {/* Header */}
      <div className="border-b border-gray-700 bg-gray-900/40 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2 text-white">CREaiT Materials</h1>
          <p className="text-gray-400">Comprehensive analysis and strategic guidance</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Strategic Roadmap - NEW */}
          <Link
            href="/clients/creait/strategic-roadmap"
            className="group p-8 bg-gray-900/40 backdrop-blur-sm rounded-xl border-2 border-[#FFD700]/30 hover:border-[#FFD700] transition-all duration-300"
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-[#FFD700]/20 flex items-center justify-center text-[#FFD700] group-hover:bg-[#FFD700]/30 transition-colors">
                <Map className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <div className="inline-block px-2 py-1 rounded text-xs font-semibold bg-[#FFD700]/20 text-[#FFD700] mb-2">
                  NEW - December 2025
                </div>
                <h2 className="text-2xl font-bold mb-2 text-white group-hover:text-[#FFD700] transition-colors">
                  Strategic Roadmap
                </h2>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Final strategic guidance for your team. Evidence-based analysis showing what you've built,
                  what's missing, and your three paths forward. Vendor-neutral and actionable.
                </p>
                <div className="mt-4 text-sm text-[#FFD700]">
                  8 slides • Evidence-based • Infographics
                </div>
              </div>
            </div>
          </Link>

          {/* Pitch Deck - 12-Week Proposal */}
          <Link
            href="/clients/creait/pitch-deck"
            className="group p-8 bg-gray-900/40 backdrop-blur-sm rounded-xl border-2 border-gray-700 hover:border-[#FFD700] transition-all duration-300"
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center text-purple-400 group-hover:bg-purple-500/30 transition-colors">
                <FileText className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-2 text-white group-hover:text-purple-400 transition-colors">
                  12-Week Proposal
                </h2>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Comprehensive consulting proposal showing Rationale's 12-week engagement plan.
                  Includes current state assessment, gaps analysis, deliverables, and pricing.
                </p>
                <div className="mt-4 text-sm text-purple-400">
                  Multi-section deck • Consulting proposal
                </div>
              </div>
            </div>
          </Link>

          {/* Investor Portal */}
          <Link
            href="/clients/creait/investor-portal"
            className="group p-8 bg-gray-900/40 backdrop-blur-sm rounded-xl border-2 border-gray-700 hover:border-[#FFD700] transition-all duration-300"
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500/30 transition-colors">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-2 text-white group-hover:text-emerald-400 transition-colors">
                  Investor Portal
                </h2>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Investor-facing materials including pitch deck, business plan, and financial projections.
                </p>
                <div className="mt-4 text-sm text-emerald-400">
                  Fundraising materials
                </div>
              </div>
            </div>
          </Link>

          {/* Pitch (Simple) */}
          <Link
            href="/clients/creait/pitch"
            className="group p-8 bg-gray-900/40 backdrop-blur-sm rounded-xl border-2 border-gray-700 hover:border-[#FFD700] transition-all duration-300"
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-sky-500/20 flex items-center justify-center text-sky-400 group-hover:bg-sky-500/30 transition-colors">
                <Users className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-2 text-white group-hover:text-sky-400 transition-colors">
                  Simple Pitch
                </h2>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Simplified pitch presentation for quick overviews and introductory meetings.
                </p>
                <div className="mt-4 text-sm text-sky-400">
                  Quick overview
                </div>
              </div>
            </div>
          </Link>

        </div>

        {/* Analysis Documents Reference */}
        <div className="mt-12 p-8 bg-gray-900/40 backdrop-blur-sm rounded-xl border border-gray-700">
          <h3 className="text-xl font-bold mb-4 text-white">Analysis Documents</h3>
          <p className="text-gray-400 text-sm leading-relaxed mb-4">
            Comprehensive codebase analysis and strategic recommendations are available at:
          </p>
          <div className="font-mono text-sm bg-gray-950/50 p-4 rounded-lg border border-gray-700 text-blue-400">
            /Users/matthanson/creait-project/
          </div>
          <div className="mt-4 text-xs text-gray-500">
            12 documents • 14,782 lines • December 3, 2024 + December 8, 2025 validation
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-12 pt-8 border-t border-gray-700 text-center">
          <p className="text-sm text-gray-500">
            All materials are evidence-based and include specific code analysis, file paths, and actionable recommendations.
          </p>
        </div>
      </div>
    </div>
  );
}
