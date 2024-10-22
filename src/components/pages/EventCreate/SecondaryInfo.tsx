import React from "react";
import { useTranslations } from "next-intl";
import { Group, Stack, Textarea, TextInput } from "@mantine/core";
import { NullableNumberInput, MultiSelect } from "@components/common";
import { EventGamemodeType } from '@/core/api/enums';
import { useFormContext } from "./form";

export default function SecondaryInfo() {
  const form = useFormContext();
  const t = useTranslations("pages.EventCreate");
  const t_shared = useTranslations("shared");

  return (
    <Stack mt="xl">
      <MultiSelect
        key={form.key('gamemodes')}
        value={form.values.gamemodes}
        onChange={(newValue) => form.setFieldValue('gamemodes', newValue)}
        error={form.getInputProps('gamemodes').error}
        options={Object.values(EventGamemodeType)}
        getOptionLabel={(opt) => t_shared('enums.eventGamemodeType', { type: opt })}
        getOptionValue={(opt) => opt}
        label={t('labels.gamemodes')}
        placeholder={t('labels.gamemodesPlaceholder')}
        maw={400}
      />
      <Textarea
        key={form.key("description")}
        {...form.getInputProps("description")}
        label={t("labels.description")}
        placeholder={t("labels.descriptionPlaceholder")}
        autosize
        minRows={3}
        maxRows={6}
      />
      <TextInput
        key={form.key("publicURL")}
        {...form.getInputProps("publicURL")}
        label={t("labels.publicURL")}
        placeholder={t("labels.publicURLPlaceholder")}
        maw={400}
      />
      <Group align="start">
        <NullableNumberInput
          key={form.key("price")}
          {...(form.getInputProps("price") as any)}
          label={t("labels.price")}
          placeholder={t("labels.pricePlaceholder")}
        />
        <NullableNumberInput
          key={form.key("capacity")}
          {...(form.getInputProps("capacity") as any)}
          label={t("labels.capacity")}
          placeholder={t("labels.capacityPlaceholder")}
        />
      </Group>
    </Stack>
  );
}
