import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";

const shifts = [
  { before: "Manual", after: "Automated" },
  { before: "Fragmented", after: "Connected" },
  { before: "Reactive", after: "Visible" },
  { before: "Generic", after: "Purpose-built" },
  { before: "Repetitive", after: "Scalable" },
  { before: "Tool accumulation", after: "One intentional system" },
];

export function TransformationStatement() {
  return (
    <Section tone="light" aria-labelledby="transformation-heading">
      <SectionHeader
        headingId="transformation-heading"
        heading="From fragmented operations to connected systems."
        description="This is the shift every engagement works toward, not a promised outcome with invented numbers attached to it."
      />

      <dl className="mt-12 flex flex-col border-t border-border">
        {shifts.map((shift) => (
          <div
            key={shift.before}
            className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 border-b border-border py-5 sm:gap-8"
          >
            <dt className="text-right font-display text-lg tracking-tight text-muted-soft sm:text-xl">
              {shift.before}
            </dt>
            <span aria-hidden="true" className="text-muted-soft">
              →
            </span>
            <dd className="text-left font-display text-lg font-medium tracking-tight text-foreground sm:text-xl">
              {shift.after}
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
