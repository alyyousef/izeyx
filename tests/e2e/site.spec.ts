import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const smokeRoutes = [
  "/",
  "/services",
  "/services/automation",
  "/work",
  "/work/connected-business-transformation",
  "/process",
  "/about",
  "/insights",
  "/insights/is-this-process-worth-automating",
  "/contact",
  "/privacy",
  "/terms",
];

const responsiveViewports = [
  { name: "small phone", width: 320, height: 700 },
  { name: "phone", width: 390, height: 844 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "laptop", width: 1366, height: 768 },
  { name: "desktop", width: 1920, height: 1080 },
] as const;

for (const route of smokeRoutes) {
  test(`${route} renders successfully`, async ({ page }) => {
    const response = await page.goto(route);

    expect(response?.ok()).toBe(true);
    await expect(page.locator("h1")).toHaveCount(1);
  });
}

for (const route of ["/", "/services", "/contact"]) {
  test(`${route} has no automatically detectable accessibility violations`, async ({ page }) => {
    await page.goto(route);

    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations).toEqual([]);
  });
}

test("mobile navigation traps focus, closes with Escape, and restores focus", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  const opener = page.getByRole("button", { name: "Open menu" });
  await opener.focus();
  await opener.press("Enter");

  const dialog = page.getByRole("dialog", { name: "Site navigation" });
  const closeButton = page.getByRole("button", { name: "Close menu" });
  const firstLink = dialog.getByRole("link", { name: "IZEYX" });
  const finalLink = dialog.getByRole("link", { name: "Book a discovery call" });

  await expect(dialog).toBeVisible();
  await expect(closeButton).toBeFocused();

  await firstLink.focus();
  await firstLink.press("Shift+Tab");
  await expect(finalLink).toBeFocused();
  await finalLink.press("Tab");
  await expect(firstLink).toBeFocused();

  await firstLink.press("Escape");
  await expect(dialog).toBeHidden();
  await expect(opener).toBeFocused();
});

for (const viewport of responsiveViewports) {
  test(`${viewport.name} layouts have no horizontal page overflow`, async ({ page }) => {
    test.setTimeout(60_000);
    await page.setViewportSize({ width: viewport.width, height: viewport.height });

    for (const route of smokeRoutes) {
      const response = await page.goto(route);

      expect(response?.ok(), `${route} should load at ${viewport.width}px`).toBe(true);
      await expect(page.locator("main")).toBeVisible();
      await page.evaluate(() => document.fonts.ready);

      const dimensions = await page.evaluate(() => ({
        clientWidth: document.documentElement.clientWidth,
        scrollWidth: document.documentElement.scrollWidth,
      }));

      expect(
        dimensions.scrollWidth,
        `${route} overflows horizontally at ${viewport.width}px`
      ).toBeLessThanOrEqual(dimensions.clientWidth + 1);
    }
  });
}

test("navigation and system diagram switch at their intended breakpoints", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  await expect(page.getByRole("button", { name: "Open menu" })).toBeVisible();
  await expect(page.getByRole("navigation", { name: "Primary" })).toBeHidden();
  await expect(page.locator(".system-diagram-mobile")).toBeVisible();
  await expect(page.locator(".system-diagram-artwork")).toBeHidden();

  await page.setViewportSize({ width: 768, height: 1024 });

  await expect(page.getByRole("button", { name: "Open menu" })).toBeHidden();
  await expect(page.getByRole("navigation", { name: "Primary" })).toBeVisible();
  await expect(page.locator(".system-diagram-mobile")).toBeHidden();
  await expect(page.locator(".system-diagram-artwork")).toBeVisible();
});
