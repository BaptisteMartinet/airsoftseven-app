import type { TypedDocumentNode } from "@apollo/client";
import type { IdType } from "@/core/api/types";

import { gql } from "@apollo/client";

export interface EventQueryRes {
  event: {
    id: IdType;
    title: string;
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
    }
  }
`;

export default EventQuery;
