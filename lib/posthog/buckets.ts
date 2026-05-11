/**
 * Route → bucket classification for the engagement dashboard.
 *
 * Mirrors the public site's information architecture so we can ask
 * "which buckets did this visitor explore" instead of "which page did
 * they hit." Edit this file when nav structure changes.
 *
 * IMPORTANT: HogQL's `match()` is fully anchored (re2 / RE2::FullMatch
 * semantics) while JS regex `.test()` is unanchored. Earlier versions of
 * this file used `(/|$)` after each project slug — that worked in JS but
 * silently failed in HogQL for sub-routes like /work/heirloom/evolution,
 * which then fell into "other" on the dashboard. The current patterns use
 * `(/.*)?$` so both engines agree: project slug, optionally followed by
 * any deeper path. Keep both the HogQL CASE and the JS classifier in sync.
 */

export type Bucket =
  | 'now'        // current solo work — Heirloom, Silly Questions, Zero, Vault, Nimbus
  | 'leader'     // Meta era — Spark AR, Orion, FAIR
  | 'director'   // pre-Meta — Framestore, Viacom, Studio Era
  | 'decks'      // gated portfolio decks
  | 'thinking'   // essays
  | 'writing'    // /writing index
  | 'vault'      // vault index itself
  | 'home'       // /, /work
  | 'about'      // /about
  | 'contact'    // contact page + mailto clicks
  | 'lab'        // /prototype-lab, /hero-lab — internal showcases
  | 'other';

export interface BucketDef {
  bucket: Bucket;
  label: string;
  description: string;
  /** Display color — references project tokens or era accents. */
  accentVar: string;
}

export const BUCKET_DEFS: BucketDef[] = [
  { bucket: 'now',      label: 'NOW work',       description: 'Heirloom · Silly Questions · Zero · Vault · Nimbus',         accentVar: 'var(--project-heirloom)' },
  { bucket: 'leader',   label: 'LEADER work',    description: 'Spark AR · Orion · FAIR Embodied AI',                        accentVar: 'var(--project-orion)' },
  { bucket: 'director', label: 'DIRECTOR work',  description: 'Framestore · Viacom · Studio Era',                            accentVar: 'var(--project-maker)' },
  { bucket: 'decks',    label: 'Decks',          description: 'Confidential portfolio decks (PDF surrogates)',                accentVar: 'var(--project-vault)' },
  { bucket: 'thinking', label: 'Thinking',       description: 'Essays — methodology, mental models',                          accentVar: 'var(--project-zero)' },
  { bucket: 'writing',  label: 'Writing',        description: '/writing index',                                                accentVar: 'var(--project-zero)' },
  { bucket: 'vault',    label: 'Vault index',    description: 'Vault landing page (gated children counted in their bucket)', accentVar: 'var(--project-vault)' },
  { bucket: 'home',     label: 'Home / Work',    description: 'Homepage and work index',                                       accentVar: 'var(--ink-muted)' },
  { bucket: 'about',    label: 'About',          description: 'About page',                                                    accentVar: 'var(--project-spark-ar)' },
  { bucket: 'contact',  label: 'Get in touch',   description: 'Contact page + email click events',                             accentVar: 'var(--project-spark-ar)' },
  { bucket: 'lab',      label: 'Lab',            description: 'Prototype Lab + Hero Lab — internal showcase routes',            accentVar: 'var(--project-fair)' },
  { bucket: 'other',    label: 'Other',          description: 'Routes outside the public IA (clients/, owner/, etc.)',          accentVar: 'var(--ink-muted)' },
];

/**
 * HogQL CASE expression that maps `properties.$pathname` to a bucket name.
 * Inlined into queries that need bucket-level rollups.
 *
 * Pattern shape: `^/work/<slug>(/.*)?$` — slug exact match, then optional
 * deeper path, then end. This matches both the project root and any of its
 * sub-routes (e.g. /work/heirloom AND /work/heirloom/evolution).
 */
export const BUCKET_CASE_HOGQL = `
  multiIf(
    match(properties.$pathname, '^/work/(heirloom|silly-questions|zero|vault|nimbus)(/.*)?$'), 'now',
    match(properties.$pathname, '^/work/(spark-ar|orion|fair-embodied-ai)(/.*)?$'), 'leader',
    match(properties.$pathname, '^/work/(framestore|viacom|studio-era)(/.*)?$'), 'director',
    match(properties.$pathname, '^/work/decks(/.*)?$'), 'decks',
    match(properties.$pathname, '^/thinking(/.*)?$'), 'thinking',
    match(properties.$pathname, '^/writing(/.*)?$'), 'writing',
    match(properties.$pathname, '^/work/vault$'), 'vault',
    match(properties.$pathname, '^/about(/.*)?$'), 'about',
    match(properties.$pathname, '^/contact(/.*)?$'), 'contact',
    match(properties.$pathname, '^/(prototype-lab|hero-lab)(/.*)?$'), 'lab',
    match(properties.$pathname, '^/(work)?$'), 'home',
    'other'
  )
`.trim();

/**
 * Pure-JS classifier — same logic as BUCKET_CASE_HOGQL — for use after
 * fetching raw events that need post-processing in Node. Patterns are
 * unanchored at the end (no $) here because JS `.test()` is unanchored
 * by default; the start anchor `^` is sufficient.
 */
export function classifyPath(pathname: string): Bucket {
  if (/^\/work\/(heirloom|silly-questions|zero|vault|nimbus)(\/|$)/.test(pathname)) return 'now';
  if (/^\/work\/(spark-ar|orion|fair-embodied-ai)(\/|$)/.test(pathname)) return 'leader';
  if (/^\/work\/(framestore|viacom|studio-era)(\/|$)/.test(pathname)) return 'director';
  if (/^\/work\/decks(\/|$)/.test(pathname)) return 'decks';
  if (/^\/thinking(\/|$)/.test(pathname)) return 'thinking';
  if (/^\/writing(\/|$)/.test(pathname)) return 'writing';
  if (/^\/work\/vault$/.test(pathname)) return 'vault';
  if (/^\/about(\/|$)/.test(pathname)) return 'about';
  if (/^\/contact(\/|\?|$)/.test(pathname)) return 'contact';
  if (/^\/(prototype-lab|hero-lab)(\/|$)/.test(pathname)) return 'lab';
  if (/^\/(work)?$/.test(pathname)) return 'home';
  return 'other';
}

/**
 * Cluster a list of buckets a session visited into a stable, ordered
 * "interest profile" string. Used to group sessions by which combinations
 * of buckets they touched.
 */
export function profileFromBuckets(buckets: Bucket[]): string {
  // Filter `home`, `other`, and `lab` so navigation noise + internal
  // surfaces don't dominate the profile space.
  const meaningful = Array.from(new Set(buckets)).filter((b) => b !== 'home' && b !== 'other' && b !== 'lab');
  if (meaningful.length === 0) return 'home only';
  return meaningful.sort().join(' + ');
}
