import type { TypedDocumentNode } from "@apollo/client";
import type { IdType } from "@/core/api/types";

import { gql } from "@apollo/client";

export interface EventCreateMutationVars {
  title: string;
  description?: string | null;
  startDate: Date;
  endDate?: Date | null;
  fieldId: IdType;
  clubId: IdType;
  capcity?: number | null;
  price?: number | null;
}

const EventCreateMutation: TypedDocumentNode<
  any,
  EventCreateMutationVars
> = gql`
  mutation EventCreate($input: AuthenticatedEventCreateInput!) {
    authenticated {
      event {
        create(input: $input) {
          id
        }
      }
    }
  }
`;

export default EventCreateMutation;
