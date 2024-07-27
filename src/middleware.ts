import createMiddleware from "next-intl/middleware";
import { Locales, DefaultLocale, Pathnames } from "./i18nConfig";

export default createMiddleware({
  locales: Locales,
  defaultLocale: DefaultLocale,
  pathnames: Pathnames,
});

export const config = {
  matcher: ["/", "/(fr|en)/:path*"],
};
