"use client";

import { useTranslations } from "next-intl";
import { useMantineTheme } from "@mantine/core";
import { ResourceBanner } from "@/components/common";
import Actions from "./Actions";

export interface EventBannerProps {
  title: string;
  date: number;
  club: {
    name: string;
  };
}

export default function EventBanner(props: EventBannerProps) {
  const { title, date, club } = props;
  const t = useTranslations("pages.Event.EventBanner");
  const theme = useMantineTheme();

  return (
    <ResourceBanner
      resourceName={t("resource")}
      title={title}
      subtitle={t("subtitle", { date: date, clubName: club.name })}
      actions={<Actions />}
      bgColor={theme.colors.grape[8]}
    />
  );
}
