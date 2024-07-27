"use client";

import {
  TextInput,
  PasswordInput,
  Paper,
  Title,
  Text,
  Container,
  Button,
  Box,
} from "@mantine/core";
import { useForm, isEmail, hasLength } from "@mantine/form";
import { useTranslations } from "next-intl";
import { useApolloClient } from "@apollo/client";
import { handlePromiseWithToast } from "@core/utils/promise";
import { Anchor } from "@components/common";
import { LoginMutation } from "./api";
import classes from "./Login.module.css";

export default function Login() {
  const t = useTranslations("pages.Login");
  const client = useApolloClient();

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    validate: {
      email: isEmail(t("labels.emailError")),
      password: hasLength({ min: 8 }, t("labels.passwordError")),
    },
  });

  const handleSubmit = (values: typeof form.values) => {
    const promise = client.mutate({
      mutation: LoginMutation,
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
        {t("notRegisteredYet")}
        <Anchor size="sm" href="/register">
          {t("register")}
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput
            key={form.key("email")}
            {...form.getInputProps("email")}
            label={t("labels.email")}
            placeholder={t("labels.emailPlaceholder")}
            required
          />
          <PasswordInput
            key={form.key("password")}
            {...form.getInputProps("password")}
            label={t("labels.password")}
            placeholder={t("labels.passwordPlaceholder")}
            required
            mt="md"
          />
          <Box mt="sm">
            <Anchor href="/" size="sm">
              {t("forgotPassword")}
            </Anchor>
          </Box>
          <Button type="submit" fullWidth mt="md">
            {t("submit")}
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
