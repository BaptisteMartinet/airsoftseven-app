"use client";

import type { Field } from "./api";

import React from "react";
import { useTranslations } from "next-intl";
import { Modal } from "@mantine/core";
import FieldCreateForm from "./FieldCreateForm";

export interface ClubCreateModalProps {
  open: boolean;
  onClose: () => void;
  onCreateSuccess: (club: Field) => void;
}

export default function ClubCreateModal(props: ClubCreateModalProps) {
  const { open, onClose, onCreateSuccess } = props;
  const t = useTranslations("common.FieldCreateModal");
  return (
    <Modal
      opened={open}
      onClose={onClose}
      title={t("modalTitle")}
      size="xl"
      centered
    >
      <FieldCreateForm
        onCreateSuccess={(createdField) => {
          onCreateSuccess(createdField);
          onClose();
        }}
      />
    </Modal>
  );
}
