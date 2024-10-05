import type { TypedDocumentNode } from "@apollo/client";
import type { IdType, OrderBy } from "@/core/api/types";

import { gql } from "@apollo/client";

export interface Field {
  id: IdType;
  slug: string;
  name: string;
  address: string;
}

export interface UserFieldsQueryRes {
  user: {
    fields: {
      count: number;
      nodes: Array<Field>;
    };
  };
}

export interface UserFieldsQueryVars {
  slug: string;
  order?: Array<OrderBy>;
  offset?: number;
  limit?: number;
}

const UserFieldsQuery: TypedDocumentNode<
  UserFieldsQueryRes,
  UserFieldsQueryVars
> = gql`
  query GetUserFields(
    $slug: String!
    $order: [FieldOrderBy!]
    $offset: Int
    $limit: Int
  ) {
    user(slug: $slug) {
      id
      fields(order: $order, offset: $offset, limit: $limit) {
        count
        nodes {
          id
          slug
          name
          address
        }
      }
    }
  }
`;

export default UserFieldsQuery;
