import type { IdType } from "@/core/api/types";

import assert from "assert";
import { useTranslations } from "next-intl";
import { useRouter } from "@/navigation";
import { useApolloClient } from "@apollo/client";
import { ActionIcon, Group, Tooltip } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import { useSession } from "@/providers";
import { CopyLocationButton } from "@/components/common";
import { handlePromiseWithToast } from "@/core/utils/promise";
import { FieldDeleteMutation } from "@components/pages/Field/api";

export interface ActionsProps {
  fieldId: IdType;
  user: {
    id: IdType;
  };
  events: {
    count: number;
  };
}

export default function Actions(props: ActionsProps) {
  const { fieldId, user, events } = props;
  const t_shared = useTranslations("shared");
  const session = useSession();
  const client = useApolloClient();
  const router = useRouter();

  const handleDelete = () => {
    const promise = client.mutate({
      mutation: FieldDeleteMutation,
      variables: { id: fieldId },
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
