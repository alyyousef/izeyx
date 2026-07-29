import { resolveSiteUrl } from "@/lib/site-url";

export const siteConfig = {
  name: "IZEYX",
  legalName: "IZEYX",
  domain: "izeyx.com",
  url: resolveSiteUrl(process.env.NEXT_PUBLIC_SITE_URL, process.env.NODE_ENV === "production"),
  tagline:
    "We help businesses modernise how they operate, sell, and serve their customers through technology, automation, and intelligent digital solutions.",
  defaultTitle: "IZEYX | Digital transformation and technology services",
  defaultDescription:
    "IZEYX designs and builds websites, custom software, automation, AI solutions, and connected digital systems that help growing businesses operate more effectively.",
  locale: "en_US",
  themeColor: "#3432c7",

  // Contact details shown on /contact, footer, and structured data.
  contact: {
    email: {
      value: "izeyxegy@gmail.com",
      isPlaceholder: false,
    },
    phone: {
      value: "+20 128 939 8185",
      href: "tel:+201289398185",
      isPlaceholder: false,
    },
    address: {
      value: "New Cairo, Cairo, Egypt",
      isPlaceholder: false,
    },
    hours: {
      value: "Sunday–Thursday, 9:00–18:00 (Cairo time)",
      isPlaceholder: false,
    },
  },

  // Google Maps location for the New Cairo office.
  location: {
    name: "IZEYX Digital Transformation",
    mapsUrl: "https://maps.app.goo.gl/vgL6WUpCdfD42qw36",
    mapsEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3454.5!2d31.4243468!3d29.9914139!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14583d00400de491%3A0xd4bb2aef862e956c!2sIzeyx%20Digital%20Transformation!5e0!3m2!1sen!2seg!4v1720000000000!5m2!1sen!2seg",
  },

  // Social / external links.
  social: {
    linkedin: {
      value: "https://www.linkedin.com/company/izeyx/",
      isPlaceholder: false,
    },
    twitter: {
      value: "https://x.com/izeyxegy",
      isPlaceholder: false,
    },
    booking: {
      value: "https://cal.com/izeyx/discovery-call",
      isPlaceholder: true,
    },
  },
} as const;

export const publicSocialLinks = [
  {
    id: "linkedin",
    label: "LinkedIn",
    href: siteConfig.social.linkedin.value,
    isPlaceholder: siteConfig.social.linkedin.isPlaceholder,
  },
  {
    id: "twitter",
    label: "X",
    href: siteConfig.social.twitter.value,
    isPlaceholder: siteConfig.social.twitter.isPlaceholder,
  },
  {
    id: "booking",
    label: "Book directly via calendar",
    href: siteConfig.social.booking.value,
    isPlaceholder: siteConfig.social.booking.isPlaceholder,
  },
].filter((link) => !link.isPlaceholder);

export type NavItem = {
  label: string;
  href: string;
};

export const primaryNav: NavItem[] = [
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "Process", href: "/process" },
  { label: "About", href: "/about" },
  { label: "Insights", href: "/insights" },
  { label: "Contact", href: "/contact" },
];

export const footerNav: {
  services: NavItem[];
  company: NavItem[];
  legal: NavItem[];
} = {
  services: [
    { label: "Websites & digital experiences", href: "/services/websites-digital-experiences" },
    { label: "Custom software", href: "/services/custom-software" },
    { label: "Automation", href: "/services/automation" },
    { label: "AI solutions", href: "/services/ai-solutions" },
    { label: "Integrations", href: "/services/integrations" },
    { label: "Data & analytics", href: "/services/data-analytics" },
    { label: "Transformation consulting", href: "/services/digital-transformation-consulting" },
  ],
  company: [
    { label: "About", href: "/about" },
    { label: "Process", href: "/process" },
    { label: "Work", href: "/work" },
    { label: "Insights", href: "/insights" },
    { label: "Contact", href: "/contact" },
  ],
  legal: [
    { label: "Privacy policy", href: "/privacy" },
    { label: "Terms of service", href: "/terms" },
  ],
};

export const ctaCopy = {
  primary: "Book a discovery call",
  secondary: "Explore our capabilities",
} as const;
