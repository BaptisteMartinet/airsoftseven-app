import type { Metadata } from "next";

import ApolloWrapper from "./ApolloWrapper";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/carousel/styles.css";
import { createTheme, ColorSchemeScript, MantineProvider } from "@mantine/core";

const theme = createTheme({});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout(
  props: Readonly<{ children: React.ReactNode }>
) {
  const { children } = props;
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <ApolloWrapper>
          <MantineProvider theme={theme}>{children}</MantineProvider>
        </ApolloWrapper>
      </body>
    </html>
  );
}
