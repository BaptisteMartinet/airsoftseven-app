import type { PropsWithChildren } from "react";

import { Box, Text } from "@mantine/core";

export interface TitledContainerProps {
  title: string;
}

export default function TitledContainer(
  props: PropsWithChildren<TitledContainerProps>
) {
  const { title, children } = props;
  return (
    <Box>
      <Text size="lg" fw={500}>
        {title}
      </Text>
      {children}
    </Box>
  );
}
