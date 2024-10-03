import type { TypedDocumentNode } from "@apollo/client";
import type { IdType } from "@/core/api/types";

import { gql } from "@apollo/client";

export interface EventCreateMutationResult {
  authenticated: {
    event: {
      create: {
        id: IdType;
        slug: string;
      };
    };
  };
}

export interface EventCreateMutationVars {
  input: {
    title: string;
    description?: string | null;
    date: Date;
    durationDays?: number | null;
    price?: number | null;
    capacity?: number | null;
    publicURL?: string | null;
    fieldId: IdType;
    clubId: IdType;
  };
}

const EventCreateMutation: TypedDocumentNode<
  EventCreateMutationResult,
  EventCreateMutationVars
> = gql`
  mutation EventCreate($input: AuthenticatedEventCreateInput!) {
    authenticated {
      event {
        create(input: $input) {
          id
          slug
        }
      }
    }
  }
`;

export default EventCreateMutation;
