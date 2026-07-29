import { defineConfig, devices } from "@playwright/test";

const baseURL = "http://127.0.0.1:3100";

export default defineConfig({
  testDir: "./tests/e2e",
  snapshotPathTemplate: "{testDir}/__screenshots__/{arg}{ext}",
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: process.env.CI ? [["html", { open: "never" }], ["list"]] : "list",
  use: {
    baseURL,
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },
  expect: {
    toHaveScreenshot: {
      animations: "disabled",
      caret: "hide",
      // Keep the suite stable across Windows development and Linux CI font rasterization
      // while still catching visible layout, spacing, and component regressions.
      maxDiffPixelRatio: 0.05,
      scale: "css",
      threshold: 0.25,
    },
  },
  projects: [
    {
      name: "chromium",
      testMatch: ["**/site.spec.ts", "**/visual.spec.ts"],
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "firefox-smoke",
      testMatch: "**/cross-browser.spec.ts",
      use: { ...devices["Desktop Firefox"] },
    },
    {
      name: "webkit-iphone",
      testMatch: "**/cross-browser.spec.ts",
      use: { ...devices["iPhone 13"] },
    },
  ],
});
