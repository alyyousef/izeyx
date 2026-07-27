import type { ReactNode } from "react";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { TextLink } from "@/components/ui/TextLink";

type CTASectionProps = {
  heading: ReactNode;
  description?: ReactNode;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  tone?: "light" | "dark";
};

export function CTASection({
  heading,
  description,
  primaryLabel = "Book a discovery call",
  primaryHref = "/contact",
  secondaryLabel,
  secondaryHref,
  tone = "dark",
}: CTASectionProps) {
  return (
    <Section tone={tone} aria-labelledby="cta-heading" className="text-center">
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-6">
        <h2 id="cta-heading" className="text-heading text-foreground text-balance">
          {heading}
        </h2>
        {description ? <p className="text-(length:--text-body-lg) text-muted text-pretty">{description}</p> : null}
        <div className="mt-2 flex flex-col items-center gap-4 sm:flex-row">
          <Button href={primaryHref} variant="primary">
            {primaryLabel}
          </Button>
          {secondaryLabel && secondaryHref ? (
            <TextLink href={secondaryHref} withArrow className="text-base font-medium">
              {secondaryLabel}
            </TextLink>
          ) : null}
        </div>
      </div>
    </Section>
  );
}
