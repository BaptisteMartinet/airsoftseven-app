import type { AsyncSelectProps } from "@components/common/AsyncSelect";
import type { Field } from "./api";

import React from "react";
import { useApolloClient } from "@apollo/client";
import { useTranslations } from "next-intl";
import { Button, Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPlus } from "@tabler/icons-react";
import { AsyncSelect, FieldCreateModal } from "@components/common";
import { FieldsQuery } from "./api";

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

export interface FieldPickerProps extends ExtendedAsyncSelectProps {
  value: Field | null;
  onChange: (newValue: Field | null) => void;
}

export default function FieldPicker(props: FieldPickerProps) {
  const { value, onChange, ...passedProps } = props;
  const t = useTranslations("common.FieldPicker");
  const client = useApolloClient();
  const [modalOpen, { open: openModal, close: closeModal }] = useDisclosure();
  const [fieldCreated, setFieldCreated] = React.useState(false);

  const handleFetchOptions = async (term: string) => {
    const res = await client.query({
      query: FieldsQuery,
      variables: {
        filters: { name: { contains: term } },
        limit: 100,
      },
    });
    return res.data.fields.nodes;
  };

  return (
    <>
      <AsyncSelect
        value={value}
        onChange={onChange}
        disabled={fieldCreated}
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
              {t("createField")}
            </Button>
          </Group>
        }
        {...passedProps}
      />
      <FieldCreateModal
        open={modalOpen}
        onClose={closeModal}
        onCreateSuccess={(field) => {
          onChange(field);
          setFieldCreated(true);
        }}
      />
    </>
  );
}
