import { useTranslations } from "next-intl";
import { Box, Text, Title } from "@mantine/core";
import Actions from "./Actions";
import classes from "./EventBanner.module.css";

export interface EventBannerProps {
  title: string;
  date: number;
  club: {
    name: string;
  };
}

export default function EventBanner(props: EventBannerProps) {
  const { title, date, club } = props;
  const t = useTranslations("pages.Event.EventBanner");

  return (
    <Box className={classes.bannerContainer}>
      <Box>
        <Text fw={500}>{t("resource")}</Text>
        <Title size={75} lineClamp={1}>
          {title}
        </Title>
        <Text ta="right">
          {t("subtitle", { date: date, clubName: club.name })}
        </Text>
      </Box>
      <Box pos="absolute" bottom={20} right={20}>
        <Actions />
      </Box>
    </Box>
  );
}
