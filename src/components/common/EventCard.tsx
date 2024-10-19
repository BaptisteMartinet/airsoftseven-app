import type { IdType } from "@/core/api/types";

import { useTranslations } from "next-intl";
import { Card, CardSection, Image, Text } from "@mantine/core";
import { Link } from "@/navigation";

export interface EventCardProps {
  event: {
    id: IdType;
    slug: string;
    title: string;
    date: number;
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
  small?: boolean;
}

export default function EventCard(props: EventCardProps) {
  const { event, small } = props;
  const t = useTranslations("common.EventCard");
  return (
    <Link
      href={{ pathname: "/event/[slug]", params: { slug: event.slug } }}
      style={{ textDecoration: "none" }}
    >
      <Card
        miw={300}
        shadow="sm"
        padding={small ? "xs" : "lg"}
        radius="md"
        withBorder
      >
        {!small ? (
          <CardSection>
            <Image src="/banners/m4-closeup_512.jpg" height={160} alt="Norway" />
          </CardSection>
        ) : null}

        <Text fw={500} lineClamp={1} mt="md" mb="xs">
          {event.title}
        </Text>
        <Text size="sm" c="dimmed" tt="capitalize">
          {t("date", { date: event.date })}
        </Text>
        <Text size="sm" c="dimmed">
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
