import type { Metadata } from "next";

import { getTranslations } from "next-intl/server";
import { ColorSchemeScript } from "@mantine/core";
import Providers from "@providers/Providers";

export async function generateMetadata({
  params: { locale },
}: Readonly<{ params: { locale: string } }>): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "Metadata" });
  return {
    title: t("title"),
    description: t("description"),
    openGraph: {
      images: {
        url: 'https://airsoftseven.com/banners/m4-loadout_1920.jpg',
        width: 1920,
        height: 1280,
      },
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      images: {
        url: 'https://airsoftseven.com/banners/m4-loadout_1920.jpg',
        width: 1920,
        height: 1280,
      },
    },
  };
}

export default function LocaleLayout(
  props: Readonly<{ children: React.ReactNode; params: { locale: string } }>
) {
  const { children, params } = props;
  const { locale } = params;
  return (
    <html lang={locale}>
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
