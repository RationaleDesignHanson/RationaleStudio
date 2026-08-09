/**
 * Shared line configuration — the thing that gets sent to a partner.
 *
 * The site's job is to sell the line and let two people shape it together,
 * asynchronously: one person configures, sends a link, the other opens exactly
 * what they were looking at and changes it. That only works if EVERY choice
 * lives in the URL, not in component state.
 *
 * Before this, only the budget stop (`?b=`) was serialized — one of four
 * surfaces. Garment, graphic and brand direction were component-local, so two
 * people opening the same link saw different lines and had no way to know it.
 *
 * Params are deliberately short (`b g p d`) because these get pasted into
 * messages, and omitted entirely when they equal the default so a link to the
 * starting state stays clean.
 */

'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import type { Sku } from './line';
import type { RunSize } from './economics';

export type Garment = 'tee' | 'hoodie' | 'cap';

const RUN_SIZES: RunSize[] = [25, 50, 75, 100, 150, 300];

export interface LineConfig {
  /** Colourway for deviation renders. */
  colorway: string;
  /**
   * Decoration axes. Empty string = inherit from the graphic preset.
   *
   * `placement` means ONE thing: where on the garment the artwork sits
   * ('chest-centre', 'left-chest'…). It was briefly carrying three meanings —
   * the axis, the applied-view placement AND the lockup id — so choosing the
   * "stacked" lockup fed "stacked" to the renderer as an axis, and choosing a
   * chest placement silently reset the lockup to its first option. The lockup
   * has its own field now.
   */
  motif: string;
  placement: string;
  scale: string;
  finish: string;
  /** Budget stop slug — 'graphic' | 'washed' | 'tonal' | 'stitched' | 'full' */
  budget: string;
  garment: Garment;
  /** Graphic id from the print library ('G-tonal-emboss'), or null for none.
      This is a PRINT LANGUAGE and is validated server-side against PRESETS. */
  graphic: string | null;
  /**
   * A kept graphic from the prompt bake-off, as a durable Storage URL.
   *
   * Not everything on a garment is the identity — a seasonal joke or a one-off
   * back print comes from a description, not from the letters in the name. Stored
   * as the URL because it is generated rather than derived, so unlike the mark it
   * cannot be reconstructed from the config.
   */
  customGraphic: string | null;
  /**
   * Pinned bake-off results, as durable Storage URLs.
   *
   * Rounds are disposable — every new round replaces the last — which meant the
   * tool never accumulated the one thing you are actually trying to produce: a
   * shortlist. Pinning survives the round, survives moving between beats, and
   * travels in the share link, so "here are the four I like" is sendable.
   */
  pins: string[];
  /**
   * Chosen mark construction id ('roundel', or 'r-<seed>-<n>' when shuffled).
   *
   * Its OWN field, not `graphic`. Overloading `graphic` to carry constructions
   * broke the deviation renderer, which passes it straight into a tuple that is
   * validated against PRESETS — a construction id is not a print language, so
   * every render came back "unknown graphic id" with the button disabled.
   */
  mark: string | null;
  /** Brand direction key from the bake-off, or 'custom' for a written one. */
  direction: string;
  /** The user's own style prompt, when direction is 'custom'. Shared, so a
      partner opening the link sees the direction you wrote, not a blank box. */
  directionPrompt: string;
  /** The word the wordmark sets. Typography, so it can be anything and is
      rendered rather than generated — no spend, and always spelled right. */
  wordmark: string;
  /** Chosen wordmark treatment id, or null for none. */
  wordmarkStyle: string | null;
  /** How the word and the mark sit together: word | symbol | stacked | inline. */
  lockup: string;
  /**
   * Seed for the randomised mark set. In the URL because a shuffled family is
   * only useful if you can send your partner the exact one you were looking at —
   * an unseeded shuffle produces a different set on their screen.
   */
  markSeed: string;
  /**
   * Retail price override for the lever, as a string so an empty field is a
   * distinct state from zero. Empty means "use the tier default".
   *
   * Retail is the largest single margin lever in the model at 35.9 points —
   * ahead of run size and blank tier — and the lever was displaying "Margin @
   * $35" with no way to change the $35.
   */
  retail: string;
  /**
   * Which beat is on screen. View state rather than line configuration, carried
   * in the URL on purpose: the whole product is two people sending each other a
   * link, and "look at this" has to land them on the beat you were looking at.
   */
  step: string;
}

export const LINE_DEFAULTS: LineConfig = {
  colorway: 'charcoal',
  motif: '',
  placement: '',
  scale: '',
  finish: '',
  budget: 'graphic',
  garment: 'tee',
  graphic: null,
  mark: null,
  customGraphic: null,
  pins: [],
  direction: 'workwear',
  directionPrompt: '',
  wordmark: 'BLANK',
  wordmarkStyle: null,
  lockup: 'word',
  retail: '',
  markSeed: '',
  step: '01',
};

