import type { TypedDocumentNode } from "@apollo/client";
import type { IdType } from "@core/api/types";

import { gql } from "@apollo/client";

export interface Session {
  session: {
    login: {
      id: IdType;
      expireAt: Date;
      user: {
        id: IdType;
        slug: string;
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

export default Login;
