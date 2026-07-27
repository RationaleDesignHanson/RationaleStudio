import fs from 'fs';
import path from 'path';

const root = '/Users/matthanson/Developer/rationale-public';
const dirs = [
  'app',
  'components',
  'hooks',
  'lib',
];

const clientFiles = [];
for (const dir of dirs) {
  const full = path.join(root, dir);
  if (!fs.existsSync(full)) continue;
  for (const file of walk(full)) {
    if (!/\.(tsx?|jsx?)$/.test(file)) continue;
    const content = fs.readFileSync(file, 'utf8');
    if (content.includes("'use client'") || content.includes('"use client"')) {
      clientFiles.push(path.relative(root, file));
    }
  }
}

function walk(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(p));
    else out.push(p);
  }
  return out;
}

const hooks = ['useState', 'useEffect', 'useRef', 'useCallback', 'useMemo', 'useContext', 'useReducer', 'usePathname', 'useSearchParams', 'useRouter', 'useParams'];
const browser = ['window', 'document', 'navigator', 'localStorage', 'sessionStorage', 'fetch'];

function analyze(file) {
  const content = fs.readFileSync(path.join(root, file), 'utf8');
  const lines = content.split('\n').slice(0, 40);
  const firstImports = lines
    .filter((l) => /^\s*import /.test(l))
    .slice(0, 5)
    .map((l) => l.trim());
  const foundHooks = hooks.filter((h) => content.includes(h));
  const foundBrowser = browser.filter((b) => content.includes(b));
  const dynamic = content.includes('dynamic(') || content.includes('next/dynamic');
  const reason = [];
  if (foundHooks.length) reason.push(`hooks: ${foundHooks.slice(0, 4).join(', ')}`);
  if (foundBrowser.length) reason.push(`browser APIs: ${foundBrowser.slice(0, 3).join(', ')}`);
  if (dynamic) reason.push('dynamic import');
  if (!reason.length) reason.push('client-only component');
  return { firstImports, reason: reason.join('; ') };
}

const groups = {};
for (const file of clientFiles.sort()) {
  const group = file.split('/')[0];
  if (!groups[group]) groups[group] = [];
  const { reason, firstImports } = analyze(file);
  groups[group].push({ file, reason, firstImports });
}

console.log('# `\'use client\'` Inventory\n');
for (const [group, files] of Object.entries(groups)) {
  console.log(`## ${group} (${files.length})\n`);
  console.log('| File | Reason | Top imports |');
  console.log('|------|--------|-------------|');
  for (const { file, reason, firstImports } of files) {
    const imports = firstImports.join(' ').replace(/\|/g, '\\|').slice(0, 80);
    console.log(`| ${file} | ${reason} | ${imports} |`);
  }
  console.log('');
}
