import type { TypedDocumentNode } from "@apollo/client";
import type { IdType, NumericFilters, OrderBy } from "@/core/api/types";

import { gql } from "@apollo/client";

export interface Event {
  id: IdType;
  slug: string;
  title: string;
  date: number;
  dateTzOffset: number;
  capacity: number | null;
  club: {
    id: IdType;
    name: string;
    acceptUnderage: boolean | null;
    rentals: boolean | null;
  };
  field: {
    id: IdType;
    name: string;
    latitude: number;
    longitude: number;
  };
}

export interface EventsQueryRes {
  events: {
    count: number;
    nodes: Array<Event>;
  };
}

export interface EventsQueryVars {
  filters?: {
    date?: NumericFilters;
  };
  order?: Array<OrderBy>;
  offset?: number;
  limit?: number;
  latitude: number;
  longitude: number;
  distance: number;
}

const EventsQuery: TypedDocumentNode<EventsQueryRes, EventsQueryVars> = gql`
  query GetEvents(
    $filters: EventFilters
    $order: [EventOrderBy!]
    $offset: Int
    $limit: Int
    $latitude: Float!
    $longitude: Float!
    $distance: Int!
  ) {
    events(
      filters: $filters
      order: $order
      offset: $offset
      limit: $limit
      latitude: $latitude
      longitude: $longitude
      distance: $distance
    ) {
      count
      nodes {
        id
        slug
        title
        date
        dateTzOffset
        capacity
        club {
          id
          name
          acceptUnderage
          rentals
        }
        field {
          id
          name
          latitude
          longitude
        }
      }
    }
  }
`;

export default EventsQuery;
