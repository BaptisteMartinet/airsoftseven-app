import type { LocalPageParams } from "@app/[local]/shared";

import { ensureLocalLanguage } from "@core/utils/language";
import { AppShell } from "@components/common";
import Hero from "./Hero";

export default function Main(props: { params: LocalPageParams }) {
  const { params } = props;
  const { local } = params;
  const language = ensureLocalLanguage(local);
  // const T = texts(language);
  return (
    <AppShell>
      <Hero />
    </AppShell>
  );
}
