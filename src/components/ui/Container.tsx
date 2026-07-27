import type { ElementType, ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  narrow?: boolean;
};

export function Container({ children, as: Tag = "div", className = "", narrow = false }: ContainerProps) {
  return (
    <Tag
      className={`mx-auto w-full px-(--container-pad) ${narrow ? "max-w-3xl" : "max-w-(--container-max)"} ${className}`}
    >
      {children}
    </Tag>
  );
}
