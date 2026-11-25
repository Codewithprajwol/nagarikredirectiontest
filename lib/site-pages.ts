export interface SitePageInfo {
  path: string;
  title: string;
  section: string;
  filePath: string;
  description: string;
}

export interface ArticleItem {
  slug: string;
  title: string;
  category: string;
  publishedAt: string;
  author: string;
  summary: string;
  body: string[];
}

export const SITE_PAGES: SitePageInfo[] = [
  {
    path: "/",
    title: "Redirect Dashboard",
    section: "Home",
    filePath: "app/page.tsx",
    description:
      "Central dashboard with 301/302 rules table, live HTTP status inspector, and page directory.",
  },
  {
    path: "/news",
    title: "Nagarik News",
    section: "News",
    filePath: "app/news/page.tsx",
    description:
      "Main news landing page and target for /old-news (301) and /config-301 (301).",
  },
  {
    path: "/news/nagarik-digital-launch",
    title: "Featured Article (Dynamic Slug)",
    section: "Article",
    filePath: "app/news/[slug]/page.tsx",
    description:
      "Dynamic article template used as destination for /breaking (302) and /legacy-article/:slug (301).",
  },
  {
    path: "/epaper",
    title: "Nagarik ePaper",
    section: "ePaper",
    filePath: "app/epaper/page.tsx",
    description:
      "Digital newspaper edition page used as destination for /nagarik-paper (301) and /promo (302).",
  },
  {
    path: "/politics",
    title: "Politics",
    section: "Politics",
    filePath: "app/politics/page.tsx",
    description:
      "Politics coverage page used as destination for /temp-politics (302).",
  },
  {
    path: "/business",
    title: "Business & Economy",
    section: "Business",
    filePath: "app/business/page.tsx",
    description:
      "Business section page used as destination for /config-302 (302).",
  },
  {
    path: "/sports",
    title: "Sports",
    section: "Sports",
    filePath: "app/sports/page.tsx",
    description:
      "Sports section page ready for ad-hoc redirect targets and testing.",
  },
  {
    path: "/contact",
    title: "Contact & Editorial Info",
    section: "Contact",
    filePath: "app/contact/page.tsx",
    description:
      "Contact and editing guide page explaining how to modify pages and redirect rules.",
  },
];

export const SAMPLE_ARTICLES: ArticleItem[] = [
  {
    slug: "nagarik-digital-launch",
    title: "Nagarik Digital Portal Redirect Architecture Ready for Testing",
    category: "Featured",
    publishedAt: "2026-11-25",
    author: "Nagarik Digital Desk",
    summary:
      "This article route serves as a live destination for 302 temporary breaking-news redirects and 301 legacy article URL migrations.",
    body: [
      "Welcome to the Nagarik Digital Launch test article. When a visitor opens /breaking, the proxy issues an HTTP 302 Found response pointing directly here.",
      "Because 302 is temporary, search engines and browsers do not permanently cache the target URL, allowing editors to point /breaking to a different story at any time.",
      "To change where /breaking points, update the destination in lib/redirect-rules.ts or switch its statusCode between 301 and 302.",
    ],
  },
  {
    slug: "budget-update-2026",
    title: "Nepal Economic & Infrastructure Highlights 2026",
    category: "Business",
    publishedAt: "2026-11-24",
    author: "Economic Bureau",
    summary:
      "Sample article page for testing dynamic slug redirects such as /legacy-article/budget-update-2026 -> /news/budget-update-2026 (301).",
    body: [
      "This page demonstrates how dynamic slug parameters are preserved across a 301 Permanent Redirect.",
      "Any request to /legacy-article/:slug automatically forwards the slug segment and any query string parameters to /news/:slug with HTTP status 301.",
    ],
  },
  {
    slug: "kathmandu-metro-guide",
    title: "Kathmandu Urban Mobility & Public Services Update",
    category: "National",
    publishedAt: "2026-11-22",
    author: "City Correspondent",
    summary:
      "Additional sample article route so multiple news URLs can be tested and modified independently.",
    body: [
      "Having multiple article slugs makes it easy to test A/B destination switches, query-parameter preservation, and multi-hop redirect chains.",
      "You can edit SAMPLE_ARTICLES in lib/site-pages.ts or edit app/news/[slug]/page.tsx to customize article layout and metadata.",
    ],
  },
];

export function getArticleBySlug(slug: string): ArticleItem | undefined {
  return SAMPLE_ARTICLES.find((article) => article.slug === slug);
}
