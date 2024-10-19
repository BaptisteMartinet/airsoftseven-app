import React from "react";
import { useTranslations } from "next-intl";
import { Group, Stack, Textarea, TextInput } from "@mantine/core";
import { NullableNumberInput } from "@components/common";
import { useFormContext } from "./form";

export default function SecondaryInfo() {
  const form = useFormContext();
  const t = useTranslations("pages.EventCreate");
  return (
    <Stack mt="xl">
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
