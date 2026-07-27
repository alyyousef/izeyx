import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { siteConfig } from "@/lib/site-config";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Terms of Service",
  description: "Terms governing the use of the IZEYX website and its published content.",
  path: "/terms",
  noIndex: true,
});

export default function TermsPage() {
  return (
    <Section tone="light" className="py-16 md:py-20">
      <div className="max-w-(--reading-measure)">
        <p className="label text-primary-text">Legal</p>
        <h1 className="mt-3 text-heading text-foreground">Terms of Service</h1>

        <div className="mt-6 border border-border-strong bg-surface-subtle p-5 text-sm text-foreground">
          <strong>Website terms:</strong> these terms govern use of this website and its published content. They do
          not form a services agreement; every IZEYX engagement is governed by a separate proposal and written
          contract agreed directly with the client.
        </div>

        <div className="mt-10 flex flex-col gap-8 text-muted">
          <section>
            <h2 className="text-subheading text-foreground">1. Acceptance of terms</h2>
            <p className="mt-3">
              By using {siteConfig.domain}, you agree to these terms. If you do not agree, please do not use the
              site.
            </p>
          </section>

          <section>
            <h2 className="text-subheading text-foreground">2. Website content</h2>
            <p className="mt-3">
              Content on this site, including service descriptions, process explanations, and transformation
              concepts, is provided for general information. Concept projects show how an engagement could be
              approached and do not claim to describe completed client work.
            </p>
          </section>

          <section>
            <h2 className="text-subheading text-foreground">3. No professional advice</h2>
            <p className="mt-3">
              Articles published under Insights reflect general perspective, not advice tailored to your specific
              circumstances. Contact us directly before acting on anything published here for your business.
            </p>
          </section>

          <section>
            <h2 className="text-subheading text-foreground">4. Intellectual property</h2>
            <p className="mt-3">
              The design, text, and code of this website belong to IZEYX unless otherwise stated. Do not reproduce
              substantial parts of it without permission.
            </p>
          </section>

          <section>
            <h2 className="text-subheading text-foreground">5. Engagement terms</h2>
            <p className="mt-3">
              Nothing on this website constitutes an offer or a binding services agreement. Any paid engagement
              with IZEYX is governed by a separate proposal and contract agreed directly with you.
            </p>
          </section>

          <section>
            <h2 className="text-subheading text-foreground">6. Limitation of liability</h2>
            <p className="mt-3">
              This site is provided &ldquo;as is.&rdquo; While IZEYX aims to keep its content useful and current, no
              guarantee is made that every page will always be complete, error-free, or suitable for a particular
              business decision.
            </p>
          </section>

          <section>
            <h2 className="text-subheading text-foreground">7. Contact</h2>
            <p className="mt-3">
              Questions about these terms can be sent to {siteConfig.contact.email.value}.
            </p>
          </section>
        </div>
      </div>
    </Section>
  );
}
