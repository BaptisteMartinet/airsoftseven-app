import type { Key, ReactNode } from "react";
import type { OffsetConnection } from "@/core/utils/apollo";

import React from "react";
import { useTranslations } from "next-intl";
import { Box, Text, ScrollArea, Group, Button } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";

export interface PaginatedListProps<T> extends OffsetConnection<T> {
  renderNode: (node: T) => ReactNode;
  getNodeKey: (node: T) => Key;
  onClickFetchMore: () => void;
}

export default function PaginatedList<T>(props: PaginatedListProps<T>) {
  const { count, nodes, renderNode, getNodeKey, onClickFetchMore } = props;
  const t = useTranslations("common.PaginatedList");
  return (
    <Box>
      <Text c="dimmed">{t("count", { count })}</Text>
      <ScrollArea offsetScrollbars>
        <Group wrap="nowrap">
          {nodes.map((node) => (
            <React.Fragment key={getNodeKey(node)}>
              {renderNode(node)}
            </React.Fragment>
          ))}
          {nodes.length !== count ? (
            <Button
              onClick={onClickFetchMore}
              variant="outline"
              rightSection={<IconPlus />}
              miw={200}
              mih={200}
            >
              {t("loadMore")}
            </Button>
          ) : null}
        </Group>
      </ScrollArea>
    </Box>
  );
}
