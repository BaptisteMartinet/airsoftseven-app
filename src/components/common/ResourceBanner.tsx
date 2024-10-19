import type { ReactNode } from "react";

import { Box, Text, Title } from "@mantine/core";
import { useMobile } from '@/core/utils/hooks';

export interface ResourceBannerProps {
  resourceName: string;
  title: string;
  subtitle?: string;
  actions: ReactNode;
  bgColor: string;
}

export default function ResourceBanner(props: ResourceBannerProps) {
  const { resourceName, title, subtitle, actions, bgColor } = props;
  const mobile = useMobile();

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
        <Title size={mobile ? 22 : 70} lineClamp={1}>
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
