import type { AsyncSelectProps } from "@components/common/AsyncSelect";
import type { Club } from "./api";

import React from "react";
import { useApolloClient } from "@apollo/client";
import { useTranslations } from "next-intl";
import { Button, Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPlus } from "@tabler/icons-react";
import { AsyncSelect, ClubCreateModal } from "@components/common";
import { ClubsQuery } from "./api";

export type ExtendedAsyncSelectProps = Omit<
  AsyncSelectProps<never>,
  | "value"
  | "onChange"
  | "disabled"
  | "fetchOptions"
  | "getOptionValue"
  | "getOptionLabel"
  | "nothingFoundMessage"
>;

export interface ClubPickerProps extends ExtendedAsyncSelectProps {
  value: Club | null;
  onChange: (newValue: Club | null) => void;
}

export default function ClubPicker(props: ClubPickerProps) {
  const { value, onChange, ...passedProps } = props;
  const t = useTranslations("common.ClubPicker");
  const client = useApolloClient();
  const [modalOpen, { open: openModal, close: closeModal }] = useDisclosure();
  const [clubCreated, setClubCreated] = React.useState(false);

  const handleFetchOptions = async (term: string) => {
    const res = await client.query({
      query: ClubsQuery,
      variables: {
        filters: { name: { contains: term } },
        limit: 100,
      },
    });
    return res.data.clubs.nodes;
  };

  return (
    <>
      <AsyncSelect
        value={value}
        onChange={onChange}
        disabled={clubCreated}
        fetchOptions={handleFetchOptions}
        getOptionValue={(opt) => opt.id}
        getOptionLabel={(opt) => opt.name}
        nothingFoundMessage={
          <Group justify="center">
            <Button
              onClick={openModal}
              variant="outline"
              size="xs"
              rightSection={<IconPlus size={14} />}
            >
              {t("createClub")}
            </Button>
          </Group>
        }
        {...passedProps}
      />
      <ClubCreateModal
        open={modalOpen}
        onClose={closeModal}
        onCreateSuccess={(club) => {
          onChange(club);
          setClubCreated(true);
        }}
      />
    </>
  );
}
