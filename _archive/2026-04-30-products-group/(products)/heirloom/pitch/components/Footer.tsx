'use client';

import Link from 'next/link';
import { heirloomPitchContent } from '@/lib/content/heirloom-pitch';

export default function Footer() {
  const content = heirloomPitchContent.footer;

  return (
    <footer className="py-8 px-4 sm:px-6 lg:px-8 bg-[var(--heirloom-pitch-brown)] border-t border-[var(--heirloom-pitch-terracotta)]/20">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo and Copyright */}
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-lg bg-[var(--heirloom-pitch-terracotta)] flex items-center justify-center text-white font-bold text-lg">
              H
            </div>
            <span className="text-[var(--heirloom-pitch-cream)] text-sm">
              {content.copyright}
            </span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6">
            {content.links.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className="text-[var(--heirloom-pitch-cream)] hover:text-[var(--heirloom-pitch-terracotta)] transition-colors text-sm"
              >
                {link.text}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
