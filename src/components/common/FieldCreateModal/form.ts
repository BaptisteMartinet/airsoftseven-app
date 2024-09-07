import { createFormContext } from "@mantine/form";

export interface FieldCreateFormValues {
  name: string;
  description: string;
  address: string | null;
  latitude: number | null;
  longitude: number | null;
  publicURL: string;
}

export const [FormProvider, useFormContext, useForm] =
  createFormContext<FieldCreateFormValues>();
