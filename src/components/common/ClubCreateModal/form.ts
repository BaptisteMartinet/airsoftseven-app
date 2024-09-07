import { createFormContext } from "@mantine/form";

export interface ClubCreateFormValues {
  name: string;
  description: string;
  rules: string;
  publicURL: string;
  acceptUnderage: boolean;
  rentals: boolean;
}

export const [FormProvider, useFormContext, useForm] =
  createFormContext<ClubCreateFormValues>();
