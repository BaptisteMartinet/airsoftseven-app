import type { TypedDocumentNode } from "@apollo/client";
import type { IdType } from "@core/api/types";

import { gql } from "@apollo/client";

export interface ClubDeleteMutationRes {
  authenticated: {
    club: {
      delete: boolean;
    };
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
    authenticated {
      club {
        delete(id: $id)
      }
    }
  }
`;

export default ClubDeleteMutation;
