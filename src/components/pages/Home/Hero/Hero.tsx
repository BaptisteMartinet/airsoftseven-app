"use client";

import assert from "assert";
import { useTranslations } from "next-intl";
import { Overlay, Container, Title, Text } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { useRouter } from "@/navigation";
import { AddressPicker } from "@/components/common";
import classes from "./Hero.module.css";

export default function Hero() {
  const t = useTranslations("pages.Home.Hero");
  const router = useRouter();

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
        <AddressPicker
          value={null}
          onChange={(address, details) => {
            assert(details && details.location); // Safe assert
            const lat = details.location.lat();
            const lng = details.location.lng();
            router.push({
              pathname: "/events",
              query: { address, lat, lng },
            });
          }}
          placeDetailsFields={["location"]}
          placeholder={t("addressPickerPlaceholder")}
          leftSection={<IconSearch />}
          size="lg"
          className={classes.control}
        />
      </Container>
    </div>
  );
}
