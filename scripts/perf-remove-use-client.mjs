import fs from 'fs';
import path from 'path';

const root = '/Users/matthanson/Developer/rationale-public';
const files = [
  'app/(public)/about/page.tsx',
  'app/(public)/contact/page.tsx',
  'app/(public)/writing/page.tsx',
  'app/(public)/hero-lab/page.tsx',
  'app/(public)/heirloom/support/page.tsx',
  'app/(public)/work/fair-embodied-ai/page.tsx',
  'app/(public)/work/heirloom/evolution/page.tsx',
  'app/(public)/work/orion/page.tsx',
  'app/(public)/work/silly-questions/page.tsx',
  'app/(public)/work/spark-ar/page.tsx',
  'app/(public)/work/studio-era/page.tsx',
  'app/(public)/work/viacom/page.tsx',
];

for (const file of files) {
  const p = path.join(root, file);
  let content = fs.readFileSync(p, 'utf8');
  const original = content;
  content = content.replace(/^['"]use client['"];\n?/m, '');
  if (content === original) {
    console.log(`No change: ${file}`);
  } else {
    fs.writeFileSync(p, content);
    console.log(`Removed directive: ${file}`);
  }
}
