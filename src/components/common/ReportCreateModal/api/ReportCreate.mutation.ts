import type { TypedDocumentNode } from "@apollo/client";
import type { IdType, ReportReason, ReportableResource } from "@core/api/types";

import { gql } from "@apollo/client";

export interface Report {
  id: IdType;
}

export interface ReportCreateMutationResult {
  report: {
    create: Report;
  };
}

export interface ReportCreateMutationVariables {
  input: {
    resourceId: IdType;
    resourceType: ReportableResource;
    reason: ReportReason;
    message: string | null;
  };
}

const ReportCreateMutation: TypedDocumentNode<
  ReportCreateMutationResult,
  ReportCreateMutationVariables
> = gql`
  mutation CreateReport($input: ReportCreateInput!) {
    report {
      create(input: $input) {
        id
      }
    }
  }
`;

export default ReportCreateMutation;
