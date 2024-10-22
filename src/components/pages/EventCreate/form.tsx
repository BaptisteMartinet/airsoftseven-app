import type { EventGamemodeType } from '@core/api/types';
import type { Club } from "@components/common/ClubPicker";
import type { Field } from "@components/common/FieldPicker";

import { createFormContext } from "@mantine/form";

export interface EventCreateFormValues {
  title: string;
  description: string;
  date: Date | null;
  durationDays: number;
  price: number | null;
  capacity: number | null;
  publicURL: string;
  gamemodes: Array<EventGamemodeType>;
  club: Club | null;
  field: Field | null;
}

export const [FormProvider, useFormContext, useForm] =
  createFormContext<EventCreateFormValues>();
