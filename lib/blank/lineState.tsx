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
  /** Decoration axes. Empty string = inherit from the graphic preset. */
  motif: string;
  placement: string;
  scale: string;
  finish: string;
  /** Budget stop slug — 'graphic' | 'washed' | 'tonal' | 'stitched' | 'full' */
  budget: string;
  garment: Garment;
  /** Graphic id from the library ('G-tonal-emboss'), or null for none selected */
  graphic: string | null;
  /** Brand direction key from the bake-off */
  direction: string;
  /** The word the wordmark sets. Typography, so it can be anything and is
      rendered rather than generated — no spend, and always spelled right. */
  wordmark: string;
  /** Chosen wordmark treatment id, or null for none. */
  wordmarkStyle: string | null;
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
  direction: 'workwear',
  wordmark: 'BLANK',
  wordmarkStyle: null,
};

/** URL param names. Short — these get pasted into messages. */
const PARAM = {
  budget: 'b',
  garment: 'g',
  graphic: 'p',
  direction: 'd',
  colorway: 'c',
  motif: 'mo',
  placement: 'pl',
  scale: 'sc',
  finish: 'fi',
  wordmark: 'w',
  wordmarkStyle: 'ws',
} as const;

interface LineContextValue {
  config: LineConfig;
  /** The collection being costed. Serialized as repeated `s` params. */
  skus: Sku[];
  addSku: (sku: Sku) => void;
  removeSku: (index: number) => void;
  setSkuUnits: (index: number, units: RunSize) => void;
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
  const d = q.get(PARAM.direction);
  if (d) out.direction = d;
  // Wordmark. Length-capped on read as well as on input: the param arrives from
  // a pasted link, so the input's maxLength guarantees nothing here.
  const w = q.get(PARAM.wordmark);
  if (w) out.wordmark = w.slice(0, 18);
  const ws = q.get(PARAM.wordmarkStyle);
  if (ws) out.wordmarkStyle = ws;
  // Axes and colourway — free-form here, validated server-side before spend.
  for (const k of ['colorway', 'motif', 'placement', 'scale', 'finish'] as const) {
    const v = q.get(PARAM[k]);
    if (v) out[k] = v;
  }
  return out;
}

function writeToParams(config: LineConfig, url: URL) {
  (Object.keys(PARAM) as (keyof LineConfig)[]).forEach((key) => {
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
  const setSkuRetail = useCallback(
    (index: number, retail: number | undefined) =>
      setSkus((xs) => xs.map((x, i) => (i === index ? { ...x, retail } : x))),
    [],
  );
  const clearSkus = useCallback(() => setSkus([]), []);

  const value = useMemo(
    () => ({ config, set, shareUrl, hydrated, skus, addSku, removeSku, setSkuUnits, setSkuRetail, clearSkus }),
    [config, set, shareUrl, hydrated, skus, addSku, removeSku, setSkuUnits, setSkuRetail, clearSkus],
  );

  return <LineContext.Provider value={value}>{children}</LineContext.Provider>;
}

export function useLine() {
  const ctx = useContext(LineContext);
  if (!ctx) throw new Error('useLine must be used inside <LineProvider>');
  return ctx;
}
