import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { CaseStudyFeature } from "./CaseStudyFeature";
import { CaseStudyCard } from "./CaseStudyCard";
import { getFeaturedCaseStudies, getPublishedCaseStudies } from "@/data/work";

export function SelectedWork() {
  const featuredCaseStudies = getFeaturedCaseStudies();
  const caseStudies = featuredCaseStudies.length > 0 ? featuredCaseStudies : getPublishedCaseStudies();
  const [featured, ...rest] = caseStudies;

  if (!featured) return null;

  return (
    <Section tone="light" aria-labelledby="selected-work-heading">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <SectionHeader
          headingId="selected-work-heading"
          heading="See what your next transformation could look like."
          description="Explore practical transformation concepts shaped around the challenges growing businesses face, from disconnected systems to manual workflows and missed opportunities."
        />
        <Button href="/work" variant="secondary" className="shrink-0">
          View all work
        </Button>
      </div>

      <div className="mt-12 flex flex-col gap-10">
        <CaseStudyFeature caseStudy={featured} />
        {rest.length ? (
          <div className="flex flex-col">
            {rest.map((caseStudy) => (
              <CaseStudyCard key={caseStudy.slug} caseStudy={caseStudy} />
            ))}
          </div>
        ) : null}
      </div>
    </Section>
  );
}
