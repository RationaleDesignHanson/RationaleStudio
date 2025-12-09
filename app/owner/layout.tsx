/**
 * Owner Layout
 *
 * Matt-only section for content management, reference library,
 * and publishing tools. Requires 'owner' role.
 */

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Owner Dashboard | Rationale',
  description: 'Matt-only content management and reference library',
  robots: {
    index: false,
    follow: false,
  },
};

export default function OwnerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900">
      {/* Owner Header */}
      <header className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-terminal-gold rounded-full animate-pulse" />
              <h1 className="text-lg font-bold text-terminal-gold">
                Owner Dashboard
              </h1>
              <span className="text-xs text-gray-500 font-mono">
                // Matt Only
              </span>
            </div>
            <nav className="flex items-center gap-6 text-sm">
              <a
                href="/owner"
                className="text-gray-400 hover:text-terminal-gold transition-colors"
              >
                Dashboard
              </a>
              <a
                href="/owner/content"
                className="text-gray-400 hover:text-terminal-gold transition-colors"
              >
                Content Library
              </a>
              <a
                href="/owner/reference"
                className="text-gray-400 hover:text-terminal-gold transition-colors"
              >
                Reference
              </a>
              <a
                href="/"
                className="text-gray-400 hover:text-terminal-gold transition-colors"
              >
                ← Public Site
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>{children}</main>

      {/* Owner Footer */}
      <footer className="border-t border-gray-800 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-xs text-gray-500 text-center">
            Owner Dashboard · Rationale Studio · {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </div>
  );
}
