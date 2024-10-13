import type { TypedDocumentNode } from "@apollo/client";
import type { IdType } from "@core/api/types";

import { gql } from "@apollo/client";

export interface Club {
  id: IdType;
  name: string;
}

export interface ClubCreate {
  club: {
    create: Club;
  };
}

export interface ClubCreateVariables {
  input: {
    name: string;
    description: string;
    rules: string;
    publicURL: string;
    acceptUnderage: boolean;
    rentals: boolean;
  };
}

const ClubCreate: TypedDocumentNode<ClubCreate, ClubCreateVariables> = gql`
  mutation ClubCreate($input: ClubCreateInput!) {
    club {
      create(input: $input) {
        id
        name
      }
    }
  }
`;

export default ClubCreate;
