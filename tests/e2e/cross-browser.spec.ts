import { expect, test } from "@playwright/test";

const smokeRoutes = ["/", "/services/automation", "/work", "/contact"];

for (const route of smokeRoutes) {
  test(`${route} renders without overflow`, async ({ page }) => {
    const response = await page.goto(route);

    expect(response?.ok()).toBe(true);
    await expect(page.locator("h1")).toHaveCount(1);
    await page.evaluate(() => document.fonts.ready);

    const dimensions = await page.evaluate(() => ({
      clientWidth: document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth,
    }));

    expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.clientWidth + 1);
  });
}

test("primary navigation works in the active browser layout", async ({ page }, testInfo) => {
  await page.goto("/");

  if (testInfo.project.name === "webkit-iphone") {
    const opener = page.getByRole("button", { name: "Open menu" });
    await expect(opener).toBeVisible();
    await opener.click();

    const dialog = page.getByRole("dialog", { name: "Site navigation" });
    await expect(dialog).toBeVisible();
    await dialog.getByRole("link", { name: "Services", exact: true }).click();
  } else {
    const navigation = page.getByRole("navigation", { name: "Primary" });
    await expect(navigation).toBeVisible();
    await navigation.getByRole("link", { name: "Services", exact: true }).click();
  }

  await expect(page).toHaveURL(/\/services$/);
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
});

test("iPhone WebKit exposes the text system summary and usable contact controls", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "webkit-iphone", "iPhone-specific WebKit coverage");

  await page.goto("/");
  await expect(page.locator(".system-diagram-summary")).toBeVisible();
  await expect(page.locator(".system-diagram-artwork")).toBeHidden();

  await page.goto("/contact");
  await expect(page.getByLabel("Full name")).toBeVisible();
  await expect(page.getByRole("button", { name: "Send enquiry" })).toBeVisible();
});
