import type { IdType } from "@/core/api/types";

import { useTranslations } from "next-intl";
import { Badge, Card, CardSection, Group, Image, Text } from "@mantine/core";
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
      acceptUnderage: boolean | null;
      rentals: boolean | null;
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
      <Card shadow="sm" padding={small ? "xs" : "lg"} radius="md" withBorder>
        {!small ? (
          <CardSection>
            <Image src="/m4-closeup.jpg" height={160} alt="Norway" />
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
        {!small ? (
          <Group mt={10}>
            {event.club.acceptUnderage ? (
              <Badge size="sm">{t("acceptUnderage")}</Badge>
            ) : null}
            {event.club.rentals ? (
              <Badge size="sm">{t("rentals")}</Badge>
            ) : null}
          </Group>
        ) : null}
      </Card>
    </Link>
  );
}
