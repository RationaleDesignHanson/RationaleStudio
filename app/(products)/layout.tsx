/**
 * Product Pages Layout
 *
 * Different header/footer than main Rationale site.
 * These are product brands, not Rationale portfolio pages.
 * Minimal navigation - focus on product experience.
 */

import Link from 'next/link';

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      {/* Minimal Header - Product Brand Focused */}
      <header className="border-b border-gray-800 bg-black/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Product Logo/Brand */}
            <div className="flex items-center gap-4">
              <Link href="/" className="text-sm text-gray-400 hover:text-white transition-colors">
                ← Rationale
              </Link>
            </div>

            {/* Minimal Navigation */}
            <nav className="flex items-center gap-6">
              <Link
                href="/work"
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                Case Studies
              </Link>
              <Link
                href="/contact"
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                Contact
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>{children}</main>

      {/* Minimal Footer */}
      <footer className="border-t border-gray-800 bg-black/50 py-8 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-400">
            <div>
              Built by <Link href="/" className="text-terminal-gold hover:text-terminal-gold/80">Rationale</Link>
            </div>
            <div className="flex gap-6">
              <Link href="/work" className="hover:text-white transition-colors">
                Work
              </Link>
              <Link href="/about" className="hover:text-white transition-colors">
                About
              </Link>
              <Link href="/contact" className="hover:text-white transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

