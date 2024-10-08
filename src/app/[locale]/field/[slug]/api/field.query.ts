import type { TypedDocumentNode } from "@apollo/client";
import type { IdType } from "@/core/api/types";

import { gql } from "@apollo/client";

export interface Field {
  id: IdType;
  name: string;
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
    }
  }
`;

export default FieldQuery;
