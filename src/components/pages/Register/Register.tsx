"use client";

import {
  TextInput,
  PasswordInput,
  Paper,
  Title,
  Text,
  Container,
  Button,
  Switch,
} from "@mantine/core";
import { useForm, isEmail, hasLength } from "@mantine/form";
import { useTranslations } from "next-intl";
import { useApolloClient } from "@apollo/client";
import { handlePromiseWithToast } from "@core/utils/promise";
import { Anchor } from "@components/common";
import { RegisterMutation } from "./api";
import classes from "./Register.module.css";

export default function Register() {
  const t = useTranslations("pages.Register");
  const client = useApolloClient();

  const form = useForm({
    initialValues: {
      username: "",
      email: "",
      password: "",
      newsletterOptIn: true,
    },
    validate: {
      username: hasLength({ min: 2 }, t("labels.usernameError")),
      email: isEmail(t("labels.emailError")),
      password: hasLength({ min: 8 }, t("labels.passwordError")),
    },
  });

  const handleSubmit = (values: typeof form.values) => {
    const promise = client.mutate({
      mutation: RegisterMutation,
      variables: values,
    });
    handlePromiseWithToast(promise, {
      successMessage: "test successm message",
      errorMessage: "test error message",
    }); // TODO login
  };

  return (
    <Container size={420} my={40}>
      <Title ta="center" className={classes.title}>
        {t("title")}
      </Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        {t("alreadyRegistered")}
        <Anchor size="sm" href="/login">
          {t("login")}
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput
            key={form.key("username")}
            {...form.getInputProps("username")}
            label={t("labels.username")}
            placeholder={t("labels.usernamePlaceholder")}
            required
          />
          <TextInput
            key={form.key("email")}
            {...form.getInputProps("email")}
            label={t("labels.email")}
            placeholder={t("labels.emailPlaceholder")}
            required
            mt="md"
          />
          <PasswordInput
            key={form.key("password")}
            {...form.getInputProps("password")}
            label={t("labels.password")}
            placeholder={t("labels.passwordPlaceholder")}
            required
            mt="md"
          />
          <Switch
            key={form.key("newsletterOptIn")}
            {...form.getInputProps("newsletterOptIn", { type: "checkbox" })}
            label={t("labels.newsletterOptInt")}
            mt="md"
          />
          <Button type="submit" fullWidth mt="xl">
            {t("submit")}
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
