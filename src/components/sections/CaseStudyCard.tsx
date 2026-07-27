import Link from "next/link";
import { MediaPlaceholder } from "@/components/media/MediaPlaceholder";
import type { CaseStudy } from "@/types/content";

export function CaseStudyCard({ caseStudy }: { caseStudy: CaseStudy }) {
  return (
    <Link
      href={`/work/${caseStudy.slug}`}
      className="group flex items-center gap-5 border-b border-border py-5 first:pt-0 last:border-b-0"
    >
      <div className="w-28 shrink-0 sm:w-36">
        <MediaPlaceholder
          label="Your next transformation concept"
          assetType="cover"
          aspectRatio="4 / 3"
        />
      </div>
      <div className="flex flex-1 flex-col gap-1">
        <p className="label text-muted-soft">{caseStudy.category}</p>
        <h3 className="text-title text-foreground group-hover:text-primary-text">{caseStudy.projectName}</h3>
      </div>
      <span aria-hidden="true" className="hidden shrink-0 text-muted-soft group-hover:text-primary-text sm:block">
        →
      </span>
    </Link>
  );
}
