module.exports = {
  ci: {
    collect: {
      startServerCommand: "npm run serve:test:ci",
      startServerReadyPattern: "Ready",
      startServerReadyTimeout: 30000,
      url: [
        "http://127.0.0.1:3100/",
        "http://127.0.0.1:3100/services",
        "http://127.0.0.1:3100/contact",
      ],
      // Three runs produce a real median. With two runs, LHCI may select a
      // cold-start outlier as the representative result on shared CI runners.
      numberOfRuns: 3,
      settings: {
        budgetPath: "./lighthouse-budget.json",
        onlyCategories: ["performance", "accessibility", "best-practices", "seo"],
      },
    },
    assert: {
      assertions: {
        "categories:performance": ["error", { minScore: 0.8, aggregationMethod: "median-run" }],
        "categories:accessibility": ["error", { minScore: 0.95, aggregationMethod: "median-run" }],
        "categories:best-practices": ["error", { minScore: 0.95, aggregationMethod: "median-run" }],
        "categories:seo": ["error", { minScore: 0.95, aggregationMethod: "median-run" }],
        "first-contentful-paint": ["error", { maxNumericValue: 3000, aggregationMethod: "median-run" }],
        "largest-contentful-paint": ["error", { maxNumericValue: 4000, aggregationMethod: "median-run" }],
        "cumulative-layout-shift": ["error", { maxNumericValue: 0.1, aggregationMethod: "median-run" }],
        "total-blocking-time": ["error", { maxNumericValue: 400, aggregationMethod: "median-run" }],
        "resource-summary:script:size": ["error", { maxNumericValue: 409600, aggregationMethod: "median-run" }],
        "resource-summary:total:size": ["error", { maxNumericValue: 1572864, aggregationMethod: "median-run" }],
        "performance-budget": "error",
      },
    },
    upload: {
      target: "filesystem",
      outputDir: "./lighthouse-report",
      reportFilenamePattern: "%%PATHNAME%%-%%DATETIME%%.report.%%EXTENSION%%",
    },
  },
};
