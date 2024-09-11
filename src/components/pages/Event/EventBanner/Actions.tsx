"use client";

import { useTranslations } from "next-intl";
import { ActionIcon, Group, Tooltip } from "@mantine/core";
import { IconShare, IconFlag, IconLink } from "@tabler/icons-react";
import { handlePromiseWithToast } from "@/core/utils/promise";
import { copyToClipboard } from "@/core/utils/navigator";

export default function Actions() {
  const t = useTranslations("pages.Event.EventBanner.Actions");
  const t_shared = useTranslations("shared");
  const locationURL = window.location.href;

  return (
    <Group>
      <Tooltip label={t("copyLink")}>
        <ActionIcon
          color="white"
          variant="transparent"
          onClick={() => {
            const promise = copyToClipboard(locationURL);
            handlePromiseWithToast(promise, {
              successMessage: t("copyLinkSuccess"),
              errorMessage: t_shared("error"),
            });
          }}
        >
          <IconLink />
        </ActionIcon>
      </Tooltip>
      <Tooltip label={t("share")}>
        <ActionIcon
          component="a"
          href={`https://www.facebook.com/share.php?u=${locationURL}`}
          target="_blank"
          color="white"
          variant="transparent"
        >
          <IconShare />
        </ActionIcon>
      </Tooltip>
      <Tooltip label={t("report")}>
        <ActionIcon color="white" variant="transparent">
          <IconFlag />
        </ActionIcon>
      </Tooltip>
    </Group>
  );
}
