import type { TypedDocumentNode } from "@apollo/client";
import type { IdType } from "@/core/api/types";

import { gql } from "@apollo/client";

export interface Session {
  id: IdType;
  expireAt: Date;
  user: {
    id: IdType;
    slug: string;
    username: string;
  };
}

export interface RegisterResult {
  session: {
    register: Session;
  };
}

export interface RegisterVariables {
  code: string;
  username: string;
  email: string;
  password: string;
  newsletterOptIn?: boolean;
}

const RegisterMutation: TypedDocumentNode<
  RegisterResult,
  RegisterVariables
> = gql`
  mutation Register(
    $code: String!
    $username: String!
    $email: String!
    $password: String!
    $newsletterOptIn: Boolean
  ) {
    session {
      register(
        code: $code
        username: $username
        email: $email
        password: $password
        newsletterOptIn: $newsletterOptIn
      ) {
        id
        expireAt
        user {
          id
          slug
          username
        }
      }
    }
  }
`;

export default RegisterMutation;
