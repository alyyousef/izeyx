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
  return (
    <div
      className={[
        "overflow-hidden rounded-sm border border-border bg-surface-subtle",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <iframe
        title={title}
        src={siteConfig.location.mapsEmbedUrl}
        className="aspect-[4/3] w-full border-0 md:aspect-[16/10]"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    </div>
  );
}
