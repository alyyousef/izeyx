import type { InsightSection } from "@/types/content";

export function ArticleBody({ sections }: { sections: InsightSection[] }) {
  return (
    <div className="flex flex-col gap-6">
      {sections.map((section, index) => {
        if (section.type === "paragraph") {
          return (
            <div key={section.id ?? index} id={section.id} className="scroll-mt-28">
              {section.heading ? (
                <h2 className="mb-3 text-(length:--text-h3) font-display font-medium tracking-tight text-foreground">
                  {section.heading}
                </h2>
              ) : null}
              <p className="max-w-(--reading-measure) text-muted">{section.text}</p>
            </div>
          );
        }

        if (section.type === "pullquote") {
          return (
            <blockquote key={index} className="max-w-(--reading-measure) border-l-2 border-border-strong py-1 pl-6">
              <p className="text-pullquote text-xl text-foreground text-balance">{section.text}</p>
              {section.attribution ? <footer className="text-meta mt-2 text-muted-soft">{section.attribution}</footer> : null}
            </blockquote>
          );
        }

        return (
          <div key={section.id ?? index} id={section.id} className="scroll-mt-28">
            {section.heading ? (
              <h2 className="mb-3 text-(length:--text-h3) font-display font-medium tracking-tight text-foreground">
                {section.heading}
              </h2>
            ) : null}
            <ul className="flex max-w-(--reading-measure) flex-col gap-2">
              {section.items.map((item) => (
                <li key={item} className="flex gap-3 text-muted">
                  <span aria-hidden="true" className="text-primary-text">
                    •
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