/** URL param names. Short — these get pasted into messages. */
const PARAM = {
  budget: 'b',
  garment: 'g',
  graphic: 'p',
  mark: 'mk',
  customGraphic: 'cg',
  direction: 'd',
  directionPrompt: 'dp',
  colorway: 'c',
  motif: 'mo',
  placement: 'pl',
  scale: 'sc',
  finish: 'fi',
  wordmark: 'w',
  wordmarkStyle: 'ws',
  lockup: 'lk',
  retail: 'r',
  markSeed: 'ms',
  step: 'st',
} as const;

interface LineContextValue {
  config: LineConfig;
  /** The collection being costed. Serialized as repeated `s` params. */
  skus: Sku[];
  addSku: (sku: Sku) => void;
  removeSku: (index: number) => void;
  setSkuUnits: (index: number, units: RunSize) => void;
  /**
   * Per-SKU decoration tier. A line is specced style by style, not by setting one
   * global tier and having everything inherit it — a tee can be a cheap print
   * while the hoodie carries the embroidered mark, and that is a normal line.
   */
  setSkuTier: (index: number, tier: string) => void;
  setSkuRetail: (index: number, retail: number | undefined) => void;
  clearSkus: () => void;
  set: <K extends keyof LineConfig>(key: K, value: LineConfig[K]) => void;
  /** Absolute URL encoding the current config. */
  shareUrl: () => string;
  /** True once the initial URL read has run, so consumers can skip the first write. */
  hydrated: boolean;
}

const LineContext = createContext<LineContextValue | null>(null);

/**
 * SKUs are repeated `s` params rather than one delimited string: graphic ids
 * already contain hyphens, and every candidate record separator (`,` `:`) gets
 * percent-encoded by URLSearchParams, which makes a pasted link unreadable.
 * `?s=tee.full.100.G-emblem&s=hoodie.full.50.G-emblem` survives intact.
 */
function encodeSku(s: Sku): string {
  const base = [s.garment, s.tier, String(s.units) + (s.retail ? `@${s.retail}` : '')];
  // Trailing separator omitted when there's no graphic — these get pasted into
  // messages and `tee.full.100.` reads like a truncation.
  return (s.graphic ? [...base, s.graphic] : base).join('.');
}

function decodeSku(raw: string): Sku | null {
  const [garment, tier, units, ...rest] = raw.split('.');
  if (garment !== 'tee' && garment !== 'hoodie' && garment !== 'cap') return null;
  if (!tier) return null;
  // units may carry a retail override as `100@120`.
  const [unitPart, retailPart] = String(units).split('@');
  const n = Number(unitPart) as RunSize;
  if (!RUN_SIZES.includes(n)) return null;
  const retail = retailPart ? Number(retailPart) : undefined;
  if (retail !== undefined && (!Number.isFinite(retail) || retail <= 0)) return null;
  // Graphic ids contain dots in no known case, but rejoin defensively.
  const graphic = rest.join('.');
  return { garment, tier, units: n, graphic: graphic || null, ...(retail ? { retail } : {}) };
}

function readFromSearch(search: string): Partial<LineConfig> {
  const q = new URLSearchParams(search);
  const out: Partial<LineConfig> = {};
  const b = q.get(PARAM.budget);
  if (b) out.budget = b;
  const g = q.get(PARAM.garment);
  if (g === 'tee' || g === 'hoodie' || g === 'cap') out.garment = g;
  const p = q.get(PARAM.graphic);
  if (p) out.graphic = p;
  const mk = q.get(PARAM.mark);
  if (mk) out.mark = mk;
  // Only our own Storage host: a pasted link should not be able to point the
  // applied views at an arbitrary remote image.
  const cg = q.get(PARAM.customGraphic);
  if (cg && cg.includes('/storage/v1/object/public/blank-renders/')) out.customGraphic = cg;
  // Same host check as customGraphic: a pasted link must not be able to inject
  // arbitrary remote images into someone else's shelf.
  const pins = q.getAll('pin').filter((u) => u.includes('/storage/v1/object/public/blank-renders/'));
  if (pins.length) out.pins = pins.slice(0, 24);
  const dp = q.get(PARAM.directionPrompt);
  if (dp) out.directionPrompt = dp.slice(0, 240);
  const d = q.get(PARAM.direction);
  if (d) out.direction = d;
  // Wordmark. Length-capped on read as well as on input: the param arrives from
  // a pasted link, so the input's maxLength guarantees nothing here.
  const w = q.get(PARAM.wordmark);
  if (w) out.wordmark = w.slice(0, 18);
  const ws = q.get(PARAM.wordmarkStyle);
  if (ws) out.wordmarkStyle = ws;
  const lk = q.get(PARAM.lockup);
  if (lk) out.lockup = lk;
  const st = q.get(PARAM.step);
  if (st) out.step = st;
  const r = q.get(PARAM.retail);
  if (r && /^\d{1,4}$/.test(r)) out.retail = r;
  const ms = q.get(PARAM.markSeed);
  if (ms && /^\d{1,6}$/.test(ms)) out.markSeed = ms;
  // Axes and colourway — free-form here, validated server-side before spend.
  for (const k of ['colorway', 'motif', 'placement', 'scale', 'finish'] as const) {
    const v = q.get(PARAM[k]);
    if (v) out[k] = v;
  }
  return out;
}

