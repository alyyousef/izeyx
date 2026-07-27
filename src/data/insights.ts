import type { InsightArticle } from "@/types/content";

export const insightArticles: InsightArticle[] = [
  {
    slug: "is-this-process-worth-automating",
    title: "How to tell whether a process is actually worth automating",
    description:
      "Not every repetitive task deserves an automation project. A practical way to decide what to fix first, and what to leave alone for now.",
    category: "Business automation",
    author: "IZEYX Team",
    publicationDate: "2026-02-10",
    readingTimeMinutes: 6,
    tableOfContents: [
      { id: "the-question-that-matters", label: "The question that actually matters" },
      { id: "three-signals", label: "Three signals worth automating" },
      { id: "when-to-wait", label: "When it's worth waiting" },
      { id: "starting-point", label: "A reasonable starting point" },
    ],
    content: [
      {
        type: "paragraph",
        id: "the-question-that-matters",
        heading: "The question that actually matters",
        text:
          "Most businesses don't lack ideas for what to automate; they have a long list. The harder problem is deciding what's actually worth the effort right now. Before scoping any automation, it helps to ask two questions: what does this process cost when it's done manually in terms of delay, error, or duplicated work, and does that cost repeat often enough to justify fixing it?",
      },
      {
        type: "paragraph",
        text:
          "A process that happens twice a year, however annoying, rarely justifies a build. A process that happens fifty times a week, even a small one, usually does. Frequency and consistency matter more than how tedious a task feels in the moment.",
      },
      {
        type: "list",
        id: "three-signals",
        heading: "Three signals worth automating",
        items: [
          "The same information is typed into more than one system by hand.",
          "A process depends on one specific person remembering to do it.",
          "Delay in the process directly costs revenue or customer trust, most commonly during lead follow-up.",
        ],
      },
      {
        type: "pullquote",
        text:
          "Frequency and consistency matter more than how tedious a task feels in the moment.",
      },
      {
        type: "paragraph",
        id: "when-to-wait",
        heading: "When it's worth waiting",
        text:
          "Some processes aren't ready to automate yet, usually because the process itself isn't stable. If the steps still change every few weeks, or different people do it differently, automating too early just makes an inconsistent process faster to run inconsistently. It's often worth standardising the process manually first, then automating the stable version.",
      },
      {
        type: "paragraph",
        id: "starting-point",
        heading: "A reasonable starting point",
        text:
          "Start with the process that combines high frequency, real cost when delayed, and enough stability to define clearly. Lead routing and customer onboarding tend to meet all three for most growing businesses. That is usually where an automation programme starts, not because those processes are the most exciting, but because the return is the clearest.",
      },
    ],
    relatedSlugs: ["build-or-buy-a-practical-framework", "where-ai-actually-helps"],
  },
  {
    slug: "build-or-buy-a-practical-framework",
    title: "Build or buy: a practical framework for custom software decisions",
    description:
      "Custom software isn't automatically the right answer. A framework for deciding when a bespoke build earns its cost and when it doesn't.",
    category: "Custom software",
    author: "IZEYX Team",
    publicationDate: "2026-01-22",
    readingTimeMinutes: 7,
    tableOfContents: [
      { id: "default-bias", label: "The default bias, in both directions" },
      { id: "four-questions", label: "Four questions before deciding" },
      { id: "the-middle-path", label: "The middle path most businesses miss" },
    ],
    content: [
      {
        type: "paragraph",
        id: "default-bias",
        heading: "The default bias, in both directions",
        text:
          "Two default instincts tend to cause the same problem from opposite directions. One is to buy the nearest off-the-shelf tool because building sounds expensive. The other is to build custom software because an off-the-shelf tool feels like a compromise. Both defaults skip the actual analysis of what the business needs.",
      },
      {
        type: "list",
        id: "four-questions",
        heading: "Four questions before deciding",
        items: [
          "Is this process genuinely specific to how your business operates, or is it a common workflow that many businesses share?",
          "Would an off-the-shelf tool require you to change the process to fit the software, and is that an acceptable trade?",
          "What is the realistic cost of the workaround you're already using, over the next two to three years?",
          "Who inside the business would own and maintain a custom system once it exists?",
        ],
      },
      {
        type: "pullquote",
        text:
          "A tool built around a truly specific process usually earns its cost. A tool built to avoid a monthly subscription usually doesn't.",
      },
      {
        type: "paragraph",
        id: "the-middle-path",
        heading: "The middle path most businesses miss",
        text:
          "The most common mistake isn't choosing build or buy; it's treating the choice as one decision for the whole business instead of one decision per process. A business can reasonably buy its accounting software, integrate its CRM, and build one genuinely custom internal tool for the process that makes it different from competitors. Scoping each process on its own merits, rather than picking one philosophy for everything, usually produces a better outcome and a smaller bill.",
      },
    ],
    relatedSlugs: ["is-this-process-worth-automating", "why-a-website-is-a-system"],
  },
  {
    slug: "where-ai-actually-helps",
    title: "Where AI actually helps a growing business (and where it doesn't yet)",
    description:
      "A grounded look at where AI assistants create genuine value for a mid-sized business today, without the exaggerated claims.",
    category: "AI implementation",
    author: "IZEYX Team",
    publicationDate: "2026-03-05",
    readingTimeMinutes: 6,
    tableOfContents: [
      { id: "past-the-hype", label: "Past the hype" },
      { id: "where-it-helps", label: "Where it genuinely helps today" },
      { id: "where-to-be-cautious", label: "Where to be cautious" },
    ],
    content: [
      {
        type: "paragraph",
        id: "past-the-hype",
        heading: "Past the hype",
        text:
          "Most conversations about AI for a growing business start in the wrong place: with the technology, not the problem. A more useful starting question is the same one that applies to any other investment: is there a specific, repetitive task, with enough existing information to ground a solution, where the current manual approach is genuinely slow or inconsistent?",
      },
      {
        type: "list",
        id: "where-it-helps",
        heading: "Where it genuinely helps today",
        items: [
          "Answering repetitive customer questions that are already documented somewhere internally.",
          "Searching internal knowledge, including policies, past cases, and documentation, faster than a person can manually.",
          "Qualifying leads before they reach a salesperson, using information the business already collects.",
          "Speeding up document-heavy administrative work, with a person reviewing the output.",
        ],
      },
      {
        type: "pullquote",
        text:
          "The technology is not the constraint anymore. The constraint is usually whether the business has clear, current information to ground it in.",
      },
      {
        type: "paragraph",
        id: "where-to-be-cautious",
        heading: "Where to be cautious",
        text:
          "AI implementations struggle in the same places every time: tasks with no clear right answer, decisions with real consequences and no human review, and situations where the underlying information is outdated or contradictory. In those cases, the honest answer is usually to fix the underlying process or data through automation or better documentation before introducing an AI layer on top of it.",
      },
    ],
    relatedSlugs: ["is-this-process-worth-automating", "build-or-buy-a-practical-framework"],
  },
  {
    slug: "why-a-website-is-a-system",
    title: "Why a website should be treated as a system, not a brochure",
    description:
      "A website that isn't connected to how you actually sell and support customers is a cost centre, not a growth channel.",
    category: "Website strategy",
    author: "IZEYX Team",
    publicationDate: "2025-12-11",
    readingTimeMinutes: 5,
    tableOfContents: [
      { id: "the-brochure-trap", label: "The brochure trap" },
      { id: "what-a-system-looks-like", label: "What a connected website looks like" },
      { id: "the-practical-test", label: "A practical test" },
    ],
    content: [
      {
        type: "paragraph",
        id: "the-brochure-trap",
        heading: "The brochure trap",
        text:
          "A website that exists purely as a digital brochure, built once, rarely touched, and disconnected from the CRM or booking system, tends to quietly stop earning its cost. Visitors arrive, don't find a clear next step, and leave with no trace, while the team keeps working from separate tools that the site never talks to.",
      },
      {
        type: "paragraph",
        id: "what-a-system-looks-like",
        heading: "What a connected website looks like",
        text:
          "A website treated as a system does three things a brochure doesn't: it routes enquiries directly into the tool your team actually works from, it reflects current offerings without waiting on a developer for every change, and it shows what is working, including which pages, offers, and paths actually lead to a conversation.",
      },
      {
        type: "list",
        heading: "A practical test",
        id: "the-practical-test",
        items: [
          "Can someone update a price or an offer without asking a developer?",
          "Does an enquiry land directly in the CRM or inbox your team checks, without manual re-entry?",
          "Do you know which pages actually lead to a booked call, or only guess?",
        ],
      },
      {
        type: "pullquote",
        text:
          "If the answer to any of those is no, the site is still a brochure, however good it looks.",
      },
    ],
    relatedSlugs: ["build-or-buy-a-practical-framework", "where-ai-actually-helps"],
  },
];

export function getInsightBySlug(slug: string): InsightArticle | undefined {
  return insightArticles.find((article) => article.slug === slug);
}

export function getRelatedInsights(article: InsightArticle): InsightArticle[] {
  return article.relatedSlugs
    .map((slug) => getInsightBySlug(slug))
    .filter((value): value is InsightArticle => Boolean(value));
}
