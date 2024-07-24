import createMiddleware from "next-intl/middleware";
import { Locales, DefaultLocale } from "./i18nConfig";

export default createMiddleware({
  locales: Locales,
  defaultLocale: DefaultLocale,
});

export const config = {
  matcher: ["/", "/(fr|en)/:path*"],
};
