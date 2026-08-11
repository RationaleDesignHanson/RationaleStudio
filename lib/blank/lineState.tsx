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

/**
 * The two businesses this tool can cost.
 *
 * `considered` — a few styles, one identity, deep runs. Setup is paid once and
 * amortises, so screen and embroidery are affordable and the margin is high.
 *
 * `scale` — a catalogue: a shirt per place, micro-targeted by geography and
 * interest, shallow runs on each. Setup is paid PER DESIGN, so it never
 * amortises, and the margin per unit is thinner because nothing gets volume.
 *
 * This is not a preference, it is the fork the whole model hangs off: it decides
 * which decoration methods are affordable, how deep the runs are, and whether
 * "buying as a collection" saves anything at all.
 */
export type Strategy = 'considered' | 'scale';

export interface LineConfig {
  /** Which of the two businesses. Chosen first; everything downstream follows. */
  strategy: Strategy;
  /**
   * How many distinct artworks the line carries.
   *
   * VARIANTS, not places. A place is one way to vary a catalogue and the most
   * obvious one, but a joke, a season or a collaborator are others — naming the
   * axis after a single instance of it narrows the idea for no reason.
   * Always 1 for `considered`, where the whole point is one identity.
   */
  designs: number;
  /**
   * The lettering set into a generated sign panel, with `/` starting a new line
   * — "MOLLY PITCHER / NJ".
   *
   * Stored as TEXT, not as a baked composite, for the same reason the wordmark
   * is: it has to stay correctly spelled, editable, and cheap. A composited
   * image would also not survive the share link, which only accepts our own
   * Storage URLs.
   */
  signText: string;
  /**
   * The place a catalogue graphic is for, and the voice it was asked for in.
   *
   * In the URL rather than component state for the reason every other choice is:
   * a partner opening the link could see the kept graphic but not what was
   * searched for or in which register, so they could not re-run the round
   * without guessing — and re-running costs six renders.
   */
  place: string;
  register: string;
  /** Cap height as a percent of the panel's width. */
  signSize: number;
  /** Vertical centre of the lettering, as a percent of panel height. */
  signY: number;
  /**
   * The line's palette — the small set of colours every style draws from.
   *
   * A line is coherent because its styles share colours, so the palette is a
   * property of the LINE and a style's colourways are a subset of it. Picking
   * freely per garment gives you a pile of separate products; one colour for
   * everything means the hoodie cannot have a shade the tee does not.
   */
  palette: string[];
  /** Where this gets sold, which decides the fees and whether ads are paid for. */
  channel: string;
  /** Paid acquisition per order. The number the catalogue model lives or dies on. */
  cac: number;
  /**
   * Heat-press cost per print, in cents, or 0 to use the model's own figure.
   *
   * The most load-bearing soft number in the model — the whole wide-catalogue
   * argument rests on it. Adjustable so the page can say what the thesis
   * survives instead of asserting a price it cannot defend.
   */
  dtfCents: number;
  /**
   * How the artwork should look, in your words.
   *
   * The generators had fixed voices — six drawing styles for a mark, three
   * registers for a place, six angles for a graphic — and no way to say "like
   * this" at all. That is fine for a spread and useless once you know what you
   * want, which is the point at which most people start caring.
   */
  artDirection: string;
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
  /**
   * WHAT YOU HAVE MADE, filed by what it IS.
   *
   * There was one slot — `customGraphic` — and four generators writing to it:
   * the drawn wordmark on 01, and the drawn mark, the prompt graphic and the
   * place graphic on 02. Four different kinds of object in one box, so keeping
   * any of them silently threw the last one away. Generate a wordmark, walk to
   * the next screen, keep anything, and the wordmark was gone without a word.
   *
   * They are not the same kind of thing. A WORDMARK is the name, drawn. A MARK
   * is the symbol, and it is the house identity that goes on the neck of every
   * garment. A GRAPHIC is a front print and it changes per style, per variant,
   * per drop. Three roles, three slots, and nothing overwrites anything.
   */
  art: {
    /** The name, drawn. Null means the CSS treatment is doing the job. */
    wordmark: string | null;
    /** The symbol, drawn. Null means the construction is doing the job. */
    mark: string | null;
    /** The front print, for a line that carries one. */
    graphic: string | null;
  };
  /**
   * Which of the three goes on the chest.
   *
   * A wordmark tee is the most ordinary product in streetwear, so the front
   * print has to be selectable rather than hardcoded to the graphic slot.
   */
  frontPrint: 'wordmark' | 'mark' | 'graphic';
  /**
   * The catalogue, one entry per variant, each with its own front print.
   *
   * A variant per place means a print per place — one graphic serving twenty-four
   * of them is not a catalogue, it is one product with a big number beside it.
   * `designs` stays the PLANNED count and this is what has actually been made,
   * so the spec can say "24 planned, 3 made" rather than implying a full set.
   *
   * It lives in the saved row rather than the URL, which is what made a list of
   * two dozen images affordable at all.
   */
  variants: { label: string; graphic: string | null }[];
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
   * The fields the user has actually touched.
   *
   * WHY THIS EXISTS. Eleven fields carried meaningful defaults — budget
   * 'graphic', direction 'workwear', wordmark 'BLANK', lockup 'word' — so
   * nothing in the app could tell "they chose the $3k tier" from "nobody has
   * been to the costing beat". The progress rail's own comment promised "only
   * what is actually settled", then printed Name, Budget and Direction
   * unconditionally, because its `if (config.direction)` gate can never be
   * false against a truthy default.
   *
   * The alternative was nulling every default and resolving a working value at
   * each of ~80 call sites. This separates the RECORD of a choice from its
   * VALUE instead, which is a much smaller change and keeps every consumer
   * reading a valid value. The cost is that a new surface can still read
   * `config.budget` and present a default as a decision — so anything claiming
   * something is settled must ask `isSet` and not the value.
   */
  chosen: string[];
  /**
   * Which beat is on screen. View state rather than line configuration, carried
   * in the URL on purpose: the whole product is two people sending each other a
   * link, and "look at this" has to land them on the beat you were looking at.
   */
  step: string;
}

