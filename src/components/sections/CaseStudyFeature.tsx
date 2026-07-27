import Link from "next/link";
import { MediaPlaceholder } from "@/components/media/MediaPlaceholder";
import type { CaseStudy } from "@/types/content";

export function CaseStudyFeature({ caseStudy }: { caseStudy: CaseStudy }) {
  return (
    <Link
      href={`/work/${caseStudy.slug}`}
      className="group grid gap-6 border-b border-border pb-10 md:grid-cols-12 md:gap-8"
    >
      <div className="md:col-span-7">
        <MediaPlaceholder
          label="A connected transformation designed around your business"
          assetType="cover"
          aspectRatio="16 / 10"
          className="transition-opacity group-hover:opacity-90"
        />
      </div>
      <div className="flex flex-col justify-center gap-3 md:col-span-5">
        <p className="label text-primary-text">{caseStudy.category}</p>
        <h3 className="text-subheading text-foreground group-hover:text-primary-text">{caseStudy.projectName}</h3>
        <p className="text-muted">{caseStudy.challenge}</p>
        {caseStudy.clientIsPlaceholder ? (
          <p className="text-xs text-muted-soft">A transformation concept designed around a real business need.</p>
        ) : null}
        <span className="mt-1 text-sm font-medium text-primary-text">View project →</span>
      </div>
    </Link>
  );
}
