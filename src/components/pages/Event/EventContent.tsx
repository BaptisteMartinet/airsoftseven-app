import { useTranslations } from "next-intl";
import { Box, Stack, Text, Anchor as MantineAnchor } from "@mantine/core";
import { genGmapsLocationLink } from "@/core/utils/gmaps";
import { StaticMap, Anchor, TitledContainer } from "@/components/common";

export interface EventContentProps {
  description: string | null;
  capacity: number | null;
  price: number | null;
  publicURL: string | null;
  field: {
    slug: string;
    name: string;
    address: string;
    latitude: number;
    longitude: number;
  };
  author: {
    username: string;
    slug: string;
  };
}

export default function EventContent(props: EventContentProps) {
  const { description, capacity, price, publicURL, field, author } = props;
  const t = useTranslations("pages.Event.EventContent");
  const googleMapsLocationLink = genGmapsLocationLink({
    lat: field.latitude,
    lng: field.longitude,
  });

  return (
    <Stack gap="sm">
      {description ? (
        <TitledContainer title={t("description")}>
          <Text>{description}</Text>
        </TitledContainer>
      ) : null}
      {capacity ? (
        <TitledContainer title={t("capacity")}>
          <Text>{capacity}</Text>
        </TitledContainer>
      ) : null}
      {price ? (
        <TitledContainer title={t("price")}>
          <Text>{price}</Text>
        </TitledContainer>
      ) : null}
      {publicURL ? (
        <TitledContainer title={t("publicURL")}>
          <MantineAnchor href={publicURL} target="_blank">
            {publicURL}
          </MantineAnchor>
        </TitledContainer>
      ) : null}
      <TitledContainer title={t("field")}>
        <Anchor
          href={
            { pathname: "/field/[slug]", params: { slug: field.slug } } as any
          } // TODO casted due to type issue
        >
          {field.name}
        </Anchor>
        <br />
        <Anchor href={googleMapsLocationLink}>{field.address}</Anchor>
        <Box h={500}>
          <a href={googleMapsLocationLink} target="_blank">
            <StaticMap
              width={1000}
              height={500}
              center={{ lat: field.latitude, lng: field.longitude }}
              zoom={11}
              markers={[
                { position: { lat: field.latitude, lng: field.longitude } },
              ]}
            />
          </a>
        </Box>
      </TitledContainer>
      <Anchor
        href={
          { pathname: "/user/[slug]", params: { slug: author.slug } } as any
        } // TODO casted due to type issue
        size="sm"
        ta="right"
        mt={20}
      >
        {t("author", { username: author.username })}
      </Anchor>
    </Stack>
  );
}
