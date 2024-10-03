export function isNonNull<T>(value: T | null): value is T {
  return value !== null;
}

export function isNonNullish<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined;
}
