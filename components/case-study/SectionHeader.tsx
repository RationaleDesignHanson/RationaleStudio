/**
 * SectionHeader — replaces the dot-pip + H2 pattern with an authored
 * editorial header. Three variants:
 *
 *   • <SectionHeader title="..." />                    plain serif h2
 *   • <SectionHeader title="..." index="01" />         numbered + hairline
 *   • <SectionHeader title="..." kicker="OUTCOMES" />  mono eyebrow + h2
 *
 * Index is mono-tone by default; pass `accent="text-project-spark-ar"`
 * to lend a single complementary tint to the marker.
 */

interface SectionHeaderProps {
  /** The section heading. */
  title: string;
  /** Small caps mono eyebrow above the title. */
  kicker?: string;
  /** Sequence marker rendered in mono before the title (e.g. "01"). */
  index?: string;
  /** Tailwind text-color class used to tint the index, e.g. "text-project-orion". */
  accent?: string;
  /** Render as h3 instead of h2 (for nested subsections). */
  as?: 'h2' | 'h3';
  /** Extra classes on the wrapper. */
  className?: string;
}

export function SectionHeader({
  title,
  kicker,
  index,
  accent,
  as: Heading = 'h2',
  className = '',
}: SectionHeaderProps) {
  return (
    <div className={`mb-6 ${className}`}>
      {kicker && (
        <p className="text-xs font-mono text-gray-500 tracking-widest uppercase mb-2">
          {kicker}
        </p>
      )}
      <Heading className="font-display text-2xl md:text-3xl font-normal text-white leading-tight flex items-baseline gap-3 md:gap-4">
        {index && (
          <span
            className={`flex-shrink-0 font-mono text-base md:text-lg tracking-wider ${
              accent ?? 'text-gray-500'
            }`}
          >
            {index}
          </span>
        )}
        <span className="flex-1">{title}</span>
      </Heading>
      {index && <div className="mt-3 h-px bg-gray-800" />}
    </div>
  );
}
