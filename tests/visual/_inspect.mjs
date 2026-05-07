import { chromium } from "@playwright/test";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
await page.goto("http://localhost:3001/", { waitUntil: "domcontentloaded" });
await page.waitForTimeout(2000);
const result = await page.evaluate(() => {
  const h2 = [...document.querySelectorAll("h2")].find(h => h.textContent?.includes("shoebox"));
  if (!h2) return null;
  const cs = getComputedStyle(h2);
  const rect = h2.getBoundingClientRect();
  return {
    classes: h2.className,
    whiteSpace: cs.whiteSpace,
    fontSize: cs.fontSize,
    maxWidth: cs.maxWidth,
    width: rect.width,
    height: rect.height,
    text: h2.textContent,
  };
});
console.log(JSON.stringify(result, null, 2));
await browser.close();
