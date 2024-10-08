import type { TypedDocumentNode } from "@apollo/client";
import type { IdType } from "@/core/api/types";

import { gql } from "@apollo/client";

export interface Club {
  id: IdType;
  name: string;
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
    }
  }
`;

export default ClubQuery;
