import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { TextLink } from "@/components/ui/TextLink";
import { SystemDiagram } from "@/components/diagrams/SystemDiagram";
import { ctaCopy } from "@/lib/site-config";

const heroInputs = [
  { label: "Website" },
  { label: "CRM" },
  { label: "Spreadsheets" },
  { label: "Support" },
  { label: "Calls" },
];

const heroOutputs = [{ label: "Automation" }, { label: "AI assistant" }, { label: "Data" }];

export function Hero() {
  return (
    <section className="border-b border-border bg-background pt-14 pb-20 md:pt-20 md:pb-28">
      <Container>
        <div className="grid gap-16 xl:grid-cols-12 xl:items-center xl:gap-8">
          <div className="flex flex-col gap-6 xl:col-span-6">
            <h1 className="text-display text-foreground text-balance">
              Modern systems for businesses ready to move beyond manual work.
            </h1>
            <p className="max-w-xl text-(length:--text-body-lg) text-muted text-pretty">
              IZEYX designs and builds websites, software, automations, AI solutions, and connected digital
              systems that help growing businesses operate more effectively.
            </p>
            <div className="mt-2 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Button href="/contact" variant="primary">
                {ctaCopy.primary}
              </Button>
              <TextLink href="/services" withArrow className="text-base font-medium">
                {ctaCopy.secondary}
              </TextLink>
            </div>
          </div>

          <div className="xl:col-span-6">
            <SystemDiagram
              inputs={heroInputs}
              outputs={heroOutputs}
              caption="Diagram: business inputs such as a website, CRM, spreadsheets, support, and calls converging through IZEYX into a connected operating layer that enables automation, an AI assistant, and usable data."
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
