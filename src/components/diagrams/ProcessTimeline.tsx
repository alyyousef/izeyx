import type { ProcessStage } from "@/types/content";

type ProcessTimelineProps = {
  stages: ProcessStage[];
  variant?: "compact" | "detailed";
  className?: string;
};

export function ProcessTimeline({ stages, variant = "detailed", className = "" }: ProcessTimelineProps) {
  if (variant === "compact") {
    return (
      <div className={className}>
        <ol className="flex flex-col lg:hidden">
          {stages.map((stage, index) => (
            <li key={stage.number} className="relative grid grid-cols-[2.75rem_1fr] gap-4 pb-6 last:pb-0">
              {index === stages.length - 1 ? null : (
                <span aria-hidden="true" className="absolute top-9 bottom-0 left-[1.125rem] w-px bg-border-strong" />
              )}
              <span className="relative z-10 flex h-9 w-9 items-center justify-center rounded-full border border-border-strong bg-surface font-sans text-xs font-semibold tabular-nums text-primary-text">
                {stage.number}
              </span>
              <div className="rounded-md border border-border bg-surface px-4 py-3 shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
                <span className="font-sans text-base font-semibold tracking-tight text-foreground">{stage.title}</span>
              </div>
            </li>
          ))}
        </ol>

        <div className="hidden overflow-x-auto pb-3 lg:block">
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
                    <span
                      aria-hidden="true"
                      className="absolute top-1/2 left-full h-4 w-6 -translate-y-1/2"
                    >
                      <span
                        className="process-flow-line absolute top-1/2 right-1.5 left-0 h-0.5 -translate-y-1/2"
                      />
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
    <ol className={`flex flex-col ${className}`}>
      {stages.map((stage, index) => (
        <li key={stage.number} className="relative pb-12 pl-12 last:pb-0 md:pl-16">
          {index < stages.length - 1 ? (
            <span aria-hidden="true" className="absolute top-10 left-4 h-[calc(100%-1rem)] w-px bg-border md:left-6" />
          ) : null}
          <span
            aria-hidden="true"
            className="absolute top-0 left-0 flex h-8 w-8 items-center justify-center rounded-sm border border-border-strong bg-background font-sans text-xs font-semibold tabular-nums md:h-12 md:w-12 md:text-sm"
          >
            {stage.number}
          </span>
          <div className="flex flex-col gap-4">
            <div>
              <h3 className="text-subheading text-foreground">{stage.title}</h3>
              <p className="mt-2 max-w-2xl text-muted">{stage.summary}</p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <p className="label mb-2 text-muted-soft">You provide</p>
                <ul className="flex flex-col gap-1.5 text-sm text-muted">
                  {stage.clientContributes.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span aria-hidden="true" className="text-muted-soft">
                        •
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="label mb-2 text-primary-text">IZEYX delivers</p>
                <ul className="flex flex-col gap-1.5 text-sm text-foreground">
                  {stage.izeyxDelivers.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span aria-hidden="true" className="text-primary-text">
                        •
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
}
