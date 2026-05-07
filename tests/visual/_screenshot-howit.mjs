import { chromium } from "@playwright/test";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
await page.goto("http://localhost:3001/", { waitUntil: "domcontentloaded" });
await page.waitForTimeout(2000);
await page.evaluate(() => {
  const el = document.querySelector("#how-it-works");
  if (el) el.scrollIntoView({ block: "start" });
});
await page.waitForTimeout(800);
await page.screenshot({ path: "/tmp/howit-mobile.png", fullPage: false });
await browser.close();
