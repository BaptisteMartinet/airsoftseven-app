import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { Group, Tooltip, ActionIcon } from "@mantine/core";
import { IconLink } from "@tabler/icons-react";
import { handlePromiseWithToast } from "@/core/utils/promise";
import { copyToClipboard } from "@/core/utils/navigator";
import { makeAppURL } from "@/navigation";

export default function Actions() {
  const t = useTranslations("pages.User.UserBanner.Actions");
  const t_shared = useTranslations("shared");
  const pathname = usePathname();
  const locationURL = makeAppURL(pathname);

  return (
    <Group>
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
    </Group>
  );
}
