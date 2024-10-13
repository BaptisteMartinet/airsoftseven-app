import type { TypedDocumentNode } from "@apollo/client";
import type { IdType } from "@core/api/types";

import { gql } from "@apollo/client";

export interface ClubDeleteMutationRes {
  club: {
    delete: boolean;
  };
}

export interface ClubDeleteMutationVars {
  id: IdType;
}

const ClubDeleteMutation: TypedDocumentNode<
  ClubDeleteMutationRes,
  ClubDeleteMutationVars
> = gql`
  mutation ClubDelete($id: ID!) {
    club {
      delete(id: $id)
    }
  }
`;

export default ClubDeleteMutation;
