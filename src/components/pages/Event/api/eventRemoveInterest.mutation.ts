import type { TypedDocumentNode } from "@apollo/client";
import type { IdType } from "@core/api/types";

import { gql } from "@apollo/client";

export interface EventRemoveInterestMutationRes {
  event: {
    removeInterest: { id: IdType };
  };
}

export interface EventRemoveInterestMutationVars {
  id: IdType;
}

const EventRemoveInterestMutation: TypedDocumentNode<
  EventRemoveInterestMutationRes,
  EventRemoveInterestMutationVars
> = gql`
  mutation EventRemoveInterest($id: ID!) {
    event {
      removeInterest(id: $id) {
        id
      }
    }
  }
`;

export default EventRemoveInterestMutation;
