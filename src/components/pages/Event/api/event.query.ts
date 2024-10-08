import type { TypedDocumentNode } from "@apollo/client";
import type { IdType } from "@/core/api/types";

import { gql } from "@apollo/client";

export interface EventQueryRes {
  event: {
    id: IdType;
    title: string;
    description: string | null;
    date: number;
    durationDays: number;
    price: number | null;
    capacity: number | null;
    publicURL: string | null;
    club: {
      id: IdType;
      slug: string;
      name: string;
    };
    field: {
      id: IdType;
      slug: string;
      name: string;
      address: string;
      latitude: number;
      longitude: number;
    };
    user: {
      id: IdType;
      username: string;
    };
  };
}

export interface EventQueryVars {
  slug: string;
}

const EventQuery: TypedDocumentNode<EventQueryRes, EventQueryVars> = gql`
  query GetEvent($slug: String!) {
    event(slug: $slug) {
      id
      title
      description
      date
      durationDays
      price
      capacity
      publicURL
      club {
        id
        slug
        name
      }
      field {
        id
        slug
        name
        address
        latitude
        longitude
      }
      user {
        id
        username
      }
    }
  }
`;

export default EventQuery;
