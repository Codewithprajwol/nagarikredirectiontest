export type RedirectStatusCode = 301 | 302 | 307 | 308;

export interface RedirectRule {
  id: string;
  source: string;
  destination: string;
  statusCode: RedirectStatusCode;
  enabled: boolean;
  label: string;
  description: string;
  layer: "proxy" | "next-config";
}

/**
 * Central redirect rules for Nagarik Redirect Test.
 * Edit `statusCode` (301 or 302), `destination`, or `enabled` here —
 * both `proxy.ts` and the dashboard UI read from this file.
 */
export const PROXY_REDIRECT_RULES: RedirectRule[] = [
  {
    id: "old-news-301",
    source: "/old-news",
    destination: "/news",
    statusCode: 301,
    enabled: true,
    label: "Old News -> News",
    description: "Permanent 301 redirect from legacy /old-news path to /news.",
    layer: "proxy",
  },
  {
    id: "nagarik-paper-301",
    source: "/nagarik-paper",
    destination: "/epaper",
    statusCode: 301,
    enabled: true,
    label: "Nagarik Paper -> ePaper",
    description: "Permanent 301 redirect for old ePaper URL.",
    layer: "proxy",
  },
  {
    id: "legacy-article-301",
    source: "/legacy-article/:slug",
    destination: "/news/:slug",
    statusCode: 301,
    enabled: true,
    label: "Legacy Article Slug -> News Slug",
    description: "Permanent 301 pattern redirect preserving the :slug parameter.",
    layer: "proxy",
  },
  {
    id: "breaking-302",
    source: "/breaking",
    destination: "/news/nagarik-digital-launch",
    statusCode: 302,
    enabled: true,
    label: "Breaking -> Featured Story",
    description: "Temporary 302 redirect that can be pointed to any active story.",
    layer: "proxy",
  },
  {
    id: "promo-302",
    source: "/promo",
    destination: "/epaper",
    statusCode: 302,
    enabled: true,
    label: "Promo Campaign -> ePaper",
    description: "Temporary 302 campaign redirect.",
    layer: "proxy",
  },
  {
    id: "temp-politics-302",
    source: "/temp-politics",
    destination: "/politics",
    statusCode: 302,
    enabled: true,
    label: "Temp Politics -> Politics",
    description: "Temporary 302 redirect to the Politics section.",
    layer: "proxy",
  },
];

/**
 * Mirror of rules defined in `next.config.ts` so they appear in the dashboard.
 * To change these, edit `redirects()` in `next.config.ts` and restart the server.
 */
export const NEXT_CONFIG_REDIRECT_RULES: RedirectRule[] = [
  {
    id: "config-301",
    source: "/config-301",
    destination: "/news",
    statusCode: 301,
    enabled: true,
    label: "Config 301 -> News",
    description: "Permanent 301 configured directly in next.config.ts (statusCode: 301).",
    layer: "next-config",
  },
  {
    id: "config-302",
    source: "/config-302",
    destination: "/business",
    statusCode: 302,
    enabled: true,
    label: "Config 302 -> Business",
    description: "Temporary 302 configured directly in next.config.ts (statusCode: 302).",
    layer: "next-config",
  },
];

export const ALL_REDIRECT_RULES: RedirectRule[] = [
  ...PROXY_REDIRECT_RULES,
  ...NEXT_CONFIG_REDIRECT_RULES,
];

function matchPathPattern(
  pattern: string,
  pathname: string
): Record<string, string> | null {
  const patternParts = pattern.split("/").filter(Boolean);
  const pathParts = pathname.split("/").filter(Boolean);

  if (patternParts.length !== pathParts.length) {
    return null;
  }

  const params: Record<string, string> = {};

  for (let i = 0; i < patternParts.length; i++) {
    const p = patternParts[i];
    const actual = pathParts[i];

    if (p.startsWith(":")) {
      params[p.slice(1)] = actual;
    } else if (p !== actual) {
      return null;
    }
  }

  return params;
}

export function matchRedirectRule(
  pathname: string
): { rule: RedirectRule; destination: string } | null {
  const normalizedPath =
    pathname.length > 1 && pathname.endsWith("/")
      ? pathname.slice(0, -1)
      : pathname;

  for (const rule of PROXY_REDIRECT_RULES) {
    if (!rule.enabled) continue;

    const params = matchPathPattern(rule.source, normalizedPath);
    if (!params) continue;

    let destination = rule.destination;
    for (const [key, value] of Object.entries(params)) {
      destination = destination.replace(`:${key}`, value);
    }

    return { rule, destination };
  }

  return null;
}
