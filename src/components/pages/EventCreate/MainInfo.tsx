import React from "react";
import { useTranslations } from "next-intl";
import { Group, Stack, TextInput, NumberInput } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { ClubPicker, FieldPicker } from "@/components/common";
import { useFormContext } from "./form";

export default function MainInfo() {
  const form = useFormContext();
  const t = useTranslations("pages.EventCreate");
  return (
    <Stack>
      <TextInput
        key={form.key("title")}
        {...form.getInputProps("title")}
        label={t("labels.title")}
        placeholder={t("labels.titlePlaceholder")}
        withAsterisk
        maw={400}
      />
      <Group align="start">
        <DatePickerInput
          key={form.key("date")}
          {...form.getInputProps("date")}
          label={t("labels.date")}
          placeholder={t("labels.datePlaceholder")}
          withAsterisk
          w={200}
        />
        <NumberInput
          key={form.key("durationDays")}
          {...form.getInputProps("durationDays")}
          label={t("labels.durationDays")}
          withAsterisk
          allowDecimal={false}
          allowNegative={false}
          min={1}
          max={14}
          w={150}
        />
      </Group>
      <Group align="start">
        <ClubPicker
          key={form.key("club")}
          {...(form.getInputProps("club") as any)}
          label={t("labels.club")}
          placeholder={t("labels.clubPlaceholder")}
          withAsterisk
          w={300}
        />
        <FieldPicker
          key={form.key("field")}
          {...(form.getInputProps("field") as any)}
          label={t("labels.field")}
          placeholder={t("labels.fieldPlaceholder")}
          withAsterisk
          w={300}
        />
      </Group>
    </Stack>
  );
}
