"use client";

import React from "react";
import { useTranslations, useLocale } from "next-intl";
import { useParams } from "next/navigation";
import { ActionIcon, Menu } from "@mantine/core";
import { IconLanguage } from "@tabler/icons-react";
import { locales } from "@/i18nConfig";
import { useRouter, usePathname } from "@/navigation";

export default function LocalePicker() {
  const t = useTranslations("common.LocalePicker");
  const currentLocale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  const [isPending, startTransition] = React.useTransition();
  const onLocaleChange = (newLocale: string) => {
    startTransition(() => {
      router.replace(
        // @ts-expect-error
        { pathname, params },
        { locale: newLocale }
      );
    });
  };

  return (
    <Menu shadow="md" withArrow>
      <Menu.Target>
        <ActionIcon variant="transparent" size="sm">
          <IconLanguage />
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown>
        {locales.map((locale) => (
          <Menu.Item
            key={locale}
            onClick={() => onLocaleChange(locale)}
            disabled={isPending || locale === currentLocale}
          >
            {t("locale", { locale })}
          </Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
}
