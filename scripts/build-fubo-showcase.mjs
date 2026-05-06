#!/usr/bin/env node
/**
 * Build the static fubo showcase from an Exports/ tree produced by the live
 * Python tool (public/prototypes/fubo/backend/Exports/).
 *
 *   1. Run the live fubo tool locally, generate the team × style combos you
 *      want featured, click "Export to folders".
 *   2. node scripts/build-fubo-showcase.mjs [--src=path/to/Exports] [--max=80]
 *   3. The script walks the export tree, copies images into
 *      public/prototypes/fubo-showcase/cache/, and writes manifest.json.
 *
 * No regeneration happens here. Zero ongoing cost. Run once per refresh.
 *
 * Filename schema (from export_manager.py):
 *   {league}_{team}_{content}_{style}_{YYYYMMDD}_{HHMMSS}.{ext}
 */

import { readdirSync, statSync, mkdirSync, copyFileSync, writeFileSync, existsSync, rmSync } from 'fs';
import { join, basename, extname, resolve } from 'path';

const ROOT = resolve(new URL('..', import.meta.url).pathname);
const DEFAULT_SRC = join(ROOT, 'public/prototypes/fubo/backend/Exports');
const OUT_DIR = join(ROOT, 'public/prototypes/fubo-showcase/cache');
const MANIFEST = join(ROOT, 'public/prototypes/fubo-showcase/manifest.json');
const PUBLIC_BASE = '/prototypes/fubo-showcase/cache';

const args = Object.fromEntries(
  process.argv.slice(2).map((a) => {
    const [k, v] = a.replace(/^--/, '').split('=');
    return [k, v ?? true];
  }),
);
const SRC = args.src ? resolve(args.src) : DEFAULT_SRC;
const MAX = args.max ? Number(args.max) : Infinity;

const FILENAME_RE = /^(?<league>[^_]+)_(?<team>.+?)_(?<content>TeamNews|Highlights|Action|Player)_(?<style>[^_]+)_(?<date>\d{8})_(?<time>\d{6})/;

function walk(dir) {
  const out = [];
  if (!existsSync(dir)) return out;
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    const s = statSync(p);
    if (s.isDirectory()) out.push(...walk(p));
    else if (/\.(jpe?g|png|webp)$/i.test(entry)) out.push(p);
  }
  return out;
}

function parse(filePath) {
  const name = basename(filePath, extname(filePath));
  const m = FILENAME_RE.exec(name);
  if (!m) return null;
  const { league, team, content, style, date, time } = m.groups;
  return {
    league,
    team: team.replace(/_/g, ' '),
    content,
    style,
    timestamp: `${date}_${time}`,
    sourcePath: filePath,
  };
}

function main() {
  if (!existsSync(SRC)) {
    console.error(`Source dir not found: ${SRC}`);
    console.error(`Run the live fubo tool first, export some combos, then re-run.`);
    process.exit(1);
  }

  const files = walk(SRC);
  const parsed = files.map(parse).filter(Boolean);
  console.log(`Found ${parsed.length} export(s) under ${SRC}`);

  // Keep most-recent timestamp per (league, team, style, content)
  const byKey = new Map();
  for (const p of parsed) {
    const key = `${p.league}|${p.team}|${p.style}|${p.content}`;
    const prev = byKey.get(key);
    if (!prev || p.timestamp > prev.timestamp) byKey.set(key, p);
  }
  const items = Array.from(byKey.values()).slice(0, MAX);
  console.log(`Indexing ${items.length} unique combos (max=${MAX})`);

  if (existsSync(OUT_DIR)) rmSync(OUT_DIR, { recursive: true, force: true });
  mkdirSync(OUT_DIR, { recursive: true });

  const manifest = {
    generatedAt: new Date().toISOString(),
    source: SRC,
    leagues: {},
    styles: new Set(),
    combos: [],
  };

  for (const it of items) {
    const ext = extname(it.sourcePath);
    const slug = `${it.league}__${it.team}__${it.style}__${it.content}${ext}`.replace(/\s+/g, '-');
    const dest = join(OUT_DIR, slug);
    copyFileSync(it.sourcePath, dest);

    const url = `${PUBLIC_BASE}/${slug}`;
    manifest.leagues[it.league] ||= {};
    manifest.leagues[it.league][it.team] ||= [];
    manifest.leagues[it.league][it.team].push({ style: it.style, content: it.content, url });
    manifest.styles.add(it.style);
    manifest.combos.push({ league: it.league, team: it.team, style: it.style, content: it.content, url });
  }

  manifest.styles = Array.from(manifest.styles).sort();

  writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2));
  console.log(`Wrote manifest with ${manifest.combos.length} combos → ${MANIFEST}`);
  console.log(`Cache size: ${OUT_DIR}`);
}

main();
