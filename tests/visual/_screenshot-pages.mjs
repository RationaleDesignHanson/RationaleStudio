import { chromium } from "@playwright/test";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 1600 } });

const pages = [
  { name: "homepage-hero", url: "http://localhost:3001/", scrollTo: 0 },
  { name: "family-recipe-app", url: "http://localhost:3001/family-recipe-app", scrollTo: 0 },
  { name: "heritage-cookbook", url: "http://localhost:3001/heritage-cookbook", scrollTo: 0 },
  { name: "preserve-handwritten", url: "http://localhost:3001/preserve-handwritten-recipes", scrollTo: 0 },
];

for (const p of pages) {
  console.log(`→ ${p.name}`);
  try {
    await page.goto(p.url, { waitUntil: "domcontentloaded", timeout: 20000 });
    await page.waitForTimeout(2500);
    await page.screenshot({ path: `/tmp/page-${p.name}.png`, fullPage: true });
    console.log(`  → /tmp/page-${p.name}.png`);
  } catch (e) {
    console.log(`  err: ${e.message}`);
  }
}

await browser.close();
