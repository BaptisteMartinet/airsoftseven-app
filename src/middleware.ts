import createMiddleware from "next-intl/middleware";
import { locales, DefaultLocale } from "./i18nConfig";

export default createMiddleware({
  locales,
  defaultLocale: DefaultLocale,
});

export const config = {
  matcher: ["/", "/(fr|en)/:path*", "/((?!_next|_vercel|.*\\..*).*)"],
};
