type WorkflowDiagramConfig = {
  type: "workflow";
  steps: { label: string; description: string }[];
};

type SystemDiagramConfig = {
  type: "system";
  inputs: { label: string }[];
  outputs: { label: string }[];
};

export type ServiceDiagramConfig = WorkflowDiagramConfig | SystemDiagramConfig;

export const serviceDiagrams: Record<string, ServiceDiagramConfig> = {
  "websites-digital-experiences": {
    type: "workflow",
    steps: [
      { label: "Discover", description: "A visitor finds the site through search, referral, or a campaign." },
      { label: "Evaluate", description: "They review services, credibility, and relevance to their problem." },
      { label: "Enquire", description: "A clear conversion path, such as a form or booking action, captures the enquiry." },
      { label: "Onboard", description: "The enquiry reaches the right system automatically, without manual re-entry." },
      { label: "Return", description: "Content and account areas bring them back for future engagement." },
    ],
  },
  "custom-software": {
    type: "workflow",
    steps: [
      { label: "Requirements", description: "The operating process is documented as it actually runs today." },
      { label: "Design", description: "Roles, screens, and data structures are designed around that process." },
      { label: "Build", description: "The system is built in visible, reviewable stages." },
      { label: "Deploy", description: "The system goes live with training and documentation." },
      { label: "Operate", description: "Real usage informs maintenance and the next round of improvements." },
    ],
  },
  automation: {
    type: "workflow",
    steps: [
      { label: "Trigger", description: "A defined event, such as a new lead, a form, or a status change, starts the process." },
      { label: "Process", description: "Data moves, is checked, and is transformed without manual handling." },
      { label: "Notify", description: "The right person is alerted only when their input is genuinely needed." },
      { label: "Record", description: "The outcome is logged automatically, ready for the next report." },
    ],
  },
  "ai-solutions": {
    type: "workflow",
    steps: [
      { label: "Input", description: "A question, document, or request arrives from a customer or employee." },
      { label: "Reasoning", description: "The assistant interprets it against your own approved information." },
      { label: "Approval", description: "A defined boundary decides what's handled automatically versus escalated." },
      { label: "Action", description: "A response, an answer, or a processed document is delivered." },
    ],
  },
  "data-analytics": {
    type: "workflow",
    steps: [
      { label: "Centralise", description: "Data is pulled from scattered spreadsheets and platforms into one place." },
      { label: "Model", description: "Figures are structured consistently so different teams see the same numbers." },
      { label: "Visualise", description: "Dashboards are built around specific roles and decisions." },
      { label: "Decide", description: "Leadership acts on a current, trusted view instead of a delayed export." },
    ],
  },
  "digital-transformation-consulting": {
    type: "workflow",
    steps: [
      { label: "Assess", description: "Current systems, processes, and pain points are reviewed with the people involved." },
      { label: "Prioritise", description: "Opportunities are ranked by realistic impact and effort, not novelty." },
      { label: "Roadmap", description: "A phased plan sequences the work against business priorities." },
      { label: "Advise", description: "Build-versus-buy and vendor decisions are made with an independent view." },
    ],
  },
};

export const integrationsDiagram: SystemDiagramConfig = {
  type: "system",
  inputs: [{ label: "CRM" }, { label: "E-commerce" }, { label: "Support tool" }, { label: "Legacy system" }],
  outputs: [{ label: "Unified customer record" }, { label: "Automated workflows" }],
};
