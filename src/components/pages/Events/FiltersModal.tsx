import assert from 'assert';
import { useTranslations } from 'next-intl';
import { Button, Modal, Stack } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { convertKilometersToMiles } from '@/core/utils/distance';
import { AddressPicker, Select } from '@/components/common';
import { useFormContext, AvailableDistancesMeters } from './form';

// TODO deduplicate some logic with Filters

export interface FiltersModalProps {
  opened: boolean;
  onClose: () => void;
  onSubmit: () => void;
}

export default function FiltersModal(props: FiltersModalProps) {
  const { opened, onClose, onSubmit } = props;
  const t = useTranslations('pages.Events.Filters');
  const form = useFormContext();

  const handleSubmit = () => {
    onClose();
    onSubmit();
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={t("modalTitle")}
      size="xl"
      centered
    >
      <Stack>
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
        <Button onClick={handleSubmit} rightSection={<IconSearch />}>
          {t("submit")}
        </Button>
      </Stack>
    </Modal>
  );
}