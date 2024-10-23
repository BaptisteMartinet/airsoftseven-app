import type { TypedDocumentNode } from "@apollo/client";

import { gql } from "@apollo/client";

export interface ResetPasswordMutationRes {
  session: {
    resetPassword: boolean;
  };
}

export interface ResetPasswordMutationVars {
  code: string;
  email: string;
  newPassword: string;
}

const ResetPasswordMutation: TypedDocumentNode<
  ResetPasswordMutationRes,
  ResetPasswordMutationVars
> = gql`
  mutation ResetPassword(
    $code: String!
    $email: String!
    $newPassword: String!
  ) {
    session {
      resetPassword(code: $code, email: $email, newPassword: $newPassword)
    }
  }
`;

export default ResetPasswordMutation;
