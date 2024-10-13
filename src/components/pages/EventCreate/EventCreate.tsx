"use client";

import type { EventCreateFormValues } from "./form";

import React from "react";
import { useTranslations } from "next-intl";
import { useApolloClient } from "@apollo/client";
import { Container, Title, Group, Button } from "@mantine/core";
import { hasLength, isInRange, isNotEmpty } from "@mantine/form";
import { useRouter } from "@/navigation";
import { usePromiseStatusWithToast } from "@/core/utils/promise";
import { ensureFetchResultData } from "@/core/utils/apollo";
import { withAuth, PageLayout } from "@/components/common";
import { FormProvider, useForm } from "./form";
import { EventCreateMutation } from "./api";
import MainInfo from "./MainInfo";
import SecondaryInfo from "./SecondaryInfo";

function EventCreate() {
  const t = useTranslations("pages.EventCreate");
  const t_shared = useTranslations("shared");
  const client = useApolloClient();
  const router = useRouter();
  const [submitStatus, handleSubmitPromise] = usePromiseStatusWithToast();

  const form = useForm({
    initialValues: {
      title: "",
      description: "",
      date: null,
      durationDays: 1,
      price: null,
      capacity: null,
      publicURL: "",
      club: null,
      field: null,
    },
    validate: {
      title: hasLength({ min: 3, max: 50 }),
      description: hasLength({ min: 0, max: 1000 }),
      date: isNotEmpty(),
      durationDays: isInRange({ min: 1, max: 50 }),
      // price
      // capacity
      publicURL: hasLength({ min: 0, max: 100 }),
      club: isNotEmpty(),
      field: isNotEmpty(),
    },
  });

  const handleSubmit = (values: EventCreateFormValues) => {
    const promise = client.mutate({
      mutation: EventCreateMutation,
      variables: {
        input: {
          title: values.title,
          description: values.description,
          date: values.date!, // Safe assertion
          durationDays: values.durationDays,
          price: values.price,
          capacity: values.capacity,
          publicURL: values.publicURL,
          clubId: values.club!.id, // Safe assertion
          fieldId: values.field!.id, // Safe assertion
        },
      },
    });
    handleSubmitPromise(promise, {
      onSuccess: (res) => {
        const data = ensureFetchResultData(res);
        const slug = data.event.create.slug;
        router.replace(`/event/${slug}`);
      },
      errorMessage: t_shared("error"),
    });
  };

  return (
    <PageLayout>
      <Container>
        <Title my="xl">{t("pageTitle")}</Title>
        <FormProvider form={form}>
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <MainInfo />
            <SecondaryInfo />
            <Group justify="center" mt="xl">
              <Button type="submit" loading={submitStatus === "pending"}>
                {t("submit")}
              </Button>
            </Group>
          </form>
        </FormProvider>
      </Container>
    </PageLayout>
  );
}

export default withAuth(EventCreate);
