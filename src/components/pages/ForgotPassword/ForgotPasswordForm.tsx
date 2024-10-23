'use client'

import { useTranslations } from 'next-intl';
import { useApolloClient } from '@apollo/client';
import {
  rem,
  TextInput,
  Button,
  Group,
  Center,
  Text,
} from "@mantine/core";
import { isEmail, useForm } from '@mantine/form';
import { IconArrowLeft } from "@tabler/icons-react";
import { usePromiseStatusWithToast } from '@/core/utils/promise';
import { Anchor } from '@/components/common';
import classes from "./ForgotPassword.module.css";
import { ForgotPasswordMutation } from './api';

export interface ForgotPassword {
  onSubmit: (email: string) => void;
}

export default function ForgotPasswordForm(props: ForgotPassword) {
  const { onSubmit } = props;
  const t = useTranslations('pages.ForgotPassword.ForgotPasswordForm');
  const t_shared = useTranslations('shared');
  const client = useApolloClient();
  const [submitStatus, handleLoginPromise] = usePromiseStatusWithToast();

  const form = useForm({
    initialValues: {
      email: '',
    },
    validate: {
      email: isEmail(),
    },
  });

  const handleSubmit = (values: typeof form.values) => {
    const { email } = values;
    const promise = client.mutate({
      mutation: ForgotPasswordMutation,
      variables: { email },
    });
    handleLoginPromise(promise, {
      onSuccess: () => {
        onSubmit(email);
      },
      errorMessage: t_shared("error"),
    });
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <TextInput
        key={form.key('email')}
        {...form.getInputProps('email')}
        label={t('labels.email')}
        placeholder={t('labels.emailPlaceholder')}
        required
      />
      <Group justify="space-between" mt="lg" className={classes.controls}>
        <Anchor href="/login" c="dimmed" size="sm" className={classes.control}>
          <Center inline>
            <IconArrowLeft
              style={{ width: rem(12), height: rem(12) }}
              stroke={1.5}
            />
            <Text ml={5}>{t('backToLoginBtn')}</Text>
          </Center>
        </Anchor>
        <Button
          type="submit"
          loading={submitStatus === 'pending'}
          className={classes.control}
        >
          {t('submit')}
        </Button>
      </Group>
    </form>
  );
}
