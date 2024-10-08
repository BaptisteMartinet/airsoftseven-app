"use client";

import React from "react";
import { useQuery } from "@apollo/client";
import { useTranslations } from "next-intl";
import { Skeleton } from "@mantine/core";
import { handlePromiseWithToast } from "@/core/utils/promise";
import { EventCard, PaginatedList } from "@/components/common";
import { ClubEventsQuery } from "./api";

const PageSize = 10;

export interface ClubEventsProps {
  slug: string;
}

export default function ClubEvents(props: ClubEventsProps) {
  const { slug } = props;
  const t_shared = useTranslations("shared");
  const now = React.useRef(Date.now());

  const { data, loading, fetchMore } = useQuery(ClubEventsQuery, {
    variables: {
      slug,
      offset: 0,
      limit: PageSize,
      filters: { date: { gte: now.current } },
      order: [{ field: "date", ordering: "ASC" }],
    },
  });
  const events = data?.club.events.nodes ?? [];
  const eventsCount = data?.club.events.count ?? 0;

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
