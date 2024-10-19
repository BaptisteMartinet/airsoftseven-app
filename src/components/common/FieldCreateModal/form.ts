import { createFormContext } from "@mantine/form";
import type { PlaygroundType } from "@core/api/types";

export interface FieldCreateFormValues {
  name: string;
  description: string;
  address: string | null;
  latitude: number | null;
  longitude: number | null;
  publicURL: string;
  playgroundTypes: Array<PlaygroundType>;
}

export const [FormProvider, useFormContext, useForm] =
  createFormContext<FieldCreateFormValues>();
