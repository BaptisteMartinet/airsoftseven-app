import { showNotification } from "@mantine/notifications";

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
