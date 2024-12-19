import type { NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";
import { Locales, DefaultLocale, Pathnames, NextIntlCookieName } from "./i18nConfig";

const LocaleCookieName = 'locale';

export default async function middleware(request: NextRequest) {
  const nextIntlMiddleware = createMiddleware({
    locales: Locales,
    defaultLocale: DefaultLocale,
    pathnames: Pathnames,
  });
  const response = nextIntlMiddleware(request);

  const nextIntlLocaleCookie = response.cookies.get(NextIntlCookieName) ?? request.cookies.get(NextIntlCookieName);
  const localeCookie = request.cookies.get(LocaleCookieName);
  if (nextIntlLocaleCookie && (!localeCookie || localeCookie.value !== nextIntlLocaleCookie.value)) {
    response.cookies.set(LocaleCookieName, nextIntlLocaleCookie.value, {
      maxAge: 31536000,
      path: '/',
      sameSite: 'lax',
      domain: process.env.NEXT_PUBLIC_NODE_ENV === 'production' ? `.${process.env.NEXT_PUBLIC_APP_DOMAIN}` : '',
    });
  }

  return response;
}

export const config = {
  matcher: ["/", "/(fr|en)/:path*"],
};
