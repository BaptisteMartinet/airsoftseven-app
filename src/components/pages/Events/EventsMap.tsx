"use client";
import type { Event } from "./api";

import React from "react";
import {
  Map as GMap,
  AdvancedMarker,
  InfoWindow,
} from "@vis.gl/react-google-maps";
import { Badge, Stack } from "@mantine/core";
import { indexMultipleArrayItems, makeArrayUniq } from "@core/utils/array";
import { EventCard } from "@/components/common";
import { useFormContext } from "./form";

export interface EventsMapProps {
  events: Array<Event>;
}

export default function EventsMap(props: EventsMapProps) {
  const { events } = props;
  const form = useFormContext();
  const formValues = form.getValues();

  const [center, setCenter] = React.useState(() => ({
    lat: formValues.latitude,
    lng: formValues.longitude,
  }));

  React.useEffect(() => {
    setCenter({ lat: formValues.latitude, lng: formValues.longitude });
  }, [formValues.latitude, formValues.longitude]);

  const [selectedEvents, setSelectedEvents] =
    React.useState<Array<Event> | null>(null);

  const groupedEvents = React.useMemo(
    () =>
      indexMultipleArrayItems(
        events,
        (event) => `${event.field.latitude}:${event.field.longitude}`
      ),
    [events]
  );

  return (
    <GMap
      mapId={process.env.NEXT_PUBLIC_EVENTS_MAP_ID}
      center={center}
      onCenterChanged={(event) => setCenter(event.detail.center)}
      defaultZoom={10}
      disableDefaultUI
      clickableIcons={false}
      onClick={() => setSelectedEvents(null)}
    >
      {Array.from(groupedEvents.values()).map((events) => {
        const firstEvent = events[0]; // Safe
        const position: google.maps.LatLngLiteral = {
          lat: firstEvent.field.latitude,
          lng: firstEvent.field.longitude,
        };
        const clubNames = makeArrayUniq(
          events.map((event) => event.field.name)
        );
        return (
          <AdvancedMarker
            key={firstEvent.id}
            position={position}
            onClick={() => setSelectedEvents(events)}
          >
            <Badge size="sm" color="orange">
              {`${clubNames.join(", ")} (${events.length})`}
            </Badge>
          </AdvancedMarker>
        );
      })}
      {selectedEvents ? (
        <InfoWindow
          position={{
            lat: selectedEvents[0].field.latitude,
            lng: selectedEvents[0].field.longitude,
          }}
          onCloseClick={() => {
            setSelectedEvents(null);
          }}
        >
          <Stack>
            {selectedEvents.map((event) => (
              <EventCard key={event.id} event={event} small />
            ))}
          </Stack>
        </InfoWindow>
      ) : null}
    </GMap>
  );
}
