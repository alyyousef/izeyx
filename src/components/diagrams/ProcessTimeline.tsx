import type { ProcessStage } from "@/types/content";

type ProcessTimelineProps = {
  stages: ProcessStage[];
  variant?: "compact" | "detailed";
  className?: string;
};

function ContributionList({ items, emphasis = false }: { items: string[]; emphasis?: boolean }) {
  return (
    <ul className={`flex flex-col gap-1.5 text-sm ${emphasis ? "text-foreground" : "text-muted"}`}>
      {items.map((item) => (
        <li key={item} className="flex gap-2">
          <span aria-hidden="true" className={emphasis ? "text-primary-text" : "text-muted-soft"}>
            •
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function StageDetails({ stage }: { stage: ProcessStage }) {
  return (
    <>
      <div>
        <h3 className="text-subheading text-foreground">{stage.title}</h3>
        <p className="mt-2 max-w-2xl text-muted">{stage.summary}</p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <p className="label mb-2 text-muted-soft">You provide</p>
          <ContributionList items={stage.clientContributes} />
        </div>
        <div>
          <p className="label mb-2 text-primary-text">IZEYX delivers</p>
          <ContributionList items={stage.izeyxDelivers} emphasis />
        </div>
      </div>
    </>
  );
}

export function ProcessTimeline({ stages, variant = "detailed", className = "" }: ProcessTimelineProps) {
  if (variant === "compact") {
    return (
      <div className={className}>
        <ol className="process-summary border-y border-border lg:hidden">
          {stages.map((stage) => (
            <li
              key={stage.number}
              className="grid grid-cols-[2rem_1fr] gap-3 border-b border-border py-5 last:border-b-0"
            >
              <span className="text-meta pt-0.5 text-primary-text">{stage.number}</span>
              <div>
                <p className="text-title text-foreground">{stage.title}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{stage.summary}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="process-timeline-artwork hidden overflow-x-auto pb-3 lg:block">
          <div className="relative min-w-[72rem] py-5">
            <ol className="grid grid-cols-8 gap-6">
              {stages.map((stage, index) => (
                <li
                  key={stage.number}
                  className="relative z-10 flex min-h-28 flex-col justify-between rounded-md border border-border bg-surface p-4 shadow-[0_1px_2px_rgba(0,0,0,0.05)]"
                >
                  <span className="label text-primary-text">{stage.number}</span>
                  <span className="font-sans text-base font-semibold tracking-tight text-foreground">
                    {stage.title}
                  </span>

                  {index === stages.length - 1 ? null : (
                    <span aria-hidden="true" className="absolute top-1/2 left-full h-4 w-6 -translate-y-1/2">
                      <span className="process-flow-line absolute top-1/2 right-1.5 left-0 h-0.5 -translate-y-1/2" />
                      <span
                        style={{
                          borderTop: "5px solid transparent",
                          borderBottom: "5px solid transparent",
                          borderLeft: "8px solid var(--primary)",
                        }}
                        className="absolute top-1/2 right-0 -translate-y-1/2"
                      />
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      <ol className="process-summary border-y border-border md:hidden">
        {stages.map((stage) => (
          <li key={stage.number} className="border-b border-border py-8 last:border-b-0">
            <p className="label mb-3 text-primary-text">Stage {stage.number}</p>
            <div className="flex flex-col gap-6">
              <StageDetails stage={stage} />
            </div>
          </li>
        ))}
      </ol>

      <ol className="process-timeline-artwork hidden flex-col md:flex">
        {stages.map((stage, index) => (
          <li key={stage.number} className="relative pb-12 pl-16 last:pb-0">
            {index < stages.length - 1 ? (
              <span aria-hidden="true" className="absolute top-10 left-6 h-[calc(100%-1rem)] w-px bg-border" />
            ) : null}
            <span
              aria-hidden="true"
              className="absolute top-0 left-0 flex h-12 w-12 items-center justify-center rounded-sm border border-border-strong bg-background font-sans text-sm font-semibold tabular-nums"
            >
              {stage.number}
            </span>
            <div className="flex flex-col gap-4">
              <StageDetails stage={stage} />
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
