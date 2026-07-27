import Link from "next/link";
import Image from "next/image";
import logoBlue from "../../../public/images/brand/izeyx-logo-blue.png";
import logoWhite from "../../../public/images/brand/izeyx-logo-white.png";

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
        <Image src={logoBlue} alt="" fill sizes="40px" className="logo-mark-light object-contain" />
        <Image src={logoWhite} alt="" fill sizes="40px" className="logo-mark-dark object-contain" />
      </span>
      IZEYX
    </Link>
  );
}
