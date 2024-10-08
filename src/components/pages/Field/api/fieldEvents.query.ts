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

export interface FieldEventsQueryRes {
  field: {
    id: IdType;
    events: {
      count: number;
      nodes: Array<Event>;
    };
  };
}

export interface FieldEventsQueryVars {
  slug: string;
  order?: Array<OrderBy>;
  filters?: {
    date?: { gte?: number };
  };
  offset?: number;
  limit?: number;
}

const FieldEventsQuery: TypedDocumentNode<
  FieldEventsQueryRes,
  FieldEventsQueryVars
> = gql`
  query GetFieldEvents(
    $slug: String!
    $order: [EventOrderBy!]
    $filters: EventFilters
    $offset: Int
    $limit: Int
  ) {
    field(slug: $slug) {
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

export default FieldEventsQuery;
