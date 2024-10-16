"use client";

import React from "react";
import { useTranslations } from "next-intl";
import {
  useMantineTheme,
  rem,
  Container,
  Paper,
  Text,
  Title,
} from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import { useMediaQuery } from "@mantine/hooks";
import classes from "./Team.module.css";

interface TeamMember {
  image: string;
  username: string;
  role: string;
}

interface CardProps extends TeamMember {}

function Card(props: CardProps) {
  const { image, username, role } = props;
  return (
    <Paper
      shadow="md"
      p="xl"
      radius="md"
      style={{ backgroundImage: `url(${image})` }}
      className={classes.card}
    >
      <div>
        <Text className={classes.category} size="xs">
          {role}
        </Text>
        <Title order={3} className={classes.title}>
          {username}
        </Title>
      </div>
    </Paper>
  );
}

function useTeamMembers(): Array<TeamMember> {
  const t = useTranslations("pages.Home.Team");

  return [
    {
      image: "/player-placeholder-3.jpg",
      username: t("member1Username"),
      role: t("member1Role"),
    },
    {
      image: "/player-placeholder-2.jpg",
      username: t("member2Username"),
      role: t("member2Role"),
    },
    {
      image: "/player-placeholder-1.jpg",
      username: t("member3Username"),
      role: t("member3Role"),
    },
    {
      image: "/player-placeholder-4.jpg",
      username: t("member4Username"),
      role: t("member4Role"),
    },
  ];
}

export default function Team() {
  const t = useTranslations("pages.Home.Team");
  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

  const teamMembers = useTeamMembers();
  const slides = teamMembers.map((member) => (
    <Carousel.Slide key={member.username}>
      <Card {...member} />
    </Carousel.Slide>
  ));

  return (
    <Container>
      <Title my="md">{t("title")}</Title>
      <Carousel
        slideSize={{ base: "100%", sm: "50%" }}
        slideGap={{ base: rem(2), sm: "xl" }}
        align="start"
        slidesToScroll={mobile ? 1 : 2}
        withIndicators
      >
        {slides}
      </Carousel>
    </Container>
  );
}
