import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import { services } from "@/data/services";
import { getPublishedCaseStudies } from "@/data/work";
import { insightArticles } from "@/data/insights";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${siteConfig.url}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${siteConfig.url}/services`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${siteConfig.url}/work`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteConfig.url}/process`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteConfig.url}/about`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${siteConfig.url}/insights`, changeFrequency: "weekly", priority: 0.6 },
    { url: `${siteConfig.url}/contact`, changeFrequency: "yearly", priority: 0.8 },
  ];

  const serviceRoutes: MetadataRoute.Sitemap = services.map((service) => ({
    url: `${siteConfig.url}/services/${service.slug}`,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const workRoutes: MetadataRoute.Sitemap = getPublishedCaseStudies().map((caseStudy) => ({
    url: `${siteConfig.url}/work/${caseStudy.slug}`,
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  const insightRoutes: MetadataRoute.Sitemap = insightArticles.map((article) => ({
    url: `${siteConfig.url}/insights/${article.slug}`,
    lastModified: article.publicationDate,
    changeFrequency: "yearly",
    priority: 0.5,
  }));

  return [...staticRoutes, ...serviceRoutes, ...workRoutes, ...insightRoutes];
}
