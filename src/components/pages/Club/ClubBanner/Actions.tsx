import type { IdType } from "@/core/api/types";

import assert from "assert";
import { useTranslations } from "next-intl";
import { useApolloClient } from "@apollo/client";
import { ActionIcon, Group, Tooltip } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import { handlePromiseWithToast } from "@/core/utils/promise";
import { useRouter } from "@/navigation";
import { useSession } from "@/providers";
import { CopyLocationButton } from "@/components/common";
import { ClubDeleteMutation } from "@components/pages/Club/api";

export interface ActionsProps {
  clubId: IdType;
  user: {
    id: IdType;
  };
  events: {
    count: number;
  };
}

export default function Actions(props: ActionsProps) {
  const { clubId, user, events } = props;
  const t_shared = useTranslations("shared");
  const session = useSession();
  const client = useApolloClient();
  const router = useRouter();

  const handleDelete = () => {
    const promise = client.mutate({
      mutation: ClubDeleteMutation,
      variables: { id: clubId },
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
    <Group gap="lg">
      {session?.user.id === user.id ? (
        <Group>
          <Tooltip label={t_shared("delete")}>
            <ActionIcon
              onClick={handleDelete}
              disabled={events.count > 0}
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
      </Group>
    </Group>
  );
}
