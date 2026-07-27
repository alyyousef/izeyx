import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Section } from "@/components/ui/Section";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { MediaPlaceholder } from "@/components/media/MediaPlaceholder";
import { TableOfContents } from "@/components/sections/TableOfContents";
import { ArticleBody } from "@/components/sections/ArticleBody";
import { InsightCard } from "@/components/sections/InsightCard";
import { CTASection } from "@/components/sections/CTASection";
import { insightArticles, getInsightBySlug, getRelatedInsights } from "@/data/insights";
import { buildMetadata, articleSchema, breadcrumbSchema } from "@/lib/seo";

type PageParams = { slug: string };

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export function generateStaticParams() {
  return insightArticles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: { params: Promise<PageParams> }): Promise<Metadata> {
  const { slug } = await params;
  const article = getInsightBySlug(slug);
  if (!article) return {};

  return buildMetadata({
    title: article.title,
    description: article.description,
    path: `/insights/${article.slug}`,
  });
}

export default async function InsightArticlePage({ params }: { params: Promise<PageParams> }) {
  const { slug } = await params;
  const article = getInsightBySlug(slug);
  if (!article) notFound();

  const related = getRelatedInsights(article);

  return (
    <>
      <Section tone="light" className="pb-10 md:pb-12">
        <Breadcrumbs items={[{ name: "Insights", path: "/insights" }, { name: article.title, path: `/insights/${article.slug}` }]} />
        <div className="mt-6 max-w-3xl">
          <p className="label text-primary-text">{article.category}</p>
          <h1 className="text-display mt-3 text-foreground text-balance">{article.title}</h1>
          <p className="mt-4 max-w-2xl text-(length:--text-body-lg) text-muted">{article.description}</p>
          <p className="text-meta mt-6 border-t border-border pt-4 text-muted-soft">
            {article.author} · {formatDate(article.publicationDate)} · {article.readingTimeMinutes} min read
          </p>
        </div>
      </Section>

      <Section tone="light" className="pb-16 md:pb-20">
        <MediaPlaceholder
          label="An idea worth building into how your business runs."
          assetType="cover"
          aspectRatio="21 / 9"
        />
      </Section>

      <Section tone="light" className="border-t border-border py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-12 md:gap-8">
          {article.tableOfContents.length ? (
            <aside className="md:col-span-3">
              <div className="md:sticky md:top-24">
                <TableOfContents items={article.tableOfContents} />
              </div>
            </aside>
          ) : null}
          <div className={article.tableOfContents.length ? "md:col-span-9" : "md:col-span-9 md:col-start-2"}>
            <ArticleBody sections={article.content} />
          </div>
        </div>
      </Section>

      {related.length ? (
        <Section tone="light" className="border-t border-border py-16 md:py-20">
          <h2 className="text-subheading text-foreground">Related reading</h2>
          <div className="mt-4">
            {related.map((item) => (
              <InsightCard key={item.slug} article={item} headingLevel="h3" />
            ))}
          </div>
        </Section>
      ) : null}

      <CTASection
        heading="Want to talk through how this applies to your business?"
        description="Book a discovery call. It's a working conversation, not a sales pitch."
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleSchema({
              title: article.title,
              description: article.description,
              path: `/insights/${article.slug}`,
              datePublished: article.publicationDate,
              author: article.author,
            })
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "Insights", path: "/insights" },
              { name: article.title, path: `/insights/${article.slug}` },
            ])
          ),
        }}
      />
    </>
  );
}

export const dynamicParams = false;
