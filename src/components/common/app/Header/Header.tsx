"use client";

import { useTranslations } from "next-intl";
import {
  Container,
  Group,
  Burger,
  Text,
  NavLink,
  Box,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Link } from "@/navigation";
import { LocalePicker, Anchor } from "@components/common";
import classes from "./Header.module.css";
import ProfileMenu from "./ProfileMenu";

export default function Header() {
  const [opened, { toggle }] = useDisclosure(false);
  const t = useTranslations("common.Header");

  return (
    <>
      <Box className={classes.placeholder} />
      <header className={classes.header}>
        <Container size="lg" className={classes.inner}>
          <Group gap="xs" visibleFrom="xs">
            <Anchor href="/" size="lg" fw={500}>
              {t("title")}
              <Text size="md" component="span">
                {t("betaCaption")}
              </Text>
            </Anchor>
          </Group>
          <Group gap="lg" visibleFrom="xs" wrap="nowrap">
            <NavLink
              component={Link}
              href="/event/create"
              label={t("createEvent")}
            />
            <LocalePicker />
            <ProfileMenu />
          </Group>

          <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />
        </Container>
      </header>
    </>
  );
}
