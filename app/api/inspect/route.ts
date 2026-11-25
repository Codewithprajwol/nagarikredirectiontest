import { NextRequest, NextResponse } from "next/server";

export interface RedirectHop {
  step: number;
  url: string;
  path: string;
  status: number;
  statusText: string;
  location: string | null;
  ruleId: string | null;
  cacheControl: string | null;
}

function isSafeLocalPath(value: string): boolean {
  return value.startsWith("/") && !value.startsWith("//");
}

export async function GET(request: NextRequest) {
  const rawPath = request.nextUrl.searchParams.get("path") ?? "/old-news";

  if (!isSafeLocalPath(rawPath)) {
    return NextResponse.json(
      {
        error:
          "Invalid path. Please provide a relative path starting with '/' (for example /old-news).",
      },
      { status: 400 }
    );
  }

  const origin = request.nextUrl.origin;
  const hops: RedirectHop[] = [];
  let currentUrl = new URL(rawPath, origin);
  const maxHops = 10;

  try {
    for (let step = 1; step <= maxHops; step++) {
      const res = await fetch(currentUrl.toString(), {
        method: "GET",
        redirect: "manual",
        cache: "no-store",
        headers: {
          "x-nagarik-inspector": "1",
        },
      });

      const location = res.headers.get("location");
      const ruleId = res.headers.get("x-nagarik-redirect-rule");
      const cacheControl = res.headers.get("cache-control");

      hops.push({
        step,
        url: currentUrl.toString(),
        path: `${currentUrl.pathname}${currentUrl.search}`,
        status: res.status,
        statusText: res.statusText,
        location,
        ruleId,
        cacheControl,
      });

      const isRedirect = res.status >= 300 && res.status < 400 && location;
      if (!isRedirect) {
        break;
      }

      const nextUrl = new URL(location, currentUrl);
      if (nextUrl.origin !== origin) {
        break;
      }
      currentUrl = nextUrl;
    }

    return NextResponse.json(
      {
        requestedPath: rawPath,
        hops,
        finalStatus: hops.at(-1)?.status ?? null,
        initialStatus: hops[0]?.status ?? null,
      },
      {
        headers: {
          "Cache-Control": "no-store",
        },
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to inspect target path.",
      },
      { status: 500 }
    );
  }
}
