#!/usr/bin/env node
/**
 * Generate fubo showcase thumbnails with Gemini (gemini-2.5-flash-image-preview),
 * the same engine the live fubo tool uses, then write fubo-showcase/manifest.json.
 *
 * One-time/dev tool. Idempotent: skips combos whose cache image already exists,
 * so the proven hand-made images (NBA Atlanta Hawks, NFL Arizona Cardinals
 * risograph) are reused, not regenerated.
 *
 *   node scripts/gen-fubo-thumbs.mjs                 # generate all missing + rebuild manifest
 *   node scripts/gen-fubo-thumbs.mjs --league=NHL    # only this league (test batch)
 *   node scripts/gen-fubo-thumbs.mjs --manifest-only # just rebuild manifest from cache/
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync } from 'fs';
import { join, resolve } from 'path';

const ROOT = resolve(new URL('..', import.meta.url).pathname);
const CACHE = join(ROOT, 'public/prototypes/fubo-showcase/cache');
const MANIFEST = join(ROOT, 'public/prototypes/fubo-showcase/manifest.json');
const PUBLIC_BASE = '/prototypes/fubo-showcase/cache';
const MODEL = 'gemini-2.5-flash-image';

const args = Object.fromEntries(process.argv.slice(2).map((a) => {
  const [k, v] = a.replace(/^--/, '').split('=');
  return [k, v ?? true];
}));

function loadKey() {
  if (process.env.GEMINI_API_KEY) return process.env.GEMINI_API_KEY;
  const env = readFileSync(join(ROOT, '.env.local'), 'utf8');
  const m = env.match(/^GEMINI_API_KEY=(.+)$/m);
  if (!m) throw new Error('GEMINI_API_KEY not found in env or .env.local');
  return m[1].trim().replace(/^["']|["']$/g, '');
}

// 3 styles, prompts lifted from public/prototypes/fubo/backend/style_prompts.py
const STYLES = {
  'comic-book': {
    content: 'TeamNews',
    prompt: 'American superhero comic book art: bold thick black ink outlines, vibrant cel-shaded colors, Ben-Day dot halftone patterns, dynamic action lines and motion streaks, pop art aesthetics, graphic novel style, dramatic lighting and shadows, high contrast colors',
  },
  'risograph': {
    content: 'Highlights',
    prompt: 'Risograph print style: vibrant team color palette, bold halftone patterns using team colors, intense color saturation, vintage poster rendering with brilliant team color emphasis, halftone grain with team color overlays',
  },
  'video-game': {
    content: 'TeamNews',
    prompt: 'AAA game cover art: epic cinematic lighting, dramatic lens flares, cosmic nebula background, glowing particle effects, hyper-realistic character render, intense action pose, Madden-style dynamic composition, professional game cover aesthetic',
  },
};

// One marquee team per league. NBA + NFL-risograph reuse existing cache files.
const COMBOS = [
  { league: 'NBA', team: 'Atlanta Hawks' },
  { league: 'NFL', team: 'Arizona Cardinals' },
  { league: 'NHL', team: 'New York Rangers' },
  { league: 'MLS', team: 'Inter Miami' },
  { league: 'EPL', team: 'Manchester United' },
  { league: 'La Liga', team: 'Real Madrid' },
  { league: 'Bundesliga', team: 'Bayern Munich' },
  { league: 'Serie A', team: 'Juventus' },
];

const slugFor = (league, team, style, content) =>
  `${league}__${team}__${style}__${content}.jpg`.replace(/\s+/g, '-');

function buildPrompt(league, team, style) {
  const s = STYLES[style];
  return [
    `A dynamic professional sports broadcast key-art thumbnail for the ${team} (${league}).`,
    `16:9 widescreen composition, an athlete in an intense action pose, stadium energy.`,
    `Render it in this style: ${s.prompt}.`,
    `Use accurate ${team} team colors. Cinematic, poster-quality, high detail.`,
    `Absolutely no text, no words, no letters, no numbers, no logos with text, no watermarks.`,
  ].join(' ');
}

async function generate(key, prompt) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${key}`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { responseModalities: ['IMAGE'], imageConfig: { aspectRatio: '16:9' } },
    }),
  });
  if (!res.ok) throw new Error(`Gemini ${res.status}: ${(await res.text()).slice(0, 300)}`);
  const data = await res.json();
  const parts = data?.candidates?.[0]?.content?.parts ?? [];
  const img = parts.find((p) => p.inlineData?.data);
  if (!img) throw new Error(`No image in response: ${JSON.stringify(data).slice(0, 300)}`);
  return Buffer.from(img.inlineData.data, 'base64');
}

function rebuildManifest() {
  const files = existsSync(CACHE) ? readdirSync(CACHE).filter((f) => /\.(jpe?g|png|webp)$/i.test(f)) : [];
  const manifest = { generatedAt: new Date().toISOString(), source: 'gemini gen + baked exports', leagues: {}, styles: new Set(), combos: [] };
  for (const f of files) {
    const m = /^(?<league>.+?)__(?<team>.+?)__(?<style>.+?)__(?<content>.+?)\.(jpe?g|png|webp)$/i.exec(f);
    if (!m) continue;
    const league = m.groups.league.replace(/-/g, ' ');
    const team = m.groups.team.replace(/-/g, ' ');
    const { style, content } = m.groups;
    const url = `${PUBLIC_BASE}/${f}`;
    manifest.leagues[league] ||= {};
    manifest.leagues[league][team] ||= [];
    manifest.leagues[league][team].push({ style, content, url });
    manifest.styles.add(style);
    manifest.combos.push({ league, team, style, content, url });
  }
  manifest.styles = Array.from(manifest.styles).sort();
  writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2));
  console.log(`manifest: ${manifest.combos.length} combos across ${Object.keys(manifest.leagues).length} leagues`);
}

async function main() {
  mkdirSync(CACHE, { recursive: true });
  if (args['manifest-only']) return rebuildManifest();

  const key = loadKey();
  const targets = COMBOS.filter((c) => !args.league || c.league.toLowerCase() === String(args.league).toLowerCase());

  let made = 0, skipped = 0;
  for (const { league, team } of targets) {
    for (const style of Object.keys(STYLES)) {
      const slug = slugFor(league, team, style, STYLES[style].content);
      const dest = join(CACHE, slug);
      if (existsSync(dest)) { skipped++; console.log(`skip   ${slug}`); continue; }
      process.stdout.write(`gen    ${slug} ... `);
      try {
        const buf = await generate(key, buildPrompt(league, team, style));
        writeFileSync(dest, buf);
        made++;
        console.log(`ok (${Math.round(buf.length / 1024)}kb)`);
      } catch (e) {
        console.log(`FAIL ${e.message}`);
      }
    }
  }
  console.log(`\nGenerated ${made}, skipped ${skipped} (existing).`);
  rebuildManifest();
}

main();
