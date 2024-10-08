import { notFound } from "next/navigation";
import { Container } from "@mantine/core";
import { query } from "@/core/apolloClient";
import { PageLayout } from "@/components/common";
import { FieldQuery } from "./api";
import FieldBanner from "./FieldBanner";
import FieldContent from "./FieldContent";

export interface FieldProps {
  params: {
    slug: string;
  };
}

export default async function Field(props: FieldProps) {
  const {
    params: { slug },
  } = props;
  const {
    data: { field },
  } = await query({ query: FieldQuery, variables: { slug } }).catch((err) => {
    notFound();
  });

  return (
    <PageLayout>
      <FieldBanner name={field.name} />
      <Container mt="md">
        <FieldContent
          slug={slug}
          description={field.description}
          address={field.address}
          latitude={field.latitude}
          longitude={field.longitude}
          publicURL={field.publicURL}
          user={field.user}
        />
      </Container>
    </PageLayout>
  );
}
