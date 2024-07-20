import type { LocalPageParams } from "@app/[local]/shared";

import { Overlay, Container, Title, Button, Text } from "@mantine/core";
import { ensureLocalLanguage } from "@core/utils/language";
import { AppShell } from "@components/common";
import texts from "./texts";
import classes from "./Main.module.css";

export default function Main(props: { params: LocalPageParams }) {
  const { params } = props;
  const { local } = params;
  const language = ensureLocalLanguage(local);
  const T = texts(language);
  return (
    <AppShell>
      <div className={classes.hero}>
        <Overlay
          gradient="linear-gradient(180deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, .65) 40%)"
          opacity={1}
          zIndex={0}
        />
        <Container className={classes.container} size="md">
          <Title className={classes.title}>{T.title}</Title>
          <Text className={classes.description} size="xl" mt="xl">
            Build fully functional accessible web applications faster than ever
            – Mantine includes more than 120 customizable components and hooks
            to cover you in any situation
          </Text>

          <Button
            variant="gradient"
            size="xl"
            radius="xl"
            className={classes.control}
          >
            Get started
          </Button>
        </Container>
      </div>
    </AppShell>
  );
}
