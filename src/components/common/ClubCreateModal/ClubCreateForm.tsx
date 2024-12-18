import type { Club } from "./api";
import type { ClubCreateFormValues } from "./form";

import React from "react";
import { useTranslations } from "next-intl";
import { useApolloClient } from "@apollo/client";
import { Button, TextInput, Textarea, Chip, Group, Stack } from "@mantine/core";
import { hasLength } from "@mantine/form";
import { ensureFetchResultData } from "@/core/utils/apollo";
import { usePromiseStatusWithToast } from "@/core/utils/promise";
import { FormProvider, useForm } from "./form";
import { ClubCreateMutation } from "./api";

export interface ClubCreateFormProps {
  onCreateSuccess: (createdClub: Club) => void;
}

export default function ClubCreateForm(props: ClubCreateFormProps) {
  const { onCreateSuccess } = props;
  const t = useTranslations("common.ClubCreateModal");
  const t_shared = useTranslations("shared");
  const client = useApolloClient();
  const [createStatus, handleCreatePromise] = usePromiseStatusWithToast();

  const form = useForm({
    initialValues: {
      name: "",
      description: "",
      rules: "",
      publicURL: "",
      rentals: false,
      acceptUnderage: false,
    },
    validate: {
      name: hasLength({ min: 3, max: 64 }),
      description: hasLength({ max: 2000 }),
      rules: hasLength({ max: 2000 }),
      publicURL: hasLength({ max: 500 }),
    },
  });

  const handleSubmit = (values: ClubCreateFormValues) => {
    const promise = client.mutate({
      mutation: ClubCreateMutation,
      variables: { input: values },
    });
    handleCreatePromise(promise, {
      successMessage: t("clubCreateSuccess"),
      onSuccess: (res) => {
        const data = ensureFetchResultData(res);
        onCreateSuccess(data.club.create);
      },
      errorMessage: t_shared("error"),
    });
  };

  return (
    <FormProvider form={form}>
      <Stack>
        <TextInput
          key={form.key("name")}
          {...form.getInputProps("name")}
          label={t("labels.name")}
          placeholder={t("labels.namePlaceholder")}
          required
        />
        <Textarea
          key={form.key("description")}
          {...form.getInputProps("description")}
          label={t("labels.description")}
          placeholder={t("labels.descriptionPlaceholder")}
          autosize
          minRows={3}
          maxRows={8}
        />
        <Textarea
          key={form.key("rules")}
          {...form.getInputProps("rules")}
          label={t("labels.rules")}
          placeholder={t("labels.rulesPlaceholder")}
          autosize
          minRows={3}
          maxRows={8}
        />
        <TextInput
          key={form.key("publicURL")}
          {...form.getInputProps("publicURL")}
          label={t("labels.publicURL")}
          placeholder={t("labels.publicURLPlaceholder")}
        />
        <Group>
          <Chip
            key={form.key("acceptUnderage")}
            {...form.getInputProps("acceptUnderage", { type: "checkbox" })}
          >
            {t("labels.acceptUnderage")}
          </Chip>
          <Chip
            key={form.key("rentals")}
            {...form.getInputProps("rentals", { type: "checkbox" })}
          >
            {t("labels.rentals")}
          </Chip>
        </Group>
      </Stack>
      <Button
        onClick={() => form.onSubmit(handleSubmit)()}
        loading={createStatus === "pending"}
        fullWidth
        size="sm"
        mt={20}
      >
        {t("submit")}
      </Button>
    </FormProvider>
  );
}
