import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { matchRedirectRule } from "@/lib/redirect-rules";

export function proxy(request: NextRequest) {
  const match = matchRedirectRule(request.nextUrl.pathname);

  if (!match) {
    return NextResponse.next();
  }

  const destinationUrl = new URL(match.destination, request.url);

  // Preserve incoming query parameters unless already defined on destination
  request.nextUrl.searchParams.forEach((value, key) => {
    if (!destinationUrl.searchParams.has(key)) {
      destinationUrl.searchParams.set(key, value);
    }
  });

  const response = NextResponse.redirect(destinationUrl, {
    status: match.rule.statusCode,
  });

  response.headers.set("X-Nagarik-Redirect-Rule", match.rule.id);
  response.headers.set(
    "X-Nagarik-Redirect-Status",
    String(match.rule.statusCode)
  );

  return response;
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
