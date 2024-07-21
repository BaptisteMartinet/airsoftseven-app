import { Pathnames } from "next-intl/routing";

// Make sure matching JSON files exists in the 'translations' folder.
export const locales = ["fr", "en"] as const;
export const DefaultLocale = "fr";

export const translationsFolderName = "messages";

export const pathnames: Pathnames<typeof locales> = {
  "/": "/",
  // "/pathnames": { TODO when new page are added
  //   fr: "/pfadnamen",
  //   en: "/pathnames",
  // },
};
