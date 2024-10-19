import { createFormContext } from "@mantine/form";

export interface EventsFormValues {
  address: string;
  latitude: number;
  longitude: number;
  distance: number;
}

export const [FormProvider, useFormContext, useForm] =
  createFormContext<EventsFormValues>();

export const DefaultDistanceMeters = 200_000;
export const AvailableDistancesMeters = [
  50_000,
  100_000,
  DefaultDistanceMeters,
  250_000,
  500_000,
] as const;
