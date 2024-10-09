"use client";

import assert from "assert";
import { useTranslations } from "next-intl";
import { useApolloClient } from "@apollo/client";
import { ActionIcon, Group, Tooltip } from "@mantine/core";
import { IconFlag, IconTrash } from "@tabler/icons-react";
import { handlePromiseWithToast } from "@/core/utils/promise";
import { IdType } from "@/core/api/types";
import { useRouter } from "@/navigation";
import { useSession } from "@/providers";
import { CopyLocationButton } from "@/components/common";
import { EventDeleteMutation } from "@components/pages/Event/api";

export interface ActionsProps {
  eventId: IdType;
  user: {
    id: IdType;
  };
}

export default function Actions(props: ActionsProps) {
  const { eventId, user } = props;
  const t = useTranslations("pages.Event.EventBanner.Actions");
  const t_shared = useTranslations("shared");
  const client = useApolloClient();
  const router = useRouter();
  const session = useSession();

  const handleDelete = () => {
    const promise = client.mutate({
      mutation: EventDeleteMutation,
      variables: { id: eventId },
    });
    handlePromiseWithToast(promise, {
      successMessage: t_shared("deleteSuccess"),
      onSuccess: () => {
        assert(session);
        router.replace({
          pathname: "/user/[slug]",
          params: { slug: session.user.slug },
        });
      },
      errorMessage: t_shared("error"),
    });
  };

  return (
    <Group>
      {session?.user.id === user.id ? (
        <Group>
          <Tooltip label={t_shared("delete")}>
            <ActionIcon
              onClick={handleDelete}
              variant="transparent"
              color="red"
            >
              <IconTrash />
            </ActionIcon>
          </Tooltip>
        </Group>
      ) : null}
      <Group>
        <CopyLocationButton />
        <Tooltip label={t("report")}>
          <ActionIcon color="white" variant="transparent">
            <IconFlag />
          </ActionIcon>
        </Tooltip>
      </Group>
    </Group>
  );
}
