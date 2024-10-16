"use client";

import type { IdType } from "@/core/api/types";
import { useTranslations } from "next-intl";
import { useMantineTheme } from "@mantine/core";
import { ResourceBanner } from "@/components/common";
import Actions from "./Actions";

export interface FieldBannerProps {
  fieldId: IdType;
  name: string;
  reported: boolean;
  user: {
    id: IdType;
  };
  events: {
    count: number;
  };
}

export default function FieldBanner(props: FieldBannerProps) {
  const { fieldId, name, reported, user, events } = props;
  const t = useTranslations("pages.Field.FieldBanner");
  const theme = useMantineTheme();

  return (
    <ResourceBanner
      resourceName={t("resource")}
      title={name}
      actions={
        <Actions
          fieldId={fieldId}
          reported={reported}
          user={user}
          events={events}
        />
      }
      bgColor={theme.colors.green[8]}
    />
  );
}
