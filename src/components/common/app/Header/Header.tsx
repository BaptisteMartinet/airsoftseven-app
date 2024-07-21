"use client";

import { Container, Group, Burger, Text, NavLink } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconTank } from "@tabler/icons-react";
import classes from "./Header.module.css";
import { useTranslations } from "next-intl";
import { Link } from '@/navigation';

export default function Header() {
  const [opened, { toggle }] = useDisclosure(false);
  const t = useTranslations("common.Header");

  return (
    <header className={classes.header}>
      <Container size="md" className={classes.inner}>
        <Group gap={2} visibleFrom="xs">
          <IconTank size={28} />
          <Text size="md">{t("title")}</Text>
        </Group>
        <Group gap={2} visibleFrom="xs">
          <NavLink component={Link} href="/test" label={t('createEvent')}/>
        </Group>

        <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />
      </Container>
    </header>
  );
}
