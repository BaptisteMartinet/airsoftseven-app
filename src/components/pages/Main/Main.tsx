import type { LocalePageParams } from "@app/[locale]/shared";

import { ensureLocalLanguage } from "@core/utils/language";
import { AppShell } from "@components/common";
import Hero from "./Hero";
import Faq from "./Faq";
import Team from "./Team";

export default function Main(props: { params: LocalePageParams }) {
  const { params } = props;
  const { locale } = params;
  const language = ensureLocalLanguage(locale);
  // const T = texts(language);
  return (
    <AppShell>
      <Hero />
      <Faq />
      <Team />
    </AppShell>
  );
}
