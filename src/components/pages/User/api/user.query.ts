import type { TypedDocumentNode } from "@apollo/client";
import type { IdType } from "@/core/api/types";

import { gql } from "@apollo/client";

export interface User {
  id: IdType;
  username: string;
  events: {
    count: number;
  };
  clubs: {
    count: number;
  };
  fields: {
    count: number;
  };
}

export interface UserQueryRes {
  user: User;
}

export interface UserQueryVars {
  slug: string;
}

const UserQuery: TypedDocumentNode<UserQueryRes, UserQueryVars> = gql`
  query GetUser($slug: String!) {
    user(slug: $slug) {
      id
      username
      events {
        count
      }
      clubs {
        count
      }
      fields {
        count
      }
    }
  }
`;

export default UserQuery;
