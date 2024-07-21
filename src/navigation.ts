import { createLocalizedPathnamesNavigation } from "next-intl/navigation";
import { locales, pathnames } from "./i18nConfig";

export const { Link, getPathname, redirect, usePathname, useRouter } =
  createLocalizedPathnamesNavigation({
    locales,
    pathnames,
  });
