"use client";

import assert from "assert";
import { useTranslations } from "next-intl";
import { useApolloClient } from "@apollo/client";
import { ActionIcon, Button, Group, Tooltip } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconFlag, IconTrash, IconStar, IconStarFilled } from "@tabler/icons-react";
import { handlePromiseWithToast } from "@/core/utils/promise";
import { type IdType, ReportableResource } from "@/core/api/types";
import { useRouter } from "@/navigation";
import { useSession } from "@/providers";
import { CopyLocationButton, ReportCreateModal } from "@/components/common";
import { EventDeleteMutation, EventSetInterestMutation, EventRemoveInterestMutation } from "@components/pages/Event/api";

export interface ActionsProps {
  eventId: IdType;
  reported: boolean;
  interested: boolean;
  interestsCount: number;
  author: {
    id: IdType;
  };
}

export default function Actions(props: ActionsProps) {
  const { eventId, reported, interested, interestsCount, author } = props;
  const t = useTranslations('pages.Event.EventBanner.Actions');
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
        <Button
          onClick={() => {
            if (!session)
              return router.push('/login');
            const promise = client.mutate({
              mutation: interested ? EventRemoveInterestMutation : EventSetInterestMutation,
              variables: { id: eventId },
            });
            handlePromiseWithToast(promise, {
              onSuccess: () => {
                router.refresh();
              },
              errorMessage: t_shared('error'),
            });
          }}
          rightSection={interested ? <IconStarFilled /> : <IconStar />}
          variant="transparent"
          color="white"
        >
          {t('interests', { interestsCount })}
        </Button>
        {session?.user.id === author.id ? (
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
        onCreateSuccess={() => { }} // TODO update Event
      />
    </>
  );
}
