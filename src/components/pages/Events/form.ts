import { createFormContext } from "@mantine/form";

export interface EventsFormValues {
  address: string;
  latitude: number;
  longitude: number;
  distance: number;
}

export const [FormProvider, useFormContext, useForm] =
  createFormContext<EventsFormValues>();
