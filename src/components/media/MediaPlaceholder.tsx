type AssetType = "photo" | "screenshot" | "portrait" | "diagram" | "cover";

type MediaPlaceholderProps = {
  label: string;
  assetType?: AssetType;
  aspectRatio?: string;
  className?: string;
  variant?: "light" | "dark";
};

const assetTypeCopy: Record<AssetType, string> = {
  photo: "Concept photograph",
  screenshot: "Concept interface",
  portrait: "Team portrait concept",
  diagram: "Concept diagram",
  cover: "Concept cover artwork",
};

/**
 * A clean, text-free visual surface used until final photography or project
 * imagery is available. The descriptive label is exposed to assistive
 * technology only; the rendered artwork stays intentionally abstract.
 */
export function MediaPlaceholder({
  label,
  assetType = "photo",
  aspectRatio = "4 / 3",
  className = "",
  variant = "light",
}: MediaPlaceholderProps) {
  const borderClass = variant === "dark" ? "border-border-dark" : "border-border";

  return (
    <div
      role="img"
      aria-label={`${assetTypeCopy[assetType]}: ${label}`}
      style={{ aspectRatio }}
      className={`relative isolate w-full overflow-hidden rounded-md border bg-[#080716] ${borderClass} ${className}`}
    >
      <span
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_70%_18%,rgba(130,128,242,0.32),transparent_34%),radial-gradient(circle_at_20%_82%,rgba(52,50,199,0.24),transparent_40%),linear-gradient(145deg,#0b0920_0%,#05050d_62%,#121036_100%)]"
      />
      <span
        aria-hidden="true"
        className="absolute -top-[28%] right-[8%] h-[78%] w-[54%] rotate-12 rounded-[50%] border border-white/12 bg-white/3"
      />
      <span
        aria-hidden="true"
        className="absolute -right-[14%] -bottom-[42%] h-[88%] w-[72%] -rotate-12 rounded-[50%] border border-primary/50 bg-primary/12 shadow-[0_0_80px_rgba(52,50,199,0.18)]"
      />
      <span
        aria-hidden="true"
        className="absolute bottom-[14%] left-[12%] h-px w-[48%] origin-left -rotate-12 bg-linear-to-r from-transparent via-white/35 to-transparent"
      />
      <span
        aria-hidden="true"
        className="absolute top-[18%] left-[12%] h-2 w-2 rounded-full bg-primary shadow-[0_0_24px_rgba(130,128,242,0.9)]"
      />
    </div>
  );
}
