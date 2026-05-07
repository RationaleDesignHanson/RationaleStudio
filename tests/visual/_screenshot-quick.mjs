import { chromium } from "@playwright/test";

const TARGETS = [
  { url: "http://localhost:3001/", out: "marketing-home", fullPage: true },
  { url: "http://localhost:3001/opengraph-image", out: "marketing-og", fullPage: false, viewport: { width: 1200, height: 630 } },
  { url: "http://localhost:3000/work/heirloom", out: "personal-heirloom", fullPage: true },
  { url: "http://localhost:3000/work/heirloom/evolution", out: "personal-heirloom-evolution", fullPage: true },
];

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 }, deviceScaleFactor: 1 });
const page = await ctx.newPage();

for (const t of TARGETS) {
  console.log(`→ ${t.url}`);
  if (t.viewport) await page.setViewportSize(t.viewport);
  else await page.setViewportSize({ width: 1280, height: 900 });
  try {
    await page.goto(t.url, { waitUntil: "networkidle", timeout: 30000 });
  } catch (e) {
    console.log(`  load error: ${e.message}`);
  }
  await page.waitForTimeout(1500); // let videos start, fonts settle
  await page.screenshot({ path: `/tmp/${t.out}.png`, fullPage: t.fullPage });
  console.log(`  → /tmp/${t.out}.png`);
}

await browser.close();
