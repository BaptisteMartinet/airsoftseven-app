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
import { useRouter } from "@/navigation";
import { usePromiseStatusWithToast } from "@core/utils/promise";
import { ensureFetchResultData } from '@core/utils/apollo';
import { Anchor } from "@components/common";
import { useSessionStore } from "@/providers";
import { LoginMutation } from "./api";
import classes from "./Login.module.css";

export default function Login() {
  const t = useTranslations("pages.Login");
  const t_shared = useTranslations("shared");
  const client = useApolloClient();
  const router = useRouter();
  const [submitStatus, handleLoginPromise] = usePromiseStatusWithToast();
  const setSession = useSessionStore((state) => state.setSession);

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
    handleLoginPromise(promise, {
      onSuccess: (result) => {
        const data = ensureFetchResultData(result);
        setSession(data.session.login);
        router.replace("/");
      },
      errorMessage: t_shared("error"),
    });
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
          <Button
            type="submit"
            loading={submitStatus === "pending"}
            fullWidth
            mt="md"
          >
            {t("submit")}
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
