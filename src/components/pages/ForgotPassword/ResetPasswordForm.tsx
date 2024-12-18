'use client'

import { useTranslations } from 'next-intl';
import { useApolloClient } from '@apollo/client';
import { Button, PasswordInput, Stack, TextInput } from '@mantine/core';
import { hasLength, useForm } from '@mantine/form';
import { usePromiseStatusWithToast } from '@/core/utils/promise';
import { useRouter } from '@/navigation';
import { ResetPasswordMutation } from './api';

export interface ResetPasswordFormProps {
  email: string;
}

export default function ResetPasswordForm(props: ResetPasswordFormProps) {
  const { email } = props;
  const t = useTranslations('pages.ForgotPassword.ResetPasswordForm');
  const t_shared = useTranslations('shared');
  const client = useApolloClient();
  const router = useRouter();
  const [submitStatus, handleLoginPromise] = usePromiseStatusWithToast();

  const form = useForm({
    initialValues: {
      code: '',
      newPassword: '',
    },
    validate: {
      code: hasLength(12),
      newPassword: hasLength({ min: 8 }),
    },
  });

  const handleSubmit = (values: typeof form.values) => {
    const { code, newPassword } = values;
    const promise = client.mutate({
      mutation: ResetPasswordMutation,
      variables: { email, code, newPassword },
    });
    handleLoginPromise(promise, {
      successMessage: t('passwordResetSuccess'),
      onSuccess: () => {
        router.replace('/login');
      },
      errorMessage: t_shared("error"),
    });
  };
  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack>
        <TextInput
          key={form.key('code')}
          {...form.getInputProps('code')}
          label={t('labels.code')}
          placeholder={t('labels.codePlaceholder')}
          autoComplete="one-time-code"
          required
        />
        <PasswordInput
          key={form.key('newPassword')}
          {...form.getInputProps('newPassword')}
          label={t('labels.newPassword')}
          placeholder={t('labels.newPasswordPlaceholder')}
          autoComplete="new-password"
          required
        />
        <Button type="submit" loading={submitStatus === 'pending'}>
          {t('submit')}
        </Button>
      </Stack>
    </form>
  );
}
