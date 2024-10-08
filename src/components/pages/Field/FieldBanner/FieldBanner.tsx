"use client";

import { useTranslations } from "next-intl";
import { useMantineTheme } from "@mantine/core";
import { ResourceBanner } from "@/components/common";

export interface FieldBannerProps {
  name: string;
}

export default function FieldBanner(props: FieldBannerProps) {
  const { name } = props;
  const t = useTranslations("pages.Field.FieldBanner");
  const theme = useMantineTheme();

  return (
    <ResourceBanner
      resourceName={t("resource")}
      title={name}
      actions={null}
      bgColor={theme.colors.green[8]}
    />
  );
}
