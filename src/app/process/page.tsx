import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ProcessTimeline } from "@/components/diagrams/ProcessTimeline";
import { CTASection } from "@/components/sections/CTASection";
import { processStages } from "@/data/process";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Process",
  description:
    "How an IZEYX engagement runs stage by stage, including what to expect, what we need from you, and how scope and progress are managed.",
  path: "/process",
});

const expectations = [
  {
    question: "What can I expect as a client?",
    answer:
      "A named point of contact, a written scope before work starts, and working software or pages to review at each stage, not a single reveal at the end.",
  },
  {
    question: "What information does IZEYX need from us?",
    answer:
      "Access to the people who run the process day to day, honest context on what's worked and what hasn't, and any existing documentation, however informal.",
  },
  {
    question: "How is scope controlled?",
    answer:
      "Scope is agreed in writing during the Define stage. Any change during Build or Integrate is discussed and agreed before it's built, not absorbed silently.",
  },
  {
    question: "How are decisions documented?",
    answer:
      "Key decisions and the reasoning behind them are written down as they're made, so there's a record independent of any one conversation.",
  },
  {
    question: "How is progress communicated?",
    answer:
      "Through working reviews at each stage rather than only status calls. You see the actual software or pages, not a description of them.",
  },
  {
    question: "How does a project move from uncertainty to implementation?",
    answer:
      "Discovery and diagnosis narrow an open-ended problem into a defined, scoped piece of work before any design or build begins. See stages one through three below.",
  },
];

export default function ProcessPage() {
  return (
    <>
      <Section tone="light" className="pb-12 md:pb-16">
        <SectionHeader
          as="h1"
          heading="A structured path from uncertainty to a working system."
          description="Eight stages, each with a defined outcome. We won't promise contractual terms that haven't been agreed with you directly. This page describes how the work is organised, not a binding legal commitment."
        />
      </Section>

      <Section tone="light" className="border-t border-border py-16 md:py-20">
        <ProcessTimeline stages={processStages} variant="detailed" />
      </Section>

      <Section tone="dark" aria-labelledby="expectations-heading">
        <SectionHeader
          headingId="expectations-heading"
          heading="Questions clients usually ask before starting"
        />
        <dl className="mt-12 flex flex-col border-t border-border">
          {expectations.map((item) => (
            <div key={item.question} className="grid gap-2 border-b border-border py-6 sm:grid-cols-12 sm:gap-8">
              <dt className="text-title text-foreground sm:col-span-4">{item.question}</dt>
              <dd className="text-muted sm:col-span-8">{item.answer}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <CTASection
        heading="See how this applies to your business"
        description="Book a discovery call and we'll walk through the first two stages together, at no cost to you."
      />
    </>
  );
}
