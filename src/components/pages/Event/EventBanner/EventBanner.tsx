"use client";

import { useTranslations } from "next-intl";
import { useMantineTheme } from "@mantine/core";
import { IdType } from "@/core/api/types";
import { adjustTimestampToTimezone } from '@/core/utils/time';
import { ResourceBanner } from "@/components/common";
import Actions from "./Actions";

export interface EventBannerProps {
  eventId: IdType;
  title: string;
  date: number;
  dateTzOffset: number;
  reported: boolean;
  interested: boolean;
  interestsCount: number;
  club: {
    name: string;
  };
  author: {
    id: IdType;
  };
}

export default function EventBanner(props: EventBannerProps) {
  const {
    eventId,
    title,
    date,
    dateTzOffset,
    reported,
    interested,
    interestsCount,
    club,
    author,
  } = props;
  const t = useTranslations("pages.Event.EventBanner");
  const theme = useMantineTheme();

  const adjustedDate = adjustTimestampToTimezone(date, dateTzOffset);

  return (
    <ResourceBanner
      resourceName={t("resource")}
      title={title}
      subtitle={t("subtitle", { date: adjustedDate, clubName: club.name })}
      actions={
        <Actions
          eventId={eventId}
          reported={reported}
          interested={interested}
          interestsCount={interestsCount}
          author={author}
        />
      }
      bgColor={theme.colors.grape[8]}
    />
  );
}
