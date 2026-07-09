/**
 * Writing — Studio Monograph treatment.
 * The archive list intentionally lives empty for now — the older slugs
 * describe pieces that will *become* future Substack posts, not historical
 * essays already published. Restore the array (with real Substack URLs)
 * as each one ships.
 */

'use client';

import Link from 'next/link';
import { ArrowRight, ExternalLink } from 'lucide-react';

const SUBSTACK_LATEST = {
  title: 'When to Hire AI: the longer version',
  blurb:
    'A year of building solo, and the parts that didn’t fit in the 30-minute Sendfull conversation — the dependency map I drew the day I pulled Zero, what “the cave” means for product decisions, and why the preservation gap is bigger than recipes.',
  href: 'https://rationaledesign.substack.com/p/when-to-hire-ai-the-longer-version',
  publishedAt: 'May 2026',
};

const SENDFULL_INTERVIEW = {
  title: 'How a Design-Leader-Turned-Founder Decides When to Hire AI',
  publication: 'Sendfull',
  byline: 'Stef Hutka',
  href: 'https://sendfull.substack.com/p/ep-92-how-a-design-leader-turned',
};

export default function WritingPage() {
  return (
    <main className="min-h-screen bg-paper text-ink-body">
      {/* LATEST · the live Substack post */}
      <section className="px-4 sm:px-6 md:px-8 pt-12 md:pt-20 pb-10 md:pb-16 border-b border-hairline">
        <div className="max-w-6xl mx-auto">
          <p className="text-caption font-mono text-ink-muted tracking-[0.3em] uppercase mb-6">
            Latest
          </p>
          <a
            href={SUBSTACK_LATEST.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group block border-t border-hairline pt-6 md:pt-8 hover:bg-paper-deep/30 transition-colors -mx-4 sm:-mx-6 md:-mx-8 px-4 sm:px-6 md:px-8 pb-6 md:pb-8"
          >
            <div className="grid md:grid-cols-12 md:gap-8 lg:gap-12">
              <div className="md:col-span-2">
                <p className="font-mono text-caption tracking-[0.25em] uppercase text-ink-muted mb-1">
                  Substack
                </p>
                <p className="font-mono text-caption tracking-[0.25em] uppercase text-ink-muted">
                  {SUBSTACK_LATEST.publishedAt}
                </p>
              </div>
              <div className="md:col-span-9">
                <h2 className="font-display text-h2 text-ink leading-tight mb-3 group-hover:text-[var(--accent-ink)] transition-colors">
                  {SUBSTACK_LATEST.title}
                </h2>
                <p className="text-base md:text-lg text-ink-body leading-relaxed max-w-2xl mb-4">
                  {SUBSTACK_LATEST.blurb}
                </p>
                <p className="inline-flex items-center gap-2 text-sm font-mono text-[var(--accent-ink)] tracking-wide">
                  Read on Substack <ExternalLink className="w-3 h-3" />
                </p>
              </div>
            </div>
          </a>
        </div>
      </section>

      {/* FEATURED IN · Stef's interview as press */}
      <section className="px-4 sm:px-6 md:px-8 py-10 md:py-16 border-b border-hairline">
        <div className="max-w-6xl mx-auto">
          <p className="text-caption font-mono text-ink-muted tracking-[0.3em] uppercase mb-6">
            Featured In
          </p>
          <a
            href={SENDFULL_INTERVIEW.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group block border-t border-hairline pt-6 md:pt-8 hover:bg-paper-deep/30 transition-colors -mx-4 sm:-mx-6 md:-mx-8 px-4 sm:px-6 md:px-8 pb-6 md:pb-8"
          >
            <div className="grid md:grid-cols-12 md:gap-8 lg:gap-12">
              <div className="md:col-span-2">
                <p className="font-mono text-caption tracking-[0.25em] uppercase text-ink-muted mb-1">
                  {SENDFULL_INTERVIEW.publication}
                </p>
                <p className="font-mono text-caption tracking-[0.25em] uppercase text-ink-muted">
                  Interview
                </p>
              </div>
              <div className="md:col-span-9">
                <h2 className="font-display text-h2 text-ink leading-tight mb-3 group-hover:text-[var(--accent-ink)] transition-colors">
                  {SENDFULL_INTERVIEW.title}
                </h2>
                <p className="text-base md:text-lg text-ink-body leading-relaxed max-w-2xl mb-4">
                  Stef Hutka and I talked through hat consolidation, the trust ceiling for AI in consumer products, why I pulled Zero out of beta and shipped Heirloom instead, and why today&rsquo;s AI is still &ldquo;in a cave.&rdquo;
                </p>
                <p className="inline-flex items-center gap-2 text-sm font-mono text-[var(--accent-ink)] tracking-wide">
                  Read at Sendfull <ExternalLink className="w-3 h-3" />
                </p>
              </div>
            </div>
          </a>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 sm:px-6 md:px-8 py-12 md:py-16 bg-paper-deep/40">
        <div className="max-w-6xl mx-auto">
          <p className="text-base md:text-lg text-ink-body leading-relaxed max-w-2xl">
            Want to apply this thinking to your product?{' '}
            <Link
              href="/contact"
              className="inline-flex items-center gap-1 text-[var(--accent-ink)] hover:text-ink font-display italic transition-colors"
            >
              Let&rsquo;s talk <ArrowRight className="w-3 h-3" />
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
