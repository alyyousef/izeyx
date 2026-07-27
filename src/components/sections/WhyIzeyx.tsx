import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";

const reasons = [
  {
    title: "Business problem first",
    detail: "Every engagement starts with what's actually slowing the business down, not a preferred piece of technology.",
  },
  {
    title: "Practical technology decisions",
    detail: "We recommend the tool that fits, whether bought or built, rather than defaulting to the most technically interesting option.",
  },
  {
    title: "Integrated, not fragmented",
    detail: "A new system is designed to connect to what you already run, not to become one more disconnected tool.",
  },
  {
    title: "Custom work where it's justified",
    detail: "We build bespoke software when it earns its cost, and say so plainly when it doesn't.",
  },
  {
    title: "Clear communication",
    detail: "Scope, decisions, and progress are documented in plain language, not buried in technical status reports.",
  },
  {
    title: "Long-term maintainability",
    detail: "Systems are built to be understood and extended later by us or by an internal team.",
  },
  {
    title: "Design and engineering together",
    detail: "Visual design and technical architecture are worked out at the same time, not handed off in sequence.",
  },
  {
    title: "Automation tied to real need",
    detail: "We automate what's measurably repetitive or costly, not everything that technically could be automated.",
  },
];

export function WhyIzeyx() {
  return (
    <Section tone="light" aria-labelledby="why-izeyx-heading">
      <SectionHeader
        headingId="why-izeyx-heading"
        heading="A technology partner that starts with your operations, not our services."
      />

      <div className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2">
        {reasons.map((reason) => (
          <div key={reason.title} className="border-t border-border pt-5">
            <h3 className="text-title text-foreground">{reason.title}</h3>
            <p className="mt-2 text-muted">{reason.detail}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
