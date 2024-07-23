import type { Metadata } from "next";

import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/carousel/styles.css";
import "@mantine/notifications/styles.css";
import { createTheme, ColorSchemeScript, MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { ApolloProvider } from "@providers/index";

const theme = createTheme({});

import { getTranslations } from "next-intl/server";

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
        <ApolloProvider>
          <NextIntlClientProvider messages={messages}>
            <MantineProvider theme={theme}>
              <Notifications />
              {children}
            </MantineProvider>
          </NextIntlClientProvider>
        </ApolloProvider>
      </body>
    </html>
  );
}
