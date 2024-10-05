export function reverseMap<T, U>(map: Map<T, U>) {
  return new Map(Array.from(map.entries()).map(([key, value]) => [value, key]));
}

export function indexToArrayMap<ItemType, KeyType>(
  map: Map<KeyType, Array<ItemType>>,
  key: KeyType,
  value: ItemType
) {
  const val = map.get(key);
  if (val) return map.set(key, [...val, value]);
  return map.set(key, [value]);
}