/**
 * What actually goes on the chest, resolved from the three slots.
 *
 * Every consumer used to read `config.customGraphic` directly, which meant each
 * one silently assumed the single-slot model and there was nowhere to change
 * the answer. Asking one question in one place is what lets a wordmark be the
 * front print on a Tuesday and a place graphic on a Wednesday.
 *
 * `variantIndex` is for the catalogue: a variant carries its own print, and
 * falls back to the line's graphic when it has not been made yet, so a
 * half-finished catalogue still renders rather than showing blanks.
 */
export function frontArt(config: LineConfig, variantIndex?: number): string | null {
  if (typeof variantIndex === 'number') {
    const v = config.variants[variantIndex];
    if (v?.graphic) return v.graphic;
  }
  const byRole = config.art[config.frontPrint];
  // Fall back through the slots rather than showing nothing: a line with only a
  // drawn wordmark should still put it on a shirt.
  return byRole ?? config.art.graphic ?? config.art.wordmark ?? config.art.mark ?? config.customGraphic;
}

/** Everything made, for a shelf that shows what exists rather than what is on. */
export function allArt(config: LineConfig): { role: string; url: string }[] {
  const out: { role: string; url: string }[] = [];
  for (const role of ['wordmark', 'mark', 'graphic'] as const) {
    const url = config.art[role];
    if (url) out.push({ role, url });
  }
  return out;
}

/**
 * Accept a URL only if it is one of ours.
 *
 * Same host check the `cg` param has always had: a saved row is written by our
 * own client, but it is JSON from the network and an arbitrary URL rendered as
 * artwork is an unnecessary thing to allow.
 */
function storageUrl(v: unknown): string | null {
  return typeof v === 'string' && v.includes('/storage/v1/object/public/blank-renders/') ? v : null;
}

