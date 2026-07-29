import { describe, expect, it } from "vitest";
import sitemap from "@/app/sitemap";
import robots from "@/app/robots";
import {
  articleSchema,
  buildMetadata,
  organizationSchema,
  serializeJsonLd,
  serviceSchema,
  websiteSchema,
} from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

describe("SEO metadata", () => {
  it("supports an absolute homepage title without applying the layout template twice", () => {
    const metadata = buildMetadata({
      title: siteConfig.defaultTitle,
      description: siteConfig.defaultDescription,
      path: "/",
      absoluteTitle: true,
    });

    expect(metadata.title).toEqual({ absolute: siteConfig.defaultTitle });
    expect(metadata.alternates?.canonical).toBe(`${siteConfig.url}/`);
  });

  it("allows crawlers to follow links on pages that should not be indexed", () => {
    const metadata = buildMetadata({
      title: "Concept",
      description: "A concept page",
      path: "/work/concept",
      noIndex: true,
    });

    expect(metadata.robots).toEqual({ index: false, follow: true });
  });
});

describe("structured data", () => {
  it("connects the organization, website, article, and service entities", () => {
    const organization = organizationSchema();
    const website = websiteSchema();
    const article = articleSchema({
      title: "A useful article",
      description: "A useful description",
      path: "/insights/useful-article",
      datePublished: "2026-01-01",
      author: "IZEYX",
    });
    const service = serviceSchema({
      name: "Automation",
      description: "Connected automation systems",
      path: "/services/automation",
    });

    expect(organization["@id"]).toBe(`${siteConfig.url}/#organization`);
    expect(website.publisher["@id"]).toBe(organization["@id"]);
    expect(article.publisher["@id"]).toBe(organization["@id"]);
    expect(service.provider["@id"]).toBe(organization["@id"]);
    expect(article.mainEntityOfPage["@id"]).toBe(`${siteConfig.url}/insights/useful-article`);
  });

  it("escapes opening angle brackets before embedding JSON-LD in HTML", () => {
    expect(serializeJsonLd({ value: "</script>" })).toBe('{"value":"\\u003c/script>"}');
  });
});

describe("crawl directives", () => {
  it("does not block noindex pages in robots.txt", () => {
    expect(robots().rules).toEqual({ userAgent: "*", allow: "/" });
  });

  it("keeps conceptual case studies out of the sitemap", () => {
    const urls = sitemap().map((entry) => entry.url);

    expect(urls.some((url) => url.includes("/work/connected-business-transformation"))).toBe(false);
    expect(urls.some((url) => url.includes("/services/automation"))).toBe(true);
    expect(urls.some((url) => url.includes("/insights/is-this-process-worth-automating"))).toBe(true);
  });
});
