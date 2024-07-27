import { Modal, PinInput, Text } from "@mantine/core";

export interface PinInputModalProps {
  title: string;
  description: string;
  open: boolean;
  onClose: () => void;
  onSubmit: (pin: string) => void;
  length: number;
  disabled: boolean;
}

export default function PinInputModal(props: PinInputModalProps) {
  const { title, description, open, onClose, onSubmit, length, disabled } =
    props;
  return (
    <Modal
      opened={open}
      onClose={onClose}
      title={title}
      centered
      closeOnClickOutside={false}
    >
      <Text>{description}</Text>
      <PinInput
        type="number"
        length={length}
        onComplete={(value) => onSubmit(value)}
        mt={20}
        size="lg"
        disabled={disabled}
      />
    </Modal>
  );
}
