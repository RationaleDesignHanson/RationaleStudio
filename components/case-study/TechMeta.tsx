/**
 * TechMeta — a technical-metadata strip used in case-study heroes.
 *
 * Monochrome by default; an optional `accent` color tightens character
 * to a single complementary tone. Use sparingly — one per page hero.
 *
 *   <TechMeta
 *     index="03/08"
 *     era="META"
 *     years="2017—2023"
 *     role="Experiences Team Lead"
 *     accent="text-project-spark-ar"
 *   />
 */

interface TechMetaProps {
  index?: string;          // e.g. "03/08"
  era?: string;            // e.g. "META"
  years?: string;          // e.g. "2017—2023"
  role?: string;           // e.g. "Experiences Team Lead"
  /** Tailwind color class for the index — e.g. "text-project-spark-ar". */
  accent?: string;
}

export function TechMeta({ index, era, years, role, accent }: TechMetaProps) {
  return (
    <div className="font-mono text-xs sm:text-sm tracking-widest mb-4 flex flex-wrap items-center gap-x-3 gap-y-1">
      {index && (
        <span className={accent ?? 'text-terminal-gold'}>{index}</span>
      )}
      {index && (era || years || role) && (
        <span className="text-gray-700">———</span>
      )}
      {era && <span className="text-gray-300">{era}</span>}
      {era && years && <span className="text-gray-700">·</span>}
      {years && <span className="text-gray-400">{years}</span>}
      {(years || era) && role && <span className="text-gray-700">·</span>}
      {role && <span className="text-gray-400">{role}</span>}
    </div>
  );
}
