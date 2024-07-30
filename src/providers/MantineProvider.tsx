import type { PropsWithChildren } from "react";

import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/carousel/styles.css";
import "@mantine/notifications/styles.css";
import { MantineProvider as MantineWrapper, createTheme } from "@mantine/core";
import { Notifications } from "@mantine/notifications";

const theme = createTheme({});

export default function MantineProvider(props: PropsWithChildren) {
  const { children } = props;
  return (
    <MantineWrapper theme={theme}>
      {children}
      <Notifications />
    </MantineWrapper>
  );
}
