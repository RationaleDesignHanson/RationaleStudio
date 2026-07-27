import fs from 'fs';

const html = fs.readFileSync('/Users/matthanson/Developer/rationale-public/.next/analyze/client.html', 'utf8');
const startMarker = 'window.chartData = ';
const start = html.indexOf(startMarker);
if (start === -1) throw new Error('chartData start not found');
let i = start + startMarker.length;
if (html[i] !== '[') throw new Error('expected array');
let depth = 0;
let inString = false;
let escaped = false;
let end = i;
for (; i < html.length; i++) {
  const ch = html[i];
  if (inString) {
    if (escaped) {
      escaped = false;
    } else if (ch === '\\') {
      escaped = true;
    } else if (ch === '"') {
      inString = false;
    }
  } else {
    if (ch === '"') {
      inString = true;
    } else if (ch === '[') {
      depth++;
    } else if (ch === ']') {
      depth--;
      if (depth === 0) {
        end = i + 1;
        break;
      }
    }
  }
}
const json = html.slice(start + startMarker.length, end);
const data = JSON.parse(json);

function collectLeaves(groups, acc = new Map()) {
  for (const g of groups || []) {
    if (g.groups) {
      collectLeaves(g.groups, acc);
    } else if (g.gzipSize && g.path) {
      const m = g.path.match(/node_modules\/([^/]+(?:@[^/]+)?(?:\/[^/]+)?)/);
      let pkg = m ? m[1] : g.path;
      if (pkg.startsWith('@')) {
        const parts = pkg.split('/');
        pkg = parts.slice(0, 2).join('/');
      }
      acc.set(pkg, (acc.get(pkg) || 0) + g.gzipSize);
    }
  }
  return acc;
}

const vendor = data.find((d) => d.label && d.label.includes('vendor'));
if (!vendor) {
  console.error('vendor chunk not found');
  process.exit(1);
}
const sizes = collectLeaves(vendor.groups);
const sorted = [...sizes.entries()].sort((a, b) => b[1] - a[1]).slice(0, 40);
console.log('| Package | gzipSize |');
console.log('|---------|----------|');
for (const [pkg, size] of sorted) {
  console.log(`| ${pkg} | ${size.toLocaleString()} |`);
}
