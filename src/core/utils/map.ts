export function reverseMap<T, U>(map: Map<T, U>) {
  return new Map(Array.from(map.entries()).map(([key, value]) => [value, key]));
}
