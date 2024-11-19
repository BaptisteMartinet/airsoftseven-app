"use client";

import { useQuery } from "@apollo/client";
import { useTranslations } from "next-intl";
import { Skeleton } from "@mantine/core";
import { handlePromiseWithToast } from "@/core/utils/promise";
import { FieldCard, PaginatedList } from "@/components/common";
import { UserFieldsQuery } from "./api";

const PageSize = 10;

export interface UserFieldsProps {
  slug: string;
}

export default function UserFields(props: UserFieldsProps) {
  const { slug } = props;
  const t_shared = useTranslations("shared");

  const { data, loading, fetchMore } = useQuery(UserFieldsQuery, {
    variables: {
      slug,
      offset: 0,
      limit: PageSize,
      order: [{ field: "createdAt", ordering: "DESC" }],
    },
  });
  const fields = data?.user.fields.nodes ?? [];
  const fieldsCount = data?.user.fields.count ?? 0;

  const handleFetchMore = () => {
    const promise = fetchMore({ variables: { offset: fields.length } });
    handlePromiseWithToast(promise, {
      errorMessage: t_shared("error"),
    });
  };

  if (loading) return <Skeleton height={300} />;

  return (
    <PaginatedList
      count={fieldsCount}
      nodes={fields}
      getNodeKey={(field) => field.id}
      renderNode={(field) => <FieldCard field={field} width={300} />}
      onClickFetchMore={handleFetchMore}
    />
  );
}
