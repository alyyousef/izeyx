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
