import fs from 'fs';

const html = fs.readFileSync('/Users/matthanson/Developer/rationale-public/.next/analyze/client.html', 'utf8');
const startMarker = 'window.chartData = ';
const start = html.indexOf(startMarker);
let i = start + startMarker.length;
let depth = 0;
let inString = false;
let escaped = false;
let end = i;
for (; i < html.length; i++) {
  const ch = html[i];
  if (inString) {
    if (escaped) escaped = false;
    else if (ch === '\\') escaped = true;
    else if (ch === '"') inString = false;
  } else {
    if (ch === '"') inString = true;
    else if (ch === '[') depth++;
    else if (ch === ']') {
      depth--;
      if (depth === 0) {
        end = i + 1;
        break;
      }
    }
  }
}
const data = JSON.parse(html.slice(start + startMarker.length, end));

function collectLeaves(groups, acc = []) {
  for (const g of groups || []) {
    if (g.groups) collectLeaves(g.groups, acc);
    else if (g.gzipSize && g.path) acc.push({ label: g.label, path: g.path, gzipSize: g.gzipSize });
  }
  return acc;
}

const common = data.find((d) => d.label && d.label.includes('common'));
if (!common) {
  console.error('common chunk not found');
  process.exit(1);
}
const leaves = collectLeaves(common.groups).sort((a, b) => b.gzipSize - a.gzipSize).slice(0, 40);
console.log('| Module | gzipSize |');
console.log('|--------|----------|');
for (const m of leaves) {
  console.log(`| ${m.label} | ${m.gzipSize.toLocaleString()} |`);
}
