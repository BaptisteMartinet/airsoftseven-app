import type { Metadata } from "next";

import { getTranslations } from "next-intl/server";
import { query } from "@/core/apolloClient";
import { UserQuery } from "./api";

export interface PageProps {
  params: { locale: string; slug: string };
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const {
    params: { locale, slug },
  } = props;
  const t = await getTranslations({ locale, namespace: "shared" });
  const {
    data: { user },
  } = await query({ query: UserQuery, variables: { slug } });

  return {
    title: t("metadataTitle", { title: user.username }),
  };
}

export { default } from "@components/pages/User";
