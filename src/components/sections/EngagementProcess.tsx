import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TextLink } from "@/components/ui/TextLink";
import { ProcessTimeline } from "@/components/diagrams/ProcessTimeline";
import { processStages } from "@/data/process";

export function EngagementProcess() {
  return (
    <Section tone="light" aria-labelledby="process-heading">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <SectionHeader
          headingId="process-heading"
          heading="Eight stages, from first conversation to continuing support."
          description="Each stage has a defined outcome, so you always know what happens next and what it depends on."
        />
        <TextLink href="/process" withArrow className="shrink-0 text-sm font-medium">
          See the full process
        </TextLink>
      </div>

      <ProcessTimeline stages={processStages} variant="compact" className="mt-12" />
    </Section>
  );
}
