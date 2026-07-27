import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { CtaSection } from "@/components/sections/CtaSection";
import { ServiceRow } from "@/components/sections/ServiceRow";
import { services } from "@/data/services";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Services",
  description:
    "Websites, custom software, automation, AI solutions, systems integration, data and analytics, and digital transformation consulting, presented by the business need they solve.",
  path: "/services",
});

const organisingQuestions = [
  { question: "Do you need a stronger customer-facing digital presence?", href: "/services/websites-digital-experiences" },
  { question: "Do you need software tailored to your operation?", href: "/services/custom-software" },
  { question: "Are employees repeating manual tasks?", href: "/services/automation" },
  { question: "Are you exploring practical AI use cases?", href: "/services/ai-solutions" },
  { question: "Are your systems disconnected?", href: "/services/integrations" },
  { question: "Do you need clearer operational information?", href: "/services/data-analytics" },
  { question: "Do you need a technology roadmap?", href: "/services/digital-transformation-consulting" },
];

export default function ServicesPage() {
  return (
    <>
      <Section tone="light" className="pb-12 md:pb-16">
        <SectionHeader
          as="h1"
          heading="Seven capabilities that work as one transformation programme."
          description="Most engagements combine more than one of these, such as a website connected to a CRM, an automation tied to a new integration, or a roadmap that leads into a build. Start wherever the problem is most visible; we'll help place it in the wider picture."
        />
      </Section>

      <Section tone="light" className="border-t border-border pt-16 pb-16 md:pt-20 md:pb-20">
        <p className="label text-muted-soft">Where to start</p>
        <h2 className="text-subheading mt-3 text-foreground">A few questions to help identify the right entry point</h2>
        <ul className="mt-8 grid gap-x-8 gap-y-6 sm:grid-cols-2">
          {organisingQuestions.map((item) => (
            <li key={item.question}>
              <Link href={item.href} className="group flex items-start justify-between gap-4 border-b border-border pb-4">
                <span className="text-lg text-foreground group-hover:text-primary-text">{item.question}</span>
                <span aria-hidden="true" className="mt-1 shrink-0 text-muted-soft group-hover:text-primary-text">
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="light" className="border-t border-border pt-4 pb-20 md:pb-28">
        <ul>
          {services.map((service, index) => (
            <ServiceRow key={service.slug} service={service} index={index} />
          ))}
        </ul>
      </Section>

      <CtaSection
        heading="Tell us what's slowing the business down, and we'll place it on the map."
        description="A discovery call is a conversation, not a sales pitch. We'll help identify which services actually apply before recommending anything."
      />
    </>
  );
}
