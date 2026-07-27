import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { siteConfig } from "@/lib/site-config";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy",
  description: "How IZEYX handles information shared through this website and its enquiry process.",
  path: "/privacy",
  noIndex: true,
});

export default function PrivacyPage() {
  return (
    <Section tone="light" className="py-16 md:py-20">
      <div className="max-w-(--reading-measure)">
        <p className="label text-primary-text">Legal</p>
        <h1 className="mt-3 text-heading text-foreground">Privacy Policy</h1>

        <div className="mt-10 flex flex-col gap-8 text-muted">
          <section>
            <h2 className="text-subheading text-foreground">1. Who this policy covers</h2>
            <p className="mt-3">
              This policy applies to visitors of {siteConfig.domain} and to people who submit information through
              the contact form on this site. It explains what information is collected, why it is used, and how to
              contact IZEYX about your information.
            </p>
          </section>

          <section>
            <h2 className="text-subheading text-foreground">2. Information we collect</h2>
            <p className="mt-3">
              Through the contact form, we collect the information you choose to provide: your name, work email,
              phone number (if given), company name, role (if given), the area of interest you select, a
              description of your business problem, and any timeline or budget details you share. We do not
              currently use analytics or tracking scripts on this site.
            </p>
          </section>

          <section>
            <h2 className="text-subheading text-foreground">3. How information is used</h2>
            <p className="mt-3">
              Information submitted through the contact form is used only to respond to your enquiry and, if you
              proceed, to scope and deliver the work discussed. It is not sold or shared with third parties for
              marketing purposes.
            </p>
          </section>

          <section>
            <h2 className="text-subheading text-foreground">4. Where information is stored</h2>
            <p className="mt-3">
              Enquiry details may be processed by the email and business systems used to deliver and manage our
              response. Access is limited to the people and services needed to review your request and continue the
              conversation with you. If error monitoring is enabled, the monitoring provider may receive limited
              technical diagnostics needed to identify a site failure; the site is configured not to send personal
              information by default.
            </p>
          </section>

          <section>
            <h2 className="text-subheading text-foreground">5. Your rights</h2>
            <p className="mt-3">
              Depending on your jurisdiction, you may have rights to access, correct, or request deletion of
              information you&apos;ve submitted to us. Until a formal request process is published here, contact us
              directly using the details on the contact page.
            </p>
          </section>

          <section>
            <h2 className="text-subheading text-foreground">6. Cookies</h2>
            <p className="mt-3">
              This site does not currently use advertising or analytics cookies. Embedded services, such as the map
              shown on our contact and about pages, may process limited technical information under their own
              privacy terms.
            </p>
          </section>

          <section>
            <h2 className="text-subheading text-foreground">7. Contact</h2>
            <p className="mt-3">
              Questions about this policy can be sent directly to {siteConfig.contact.email.value}. The contact
              page also lists the current phone and location details. Its enquiry form only confirms submission
              when online delivery is configured and succeeds.
            </p>
          </section>
        </div>
      </div>
    </Section>
  );
}
