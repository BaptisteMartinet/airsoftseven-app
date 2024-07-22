import { createLocalizedPathnamesNavigation } from "next-intl/navigation";
import { Locales, pathnames } from "./i18nConfig";

export const { Link, getPathname, redirect, usePathname, useRouter } =
  createLocalizedPathnamesNavigation({
    locales: Locales,
    pathnames,
  });
