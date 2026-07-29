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

const indexableRoutes = smokeRoutes.filter(
  (route) => !["/privacy", "/terms", "/work/connected-business-transformation"].includes(route)
);

for (const route of smokeRoutes) {
  test(`${route} renders successfully`, async ({ page }) => {
    const response = await page.goto(route);

    expect(response?.ok()).toBe(true);
    await expect(page.locator("h1")).toHaveCount(1);
  });
}

for (const route of indexableRoutes) {
  test(`${route} exposes complete indexable metadata`, async ({ page }) => {
    await page.goto(route);

    const expectedCanonical = `https://www.izeyx.com${route === "/" ? "" : route}`;
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", expectedCanonical);
    const description = await page.locator('meta[name="description"]').getAttribute("content");
    expect(description?.trim().length).toBeGreaterThanOrEqual(50);
    await expect(page.locator('meta[name="robots"]')).not.toHaveAttribute("content", /noindex/i);

    const title = await page.title();
    expect(title).not.toMatch(/\| IZEYX \| IZEYX$/);
  });
}

test("concept work and legal pages are noindex but remain crawlable", async ({ page, request }) => {
  for (const route of ["/work/connected-business-transformation", "/privacy", "/terms"]) {
    await page.goto(route);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex, follow/i);
  }

  const robotsResponse = await request.get("/robots.txt");
  const robotsText = await robotsResponse.text();
  expect(robotsResponse.ok()).toBe(true);
  expect(robotsText).not.toContain("Disallow: /privacy");
  expect(robotsText).not.toContain("Disallow: /terms");
});

test("sitemap uses the canonical host and excludes conceptual work", async ({ request }) => {
  const response = await request.get("/sitemap.xml");
  const body = await response.text();

  expect(response.ok()).toBe(true);
  expect(body).toContain("https://www.izeyx.com/services/automation");
  expect(body).not.toContain("https://izeyx.com/");
  expect(body).not.toContain("/work/connected-business-transformation");
});

test("home and detail pages expose connected structured data", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("#organization-schema")).toHaveCount(1);
  await expect(page.locator("#website-schema")).toHaveCount(1);

  await page.goto("/services/automation");
  await expect(page.locator("#service-schema")).toHaveCount(1);
  await expect(page.locator("#breadcrumb-schema")).toHaveCount(1);

  await page.goto("/insights/is-this-process-worth-automating");
  const article = JSON.parse(await page.locator("#article-schema").textContent() ?? "{}");
  expect(article["@type"]).toBe("Article");
  expect(article.image).toHaveLength(1);
  expect(article.mainEntityOfPage["@id"]).toContain("/insights/is-this-process-worth-automating");
});

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

  // Tablet width: the system diagram's own container is already well past its
  // 30rem switch point, so it shows full desktop artwork here. The primary
  // nav + CTA button need more room than 768px offers without cramming
  // together or wrapping (verified: the CTA button wraps to two lines below
  // ~900px), so the header keeps the mobile menu through the tablet range.
  await page.setViewportSize({ width: 768, height: 1024 });

  await expect(page.getByRole("button", { name: "Open menu" })).toBeVisible();
  await expect(page.getByRole("navigation", { name: "Primary" })).toBeHidden();
  await expect(page.locator(".system-diagram-mobile")).toBeHidden();
  await expect(page.locator(".system-diagram-artwork")).toBeVisible();

  await page.setViewportSize({ width: 1024, height: 900 });

  await expect(page.getByRole("button", { name: "Open menu" })).toBeHidden();
  await expect(page.getByRole("navigation", { name: "Primary" })).toBeVisible();
});
