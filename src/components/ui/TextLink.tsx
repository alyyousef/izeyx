import type { ReactNode } from "react";
import Link from "next/link";

type TextLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
  external?: boolean;
  withArrow?: boolean;
};

export function TextLink({ href, children, className = "", external = false, withArrow = false }: TextLinkProps) {
  const classes = `inline-flex items-center gap-1.5 text-primary-text underline decoration-1 underline-offset-4 hover:text-primary-text-strong transition-colors ${className}`;
  const content = (
    <>
      {children}
      {withArrow && (
        <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">
          →
        </span>
      )}
    </>
  );

  if (external || href.startsWith("http")) {
    return (
      <a href={href} className={`group ${classes}`} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={`group ${classes}`}>
      {content}
    </Link>
  );
}
