import { notFound } from "next/navigation";
import { Container } from "@mantine/core";
import { query } from "@/core/apolloClient";
import { PageLayout } from "@/components/common";
import { ClubQuery } from "./api";
import ClubBanner from "./ClubBanner";
import ClubContent from "./ClubContent";

export interface ClubProps {
  params: {
    slug: string;
  };
}

export default async function Club(props: ClubProps) {
  const {
    params: { slug },
  } = props;
  const {
    data: { club },
  } = await query({ query: ClubQuery, variables: { slug } }).catch((err) => {
    notFound();
  });

  return (
    <PageLayout>
      <ClubBanner
        clubId={club.id}
        name={club.name}
        user={club.user}
        events={club.events}
      />
      <Container mt="md">
        <ClubContent
          slug={slug}
          description={club.description}
          rules={club.rules}
          publicURL={club.publicURL}
          user={club.user}
        />
      </Container>
    </PageLayout>
  );
}
