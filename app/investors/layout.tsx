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
      {/* Main Content */}
      <main>{children}</main>

      {/* Footer */}
      <footer className="border-t border-gray-800 bg-gray-900/30 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4 sm:px-6 md:px-8">
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
