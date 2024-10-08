import { useTranslations } from "next-intl";
import { Stack, Anchor as MantineAnchor, Text, Box } from "@mantine/core";
import { genGmapsLocationLink } from "@/core/utils/gmaps";
import { TitledContainer, Anchor, StaticMap } from "@/components/common";
import FieldEvents from "./FieldEvents";

export interface FieldContentProps {
  slug: string;
  description: string | null;
  address: string;
  latitude: number;
  longitude: number;
  publicURL: string | null;
  user: {
    slug: string;
    username: string;
  };
}

export default function FieldContent(props: FieldContentProps) {
  const { slug, description, address, latitude, longitude, publicURL, user } =
    props;
  const t = useTranslations("pages.Field.FieldContent");
  const googleMapsLocationLink = genGmapsLocationLink({
    lat: latitude,
    lng: longitude,
  });

  return (
    <Stack gap="sm">
      {description ? (
        <TitledContainer title={t("description")}>
          {description}
        </TitledContainer>
      ) : null}
      {publicURL ? (
        <TitledContainer title={t("publicURL")}>
          <MantineAnchor href={publicURL} target="_blank">
            {publicURL}
          </MantineAnchor>
        </TitledContainer>
      ) : null}
      <TitledContainer title={t("address")}>
        <MantineAnchor href={googleMapsLocationLink} target="_blank">
          {address}
        </MantineAnchor>
        <Box h={500}>
          <a href={googleMapsLocationLink} target="_blank">
            <StaticMap
              width={1000}
              height={500}
              center={{ lat: latitude, lng: longitude }}
              zoom={11}
              markers={[{ position: { lat: latitude, lng: longitude } }]}
            />
          </a>
        </Box>
      </TitledContainer>
      <TitledContainer title={t("events")}>
        <FieldEvents slug={slug} />
      </TitledContainer>
      <Anchor
        href={{ pathname: "/user/[slug]", params: { slug: user.slug } } as any} // TODO casted due to type issue
        size="sm"
        ta="right"
        mt={20}
      >
        {t("author", { username: user.username })}
      </Anchor>
    </Stack>
  );
}
