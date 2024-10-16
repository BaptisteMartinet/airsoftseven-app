"use client";

import type { IdType } from "@/core/api/types";
import { useTranslations } from "next-intl";
import { useMantineTheme } from "@mantine/core";
import { ResourceBanner } from "@/components/common";
import Actions from "./Actions";

export interface ClubBannerProps {
  clubId: IdType;
  name: string;
  reported: boolean;
  user: {
    id: IdType;
  };
  events: {
    count: number;
  };
}

export default function ClubBanner(props: ClubBannerProps) {
  const { clubId, name, reported, user, events } = props;
  const t = useTranslations("pages.Club.ClubBanner");
  const theme = useMantineTheme();

  return (
    <ResourceBanner
      resourceName={t("resource")}
      title={name}
      actions={
        <Actions
          clubId={clubId}
          reported={reported}
          user={user}
          events={events}
        />
      }
      bgColor={theme.colors.orange[5]}
    />
  );
}
