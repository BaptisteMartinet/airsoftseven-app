"use client";

import React from "react";
import { useQuery } from "@apollo/client";
import { useTranslations } from "next-intl";
import { Box, Button } from "@mantine/core";
import { isNotEmpty } from "@mantine/form";
import { IconList, IconMap } from '@tabler/icons-react';
import { handlePromiseWithToast } from "@/core/utils/promise";
import { useMobile } from '@/core/utils/hooks';
import { redirect } from "@/navigation";
import { PageLayout } from "@/components/common";
import { EventsQuery } from "./api";
import { useForm, FormProvider, type EventsFormValues, DefaultDistanceMeters } from "./form";
import Filters from "./Filters";
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
  const t = useTranslations('pages.Events.EventsList');
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

  const isMobile = useMobile();
  const [mobileShowMap, setMobileShowMap] = React.useState(false);

  return (
    <FormProvider form={form}>
      <PageLayout>
        <Filters handleSubmit={handleSubmit} />
        <Box pos="relative" display="flex">
          {!isMobile || !mobileShowMap ? (
            <Box flex={3}>
              <EventsList
                events={events}
                eventsCount={eventsCount}
                loading={loading}
                onClickLoadMore={handleFetchMore}
              />
            </Box>
          ) : null}
          {!isMobile || mobileShowMap ? (
            <Box pos="relative" flex={2}>
              <Box className={classes.mapContainer}>
                <EventsMap events={events} />
              </Box>
            </Box>
          ) : null}
          <Button
            onClick={() => setMobileShowMap((prev) => !prev)}
            pos="absolute"
            bottom={40}
            left="50%"
            style={{ transform: "translateX(-50%)" }}
            rightSection={mobileShowMap ? <IconList /> : <IconMap />}
          >
            {mobileShowMap ? t('showListBtn') : t('showMapBtn')}
          </Button>
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
