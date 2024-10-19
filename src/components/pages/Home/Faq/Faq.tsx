import { useTranslations } from "next-intl";
import {
  Container,
  Title,
  Accordion,
  AccordionItem,
  AccordionControl,
  AccordionPanel,
} from "@mantine/core";
import classes from "./Faq.module.css";

export default function Faq() {
  const t = useTranslations("pages.Home.Faq");

  return (
    <Container size="sm" className={classes.wrapper}>
      <Title ta="center" className={classes.title}>
        {t("title")}
      </Title>

      <Accordion variant="separated" mih={410}>
        <AccordionItem className={classes.item} value="question1">
          <AccordionControl>{t("question1Title")}</AccordionControl>
          <AccordionPanel>{t("question1Desc")}</AccordionPanel>
        </AccordionItem>

        <AccordionItem className={classes.item} value="question2">
          <AccordionControl>{t("question2Title")}</AccordionControl>
          <AccordionPanel>{t("question2Desc")}</AccordionPanel>
        </AccordionItem>

        <AccordionItem className={classes.item} value="question3">
          <AccordionControl>{t("question3Title")}</AccordionControl>
          <AccordionPanel>{t("question3Desc")}</AccordionPanel>
        </AccordionItem>

        <AccordionItem className={classes.item} value="question4">
          <AccordionControl>{t("question4Title")}</AccordionControl>
          <AccordionPanel>{t("question4Desc")}</AccordionPanel>
        </AccordionItem>

        <AccordionItem className={classes.item} value="question5">
          <AccordionControl>{t("question5Title")}</AccordionControl>
          <AccordionPanel>{t("question5Desc")}</AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Container>
  );
}
