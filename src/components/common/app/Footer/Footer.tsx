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
        <Image src="/logo.png" w={32} h={32} alt="logo" />
        <Group className={classes.links}>
          <Anchor href="/" c="dimmed" size="sm">
            {t("links.home")}
          </Anchor>

          <MantineAnchor href={`mailto:${SupportEmail}`} c="dimmed" size="sm">
            {t("links.contact")}
          </MantineAnchor>
        </Group>
      </Container>
    </div>
  );
}
