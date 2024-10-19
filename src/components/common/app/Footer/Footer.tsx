import { useTranslations } from "next-intl";
import {
  Container,
  Group,
  Anchor as MantineAnchor,
  Image,
} from "@mantine/core";
import { SupportEmail } from "@/core/constants";
import { Anchor } from "@components/common";
import classes from "./Footer.module.css";

export default function Footer() {
  const t = useTranslations("common.Footer");
  return (
    <div className={classes.footer}>
      <Container className={classes.inner}>
        <Anchor href="/">
          <Image src="/logo.png" w={32} h={32} alt="logo" />
        </Anchor>
        <Group className={classes.links}>
          <Anchor href="/" c="dimmed" size="sm">
            {t("links.home")}
          </Anchor>

          <MantineAnchor href={`mailto:${SupportEmail}`} c="dimmed" size="sm">
            {t("links.contact")}
          </MantineAnchor>

          <MantineAnchor
            href="https://github.com/BaptisteMartinet/airsoftseven-app"
            target="_blank"
            c="dimmed"
            size="sm"
          >
            {t("links.github")}
          </MantineAnchor>
        </Group>
      </Container>
    </div>
  );
}
