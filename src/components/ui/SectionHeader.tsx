import type { ReactNode } from "react";

type SectionHeaderProps = {
  heading: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  headingId?: string;
  className?: string;
  as?: "h1" | "h2" | "h3";
};

export function SectionHeader({
  heading,
  description,
  align = "left",
  headingId,
  className = "",
  as: Heading = "h2",
}: SectionHeaderProps) {
  const alignClass = align === "center" ? "text-center mx-auto items-center" : "text-left items-start";

  return (
    <div className={`flex max-w-2xl flex-col gap-4 ${alignClass} ${className}`}>
      <Heading id={headingId} className="text-heading text-foreground text-balance">
        {heading}
      </Heading>
      {description ? (
        <p className="text-(length:--text-body-lg) text-muted text-pretty">{description}</p>
      ) : null}
    </div>
  );
}
