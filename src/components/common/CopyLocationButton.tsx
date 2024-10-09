'use client'

import { useTranslations } from "next-intl";
import { Tooltip, ActionIcon } from "@mantine/core";
import { IconLink } from "@tabler/icons-react";
import { handlePromiseWithToast } from "@/core/utils/promise";
import { copyToClipboard } from "@/core/utils/navigator";
import { useAppURL } from "@/core/utils/hooks";

export default function CopyLocationButton() {
  const locationURL = useAppURL();
  const t = useTranslations("common.CopyLocationButton");
  const t_shared = useTranslations("shared");

  return (
    <Tooltip label={t("copyLink")}>
      <ActionIcon
        color="white"
        variant="transparent"
        onClick={() => {
          const promise = copyToClipboard(locationURL.href);
          handlePromiseWithToast(promise, {
            successMessage: t("copyLinkSuccess"),
            errorMessage: t_shared("error"),
          });
        }}
      >
        <IconLink />
      </ActionIcon>
    </Tooltip>
  );
}
