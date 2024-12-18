import type { IdType } from "@/core/api/types";

import { useTranslations } from "next-intl";
import { Box, Card, CardSection, Group, Text, Image, Overlay, AspectRatio } from "@mantine/core";
import { adjustTimestampToUTC } from '@/core/utils/time';
import { Link } from "@/navigation";

export interface EventCardProps {
  event: {
    id: IdType;
    slug: string;
    title: string;
    date: number;
    dateTzOffset: number;
    capacity: number | null;
    club: {
      id: IdType;
      name: string;
    };
    field: {
      id: IdType;
      name: string;
    };
  };
  width?: number;
  small?: boolean;
}

export default function EventCard(props: EventCardProps) {
  const { event, width, small } = props;
  const t = useTranslations("common.EventCard");
  const adjustedDate = adjustTimestampToUTC(event.date, event.dateTzOffset);

  return (
    <Link
      href={{ pathname: "/event/[slug]", params: { slug: event.slug } }}
      style={{ textDecoration: "none" }}
    >
      <Card
        w={width}
        miw={256}
        shadow="sm"
        padding={small ? "xs" : "lg"}
        radius="md"
        withBorder
      >
        {!small ? (
          <CardSection>
            <AspectRatio ratio={16 / 6} pos="relative">
              <Image src="/banners/m4-closeup_512.jpg" height="100%" alt="m4" />
              <Overlay backgroundOpacity={0} blur={10} zIndex="auto">
                <Group justify="center" h="100%">
                  <Text c="white" fz={32} lineClamp={1}>{event.field.name}</Text>
                </Group>
              </Overlay>
            </AspectRatio>
          </CardSection>
        ) : null}
        <Text mt="md" mb="xs" fw={500} lineClamp={1}>
          {event.title}
        </Text>
        <Text size="sm" c="dimmed" tt="capitalize" lineClamp={1}>
          {t("date", { date: adjustedDate })}
        </Text>
        <Text size="sm" c="dimmed" lineClamp={1}>
          {t("description", {
            fieldName: event.field.name,
            clubName: event.club.name,
          })}
        </Text>
        <Text
          size="sm"
          c="dimmed"
          style={{ visibility: event.capacity ? "visible" : "hidden" }} // Trick to keep the Text height when there is no capacity to display
        >
          {t("capacity", { capacity: event.capacity })}
        </Text>
      </Card>
    </Link>
  );
}
