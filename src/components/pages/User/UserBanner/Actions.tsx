import { useTranslations } from "next-intl";
import { Group, Tooltip, ActionIcon } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconFlag } from "@tabler/icons-react";
import { type IdType, ReportableResource } from "@/core/api/types";
import { useSession } from "@/providers";
import { CopyLocationButton, ReportCreateModal } from "@/components/common";

export interface ActionsProps {
  userId: IdType;
  reported: boolean;
}

export default function Actions(props: ActionsProps) {
  const { userId, reported } = props;
  const t_shared = useTranslations("shared");
  const session = useSession();
  const [
    reportCreateModalOpened,
    { open: openReportCreateModal, close: closeReportCreateModal },
  ] = useDisclosure();

  return (
    <>
      <Group>
        {session ? (
          <>
            {session.user.id !== userId ? (
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
            ) : null}
          </>
        ) : null}
        <CopyLocationButton />
      </Group>
      <ReportCreateModal
        resourceId={userId}
        resourceType={ReportableResource.User}
        opened={reportCreateModalOpened}
        onClose={closeReportCreateModal}
        onCreateSuccess={() => {}} // TODO update User
      />
    </>
  );
}
