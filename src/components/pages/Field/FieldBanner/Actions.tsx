import assert from "assert";
import { useTranslations } from "next-intl";
import { useRouter } from "@/navigation";
import { useApolloClient } from "@apollo/client";
import { ActionIcon, Group, Tooltip } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconFlag, IconTrash } from "@tabler/icons-react";
import { ReportableResource, type IdType } from "@/core/api/types";
import { handlePromiseWithToast } from "@/core/utils/promise";
import { useSession } from "@/providers";
import { CopyLocationButton, ReportCreateModal } from "@/components/common";
import { FieldDeleteMutation } from "@components/pages/Field/api";

export interface ActionsProps {
  fieldId: IdType;
  reported: boolean;
  user: {
    id: IdType;
  };
  events: {
    count: number;
  };
}

export default function Actions(props: ActionsProps) {
  const { fieldId, reported, user, events } = props;
  const t_shared = useTranslations("shared");
  const session = useSession();
  const client = useApolloClient();
  const router = useRouter();
  const [
    reportCreateModalOpened,
    { open: openReportCreateModal, close: closeReportCreateModal },
  ] = useDisclosure();

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
    <>
      <Group>
        {session?.user.id === user.id ? (
          <>
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
        resourceId={fieldId}
        resourceType={ReportableResource.Field}
        opened={reportCreateModalOpened}
        onClose={closeReportCreateModal}
        onCreateSuccess={() => {}} // TODO update Field
      />
    </>
  );
}
