"use client";

import { useTranslations } from "next-intl";
import { Container, Group, Text, Box, Image } from "@mantine/core";
import { LocalePicker, Anchor, Link } from "@components/common";
import classes from "./Header.module.css";
import ProfileMenu from "./ProfileMenu";

export default function Header() {
  const t = useTranslations("common.Header");

  return (
    <>
      <Box className={classes.placeholder} />
      <header className={classes.header}>
        <Container size="lg" className={classes.inner}>
          <Group gap="xs" visibleFrom="xs">
            <Anchor href="/">
              <Image src="/logo.png" w={24} h={24} alt="logo" />
            </Anchor>
            <Anchor href="/" size="lg" fw={500}>
              {t("title")}
              <Text size="md" component="span">
                {t("betaCaption")}
              </Text>
            </Anchor>
          </Group>
          <Anchor href="/" hiddenFrom="xs">
            <Image src="/logo.png" w={24} h={24} alt="logo" />
          </Anchor>
          <Group gap="lg" wrap="nowrap">
            <Link href="/event-create" label={t("createEvent")} />
            <LocalePicker />
            <ProfileMenu />
          </Group>
        </Container>
      </header>
    </>
  );
}
