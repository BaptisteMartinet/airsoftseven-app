"use client";

import { useTranslations } from "next-intl";
import {
  Container,
  Group,
  Burger,
  Text,
  NavLink,
  ActionIcon,
  Box,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconUserCircle } from "@tabler/icons-react";
import { Link } from "@/navigation";
import { LocalePicker } from "@components/common/app";
import classes from "./Header.module.css";

export default function Header() {
  const [opened, { toggle }] = useDisclosure(false);
  const t = useTranslations("common.Header");

  return (
    <>
      <Box className={classes.placeholder} />
      <header className={classes.header}>
        <Container size="lg" className={classes.inner}>
          <Group gap="xs" visibleFrom="xs">
            <Text size="lg" fw={500}>
              {t("title")}
            </Text>
            <Text size="md">{t('betaCaption')}</Text>
          </Group>
          <Group gap="lg" visibleFrom="xs" wrap="nowrap" >
            <NavLink component={Link} href="/test" label={t("createEvent")} />
            <LocalePicker />
            <ActionIcon variant="transparent" size="md">
              <IconUserCircle />
            </ActionIcon>
          </Group>

          <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />
        </Container>
      </header>
    </>
  );
}
