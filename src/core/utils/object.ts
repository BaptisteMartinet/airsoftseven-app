export function reverseRecord<T extends keyof any, U extends keyof any>(
  record: Record<T, U>
) {
  return Object.fromEntries(
    Object.entries(record).map(([key, value]) => [value, key])
  ) as Record<U, T>;
}
