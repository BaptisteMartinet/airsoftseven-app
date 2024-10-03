import type { TypedDocumentNode } from "@apollo/client";
import type { IdType } from "@/core/api/types";

import { gql } from "@apollo/client";

export interface FieldsQueryVars {
  limit: number;
  filters: {
    name: { contains: string };
  };
}

export interface Field {
  id: IdType;
  name: string;
}

export interface FieldsQueryResult {
  fields: {
    nodes: Array<Field>;
  };
}

const FieldsQuery: TypedDocumentNode<FieldsQueryResult, FieldsQueryVars> = gql`
  query GetFields($filters: FieldFilters, $limit: Int) {
    fields(filters: $filters, limit: $limit) {
      nodes {
        id
        name
      }
    }
  }
`;

export default FieldsQuery;
