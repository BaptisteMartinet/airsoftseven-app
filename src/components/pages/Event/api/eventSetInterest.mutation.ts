import type { TypedDocumentNode } from "@apollo/client";
import type { IdType } from "@core/api/types";

import { gql } from "@apollo/client";

export interface EventSetInterestMutationRes {
  event: {
    setInterest: { id: IdType };
  };
}

export interface EventSetInterestMutationVars {
  id: IdType;
}

const EventSetInterestMutation: TypedDocumentNode<
  EventSetInterestMutationRes,
  EventSetInterestMutationVars
> = gql`
  mutation EventSetInterest($id: ID!) {
    event {
      setInterest(id: $id) {
        id
      }
    }
  }
`;

export default EventSetInterestMutation;
