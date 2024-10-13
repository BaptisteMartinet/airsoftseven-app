import React from "react";
import { useTranslations } from "next-intl";
import { useApolloClient } from "@apollo/client";
import { Button, Stack, Textarea } from "@mantine/core";
import { isNotEmpty } from "@mantine/form";
import { ensureFetchResultData } from "@/core/utils/apollo";
import { usePromiseStatusWithToast } from "@/core/utils/promise";
import {
  type IdType,
  type ReportableResource,
  ReportReason,
} from "@/core/api/types";
import { Select } from "@components/common";
import { type Report, ReportCreateMutation } from "./api";
import { FormProvider, useForm, type ReportCreateFormValues } from "./form";

export interface ReportCreateFormProps {
  resourceId: IdType;
  resourceType: ReportableResource;
  onCreateSuccess: (report: Report) => void;
}

export default function ReportCreateForm(props: ReportCreateFormProps) {
  const { resourceId, resourceType, onCreateSuccess } = props;
  const t = useTranslations("common.ReportCreateModal");
  const t_shared = useTranslations("shared");
  const client = useApolloClient();
  const [reportCreateStatus, handleReportCreatePromise] =
    usePromiseStatusWithToast();

  const form = useForm({
    initialValues: {
      reason: null,
      message: "",
    },
    validate: {
      reason: isNotEmpty(),
    },
  });

  const handleSubmit = (values: ReportCreateFormValues) => {
    const promise = client.mutate({
      mutation: ReportCreateMutation,
      variables: {
        input: {
          resourceId,
          resourceType,
          reason: values.reason!, // Safe assertion
          message: values.message,
        },
      },
    });
    handleReportCreatePromise(promise, {
      successMessage: t("reportCreateSuccess"),
      onSuccess: (res) => {
        const data = ensureFetchResultData(res);
        onCreateSuccess(data.report.create);
      },
      errorMessage: t_shared("error"),
    });
  };

  return (
    <FormProvider form={form}>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          <Select
            key={form.key("reason")}
            value={form.values.reason}
            onChange={(newValue) => {
              form.setFieldValue("reason", newValue);
            }}
            options={Object.values(ReportReason)}
            getOptionValue={(opt) => opt}
            getOptionLabel={(opt) =>
              t_shared("enums.reportReason", { reason: opt })
            }
            error={form.getInputProps("reason").error}
            label={t("labels.reason")}
            maw={200}
          />
          <Textarea
            key={form.key("message")}
            {...form.getInputProps("message")}
            label={t("labels.message")}
            placeholder={t("labels.messagePlaceholder")}
            autosize
            minRows={3}
            maxRows={6}
          />
          <Button
            type="submit"
            loading={reportCreateStatus === "pending"}
            fullWidth
            size="sm"
          >
            {t("submit")}
          </Button>
        </Stack>
      </form>
    </FormProvider>
  );
}
