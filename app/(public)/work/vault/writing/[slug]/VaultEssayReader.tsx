import Link from 'next/link';
import { ArrowLeft, Lock } from 'lucide-react';
import { ProjectScope } from '@/components/case-study/ProjectScope';
import type { VaultEssay } from '@/lib/content/vault-writing';

export function VaultEssayReader({ essay }: { essay: VaultEssay }) {
  return (
    <ProjectScope project="vault">
      <main
        className="era-now min-h-screen"
        style={{ backgroundColor: 'var(--era-bg)', color: 'var(--era-ink-body)' }}
      >
        {/* HEADER */}
        <section className="px-4 sm:px-6 md:px-8 pt-6 md:pt-8 pb-6 border-b-2" style={{ borderColor: 'var(--accent)' }}>
          <div className="max-w-2xl mx-auto">
            <Link
              href="/work/vault"
              className="inline-flex items-center gap-2 text-sm text-[var(--era-ink-muted)] hover:text-[var(--accent)] mb-5 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Vault
            </Link>
            <div className="flex items-center gap-3 mb-3">
              <span className="font-mono text-[11px] tracking-[0.25em] uppercase" style={{ color: 'var(--accent)' }}>
                {essay.category}
              </span>
              <span className="text-[var(--era-ink-muted)]">·</span>
              <span className="text-xs text-[var(--era-ink-muted)]">{essay.readTime} read</span>
              <span className="text-[var(--era-ink-muted)]">·</span>
              <span className="font-mono text-[10px] tracking-[0.2em] uppercase inline-flex items-center gap-1 text-[var(--era-ink-muted)]">
                <Lock className="w-3 h-3" /> Confidential
              </span>
            </div>
            <h1 className="font-display text-3xl md:text-4xl text-[var(--era-ink)] leading-tight mb-2">
              {essay.title}
            </h1>
            <p className="font-display italic text-base md:text-lg text-[var(--era-ink-body)] leading-snug">
              {essay.subtitle}
            </p>
          </div>
        </section>

        {/* BODY */}
        <article className="px-4 sm:px-6 md:px-8 py-8 md:py-12">
          <div className="max-w-2xl mx-auto">
            {essay.sections.map((s, i) => (
              <div key={i} className="mb-8">
                {s.heading && (
                  <h2 className="font-display text-xl md:text-2xl text-[var(--era-ink)] mb-3 mt-4">
                    {s.heading}
                  </h2>
                )}
                {s.paragraphs.map((p, j) => (
                  <p key={j} className="text-base md:text-lg leading-relaxed text-[var(--era-ink-body)] mb-4">
                    {p}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </article>

        {/* FOOTER */}
        <section className="px-4 sm:px-6 md:px-8 py-8 border-t border-[var(--era-hairline)]">
          <div className="max-w-2xl mx-auto">
            <Link
              href="/work/vault"
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[var(--era-ink-muted)] hover:text-[var(--accent)] transition-colors"
            >
              <ArrowLeft className="w-3 h-3" /> All vault writing
            </Link>
          </div>
        </section>
      </main>
    </ProjectScope>
  );
}
