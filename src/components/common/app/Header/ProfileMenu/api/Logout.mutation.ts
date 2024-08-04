import { gql } from "@apollo/client";

const LogoutMutation = gql`
  mutation Logout {
    session {
      logout
    }
  }
`;

export default LogoutMutation;
