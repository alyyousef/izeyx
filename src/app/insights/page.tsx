import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { InsightCard } from "@/components/sections/InsightCard";
import { CTASection } from "@/components/sections/CTASection";
import { insightArticles } from "@/data/insights";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Insights",
  description:
    "Practical, non-hyped writing on digital transformation, automation, AI implementation, and technology decision-making for growing businesses.",
  path: "/insights",
});

export default function InsightsPage() {
  return (
    <>
      <Section tone="light" className="pb-8 md:pb-10">
        <SectionHeader
          as="h1"
          heading="Practical writing on digital transformation, without the hype."
          description="A small, carefully written set of articles, not a high-volume content mill. More will be added as the practice grows."
        />
      </Section>

      <Section tone="light" className="border-t border-border pt-4 pb-20 md:pb-28">
        {insightArticles.map((article) => (
          <InsightCard key={article.slug} article={article} />
        ))}
      </Section>

      <CTASection
        heading="Have a question these articles don't answer?"
        description="Book a discovery call and ask it directly. We'd rather have the conversation than write another generic post."
      />
    </>
  );
}
