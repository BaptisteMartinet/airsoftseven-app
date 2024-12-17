'use client'

import React, { type ReactNode } from 'react';
import { AspectRatio, Center, Paper, Text } from '@mantine/core';
import { useMobile } from '@/core/utils/hooks';

export interface DataCardProps {
  value: ReactNode,
  label: string,
  disableValueText?: boolean,
}

export default function DataCard(props: DataCardProps) {
  const { value, label, disableValueText } = props;
  const mobile = useMobile();

  const value_ = disableValueText ? (
    value
  ) : (
    <Text fz={mobile ? 20 : 45} fw={500} c="blue">{value}</Text>
  );

  return (
    <AspectRatio ratio={1}>
      <Paper shadow="sm" p="xs">
        <Center pos="relative" h="100%">
          {value_}
          <Text pos="absolute" bottom={0}>{label}</Text>
        </Center>
      </Paper>
    </AspectRatio>
  );
}