import Link from "next/link";
import Image from "next/image";
import logoMarkLight from "../../../public/images/brand/izeyx-logomark.png";
import logoMarkDark from "../../../public/images/brand/izeyx-logomark-dark.png";

type LogoWordmarkProps = {
  className?: string;
  onClick?: () => void;
};

export function LogoWordmark({ className = "", onClick }: LogoWordmarkProps) {
  return (
    <Link
      href="/"
      onClick={onClick}
      className={`inline-flex items-center gap-2.5 font-sans text-xl font-semibold tracking-tight text-foreground ${className}`}
    >
      <span className="relative h-10 w-10 shrink-0 overflow-hidden" aria-hidden="true">
        <Image src={logoMarkLight} alt="" fill sizes="40px" className="logo-mark-light object-contain" />
        <Image src={logoMarkDark} alt="" fill sizes="40px" className="logo-mark-dark object-contain" />
      </span>
      IZEYX
    </Link>
  );
}
