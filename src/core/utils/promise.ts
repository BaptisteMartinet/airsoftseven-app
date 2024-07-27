import { showNotification } from "@mantine/notifications";

import React from "react";

interface HandlePromiseWithToastOpts<T> {
  successMessage?: string;
  onSuccess?: (value: T) => void;
  errorMessage: string;
  onError?: (error: unknown) => void;
}

export function handlePromiseWithToast<T>(
  promise: Promise<T>,
  opts: HandlePromiseWithToastOpts<T>
) {
  const { successMessage, onSuccess, errorMessage, onError } = opts;
  return promise
    .then((value) => {
      if (successMessage)
        showNotification({ message: successMessage, color: "green" });
      if (onSuccess) onSuccess(value);
      return value;
    })
    .catch((error) => {
      if (errorMessage)
        showNotification({ message: errorMessage, color: "red" });
      if (onError) onError(error);
    });
}

export type PromiseStatus =
  | "uninitialized"
  | "pending"
  | "rejected"
  | "fulfilled";

export function usePromiseStatusWithToast() {
  const [status, setStatus] = React.useState<PromiseStatus>("uninitialized");

  function handlePromise<T>(
    promise: Promise<T>,
    args: HandlePromiseWithToastOpts<T>
  ) {
    const { onSuccess, onError, ...rest } = args;
    setStatus("pending");
    handlePromiseWithToast(promise, {
      onSuccess: (val) => {
        setStatus("fulfilled");
        onSuccess?.(val);
      },
      onError: (err) => {
        setStatus("rejected");
        onError?.(err);
      },
      ...rest,
    });
  }
  return [status, handlePromise] as const;
}
