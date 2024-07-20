import { NextRequest, NextResponse } from "next/server";

const locales = new Set(["fr", "en"]);

function getLocale(request: NextRequest) {
  // Detect browser language, check cookies?
  return "fr";
}

function pathnameHasLocal(pathname: string) {
  const [, local] = pathname.split("/");
  if (!local) return false;
  return locales.has(local);
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathnameHasLocal(pathname)) return;

  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    "/((?!_next|favicon.ico).*)",
    // Optional: only run on root (/) URL
    // "/",
  ],
};
