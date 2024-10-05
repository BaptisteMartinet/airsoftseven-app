"use client";

import type { SelectProps } from "./Select";

import React from "react";
import { useTranslations } from "next-intl";
import { Loader } from "@mantine/core";
import { useDebouncedCallback } from "@mantine/hooks";
import { usePromiseStatusWithToast } from "@/core/utils/promise";
import Select from "./Select";

export type PickedSelectProps<T> = Omit<
  SelectProps<T>,
  | "options"
  | "searchable"
  | "searchValue"
  | "onSearchChange"
  | "filter"
  | "rightSection"
  | "rightSectionPointerEvents"
>;

export interface AsyncSelectProps<T> extends PickedSelectProps<T> {
  fetchOptions: (term: string) => Promise<Array<T>>;
}

export default function AsyncSelect<T>(props: AsyncSelectProps<T>) {
  const {
    value,
    onChange,
    fetchOptions,
    getOptionValue,
    getOptionLabel,
    ...passedProps
  } = props;
  const t_shared = useTranslations("shared");
  const [input, setInput] = React.useState("");
  const [options, setOptions] = React.useState<Array<T>>([]);
  const [optionsStatus, handleOptionsStatus] = usePromiseStatusWithToast();

  const handleFetchOptions = useDebouncedCallback((term: string) => {
    if (term.length < 2) return;
    const promise = fetchOptions(term);
    handleOptionsStatus(promise, {
      onSuccess: setOptions,
      errorMessage: t_shared("error"),
    });
  }, 500);

  return (
    <Select
      value={value}
      onChange={onChange}
      options={options}
      getOptionLabel={getOptionLabel}
      getOptionValue={getOptionValue}
      searchable
      searchValue={input}
      onSearchChange={(searchTerm) => {
        setInput(searchTerm);
        handleFetchOptions(searchTerm);
      }}
      filter={({ options }) => options}
      rightSection={
        optionsStatus === "pending" ? <Loader size={18} /> : undefined
      }
      rightSectionPointerEvents="none"
      {...passedProps}
    />
  );
}
