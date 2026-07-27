import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { WorkGridCard } from "@/components/sections/WorkGridCard";
import { CTASection } from "@/components/sections/CTASection";
import { getPublishedCaseStudies } from "@/data/work";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Work",
  description:
    "Explore transformation concepts showing how IZEYX approaches connected systems, custom software, automation, and digital growth.",
  path: "/work",
});

export default function WorkPage() {
  const caseStudies = getPublishedCaseStudies();

  return (
    <>
      <Section tone="light" className="pb-12 md:pb-16">
        <SectionHeader
          as="h1"
          heading="Your next success story could start here."
          description="Explore how focused strategy, connected technology, and thoughtful delivery can turn common operational challenges into stronger, more scalable ways of working."
        />
      </Section>

      <Section tone="light" className="border-t border-border pt-16 pb-20 md:pt-20 md:pb-28">
        <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2">
          {caseStudies.map((caseStudy) => (
            <WorkGridCard key={caseStudy.slug} caseStudy={caseStudy} />
          ))}
        </div>
      </Section>

      <CTASection
        heading="Let's talk about what you're trying to solve."
        description="Book a discovery call and we'll tell you honestly whether this is a fit and, if so, how."
      />
    </>
  );
}
