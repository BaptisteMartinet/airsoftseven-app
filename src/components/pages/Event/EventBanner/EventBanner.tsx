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
  reported: boolean;
  club: {
    name: string;
  };
  author: {
    id: IdType;
  };
}

export default function EventBanner(props: EventBannerProps) {
  const { eventId, title, date, reported, club, author } = props;
  const t = useTranslations("pages.Event.EventBanner");
  const theme = useMantineTheme();

  return (
    <ResourceBanner
      resourceName={t("resource")}
      title={title}
      subtitle={t("subtitle", { date: date, clubName: club.name })}
      actions={<Actions eventId={eventId} reported={reported} author={author} />}
      bgColor={theme.colors.grape[8]}
    />
  );
}
