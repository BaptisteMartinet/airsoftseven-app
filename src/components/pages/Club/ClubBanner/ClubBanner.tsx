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
  author: {
    id: IdType;
  };
  events: {
    count: number;
  };
}

export default function ClubBanner(props: ClubBannerProps) {
  const { clubId, name, reported, author, events } = props;
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
          author={author}
          events={events}
        />
      }
      imgSrc="/banners/m4-closeup_512.jpg"
    />
  );
}
