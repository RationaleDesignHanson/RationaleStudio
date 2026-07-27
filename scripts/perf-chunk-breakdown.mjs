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
    else if (g.gzipSize && g.label) acc.push({ label: g.label, gzipSize: g.gzipSize });
  }
  return acc;
}

console.log('| Chunk | gzipSize | Top modules |');
console.log('|-------|----------|-------------|');
for (const chunk of data.filter((d) => d.isAsset).sort((a, b) => (b.gzipSize || 0) - (a.gzipSize || 0)).slice(0, 20)) {
  const leaves = collectLeaves(chunk.groups).sort((a, b) => b.gzipSize - a.gzipSize).slice(0, 4);
  const top = leaves.map((l) => `${l.label} (${l.gzipSize})`).join(', ');
  console.log(`| ${chunk.label} | ${(chunk.gzipSize || 0).toLocaleString()} | ${top.slice(0, 120)} |`);
}
