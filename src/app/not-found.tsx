import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { TextLink } from "@/components/ui/TextLink";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <Section tone="light" className="flex flex-1 flex-col items-center justify-center py-24 text-center md:py-32">
      <p className="label text-primary-text">404</p>
      <h1 className="mt-4 text-heading text-foreground text-balance">
        This page doesn&apos;t exist.
      </h1>
      <p className="mt-4 max-w-md text-muted">
        The page may have moved, or the link may be out of date. Try the homepage, or go straight to what you were
        probably looking for.
      </p>
      <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row">
        <Button href="/" variant="primary">
          Go to homepage
        </Button>
        <TextLink href="/contact" withArrow className="text-base font-medium">
          Contact us instead
        </TextLink>
      </div>
    </Section>
  );
}
