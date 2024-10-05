import { indexToArrayMap } from "./map";

export function indexMultipleArrayItems<
  ItemType,
  KeyType,
  OutputType = ItemType
>(
  arr: ReadonlyArray<ItemType>,
  getItemKey: (item: ItemType) => KeyType,
  transformValue?: (item: ItemType) => OutputType
) {
  const map = new Map<KeyType, Array<OutputType>>();
  for (const item of arr)
    indexToArrayMap(
      map,
      getItemKey(item),
      transformValue ? transformValue(item) : item
    );
  return map;
}

export function makeArrayUniq<T>(arr: ReadonlyArray<T>) {
  return Array.from(new Set(arr));
}

export function mergeArrays<T>(
  target: ReadonlyArray<T>,
  source: ReadonlyArray<T>,
  offset: number
) {
  const res = target.slice();
  for (let i = 0; i < source.length; ++i) res[offset + i] = source[i];
  return res;
}
