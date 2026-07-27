import fs from 'fs';
import path from 'path';
import zlib from 'zlib';

const base = '/Users/matthanson/Developer/rationale-public/.next';
const appDir = path.join(base, 'static/chunks/app');

function gz(file) {
  return zlib.gzipSync(fs.readFileSync(file), { level: 9 }).length;
}

function chunks(route) {
  const dir = path.join(appDir, route);
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir)
    .filter((f) => f.endsWith('.js') && (f.startsWith('page-') || f.startsWith('layout-') || f.startsWith('loading-')))
    .map((f) => ({ file: path.posix.join('static/chunks/app', route, f), size: gz(path.join(dir, f)) }));
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
];

const rows = [];
for (const r of routes) {
  const parts = r.split('/').filter(Boolean);
  const seen = new Set();
  const files = [];
  for (let i = 0; i <= parts.length; i++) {
    const seg = i === 0 ? '' : parts.slice(0, i).join('/');
    for (const c of chunks(seg)) {
      if (!seen.has(c.file)) {
        seen.add(c.file);
        files.push(c);
      }
    }
  }
  const total = files.reduce((s, c) => s + c.size, 0);
  rows.push({ route: r.replace('/(public)', '').replace('/page', '') || '/', total, files });
}
rows.sort((a, b) => b.total - a.total);

console.log('| Route | Route-specific JS (gzipped) | Chunks |');
console.log('|-------|-----------------------------|--------|');
for (const row of rows) {
  const chunksStr = row.files.map((c) => path.basename(c.file)).join(', ');
  console.log(`| ${row.route} | ${row.total.toLocaleString()} bytes (${(row.total / 1024).toFixed(1)} KB) | ${chunksStr} |`);
}
