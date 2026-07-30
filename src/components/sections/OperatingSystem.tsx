import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";

const layers = [
  {
    label: "Customer experience",
    detail: "The website, portal, or storefront a customer actually meets.",
  },
  {
    label: "Internal operations",
    detail: "The workflows, approvals, and tools your team runs the business on.",
  },
  { label: "Data", detail: "One reliable, current picture of customers, jobs, and performance." },
  { label: "Integrations", detail: "The connections that keep every system working from the same information." },
  { label: "Automation", detail: "The repetitive steps removed from manual, error-prone hand-offs." },
  { label: "Infrastructure", detail: "Hosting, security, and performance that stay out of everyone's way." },
  { label: "Continuing support", detail: "Maintenance and improvement after launch, not a one-time handover." },
];

export function OperatingSystem() {
  return (
    <Section tone="dark" aria-labelledby="operating-system-heading">
      <SectionHeader
        headingId="operating-system-heading"
        heading="Technology works better when the pieces work together."
        description="A website, a CRM, and an automation script bought separately rarely add up to an operating model. We design each layer to work with the others from the start."
      />

      <div className="mt-14 flex flex-col">
        {layers.map((layer, index) => (
          <div
            key={layer.label}
            className="border-t border-border py-5 last:border-b sm:grid sm:grid-cols-[1.5rem_14rem_1fr] sm:gap-8"
          >
            <span aria-hidden="true" className="relative hidden justify-center sm:flex">
              <span className="h-2 w-2 rounded-full bg-primary" />
              {index < layers.length - 1 ? (
                <span className="absolute top-2 left-1/2 h-[calc(100%+1.25rem)] w-px -translate-x-1/2 bg-border" />
              ) : null}
            </span>
            <p className="text-title text-foreground">{layer.label}</p>
            <p className="mt-2 max-w-xl text-muted sm:mt-0">{layer.detail}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
