import type { NumberInputProps } from "@mantine/core";

import React from "react";
import { NumberInput } from "@mantine/core";

function valueToNullable(value: number | string) {
  if (typeof value === "string") return null;
  return value;
}

function nullableToValue(value: number | null) {
  if (value === null) return "";
  return value;
}

export type ExtendedNumberInputProps = Omit<
  NumberInputProps,
  "value" | "onChange" | "defaultValue"
>;

export interface NullableNumberInputProps extends ExtendedNumberInputProps {
  value: number | null;
  onChange: (newValue: number | null) => void;
}

export default function NullableNumberInput(props: NullableNumberInputProps) {
  const { value, onChange, ...passedProps } = props;
  return (
    <NumberInput
      value={nullableToValue(value)}
      onChange={(newValue) => onChange(valueToNullable(newValue))}
      {...passedProps}
    />
  );
}
