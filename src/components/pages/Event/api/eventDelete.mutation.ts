import type { TypedDocumentNode } from "@apollo/client";
import type { IdType } from "@core/api/types";

import { gql } from "@apollo/client";

export interface EventDeleteMutationRes {
  event: {
    delete: boolean;
  };
}

export interface EventDeleteMutationVars {
  id: IdType;
}

const EventDeleteMutation: TypedDocumentNode<
  EventDeleteMutationRes,
  EventDeleteMutationVars
> = gql`
  mutation EventDelete($id: ID!) {
    event {
      delete(id: $id)
    }
  }
`;

export default EventDeleteMutation;
