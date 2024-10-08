"use client";

import { useTranslations } from "next-intl";
import { useMantineTheme } from "@mantine/core";
import { ResourceBanner } from "@/components/common";

export interface ClubBannerProps {
  name: string;
}

export default function ClubBanner(props: ClubBannerProps) {
  const { name } = props;
  const t = useTranslations("pages.Club.ClubBanner");
  const theme = useMantineTheme();

  return (
    <ResourceBanner
      resourceName={t("resource")}
      title={name}
      actions={null}
      bgColor={theme.colors.red[8]}
    />
  );
}
