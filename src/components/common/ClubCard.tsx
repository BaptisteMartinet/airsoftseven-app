import { Card, CardSection, Image, Text } from "@mantine/core";
import { Link } from "@/navigation";

export interface ClubCardProps {
  club: {
    slug: string;
    name: string;
    description: string;
  };
  width?: number;
  small?: boolean;
}

export default function ClubCard(props: ClubCardProps) {
  const { club, width, small } = props;

  return (
    <Link
      href={{ pathname: "/club/[slug]", params: { slug: club.slug } }}
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
            <Image src="/banners/m4-closeup_512.jpg" height={160} alt="Norway" />
          </CardSection>
        ) : null}

        <Text mt="md" mb="xs" fw={500} lineClamp={1}>
          {club.name}
        </Text>
        <Text size="sm" c="dimmed" lineClamp={1}>
          {club.description}
        </Text>
      </Card>
    </Link>
  );
}
