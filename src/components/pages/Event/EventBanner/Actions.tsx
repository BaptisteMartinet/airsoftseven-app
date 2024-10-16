"use client";

import assert from "assert";
import { useTranslations } from "next-intl";
import { useApolloClient } from "@apollo/client";
import { ActionIcon, Group, Tooltip } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconFlag, IconTrash } from "@tabler/icons-react";
import { handlePromiseWithToast } from "@/core/utils/promise";
import { type IdType, ReportableResource } from "@/core/api/types";
import { useRouter } from "@/navigation";
import { useSession } from "@/providers";
import { CopyLocationButton, ReportCreateModal } from "@/components/common";
import { EventDeleteMutation } from "@components/pages/Event/api";

export interface ActionsProps {
  eventId: IdType;
  reported: boolean;
  user: {
    id: IdType;
  };
}

export default function Actions(props: ActionsProps) {
  const { eventId, reported, user } = props;
  const t_shared = useTranslations("shared");
  const client = useApolloClient();
  const router = useRouter();
  const session = useSession();
  const [
    reportCreateModalOpened,
    { open: openReportCreateModal, close: closeReportCreateModal },
  ] = useDisclosure();

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
    <>
      <Group>
        {session?.user.id === user.id ? (
          <>
            <Tooltip label={t_shared("delete")}>
              <ActionIcon
                onClick={handleDelete}
                variant="transparent"
                color="red"
              >
                <IconTrash />
              </ActionIcon>
            </Tooltip>
          </>
        ) : null}
        {session ? (
          <>
            <Tooltip label={t_shared("report")}>
              <ActionIcon
                onClick={openReportCreateModal}
                disabled={reported}
                color="white"
                variant="transparent"
              >
                <IconFlag />
              </ActionIcon>
            </Tooltip>
          </>
        ) : null}
        <CopyLocationButton />
      </Group>
      <ReportCreateModal
        resourceId={eventId}
        resourceType={ReportableResource.Event}
        opened={reportCreateModalOpened}
        onClose={closeReportCreateModal}
        onCreateSuccess={() => {}} // TODO update Event
      />
    </>
  );
}
