"use client";

import { useTranslations } from "next-intl";
import { Container, Group, Burger, Text, NavLink } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconTank } from "@tabler/icons-react";
import { Link } from "@/navigation";
import { LocalePicker } from "@components/common/app";
import classes from "./Header.module.css";

export default function Header() {
  const [opened, { toggle }] = useDisclosure(false);
  const t = useTranslations("common.Header");

  return (
    <header className={classes.header}>
      <Container size="md" className={classes.inner}>
        <Group gap="sm" visibleFrom="xs">
          <IconTank size={28} />
          <Text size="md">{t("title")}</Text>
        </Group>
        <Group gap="lg" visibleFrom="xs" wrap="nowrap" align="center">
          <NavLink component={Link} href="/test" label={t("createEvent")} />
          <LocalePicker />
        </Group>

        <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />
      </Container>
    </header>
  );
}
