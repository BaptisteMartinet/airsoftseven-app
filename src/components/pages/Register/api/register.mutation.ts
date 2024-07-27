import type { TypedDocumentNode } from "@apollo/client";

import { gql } from "@apollo/client";

export interface RegisterVariables {
  code: string;
  username: string;
  email: string;
  password: string;
  newsletterOptIn?: boolean;
}

const RegisterMutation: TypedDocumentNode<boolean, RegisterVariables> = gql`
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
      )
    }
  }
`;

export default RegisterMutation;
