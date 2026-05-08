/**
 * Route → bucket classification for the engagement dashboard.
 *
 * Mirrors the public site's information architecture so we can ask
 * "which buckets did this visitor explore" instead of "which page did
 * they hit." Edit this file when nav structure changes.
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
  | 'contact'    // contact page + mailto clicks
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
  { bucket: 'contact',  label: 'Get in touch',   description: 'Contact page + email click events',                             accentVar: 'var(--project-spark-ar)' },
  { bucket: 'other',    label: 'Other',          description: 'Routes outside the public IA (clients/, owner/, prototypes/)', accentVar: 'var(--ink-muted)' },
];

/**
 * HogQL CASE expression that maps `properties.$pathname` to a bucket name.
 * Inlined into queries that need bucket-level rollups.
 */
export const BUCKET_CASE_HOGQL = `
  multiIf(
    match(properties.$pathname, '^/work/(heirloom|silly-questions|zero|vault|nimbus)(/|$)'), 'now',
    match(properties.$pathname, '^/work/(spark-ar|orion|fair-embodied-ai)(/|$)'), 'leader',
    match(properties.$pathname, '^/work/(framestore|viacom|studio-era)(/|$)'), 'director',
    match(properties.$pathname, '^/work/decks(/|$)'), 'decks',
    match(properties.$pathname, '^/thinking(/|$)'), 'thinking',
    match(properties.$pathname, '^/writing(/|$)'), 'writing',
    match(properties.$pathname, '^/work/vault$'), 'vault',
    match(properties.$pathname, '^/contact(/|\\\\?|$)'), 'contact',
    match(properties.$pathname, '^/(work)?$'), 'home',
    'other'
  )
`.trim();

/**
 * Pure-JS classifier — same logic as BUCKET_CASE_HOGQL — for use after
 * fetching raw events that need post-processing in Node.
 */
export function classifyPath(pathname: string): Bucket {
  if (/^\/work\/(heirloom|silly-questions|zero|vault|nimbus)(\/|$)/.test(pathname)) return 'now';
  if (/^\/work\/(spark-ar|orion|fair-embodied-ai)(\/|$)/.test(pathname)) return 'leader';
  if (/^\/work\/(framestore|viacom|studio-era)(\/|$)/.test(pathname)) return 'director';
  if (/^\/work\/decks(\/|$)/.test(pathname)) return 'decks';
  if (/^\/thinking(\/|$)/.test(pathname)) return 'thinking';
  if (/^\/writing(\/|$)/.test(pathname)) return 'writing';
  if (/^\/work\/vault$/.test(pathname)) return 'vault';
  if (/^\/contact(\/|\?|$)/.test(pathname)) return 'contact';
  if (/^\/(work)?$/.test(pathname)) return 'home';
  return 'other';
}

/**
 * Cluster a list of buckets a session visited into a stable, ordered
 * "interest profile" string. Used to group sessions by which combinations
 * of buckets they touched.
 */
export function profileFromBuckets(buckets: Bucket[]): string {
  // Filter `home` and `other` so navigation noise doesn't dominate profiles.
  const meaningful = Array.from(new Set(buckets)).filter((b) => b !== 'home' && b !== 'other');
  if (meaningful.length === 0) return 'home only';
  return meaningful.sort().join(' + ');
}
