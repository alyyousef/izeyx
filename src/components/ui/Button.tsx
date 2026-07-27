import type { ButtonHTMLAttributes, ReactNode } from "react";
import Link from "next/link";

type Variant = "primary" | "secondary" | "ghost" | "on-dark";

type BaseProps = {
  children: ReactNode;
  variant?: Variant;
  className?: string;
  icon?: ReactNode;
};

type ButtonAsLink = BaseProps & {
  href: string;
  external?: boolean;
};

type ButtonAsButton = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-primary text-on-primary hover:bg-primary-strong active:bg-primary-strong",
  secondary:
    "bg-transparent text-foreground border border-border-strong hover:bg-foreground hover:text-background",
  ghost: "bg-transparent text-primary-text hover:text-primary-text-strong underline-offset-4 hover:underline",
  "on-dark":
    "bg-foreground-dark text-surface-dark hover:bg-white/85",
};

const baseClasses =
  "inline-flex items-center justify-center gap-2 rounded-sm px-6 py-3.5 text-[0.9375rem] font-medium tracking-tight transition-colors duration-150 min-h-11 disabled:opacity-50 disabled:pointer-events-none";

export function Button(props: ButtonAsLink | ButtonAsButton) {
  const { children, variant = "primary", className = "", icon } = props;
  const classes = `${baseClasses} ${variantClasses[variant]} ${className}`;

  if ("href" in props && props.href) {
    const { href, external } = props;
    if (external || href.startsWith("http")) {
      return (
        <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
          {children}
          {icon}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {children}
        {icon}
      </Link>
    );
  }

  const buttonProps = props as ButtonAsButton;
  const { href: _href, variant: _variant, className: _className, icon: _icon, ...rest } = buttonProps;
  void _href;
  void _variant;
  void _className;
  void _icon;

  return (
    <button className={classes} {...rest}>
      {children}
      {icon}
    </button>
  );
}
