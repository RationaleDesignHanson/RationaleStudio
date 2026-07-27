import fs from 'fs';
import path from 'path';

const root = '/Users/matthanson/Developer/rationale-public/app';
const files = [];
function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p);
    else if (/page\.(tsx|jsx)$/.test(p)) files.push(p);
  }
}
walk(root);

const hooks = ['useState', 'useEffect', 'useRef', 'useCallback', 'useMemo', 'useContext', 'useReducer', 'usePathname', 'useSearchParams', 'useRouter', 'useParams', 'useId'];
const browser = ['window', 'document', 'navigator', 'localStorage', 'sessionStorage'];

const candidates = [];
for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');
  if (!content.includes("'use client'") && !content.includes('"use client"')) continue;
  const foundHook = hooks.some((h) => content.includes(h));
  const foundBrowser = browser.some((b) => new RegExp(`\\b${b}\\b`).test(content));
  const dynamic = content.includes('next/dynamic') || /dynamic\s*\(/.test(content);
  const eventHandler = /on[A-Z][a-zA-Z]+=\{/.test(content);
  if (!foundHook && !foundBrowser && !dynamic && !eventHandler) {
    candidates.push(path.relative('/Users/matthanson/Developer/rationale-public', file));
  }
}

console.log('Candidate pages to remove "use client" directive:\n');
for (const f of candidates) console.log(`- ${f}`);
