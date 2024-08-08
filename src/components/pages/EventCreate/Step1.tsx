import { Group, Stack, TextInput, NumberInput } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useFormContext } from "./form";

export default function Step1() {
  const form = useFormContext();
  return (
    <Stack>
      <TextInput
        key={form.key("title")}
        {...form.getInputProps("title")}
        label="Titre"
        placeholder="Titre de la partie"
        withAsterisk
        maw={400}
      />
      <Group align="start">
        <DatePickerInput
          key={form.key("dates")}
          {...form.getInputProps("dates")}
          type="multiple"
          label="Dates"
          description="Indiquer les dates auxquelles cette partie va etre jouée (une date requise)."
          placeholder="Selectionner une ou plusieurs dates"
          withAsterisk
          maw={400}
        />
        <NumberInput
          key={form.key("durationDays")}
          {...form.getInputProps("durationDays")}
          label="Durée (en jours)"
          description="Si la partie dure 24h ou moins laissez 1 jour."
          withAsterisk
          allowDecimal={false}
          allowNegative={false}
          min={1}
          max={14}
        />
      </Group>
    </Stack>
  );
}
