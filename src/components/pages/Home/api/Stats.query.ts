import type { TypedDocumentNode } from "@apollo/client";

import { gql } from "@apollo/client";

export interface StatsQueryRes {
  eventsCount: number;
  fieldsCount: number;
  clubsCount: number;
}

const StatsQuery: TypedDocumentNode<StatsQueryRes> = gql`
  query GetStats {
    eventsCount
    fieldsCount
    clubsCount
  }
`;

export default StatsQuery;
