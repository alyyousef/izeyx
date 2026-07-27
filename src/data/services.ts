import type { Service } from "@/types/content";

export const services: Service[] = [
  {
    slug: "websites-digital-experiences",
    shortName: "Websites",
    name: "Websites & digital experiences",
    summary:
      "A website built as a business system and customer touchpoint, not a brochure that sits disconnected from how you actually sell and support customers.",
    problem:
      "The current website looks outdated, doesn't generate meaningful enquiries, or has no connection to the systems your team actually works in.",
    heroDescription:
      "We design and build corporate websites, service and e-commerce platforms, customer portals, booking experiences, and landing pages that are treated as part of your operating system. They connect to the CRM, inbox, or booking tool your team already uses instead of operating as a standalone brochure.",
    problems: [
      "The current website looks dated or doesn't reflect what the business actually does today.",
      "Enquiries arrive inconsistently, or visitors leave without a clear next step.",
      "Content updates require a developer for even small changes.",
      "The site has no connection to the CRM, booking tool, or inbox the team already uses.",
      "Page speed and mobile usability are poor enough to cost enquiries.",
    ],
    deliverables: [
      "Corporate and service websites with a clear conversion path",
      "E-commerce platforms",
      "Customer and client portals",
      "Booking and registration experiences",
      "Landing pages for specific offers or campaigns",
      "Website redesigns and performance/usability improvements",
      "Content models editors can update without a developer",
    ],
    useCases: [
      {
        title: "Service business replacing a dated brochure site",
        description:
          "A professional-services firm whose site hasn't changed in years, has no clear enquiry path, and doesn't reflect current offerings.",
      },
      {
        title: "Booking-driven business without a connected system",
        description:
          "A clinic, studio, or hospitality business taking bookings by phone or DM that needs an online booking flow connected to its calendar and CRM.",
      },
      {
        title: "E-commerce operation outgrowing a template store",
        description:
          "A retail or wholesale business whose store platform can't represent its catalogue, pricing logic, or fulfilment process correctly.",
      },
    ],
    engagementApproach: [
      {
        title: "Map the customer journey",
        description:
          "We start from what a visitor needs to understand and do, not from a list of pages, and identify where the current site loses people.",
      },
      {
        title: "Design the system, not just the screens",
        description:
          "Content structure, conversion paths, and integration points (CRM, booking, payments) are designed alongside the visual layout.",
      },
      {
        title: "Build, connect, and launch",
        description:
          "The site is built on a maintainable stack, connected to the tools you already use, and launched with a plan for who updates what.",
      },
    ],
    relatedServiceSlugs: ["custom-software", "integrations", "digital-transformation-consulting"],
    faqs: [
      {
        question: "Do you build on a CMS or a custom codebase?",
        answer:
          "It depends on who needs to edit content and how often. We'll recommend a content approach, from a lightweight structured-content setup to a full CMS, based on your team's editing needs rather than by default.",
      },
      {
        question: "Can you redesign our existing site without starting from zero?",
        answer:
          "Yes. We audit and preserve what's working, including content, SEO equity, and integrations, replacing only what's genuinely holding the site back.",
      },
      {
        question: "Do you handle hosting and ongoing updates after launch?",
        answer:
          "Yes, as an ongoing arrangement rather than a one-off handover. See hosting, maintenance, and continuing support below.",
      },
    ],
    diagram: "journey",
  },
  {
    slug: "custom-software",
    shortName: "Custom software",
    name: "Custom web applications",
    summary:
      "Internal tools, portals, and platforms built around how your team actually works, when off-the-shelf software forces you to work around it instead.",
    problem:
      "The business needs custom software but doesn't know how to define the project, or has outgrown a spreadsheet-based process with no clear alternative.",
    heroDescription:
      "We design and build administrative dashboards, customer and employee portals, workflow and approval systems, booking and registration systems, inventory interfaces, and reporting platforms. These secure, role-based tools are shaped around your actual operating process.",
    problems: [
      "Teams rely on spreadsheets for workflows they've outgrown, with no audit trail or shared visibility.",
      "Off-the-shelf software covers 80% of the need and fights you on the rest.",
      "Approval, request, or booking processes depend on one person remembering the steps.",
      "There's no single internal view of customers, jobs, inventory, or requests.",
      "The business isn't sure how to scope a custom build, or whether it needs one at all.",
    ],
    deliverables: [
      "Administrative dashboards and internal tools",
      "Customer and employee portals",
      "Workflow, request, and approval systems",
      "Booking and registration systems",
      "Inventory and operational interfaces",
      "Reporting platforms",
      "Secure, role-based access control",
    ],
    useCases: [
      {
        title: "Replacing a spreadsheet-based approval process",
        description:
          "A workflow that currently lives across shared spreadsheets and email threads, rebuilt as a system with roles, status, and a record of decisions.",
      },
      {
        title: "A portal for customers or partners",
        description:
          "A self-service view into orders, requests, or account status that currently requires a phone call or email to check.",
      },
      {
        title: "An operational dashboard for management",
        description:
          "A single internal view of jobs, bookings, or inventory that currently exists only across separate tools and files.",
      },
    ],
    engagementApproach: [
      {
        title: "Define the operating process",
        description:
          "We document how the process actually runs today, including the workarounds, before designing how it should run.",
      },
      {
        title: "Scope what's worth building",
        description:
          "We identify what should be custom-built, what should be bought, and what isn't worth automating yet, so the build stays proportional to the problem.",
      },
      {
        title: "Build in stages with visible progress",
        description:
          "The system is built and reviewed in working stages rather than delivered as one large release at the end.",
      },
    ],
    relatedServiceSlugs: ["automation", "integrations", "data-analytics"],
    faqs: [
      {
        question: "How do we know if we need custom software or an off-the-shelf tool?",
        answer:
          "We start every engagement by scoping the problem, not the software. If an existing tool genuinely fits, we'll say so. Custom work is recommended only where it creates real value over buying something.",
      },
      {
        question: "How is scope controlled on a custom build?",
        answer:
          "We define stages with a clear outcome for each, review working software at the end of each stage, and agree on any scope change before it's built. See our process for the full approach.",
      },
      {
        question: "Who maintains the system after launch?",
        answer:
          "We offer ongoing maintenance and feature development as a continuing arrangement, and we document the system so an internal team could take it over if you prefer.",
      },
    ],
    diagram: "lifecycle",
  },
  {
    slug: "automation",
    shortName: "Automation",
    name: "Business process automation",
    summary:
      "Removing the repetitive, manual steps between systems, such as lead routing, onboarding, approvals, reminders, and reporting, that currently depend on someone remembering to do them.",
    problem:
      "Employees repeatedly enter the same information into different systems, and processes depend on individual employees remembering what to do next.",
    heroDescription:
      "We automate the repetitive administrative work sitting between the systems you already use: lead capture and routing, customer onboarding, internal approvals, notifications and reminders, document generation, data entry, status updates, reporting, and follow-up.",
    problems: [
      "Leads are lost across WhatsApp, email, spreadsheets, and phone calls before anyone follows up.",
      "The same information is typed into two or three systems by hand.",
      "Reminders, follow-ups, and status updates depend on someone remembering to send them.",
      "Reporting takes hours to assemble manually before anyone can act on it.",
      "A process breaks down whenever the one person who knows the steps is unavailable.",
    ],
    deliverables: [
      "Lead capture and lead-routing automation",
      "Customer onboarding sequences",
      "Internal approval and notification workflows",
      "Document generation",
      "Automated status updates and reminders",
      "Reporting workflows",
      "Cross-platform information transfer between existing tools",
    ],
    useCases: [
      {
        title: "Lead routing across channels",
        description:
          "Enquiries from the website, WhatsApp, and phone routed to the right person automatically, with nothing left sitting in an inbox.",
      },
      {
        title: "Onboarding without manual chasing",
        description:
          "A new customer or employee onboarding sequence that sends the right document, form, or reminder at the right step without manual follow-up.",
      },
      {
        title: "Reporting that assembles itself",
        description:
          "A weekly or monthly report currently built by hand from several exports, replaced with one that assembles automatically from the source systems.",
      },
    ],
    engagementApproach: [
      {
        title: "Map the manual process end to end",
        description:
          "We trace exactly where information currently moves by hand, including the exceptions, before deciding what to automate.",
      },
      {
        title: "Automate the highest-friction steps first",
        description:
          "We prioritise the steps causing the most delay or error, rather than automating everything at once.",
      },
      {
        title: "Build in visibility and an exception path",
        description:
          "Every automation includes a way to see its status and a defined path for cases it can't handle automatically.",
      },
    ],
    relatedServiceSlugs: ["ai-solutions", "integrations", "custom-software"],
    faqs: [
      {
        question: "Will automation replace our team?",
        answer:
          "The goal is to remove repetitive administrative steps, not judgment-based work. Automation is scoped to reduce delay, inconsistency, and duplicated effort, not to replace the people making decisions.",
      },
      {
        question: "What happens when an automated process hits an exception?",
        answer:
          "We design an explicit exception path, such as a flagged case, a notification, or a fallback to manual review, so nothing silently fails.",
      },
      {
        question: "Do you use off-the-shelf automation tools or custom code?",
        answer:
          "Whichever is proportional to the problem. Straightforward workflows may use existing automation platforms; higher-volume or more complex processes may warrant custom-built automation.",
      },
    ],
    diagram: "workflow",
  },
  {
    slug: "ai-solutions",
    shortName: "AI solutions",
    name: "AI agents & intelligent assistants",
    summary:
      "AI applied only where it solves a genuine, specific business problem, such as support assistants, lead qualification, internal knowledge search, and document processing, with a human able to review and approve.",
    problem:
      "The company wants to use AI but doesn't know where it would create genuine value, or has software tools without an integrated way to apply AI to them.",
    heroDescription:
      "We implement customer-support assistants, internal knowledge assistants, lead-qualification agents, chatbots, employee support tools, intelligent search, automated response systems, and AI-assisted document processing. Each solution is scoped to a specific task with a defined boundary for what the AI decides versus what a person reviews.",
    problems: [
      "Customer questions are repetitive, but responses are slow because they all wait on a person.",
      "Employees can't quickly find answers buried in internal documents or past conversations.",
      "Leads aren't qualified before reaching sales, so time is spent on enquiries that were never a fit.",
      "Documents such as forms, contracts, and invoices are processed manually before anyone acts on them.",
      "Leadership wants to use AI but has no clear, scoped starting point.",
    ],
    deliverables: [
      "Customer-support assistants for common, repetitive questions",
      "Internal knowledge assistants over your own documents",
      "Lead-qualification agents",
      "AI-powered chatbots for defined tasks",
      "Intelligent search across internal content",
      "Automated response systems with human review",
      "AI-assisted document processing",
      "Custom AI integrations into existing workflows",
    ],
    useCases: [
      {
        title: "Support assistant for repetitive questions",
        description:
          "An assistant trained on your own documentation to answer the questions that make up most of your support volume, with a clear handoff to a person for anything else.",
      },
      {
        title: "Internal knowledge search",
        description:
          "A way for employees to ask a question in plain language and get an answer sourced from your own internal documents, instead of searching through folders.",
      },
      {
        title: "Lead qualification before handoff",
        description:
          "An agent that gathers the information sales needs before a lead reaches a person, reducing time spent on enquiries that were never a fit.",
      },
    ],
    engagementApproach: [
      {
        title: "Identify a genuine, bounded use case",
        description:
          "We start from a specific, repetitive task worth automating, not from 'adding AI' generally, and define what the assistant should and shouldn't do.",
      },
      {
        title: "Ground it in your own information",
        description:
          "Assistants are built against your actual documentation, policies, and data, with a defined escalation path when they don't have an answer.",
      },
      {
        title: "Review, adjust, and expand deliberately",
        description:
          "We review real interactions after launch and refine before expanding scope. Accuracy and appropriate escalation come before adding new capabilities.",
      },
    ],
    relatedServiceSlugs: ["automation", "integrations", "data-analytics"],
    faqs: [
      {
        question: "How do you decide whether AI is the right solution?",
        answer:
          "We look for a specific, repetitive, well-defined task with enough existing information to ground the assistant. If that doesn't exist, we'll recommend automation or a simpler tool instead.",
      },
      {
        question: "Can the assistant make mistakes?",
        answer:
          "Yes. That is why every implementation defines a clear boundary between what the assistant handles autonomously and what it escalates to a person, rather than presenting AI output as always final.",
      },
      {
        question: "What data does the assistant use?",
        answer:
          "Only the documents, policies, and data you provide and approve for use. We'll document exactly what sources are connected and how they're kept current.",
      },
    ],
    diagram: "workflow",
  },
  {
    slug: "integrations",
    shortName: "Integrations",
    name: "Systems integration",
    summary:
      "Making the CRM, e-commerce platform, support tool, and internal systems you already use actually talk to each other, instead of holding separate, disconnected versions of the truth.",
    problem:
      "Existing software doesn't communicate with other systems, so data is scattered across multiple files and platforms with no central view.",
    heroDescription:
      "We connect CRM platforms, ERP systems, e-commerce platforms, messaging and email systems, payment systems, support tools, internal applications, third-party APIs, marketing systems, and existing legacy systems, so information moves reliably between the tools your business already runs on.",
    problems: [
      "Customer data lives in different, disconnected versions across the CRM, inbox, and support tool.",
      "Orders, payments, or bookings don't automatically reach the systems that need to know about them.",
      "Someone manually exports and re-imports data between platforms on a recurring basis.",
      "A legacy system holds valuable data but doesn't connect to anything modern.",
      "Marketing, sales, and operations each see a different, partial picture of the customer.",
    ],
    deliverables: [
      "CRM and ERP integration",
      "E-commerce and payment system connections",
      "Messaging, email, and support-tool integration",
      "Marketing-system data flows",
      "Third-party API integrations",
      "Legacy-system connections",
      "A documented map of how data moves between systems",
    ],
    useCases: [
      {
        title: "CRM as the single source of truth",
        description:
          "Website enquiries, support conversations, and sales activity flowing into one CRM record instead of three disconnected ones.",
      },
      {
        title: "Orders reaching operations automatically",
        description:
          "An e-commerce or booking platform connected directly to fulfilment, inventory, or scheduling systems, removing manual re-entry.",
      },
      {
        title: "Legacy system brought into the current stack",
        description:
          "An older internal system that holds valuable operational data, connected to modern tools through an API or a purpose-built bridge.",
      },
    ],
    engagementApproach: [
      {
        title: "Map the current system landscape",
        description:
          "We document what systems exist, what data each one owns, and where information currently breaks or duplicates between them.",
      },
      {
        title: "Design the data flow, not just the connection",
        description:
          "We define which system is the source of truth for each type of information before building the integration itself.",
      },
      {
        title: "Build, monitor, and hand over documentation",
        description:
          "Integrations are built with monitoring for failures and documented so your team understands how data moves without needing to ask us.",
      },
    ],
    relatedServiceSlugs: ["data-analytics", "automation", "custom-software"],
    faqs: [
      {
        question: "Can you integrate systems that don't have a modern API?",
        answer:
          "Often, yes, through available export formats, database-level access, or a purpose-built bridge. We'll assess feasibility for your specific systems before scoping the work.",
      },
      {
        question: "What happens when an integration fails?",
        answer:
          "We build monitoring and alerts into every integration so failures are visible immediately rather than discovered days later through missing data.",
      },
      {
        question: "Do you work with the specific CRM/ERP/platform we already use?",
        answer:
          "Tell us what you're running during a discovery call and we'll confirm feasibility. Our approach is platform-agnostic rather than tied to one vendor.",
      },
    ],
    diagram: "system",
  },
  {
    slug: "data-analytics",
    shortName: "Data & analytics",
    name: "Data & analytics",
    summary:
      "Centralising operational data, building dashboards for the indicators that actually matter, and reducing the time spent assembling reports by hand.",
    problem:
      "Reporting takes too long, data is scattered across multiple files and platforms, and management has no central view of customers or operations.",
    heroDescription:
      "We help businesses centralise operational data, build dashboards, track relevant performance indicators, reduce spreadsheet fragmentation, and establish clearer data flows. The work is scoped to your actual reporting needs rather than sold as generic enterprise analytics.",
    problems: [
      "Reporting is assembled by hand from several spreadsheets every week or month.",
      "Different teams track different numbers, and nobody fully trusts any of them.",
      "There's no single, current view of the metrics leadership actually needs.",
      "Data exists but is hard to access without asking someone to pull it manually.",
      "Past reporting effort hasn't translated into decisions anyone actually acted on.",
    ],
    deliverables: [
      "Centralised operational data stores",
      "Dashboards for the indicators that matter to your business",
      "Reporting automation that removes manual assembly",
      "Reduced spreadsheet fragmentation",
      "Clearer, documented data flows between systems",
      "Scoped analytics, not a generic enterprise BI rollout",
    ],
    useCases: [
      {
        title: "One dashboard instead of five spreadsheets",
        description:
          "A weekly reporting routine that currently takes hours to assemble, replaced with a live dashboard pulling from the source systems directly.",
      },
      {
        title: "A shared view of the same numbers",
        description:
          "Sales, operations, and leadership working from one consistent set of figures instead of separately maintained versions that don't agree.",
      },
      {
        title: "Historical data made usable",
        description:
          "Years of operational data sitting in exports and old files, centralised into a form that can actually be queried and reported on.",
      },
    ],
    engagementApproach: [
      {
        title: "Identify the decisions the data should support",
        description:
          "We start from the decisions leadership actually needs to make, then work backward to the indicators and data required, not the reverse.",
      },
      {
        title: "Centralise before visualising",
        description:
          "We establish a reliable, current data flow first; a dashboard built on unreliable data creates false confidence rather than clarity.",
      },
      {
        title: "Build dashboards people actually use",
        description:
          "Dashboards are scoped to specific roles and decisions, reviewed with the people who'll use them, and adjusted based on real use.",
      },
    ],
    relatedServiceSlugs: ["integrations", "digital-transformation-consulting", "custom-software"],
    faqs: [
      {
        question: "Do we need a data warehouse for this to work?",
        answer:
          "Not necessarily. We scope the data infrastructure to the actual reporting need. Sometimes that means a lightweight centralised store; other times, it means a fuller warehouse. We won't recommend more than the problem needs.",
      },
      {
        question: "Can you work with the spreadsheets we already have?",
        answer:
          "Yes. Many engagements start by centralising and automating what currently lives in spreadsheets rather than replacing them outright on day one.",
      },
      {
        question: "How is this different from generic 'enterprise analytics'?",
        answer:
          "We scope data and dashboard work to your specific decisions and reporting needs. We won't propose an enterprise analytics rollout unless the business genuinely requires one.",
      },
    ],
    diagram: "matrix",
  },
  {
    slug: "digital-transformation-consulting",
    shortName: "Consulting",
    name: "Digital transformation consulting",
    summary:
      "Independent advice on what should be digitised, automated, built, or bought, and in what order, before any development work starts.",
    problem:
      "The business has technology tools but lacks an integrated operating model, and isn't sure how to prioritise technology investment.",
    heroDescription:
      "We advise on what should be digitised, which manual processes should be automated, which systems should be integrated, what software should be built versus purchased, how to prioritise technology investment, and how to phase implementation according to business priorities. We start from the business problem, not from a preferred technology.",
    problems: [
      "The business wants to modernise but doesn't know where to start or what to prioritise.",
      "Previous technology purchases didn't solve the underlying operational problem.",
      "Nobody has assessed whether to build custom software or buy an existing tool.",
      "There's no realistic roadmap connecting today's manual processes to a future connected system.",
      "Leadership wants to avoid unnecessary technology spend but also avoid falling further behind.",
    ],
    deliverables: [
      "An assessment of current systems, processes, and gaps",
      "A prioritised technology roadmap",
      "Build-versus-buy recommendations",
      "A phased implementation plan aligned to business priorities",
      "Guidance on avoiding unnecessary technology expenditure",
      "A starting brief for any resulting website, software, automation, or integration work",
    ],
    useCases: [
      {
        title: "A roadmap before committing to a large build",
        description:
          "A business considering a significant software investment that wants an independent assessment of what's actually needed before committing budget.",
      },
      {
        title: "Prioritising among several competing needs",
        description:
          "A leadership team facing automation, integration, and website needs simultaneously, that needs a realistic order of operations.",
      },
      {
        title: "Making sense of an accumulated tool stack",
        description:
          "A business that has adopted several tools over time without an integrated operating model, looking to rationalise before adding anything new.",
      },
    ],
    engagementApproach: [
      {
        title: "Assess current operations and systems",
        description:
          "We review how the business actually runs today, including its processes, tools, and pain points, through structured conversations with the people involved.",
      },
      {
        title: "Prioritise by business impact",
        description:
          "We rank opportunities by realistic impact and effort rather than by what's technically interesting, and flag where spend isn't justified yet.",
      },
      {
        title: "Deliver a roadmap you can act on with or without us",
        description:
          "The roadmap is written to be actionable on its own. Implementation with IZEYX is a next step, not a requirement of the engagement.",
      },
    ],
    relatedServiceSlugs: ["automation", "integrations", "data-analytics"],
    faqs: [
      {
        question: "Does the roadmap commit us to using IZEYX for implementation?",
        answer:
          "No. The roadmap is designed to be actionable on its own. Many clients choose to implement it with us because we already understand the context, but that's a separate decision.",
      },
      {
        question: "How long does a consulting engagement take?",
        answer:
          "It depends on the size of the business and the number of processes and systems in scope. We'll give a realistic estimate after an initial discovery conversation.",
      },
      {
        question: "Is this only for businesses planning a large transformation?",
        answer:
          "No. The same structured assessment works for a business trying to prioritise a handful of specific decisions, not only a full-scale transformation programme.",
      },
    ],
    diagram: "roadmap",
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}

export function getRelatedServices(service: Service): Service[] {
  return service.relatedServiceSlugs
    .map((slug) => getServiceBySlug(slug))
    .filter((value): value is Service => Boolean(value));
}
