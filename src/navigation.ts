import { createLocalizedPathnamesNavigation } from "next-intl/navigation";
import { Locales, Pathnames } from "./i18nConfig";

export const { Link, getPathname, redirect, usePathname, useRouter } =
  createLocalizedPathnamesNavigation({
    locales: Locales,
    pathnames: Pathnames,
  });
