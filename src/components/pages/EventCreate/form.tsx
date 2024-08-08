import { createFormContext } from "@mantine/form";

export interface EventCreateFormValues {
  title: string;
  dates: Array<Date>;
  durationDays: number;
}

export const [FormProvider, useFormContext, useForm] =
  createFormContext<EventCreateFormValues>();
