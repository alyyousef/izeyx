import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { LogoWordmark } from "@/components/ui/LogoWordmark";
import { LinkedInIcon, XIcon } from "@/components/ui/SocialIcons";
import { siteConfig, footerNav, publicSocialLinks } from "@/lib/site-config";

export function SiteFooter() {
  const year = new Date().getFullYear();
  const socialLinks = publicSocialLinks.filter((link) => link.id !== "booking");

  return (
    <footer data-header-zone="dark" className="on-dark border-t border-border bg-background text-foreground">
      <Container className="py-16 md:py-20">
        <div className="grid grid-cols-2 gap-x-8 gap-y-12 md:grid-cols-[0.8fr_0.8fr_1.4fr_1fr_1fr_1fr]">
          <div className="col-span-2 flex flex-col gap-4 md:col-span-2">
            <LogoWordmark />
            <p className="max-w-xs text-sm text-muted">{siteConfig.tagline}</p>
            <a
              href={`mailto:${siteConfig.contact.email.value}`}
              className="text-sm text-primary-text hover:text-primary-text-strong"
            >
              {siteConfig.contact.email.value}
            </a>
          </div>

          <nav aria-label="Services">
            <h2 className="label mb-4 text-muted-soft">Services</h2>
            <ul className="flex flex-col gap-3">
              {footerNav.services.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-muted hover:text-foreground">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Company">
            <h2 className="label mb-4 text-muted-soft">Company</h2>
            <ul className="flex flex-col gap-3">
              {footerNav.company.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-muted hover:text-foreground">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Legal">
            <h2 className="label mb-4 text-muted-soft">Legal</h2>
            <ul className="flex flex-col gap-3">
              {footerNav.legal.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-muted hover:text-foreground">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {socialLinks.length > 0 ? (
            <div>
              <h2 className="label mb-4 text-muted-soft">Connect</h2>
              <ul className="flex items-center gap-2">
                {socialLinks.map((link) => {
                  const Icon = link.id === "linkedin" ? LinkedInIcon : XIcon;
                  return (
                    <li key={link.id}>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`IZEYX on ${link.label}`}
                        className="flex min-h-11 min-w-11 items-center justify-center text-muted hover:text-foreground"
                      >
                        <Icon className="h-5 w-5" />
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          ) : null}
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-border pt-8 text-xs text-muted-soft md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {siteConfig.legalName}. All rights reserved.
          </p>
          <a href="#top" className="text-muted hover:text-foreground">
            Back to top ↑
          </a>
        </div>
      </Container>
    </footer>
  );
}
