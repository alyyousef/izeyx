import type { Metadata } from "next";
import { siteConfig } from "./site-config";

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
  image?: string;
  noIndex?: boolean;
  absoluteTitle?: boolean;
};

function absoluteUrl(path: string) {
  return new URL(path, `${siteConfig.url}/`).toString();
}

export function buildMetadata({
  title,
  description,
  path,
  image = "/opengraph-image",
  noIndex = false,
  absoluteTitle = false,
}: PageMetadataInput): Metadata {
  const url = absoluteUrl(path);

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: {
      canonical: url,
    },
    robots: noIndex
      ? { index: false, follow: true }
      : { index: true, follow: true },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type: "website",
      images: [{ url: image, width: 1200, height: 630, alt: `${siteConfig.name}: ${title}` }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export function organizationSchema() {
  const organizationId = `${siteConfig.url}/#organization`;
  const logoUrl = absoluteUrl("/images/brand/izeyx-logo-blue.png");

  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": organizationId,
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: siteConfig.url,
    logo: {
      "@type": "ImageObject",
      url: logoUrl,
      width: 512,
      height: 512,
    },
    image: logoUrl,
    description: siteConfig.defaultDescription,
    email: siteConfig.contact.email.value,
    telephone: siteConfig.contact.phone.href.replace("tel:", ""),
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      email: siteConfig.contact.email.value,
      telephone: siteConfig.contact.phone.href.replace("tel:", ""),
      availableLanguage: ["English"],
    },
    areaServed: ["EG", "Middle East"],
    address: {
      "@type": "PostalAddress",
      addressLocality: "New Cairo",
      addressRegion: "Cairo",
      addressCountry: "EG",
    },
    sameAs: [siteConfig.social.linkedin.value, siteConfig.social.twitter.value],
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    url: `${siteConfig.url}/`,
    name: siteConfig.name,
    alternateName: "IZEYX Digital Transformation",
    description: siteConfig.defaultDescription,
    inLanguage: "en",
    publisher: {
      "@id": `${siteConfig.url}/#organization`,
    },
  };
}

export function articleSchema(input: {
  title: string;
  description: string;
  path: string;
  datePublished: string;
  author: string;
}) {
  const url = absoluteUrl(input.path);

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${url}#article`,
    headline: input.title,
    description: input.description,
    url,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    image: [absoluteUrl("/opengraph-image")],
    datePublished: input.datePublished,
    author: {
      "@type": "Organization",
      name: input.author,
      url: absoluteUrl("/about"),
    },
    publisher: {
      "@id": `${siteConfig.url}/#organization`,
    },
  };
}

export function serviceSchema(input: {
  name: string;
  description: string;
  path: string;
}) {
  const url = absoluteUrl(input.path);

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#service`,
    name: input.name,
    description: input.description,
    url,
    provider: {
      "@id": `${siteConfig.url}/#organization`,
    },
    areaServed: ["EG", "Middle East"],
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function serializeJsonLd(value: unknown) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}
