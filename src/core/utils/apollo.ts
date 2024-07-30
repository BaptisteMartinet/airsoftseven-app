import assert from "assert";
import { FetchResult } from "@apollo/client";

export function ensureFetchResultData<T>(result: FetchResult<T>) {
  const { data } = result;
  assert(data);
  return data;
}
