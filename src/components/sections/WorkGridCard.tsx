import Link from "next/link";
import { MediaPlaceholder } from "@/components/media/MediaPlaceholder";
import type { CaseStudy } from "@/types/content";

export function WorkGridCard({ caseStudy }: { caseStudy: CaseStudy }) {
  return (
    <Link href={`/work/${caseStudy.slug}`} className="group flex flex-col gap-4">
      <MediaPlaceholder
        label="A vision for what your business could become next"
        assetType="cover"
        aspectRatio="4 / 3"
        className="transition-opacity group-hover:opacity-90"
      />
      <div>
        <p className="label text-muted-soft">{caseStudy.category}</p>
        <h2 className="mt-1.5 text-subheading text-foreground group-hover:text-primary-text">
          {caseStudy.projectName}
        </h2>
        <p className="mt-1 text-sm text-muted">{caseStudy.clientIndustry}</p>
      </div>
    </Link>
  );
}
