import { chromium } from "@playwright/test";

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 }, deviceScaleFactor: 1 });
const page = await ctx.newPage();

// Don't wait on videos — they keep network busy forever.
await page.goto("http://localhost:3001/", { waitUntil: "domcontentloaded" });
// Let lazy images & layout settle
await page.waitForTimeout(3000);

// Hero only (above fold)
await page.screenshot({ path: "/tmp/marketing-hero.png", fullPage: false });

// Full page (long)
await page.setViewportSize({ width: 1280, height: 900 });
await page.screenshot({ path: "/tmp/marketing-full.png", fullPage: true });

// Sectional snapshots — scroll & screenshot
const sections = [
  { selector: "section:has(h2:text-matches('shoebox'))", name: "problem" },
  { selector: "section#how-it-works", name: "how-it-works" },
  { selector: "section:has(h3:text-matches('From any source'))", name: "feature-capture" },
  { selector: "section:has(h3:text-matches('Handwritten cards'))", name: "feature-scan" },
  { selector: "section:has(h3:text-matches('No public feed'))", name: "feature-private" },
  { selector: "section:has(h3:text-matches('Lineage on every'))", name: "feature-lineage" },
  { selector: "section:has(h3:text-matches('Private by default'))", name: "feature-own" },
];

for (const s of sections) {
  try {
    const el = await page.$(s.selector);
    if (el) {
      await el.scrollIntoViewIfNeeded();
      await page.waitForTimeout(500);
      await el.screenshot({ path: `/tmp/marketing-${s.name}.png` });
      console.log(`→ marketing-${s.name}.png`);
    } else {
      console.log(`  miss: ${s.selector}`);
    }
  } catch (e) {
    console.log(`  err ${s.name}: ${e.message}`);
  }
}

await browser.close();
