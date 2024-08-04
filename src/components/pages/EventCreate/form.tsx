import { createFormContext } from "@mantine/form";

export interface EventCreateFormValues {
  title: string;
  startDate: Date | null;
  endDate: Date | null;
}

export const [FormProvider, useFormContext, useForm] =
  createFormContext<EventCreateFormValues>();
