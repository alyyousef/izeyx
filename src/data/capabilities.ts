export type Capability = {
  number: string;
  title: string;
  problem: string;
  deliverables: string[];
  href: string;
  isPlaceholderLink?: boolean;
};

export const capabilities: Capability[] = [
  {
    number: "01",
    title: "Websites & digital experiences",
    problem: "The current site doesn't generate meaningful enquiries or reflect the business today.",
    deliverables: ["Corporate & service websites", "E-commerce platforms", "Customer portals", "Booking experiences"],
    href: "/services/websites-digital-experiences",
  },
  {
    number: "02",
    title: "Custom software & internal systems",
    problem: "Teams have outgrown spreadsheets but off-the-shelf tools don't fit the process.",
    deliverables: ["Admin dashboards", "Customer & employee portals", "Workflow systems", "Reporting platforms"],
    href: "/services/custom-software",
  },
  {
    number: "03",
    title: "Workflow automation",
    problem: "Repetitive manual work, including onboarding, lead routing, and approvals, depends on people remembering to do it.",
    deliverables: ["Lead routing", "Onboarding sequences", "Approval workflows", "Automated reporting"],
    href: "/services/automation",
  },
  {
    number: "04",
    title: "AI agents & assistants",
    problem: "The business wants to use AI but doesn't know where it would create genuine value.",
    deliverables: ["Support assistants", "Internal knowledge search", "Lead qualification", "Document processing"],
    href: "/services/ai-solutions",
  },
  {
    number: "05",
    title: "Systems integration",
    problem: "Existing software doesn't communicate, so data is scattered across platforms.",
    deliverables: ["CRM & ERP connections", "Payment & e-commerce integration", "Legacy system bridges"],
    href: "/services/integrations",
  },
  {
    number: "06",
    title: "Data & dashboards",
    problem: "Reporting takes too long and there's no central view of customers or operations.",
    deliverables: ["Centralised data", "Operational dashboards", "Automated reporting"],
    href: "/services/data-analytics",
  },
  {
    number: "07",
    title: "Transformation consulting",
    problem: "Technology decisions are made without a clear roadmap or priority order.",
    deliverables: ["Systems & process assessment", "Prioritised roadmap", "Build-versus-buy guidance"],
    href: "/services/digital-transformation-consulting",
  },
  {
    number: "08",
    title: "Ongoing support",
    problem: "Systems need maintenance, security updates, and continuing improvement after launch.",
    deliverables: ["Hosting coordination & monitoring", "Security updates", "Feature improvements", "Continuing technical support"],
    href: "/process",
  },
];
