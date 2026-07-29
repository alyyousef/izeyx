import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Section } from "@/components/ui/Section";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { TextLink } from "@/components/ui/TextLink";
import { MediaPlaceholder } from "@/components/media/MediaPlaceholder";
import { CtaSection } from "@/components/sections/CtaSection";
import { getCaseStudyBySlug, getPublishedCaseStudies } from "@/data/work";
import { getServiceBySlug } from "@/data/services";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";

type PageParams = { slug: string };

export function generateStaticParams() {
  return getPublishedCaseStudies().map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: Promise<PageParams> }): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = getCaseStudyBySlug(slug);
  if (!caseStudy || !caseStudy.published) return {};

  return buildMetadata({
    title: caseStudy.projectName,
    description: caseStudy.challenge,
    path: `/work/${caseStudy.slug}`,
    noIndex: caseStudy.clientIsPlaceholder,
  });
}

export default async function CaseStudyPage({ params }: { params: Promise<PageParams> }) {
  const { slug } = await params;
  const caseStudy = getCaseStudyBySlug(slug);
  if (!caseStudy || !caseStudy.published) notFound();

  const relatedServices = caseStudy.servicesInvolved
    .map((serviceSlug) => getServiceBySlug(serviceSlug))
    .filter((service) => Boolean(service));

  return (
    <>
      <Section tone="light" className="pb-10 md:pb-12">
        <Breadcrumbs items={[{ name: "Work", path: "/work" }, { name: caseStudy.projectName, path: `/work/${caseStudy.slug}` }]} />

        <div className="mt-6 max-w-3xl">
          <p className="label text-primary-text">{caseStudy.category}</p>
          <h1 className="text-display mt-3 text-foreground text-balance">{caseStudy.projectName}</h1>
          <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-3 border-t border-border pt-6 text-sm">
            <div>
              <dt className="text-muted-soft">{caseStudy.clientIsPlaceholder ? "Opportunity" : "Client"}</dt>
              <dd className="mt-0.5 text-foreground">
                {caseStudy.clientName}
              </dd>
            </div>
            <div>
              <dt className="text-muted-soft">Industry</dt>
              <dd className="mt-0.5 text-foreground">{caseStudy.clientIndustry}</dd>
            </div>
            <div>
              <dt className="text-muted-soft">Services</dt>
              <dd className="mt-0.5 text-foreground">
                {relatedServices.map((s) => s?.shortName).join(", ")}
              </dd>
            </div>
          </dl>
        </div>
      </Section>

      {caseStudy.clientIsPlaceholder ? (
        <Section tone="light" noContainer className="py-0">
          <div className="border-y border-border bg-surface-subtle py-4">
            <p className="mx-auto max-w-(--container-max) px-(--container-pad) text-sm text-muted">
              This could be your next business transformation. Let&apos;s explore how a focused strategy and the right
              connected systems could bring a stronger version of your operation to life.
            </p>
          </div>
        </Section>
      ) : null}

      <Section tone="light" className="pt-12 pb-16 md:pt-16 md:pb-20">
        <MediaPlaceholder
          label="A future transformation shaped around your business"
          assetType="cover"
          aspectRatio="16 / 9"
        />
      </Section>

      <Section tone="light" className="border-t border-border py-16 md:py-20">
        <div className="mb-12 max-w-2xl border-b border-border pb-12">
          <p className="label text-primary-text">Context</p>
          <h2 className="text-subheading mt-3 text-foreground">The opportunity</h2>
          <p className="mt-4 text-muted">{caseStudy.context}</p>
        </div>
        <div className="grid gap-12 md:grid-cols-2 md:gap-8">
          <div>
            <h2 className="text-subheading text-foreground">The challenge</h2>
            <p className="mt-4 text-muted">{caseStudy.challenge}</p>
          </div>
          <div>
            <h2 className="text-subheading text-foreground">Approach</h2>
            <p className="mt-4 text-muted">{caseStudy.approach}</p>
          </div>
        </div>
      </Section>

      <Section tone="light" className="border-t border-border py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-2 md:gap-8">
          <div>
            <h2 className="text-subheading text-foreground">Solution</h2>
            <p className="mt-4 text-muted">{caseStudy.solution}</p>
          </div>
          <div>
            <h2 className="text-subheading text-foreground">Technology</h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {caseStudy.technology.map((tech) => (
                <li key={tech} className="rounded-sm border border-border px-3 py-1.5 text-sm text-foreground">
                  {tech}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {caseStudy.outcome ? (
        <Section tone="light" className="border-t border-border py-16 md:py-20">
          <h2 className="text-subheading text-foreground">Outcome</h2>
          <p className="mt-4 max-w-2xl text-muted">{caseStudy.outcome}</p>
        </Section>
      ) : null}

      {caseStudy.testimonial ? (
        <Section tone="dark" className="py-16 md:py-20">
          <blockquote className="mx-auto max-w-2xl text-center">
            <p className="text-pullquote text-(length:--text-h3) text-foreground text-balance">
              &ldquo;{caseStudy.testimonial.quote}&rdquo;
            </p>
            <footer className="mt-4 text-sm text-muted">{caseStudy.testimonial.attribution}</footer>
          </blockquote>
        </Section>
      ) : null}

      <Section tone="light" className="border-t border-border py-16 md:py-20">
        <TextLink href="/work" withArrow className="text-sm font-medium">
          Back to all work
        </TextLink>
      </Section>

      <CtaSection
        heading="Considering something similar?"
        description="Every engagement starts with a conversation about the specific problem, not a generic proposal."
      />

      <JsonLd
        id="breadcrumb-schema"
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Work", path: "/work" },
          { name: caseStudy.projectName, path: `/work/${caseStudy.slug}` },
        ])}
      />
    </>
  );
}

export const dynamicParams = false;
