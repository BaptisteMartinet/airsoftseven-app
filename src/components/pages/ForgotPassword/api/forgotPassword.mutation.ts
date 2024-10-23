import type { TypedDocumentNode } from "@apollo/client";

import { gql } from "@apollo/client";

export interface ForgotPasswordMutationRes {
  session: {
    forgotPassword: boolean;
  };
}

export interface ForgotPasswordMutationVars {
  email: string;
}

const ForgotPasswordMutation: TypedDocumentNode<
  ForgotPasswordMutationRes,
  ForgotPasswordMutationVars
> = gql`
  mutation ForgotPassword($email: String!) {
    session {
      forgotPassword(email: $email)
    }
  }
`;

export default ForgotPasswordMutation;
