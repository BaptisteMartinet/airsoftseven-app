import type { TypedDocumentNode } from "@apollo/client";

import { gql } from "@apollo/client";

export interface VerifyEmailMutationVars {
  email: string;
}

const VerifyEmailMutation: TypedDocumentNode<
  boolean,
  VerifyEmailMutationVars
> = gql`
  mutation VerifyEmail($email: String!) {
    session {
      verifyEmail(email: $email)
    }
  }
`;

export default VerifyEmailMutation;
