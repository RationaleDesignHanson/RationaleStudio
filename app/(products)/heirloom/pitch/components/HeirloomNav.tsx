'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function HeirloomNav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[var(--heirloom-pitch-brown)]/90 backdrop-blur-sm border-b border-[var(--heirloom-pitch-terracotta)]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/heirloom/pitch" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[var(--heirloom-pitch-terracotta)] flex items-center justify-center text-white font-bold text-lg">
              H
            </div>
            <span className="text-[var(--heirloom-pitch-cream)] font-semibold">Heirloom</span>
          </Link>

          {/* CTA */}
          <Link
            href="/contact?product=heirloom&type=beta"
            className="px-4 py-2 bg-[var(--heirloom-pitch-terracotta)] hover:bg-[#B85F3F] text-white font-medium rounded-lg transition-all text-sm"
          >
            Request Access
          </Link>
        </div>
      </div>
    </nav>
  );
}
