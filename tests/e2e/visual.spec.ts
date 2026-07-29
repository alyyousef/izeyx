import path from "node:path";
import { expect, test } from "@playwright/test";

const screenshotStyles = path.join(__dirname, "visual-snapshot.css");

test.beforeEach(async ({ page }) => {
  await page.setViewportSize({ width: 1366, height: 900 });
  await page.emulateMedia({ reducedMotion: "reduce" });
});

test("desktop header visual", async ({ page }) => {
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);

  await expect(page.locator("header")).toHaveScreenshot("header-desktop.png", {
    stylePath: screenshotStyles,
  });
});

test("homepage hero and system diagram visuals", async ({ page }) => {
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);

  await expect(page.locator("main > section").first()).toHaveScreenshot("home-hero-desktop.png", {
    stylePath: screenshotStyles,
  });
  await expect(page.locator(".system-diagram")).toHaveScreenshot("system-diagram-desktop.png", {
    stylePath: screenshotStyles,
  });
});

test("connected operating-system section visual", async ({ page }) => {
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
  await page.locator("header").evaluate((element) => element.remove());

  await expect(page.locator('section[aria-labelledby="operating-system-heading"]')).toHaveScreenshot(
    "operating-system-desktop.png",
    { stylePath: screenshotStyles }
  );
});

test("mobile contact form visual", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/contact");
  await page.evaluate(() => document.fonts.ready);
  await page.locator("header").evaluate((element) => element.remove());

  await expect(page.locator("form")).toHaveScreenshot("contact-form-mobile.png", {
    stylePath: screenshotStyles,
  });
});
