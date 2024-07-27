import type { Metadata } from "next";

import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/carousel/styles.css";
import "@mantine/notifications/styles.css";
import { ColorSchemeScript } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import Providers from "@providers/Providers";

export async function generateMetadata({
  params: { locale },
}: Readonly<{ params: { locale: string } }>): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "Metadata" });
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function LocaleLayout(
  props: Readonly<{ children: React.ReactNode; params: { locale: string } }>
) {
  const { children, params } = props;
  const { locale } = params;
  const messages = await getMessages();
  return (
    <html lang={locale}>
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <NextIntlClientProvider messages={messages}>
          <Providers>
            <Notifications />
            {children}
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
