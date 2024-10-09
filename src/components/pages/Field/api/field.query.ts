import type { TypedDocumentNode } from "@apollo/client";
import type { IdType } from "@/core/api/types";

import { gql } from "@apollo/client";

export interface Field {
  id: IdType;
  name: string;
  description: string | null;
  address: string;
  latitude: number;
  longitude: number;
  publicURL: string | null;
  user: {
    id: IdType;
    slug: string;
    username: string;
  };
  events: {
    count: number;
  };
}

export interface FieldQueryRes {
  field: Field;
}

export interface FieldQueryVars {
  slug: string;
}

const FieldQuery: TypedDocumentNode<FieldQueryRes, FieldQueryVars> = gql`
  query GetField($slug: String!) {
    field(slug: $slug) {
      id
      name
      description
      address
      latitude
      longitude
      publicURL
      user {
        id
        slug
        username
      }
      events {
        count
      }
    }
  }
`;

export default FieldQuery;
