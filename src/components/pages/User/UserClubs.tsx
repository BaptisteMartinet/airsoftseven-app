"use client";

import { useQuery } from "@apollo/client";
import { useTranslations } from "next-intl";
import { Skeleton } from "@mantine/core";
import { handlePromiseWithToast } from "@/core/utils/promise";
import { ClubCard, PaginatedList } from "@/components/common";
import { UserClubsQuery } from "./api";

const PageSize = 10;

export interface UserClubsProps {
  slug: string;
}

export default function UserClubs(props: UserClubsProps) {
  const { slug } = props;
  const t_shared = useTranslations("shared");

  const { data, loading, fetchMore } = useQuery(UserClubsQuery, {
    variables: {
      slug,
      offset: 0,
      limit: PageSize,
      order: [{ field: "createdAt", ordering: "DESC" }],
    },
  });
  const clubs = data?.user.clubs.nodes ?? [];
  const clubsCount = data?.user.clubs.count ?? 0;

  const handleFetchMore = () => {
    const promise = fetchMore({ variables: { offset: clubs.length } });
    handlePromiseWithToast(promise, {
      errorMessage: t_shared("error"),
    });
  };

  if (loading) return <Skeleton height={300} />;

  return (
    <PaginatedList
      count={clubsCount}
      nodes={clubs}
      getNodeKey={(club) => club.id}
      renderNode={(club) => <ClubCard club={club} width={300} />}
      onClickFetchMore={handleFetchMore}
    />
  );
}