export const LINE_DEFAULTS: LineConfig = {
  strategy: 'considered',
  designs: 1,
  artDirection: '',
  palette: [],
  channel: 'social',
  cac: 12,
  dtfCents: 0,
  signText: '',
  place: '',
  register: 'sign',
  signSize: 11,
  signY: 50,
  colorway: 'charcoal',
  motif: '',
  placement: '',
  scale: '',
  finish: '',
  budget: 'graphic',
  mark: null,
  customGraphic: null,
  art: { wordmark: null, mark: null, graphic: null },
  frontPrint: 'graphic',
  variants: [],
  pins: [],
  direction: 'workwear',
  directionPrompt: '',
  wordmark: 'BLANK',
  wordmarkStyle: null,
  lockup: 'word',
  markSeed: '',
  chosen: [],
  step: '01',
};

/** URL param names. Short — these get pasted into messages. */
const PARAM = {
  strategy: 'sg',
  designs: 'n',
  artDirection: 'ad',
  palette: 'pal',
  channel: 'ch',
  cac: 'cac',
  dtfCents: 'dtf',
  signText: 'sx',
  place: 'pc',
  register: 'rg',
  signSize: 'sz',
  signY: 'sy',
  budget: 'b',
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
  markSeed: 'ms',
  chosen: 'tc',
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
  /** Which colourways a style is made in. Never empty. */
  setSkuColours: (index: number, colours: string[]) => void;
  clearSkus: () => void;
  set: <K extends keyof LineConfig>(key: K, value: LineConfig[K]) => void;
  /**
   * Keep a generated image, filed under what it is.
   *
   * There is one action rather than four `set('customGraphic', url)` calls
   * because four call sites is exactly how the slots got confused in the first
   * place — each generator decided for itself and none of them knew about the
   * others. Passing `null` unkeeps, which is how a tile toggles off.
   *
   * A kept graphic also becomes the front print, since keeping the thing that
   * goes on the chest is the same gesture as choosing it. A wordmark or a mark
   * does not steal the chest — they have their own jobs — but `frontArt` will
   * fall back to them when there is no graphic yet, so a wordmark made on 01
   * still shows up on a garment on 02.
   */
  keepArt: (role: 'wordmark' | 'mark' | 'graphic', url: string | null) => void;
  /** Set the front print for one variant, for a catalogue with a print per place. */
  setVariantArt: (label: string, url: string | null) => void;
  /**
   * Apply a value WITHOUT recording it as a decision.
   *
   * Some values are consequences, not choices: the budget implied by picking a
   * business, the budget the cost sheet reads off its leading row, the sign type
   * size auto-fitted to the place name. Routing those through `set` made the rail
   * claim the user had picked a $12k tier because they picked "small and dear",
   * and made it inconsistent about it — the wide option's implied budget happens
   * to equal the global default, so that one recorded nothing.
   */
  setImplied: <K extends keyof LineConfig>(key: K, value: LineConfig[K]) => void;
  /**
   * Has the user actually chosen this, or is it still the default?
   *
   * Anything that claims something is SETTLED must ask this rather than testing
   * the value — eleven fields have truthy defaults and testing those reports
   * every default as a decision.
   */
  isSet: (key: keyof LineConfig) => boolean;
  /**
   * Swap the whole document at once, for loading a saved line.
   *
   * One setState rather than a field at a time: a partial replay would fire the
   * autosave against each intermediate state and race the load it came from.
   */
  replaceAll: (state: Partial<LineConfig> & { skus?: Sku[] }) => void;
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
  // Colourways ride on the units field as `50+bone+olive`, so the dot-separated
  // shape older links use still parses and a link stays readable when pasted.
  const units = String(s.units) + (s.colours.length ? `+${s.colours.join('+')}` : '');
  const base = [s.garment, s.tier, units + (s.retail ? `@${s.retail}` : '')];
  // Trailing separator omitted when there's no graphic — these get pasted into
  // messages and `tee.full.100.` reads like a truncation.
  return (s.graphic ? [...base, s.graphic] : base).join('.');
}

