import { Card, CardSection, Image, Text } from "@mantine/core";
import { Link } from "@/navigation";

export interface FieldCardProps {
  field: {
    slug: string;
    name: string;
    address: string;
  };
  small?: boolean;
}

export default function FieldCard(props: FieldCardProps) {
  const { field, small } = props;

  return (
    <Link
      href={{ pathname: "/field/[slug]", params: { slug: field.slug } }}
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
          {field.name}
        </Text>
        <Text size="sm" c="dimmed">
          {field.address}
        </Text>
      </Card>
    </Link>
  );
}
