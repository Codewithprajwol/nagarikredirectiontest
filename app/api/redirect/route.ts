import { NextRequest, NextResponse } from "next/server";

const ALLOWED_STATUS_CODES = new Set([301, 302, 307, 308]);

export async function GET(request: NextRequest) {
  const codeParam = Number(request.nextUrl.searchParams.get("code") ?? "302");
  const statusCode = ALLOWED_STATUS_CODES.has(codeParam) ? codeParam : 302;

  const rawTo = request.nextUrl.searchParams.get("to") ?? "/news";
  const safeTo =
    rawTo.startsWith("/") && !rawTo.startsWith("//") ? rawTo : "/news";

  const destinationUrl = new URL(safeTo, request.url);
  const response = NextResponse.redirect(destinationUrl, {
    status: statusCode,
  });

  response.headers.set("X-Nagarik-Redirect-Rule", `api-dynamic-${statusCode}`);
  response.headers.set("X-Nagarik-Redirect-Status", String(statusCode));

  return response;
}
