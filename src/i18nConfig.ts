import { Pathnames as PathnamesT } from "next-intl/routing";

// Make sure matching JSON files exists in the 'translations' folder.
export const Locales = ["fr", "en"] as const;
export const DefaultLocale = "fr";

export const TranslationsFolderName = "messages";

export const Pathnames: PathnamesT<typeof Locales> = {
  "/": "/",
  "/register": {
    fr: "/inscription",
    en: "/register",
  },
  "/login": {
    fr: "/connexion",
    en: "/login",
  },
  "/event-create": {
    fr: "/nouvelle-partie",
    en: "/event-create",
  },
  "/event/[slug]": {
    fr: "/evenement/[slug]",
    en: "/event/[slug]",
  },
  "/events": {
    fr: "/evenements",
    en: "/events",
  },
};
