import type { TypedDocumentNode } from "@apollo/client";
import type { IdType } from "@core/api/types";

import { gql } from "@apollo/client";

export interface Session {
  session: {
    login: {
      token: string;
      expireAt: Date;
      user: {
        id: IdType;
        username: string;
      };
    };
  };
}

export interface LoginVariables {
  email: string;
  password: string;
}

const Login: TypedDocumentNode<Session, LoginVariables> = gql`
  mutation Login($email: String!, $password: String!) {
    session {
      login(email: $email, password: $password) {
        token
        expireAt
        user {
          id
          username
        }
      }
    }
  }
`;

export default Login;
