import {
  Container,
  Title,
  Accordion,
  AccordionItem,
  AccordionControl,
  AccordionPanel,
} from "@mantine/core";
import classes from "./Faq.module.css";

const placeholder =
  "It can’t help but hear a pin drop from over half a mile away, so it lives deep in the mountains where there aren’t many people or Pokémon.It was born from sludge on the ocean floor. In a sterile environment, the germs within its body can’t multiply, and it dies.It has no eyeballs, so it can’t see. It checks its surroundings via the ultrasonic waves it emits from its mouth.";

export default function FaqSimple() {
  return (
    <Container size="sm" className={classes.wrapper}>
      <Title ta="center" className={classes.title}>
        Frequently Asked Questions
      </Title>

      <Accordion variant="separated">
        <AccordionItem className={classes.item} value="reset-password">
          <AccordionControl>How can I reset my password?</AccordionControl>
          <AccordionPanel>{placeholder}</AccordionPanel>
        </AccordionItem>

        <AccordionItem className={classes.item} value="another-account">
          <AccordionControl>
            Can I create more that one account?
          </AccordionControl>
          <AccordionPanel>{placeholder}</AccordionPanel>
        </AccordionItem>

        <AccordionItem className={classes.item} value="newsletter">
          <AccordionControl>
            How can I subscribe to monthly newsletter?
          </AccordionControl>
          <AccordionPanel>{placeholder}</AccordionPanel>
        </AccordionItem>

        <AccordionItem className={classes.item} value="credit-card">
          <AccordionControl>
            Do you store credit card information securely?
          </AccordionControl>
          <AccordionPanel>{placeholder}</AccordionPanel>
        </AccordionItem>

        <AccordionItem className={classes.item} value="payment">
          <AccordionControl>
            What payment systems to you work with?
          </AccordionControl>
          <AccordionPanel>{placeholder}</AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Container>
  );
}
