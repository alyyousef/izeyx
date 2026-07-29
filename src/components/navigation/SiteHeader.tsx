import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { LogoWordmark } from "@/components/ui/LogoWordmark";
import { primaryNav, ctaCopy } from "@/lib/site-config";
import { MobileNavigation } from "./MobileNavigation";
import { HeaderToneWatcher } from "./HeaderToneWatcher";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-saturate-150 supports-backdrop-filter:backdrop-blur-sm transition-colors duration-200">
      <HeaderToneWatcher />
      <Container className="flex min-h-18 items-center justify-between py-3">
        <LogoWordmark />

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {primaryNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm font-medium text-foreground transition-colors hover:text-primary-text"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden lg:block">
          <Button href="/contact" variant="primary" className="px-5 py-3 text-sm">
            {ctaCopy.primary}
          </Button>
        </div>

        <MobileNavigation />
      </Container>
    </header>
  );
}
