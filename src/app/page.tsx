import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { ProblemRecognition } from "@/components/sections/ProblemRecognition";
import { TransformationStatement } from "@/components/sections/TransformationStatement";
import { CapabilityIndex } from "@/components/sections/CapabilityIndex";
import { OperatingSystem } from "@/components/sections/OperatingSystem";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { EngagementProcess } from "@/components/sections/EngagementProcess";
import { WhyIzeyx } from "@/components/sections/WhyIzeyx";
import { CtaSection } from "@/components/sections/CtaSection";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";
import { JsonLd } from "@/components/seo/JsonLd";
import { organizationSchema, websiteSchema } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: siteConfig.defaultTitle,
  description: siteConfig.defaultDescription,
  path: "/",
  absoluteTitle: true,
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProblemRecognition />
      <TransformationStatement />
      <CapabilityIndex />
      <OperatingSystem />
      <SelectedWork />
      <EngagementProcess />
      <WhyIzeyx />
      <CtaSection
        heading="What is slowing your business down?"
        description="Tell us where work is repetitive, disconnected, or difficult to manage. We will help you identify what should be improved, automated, integrated, or rebuilt."
        primaryLabel="Start a conversation"
        primaryHref="/contact"
      />
      <JsonLd id="organization-schema" data={organizationSchema()} />
      <JsonLd id="website-schema" data={websiteSchema()} />
    </>
  );
}
