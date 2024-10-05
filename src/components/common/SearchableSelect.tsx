"use client";

import type {
  ComboboxItem,
  SelectProps as MantineSelectProps,
} from "@mantine/core";

import React from "react";
import assert from "assert";
import { Select } from "@mantine/core";

export type SelectProps = Omit<
  MantineSelectProps,
  "value" | "onChange" | "data"
>;

export interface SearchableSelectProps<T> extends SelectProps {
  value: T | null;
  onChange: (newValue: T | null) => void;
  options: ReadonlyArray<T>;
  getOptionValue: (opt: T) => string;
  getOptionLabel: (opt: T) => string;
}

export default function SearchableSelect<T>(props: SearchableSelectProps<T>) {
  const {
    value,
    onChange,
    options,
    getOptionValue,
    getOptionLabel,
    ...passedProps
  } = props;

  const getOptionItem = React.useCallback(
    (opt: T): ComboboxItem => ({
      value: getOptionValue(opt),
      label: getOptionLabel(opt),
    }),
    [getOptionLabel, getOptionValue]
  );

  const data = React.useMemo(() => {
    const optionsData = options.map(getOptionItem);
    if (
      value !== null &&
      !optionsData.some((optData) => optData.value === getOptionValue(value))
    )
      optionsData.unshift(getOptionItem(value));
    return optionsData;
  }, [options, value, getOptionValue, getOptionItem]);

  return (
    <Select
      value={value ? getOptionValue(value) : null}
      onChange={(selectedValue) => {
        const newValue =
          selectedValue !== null
            ? options.find((opt) => getOptionValue(opt) === selectedValue)
            : null;
        assert(
          newValue !== undefined,
          `Unable to find selected value: ${selectedValue}`
        );
        onChange(newValue);
      }}
      data={data}
      {...passedProps}
    />
  );
}
