import Link from "next/link";
import { MediaPlaceholder } from "@/components/media/MediaPlaceholder";
import type { InsightArticle } from "@/types/content";

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export function InsightCard({
  article,
  headingLevel: Heading = "h2",
}: {
  article: InsightArticle;
  headingLevel?: "h2" | "h3";
}) {
  return (
    <Link
      href={`/insights/${article.slug}`}
      className="group grid gap-5 border-t border-border py-8 first:border-t-0 sm:grid-cols-12 sm:gap-8"
    >
      <div className="sm:col-span-3">
        <MediaPlaceholder
          label="A practical idea for a stronger business"
          assetType="cover"
          aspectRatio="4 / 3"
        />
      </div>
      <div className="flex flex-col gap-2 sm:col-span-9">
        <p className="label text-primary-text">{article.category}</p>
        <Heading className="font-display text-xl font-medium tracking-tight text-foreground group-hover:text-primary-text sm:text-2xl">
          {article.title}
        </Heading>
        <p className="max-w-2xl text-muted">{article.description}</p>
        <p className="text-meta mt-1 text-muted-soft">
          {formatDate(article.publicationDate)} · {article.readingTimeMinutes} min read
        </p>
      </div>
    </Link>
  );
}
