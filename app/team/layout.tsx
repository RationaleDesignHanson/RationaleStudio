/**
 * Team Portal Layout
 *
 * Protected team dashboard for internal operations
 * Requires authentication with team role or higher
 */

import type { Metadata } from 'next';
import Link from 'next/link';
import { Users, FolderKanban, BookOpen, Settings } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Team Portal | Rationale',
  description: 'Internal operations dashboard and documentation for Rationale team',
  robots: {
    index: false,
    follow: false,
  },
};

export default function TeamLayout({
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
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
              <h1 className="text-lg font-bold text-purple-400">Team Portal</h1>
              <span className="text-xs text-gray-500 font-mono">// Internal Ops</span>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center gap-6 text-sm">
              <Link
                href="/team"
                className="text-gray-400 hover:text-purple-400 transition-colors font-medium"
              >
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>Dashboard</span>
                </div>
              </Link>
              <Link
                href="/team/projects"
                className="text-gray-400 hover:text-purple-400 transition-colors font-medium"
              >
                <div className="flex items-center gap-2">
                  <FolderKanban className="w-4 h-4" />
                  <span>Projects</span>
                </div>
              </Link>
              <Link
                href="/team/docs"
                className="text-gray-400 hover:text-purple-400 transition-colors font-medium"
              >
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  <span>Documentation</span>
                </div>
              </Link>
              <Link
                href="/team/admin"
                className="text-gray-400 hover:text-purple-400 transition-colors font-medium"
              >
                <div className="flex items-center gap-2">
                  <Settings className="w-4 h-4" />
                  <span>Admin</span>
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
          <nav className="flex md:hidden items-center gap-4 text-xs pb-4 overflow-x-auto">
            <Link
              href="/team"
              className="text-gray-400 hover:text-purple-400 transition-colors whitespace-nowrap"
            >
              Dashboard
            </Link>
            <Link
              href="/team/projects"
              className="text-gray-400 hover:text-purple-400 transition-colors whitespace-nowrap"
            >
              Projects
            </Link>
            <Link
              href="/team/docs"
              className="text-gray-400 hover:text-purple-400 transition-colors whitespace-nowrap"
            >
              Documentation
            </Link>
            <Link
              href="/team/admin"
              className="text-gray-400 hover:text-purple-400 transition-colors whitespace-nowrap"
            >
              Admin
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
            <p>© 2025 Rationale Studio. Team portal for internal use only.</p>
            <div className="flex items-center gap-6">
              <Link href="/contact" className="hover:text-purple-400 transition-colors">
                Contact
              </Link>
              <Link href="/logout" className="hover:text-purple-400 transition-colors">
                Sign Out
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
