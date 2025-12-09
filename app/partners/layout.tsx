/**
 * Partner Portal Layout
 *
 * Protected partner dashboard for active collaboration
 * Requires authentication with partner role or higher
 */

import type { Metadata } from 'next';
import Link from 'next/link';
import { Handshake, Zap, TrendingUp, FileText, Briefcase } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Partner Portal | Rationale',
  description: 'Active collaboration dashboard and engagement materials for Rationale partners',
  robots: {
    index: false,
    follow: false,
  },
};

export default function PartnersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900">
      {/* Sticky Header with Navigation */}
      <header className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            {/* Portal Identity */}
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-[#00FF94] rounded-full animate-pulse" />
              <h1 className="text-lg font-bold text-[#00FF94]">Partner Portal</h1>
              <span className="text-xs text-gray-500 font-mono">// Collaboration Hub</span>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center gap-6 text-sm">
              <Link
                href="/partners"
                className="text-gray-400 hover:text-[#00FF94] transition-colors font-medium"
              >
                <div className="flex items-center gap-2">
                  <Handshake className="w-4 h-4" />
                  <span>Dashboard</span>
                </div>
              </Link>
              <Link
                href="/partners/engagement-models"
                className="text-gray-400 hover:text-[#00FF94] transition-colors font-medium"
              >
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  <span>Engagement</span>
                </div>
              </Link>
              <Link
                href="/partners/portfolio"
                className="text-gray-400 hover:text-[#00FF94] transition-colors font-medium"
              >
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  <span>Portfolio</span>
                </div>
              </Link>
              <Link
                href="/partners/governance"
                className="text-gray-400 hover:text-[#00FF94] transition-colors font-medium"
              >
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  <span>Governance</span>
                </div>
              </Link>
              <Link
                href="/partners/resources"
                className="text-gray-400 hover:text-[#00FF94] transition-colors font-medium"
              >
                <div className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4" />
                  <span>Resources</span>
                </div>
              </Link>
            </nav>

            {/* Back to Site */}
            <Link
              href="/"
              className="text-sm text-gray-400 hover:text-white transition-colors font-medium"
            >
              ← Public Site
            </Link>
          </div>

          {/* Mobile Navigation */}
          <nav className="flex md:hidden items-center gap-2 text-xs pb-4 flex-wrap">
            <Link
              href="/partners"
              className="text-gray-400 hover:text-[#00FF94] transition-colors px-3 py-2 rounded bg-gray-800/30"
            >
              Dashboard
            </Link>
            <Link
              href="/partners/engagement-models"
              className="text-gray-400 hover:text-[#00FF94] transition-colors px-3 py-2 rounded bg-gray-800/30"
            >
              Engagement
            </Link>
            <Link
              href="/partners/portfolio"
              className="text-gray-400 hover:text-[#00FF94] transition-colors px-3 py-2 rounded bg-gray-800/30"
            >
              Portfolio
            </Link>
            <Link
              href="/partners/governance"
              className="text-gray-400 hover:text-[#00FF94] transition-colors px-3 py-2 rounded bg-gray-800/30"
            >
              Governance
            </Link>
            <Link
              href="/partners/resources"
              className="text-gray-400 hover:text-[#00FF94] transition-colors px-3 py-2 rounded bg-gray-800/30"
            >
              Resources
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main>{children}</main>

      {/* Footer */}
      <footer className="border-t border-gray-800 bg-gray-900/30 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
            <p>© 2025 Rationale Studio. Partner materials are confidential.</p>
            <div className="flex items-center gap-6">
              <Link href="/contact" className="hover:text-[#00FF94] transition-colors">
                Contact
              </Link>
              <Link href="/logout" className="hover:text-[#00FF94] transition-colors">
                Sign Out
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
