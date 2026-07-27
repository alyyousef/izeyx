import { describe, expect, it } from "vitest";
import { capabilities } from "@/data/capabilities";
import { insightArticles } from "@/data/insights";
import { integrationsDiagram, serviceDiagrams } from "@/data/service-diagrams";
import { services } from "@/data/services";
import { caseStudies } from "@/data/work";
import { footerNav } from "@/lib/site-config";
import { serviceSlugToInterest } from "@/lib/contact-form";
import { resolveSiteUrl } from "@/lib/site-url";

function expectUnique(values: string[]) {
  expect(new Set(values).size).toBe(values.length);
}

describe("static content relationships", () => {
  const serviceSlugs = services.map((service) => service.slug);
  const serviceSlugSet = new Set(serviceSlugs);

  it("keeps service routes unique and every cross-reference resolvable", () => {
    expectUnique(serviceSlugs);

    for (const service of services) {
      expect(service.relatedServiceSlugs).not.toContain(service.slug);
      service.relatedServiceSlugs.forEach((slug) => expect(serviceSlugSet.has(slug)).toBe(true));
    }
  });

  it("keeps diagrams, contact preselection, and service navigation aligned", () => {
    expect(Object.keys(serviceDiagrams).sort()).toEqual(
      serviceSlugs.filter((slug) => slug !== "integrations").sort()
    );
    expect(integrationsDiagram.inputs.length).toBeGreaterThan(0);
    expect(integrationsDiagram.outputs.length).toBeGreaterThan(0);
    expect(Object.keys(serviceSlugToInterest).sort()).toEqual([...serviceSlugs].sort());

    const serviceLinks = [
      ...capabilities.map((capability) => capability.href),
      ...footerNav.services.map((item) => item.href),
    ].filter((href) => href.startsWith("/services/"));

    serviceLinks.forEach((href) => expect(serviceSlugSet.has(href.replace("/services/", ""))).toBe(true));
  });

  it("keeps case studies linked to real services", () => {
    expectUnique(caseStudies.map((study) => study.slug));
    caseStudies.forEach((study) => {
      study.servicesInvolved.forEach((slug) => expect(serviceSlugSet.has(slug)).toBe(true));
    });
  });

  it("keeps insight links and table-of-contents anchors valid", () => {
    const insightSlugs = insightArticles.map((article) => article.slug);
    const insightSlugSet = new Set(insightSlugs);
    expectUnique(insightSlugs);

    for (const article of insightArticles) {
      const contentIds = new Set(
        article.content.flatMap((section) => ("id" in section && section.id ? [section.id] : []))
      );
      article.relatedSlugs.forEach((slug) => expect(insightSlugSet.has(slug)).toBe(true));
      article.tableOfContents.forEach((item) => expect(contentIds.has(item.id)).toBe(true));
    }
  });
});

describe("site URL configuration", () => {
  it("normalises an optional trailing slash", () => {
    expect(resolveSiteUrl("https://izeyx.com/", true)).toBe("https://izeyx.com");
  });

  it("rejects missing, local, insecure, or path-based production origins", () => {
    expect(() => resolveSiteUrl(undefined, true)).toThrow(/must be set/);
    expect(() => resolveSiteUrl("http://localhost:3000", true)).toThrow(/public HTTPS/);
    expect(() => resolveSiteUrl("http://izeyx.com", true)).toThrow(/public HTTPS/);
    expect(() => resolveSiteUrl("https://izeyx.com/site", true)).toThrow(/only the site origin/);
  });
});
