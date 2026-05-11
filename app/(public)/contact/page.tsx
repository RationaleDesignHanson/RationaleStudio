/**
 * Contact — Studio Monograph treatment, single email-first surface.
 */

'use client';

import Link from 'next/link';
import { Marginalia } from '@/components/case-study/EditorialLayout';

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-paper text-ink-body">
      <section className="px-4 sm:px-6 md:px-8 pt-16 md:pt-24 pb-10 md:pb-16 border-b border-hairline">
        <div className="max-w-6xl mx-auto">
          <p className="text-[11px] md:text-xs font-mono text-ink-muted tracking-[0.3em] uppercase mb-4">
            CONTACT
          </p>
          <h1 className="font-display text-display text-ink mb-6 max-w-3xl">
            The simplest way: email.
          </h1>
          <p className="text-base md:text-lg text-ink-body leading-relaxed max-w-2xl mb-10">
            I read everything. I respond when there&rsquo;s something concrete to say.
          </p>

          <a
            href="mailto:hanson@rationale.work"
            className="font-display text-3xl md:text-5xl lg:text-6xl text-ink hover:text-[var(--accent-ink)] transition-colors inline-block break-all leading-tight"
            data-cta-location="contact-hero"
            data-cta-type="email"
          >
            hanson@rationale.work
          </a>
        </div>
      </section>

      {/* GRID — work-with-me + elsewhere + personal */}
      <section className="px-4 sm:px-6 md:px-8 py-10 md:py-16 border-b border-hairline">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-12 md:gap-8 lg:gap-12">
            {/* Main */}
            <div className="md:col-span-8">
              <p className="text-[11px] md:text-xs font-mono text-ink-muted tracking-[0.3em] uppercase mb-3">
                Work with me
              </p>
              <p className="text-base md:text-lg text-ink-body leading-relaxed max-w-2xl mb-6">
                Available for very selective partnership work &mdash; design and product strategy, prototyping, embedded work where alignment is genuine. Not taking on retainers, not running a studio.
              </p>
              <p className="text-base md:text-lg text-ink-body leading-relaxed max-w-2xl">
                Some recent partnership work is under NDA &mdash; available with login at the relevant case studies, or email me to request access.
              </p>
            </div>
            {/* Aside */}
            <aside className="md:col-span-4 mt-8 md:mt-0 text-xs font-mono text-ink-muted leading-relaxed">
              <p className="text-[11px] tracking-[0.3em] uppercase text-ink mb-3">Elsewhere</p>
              <Marginalia.Field label="LinkedIn">
                <a
                  href="https://www.linkedin.com/in/thematthanson"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--accent-ink)] hover:text-ink"
                >
                  thematthanson →
                </a>
              </Marginalia.Field>
              <Marginalia.Field label="Substack">
                <a
                  href="https://rationaledesign.substack.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--accent-ink)] hover:text-ink"
                >
                  matthanson →
                </a>
              </Marginalia.Field>
              <Marginalia.Field label="GitHub">
                <a
                  href="https://github.com/RationaleDesignHanson"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--accent-ink)] hover:text-ink"
                >
                  RationaleDesignHanson →
                </a>
              </Marginalia.Field>
              <Marginalia.Rule />
              <Marginalia.Note>
                NYC area. Three daughters. Cooking, Peloton (because of the cooking), ceramics, New York sports.
              </Marginalia.Note>
            </aside>
          </div>
        </div>
      </section>

      {/* CTA back */}
      <section className="px-4 sm:px-6 md:px-8 py-10 md:py-14 bg-paper-deep/40">
        <div className="max-w-6xl mx-auto">
          <Link
            href="/work"
            className="inline-flex items-center gap-2 text-[var(--accent-ink)] hover:text-ink font-display italic text-lg md:text-xl transition-colors"
          >
            Back to work →
          </Link>
        </div>
      </section>
    </main>
  );
}
