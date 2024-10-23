'use client'

import React from 'react';
import { useTranslations } from 'next-intl';
import { Paper, Title, Text, Container } from "@mantine/core";
import classes from "./ForgotPassword.module.css";
import ForgotPasswordForm from './ForgotPasswordForm';
import ResetPasswordForm from './ResetPasswordForm';

export default function ForgotPassword() {
  const t = useTranslations('pages.ForgotPassword');
  const [email, setEmail] = React.useState<string | null>(null);

  return (
    <Container size="xs" my="xl">
      <Title className={classes.title} ta="center">
        {t('title')}
      </Title>
      <Text c="dimmed" fz="sm" ta="center">
        {t('description')}
      </Text>
      <Paper withBorder shadow="md" p="lg" radius="md" mt="xl">
        {email ? (
          <ResetPasswordForm email={email} />
        ) : (
          <ForgotPasswordForm onSubmit={setEmail} />
        )}
      </Paper>
    </Container>
  );
}
