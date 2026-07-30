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
 * Desktop keeps the connected workflow treatment. Narrow screens receive the
 * same content as a conventional reading sequence without arrows or cards.
 */
export function WorkflowDiagram({ steps, caption, className = "" }: WorkflowDiagramProps) {
  return (
    <figure className={`m-0 ${className}`}>
      <ol className="workflow-summary border-y border-border lg:hidden">
        {steps.map((step, index) => (
          <li
            key={step.label}
            className="grid grid-cols-[2rem_1fr] gap-3 border-b border-border py-5 last:border-b-0"
          >
            <span className="text-meta pt-0.5 text-primary-text">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div>
              <p className="text-title text-foreground">{step.label}</p>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">{step.description}</p>
            </div>
          </li>
        ))}
      </ol>

      <ol className="workflow-diagram-artwork hidden flex-row items-stretch lg:flex">
        {steps.map((step, index) => (
          <li key={step.label} className="flex flex-1 flex-row items-stretch">
            <div className="flex flex-1 flex-col gap-2 border border-border-strong/40 bg-surface px-5 py-6">
              <span className="label text-primary-text">{String(index + 1).padStart(2, "0")}</span>
              <p className="text-title text-foreground">{step.label}</p>
              <p className="text-sm text-muted">{step.description}</p>
            </div>
            {index < steps.length - 1 ? (
              <div aria-hidden="true" className="flex w-10 shrink-0 items-center justify-center text-lg text-muted-soft">
                →
              </div>
            ) : null}
          </li>
        ))}
      </ol>
      <figcaption className="sr-only">{caption}</figcaption>
    </figure>
  );
}
