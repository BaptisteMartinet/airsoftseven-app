import type { TypedDocumentNode } from "@apollo/client";
import type { IdType } from "@/core/api/types";

import { gql } from "@apollo/client";

export interface Club {
  id: IdType;
  name: string;
  description: string | null;
  rules: string | null;
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

export interface ClubQueryRes {
  club: Club;
}

export interface ClubQueryVars {
  slug: string;
}

const ClubQuery: TypedDocumentNode<ClubQueryRes, ClubQueryVars> = gql`
  query GetClub($slug: String!) {
    club(slug: $slug) {
      id
      name
      description
      rules
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

export default ClubQuery;
