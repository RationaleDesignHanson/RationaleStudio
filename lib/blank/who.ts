/**
 * Who is looking at this.
 *
 * There is no login here — one shared password unlocks the page — so the tool
 * cannot know which of the two of you is acting. It asks once and remembers on
 * the device, which is the lightest thing that works and is honestly a guess:
 * a device is not a person, and if you both use the same laptop it will be
 * wrong until someone changes it.
 *
 * WHY IT MATTERS AT ALL. Keeping something is the vote. When both of you have
 * kept the same thing it is agreed, and when only one of you has it is a
 * proposal — that distinction is the whole difference between a shared shelf of
 * images and a decision, and without a name attached there is no way to draw it.
 */

const KEY = 'blank.who';

/** A single initial. Enough to attribute, short enough to live in a URL. */
export function normaliseWho(name: string): string {
  const c = name.trim().toUpperCase().replace(/[^A-Z0-9]/g, '');
  return c.slice(0, 1);
}

export function readWho(): string {
  if (typeof window === 'undefined') return '';
  try {
    return normaliseWho(window.localStorage.getItem(KEY) ?? '');
  } catch {
    // Private browsing and locked-down Safari both throw on access rather than
    // returning null. An unattributed keep is much better than a crash.
    return '';
  }
}

export function writeWho(name: string): string {
  const w = normaliseWho(name);
  try {
    if (w) window.localStorage.setItem(KEY, w);
  } catch {
    /* see readWho */
  }
  return w;
}
