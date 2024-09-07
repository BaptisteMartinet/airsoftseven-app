"use client";

import type { Club } from "./api";

import React from "react";
import { useTranslations } from "next-intl";
import { Modal } from "@mantine/core";
import ClubCreateForm from "./ClubCreateForm";

export interface ClubCreateModalProps {
  open: boolean;
  onClose: () => void;
  onCreateSuccess: (club: Club) => void;
}

export default function ClubCreateModal(props: ClubCreateModalProps) {
  const { open, onClose, onCreateSuccess } = props;
  const t = useTranslations("common.ClubCreateModal");
  return (
    <Modal
      opened={open}
      onClose={onClose}
      title={t("modalTitle")}
      size="xl"
      centered
    >
      <ClubCreateForm
        onCreateSuccess={(createdClub) => {
          onCreateSuccess(createdClub);
          onClose();
        }}
      />
    </Modal>
  );
}
