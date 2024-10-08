import assert from "assert";
import { FetchResult } from "@apollo/client";
import { mergeArrays } from "./array";

export function ensureFetchResultData<T>(result: FetchResult<T>) {
  const { data } = result;
  assert(data);
  return data;
}

export interface OffsetConnection<T> {
  count: number;
  nodes: Array<T>;
}

export function mergeOffsetPaginationResults<T>(
  previousData: OffsetConnection<T> | null,
  newData: OffsetConnection<T>,
  offset: number
) {
  return {
    count: newData.count,
    nodes: mergeArrays(previousData?.nodes ?? [], newData.nodes, offset),
  };
}
