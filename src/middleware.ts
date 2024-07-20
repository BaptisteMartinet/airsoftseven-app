import { NextRequest, NextResponse } from "next/server";
import { isSupportedLocal, DefaultLocal } from "@core/utils/language";

function getLocale(request: NextRequest) {
  // Detect browser language, check cookies?
  return DefaultLocal;
}

function pathnameContainsLocal(pathname: string) {
  const [, local] = pathname.split("/");
  if (!local) return false;
  return isSupportedLocal(local);
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathnameContainsLocal(pathname)) return;

  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: ["/((?!_next|favicon.ico).*)"],
};
