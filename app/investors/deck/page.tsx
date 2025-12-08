/**
 * Investor Pitch Deck
 *
 * Public pitch deck for Rationale Studio investment opportunities
 * Used by 2 links across the site
 */

'use client';

import Link from 'next/link';
import { Container } from '@/components/layout';
import { FileText, Download, Lock } from 'lucide-react';

export default function InvestorsDeckPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white">
      <Container>
        <div className="py-12">
          {/* Header */}
          <div className="mb-8">
            <Link
              href="/investors"
              className="text-sm text-gray-400 hover:text-[#FFD700] transition-colors mb-4 inline-block"
            >
              ← Back to Investment Opportunities
            </Link>
            <div className="flex items-center gap-3 mb-4">
              <FileText className="w-8 h-8 text-[#FFD700]" />
              <h1 className="text-3xl sm:text-4xl font-bold text-white">
                Rationale Studio Pitch Deck
              </h1>
            </div>
            <p className="text-lg text-gray-400 mb-2">
              Investment overview for studio and venture opportunities
            </p>
            <p className="text-sm text-gray-500">
              Last updated: December 2024
            </p>
          </div>

          {/* Deck Access */}
          <div className="max-w-4xl mx-auto">
            <div className="p-8 bg-gray-900/50 border border-gray-700 rounded-lg mb-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 bg-[#FFD700]/10 rounded-lg">
                  <FileText className="w-8 h-8 text-[#FFD700]" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-white mb-2">Investment Deck</h2>
                  <p className="text-sm text-gray-400 mb-4">
                    45-page comprehensive overview of Rationale Studio, portfolio companies, financial projections, and investment opportunities
                  </p>
                  <div className="grid sm:grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500 mb-1">Format:</p>
                      <p className="text-white">PDF (Interactive)</p>
                    </div>
                    <div>
                      <p className="text-gray-500 mb-1">Size:</p>
                      <p className="text-white">12.8 MB</p>
                    </div>
                    <div>
                      <p className="text-gray-500 mb-1">Pages:</p>
                      <p className="text-white">45 slides</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg mb-4">
                <div className="flex items-start gap-3">
                  <Lock className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-yellow-200 font-medium mb-1">Investor Access Only</p>
                    <p className="text-xs text-yellow-100/80">
                      This deck contains confidential financial information and is only available to verified investors who have signed an NDA.
                    </p>
                  </div>
                </div>
              </div>

              <button
                disabled
                className="w-full px-6 py-3 bg-gray-800 text-gray-600 font-medium rounded-lg cursor-not-allowed flex items-center justify-center gap-2"
              >
                <Download className="w-5 h-5" />
                Download Deck (Requires Access)
              </button>
            </div>

            {/* Deck Contents */}
            <div className="p-8 bg-gray-900/30 border border-gray-800 rounded-lg mb-8">
              <h3 className="text-xl font-bold text-white mb-6">Deck Contents</h3>
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-semibold text-[#FFD700] mb-3">Section 1: Studio Overview</h4>
                  <ul className="space-y-2 text-sm text-gray-400">
                    <li>• Product studio thesis</li>
                    <li>• Dual-engine model (ventures + partnerships)</li>
                    <li>• AI acceleration advantage</li>
                    <li>• Team & expertise</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#FFD700] mb-3">Section 2: Portfolio Companies</h4>
                  <ul className="space-y-2 text-sm text-gray-400">
                    <li>• Zero: Email AI (launching Q1 2025)</li>
                    <li>• Atlas: CRE intelligence (pipeline)</li>
                    <li>• Amplify: NIL platform (pipeline)</li>
                    <li>• 2-3 ventures per year model</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#FFD700] mb-3">Section 3: Financials</h4>
                  <ul className="space-y-2 text-sm text-gray-400">
                    <li>• Runway & burn rate</li>
                    <li>• Revenue projections (ventures + kits)</li>
                    <li>• Use of funds breakdown</li>
                    <li>• Path to profitability</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#FFD700] mb-3">Section 4: Investment Terms</h4>
                  <ul className="space-y-2 text-sm text-gray-400">
                    <li>• Zero seed round: $600K for 10%</li>
                    <li>• Studio investment options</li>
                    <li>• Strategic partner opportunities</li>
                    <li>• Exit scenarios & returns</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Request Access */}
            <div className="text-center p-8 bg-gray-900/30 border border-gray-800 rounded-lg">
              <h3 className="text-xl font-bold text-white mb-3">Request Deck Access</h3>
              <p className="text-sm text-gray-400 mb-6">
                Interested investors can request access by scheduling an intro call with Matt Hanson
              </p>
              <div className="flex gap-4 justify-center">
                <Link
                  href="/contact"
                  className="px-6 py-3 bg-[#FFD700] text-black font-medium rounded-lg hover:bg-[#FFD700]/90 transition-colors"
                >
                  Schedule Investor Call
                </Link>
                <Link
                  href="/investors"
                  className="px-6 py-3 bg-gray-800 text-white font-medium rounded-lg hover:bg-gray-700 transition-colors"
                >
                  View Investment Opportunities
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
