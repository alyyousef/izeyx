import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TextLink } from "@/components/ui/TextLink";
import { capabilities } from "@/data/capabilities";

export function CapabilityIndex() {
  return (
    <Section tone="light" aria-labelledby="capabilities-heading">
      <SectionHeader
        headingId="capabilities-heading"
        heading="Eight capabilities, one connected practice."
        description="Each expands into what it is, the problem it solves, and what a first engagement typically produces."
      />

      <ol className="mt-12 border-t border-border-strong">
        {capabilities.map((capability) => (
          <li key={capability.number} className="border-b border-border-strong">
            <details className="group">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-4 py-6 marker:content-none [&::-webkit-details-marker]:hidden">
                <span className="flex flex-1 items-baseline gap-4 sm:gap-8">
                  <span className="text-meta text-muted-soft">{capability.number}</span>
                  <span className="font-display text-xl font-medium tracking-tight text-foreground sm:text-2xl">
                    {capability.title}
                  </span>
                </span>
                <span
                  aria-hidden="true"
                  className="mt-1 shrink-0 text-xl text-muted-soft transition-transform duration-200 group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <div className="grid gap-6 pb-8 pl-0 sm:grid-cols-[3rem_1fr] sm:gap-8 sm:pl-0">
                <div className="hidden sm:block" aria-hidden="true" />
                <div className="flex flex-col gap-4">
                  <p className="max-w-2xl text-muted">{capability.problem}</p>
                  <ul className="flex flex-wrap gap-2">
                    {capability.deliverables.map((item) => (
                      <li
                        key={item}
                        className="rounded-sm border border-border px-3 py-1.5 text-sm text-foreground"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                  <TextLink href={capability.href} withArrow className="text-sm font-medium">
                    {capability.href === "/process" ? "See how support fits the process" : "View this service"}
                  </TextLink>
                </div>
              </div>
            </details>
          </li>
        ))}
      </ol>
    </Section>
  );
}
