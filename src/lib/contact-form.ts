export const serviceInterestOptions = [
  { value: "website-ecommerce", label: "Website or e-commerce" },
  { value: "custom-software", label: "Custom software" },
  { value: "automation", label: "Automation" },
  { value: "ai-solution", label: "AI solution" },
  { value: "systems-integration", label: "Systems integration" },
  { value: "data-dashboards", label: "Data and dashboards" },
  { value: "transformation-consulting", label: "Digital transformation consulting" },
  { value: "maintenance-support", label: "Maintenance and support" },
  { value: "not-sure", label: "Not sure yet" },
] as const;

export type ServiceInterestValue = (typeof serviceInterestOptions)[number]["value"];

// Maps a /services/[slug] route to the matching contact-form option, so a
// visitor arriving via "Discuss this service" lands with the right value
// preselected instead of picking it again.
export const serviceSlugToInterest: Record<string, ServiceInterestValue> = {
  "websites-digital-experiences": "website-ecommerce",
  "custom-software": "custom-software",
  automation: "automation",
  "ai-solutions": "ai-solution",
  integrations: "systems-integration",
  "data-analytics": "data-dashboards",
  "digital-transformation-consulting": "transformation-consulting",
};

export const timelineOptions = [
  { value: "asap", label: "As soon as possible" },
  { value: "1-3-months", label: "1–3 months" },
  { value: "3-6-months", label: "3–6 months" },
  { value: "exploring", label: "Just exploring" },
] as const;

export const budgetOptions = [
  { value: "small", label: "Small" },
  { value: "medium-small", label: "Medium-small" },
  { value: "medium", label: "Medium" },
  { value: "extensive", label: "Extensive" },
  { value: "not-sure", label: "Not sure yet" },
] as const;

export type ContactFormValues = {
  fullName: string;
  workEmail: string;
  phone: string;
  companyName: string;
  role: string;
  serviceInterest: string;
  problemDescription: string;
  timeline: string;
  budgetRange: string;
  consent: boolean;
};

export type ContactFieldErrors = Partial<Record<keyof ContactFormValues, string>>;

export type ContactFormState = {
  status: "idle" | "success" | "error" | "not_configured";
  message?: string;
  fieldErrors?: ContactFieldErrors;
  values?: ContactFormValues;
};

export const initialContactFormState: ContactFormState = { status: "idle" };
