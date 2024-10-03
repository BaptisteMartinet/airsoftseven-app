import { Container } from "@mantine/core";
import { notFound } from "next/navigation";
import { query } from "@core/apolloClient";
import { PageLayout } from "@/components/common";
import { EventQuery } from "./api";
import EventBanner from "./EventBanner";
import EventContent from "./EventContent";

export interface EventProps {
  params: {
    slug: string;
  };
}

export default async function Event(props: EventProps) {
  const {
    params: { slug },
  } = props;
  const {
    data: { event },
  } = await query({ query: EventQuery, variables: { slug } }).catch((err) =>
    notFound()
  );
  const {
    title,
    date,
    club,
    description,
    capacity,
    price,
    publicURL,
    field,
    user,
  } = event;

  return (
    <PageLayout>
      <EventBanner title={title} date={date} club={club} />
      <Container mt="md">
        <EventContent
          description={description}
          capacity={capacity}
          price={price}
          publicURL={publicURL}
          field={field}
          user={user}
        />
      </Container>
    </PageLayout>
  );
}