function decodeSku(raw: string): Sku | null {
  const [garment, tier, units, ...rest] = raw.split('.');
  if (garment !== 'tee' && garment !== 'hoodie' && garment !== 'cap') return null;
  if (!tier) return null;
  // units may carry colourways as `100+bone+olive` and a retail override as
  // `100@120`, in that order.
  const [unitPart, retailPart] = String(units).split('@');
  const [runPart, ...colourParts] = unitPart.split('+');
  const n = Number(runPart) as RunSize;
  if (!RUN_SIZES.includes(n)) return null;
  const retail = retailPart ? Number(retailPart) : undefined;
  if (retail !== undefined && (!Number.isFinite(retail) || retail <= 0)) return null;
  // Graphic ids contain dots in no known case, but rejoin defensively.
  const graphic = rest.join('.');
  return {
    garment,
    tier,
    units: n,
    // A link written before colour existed gets the default colourway.
    colours: colourParts.length ? colourParts : ['faded-charcoal'],
    graphic: graphic || null,
    ...(retail ? { retail } : {}),
  };
}

function readFromSearch(search: string): Partial<LineConfig> {
  const q = new URLSearchParams(search);
  const out: Partial<LineConfig> = {};
  const sg = q.get(PARAM.strategy);
  if (sg === 'scale' || sg === 'considered') out.strategy = sg;
  // Capped rather than rejected: a pasted link with n=99999 should cost a big
  // catalogue, not silently fall back to one design.
  const nParam = q.get(PARAM.designs);
  if (nParam && /^\d{1,4}$/.test(nParam)) out.designs = Math.min(500, Math.max(1, Number(nParam)));
  const ch = q.get(PARAM.channel);
  if (ch && /^[a-z]{4,12}$/.test(ch)) out.channel = ch;
  const dtfP = q.get(PARAM.dtfCents);
  if (dtfP && /^\d{1,4}$/.test(dtfP)) out.dtfCents = Math.min(1000, Number(dtfP));
  const cacP = q.get(PARAM.cac);
  if (cacP && /^\d{1,3}$/.test(cacP)) out.cac = Math.min(200, Number(cacP));
  const ad = q.get(PARAM.artDirection);
  if (ad) out.artDirection = ad.slice(0, 200);
  const pal = q.get(PARAM.palette);
  if (pal) out.palette = pal.split(',').filter(Boolean).slice(0, 6);
  const sx = q.get(PARAM.signText);
  if (sx) out.signText = sx.slice(0, 48);
  const pc = q.get(PARAM.place);
  if (pc) out.place = pc.slice(0, 120);
  const rg = q.get(PARAM.register);
  if (rg === 'sign' || rg === 'pun' || rg === 'song') out.register = rg;
  const sz = q.get(PARAM.signSize);
  if (sz && /^\d{1,2}$/.test(sz)) out.signSize = Math.min(30, Math.max(4, Number(sz)));
  const sy = q.get(PARAM.signY);
  if (sy && /^\d{1,3}$/.test(sy)) out.signY = Math.min(95, Math.max(5, Number(sy)));
  const b = q.get(PARAM.budget);
  if (b) out.budget = b;
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
  const ms = q.get(PARAM.markSeed);
  if (ms && /^\d{1,6}$/.test(ms)) out.markSeed = ms;
  // Comma-joined field names. Bounded so a pasted link cannot grow it forever.
  const tc = q.get(PARAM.chosen);
  if (tc) out.chosen = tc.split(',').filter(Boolean).slice(0, 40);
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
  // Array-valued, so it cannot go through the scalar loop below.
  if (config.chosen.length) url.searchParams.set(PARAM.chosen, config.chosen.join(','));
  else url.searchParams.delete(PARAM.chosen);
  if (config.palette.length) url.searchParams.set(PARAM.palette, config.palette.join(','));
  else url.searchParams.delete(PARAM.palette);
  // Keyed off PARAM, not LineConfig: `pins` is serialised separately above and
  // has no PARAM entry, so iterating LineConfig's keys no longer typechecks.
  (Object.keys(PARAM) as (keyof typeof PARAM)[]).forEach((key) => {
    // `art` and `variants` are absent from PARAM entirely — they live in the
    // saved row, not the URL — so this loop never sees them.
    if (key === 'chosen' || key === 'palette') return; // written above
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
    setConfig((c) => {
      if (c[key] === value) return c;
      // Every user choice arrives through here, so this is the one place that
      // has to record that it WAS a choice. `step` and `chosen` are excluded:
      // moving between beats is navigation, not a decision about the line.
      const record = key !== 'step' && key !== 'chosen' && !c.chosen.includes(key);
      return {
        ...c,
        [key]: value,
        ...(record ? { chosen: [...c.chosen, key as string] } : {}),
      };
    });
  }, []);

  const keepArt = useCallback<LineContextValue['keepArt']>((role, url) => {
    setConfig((c) => {
      const art = { ...c.art, [role]: url };
      return {
        ...c,
        art,
        frontPrint: role === 'graphic' && url ? 'graphic' : c.frontPrint,
        // Mirrored so a snapshot link still carries the artwork: the URL has one
        // slot and always will, and it should hold whatever is on the chest.
        customGraphic: art[role === 'graphic' ? 'graphic' : c.frontPrint] ?? art.graphic ?? art.wordmark ?? art.mark,
        chosen: c.chosen.includes('customGraphic') ? c.chosen : [...c.chosen, 'customGraphic'],
      };
    });
  }, []);

  const setVariantArt = useCallback<LineContextValue['setVariantArt']>((label, url) => {
    setConfig((c) => {
      const next = c.variants.filter((v) => v.label !== label);
      if (url) next.push({ label, graphic: url });
      // Stable order, so the catalogue does not reshuffle as prints are made.
      next.sort((a, b) => a.label.localeCompare(b.label));
      return { ...c, variants: next };
    });
  }, []);

  const setImplied = useCallback<LineContextValue['setImplied']>((key, value) => {
    setConfig((c) => (c[key] === value ? c : { ...c, [key]: value }));
  }, []);

  const replaceAll = useCallback<LineContextValue['replaceAll']>((incoming) => {
    const { skus: nextSkus, ...rest } = incoming;
    // `art` and `variants` are the only nested shapes in the document, and a
    // malformed one is a crash on render rather than a wrong value — a row saved
    // by an older build simply omits them, which the spread handles, but a row
    // holding the wrong type would take the page down. Cheap to rule out.
    const clean = { ...rest };
    if (clean.art && typeof clean.art === 'object') {
      clean.art = {
        wordmark: storageUrl(clean.art.wordmark),
        mark: storageUrl(clean.art.mark),
        graphic: storageUrl(clean.art.graphic),
      };
    } else delete clean.art;
    if (Array.isArray(clean.variants)) {
      clean.variants = clean.variants
        .filter((v) => v && typeof v.label === 'string')
        .slice(0, 64)
        .map((v) => ({ label: v.label.slice(0, 40), graphic: storageUrl(v.graphic) }));
    } else delete clean.variants;
    setConfig((c) => ({ ...c, ...clean }));
    if (Array.isArray(nextSkus)) setSkus(nextSkus);
  }, []);

  const isSet = useCallback(
    (key: keyof LineConfig) => config.chosen.includes(key as string),
    [config.chosen],
  );

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
  const setSkuColours = useCallback(
    (index: number, colours: string[]) =>
      setSkus((xs) => xs.map((x, i) => (i === index && colours.length ? { ...x, colours } : x))),
    [],
  );
  const clearSkus = useCallback(() => setSkus([]), []);

  const value = useMemo(
    () => ({ config, set, keepArt, setVariantArt, setImplied, isSet, replaceAll, shareUrl, hydrated, skus, addSku, removeSku, setSkuUnits, setSkuTier, setSkuRetail, setSkuColours, clearSkus }),
    [config, set, keepArt, setVariantArt, setImplied, isSet, replaceAll, shareUrl, hydrated, skus, addSku, removeSku, setSkuUnits, setSkuTier, setSkuRetail, setSkuColours, clearSkus],
  );

  return <LineContext.Provider value={value}>{children}</LineContext.Provider>;
}

export function useLine() {
  const ctx = useContext(LineContext);
  if (!ctx) throw new Error('useLine must be used inside <LineProvider>');
  return ctx;
}
