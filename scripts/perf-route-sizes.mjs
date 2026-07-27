import fs from 'fs';
import path from 'path';
import zlib from 'zlib';

const base = '/Users/matthanson/Developer/rationale-public/.next';
const manifest = JSON.parse(fs.readFileSync(path.join(base, 'build-manifest.json'), 'utf8'));

function gz(file) {
  const buf = fs.readFileSync(path.join(base, file));
  return zlib.gzipSync(buf, { level: 9 }).length;
}

const shared = [
  ...manifest.polyfillFiles,
  ...manifest.rootMainFiles,
  ...manifest.lowPriorityFiles,
];
const sharedGz = shared.reduce((sum, f) => sum + gz(f), 0);

const appDir = path.join(base, 'static/chunks/app');

function chunkFiles(route) {
  const dir = path.join(appDir, route);
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir)
    .filter((f) => f.endsWith('.js') && (f.startsWith('page-') || f.startsWith('layout-') || f.startsWith('loading-')))
    .map((f) => path.posix.join('static/chunks/app', route, f));
}

function filesFor(route) {
  const parts = route.split('/').filter(Boolean);
  const files = [];
  for (let i = 0; i < parts.length; i++) {
    const seg = i === 0 ? '' : parts.slice(0, i).join('/');
    files.push(...chunkFiles(seg).filter((f) => f.includes('/layout-')));
  }
  files.push(...chunkFiles(route));
  return [...new Set(files)];
}

const routes = [
  '/(public)/page',
  '/(public)/about/page',
  '/(public)/contact/page',
  '/(public)/writing/page',
  '/(public)/work/vault/page',
  '/(public)/work/zero/page',
  '/(public)/work/athletes-first/page',
  '/(public)/work/heirloom/page',
  '/(public)/work/heirloom/evolution/page',
  '/(public)/work/silly-questions/page',
  '/(public)/work/fair-embodied-ai/page',
  '/(public)/work/spark-ar/page',
  '/(public)/work/orion/page',
  '/(public)/work/viacom/page',
  '/(public)/work/studio-era/page',
  '/(public)/work/framestore/page',
  '/(public)/work/rumi/page',
  '/(public)/work/fubo/page',
  '/(public)/work/nimbus/page',
  '/(public)/work/decks/[slug]/page',
  '/(public)/writing/[slug]/page',
  '/(public)/prototype-lab/page',
  '/(public)/hero-lab/page',
  '/(public)/home-lab/page',
];

const rows = [];
for (const r of routes) {
  const files = filesFor(r);
  const routeGz = sharedGz + files.reduce((sum, f) => sum + gz(f), 0);
  rows.push({ route: r.replace('/(public)', '').replace('/page', ''), firstLoadJS: routeGz, files });
}
rows.sort((a, b) => b.firstLoadJS - a.firstLoadJS);
console.log('| Route | First Load JS (gzipped) |');
console.log('|-------|--------------------------|');
for (const row of rows) {
  console.log(`| ${row.route || '/'} | ${row.firstLoadJS.toLocaleString()} bytes (${(row.firstLoadJS / 1024).toFixed(1)} KB) |`);
}
