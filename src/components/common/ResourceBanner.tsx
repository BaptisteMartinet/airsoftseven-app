import type { ReactNode } from "react";

import { Box, Text, Title } from "@mantine/core";

export interface ResourceBannerProps {
  resourceName: string;
  title: string;
  subtitle?: string;
  actions: ReactNode;
  bgColor: string;
}

export default function ResourceBanner(props: ResourceBannerProps) {
  const { resourceName, title, subtitle, actions, bgColor } = props;

  return (
    <Box
      pos="relative"
      h={400}
      bg={bgColor}
      c="white"
      display="flex"
      style={{ alignItems: "center", justifyContent: "center" }}
    >
      <Box>
        <Text fw={500}>{resourceName}</Text>
        <Title size={75} lineClamp={1}>
          {title}
        </Title>
        {subtitle ? <Text ta="right">{subtitle}</Text> : null}
      </Box>
      <Box pos="absolute" bottom={20} right={20}>
        {actions}
      </Box>
    </Box>
  );
}
