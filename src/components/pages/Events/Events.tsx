"use client";

import React from "react";
import { useQuery } from "@apollo/client";
import { useTranslations } from "next-intl";
import { Box } from "@mantine/core";
import { isNotEmpty } from "@mantine/form";
import { handlePromiseWithToast } from "@/core/utils/promise";
import { redirect } from "@/navigation";
import { PageLayout } from "@/components/common";
import { EventsQuery } from "./api";
import { useForm, FormProvider, type EventsFormValues } from "./form";
import Filters, { DefaultDistanceMeters } from "./Filters";
import EventsList from "./EventsList";
import EventsMap from "./EventsMap";
import classes from "./Events.module.css";

const PageSize = 30;

interface EventsPageProps {
  address: string;
  lat: number;
  lng: number;
}

function EventsPage(props: EventsPageProps) {
  const { address, lat, lng } = props;
  const t_shared = useTranslations("shared");
  const now = React.useRef(Date.now());

  const { data, loading, refetch, fetchMore } = useQuery(EventsQuery, {
    variables: {
      filters: {
        date: { gte: now.current },
      },
      order: [{ field: "date", ordering: "ASC" }],
      offset: 0,
      limit: PageSize,
      latitude: lat,
      longitude: lng,
      distance: DefaultDistanceMeters,
    },
  });
  const events = data?.events.nodes ?? [];
  const eventsCount = data?.events.count ?? 0;

  const handleFetchMore = () => {
    const promise = fetchMore({
      variables: {
        offset: events.length,
      },
    });
    handlePromiseWithToast(promise, {
      errorMessage: t_shared("error"),
    });
  };

  const form = useForm({
    initialValues: {
      address: address,
      latitude: lat,
      longitude: lng,
      distance: DefaultDistanceMeters,
    },
    validate: {
      address: isNotEmpty(),
      latitude: isNotEmpty(),
      longitude: isNotEmpty(),
    },
  });

  const handleSubmit = (values: EventsFormValues) => {
    const { latitude, longitude, distance } = values;
    const promise = refetch({ latitude, longitude, distance });
    handlePromiseWithToast(promise, {
      errorMessage: t_shared("error"),
    });
  };

  return (
    <FormProvider form={form}>
      <PageLayout>
        <Filters handleSubmit={handleSubmit} />
        <Box display="flex">
          <Box flex={3}>
            <EventsList
              events={events}
              eventsCount={eventsCount}
              loading={loading}
              onClickLoadMore={handleFetchMore}
            />
          </Box>
          <Box pos="relative" flex={2}>
            <Box className={classes.mapContainer}>
              <EventsMap events={events} />
            </Box>
          </Box>
        </Box>
      </PageLayout>
    </FormProvider>
  );
}

export interface EventsProps {
  searchParams: {
    address?: string;
    lat?: string;
    lng?: string;
  };
}

export default function Events(props: EventsProps) {
  const { searchParams } = props;
  const { address, lat: lat_, lng: lng_ } = searchParams;
  const lat = lat_ ? parseFloat(lat_) : null;
  const lng = lng_ ? parseFloat(lng_) : null;
  if (!(address && lat && lng)) return redirect("/");
  return <EventsPage address={address} lat={lat} lng={lng} />;
}
