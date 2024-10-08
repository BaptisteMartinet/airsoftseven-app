import type { TypedDocumentNode } from "@apollo/client";
import type { IdType, OrderBy } from "@/core/api/types";

import { gql } from "@apollo/client";

export interface Club {
  id: IdType;
  slug: string;
  name: string;
  description: string;
}

export interface UserClubsQueryRes {
  user: {
    clubs: {
      count: number;
      nodes: Array<Club>;
    };
  };
}

export interface UserClubsQueryVars {
  slug: string;
  order?: Array<OrderBy>;
  offset?: number;
  limit?: number;
}

const UserClubsQuery: TypedDocumentNode<
  UserClubsQueryRes,
  UserClubsQueryVars
> = gql`
  query GetUserClubs(
    $slug: String!
    $order: [ClubOrderBy!]
    $offset: Int
    $limit: Int
  ) {
    user(slug: $slug) {
      id
      clubs(order: $order, offset: $offset, limit: $limit) {
        count
        nodes {
          id
          slug
          name
          description
        }
      }
    }
  }
`;

export default UserClubsQuery;
