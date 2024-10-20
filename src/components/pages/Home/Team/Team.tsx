"use client";

import React from "react";
import { useTranslations } from "next-intl";
import {
  rem,
  Container,
  Paper,
  Text,
  Title,
} from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import classes from "./Team.module.css";

interface TeamMember {
  image: string;
  username: string;
  role: string;
}

interface CardProps extends TeamMember { }

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

  return React.useMemo(() => [
    {
      image: "/players/player-placeholder-3_512.jpg",
      username: t("member1Username"),
      role: t("member1Role"),
    },
    {
      image: "/players/player-placeholder-2_512.jpg",
      username: t("member2Username"),
      role: t("member2Role"),
    },
    {
      image: "/players/player-placeholder-1_512.jpg",
      username: t("member3Username"),
      role: t("member3Role"),
    },
    {
      image: "/players/player-placeholder-4_512.jpg",
      username: t("member4Username"),
      role: t("member4Role"),
    },
  ], [t]);
}

export default function Team() {
  const t = useTranslations("pages.Home.Team");

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
        slidesToScroll={1}
        withIndicators
      >
        {slides}
      </Carousel>
    </Container>
  );
}
