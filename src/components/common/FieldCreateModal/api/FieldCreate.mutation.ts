import type { TypedDocumentNode } from "@apollo/client";
import type { IdType } from "@core/api/types";

import { gql } from "@apollo/client";

export interface Field {
  id: IdType;
  name: string;
}

export interface FieldCreateResult {
  field: {
    create: Field;
  };
}

export interface FieldCreateVariables {
  input: {
    name: string;
    description?: string | null;
    address: string;
    latitude: number;
    longitude: number;
    publicURL?: string | null;
  };
}

const ClubCreate: TypedDocumentNode<
  FieldCreateResult,
  FieldCreateVariables
> = gql`
  mutation CreateField($input: FieldCreateInput!) {
    field {
      create(input: $input) {
        id
        name
      }
    }
  }
`;

export default ClubCreate;
