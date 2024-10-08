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

export interface UserEventsQueryRes {
  user: {
    events: {
      count: number;
      nodes: Array<Event>;
    };
  };
}

export interface UserEventsQueryVars {
  slug: string;
  order?: Array<OrderBy>;
  offset?: number;
  limit?: number;
}

const UserEventsQuery: TypedDocumentNode<
  UserEventsQueryRes,
  UserEventsQueryVars
> = gql`
  query GetUserEvents(
    $slug: String!
    $order: [EventOrderBy!]
    $offset: Int
    $limit: Int
  ) {
    user(slug: $slug) {
      id
      events(order: $order, offset: $offset, limit: $limit) {
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
  }
`;

export default UserEventsQuery;
