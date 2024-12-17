import type { ReactNode } from "react";

import { AspectRatio, Box, Group, Image, Overlay, Text, Title } from "@mantine/core";
import { useMobile } from '@/core/utils/hooks';

export interface ResourceBannerProps {
  resourceName: string;
  title: string;
  subtitle?: string;
  actions: ReactNode;
  imgSrc: string;
  imgAlt?: string;
}

export default function ResourceBanner(props: ResourceBannerProps) {
  const { resourceName, title, subtitle, actions, imgSrc, imgAlt } = props;
  const mobile = useMobile();

  return (
    <Box pos="relative" h={360}>
      <Image src={imgSrc} height="100%" alt={imgAlt} />
      <Overlay backgroundOpacity={0.3} blur={10} zIndex="auto">
        <Box
          pos="relative"
          h="100%"
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
      </Overlay>
    </Box>
  );
}
