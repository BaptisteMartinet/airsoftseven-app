import type { TypedDocumentNode } from "@apollo/client";
import type { IdType } from "@core/api/types";

import { gql } from "@apollo/client";

export interface FieldDeleteMutationRes {
  field: {
    delete: boolean;
  };
}

export interface FieldDeleteMutationVars {
  id: IdType;
}

const FieldDeleteMutation: TypedDocumentNode<
  FieldDeleteMutationRes,
  FieldDeleteMutationVars
> = gql`
  mutation FieldDelete($id: ID!) {
    field {
      delete(id: $id)
    }
  }
`;

export default FieldDeleteMutation;
