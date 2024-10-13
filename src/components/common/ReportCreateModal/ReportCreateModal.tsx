"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Modal } from "@mantine/core";
import type { IdType, ReportableResource } from "@/core/api/types";
import type { Report } from "./api";
import ReportForm from "./ReportCreateForm";

export interface ReportCreateModalProps {
  resourceId: IdType;
  resourceType: ReportableResource;
  opened: boolean;
  onClose: () => void;
  onCreateSuccess: (report: Report) => void;
}

export default function ReportCreateModal(props: ReportCreateModalProps) {
  const { resourceId, resourceType, opened, onClose, onCreateSuccess } = props;
  const t = useTranslations("common.ReportCreateModal");
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={t("modalTitle")}
      size="xl"
      centered
    >
      <ReportForm
        resourceId={resourceId}
        resourceType={resourceType}
        onCreateSuccess={(report) => {
          onClose();
          onCreateSuccess(report);
        }}
      />
    </Modal>
  );
}
