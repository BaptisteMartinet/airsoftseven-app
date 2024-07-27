import type { PropsWithChildren } from "react";

import { MantineProvider as MantineWrapper, createTheme } from "@mantine/core";

const theme = createTheme({});

export default function MantineProvider(props: PropsWithChildren) {
  const { children } = props;
  return <MantineWrapper theme={theme}>{children}</MantineWrapper>;
}
