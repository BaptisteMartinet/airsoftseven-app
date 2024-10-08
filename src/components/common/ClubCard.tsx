import { Card, CardSection, Image, Text } from "@mantine/core";
import { Link } from "@/navigation";

export interface ClubCardProps {
  club: {
    slug: string;
    name: string;
    description: string;
  };
  small?: boolean;
}

export default function ClubCard(props: ClubCardProps) {
  const { club, small } = props;

  return (
    <Link
      href={{ pathname: "/club/[slug]", params: { slug: club.slug } }}
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
            <Image src="/m4-closeup.jpg" height={160} alt="Norway" />
          </CardSection>
        ) : null}

        <Text fw={500} lineClamp={1} mt="md" mb="xs">
          {club.name}
        </Text>
        <Text size="sm" c="dimmed">
          {club.description}
        </Text>
      </Card>
    </Link>
  );
}
