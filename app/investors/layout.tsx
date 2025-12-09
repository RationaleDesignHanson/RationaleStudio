/**
 * Investor Portal Layout
 *
 * Protected investor dashboard with navigation
 * Requires authentication with investor role or higher
 */

import type { Metadata } from 'next';
import Link from 'next/link';
import { TrendingUp, FolderOpen, FileText, BarChart3 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Investor Portal | Rationale',
  description: 'Portfolio dashboard and investment materials for Rationale investors',
  robots: {
    index: false,
    follow: false,
  },
};

export default function InvestorsLayout({
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
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
              <h1 className="text-lg font-bold text-blue-400">Investor Portal</h1>
              <span className="text-xs text-gray-500 font-mono">// Protected</span>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center gap-6 text-sm">
              <Link
                href="/investors"
                className="text-gray-400 hover:text-blue-400 transition-colors font-medium"
              >
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  <span>Overview</span>
                </div>
              </Link>
              <Link
                href="/investors/zero"
                className="text-gray-400 hover:text-blue-400 transition-colors font-medium"
              >
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-4 h-4" />
                  <span>Zero</span>
                </div>
              </Link>
              <Link
                href="/investors/atlas"
                className="text-gray-400 hover:text-blue-400 transition-colors font-medium"
              >
                <div className="flex items-center gap-2">
                  <FolderOpen className="w-4 h-4" />
                  <span>Atlas</span>
                </div>
              </Link>
              <Link
                href="/investors/amplify"
                className="text-gray-400 hover:text-blue-400 transition-colors font-medium"
              >
                <div className="flex items-center gap-2">
                  <FolderOpen className="w-4 h-4" />
                  <span>Amplify</span>
                </div>
              </Link>
              <Link
                href="/investors/studio"
                className="text-gray-400 hover:text-blue-400 transition-colors font-medium"
              >
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  <span>Studio</span>
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
              href="/investors"
              className="text-gray-400 hover:text-blue-400 transition-colors px-3 py-2 rounded bg-gray-800/30"
            >
              Overview
            </Link>
            <Link
              href="/investors/zero"
              className="text-gray-400 hover:text-blue-400 transition-colors px-3 py-2 rounded bg-gray-800/30"
            >
              Zero
            </Link>
            <Link
              href="/investors/atlas"
              className="text-gray-400 hover:text-blue-400 transition-colors px-3 py-2 rounded bg-gray-800/30"
            >
              Atlas
            </Link>
            <Link
              href="/investors/amplify"
              className="text-gray-400 hover:text-blue-400 transition-colors px-3 py-2 rounded bg-gray-800/30"
            >
              Amplify
            </Link>
            <Link
              href="/investors/studio"
              className="text-gray-400 hover:text-blue-400 transition-colors px-3 py-2 rounded bg-gray-800/30"
            >
              Studio
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
            <p>© 2025 Rationale Studio. Investor materials are confidential.</p>
            <div className="flex items-center gap-6">
              <Link href="/contact" className="hover:text-blue-400 transition-colors">
                Contact
              </Link>
              <Link href="/logout" className="hover:text-blue-400 transition-colors">
                Sign Out
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
