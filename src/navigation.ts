import { createLocalizedPathnamesNavigation } from "next-intl/navigation";
import { Locales, Pathnames } from "./i18nConfig";

export const { Link, getPathname, redirect, usePathname, useRouter } =
  createLocalizedPathnamesNavigation({
    locales: Locales,
    pathnames: Pathnames,
  });

export function makeAppURL(pathname: string) {
  return new URL(pathname, process.env.NEXT_PUBLIC_APP_BASE_URL);
}
