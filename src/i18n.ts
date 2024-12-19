import { getRequestConfig } from "next-intl/server";
import { DefaultLocale, Locales, TranslationsFolderName } from "./i18nConfig";

export default getRequestConfig(async ({ locale }) => {
  const effectiveLocale = Locales.includes(locale) ? locale : DefaultLocale
  return {
    messages: (await import(`../${TranslationsFolderName}/${effectiveLocale}.json`)).default,
  };
});
