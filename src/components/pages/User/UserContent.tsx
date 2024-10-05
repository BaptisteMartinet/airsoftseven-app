import { TitledContainer } from "@/components/common";
import { Stack } from "@mantine/core";
import UserEvents from "./UserEvents";
import UserClubs from "./UserClubs";
import UserFields from "./UserFields";

export interface UserContentProps {
  slug: string;
  eventsCount: number;
  clubsCount: number;
  fieldsCount: number;
}

export default function UserContent(props: UserContentProps) {
  const { slug, eventsCount, clubsCount, fieldsCount } = props;
  return (
    <Stack gap="sm">
      {eventsCount > 0 ? (
        <TitledContainer title="Dernieres parties ajoutées">
          <UserEvents slug={slug} />
        </TitledContainer>
      ) : null}
      {clubsCount > 0 ? (
        <TitledContainer title="Associations ajoutées">
          <UserClubs slug={slug} />
        </TitledContainer>
      ) : null}
      {fieldsCount > 0 ? (
        <TitledContainer title="Terrains ajoutées">
          <UserFields slug={slug} />
        </TitledContainer>
      ) : null}
    </Stack>
  );
}
