'use client'

import type { AsyncSelectProps as AsyncSelectBaseProps } from "./AsyncSelect";

import React from "react";
import assert from "assert";
import { useTranslations } from "next-intl";
import { useMapsLibrary } from "@vis.gl/react-google-maps";
import { handlePromiseWithToast } from "@/core/utils/promise";
import { isNonNull } from "@core/utils/validation";
import AsyncSelect from "./AsyncSelect";

function useSessionToken() {
  const placesLib = useMapsLibrary("places");
  const [token, setToken] =
    React.useState<google.maps.places.AutocompleteSessionToken | null>(null);

  const refreshToken = React.useCallback(() => {
    if (!placesLib) return;
    const { AutocompleteSessionToken } = placesLib;
    setToken(new AutocompleteSessionToken());
  }, [placesLib]);

  React.useEffect(() => {
    refreshToken();
  }, [refreshToken]);

  return [token, refreshToken] as const;
}

function getSuggestionValue(
  suggestion: google.maps.places.AutocompleteSuggestion
) {
  return suggestion.placePrediction?.text.text ?? null;
}

export type AsyncSelectProps = Omit<
  AsyncSelectBaseProps<never>,
  "value" | "onChange" | "fetchOptions" | "getOptionValue" | "getOptionLabel"
>;

export interface AddressPickerProps extends AsyncSelectProps {
  value: string | null;
  onChange: (
    newValue: string | null,
    placeDetails: google.maps.places.Place | null
  ) => void;
  placeDetailsFields: Array<string>;
}

export default function AddressPicker(props: AddressPickerProps) {
  const { value, onChange, placeDetailsFields, ...passedProps } = props;
  const t_shared = useTranslations("shared");
  const placesLib = useMapsLibrary("places");
  const [token, refreshToken] = useSessionToken();
  const suggestionsRef = React.useRef<
    Array<google.maps.places.AutocompleteSuggestion>
  >([]);

  const handleFetchSuggestions = async (input: string) => {
    if (!placesLib || !token) {
      suggestionsRef.current = [];
      return [];
    }
    const { AutocompleteSuggestion } = placesLib;
    const { suggestions } =
      await AutocompleteSuggestion.fetchAutocompleteSuggestions({
        input,
        sessionToken: token,
      });
    suggestionsRef.current = suggestions;
    return suggestions.map(getSuggestionValue).filter(isNonNull);
  };

  const handleValueSelect = (newValue: string | null) => {
    if (newValue === null) {
      onChange(null, null);
      return;
    }
    const fetchValue = async () => {
      const suggestion = suggestionsRef.current.find(
        (sugg) => getSuggestionValue(sugg) === newValue
      );
      assert(suggestion && suggestion.placePrediction);
      const place = suggestion.placePrediction.toPlace();
      await place.fetchFields({ fields: placeDetailsFields });
      onChange(newValue, place);
      refreshToken();
    };
    handlePromiseWithToast(fetchValue(), {
      errorMessage: t_shared("error"),
    });
  };

  return (
    <AsyncSelect
      value={value}
      onChange={handleValueSelect}
      fetchOptions={handleFetchSuggestions}
      getOptionValue={(opt) => opt}
      getOptionLabel={(opt) => opt}
      {...passedProps}
    />
  );
}
