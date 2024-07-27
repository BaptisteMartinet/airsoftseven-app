import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";
import { Locales, TranslationsFolderName } from "./i18nConfig";

export default getRequestConfig(async ({ locale }) => {
  if (!Locales.includes(locale as any)) notFound();
  return {
    messages: (await import(`../${TranslationsFolderName}/${locale}.json`)).default,
  };
});
