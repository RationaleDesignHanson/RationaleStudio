/**
 * CREaiT Client Portal
 *
 * Navigation hub for all CREaiT materials and presentations
 */

'use client';

import Link from 'next/link';
import { Map } from 'lucide-react';

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
        {/* Strategic Roadmap - Featured */}
        <Link
          href="/clients/creait/strategic-roadmap"
          className="group block p-8 bg-gray-900/40 backdrop-blur-sm rounded-xl border-2 border-[#FFD700]/30 hover:border-[#FFD700] transition-all duration-300 max-w-3xl mx-auto"
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
