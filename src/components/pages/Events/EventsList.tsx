import type { Event } from "./api";

import { useTranslations } from "next-intl";
import {
  Box,
  Button,
  Grid,
  GridCol,
  Group,
  Skeleton,
  Text,
} from "@mantine/core";
import { EventCard } from "@/components/common";

export interface EventsListProps {
  events: Array<Event>;
  eventsCount: number;
  loading: boolean;
  onClickLoadMore: () => void;
}

export default function EventsList(props: EventsListProps) {
  const { events, eventsCount, loading, onClickLoadMore } = props;
  const t = useTranslations("pages.Events.EventsList");

  return (
    <Box px={10}>
      {loading ? (
        <Skeleton height={600} />
      ) : (
        <Box>
          <Text my={10} fw={500}>
            {t("eventsCount", { count: eventsCount })}
          </Text>
          <Grid columns={3}>
            {events.map((event) => (
              <GridCol key={event.id} span={1}>
                <EventCard event={event} />
              </GridCol>
            ))}
          </Grid>
          {events.length !== eventsCount ? (
            <Group mt={20} justify="center">
              <Button
                onClick={onClickLoadMore}
                loading={loading}
                variant="outline"
              >
                {t("loadMore")}
              </Button>
            </Group>
          ) : null}
        </Box>
      )}
    </Box>
  );
}