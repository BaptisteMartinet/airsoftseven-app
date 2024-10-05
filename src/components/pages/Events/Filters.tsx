import assert from "assert";
import { useTranslations } from "next-intl";
import { Box, Button, Container, Group } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { convertKilometersToMiles } from "@/core/utils/distance";
import { AddressPicker, Select } from "@/components/common";
import { useFormContext, type EventsFormValues } from "./form";
import classes from "./Filters.module.css";

export const DefaultDistanceMeters = 200_000;
export const AvailableDistancesMeters = [
  50_000,
  100_000,
  DefaultDistanceMeters,
  250_000,
  500_000,
] as const;

export interface FiltersProps {
  handleSubmit: (values: EventsFormValues) => void;
}

export default function Filters(props: FiltersProps) {
  const { handleSubmit } = props;
  const t = useTranslations("pages.Events.Filters");
  const form = useFormContext();

  return (
    <>
      <form
        onSubmit={form.onSubmit(handleSubmit)}
        className={classes.container}
      >
        <Container size="xl" h="100%">
          <Group h="100%">
            <AddressPicker
              key={form.key("address")}
              value={form.values.address}
              onChange={(newAddress, details) => {
                if (newAddress === null) return;
                assert(details && details.location);
                form.setFieldValue("address", newAddress);
                form.setFieldValue("latitude", details.location.lat());
                form.setFieldValue("longitude", details.location.lng());
              }}
              placeDetailsFields={["location"]}
              placeholder={t("addressPlaceholder")}
              w={500}
            />
            <Select
              key={form.key("distance")}
              value={form.values.distance}
              onChange={(newDistance) => {
                if (newDistance) form.setFieldValue("distance", newDistance);
              }}
              error={form.getInputProps("distance").error}
              options={AvailableDistancesMeters}
              getOptionValue={(opt) => opt.toString()}
              getOptionLabel={(opt) => {
                const distanceKm = opt / 1000;
                const distanceMi = convertKilometersToMiles(distanceKm);
                return t("distanceLabel", { distanceKm, distanceMi });
              }}
            />
            <Button type="submit" rightSection={<IconSearch />}>
              {t("submit")}
            </Button>
          </Group>
        </Container>
      </form>
      <Box className={classes.dummyContainer} />
    </>
  );
}
