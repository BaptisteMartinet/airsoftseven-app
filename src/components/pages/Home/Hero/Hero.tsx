import { Overlay, Container, Title, Button, Text } from "@mantine/core";
import classes from "./Hero.module.css";

import { useTranslations } from "next-intl";

export default function Hero() {
  const t = useTranslations("pages.Home.Hero");

  return (
    <div className={classes.hero}>
      <Overlay
        gradient="linear-gradient(180deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, .65) 40%)"
        opacity={1}
        zIndex={0}
      />
      <Container className={classes.container} size="md">
        <Title className={classes.title}>{t("title")}</Title>
        <Text className={classes.description} size="xl" mt="xl">
          {t("description")}
        </Text>

        <Button
          variant="gradient"
          size="xl"
          radius="xl"
          className={classes.control}
        >
          {t("getStarted")}
        </Button>
      </Container>
    </div>
  );
}
