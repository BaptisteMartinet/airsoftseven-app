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
import { useDisclosure } from "@mantine/hooks";
import { useTranslations } from "next-intl";
import { useApolloClient } from "@apollo/client";
import { ensureFetchResultData } from '@/core/utils/apollo';
import { usePromiseStatusWithToast } from "@core/utils/promise";
import { useSessionStore } from '@/providers';
import { Anchor, PinInputModal, withoutAuth } from "@components/common";
import { useRouter } from "@/navigation";
import { VerifyEmailMutation, RegisterMutation } from "./api";
import classes from "./Register.module.css";

function Register() {
  const t = useTranslations("pages.Register");
  const t_shared = useTranslations("shared");
  const client = useApolloClient();
  const router = useRouter();
  const setSession = useSessionStore((state) => state.setSession);
  const [submitStatus, handleSubmitPromise] = usePromiseStatusWithToast();
  const [registerStatus, handleRegisterPromise] = usePromiseStatusWithToast();
  const [pinModalOpened, { open: openPinModal, close: closePinModal }] =
    useDisclosure();

  const form = useForm({
    initialValues: {
      username: "",
      email: "",
      password: "",
      newsletterOptIn: true,
    },
    validate: {
      username: hasLength({ min: 3, max: 64 }, t("labels.usernameError")),
      email: isEmail(t("labels.emailError")),
      password: hasLength({ min: 8 }, t("labels.passwordError")),
    },
  });

  const handleSubmit = (values: typeof form.values) => {
    const { email } = values;
    const promise = client.mutate({
      mutation: VerifyEmailMutation,
      variables: { email },
    });
    handleSubmitPromise(promise, {
      onSuccess: openPinModal,
      errorMessage: t_shared("error"),
    });
  };

  return (
    <>
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
            <Button
              type="submit"
              fullWidth
              mt="xl"
              loading={submitStatus === "pending"}
            >
              {t("submit")}
            </Button>
          </form>
        </Paper>
      </Container>

      <PinInputModal
        title={t("emailVerifyDialog.title")}
        description={t("emailVerifyDialog.description")}
        length={6}
        open={pinModalOpened}
        disabled={registerStatus === "pending"}
        onClose={closePinModal}
        onSubmit={(code) => {
          const promise = client.mutate({
            mutation: RegisterMutation,
            variables: { code, ...form.values },
          });
          handleRegisterPromise(promise, {
            successMessage: t("registerSuccess"),
            onSuccess: (res) => {
              const data = ensureFetchResultData(res);
              setSession(data.session.register);
              closePinModal();
              router.replace("/");
            },
            errorMessage: t_shared("error"),
          });
        }}
      />
    </>
  );
}

export default withoutAuth(Register);
