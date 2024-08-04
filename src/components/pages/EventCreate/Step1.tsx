import { Group, Stack, TextInput } from "@mantine/core";
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
      <Group grow maw={400}>
        <DatePickerInput
          key={form.key("startDate")}
          {...form.getInputProps("startDate")}
          label="Date de début"
          placeholder="placegsdfs"
          withAsterisk
        />
        <DatePickerInput
          key={form.key("endDate")}
          {...form.getInputProps("endDate")}
          label="Date de fin"
          placeholder="coucou"
        />
      </Group>
    </Stack>
  );
}
