import type { Field } from "./api";
import type { FieldCreateFormValues } from "./form";

import React from "react";
import assert from "assert";
import { useTranslations } from "next-intl";
import { useApolloClient } from "@apollo/client";
import { Button, Textarea, TextInput } from "@mantine/core";
import { hasLength, isNotEmpty } from "@mantine/form";
import { usePromiseStatusWithToast } from "@/core/utils/promise";
import { ensureFetchResultData } from "@/core/utils/apollo";
import { AddressPicker } from "@components/common";
import { FormProvider, useForm } from "./form";
import { FieldCreateMutation } from "./api";

export interface FieldCreateFormProps {
  onCreateSuccess: (field: Field) => void;
}

export default function FieldCreateForm(props: FieldCreateFormProps) {
  const { onCreateSuccess } = props;
  const t = useTranslations("common.FieldCreateModal");
  const t_shared = useTranslations("shared");
  const client = useApolloClient();
  const [createFieldStatus, handleCreateFieldPromise] =
    usePromiseStatusWithToast();

  const form = useForm({
    initialValues: {
      name: "",
      description: "",
      address: null,
      latitude: null,
      longitude: null,
      publicURL: "",
    },
    validate: {
      name: hasLength({ min: 3, max: 50 }),
      description: hasLength({ max: 500 }),
      address: isNotEmpty(),
      latitude: isNotEmpty(),
      longitude: isNotEmpty(),
      publicURL: hasLength({ max: 100 }),
    },
  });

  const handleSubmit = (values: FieldCreateFormValues) => {
    const promise = client.mutate({
      mutation: FieldCreateMutation,
      variables: {
        input: {
          name: values.name,
          description: values.description,
          address: values.address!, // Safe
          latitude: values.latitude!, // Safe
          longitude: values.longitude!, // Safe
          publicURL: values.publicURL,
        },
      },
    });
    handleCreateFieldPromise(promise, {
      successMessage: t("fieldCreateSuccess"),
      onSuccess: (res) => {
        const data = ensureFetchResultData(res);
        onCreateSuccess(data.authenticated.field.create);
      },
      errorMessage: t_shared("error"),
    });
  };

  return (
    <FormProvider form={form}>
      <TextInput
        key={form.key("name")}
        {...form.getInputProps("name")}
        label={t("labels.name")}
        placeholder={t("labels.namePlaceholder")}
        required
      />
      <AddressPicker
        key={form.key("address")}
        value={form.values.address}
        onChange={(address, details) => {
          form.setFieldValue("address", address);
          if (!address) {
            form.setFieldValue("latitude", null);
            form.setFieldValue("longitude", null);
            return;
          }
          assert(details && details.location);
          form.setFieldValue("latitude", details.location.lat());
          form.setFieldValue("longitude", details.location.lng());
        }}
        placeDetailsFields={["location"]}
        error={
          form.getInputProps("address").error ||
          form.getInputProps("latitude").error ||
          form.getInputProps("longitude").error
        }
        label={t("labels.address")}
        placeholder={t("labels.addressPlaceholder")}
        mt={10}
      />
      <Textarea
        key={form.key("description")}
        {...form.getInputProps("description")}
        label={t("labels.description")}
        placeholder={t("labels.descriptionPlaceholder")}
      />
      <TextInput
        key={form.key("publicURL")}
        {...form.getInputProps("publicURL")}
        label={t("labels.publicURL")}
        placeholder={t("labels.publicURLPlaceholder")}
      />
      <Button
        onClick={() => form.onSubmit(handleSubmit)()}
        loading={createFieldStatus === "pending"}
        fullWidth
        size="sm"
        mt={20}
      >
        {t("submit")}
      </Button>
    </FormProvider>
  );
}
