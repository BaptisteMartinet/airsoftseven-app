import type { TypedDocumentNode } from "@apollo/client";
import type { IdType } from "@core/api/types";

import { gql } from "@apollo/client";

export interface FieldDeleteMutationRes {
  authenticated: {
    field: {
      delete: boolean;
    };
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
    authenticated {
      field {
        delete(id: $id)
      }
    }
  }
`;

export default FieldDeleteMutation;
