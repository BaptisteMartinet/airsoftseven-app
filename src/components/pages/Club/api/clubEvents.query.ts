import type { TypedDocumentNode } from "@apollo/client";
import type { IdType, OrderBy } from "@/core/api/types";

import { gql } from "@apollo/client";

export interface Event {
  id: IdType;
  slug: string;
  title: string;
  date: number;
  capacity: number | null;
  club: {
    id: IdType;
    name: string;
  };
  field: {
    id: IdType;
    name: string;
  };
}

export interface ClubEventsQueryRes {
  club: {
    id: IdType;
    events: {
      count: number;
      nodes: Array<Event>;
    };
  };
}

export interface ClubEventsQueryVars {
  slug: string;
  order?: Array<OrderBy>;
  filters?: {
    date?: { gte?: number };
  };
  offset?: number;
  limit?: number;
}

const ClubEventsQuery: TypedDocumentNode<
  ClubEventsQueryRes,
  ClubEventsQueryVars
> = gql`
  query GetClubEvents(
    $slug: String!
    $order: [EventOrderBy!]
    $filters: EventFilters
    $offset: Int
    $limit: Int
  ) {
    club(slug: $slug) {
      id
      events(order: $order, filters: $filters, offset: $offset, limit: $limit) {
        count
        nodes {
          id
          slug
          title
          date
          capacity
          club {
            id
            name
          }
          field {
            id
            name
          }
        }
      }
    }
  }
`;

export default ClubEventsQuery;
