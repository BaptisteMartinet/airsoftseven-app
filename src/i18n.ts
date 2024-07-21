import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";
import { locales, translationsFolderName } from "./i18nConfig";

export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale as any)) notFound();
  return {
    messages: (await import(`../${translationsFolderName}/${locale}.json`)).default,
  };
});
