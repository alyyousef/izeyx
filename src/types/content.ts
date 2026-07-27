export type FAQ = {
  question: string;
  answer: string;
};

export type ServiceUseCase = {
  title: string;
  description: string;
};

export type EngagementStep = {
  title: string;
  description: string;
};

export type Service = {
  slug: string;
  shortName: string;
  name: string;
  summary: string;
  problem: string;
  heroDescription: string;
  problems: string[];
  deliverables: string[];
  useCases: ServiceUseCase[];
  engagementApproach: EngagementStep[];
  relatedServiceSlugs: string[];
  faqs: FAQ[];
  diagram: "system" | "workflow" | "process" | "matrix" | "journey" | "lifecycle" | "roadmap";
};

export type CaseStudyField = {
  label: string;
  value: string;
};

export type CaseStudy = {
  slug: string;
  projectName: string;
  clientName: string;
  clientIsPlaceholder: boolean;
  clientIndustry: string;
  category: string;
  servicesInvolved: string[];
  challenge: string;
  context: string;
  approach: string;
  solution: string;
  outcome: string | null;
  technology: string[];
  testimonial: {
    quote: string;
    attribution: string;
  } | null;
  published: boolean;
  featured: boolean;
};

export type InsightArticle = {
  slug: string;
  title: string;
  description: string;
  category: string;
  author: string;
  publicationDate: string;
  readingTimeMinutes: number;
  tableOfContents: { id: string; label: string }[];
  content: InsightSection[];
  relatedSlugs: string[];
};

export type InsightSection =
  | { type: "paragraph"; id?: string; heading?: string; text: string }
  | { type: "pullquote"; text: string; attribution?: string }
  | { type: "list"; id?: string; heading?: string; items: string[] };

export type ProcessStage = {
  number: string;
  title: string;
  summary: string;
  clientContributes: string[];
  izeyxDelivers: string[];
};
