"use client";

import { useTranslations } from "next-intl";
import { useMantineTheme } from "@mantine/core";
import type { IdType } from "@/core/api/types";
import { ResourceBanner } from "@/components/common";
import Actions from "./Actions";

export interface UserBannerProps {
  userId: IdType;
  username: string;
  reported: boolean;
}

export default function UserBanner(props: UserBannerProps) {
  const { userId, username, reported } = props;
  const t = useTranslations();
  const theme = useMantineTheme();

  return (
    <ResourceBanner
      resourceName={t("pages.User.UserBanner.resource")}
      title={username}
      actions={<Actions userId={userId} reported={reported} />}
      bgColor={theme.colors.blue[8]}
    />
  );
}
