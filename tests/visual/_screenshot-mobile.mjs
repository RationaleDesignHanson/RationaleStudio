import { chromium } from "@playwright/test";
const browser = await chromium.launch();

// Mobile portrait
const mobilePage = await browser.newPage({ viewport: { width: 390, height: 844 } });
await mobilePage.goto("http://localhost:3001/", { waitUntil: "domcontentloaded" });
await mobilePage.waitForTimeout(2000);
// Scroll to problem section
await mobilePage.evaluate(() => {
  const h2 = [...document.querySelectorAll("h2")].find(h => h.textContent?.includes("shoebox"));
  if (h2) h2.scrollIntoView({ block: "center" });
});
await mobilePage.waitForTimeout(800);
await mobilePage.screenshot({ path: "/tmp/problem-mobile.png", fullPage: false });

// Desktop
const deskPage = await browser.newPage({ viewport: { width: 1280, height: 900 } });
await deskPage.goto("http://localhost:3001/", { waitUntil: "domcontentloaded" });
await deskPage.waitForTimeout(2000);
await deskPage.evaluate(() => {
  const h2 = [...document.querySelectorAll("h2")].find(h => h.textContent?.includes("shoebox"));
  if (h2) h2.scrollIntoView({ block: "center" });
});
await deskPage.waitForTimeout(800);
await deskPage.screenshot({ path: "/tmp/problem-desktop.png", fullPage: false });

await browser.close();
