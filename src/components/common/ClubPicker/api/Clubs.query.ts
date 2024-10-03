import type { TypedDocumentNode } from "@apollo/client";
import type { IdType } from "@/core/api/types";

import { gql } from "@apollo/client";

export interface ClubsQueryVars {
  limit: number;
  filters: {
    name: { contains: string };
  };
}

export interface Club {
  id: IdType;
  name: string;
}

export interface ClubsQueryResult {
  clubs: {
    nodes: Array<Club>;
  };
}

const ClubsQuery: TypedDocumentNode<ClubsQueryResult, ClubsQueryVars> = gql`
  query Clubs($limit: Int, $filters: ClubFilters) {
    clubs(limit: $limit, filters: $filters) {
      nodes {
        id
        name
      }
    }
  }
`;

export default ClubsQuery;
