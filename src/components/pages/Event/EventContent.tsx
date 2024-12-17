import { useTranslations } from "next-intl";
import { Box, Stack, Text, SimpleGrid, ActionIcon, Group } from "@mantine/core";
import { IconLink, IconSoccerField } from '@tabler/icons-react';
import { genGmapsLocationLink } from "@/core/utils/gmaps";
import { StaticMap, Anchor, TitledContainer, FieldCard, ClubCard } from "@/components/common";
import DataCard from './DataCard';

export interface EventContentProps {
  description: string | null;
  capacity: number | null;
  price: number | null;
  publicURL: string | null;
  club: {
    slug: string;
    name: string;
    description: string;
  };
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
  const { description, capacity, price, publicURL, club, field, author } = props;
  const t = useTranslations("pages.Event.EventContent");
  const googleMapsLocationLink = genGmapsLocationLink({
    lat: field.latitude,
    lng: field.longitude,
  });

  return (
    <Stack gap="sm">
      {description ? (
        <Text>{description}</Text>
      ) : null}
      <SimpleGrid cols={{ base: 2, sm: 3, lg: 5 }}>
        {capacity ? <DataCard value={capacity.toString()} label={t('capacity')} /> : null}
        {price ? <DataCard value={price.toString()} label={t('price')} /> : null}
        {publicURL ? (
          <DataCard
            value={
              <ActionIcon
                component="a"
                href={publicURL}
                target="_blank"
                variant="transparent"
                size="xl"
              >
                <IconLink size={40} />
              </ActionIcon>
            }
            label={t('publicURL')}
            disableValueText
          />
        ) : null}
      </SimpleGrid>
      <Group my="md" justify="center" gap="xl">
        <ClubCard club={club} width={280} />
        <FieldCard field={field} width={280} />
      </Group>
      <Box h={400}>
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
