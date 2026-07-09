/**
 * EditorialLayout — body content with right-gutter marginalia.
 *
 * Desktop: 12-col grid · main 8 cols · gutter 3 cols (col 10–12).
 * Tablet:  marginalia narrows but stays in gutter.
 * Mobile:  marginalia collapses ABOVE the body as a small mono caption,
 *          so the information stays visible without requiring interaction.
 *
 *   <EditorialBody
 *     marginalia={
 *       <>
 *         <Marginalia.Heading>Past Present and Future</Marginalia.Heading>
 *         <Marginalia.Field label="Display">84-inch transparent touch</Marginalia.Field>
 *         <Marginalia.Field label="Effect">Pepper&rsquo;s-ghost diorama</Marginalia.Field>
 *         <Marginalia.Field label="Year">2016</Marginalia.Field>
 *       </>
 *     }
 *   >
 *     ...prose paragraphs...
 *   </EditorialBody>
 */

import type { ReactNode } from 'react';

interface EditorialBodyProps {
  children: ReactNode;
  marginalia?: ReactNode;
  /** Place marginalia on the LEFT (gutter 1) instead of RIGHT. */
  leftAside?: boolean;
  className?: string;
}

export function EditorialBody({
  children,
  marginalia,
  leftAside = false,
  className = '',
}: EditorialBodyProps) {
  if (!marginalia) {
    // Plain body without marginalia — single column, narrow measure.
    return (
      <div className={`max-w-3xl mx-auto ${className}`}>{children}</div>
    );
  }

  return (
    <div className={`max-w-6xl mx-auto ${className}`}>
      {/* Mobile: marginalia stacks above as a quiet meta block. */}
      <aside className="md:hidden mb-6 pb-4 border-b border-hairline text-xs font-mono text-ink-muted leading-relaxed">
        {marginalia}
      </aside>

      {/* Desktop: 12-col grid with main + gutter aside. */}
      <div
        className={`hidden md:grid md:grid-cols-12 md:gap-8 lg:gap-12 ${
          leftAside ? 'md:[grid-template-columns:repeat(12,minmax(0,1fr))]' : ''
        }`}
      >
        {leftAside && (
          <aside className="md:col-span-3 lg:col-span-3 md:order-1 text-xs font-mono text-ink-muted leading-relaxed">
            <div className="md:sticky md:top-6">{marginalia}</div>
          </aside>
        )}
        <div className="md:col-span-8 lg:col-span-8 md:order-2">{children}</div>
        {!leftAside && (
          <aside className="md:col-span-4 lg:col-span-4 md:col-start-9 md:order-3 text-xs font-mono text-ink-muted leading-relaxed">
            <div className="md:sticky md:top-6">{marginalia}</div>
          </aside>
        )}
      </div>

      {/* Hidden grid path used when no leftAside flag — fallback grid */}
      <div className="hidden">{/* keep grid intact */}</div>
    </div>
  );
}

interface MarginaliaHeadingProps {
  children: ReactNode;
  className?: string;
}

function Heading({ children, className = '' }: MarginaliaHeadingProps) {
  return (
    <p
      className={`text-caption tracking-[0.3em] uppercase text-ink mb-3 ${className}`}
    >
      {children}
    </p>
  );
}

interface FieldProps {
  label: string;
  children: ReactNode;
  className?: string;
}

function Field({ label, children, className = '' }: FieldProps) {
  return (
    <div className={`mb-2 last:mb-0 ${className}`}>
      <span className="text-ink-muted/70 mr-2">{label}</span>
      <span className="text-ink-body">{children}</span>
    </div>
  );
}

interface NoteProps {
  children: ReactNode;
  className?: string;
}

function Note({ children, className = '' }: NoteProps) {
  return (
    <p className={`mt-4 mb-2 italic text-ink-muted/90 normal-case tracking-normal text-[12px] leading-relaxed font-display ${className}`}>
      {children}
    </p>
  );
}

interface RuleProps {
  className?: string;
}

function Rule({ className = '' }: RuleProps) {
  return <hr className={`my-3 border-t border-hairline ${className}`} />;
}

export const Marginalia = {
  Heading,
  Field,
  Note,
  Rule,
};
