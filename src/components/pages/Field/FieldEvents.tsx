"use client";

import React from "react";
import { useQuery } from "@apollo/client";
import { useTranslations } from "next-intl";
import { Skeleton } from "@mantine/core";
import { handlePromiseWithToast } from "@/core/utils/promise";
import { EventCard, PaginatedList } from "@/components/common";
import { FieldEventsQuery } from "./api";

const PageSize = 10;

export interface FieldEventsProps {
  slug: string;
}

export default function FieldEvents(props: FieldEventsProps) {
  const { slug } = props;
  const t_shared = useTranslations("shared");
  const now = React.useRef(Date.now());

  const { data, loading, fetchMore } = useQuery(FieldEventsQuery, {
    variables: {
      slug,
      offset: 0,
      limit: PageSize,
      filters: { date: { gte: now.current } },
      order: [{ field: "date", ordering: "ASC" }],
    },
  });
  const events = data?.field.events.nodes ?? [];
  const eventsCount = data?.field.events.count ?? 0;

  const handleFetchMore = () => {
    const promise = fetchMore({ variables: { offset: events.length } });
    handlePromiseWithToast(promise, {
      errorMessage: t_shared("error"),
    });
  };

  if (loading) return <Skeleton height={300} />;

  return (
    <PaginatedList
      count={eventsCount}
      nodes={events}
      getNodeKey={(event) => event.id}
      renderNode={(event) => <EventCard event={event} />}
      onClickFetchMore={handleFetchMore}
    />
  );
}
