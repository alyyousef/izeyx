import type { ElementType, ReactNode } from "react";
import { Container } from "./Container";

type SectionProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  tone?: "light" | "dark";
  containerClassName?: string;
  noContainer?: boolean;
  id?: string;
  "aria-labelledby"?: string;
};

export function Section({
  children,
  as: Tag = "section",
  className = "",
  tone = "light",
  containerClassName = "",
  noContainer = false,
  id,
  ...rest
}: SectionProps) {
  const toneClass = tone === "dark" ? "on-dark bg-background text-foreground" : "bg-background text-foreground";

  return (
    <Tag
      id={id}
      data-header-zone={tone === "dark" ? "dark" : undefined}
      className={`py-20 md:py-28 lg:py-32 ${toneClass} ${className}`}
      {...rest}
    >
      {noContainer ? children : <Container className={containerClassName}>{children}</Container>}
    </Tag>
  );
}
