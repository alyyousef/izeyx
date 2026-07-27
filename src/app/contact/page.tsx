import type { Metadata } from "next";
import { LocationMap } from "@/components/media/LocationMap";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ContactForm } from "@/components/forms/ContactForm";
import { LinkedInIcon, XIcon } from "@/components/ui/SocialIcons";
import { serviceSlugToInterest } from "@/lib/contact-form";
import { publicSocialLinks, siteConfig } from "@/lib/site-config";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description:
    "Tell IZEYX about the operational problem you're trying to solve. Book a discovery call or send a detailed enquiry.",
  path: "/contact",
});

const socialLinks = publicSocialLinks.map((link) => ({
  ...link,
  icon: link.id === "linkedin" ? LinkedInIcon : link.id === "twitter" ? XIcon : null,
}));

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ service?: string }>;
}) {
  const { service } = await searchParams;
  const defaultService = service ? serviceSlugToInterest[service] : undefined;

  return (
    <Section tone="light" className="py-16 md:py-20">
      <div className="grid gap-14 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-4">
          <SectionHeader
            as="h1"
            heading="Tell us what's slowing your business down."
            description="Share as much detail as you can. The more we understand the problem, the more useful the first conversation will be."
          />

          <dl className="mt-10 flex flex-col gap-6 border-t border-border pt-8 text-sm">
            <div>
              <dt className="label text-muted-soft">Email</dt>
              <dd className="mt-1">
                <a href={`mailto:${siteConfig.contact.email.value}`} className="text-primary-text underline underline-offset-4">
                  {siteConfig.contact.email.value}
                </a>
              </dd>
            </div>
            <div>
              <dt className="label text-muted-soft">Phone</dt>
              <dd className="mt-1 text-foreground">
                <a href={siteConfig.contact.phone.href} className="text-primary-text underline underline-offset-4">
                  {siteConfig.contact.phone.value}
                </a>
              </dd>
            </div>
            <div>
              <dt className="label text-muted-soft">Address</dt>
              <dd className="mt-1 text-foreground">
                <a
                  href={siteConfig.location.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-text underline underline-offset-4"
                >
                  {siteConfig.contact.address.value}
                </a>
              </dd>
            </div>
            <div>
              <dt className="label text-muted-soft">Working hours</dt>
              <dd className="mt-1 text-foreground">
                {siteConfig.contact.hours.value}
              </dd>
            </div>
            {socialLinks.length > 0 ? (
              <div>
                <dt className="label text-muted-soft">Elsewhere</dt>
                <dd className="mt-1 flex flex-col gap-1">
                  {socialLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-primary-text underline underline-offset-4"
                    >
                      {link.icon ? <link.icon className="h-4 w-4 shrink-0" /> : null}
                      {link.label}
                    </a>
                  ))}
                </dd>
              </div>
            ) : null}
          </dl>

          <div className="mt-10">
            <p className="label mb-3 text-muted-soft">Find us</p>
            <LocationMap />
            <a
              href={siteConfig.location.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block text-sm text-primary-text underline underline-offset-4"
            >
              Open in Google Maps
            </a>
          </div>
        </div>

        <div className="md:col-span-7 md:col-start-6">
          <ContactForm defaultService={defaultService} />
        </div>
      </div>
    </Section>
  );
}
