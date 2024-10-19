'use client'

import assert from "assert";
import { useTranslations } from "next-intl";
import { Box, Button, Container, Group } from "@mantine/core";
import { useDisclosure } from '@mantine/hooks';
import { IconSearch } from "@tabler/icons-react";
import { convertKilometersToMiles } from "@/core/utils/distance";
import { AddressPicker, Select } from "@/components/common";
import { useFormContext, type EventsFormValues, AvailableDistancesMeters } from "./form";
import classes from "./Filters.module.css";
import FiltersModal from './FiltersModal';


export interface FiltersProps {
  handleSubmit: (values: EventsFormValues) => void;
}

export default function Filters(props: FiltersProps) {
  const { handleSubmit } = props;
  const t = useTranslations("pages.Events.Filters");
  const form = useFormContext();
  const [filtersModalOpened, { open: openFiltersModal, close: closeFiltersModal }] = useDisclosure();

  const handleFormSubmit = form.onSubmit(handleSubmit);

  return (
    <>
      <Box className={classes.container}>
        <Container size="xl" h="100%">
          <Group h="100%" visibleFrom="sm">
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
            <Button onClick={() => handleFormSubmit()} rightSection={<IconSearch />}>
              {t("submit")}
            </Button>
          </Group>
          <Group h="100%" hiddenFrom="sm">
            <Button
              variant="light"
              onClick={openFiltersModal}
            >
              {t('filtersBtn')}
            </Button>
            <FiltersModal
              opened={filtersModalOpened}
              onClose={closeFiltersModal}
              onSubmit={() => handleFormSubmit()}
            />
          </Group>
        </Container>
      </Box>
      <Box className={classes.dummyContainer} />
    </>
  );
}
