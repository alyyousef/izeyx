import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { TextLink } from "@/components/ui/TextLink";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { CtaSection } from "@/components/sections/CtaSection";
import { FaqList } from "@/components/sections/FaqList";
import { WorkflowDiagram } from "@/components/diagrams/WorkflowDiagram";
import { SystemDiagram } from "@/components/diagrams/SystemDiagram";
import { services, getServiceBySlug, getRelatedServices } from "@/data/services";
import { serviceDiagrams, integrationsDiagram } from "@/data/service-diagrams";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";

type PageParams = { slug: string };

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};

  return buildMetadata({
    title: service.name,
    description: service.summary,
    path: `/services/${service.slug}`,
  });
}

export default async function ServiceDetailPage({ params }: { params: Promise<PageParams> }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const related = getRelatedServices(service);
  const diagramConfig = service.slug === "integrations" ? integrationsDiagram : serviceDiagrams[service.slug];

  return (
    <>
      <Section tone="light" className="pb-12 md:pb-16">
        <Breadcrumbs
          items={[
            { name: "Services", path: "/services" },
            { name: service.name, path: `/services/${service.slug}` },
          ]}
        />
        <div className="mt-6 grid gap-8 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-8">
            <h1 className="text-display text-foreground text-balance">{service.name}</h1>
            <p className="mt-5 max-w-2xl text-(length:--text-body-lg) text-muted text-pretty">
              {service.heroDescription}
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Button href="/contact" variant="primary">
                Book a discovery call
              </Button>
              <TextLink href="/services" withArrow className="text-base font-medium">
                See all services
              </TextLink>
            </div>
          </div>
        </div>
      </Section>

      <Section tone="light" className="border-t border-border py-16 md:py-20">
        <div className="grid gap-10 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-4">
            <p className="label text-muted-soft">The problem</p>
            <p className="text-pullquote mt-3 max-w-sm text-xl text-foreground">{service.problem}</p>
          </div>
          <div className="md:col-span-8">
            <p className="label text-muted-soft">What we typically hear</p>
            <ul className="mt-3 flex flex-col gap-4">
              {service.problems.map((problem) => (
                <li key={problem} className="border-t border-border pt-4 text-muted">
                  {problem}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {diagramConfig ? (
        <Section tone="dark" aria-labelledby="service-diagram-heading">
          <SectionHeader
            headingId="service-diagram-heading"
            heading={
              diagramConfig.type === "system"
                ? "Connecting the systems already in use"
                : "A defined path from trigger to outcome"
            }
          />
          <div className="mt-12">
            {diagramConfig.type === "workflow" ? (
              <WorkflowDiagram
                steps={diagramConfig.steps}
                caption={`Diagram: the ${service.name.toLowerCase()} workflow from ${diagramConfig.steps[0]?.label.toLowerCase()} to ${diagramConfig.steps[diagramConfig.steps.length - 1]?.label.toLowerCase()}.`}
              />
            ) : (
              <SystemDiagram
                inputs={diagramConfig.inputs}
                outputs={diagramConfig.outputs}
                caption="Diagram: separate business systems connected through IZEYX into a unified customer record and automated workflows."
              />
            )}
          </div>
        </Section>
      ) : null}

      <Section tone="light" className="py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-2 md:gap-8">
          <div>
            <SectionHeader heading="What IZEYX can design or build" />
            <ul className="mt-6 flex flex-col gap-3">
              {service.deliverables.map((item) => (
                <li key={item} className="flex gap-3 border-t border-border pt-3 text-foreground">
                  <span aria-hidden="true" className="text-primary-text">
                    •
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <SectionHeader heading="Situations this typically applies to" />
            <div className="mt-6 flex flex-col gap-6">
              {service.useCases.map((useCase) => (
                <div key={useCase.title} className="border-t border-border pt-4">
                  <p className="text-title text-foreground">{useCase.title}</p>
                  <p className="mt-1.5 text-muted">{useCase.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section tone="light" className="border-t border-border py-16 md:py-20">
        <SectionHeader heading="How a typical engagement runs" />
        <ol className="mt-8 grid gap-8 sm:grid-cols-3">
          {service.engagementApproach.map((step, index) => (
            <li key={step.title} className="border-t border-border-strong pt-4">
              <span className="text-meta text-muted-soft">{String(index + 1).padStart(2, "0")}</span>
              <p className="text-title mt-2 text-foreground">{step.title}</p>
              <p className="mt-1.5 text-muted">{step.description}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section tone="light" className="border-t border-border py-16 md:py-20">
        <SectionHeader heading="Frequently asked questions" />
        <div className="mt-8">
          <FaqList faqs={service.faqs} />
        </div>
      </Section>

      {related.length ? (
        <Section tone="light" className="border-t border-border py-16 md:py-20">
          <SectionHeader heading="Often paired with this service" />
          <ul className="mt-8 grid gap-6 sm:grid-cols-3">
            {related.map((item) => (
              <li key={item.slug} className="border-t border-border-strong pt-4">
                <TextLink href={`/services/${item.slug}`} withArrow className="text-title">
                  {item.shortName}
                </TextLink>
                <p className="mt-1.5 text-sm text-muted">{item.summary}</p>
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      <CtaSection
        heading="Ready to talk through your specific situation?"
        description="A discovery call is a working conversation about your operations, not a scripted sales pitch."
        primaryHref={`/contact?service=${service.slug}`}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "Services", path: "/services" },
              { name: service.name, path: `/services/${service.slug}` },
            ])
          ),
        }}
      />
    </>
  );
}

export const dynamicParams = false;
