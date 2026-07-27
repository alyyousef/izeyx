"use client";

import { useEffect } from "react";
import * as Sentry from "@sentry/nextjs";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { TextLink } from "@/components/ui/TextLink";

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <Section tone="light" className="flex flex-1 flex-col items-center justify-center py-24 text-center md:py-32">
      <p className="label text-primary-text">Something went wrong</p>
      <h1 className="mt-4 text-heading text-foreground text-balance">
        This page hit an unexpected error.
      </h1>
      <p className="mt-4 max-w-md text-muted">
        It&apos;s on our side, not something you did. Try again, or reach us directly if the problem continues.
      </p>
      <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row">
        <Button onClick={reset} variant="primary">
          Try again
        </Button>
        <TextLink href="/contact" withArrow className="text-base font-medium">
          Contact us instead
        </TextLink>
      </div>
    </Section>
  );
}
