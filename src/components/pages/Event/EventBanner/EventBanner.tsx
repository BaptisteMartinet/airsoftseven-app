"use client";

import { useTranslations } from "next-intl";
import { useMantineTheme } from "@mantine/core";
import { IdType } from "@/core/api/types";
import { ResourceBanner } from "@/components/common";
import Actions from "./Actions";

export interface EventBannerProps {
  eventId: IdType;
  title: string;
  date: number;
  club: {
    name: string;
  };
  user: {
    id: IdType;
  };
}

export default function EventBanner(props: EventBannerProps) {
  const { eventId, title, date, club, user } = props;
  const t = useTranslations("pages.Event.EventBanner");
  const theme = useMantineTheme();

  return (
    <ResourceBanner
      resourceName={t("resource")}
      title={title}
      subtitle={t("subtitle", { date: date, clubName: club.name })}
      actions={<Actions eventId={eventId} user={user} />}
      bgColor={theme.colors.grape[8]}
    />
  );
}
