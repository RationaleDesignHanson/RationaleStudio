/**
 * /resume — canonical résumé, rendered in the Studio Monograph design system.
 * Content comes from lib/content/resume.ts; the downloadable PDF is printed
 * from this same page (public/matt-hanson-resume.pdf).
 */

import type { Metadata } from 'next';
import Link from 'next/link';
import { Download, ArrowRight } from 'lucide-react';
import { MultipleStructuredData } from '@/components/seo/StructuredData';
import { generateBreadcrumbStructuredData } from '@/lib/seo/metadata';
import { RESUME, type ResumeEntry } from '@/lib/content/resume';

const PDF_HREF = '/matt-hanson-resume.pdf';

export const metadata: Metadata = {
  title: 'Résumé — Matt Hanson',
  description:
    'Matt Hanson — Founder, Product Architect, and AI Systems Leader. 25+ years across consumer products, AR/MR platforms, embodied AI research, streaming, and AI-native software development.',
  alternates: { canonical: '/resume' },
};

export default function ResumePage() {
  const { contact } = RESUME;
  return (
    <>
      <MultipleStructuredData
        dataBlocks={[
          generateBreadcrumbStructuredData([
            { name: 'Home', url: '/' },
            { name: 'Résumé', url: '/resume' },
          ]),
        ]}
      />

      <main className="min-h-screen bg-paper text-ink-body">
        {/* HERO — name, title, contact, download */}
        <section className="px-4 sm:px-6 md:px-8 pt-16 md:pt-24 pb-8 md:pb-12 print:pt-6 print:pb-4 border-b border-hairline">
          <div className="max-w-4xl mx-auto">
            <p className="text-[11px] md:text-xs font-mono text-ink-muted tracking-[0.3em] uppercase mb-4">
              Résumé
            </p>
            <h1 className="font-display text-display text-ink mb-3">{RESUME.name}</h1>
            <p className="font-mono text-[11px] md:text-sm tracking-[0.2em] uppercase text-[var(--accent-ink)] mb-6">
              {RESUME.title}
            </p>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-ink-muted">
              <span>{contact.location}</span>
              <span aria-hidden>·</span>
              <a href={`tel:${contact.phone.replace(/[^0-9]/g, '')}`} className="hover:text-ink transition-colors">
                {contact.phone}
              </a>
              <span aria-hidden>·</span>
              <a
                href={`mailto:${contact.email}`}
                className="hover:text-[var(--accent-ink)] transition-colors"
                data-cta-location="resume-hero"
                data-cta-type="email"
              >
                {contact.email}
              </a>
              <span aria-hidden>·</span>
              <a href={contact.linkedinUrl} target="_blank" rel="noopener noreferrer" className="hover:text-ink transition-colors">
                LinkedIn
              </a>
            </div>

            <div className="mt-7">
              <a
                href={PDF_HREF}
                download
                className="print:hidden inline-flex items-center gap-2 rounded-full border border-hairline px-4 py-2 font-mono text-[11px] uppercase tracking-[0.2em] text-ink transition-colors hover:bg-paper-deep"
                data-cta-location="resume-hero"
                data-cta-type="resume-pdf"
              >
                <Download className="h-3.5 w-3.5" />
                Download PDF
              </a>
            </div>
          </div>
        </section>

        {/* SUMMARY */}
        <Section eyebrow="Summary">
          <div className="space-y-4 max-w-3xl">
            {RESUME.summary.map((p, i) => (
              <p key={i} className="text-base md:text-lg text-ink-body leading-relaxed">
                {p}
              </p>
            ))}
          </div>
        </Section>

        {/* CURRENT WORK — Rationale + portfolio */}
        <Section eyebrow="Current Work">
          <EntryHeader role={RESUME.current.role} org={RESUME.current.org} meta={RESUME.current.meta} />
          <div className="mt-3 space-y-3 max-w-3xl">
            {RESUME.current.intro.map((p, i) => (
              <p key={i} className="text-sm md:text-base text-ink-body leading-relaxed">
                {p}
              </p>
            ))}
          </div>

          <div className="mt-8 print:mt-4 space-y-7 print:space-y-3">
            {RESUME.current.portfolio.map((item) => (
              <div key={item.name} className="border-l-2 border-hairline pl-4 md:pl-5 print:break-inside-avoid">
                <h3 className="font-display text-lg md:text-xl text-ink flex items-baseline gap-2">
                  <span
                    aria-hidden
                    className="inline-block h-3 w-[3px] shrink-0 self-center"
                    style={{ backgroundColor: 'var(--accent-ink)' }}
                  />
                  {item.name}
                </h3>
                <p className="mt-1 text-sm md:text-base text-ink-body leading-relaxed max-w-2xl">
                  {item.summary}
                </p>
                <Bullets points={item.points} />
              </div>
            ))}
          </div>
        </Section>

        {/* PROFESSIONAL EXPERIENCE */}
        <Section eyebrow="Professional Experience">
          <div className="space-y-9 print:space-y-4">
            {RESUME.experience.map((e, i) => (
              <Entry key={i} entry={e} />
            ))}
          </div>
        </Section>

        {/* EARLIER CAREER */}
        <Section eyebrow="Earlier Career">
          <Entry entry={RESUME.earlier} />
        </Section>

        {/* PATENT · EDUCATION · AREAS · OPERATING PATTERN */}
        <section className="px-4 sm:px-6 md:px-8 py-10 md:py-16 print:py-5 border-t border-hairline bg-paper-deep/30">
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-x-10 gap-y-10 print:gap-y-5">
            <div>
              <Eyebrow>Patent</Eyebrow>
              <p className="font-display text-lg text-ink leading-snug">{RESUME.patent.title}</p>
              <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted">{RESUME.patent.meta}</p>
              <p className="mt-2 text-sm text-ink-body leading-relaxed">{RESUME.patent.note}</p>

              <div className="mt-8">
                <Eyebrow>Education</Eyebrow>
                <p className="font-display text-lg text-ink leading-snug">{RESUME.education.degree}</p>
                <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted">{RESUME.education.meta}</p>
              </div>

              <div className="mt-8">
                <Eyebrow>Operating Pattern</Eyebrow>
                <ol className="space-y-1.5">
                  {RESUME.operatingPattern.map((step, i) => (
                    <li key={i} className="flex gap-3 text-sm text-ink-body leading-snug">
                      <span className="font-mono text-[11px] tabular-nums text-[var(--accent-ink)] pt-0.5">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            <div>
              <Eyebrow>Selected Areas of Practice</Eyebrow>
              <ul className="flex flex-wrap gap-2">
                {RESUME.areas.map((a) => (
                  <li
                    key={a}
                    className="rounded-full border border-hairline px-3 py-1 text-[12px] text-ink-body"
                  >
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* CTA back */}
        <section className="px-4 sm:px-6 md:px-8 py-10 md:py-14 border-t border-hairline print:hidden">
          <div className="max-w-4xl mx-auto flex flex-wrap items-baseline justify-between gap-4">
            <a
              href={`mailto:${contact.email}`}
              className="font-display italic text-lg md:text-xl text-[var(--accent-ink)] hover:text-ink transition-colors"
              data-cta-location="resume-footer"
              data-cta-type="email"
            >
              {contact.email} →
            </a>
            <Link href="/" className="inline-flex items-center gap-2 text-sm font-mono text-ink-muted hover:text-ink transition-colors">
              Back to work <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] md:text-xs font-mono text-ink-muted tracking-[0.3em] uppercase mb-3 print:break-after-avoid">
      {children}
    </p>
  );
}

function Section({ eyebrow, children }: { eyebrow: string; children: React.ReactNode }) {
  return (
    <section className="px-4 sm:px-6 md:px-8 py-10 md:py-14 print:py-4 border-t border-hairline first:border-t-0">
      <div className="max-w-4xl mx-auto">
        <Eyebrow>{eyebrow}</Eyebrow>
        {children}
      </div>
    </section>
  );
}

function EntryHeader({ role, org, meta }: { role: string; org?: string; meta: string }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-4">
      <h3 className="font-display text-xl md:text-2xl text-ink leading-tight">
        {role}
        {org && <span className="text-ink-muted"> — {org}</span>}
      </h3>
      <span className="font-mono text-[11px] tracking-[0.15em] uppercase text-ink-muted whitespace-nowrap">
        {meta}
      </span>
    </div>
  );
}

function Bullets({ points }: { points?: string[] }) {
  if (!points?.length) return null;
  return (
    <ul className="mt-3 space-y-2 max-w-2xl">
      {points.map((pt, i) => (
        <li key={i} className="flex gap-2.5 text-sm text-ink-body leading-relaxed">
          <span aria-hidden className="mt-[0.5em] h-[3px] w-[3px] shrink-0 rounded-full bg-ink-muted" />
          <span>{pt}</span>
        </li>
      ))}
    </ul>
  );
}

function Entry({ entry }: { entry: ResumeEntry }) {
  return (
    <div className="print:break-inside-avoid">
      <EntryHeader role={entry.role} org={entry.org} meta={entry.meta} />
      {entry.intro && (
        <p className="mt-2 text-sm md:text-base text-ink-body leading-relaxed max-w-3xl">{entry.intro}</p>
      )}
      <Bullets points={entry.points} />
    </div>
  );
}
