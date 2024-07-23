import type { TypedDocumentNode } from "@apollo/client";
import type { IdType } from '@core/api/types';

import { gql } from "@apollo/client";

export interface Session {
  token: string;
  user: {
    id: IdType;
    username: string;
  };
}

export interface LoginVariables {
  email: string;
  password: string;
}

const Login: TypedDocumentNode<Session, LoginVariables> = gql`
  mutation Login {
    session {
      login(email: "baptiste.marti@outlook.com", password: "123") {
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
