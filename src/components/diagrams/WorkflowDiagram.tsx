type WorkflowStep = {
  label: string;
  description: string;
};

type WorkflowDiagramProps = {
  steps: WorkflowStep[];
  caption: string;
  className?: string;
};

/**
 * A labelled sequence joined by directional connectors, used to explain
 * automation and AI workflows (input → reasoning → approval → action) and the
 * homepage operating-system section. See docs/DESIGN.md section 4.
 */
export function WorkflowDiagram({ steps, caption, className = "" }: WorkflowDiagramProps) {
  return (
    <figure className={`m-0 ${className}`}>
      <ol className="flex flex-col gap-0 md:flex-row md:items-stretch md:gap-0">
        {steps.map((step, index) => (
          <li key={step.label} className="flex flex-1 flex-col md:flex-row md:items-stretch">
            <div className="flex flex-1 flex-col gap-2 border border-border-strong/40 bg-surface px-5 py-6">
              <span className="label text-primary-text">{`0${index + 1}`}</span>
              <p className="text-title text-foreground">{step.label}</p>
              <p className="text-sm text-muted">{step.description}</p>
            </div>
            {index < steps.length - 1 ? (
              <div
                aria-hidden="true"
                className="flex shrink-0 items-center justify-center py-1 text-muted-soft md:w-10 md:py-0"
              >
                <span className="text-lg md:rotate-0" aria-hidden="true">
                  <span className="block md:hidden">↓</span>
                  <span className="hidden md:block">→</span>
                </span>
              </div>
            ) : null}
          </li>
        ))}
      </ol>
      <figcaption className="sr-only">{caption}</figcaption>
    </figure>
  );
}
