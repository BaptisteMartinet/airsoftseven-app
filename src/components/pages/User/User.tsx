import { notFound } from "next/navigation";
import { Container } from "@mantine/core";
import { query } from "@/core/apolloClient";
import { PageLayout } from "@/components/common";
import { UserQuery } from "./api";
import UserBanner from "./UserBanner";
import UserContent from "./UserContent";

export interface UserProps {
  params: {
    slug: string;
  };
}

export default async function User(props: UserProps) {
  const {
    params: { slug },
  } = props;
  const {
    data: { user },
  } = await query({ query: UserQuery, variables: { slug } }).catch((err) => {
    notFound();
  });

  return (
    <PageLayout>
      <UserBanner username={user.username} />
      <Container mt="md">
        <UserContent
          slug={slug}
          eventsCount={user.events.count}
          clubsCount={user.clubs.count}
          fieldsCount={user.fields.count}
        />
      </Container>
    </PageLayout>
  );
}
