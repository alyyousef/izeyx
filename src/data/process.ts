import type { ProcessStage } from "@/types/content";

export const processStages: ProcessStage[] = [
  {
    number: "01",
    title: "Discover",
    summary:
      "A structured conversation about how the business actually operates today, not a sales pitch. We're identifying real problems, not confirming a pre-decided solution.",
    clientContributes: [
      "Access to the people who run the process day to day",
      "Honest description of what currently works and what doesn't",
      "Any existing documentation, however informal",
    ],
    izeyxDelivers: [
      "A written summary of what we heard",
      "An initial view of where the biggest gaps are",
      "A clear scope for the diagnostic stage",
    ],
  },
  {
    number: "02",
    title: "Diagnose",
    summary:
      "We examine the specific systems, data, and workflows involved, and identify what's actually causing the delay, inconsistency, or disconnection.",
    clientContributes: [
      "Access to relevant systems or exports for review",
      "Context on past attempts to fix the problem",
    ],
    izeyxDelivers: [
      "A diagnostic summary naming the root causes, not just symptoms",
      "An early view of which service lines are actually relevant",
    ],
  },
  {
    number: "03",
    title: "Define",
    summary:
      "The problem, scope, and success criteria are written down and agreed before any design or build work starts.",
    clientContributes: [
      "Sign-off on scope and priorities",
      "Any constraints, including budget, timeline, and compliance, that we need to design around",
    ],
    izeyxDelivers: [
      "A defined scope of work",
      "Success criteria both sides agree on",
      "A realistic timeline and phasing plan",
    ],
  },
  {
    number: "04",
    title: "Design",
    summary:
      "User experience, information architecture, and technical architecture are designed together, so the visual design and the underlying system are consistent from the start.",
    clientContributes: [
      "Feedback on design directions at defined review points",
      "Brand assets and content where available",
    ],
    izeyxDelivers: [
      "UX and system design for review",
      "A technical architecture appropriate to the scope",
      "A content and asset checklist aligned to launch priorities",
    ],
  },
  {
    number: "05",
    title: "Build",
    summary:
      "Implementation happens in visible stages rather than one long build with no checkpoints, so issues surface early rather than at the end.",
    clientContributes: [
      "Timely feedback at each review point",
      "Decisions on any scope questions that arise during the build",
    ],
    izeyxDelivers: [
      "Working software or pages at each stage, not just progress reports",
      "A running list of decisions made and why",
    ],
  },
  {
    number: "06",
    title: "Integrate",
    summary:
      "The new system or site is connected to the tools you already use, such as CRM, booking, payments, and internal systems, rather than left to operate in isolation.",
    clientContributes: [
      "Access credentials or coordination with any third-party vendors involved",
    ],
    izeyxDelivers: [
      "Working integrations with the agreed systems",
      "Monitoring so integration failures are visible, not silent",
    ],
  },
  {
    number: "07",
    title: "Launch",
    summary:
      "Launch includes testing, handover, and training, not just making the system live and stepping away.",
    clientContributes: [
      "Availability for training sessions",
      "Final content or data needed to go live",
    ],
    izeyxDelivers: [
      "A tested, working system in production",
      "Documentation and training for the people who'll use it",
      "A clear support plan for the weeks immediately after launch",
    ],
  },
  {
    number: "08",
    title: "Improve",
    summary:
      "Launch is treated as the beginning of the system's life, not the end of the project. We stay on to maintain, fix, and evolve the system as the business changes.",
    clientContributes: [
      "Ongoing feedback from real use",
      "Notice of changing needs as the business grows",
    ],
    izeyxDelivers: [
      "Ongoing maintenance, monitoring, and security updates",
      "Ongoing feature improvements based on real usage",
      "Continuing technical support and system evolution",
    ],
  },
];
