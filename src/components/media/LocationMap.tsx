"use client";

import { useState } from "react";
import { siteConfig } from "@/lib/site-config";

type LocationMapProps = {
  title?: string;
  className?: string;
};

/**
 * Embedded Google Maps view for the IZEYX New Cairo location. Uses Google's
 * standard iframe embed (no Maps JavaScript API key required).
 */
export function LocationMap({
  title = "Map showing IZEYX in New Cairo",
  className,
}: LocationMapProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div
      className={[
        "overflow-hidden rounded-sm border border-border bg-surface-subtle",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {isLoaded ? (
        <iframe
          title={title}
          src={siteConfig.location.mapsEmbedUrl}
          className="aspect-[4/3] w-full border-0 md:aspect-[16/10]"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={() => setIsLoaded(true)}
          className="group relative flex aspect-[4/3] w-full flex-col items-center justify-center overflow-hidden px-6 text-center md:aspect-[16/10]"
          aria-label="Load the interactive map for IZEYX in New Cairo"
        >
          <span
            aria-hidden="true"
            className="absolute inset-0 opacity-50 [background-image:linear-gradient(var(--border)_1px,transparent_1px),linear-gradient(90deg,var(--border)_1px,transparent_1px)] [background-size:28px_28px]"
          />
          <span className="relative grid h-11 w-11 place-items-center rounded-full border border-primary bg-background text-xl text-primary-text transition-colors group-hover:bg-primary group-hover:text-on-primary">
            +
          </span>
          <span className="relative mt-4 text-sm font-semibold text-foreground">
            View interactive map
          </span>
          <span className="relative mt-1 text-xs text-muted">New Cairo, Cairo</span>
        </button>
      )}
    </div>
  );
}
