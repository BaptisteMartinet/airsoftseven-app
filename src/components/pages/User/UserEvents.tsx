"use client";

import { useQuery } from "@apollo/client";
import { useTranslations } from "next-intl";
import { Skeleton } from "@mantine/core";
import { handlePromiseWithToast } from "@/core/utils/promise";
import { EventCard, PaginatedList } from "@/components/common";
import { UserEventsQuery } from "./api";

const PageSize = 10;

export interface UserEventsProps {
  slug: string;
}

export default function UserEvents(props: UserEventsProps) {
  const { slug } = props;
  const t_shared = useTranslations("shared");

  const { data, loading, fetchMore } = useQuery(UserEventsQuery, {
    variables: {
      slug,
      offset: 0,
      limit: PageSize,
      order: [{ field: "createdAt", ordering: "DESC" }],
    },
  });
  const events = data?.user.events.nodes ?? [];
  const eventsCount = data?.user.events.count ?? 0;

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