function writeToParams(config: LineConfig, url: URL) {
  // Repeated `pin` params rather than one delimited value: these are URLs, and
  // any separator inside one would have to be escaped into unreadability.
  url.searchParams.delete('pin');
  config.pins.forEach((u) => url.searchParams.append('pin', u));
  // Keyed off PARAM, not LineConfig: `pins` is serialised separately above and
  // has no PARAM entry, so iterating LineConfig's keys no longer typechecks.
  (Object.keys(PARAM) as (keyof typeof PARAM)[]).forEach((key) => {
    const value = config[key];
    // Defaults are omitted so a link to the starting state has a bare URL.
    if (value == null || value === LINE_DEFAULTS[key]) url.searchParams.delete(PARAM[key]);
    else url.searchParams.set(PARAM[key], String(value));
  });
}

export function LineProvider({ children }: { children: React.ReactNode }) {
  const [skus, setSkus] = useState<Sku[]>([]);
  // Initialised to defaults rather than read from `window` so server and first
  // client render agree; the URL is applied in the effect below.
  const [config, setConfig] = useState<LineConfig>(LINE_DEFAULTS);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setConfig((c) => ({ ...c, ...readFromSearch(window.location.search) }));
    const parsed = new URLSearchParams(window.location.search)
      .getAll('s')
      .map(decodeSku)
      .filter((x): x is Sku => x !== null);
    if (parsed.length) setSkus(parsed);
    setHydrated(true);
  }, []);

  // replaceState, never pushState — a partner dragging through five budget
  // stops should not have to press Back five times to leave the page.
  const written = useRef('');
  useEffect(() => {
    if (!hydrated) return;
    const url = new URL(window.location.href);
    writeToParams(config, url);
    url.searchParams.delete('s');
    skus.forEach((sk) => url.searchParams.append('s', encodeSku(sk)));
    const next = url.toString();
    if (next !== written.current) {
      written.current = next;
      window.history.replaceState(null, '', next);
    }
  }, [config, skus, hydrated]);

  const set = useCallback<LineContextValue['set']>((key, value) => {
    setConfig((c) => (c[key] === value ? c : { ...c, [key]: value }));
  }, []);

  const shareUrl = useCallback(() => {
    const url = new URL(window.location.href);
    url.hash = '';
    writeToParams(config, url);
    url.searchParams.delete('s');
    skus.forEach((sk) => url.searchParams.append('s', encodeSku(sk)));
    return url.toString();
  }, [config, skus]);

  const addSku = useCallback((sku: Sku) => setSkus((xs) => [...xs, sku]), []);
  const removeSku = useCallback(
    (index: number) => setSkus((xs) => xs.filter((_, i) => i !== index)),
    [],
  );
  const setSkuUnits = useCallback(
    (index: number, units: RunSize) =>
      setSkus((xs) => xs.map((x, i) => (i === index ? { ...x, units } : x))),
    [],
  );
  const setSkuTier = useCallback(
    (index: number, tier: string) =>
      setSkus((xs) => xs.map((x, i) => (i === index ? { ...x, tier } : x))),
    [],
  );
  const setSkuRetail = useCallback(
    (index: number, retail: number | undefined) =>
      setSkus((xs) => xs.map((x, i) => (i === index ? { ...x, retail } : x))),
    [],
  );
  const clearSkus = useCallback(() => setSkus([]), []);

  const value = useMemo(
    () => ({ config, set, shareUrl, hydrated, skus, addSku, removeSku, setSkuUnits, setSkuTier, setSkuRetail, clearSkus }),
    [config, set, shareUrl, hydrated, skus, addSku, removeSku, setSkuUnits, setSkuTier, setSkuRetail, clearSkus],
  );

  return <LineContext.Provider value={value}>{children}</LineContext.Provider>;
}

export function useLine() {
  const ctx = useContext(LineContext);
  if (!ctx) throw new Error('useLine must be used inside <LineProvider>');
  return ctx;
}
