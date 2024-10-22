import React from 'react';
import assert from 'assert';
import {
  MultiSelect as MantineMultiSelect,
  type MultiSelectProps as MantineMultiSelectProps,
  type ComboboxItem,
} from '@mantine/core';
import { isNonNullish } from '@/core/utils/validation';

export interface MultiSelectProps<T> extends Omit<MantineMultiSelectProps, 'value' | 'onChange'> {
  value: Array<T>,
  onChange: (newValue: Array<T>) => void,
  options: ReadonlyArray<T>;
  getOptionValue: (opt: T) => string;
  getOptionLabel: (opt: T) => string;
}

export default function MultiSelect<T>(props: MultiSelectProps<T>) {
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
    for (const valueItem of value) { // Add values if they are not in options
      if (!(optionsData.some((optData) => optData.value === getOptionValue(valueItem))))
        optionsData.unshift(getOptionItem(valueItem));
    }
    return optionsData;
  }, [options, value, getOptionValue, getOptionItem]);

  return (
    <MantineMultiSelect
      value={value.map(getOptionValue)}
      onChange={(newSelectedValues) => {
        const newValue = newSelectedValues.map((val) => options.find((opt) => getOptionValue(opt) === val)).filter(isNonNullish);
        assert(newValue.length === newSelectedValues.length, 'Unable to fully rebuild value array');
        onChange(newValue);
      }}
      data={data}
      {...passedProps}
    />
  );
}
