import { createFormContext } from "@mantine/form";
import { ReportReason } from "@core/api/types";

export interface ReportCreateFormValues {
  reason: ReportReason | null;
  message: string;
}

export const [FormProvider, useFormContext, useForm] =
  createFormContext<ReportCreateFormValues>();
