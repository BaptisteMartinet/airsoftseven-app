"use client";

import { useTranslations } from "next-intl";
import { useMantineTheme } from "@mantine/core";
import { ResourceBanner } from "@/components/common";
import Actions from "./Actions";

export interface UserBannerProps {
  username: string;
}

export default function UserBanner(props: UserBannerProps) {
  const { username } = props;
  const t = useTranslations();
  const theme = useMantineTheme();

  return (
    <ResourceBanner
      resourceName={t("pages.User.UserBanner.resource")}
      title={username}
      actions={<Actions />}
      bgColor={theme.colors.blue[8]}
    />
  );
}
