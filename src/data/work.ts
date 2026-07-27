import type { CaseStudy } from "@/types/content";

const conceptNotice =
  "Your next success story could start here. This transformation concept shows how focused strategy, connected systems, and thoughtful delivery could bring a stronger way of working to life.";

export const caseStudies: CaseStudy[] = [
  {
    slug: "connected-business-transformation",
    projectName: "Connected business transformation",
    clientName: "Growing professional-services business",
    clientIsPlaceholder: true,
    clientIndustry: "Professional services",
    category: "Digital transformation",
    servicesInvolved: ["digital-transformation-consulting", "automation", "integrations"],
    challenge:
      "A growing professional-services business had accumulated separate tools for scheduling, invoicing, and client communication over several years, with no integrated view of a client relationship and no roadmap for what to fix first.",
    context: conceptNotice,
    approach:
      "The engagement would begin by assessing current systems and processes, prioritising the highest-friction gaps, and defining a phased roadmap for integration, automation, and a stronger client portal.",
    solution:
      "A connected operating layer could bring scheduling, invoicing, and communication together, supported by a client portal that replaces manual status updates with a clearer customer experience.",
    outcome: null,
    technology: ["Next.js", "PostgreSQL", "CRM integration", "Workflow automation"],
    testimonial: null,
    published: true,
    featured: true,
  },
  {
    slug: "connected-commerce-platform",
    projectName: "Connected commerce platform",
    clientName: "Ambitious retail business",
    clientIsPlaceholder: true,
    clientIndustry: "Retail & e-commerce",
    category: "Website & digital experience",
    servicesInvolved: ["websites-digital-experiences", "integrations"],
    challenge:
      "A retail business outgrowing a template store platform, with product, pricing, and fulfilment logic the template couldn't represent correctly.",
    context: conceptNotice,
    approach:
      "A tailored engagement would connect a distinctive storefront directly to inventory and fulfilment systems, with a content model the internal team can manage confidently.",
    solution:
      "The resulting platform could deliver a faster buying experience while replacing manual catalogue and order management with one connected commerce workflow.",
    outcome: null,
    technology: ["Next.js", "Headless commerce", "Payment integration"],
    testimonial: null,
    published: true,
    featured: true,
  },
  {
    slug: "operations-command-centre",
    projectName: "Operations command centre",
    clientName: "Scaling logistics operator",
    clientIsPlaceholder: true,
    clientIndustry: "Logistics",
    category: "Custom software",
    servicesInvolved: ["custom-software", "data-analytics"],
    challenge:
      "An operations team tracking jobs, drivers, and status updates across spreadsheets and phone calls, with no shared, current view of what was happening.",
    context: conceptNotice,
    approach:
      "The project would shape a role-based operations portal around the way teams actually manage jobs, replacing spreadsheet handoffs with a shared live workflow.",
    solution:
      "A single internal system could bring job status, assignment, and reporting into one dependable view for the entire operations team.",
    outcome: null,
    technology: ["React", "Node.js", "Role-based access control"],
    testimonial: null,
    published: true,
    featured: false,
  },
  {
    slug: "intelligent-enquiry-system",
    projectName: "Intelligent enquiry system",
    clientName: "Growing healthcare provider",
    clientIsPlaceholder: true,
    clientIndustry: "Healthcare services",
    category: "Automation",
    servicesInvolved: ["automation", "ai-solutions"],
    challenge:
      "A clinic losing enquiries between WhatsApp, phone, and email, with onboarding steps that depended on staff remembering each one manually.",
    context: conceptNotice,
    approach:
      "The engagement would connect enquiry channels, introduce intelligent lead routing, and create a structured onboarding journey supported by an assistant for common scheduling questions.",
    solution:
      "A connected intake and onboarding workflow could route every enquiry, trigger timely reminders, and help the team respond consistently without relying on manual follow-up.",
    outcome: null,
    technology: ["Workflow automation", "AI assistant", "CRM integration"],
    testimonial: null,
    published: true,
    featured: false,
  },
];

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find((item) => item.slug === slug);
}

export function getPublishedCaseStudies(): CaseStudy[] {
  return caseStudies.filter((item) => item.published);
}

export function getFeaturedCaseStudies(): CaseStudy[] {
  return caseStudies.filter((item) => item.published && item.featured);
}
