import type { Metadata } from "next";

import { getTranslations } from "next-intl/server";
import { query } from "@/core/apolloClient";
import { FieldQuery } from "./api";

export interface PageProps {
  params: { locale: string; slug: string };
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const {
    params: { locale, slug },
  } = props;
  const t = await getTranslations({ locale, namespace: "shared" });
  const {
    data: { field },
  } = await query({ query: FieldQuery, variables: { slug } });

  return {
    title: t("metadataTitle", { title: field.name }),
  };
}

export { default } from "@components/pages/Field";
