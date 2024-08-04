"use client";

import type { EventCreateFormValues } from "./form";

import React from "react";
import { useTranslations } from "next-intl";
import { useApolloClient } from "@apollo/client";
import { Container, Title, Stepper, Group, Button } from "@mantine/core";
import { clamp } from "@mantine/hooks";
import { usePromiseStatusWithToast } from "@/core/utils/promise";
import { withAuth, PageLayout } from "@/components/common";
import { FormProvider, useForm } from "./form";
import Step1 from "./Step1";
import { EventCreateMutation } from "./api";

// TODO texts
// TODO stepper submit
// TODO create blub/field
// summary

function EventCreate() {
  const t = useTranslations("pages.EventCreate");
  const t_shared = useTranslations("shared");
  const client = useApolloClient();
  const [status, handleSubmitPromise] = usePromiseStatusWithToast(); // TODO handle status
  const [activeStep, setActiveStep] = React.useState(0);
  const handleActiveStepChange = (offset: number) => {
    setActiveStep((currentStep) => clamp(currentStep + offset, 0, 3));
  };

  const form = useForm({
    initialValues: {
      title: "",
      startDate: null,
      endDate: null,
    },
  });

  const handleSubmit = (values: EventCreateFormValues) => {
    const promise = client.mutate({ mutation: EventCreateMutation }); // todo variables
    handleSubmitPromise(promise, {
      errorMessage: t_shared("error"),
    });
  };

  return (
    <PageLayout>
      <Container>
        <Title my="xl">{t("pageTitle")}</Title>
        <FormProvider form={form}>
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <Stepper
              active={activeStep}
              onStepClick={setActiveStep}
              allowNextStepsSelect={false}
            >
              <Stepper.Step label={t("steps.step1")}>
                <Step1 />
              </Stepper.Step>
              <Stepper.Step label={t("steps.step2")}>Step 2</Stepper.Step>
              <Stepper.Step label={t("steps.step3")}>Step 3</Stepper.Step>
            </Stepper>
            <Group justify="center" mt="xl">
              <Button
                variant="default"
                onClick={() => handleActiveStepChange(-1)}
                disabled={activeStep === 0}
              >
                {t("prevStep")}
              </Button>
              <Button onClick={() => handleActiveStepChange(1)}>
                {t("nextStep")}
              </Button>
            </Group>
          </form>
        </FormProvider>
        <div style={{ height: "1000px" }} />
      </Container>
    </PageLayout>
  );
}

export default withAuth(EventCreate);
