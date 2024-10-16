import { useTranslations } from "next-intl";
import { Anchor as MantineAnchor, Stack } from "@mantine/core";
import { TitledContainer, Anchor } from "@/components/common";
import ClubEvents from "./ClubEvents";

export interface ClubContentProps {
  slug: string;
  description: string | null;
  rules: string | null;
  publicURL: string | null;
  author: {
    slug: string;
    username: string;
  };
}

export default function ClubContent(props: ClubContentProps) {
  const { slug, description, rules, publicURL, author } = props;
  const t = useTranslations("pages.Club.ClubContent");

  return (
    <Stack gap="sm">
      {description ? (
        <TitledContainer title={t("description")}>
          {description}
        </TitledContainer>
      ) : null}
      {rules ? (
        <TitledContainer title={t("rules")}>{rules}</TitledContainer>
      ) : null}
      {publicURL ? (
        <TitledContainer title={t("publicURL")}>
          <MantineAnchor href={publicURL} target="_blank">
            {publicURL}
          </MantineAnchor>
        </TitledContainer>
      ) : null}
      <TitledContainer title={t("events")}>
        <ClubEvents slug={slug} />
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
