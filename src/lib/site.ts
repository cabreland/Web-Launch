export const siteConfig = {
  name: "WebLaunch",
  shortName: "WebLaunch",
  url: "https://weblaunch.io",
  description:
    "Practitioner-led guides on AI automation, business operating systems, acquisition entrepreneurship, and enterprise-value creation — from an operator who has built, bought, and exited.",
  twitter: "@weblaunchio",
} as const;

export type NavItem = { label: string; href: string };

export const primaryNav: NavItem[] = [
  { label: "Learn", href: "/learn" },
  { label: "Builds", href: "/builds" },
  { label: "Platforms", href: "/platforms" },
  { label: "Industries", href: "/industries" },
  { label: "Community", href: "/community" },
  { label: "Work With Us", href: "/work-with-us" },
];

export const footerNav: { title: string; items: NavItem[] }[] = [
  {
    title: "Content",
    items: [
      { label: "AI Automation", href: "/learn/ai-automation" },
      { label: "Business Systems", href: "/learn/business-systems" },
      { label: "Exit Readiness", href: "/learn/exit-readiness" },
      { label: "Acquisition Finance", href: "/learn/acquisition-finance" },
    ],
  },
  {
    title: "Company",
    items: [
      { label: "About", href: "/about" },
      { label: "Builds", href: "/builds" },
      { label: "Community", href: "/community" },
      { label: "Work With Us", href: "/work-with-us" },
    ],
  },
  {
    title: "Resources",
    items: [
      { label: "Resource Library", href: "/resources" },
      { label: "Contact", href: "/contact" },
      { label: "Privacy Policy", href: "/privacy-policy" },
    ],
  },
];

export type AuthorKey = "chris" | "trevor";

export interface AuthorProfile {
  key: AuthorKey;
  name: string;
  title: string;
  bio: string;
  href: string;
  bioPending?: boolean;
}

export const authors: Record<AuthorKey, AuthorProfile> = {
  chris: {
    key: "chris",
    name: "Christopher Breland",
    title: "Founder, WebLaunch",
    bio:
      "Christopher Breland is Principal at a national M&A advisory firm managing $480M in active exits, CEO & Co-Founder of Scopecast AI, a Forbes School of Business board advisor, and the founder of a digital marketing agency he built and exited. WebLaunch is where he writes about the operating systems, AI automation, and financial mechanics behind building and exiting real businesses.",
    href: "/about#chris",
  },
  trevor: {
    key: "trevor",
    name: "Trevor",
    title: "Contributor, WebLaunch",
    bio:
      "Bio pending — placeholder copy. Replace before this author byline ships on any published article.",
    href: "/about#trevor",
    bioPending: true,
  },
};

export const clusterLabels: Record<string, string> = {
  "ai-automation": "AI Automation",
  "business-systems": "Business Systems",
  "exit-readiness": "Exit Readiness",
  "acquisition-finance": "Acquisition Finance",
};

export const clusterDescriptions: Record<string, string> = {
  "ai-automation":
    "Workflow automation, AI-powered operations, and systems integration for founders who'd rather build leverage than headcount.",
  "business-systems":
    "Operating systems, SOPs, and infrastructure that make a business run without the founder in every decision.",
  "exit-readiness":
    "What actually makes a business transferable — the operational and financial groundwork buyers pay a premium for.",
  "acquisition-finance":
    "Deal structuring, financing mechanics, and the numbers side of buying and selling businesses.",
};
